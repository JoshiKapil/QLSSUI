import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Training } from '../../../core/models/training.model';
import { NotifierService } from '../../../core/services/notifier.service';
import { DataService } from '../../../core/services/data.service';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { TestStorageService } from '../../test/services/test-storage.service';
import { TestExcelImportService } from '../../test/services/test-excel-import.service';
import { AssessmentImportPreview, AssessmentImportResult } from '../../test/services/test-excel-import.model';
import { TestDefinition } from '../../test/test.model';
import {
  CreateTestDetails,
  CreateTestDifficulty,
  CreateTestOption,
  CreateTestPayload,
  CreateTestQuestion,
  CreateTestQuestionForm,
  CreateTestQuestionType,
  CreateTestStatus
} from './create-test.model';
import { Subject, takeUntil } from 'rxjs';

const DEFAULT_TEST_STATUS: CreateTestStatus = 'Draft';
const DEFAULT_DURATION_MINUTES = 30;
const DEFAULT_PASSING_PERCENTAGE = 60;
const DEFAULT_QUESTION_MARKS = 1;
const DEFAULT_ESTIMATED_TIME_SECONDS = 60;

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit, OnDestroy {

  questionTypes: CreateTestQuestionType[] = ['MCSA', 'MCMA', 'TRUE_FALSE', 'ESSAY'];
  difficulties: CreateTestDifficulty[] = ['Easy', 'Medium', 'Hard'];
  statuses: CreateTestStatus[] = ['Draft', 'Active', 'Inactive'];
  testFileTypes: Array<'pre' | 'post' | 'assessment'> = ['pre', 'post', 'assessment'];
  testFileType: 'pre' | 'post' | 'assessment' = 'assessment';

  testDetails: CreateTestDetails = this.createEmptyTestDetails();
  trainingList: Training[] = [];
  trainingSearch = '';
  isTrainingDropdownOpen = false;
  selectedTrainingId = '';
  questions: CreateTestQuestion[] = [];
  questionBank: CreateTestQuestion[] = [];
  questionForm: CreateTestQuestionForm = this.createEmptyQuestionForm();
  editingIndex: number | null = null;
  showPreview = false;
  detailSubmitted = false;
  questionSubmitted = false;
  detailErrors: string[] = [];
  questionErrors: string[] = [];
  lastPayload: CreateTestPayload | null = null;
  lastSavedFileName = '';
  questionBankSearch = '';
  questionBankTypeFilter: CreateTestQuestionType | '' = '';
  questionBankDifficultyFilter: CreateTestDifficulty | '' = '';
  questionBankSubjectFilter = '';
  questionBankTopicFilter = '';
  questionBankMarksFilter: number | null = null;
  // Pagination for question bank
  questionBankPageSize = 10;
  questionBankCurrentPage = 1;
  mappedQuestionsPageSize = 10;
  mappedQuestionsCurrentPage = 1;
  mapQuestionPositions: { [questionId: number]: number | null } = {};
  availableTests: Array<TestDefinition & { assetFileName?: string; optionKey?: string }> = [];
  selectedTestKey = '';
  isTestDropdownOpen = false;
  highlightedTestIndex = -1;
  loadedTestDefinition: any | null = null;
  assessmentImportFileName = '';
  assessmentImportPreview: AssessmentImportPreview | null = null;
  assessmentImportResult: AssessmentImportResult | null = null;
  private pendingQuestionMediaFiles: Partial<Record<'questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl', File>> = {};
  private pendingOptionImageFiles: Record<number, File> = {};
  private Destroy$ = new Subject<void>();
  private readonly mediaAssetRoot = 'assets/tests/media';
  private readonly mediaFolders = { images: 'images', audios: 'audios', videos: 'videos' } as const;

  get mappedCount(): number {
    return this.questions.length;
  }

  get remainingSlots(): number | null {
    const total = this.testDetails?.totalQuestions ?? null;
    if (total === null || total === undefined) return null;
    return Math.max(0, total - this.mappedCount);
  }

  get isMappingFull(): boolean {
    return this.testDetails?.totalQuestions !== null && this.testDetails?.totalQuestions !== undefined && this.questions.length >= (this.testDetails.totalQuestions || 0);
  }

  constructor(
    private notifier: NotifierService,
    private testStorage: TestStorageService,
    private excelImport: TestExcelImportService,
    private http: HttpClient,
    private dataService: DataService,
    private trainingService: TrainingManagementService
  ) {}

  ngOnInit(): void {
    this.loadStoredQuestionBank();
    this.loadAvailableTests();
    this.loadTrainingList();
  }

  ngOnDestroy(): void {
    this.Destroy$.next();
    this.Destroy$.complete();
  }

  get totalMarks(): number {
    return this.calculateTotalMarks();
  }

  get isEditingQuestion(): boolean {
    return this.editingIndex !== null;
  }

  get shouldShowOptions(): boolean {
    return this.questionForm.questionType === 'MCSA' || this.questionForm.questionType === 'MCMA';
  }

  private get activeTestQuestionCount(): number {
    return this.questions.length;
  }

  get filteredQuestionBank(): CreateTestQuestion[] {
    const search = this.questionBankSearch.trim().toLowerCase();

    return this.questionBank.filter((question) => {
      const matchesSearch = !search || question.questionText.toLowerCase().includes(search) || question.subject.toLowerCase().includes(search) || question.topic.toLowerCase().includes(search);
      const matchesType = !this.questionBankTypeFilter || question.questionType === this.questionBankTypeFilter;
      const matchesDifficulty = !this.questionBankDifficultyFilter || question.difficulty === this.questionBankDifficultyFilter;
      const matchesSubject = !this.questionBankSubjectFilter.trim() || question.subject.toLowerCase().includes(this.questionBankSubjectFilter.trim().toLowerCase());
      const matchesTopic = !this.questionBankTopicFilter.trim() || question.topic.toLowerCase().includes(this.questionBankTopicFilter.trim().toLowerCase());
      const matchesMarks = !this.questionBankMarksFilter || question.marks === this.questionBankMarksFilter;

      return matchesSearch && matchesType && matchesDifficulty && matchesSubject && matchesTopic && matchesMarks;
    });
  }



  onTrainingSelected(trainingId: string): void {
    const selected = this.trainingList.find((training) => String(training.trainingId ?? '') === String(trainingId));
    this.selectedTrainingId = trainingId;
    this.testDetails.trainingId = selected ? String(selected.trainingId ?? '') : '';
    this.testDetails.trainingName = selected?.trainingName || '';
    this.trainingSearch = selected ? this.getTrainingLabel(selected) : '';
  }

  private loadTrainingList(): void {
    const reqHeader = new HttpHeaders({
      ETag: 'f88dd058fe004909615a64f01be66a7',
      'Content-Type': 'application/json'
    });

    this.http
      .get('assets/Training.json', { headers: reqHeader, responseType: 'text' })
      .pipe(takeUntil(this.Destroy$))
      .subscribe({
        next: (data: string) => {
          const decrypted = this.dataService.decrypt(data);
          const trainings = decrypted?.Table || [];
          this.trainingList = trainings
            .map((training: any) => this.mapTrainingFromAsset(training))
            .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
          this.syncSelectedTrainingFromDetails(); 
        },
        error: () => {
          this.trainingList = [];
          this.syncSelectedTrainingFromDetails();
        }
      });

    // Future API integration: call this block instead of the asset request above.
    // this.trainingService.getPaged(1, 100).pipe(takeUntil(this.Destroy$)).subscribe({
    //   next: (response) => {
    //     this.trainingList = (response.items || [])
    //       .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
    //     this.syncSelectedTrainingFromDetails();
    //   },
    //   error: (error) => {
    //     console.error('Failed to load training data.', { status: error.status });
    //     this.trainingList = [];
    //     this.syncSelectedTrainingFromDetails();
    //   }
    // });
  }

  private mapTrainingFromAsset(training: any): Training {
    return {
      trainingId: training.trainingId ?? training.TrainingId ?? training.TrainingID ?? training.Id ?? training.id ?? '',
      trainingName: training.trainingName ?? training.TrainingName ?? training.Name ?? '',
      trainingDesc: training.trainingDesc ?? training.TrainingDesc ?? training.Description ?? '',
      topicCovered: training.topicCovered ?? training.TopicCovered ?? training.TopicCoveredName ?? '',
      displayName: training.displayName ?? training.DisplayName ?? training.TrainingName ?? '',
      image: training.image ?? training.Image ?? '',
      displayOrder: Number(training.displayOrder ?? training.DisplayOrder ?? 0)
    };
  }



  get filteredTrainingList(): Training[] {
    const search = this.trainingSearch.trim().toLowerCase();

    if (!search) {
      return this.trainingList;
    }

    return this.trainingList.filter((training) => {
      const label = this.getTrainingLabel(training).toLowerCase();
      const id = String(training.trainingId || '').toLowerCase();
      const topicCovered = (training.topicCovered || '').toLowerCase();
      return label.includes(search) || id.includes(search) || topicCovered.includes(search);
    });
  }

  getTrainingLabel(training: Training): string {
    return training.displayName.replace('Training','') || training.trainingName.replace('Training','') || String(training.trainingId || 'Training');
  }

  openTrainingDropdown(): void {
    this.isTrainingDropdownOpen = true;
  }

  onTrainingSearchChange(): void {
    this.isTrainingDropdownOpen = true;
  }

  selectTrainingFromDropdown(training: Training): void {
    const trainingId = String(training.trainingId ?? '');
    this.onTrainingSelected(trainingId);
    this.trainingSearch = this.getTrainingLabel(training);
    this.isTrainingDropdownOpen = false;
  }

  getSelectedTrainingLabel(): string {
    if (!this.selectedTrainingId) {
      return 'Select Training';
    }

    const selected = this.trainingList.find((training) => String(training.trainingId ?? '') === String(this.selectedTrainingId));
    return selected ? this.getTrainingLabel(selected) : 'Select Training';
  }

  toggleTrainingDropdown(): void {
    this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;

    if (this.isTrainingDropdownOpen) {
      this.trainingSearch = '';
    }
  }

  private syncSelectedTrainingFromDetails(): void {
    const trainingId = String(this.testDetails.trainingId || '');
    this.selectedTrainingId = trainingId;

    if (!trainingId) {
      return;
    }

    const selected = this.trainingList.find((training) => String(training.trainingId ?? '') === trainingId);
    if (selected) {
      this.testDetails.trainingName = selected.trainingName;
      this.trainingSearch = this.getTrainingLabel(selected);
    }
  }

  private getValueOrNA(value: string | null | undefined): string {
    const trimmed = (value || '').trim();
    return trimmed || 'NA';
  }

  downloadTestTemplate(): void {
    this.testStorage.downloadBlob(this.excelImport.buildAssessmentTemplate(), 'AssessmentImportTemplate.xlsx');
  }

  onAssessmentExcelSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.prepareAssessmentImport(file.name);
    this.testStorage.importAssessmentExcelToServer(file);
    this.excelImport.parseAssessmentExcel(file)
      .then((preview) => (this.assessmentImportPreview = preview))
      .catch(() => this.notifier.warningToastr('Assessment Excel file could not be read.'));
    input.value = '';
  }

  confirmAssessmentImport(): void {
    if (!this.assessmentImportPreview) {
      return;
    }

    this.excelImport.applyAssessmentImport(this.assessmentImportPreview)
      .then((result) => {
        this.assessmentImportResult = result;
        const preview = this.assessmentImportPreview;
        this.assessmentImportPreview = null;
        this.loadStoredQuestionBank();
        this.loadAvailableTests();
        if (preview?.testDefinition) {
          this.applyImportedAssessmentPreview(preview);
        }
        this.notifier.successToastr('Assessment Excel import completed.');
      })
      .catch(() => this.notifier.warningToastr('Assessment Excel import failed.'));
  }

  cancelAssessmentImport(): void {
    this.resetAssessmentImportState();
  }

  private prepareAssessmentImport(fileName: string): void {
    this.assessmentImportFileName = fileName;
    this.assessmentImportResult = null;
    this.assessmentImportPreview = null;
  }

  private resetAssessmentImportState(): void {
    this.assessmentImportPreview = null;
    this.assessmentImportFileName = '';
    this.assessmentImportResult = null;
  }

  private applyImportedAssessmentPreview(preview: AssessmentImportPreview): void {
    const definition = preview.testDefinition;
    if (!definition) {
      return;
    }

    this.testDetails = {
      testTitle: definition.testTitle,
      description: definition.description,
      trainingId: definition.trainingId,
      trainingName: definition.trainingName,
      subject: definition.subject,
      topic: definition.topic,
      durationMinutes: definition.durationMinutes,
      passingPercentage: definition.passingPercentage,
      instructions: definition.instructions,
      status: definition.status as CreateTestStatus,
      totalQuestions: definition.totalQuestions
    };
    this.syncSelectedTrainingFromDetails();
    this.questions = preview.items
      .filter((item) => item.action !== 'failed' && item.action !== 'skip' && item.question)
      .sort((a, b) => a.questionOrder - b.questionOrder)
      .map((item, index) => ({ ...(item.question as any), questionNo: index + 1 }));
    this.loadedTestDefinition = definition;
    this.refreshQuestionNumbers();
  }

  getSelectedTestLabel(): string {
    if (!this.selectedTestKey) {
      return 'Open Test';
    }

    const selectedTest = this.availableTests.find((t) => t.optionKey === this.selectedTestKey);
    if (!selectedTest) {
      return 'Select Test';
    }

    return selectedTest.displayName || selectedTest.testName || 'Select Test';
  }

  get questionBankTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredQuestionBank.length / this.questionBankPageSize));
  }

  get pagedQuestionBank(): CreateTestQuestion[] {
    const start = (this.questionBankCurrentPage - 1) * this.questionBankPageSize;
    return this.filteredQuestionBank.slice(start, start + this.questionBankPageSize);
  }

  questionBankPrevPage(): void {
    if (this.questionBankCurrentPage > 1) this.questionBankCurrentPage--;
  }

  questionBankNextPage(): void {
    if (this.questionBankCurrentPage < this.questionBankTotalPages) this.questionBankCurrentPage++;
  }

  questionBankGoTo(page: number): void {
    if (page >= 1 && page <= this.questionBankTotalPages) this.questionBankCurrentPage = page;
  }

  get mappedQuestionsTotalPages(): number {
    return Math.max(1, Math.ceil(this.questions.length / this.mappedQuestionsPageSize));
  }

  get pagedMappedQuestions(): CreateTestQuestion[] {
    const total = this.mappedQuestionsTotalPages;
    const currentPage = Math.max(1, Math.min(this.mappedQuestionsCurrentPage, total));
    const start = (currentPage - 1) * this.mappedQuestionsPageSize;
    return this.questions.slice(start, start + this.mappedQuestionsPageSize);
  }

  mappedQuestionsPrevPage(): void {
    if (this.mappedQuestionsCurrentPage > 1) this.mappedQuestionsCurrentPage--;
  }

  mappedQuestionsNextPage(): void {
    if (this.mappedQuestionsCurrentPage < this.mappedQuestionsTotalPages) this.mappedQuestionsCurrentPage++;
  }

  mappedQuestionsGoTo(page: number): void {
    if (page >= 1 && page <= this.mappedQuestionsTotalPages) this.mappedQuestionsCurrentPage = page;
  }

  private getMappedQuestionIndex(pageIndex: number): number {
    return (this.mappedQuestionsCurrentPage - 1) * this.mappedQuestionsPageSize + pageIndex;
  }

  async loadAvailableTests(): Promise<void> {
    try {
      const tests = await this.testStorage.listTestDefinitions();
      this.availableTests = tests
        .map((test) => {
          const assetFileName = (test as any).assetFileName;
          const optionKey = assetFileName
            ? `asset:${assetFileName}`
            : `local:${this.testStorage.normalizeFileName(test.testName)}`;

          return {
            ...test,
            assetFileName,
            optionKey
          };
        })
        .sort((a, b) => (a.displayName || a.testName).localeCompare(b.displayName || b.testName));
    } catch {
      this.availableTests = [];
    }
  }

  async onSelectTest(selectedKey: string | null): Promise<void> {
    if (!selectedKey) {
      this.clearTestSelection();
      this.isTestDropdownOpen = false;
      return;
    }

    const [type, value] = selectedKey.split(':');
    const assetFileName = type === 'asset' ? value : undefined;
    const testName = type === 'local' ? value : '';

    try {
      const attempt = await this.testStorage.resolveAssessmentQuestions(testName, assetFileName);
      if (!attempt) {
        this.notifier.warningToastr('Could not load selected test.');
        return;
      }

      const def = { ...attempt.testDefinition } as any;
      if (assetFileName) {
        def.assetFileName = assetFileName;
      }

      this.selectedTestKey = selectedKey;
      this.isTestDropdownOpen = false;
      this.applySelectedTestDefinition(def, attempt.questions.map((question) => ({ ...question, questionNo: question.questionNo } as CreateTestQuestion)));

      const availableQuestions = await this.testStorage.loadAvailableQuestionsFromServer(def.testId);
      if (availableQuestions.length) {
        this.questionBank = this.mergeQuestionBanks(this.questionBank, availableQuestions as any);
      }
    } catch {
      this.notifier.warningToastr('Could not load selected test.');
    }
  }

  clearTestSelection(): void {
    this.selectedTestKey = '';
    this.isTestDropdownOpen = false;
    this.highlightedTestIndex = -1;
    this.testDetails = this.createEmptyTestDetails();
    this.trainingSearch = '';
    this.isTrainingDropdownOpen = false;
    this.selectedTrainingId = '';
    this.questions = [];
    this.refreshQuestionNumbers();
    this.loadedTestDefinition = null;
  }

  private applySelectedTestDefinition(definition: any, mappedQuestions: CreateTestQuestion[]): void {
    this.loadedTestDefinition = definition;
    this.testDetails = this.buildTestDetailsFromDefinition(definition);
    this.testFileType = this.normalizeTestFileType(definition.testFileType || definition.testType);
    this.syncSelectedTrainingFromDetails();
    this.questions = mappedQuestions.map((question) => ({ ...question, questionNo: question.questionNo } as CreateTestQuestion));
    this.refreshQuestionNumbers();
  }

  private buildTestDetailsFromDefinition(definition: any): CreateTestDetails {
    return {
      testTitle: definition.testTitle || definition.testName || '',
      description: definition.description || '',
      trainingId: definition.trainingId,
      trainingName: definition.trainingName,
      subject: definition.subject,
      topic: definition.topic,
      durationMinutes: definition.durationMinutes || 0,
      passingPercentage: definition.passingPercentage || 0,
      instructions: definition.instructions || '',
      status: definition.status as CreateTestStatus,
      totalQuestions: definition.totalQuestions || definition.mappedQuestionIds?.length || 0
    };
  }

  get dropdownOptions(): string[] {
    return ['', ...this.availableTests.map((test) => test.optionKey || '')];
  }

  toggleTestDropdown(): void {
    this.isTestDropdownOpen = !this.isTestDropdownOpen;

    if (this.isTestDropdownOpen) {
      const currentIndex = this.dropdownOptions.indexOf(this.selectedTestKey || '');
      this.highlightedTestIndex = currentIndex >= 0 ? currentIndex : 0;
    } else {
      this.highlightedTestIndex = -1;
    }
  }

  selectTestKey(selectedKey: string): void {
    this.highlightedTestIndex = -1;
    this.onSelectTest(selectedKey);
  }

  onDropdownKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.isTestDropdownOpen) {
        this.toggleTestDropdown();
        return;
      }

      const maxIndex = this.dropdownOptions.length - 1;
      if (event.key === 'ArrowDown') {
        this.highlightedTestIndex = this.highlightedTestIndex < maxIndex ? this.highlightedTestIndex + 1 : 0;
      } else {
        this.highlightedTestIndex = this.highlightedTestIndex > 0 ? this.highlightedTestIndex - 1 : maxIndex;
      }

      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (this.isTestDropdownOpen && this.highlightedTestIndex >= 0) {
        event.preventDefault();
        const selectedKey = this.dropdownOptions[this.highlightedTestIndex];
        this.selectTestKey(selectedKey);
      }
      return;
    }

    if (event.key === 'Escape') {
      this.isTestDropdownOpen = false;
      this.highlightedTestIndex = -1;
      return;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.test-dropdown')) {
      this.isTestDropdownOpen = false;
      this.highlightedTestIndex = -1;
    }
  }

  addQuestion(): void {
    this.clearQuestionForm();
  }

  editQuestion(index: number): void {
    const question = this.questionBank[index];

    if (!question) {
      return;
    }

    this.patchQuestionForm(question, index);
  }

  editMappedQuestion(index: number): void {
    const actualIndex = this.getMappedQuestionIndex(index);
    const mappedQuestion = this.questions[actualIndex];
    const bankIndex = this.questionBank.findIndex((question) => question.id === mappedQuestion.id);

    if (bankIndex > -1) {
      this.editQuestion(bankIndex);
    }
  }

  moveMappedQuestion(index: number, direction: -1 | 1): void {
    const actualIndex = this.getMappedQuestionIndex(index);
    this.moveQuestion(actualIndex, direction);
  }

  deleteMappedQuestion(index: number): void {
    const actualIndex = this.getMappedQuestionIndex(index);
    this.deleteQuestion(actualIndex);
  }

  async saveQuestion(): Promise<void> {
    this.questionSubmitted = true;
    this.questionErrors = this.validateQuestion();

    if (this.questionErrors.length) {
      return;
    }

    await this.uploadPendingQuestionMediaFiles();
    const question = this.buildQuestionFromForm();

    if (this.editingIndex === null) {
      this.questionBank = [...this.questionBank, question];
    } else {
      this.questionBank = this.questionBank.map((item, index) => (index === this.editingIndex ? question : item));
      this.questions = this.questions.map((item) => (item.id === question.id ? { ...question, questionNo: item.questionNo } : item));
    }

    this.refreshQuestionNumbers();
    this.clearQuestionForm();
    this.saveCurrentQuestionBank();
    this.notifier.successToastr('Question saved to question bank.');
  }

  deleteQuestion(index: number): void {
    const question = this.questions[index];
    const testId = this.loadedTestDefinition?.testId;

    if (question && testId) {
      this.testStorage.unmapQuestionFromTestOnServer(testId, this.getQuestionMapId(question));
    }

    this.questions = this.questions.filter((_question, questionIndex) => questionIndex !== index);
    this.refreshQuestionNumbers();
  }

  deleteQuestionFromBank(index: number): void {
    const question = this.questionBank[index];

    if (!question) {
      return;
    }

    this.testStorage.deleteQuestionFromServer(this.getQuestionMapId(question));
    this.questionBank = this.questionBank.filter((_item, questionIndex) => questionIndex !== index);
    this.questions = this.questions.filter((item) => item.id !== question.id);
    this.refreshQuestionNumbers();

    if (this.editingIndex === index) {
      this.clearQuestionForm();
    }
  }

  mapQuestionToTest(index: number): void {
    const question = this.questionBank[index];
    this.mapQuestionToTestByQuestion(question);
  }

  mapQuestionToTestByQuestion(question: CreateTestQuestion): void {
    if (!question || this.isQuestionMapped(question.id)) {
      return;
    }

    const max = this.testDetails.totalQuestions ?? null;
    if (max !== null && max !== undefined && this.questions.length >= max) {
      this.notifier.warningToastr(`Cannot map more than ${max} question(s) to this test.`);
      return;
    }

    const desiredPosition = this.mapQuestionPositions[question.id];
    const insertIndex = desiredPosition && desiredPosition > 0 && desiredPosition <= this.questions.length + 1
      ? desiredPosition - 1
      : this.questions.length;

    const updatedQuestions = [...this.questions];
    updatedQuestions.splice(insertIndex, 0, { ...question, questionNo: insertIndex + 1 });
    this.questions = updatedQuestions.map((q, index) => ({ ...q, questionNo: index + 1 }));
    this.mapQuestionPositions[question.id] = null;

    this.refreshQuestionNumbers();
    this.notifier.successToastr('Question mapped to test.');
  }

  setMapQuestionPosition(questionId: number, value: number | null): void {
    this.mapQuestionPositions[questionId] = value;
  }

  parseMapPosition(value: string): number | null {
    const num = Number(value);
    return Number.isInteger(num) && num > 0 ? num : null;
  }

  editQuestionByQuestion(question: CreateTestQuestion): void {
    const index = this.questionBank.findIndex((item) => item.id === question.id);

    if (index > -1) {
      this.editQuestion(index);
    }
  }

  deleteQuestionFromBankByQuestion(question: CreateTestQuestion): void {
    const index = this.questionBank.findIndex((item) => item.id === question.id);

    if (index > -1) {
      this.deleteQuestionFromBank(index);
    }
  }

  isQuestionMapped(questionId: number): boolean {
    return this.questions.some((question) => question.id === questionId);
  }

  getQuestionMapId(question: CreateTestQuestion): string {
    return question.questionId || `${question.id}`;
  }

  moveQuestion(index: number, direction: -1 | 1): void {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= this.questions.length) {
      return;
    }

    const reordered = [...this.questions];
    const current = reordered[index];
    reordered[index] = reordered[nextIndex];
    reordered[nextIndex] = current;
    this.questions = reordered;
    this.refreshQuestionNumbers();
  }

  clearQuestionForm(): void {
    this.editingIndex = null;
    this.questionSubmitted = false;
    this.questionErrors = [];
    this.questionForm = this.createEmptyQuestionForm();
    this.clearPendingQuestionMediaFiles();
  }

  onQuestionTypeChange(): void {
    this.questionErrors = [];

    if (this.questionForm.questionType === 'TRUE_FALSE') {
      this.questionForm.options = this.createTrueFalseOptions();
      this.questionForm.correctOptionIds = [];
      this.questionForm.correctOptionId = this.questionForm.correctOptionId === 'true' || this.questionForm.correctOptionId === 'false'
        ? this.questionForm.correctOptionId
        : '';
      return;
    }

    if (this.questionForm.questionType === 'ESSAY') {
      this.questionForm.options = [];
      this.questionForm.correctOptionId = '';
      this.questionForm.correctOptionIds = [];
      this.questionForm.manualReviewRequired = true;
      return;
    }

    if (!this.questionForm.options.length) {
      this.questionForm.options = [this.createOption(), this.createOption()];
    }

    this.questionForm.correctOptionId = '';
    this.questionForm.correctOptionIds = [];
  }

  addOption(): void {
    if (!this.shouldShowOptions) {
      return;
    }

    this.questionForm.options = [...this.questionForm.options, this.createOption()];
  }

  removeOption(index: number): void {
    const option = this.questionForm.options[index];
    this.questionForm.options = this.questionForm.options.filter((_item, optionIndex) => optionIndex !== index);
    this.questionForm.correctOptionIds = this.questionForm.correctOptionIds.filter((optionId) => optionId !== option.id);

    if (this.questionForm.correctOptionId === option.id) {
      this.questionForm.correctOptionId = '';
    }
  }

  toggleCorrectOption(optionId: string): void {
    if (this.questionForm.questionType === 'MCSA' || this.questionForm.questionType === 'TRUE_FALSE') {
      this.questionForm.correctOptionId = optionId;
      this.questionForm.correctOptionIds = [optionId];
      return;
    }

    if (this.questionForm.correctOptionIds.includes(optionId)) {
      this.questionForm.correctOptionIds = this.questionForm.correctOptionIds.filter((id) => id !== optionId);
    } else {
      this.questionForm.correctOptionIds = [...this.questionForm.correctOptionIds, optionId];
    }

    this.questionForm.correctOptionId = this.questionForm.correctOptionIds[0] || '';
  }

  isCorrectOption(optionId: string): boolean {
    if (this.questionForm.questionType === 'MCMA') {
      return this.questionForm.correctOptionIds.includes(optionId);
    }

    return this.questionForm.correctOptionId === optionId;
  }

  buildMediaAssetPath(folder: keyof typeof this.mediaFolders, fileName: string): string {
    const rawName = fileName.trim().replace(/\\/g, '/').split('/').pop() || fileName;
    const sanitized = rawName
      .trim()
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '');

    return `${this.mediaAssetRoot}/${this.mediaFolders[folder]}/${sanitized}`;
  }

  onQuestionMediaFileSelected(field: 'questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl', event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
    this.pendingQuestionMediaFiles[field] = file;
    this.questionForm[field] = this.buildMediaAssetPath(folder, file.name);
    input.value = '';
  }

  removeQuestionMediaFile(field: 'questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl'): void {
    delete this.pendingQuestionMediaFiles[field];
    this.questionForm[field] = '';
  }

  onOptionImageFileSelected(optionIndex: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.pendingOptionImageFiles[optionIndex] = file;
    this.setOptionImage(optionIndex, this.buildMediaAssetPath('images', file.name));
    input.value = '';
  }

  removeOptionImage(optionIndex: number): void {
    delete this.pendingOptionImageFiles[optionIndex];
    this.setOptionImage(optionIndex, '');
  }

  private setOptionImage(optionIndex: number, imageUrl: string): void {
    this.questionForm.options = this.questionForm.options.map((option, index) =>
      index === optionIndex ? { ...option, imageUrl } : option
    );
  }

  private async uploadPendingQuestionMediaFiles(): Promise<void> {
    const mediaFields = Object.entries(this.pendingQuestionMediaFiles) as Array<['questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl', File]>;

    for (const [field, file] of mediaFields) {
      const mediaType = field === 'audioUrl' ? 'audio' : field === 'videoUrl' ? 'video' : 'image';
      const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
      const fallbackPath = this.buildMediaAssetPath(folder, file.name);
      const uploadedPath = await this.testStorage.uploadMediaFile(mediaType, file, 'question');
      this.questionForm[field] = uploadedPath || fallbackPath;
    }

    for (const [indexKey, file] of Object.entries(this.pendingOptionImageFiles)) {
      const optionIndex = Number(indexKey);
      const fallbackPath = this.buildMediaAssetPath('images', file.name);
      const uploadedPath = await this.testStorage.uploadMediaFile('image', file, 'answer');
      this.setOptionImage(optionIndex, uploadedPath || fallbackPath);
    }
  }

  private clearPendingQuestionMediaFiles(): void {
    this.pendingQuestionMediaFiles = {};
    this.pendingOptionImageFiles = {};
  }
  calculateTotalMarks(): number {
    return this.questions.reduce((total, question) => total + this.getValidMarks(question.marks), 0);
  }

  previewTest(): void {
    this.showPreview = !this.showPreview;
  }

  saveDraft(): void {
    this.detailSubmitted = true;
    this.detailErrors = this.validateTestDetails();

    if (this.detailErrors.length) {
      return;
    }

    const payload = this.buildPayload();
    const displayName = payload.displayName || payload.testName;
    this.lastPayload = payload;
    this.lastSavedFileName = this.testStorage.buildAssessmentFileName(displayName);

    this.testStorage.saveAssessmentAndGet({
      ...payload,
      testFileType: this.testFileType,
      questions: this.questions as any
    } as any)
      .then((savedTest) => {
        this.lastSavedFileName = `${savedTest.testId}.json`;
        return this.testStorage.saveAssessmentFileToServer(
          {
            ...savedTest,
            testFileType: this.testFileType,
            questions: this.questions as any
          } as any,
          this.testFileType
        );
      })
      .then(() => {
        // Test-file browser download is intentionally disabled. Keep this code for future use.
        // this.testStorage.exportAssessment(displayName)
        //   .then((blob) => this.testStorage.downloadBlob(blob, this.lastSavedFileName));
        this.notifier.successToastr(`Encrypted ${this.testFileType} test file saved on the API server: ${this.lastSavedFileName}`);
        this.clearCreateTestForm();
        this.loadAvailableTests();
      })
      .catch((error) => {
        console.error('[CreateTest] Assessment save failed.', error);
        this.notifier.warningToastr('Assessment or encrypted API file could not be saved.');
      });
  }

  private clearCreateTestForm(): void {
    this.clearTestSelection();
    this.clearQuestionForm();
    this.testFileType = 'assessment';
    this.showPreview = false;
    this.detailSubmitted = false;
    this.detailErrors = [];
    this.lastPayload = null;
    this.lastSavedFileName = '';
    this.questionBankSearch = '';
    this.questionBankTypeFilter = '';
    this.questionBankDifficultyFilter = '';
    this.questionBankSubjectFilter = '';
    this.questionBankTopicFilter = '';
    this.questionBankMarksFilter = null;
    this.questionBankCurrentPage = 1;
    this.mappedQuestionsCurrentPage = 1;
    this.mapQuestionPositions = {};
    this.resetAssessmentImportState();
  }
  getTestFileFolder(): string {
    return `assets/test/${this.testFileType}`;
  }

  private normalizeTestFileType(value: unknown): 'pre' | 'post' | 'assessment' {
    const normalized = String(value || '').trim().toLowerCase();
    return normalized === 'pre' || normalized === 'post' ? normalized : 'assessment';
  }
  buildPayload(): CreateTestPayload {
    const testTitle = this.getTrimmedValue(this.testDetails.testTitle);
    const fileName = this.testStorage.normalizeFileName(testTitle);
    const now = new Date().toISOString();
    const baseId = this.loadedTestDefinition?.testId || `test-${Date.now()}`;
    const createdAt = this.loadedTestDefinition?.createdAt || now;
    const version = (this.loadedTestDefinition?.version || 0) + 1;
    const mappedQuestionIds = this.questions.map((question) => this.getQuestionMapId(question));

    return {
      testId: baseId,
      testName: testTitle,
      displayName: testTitle,
      fileName,
      testTitle,
      description: this.getTrimmedValue(this.testDetails.description),
      trainingId: this.testDetails.trainingId,
      trainingName: this.testDetails.trainingName,
      testFileType: this.testFileType,
      subject: this.getValueOrNA(this.testDetails.subject),
      topic: this.getValueOrNA(this.testDetails.topic),
      durationMinutes: this.getPositiveNumber(this.testDetails.durationMinutes, DEFAULT_DURATION_MINUTES),
      passingPercentage: this.getPositiveNumber(this.testDetails.passingPercentage, DEFAULT_PASSING_PERCENTAGE),
      instructions: this.getTrimmedValue(this.testDetails.instructions),
      status: this.testDetails.status,
      createdAt,
      updatedAt: now,
      totalQuestions: this.testDetails.totalQuestions || this.questions.length,
      totalMarks: this.totalMarks,
      mappedQuestionIds,
      questionOrder: mappedQuestionIds,
      version
    };
  }

  getQuestionTypeLabel(type: CreateTestQuestionType): string {
    const labels: { [key in CreateTestQuestionType]: string } = {
      MCSA: 'MCSA',
      MCMA: 'MCMA',
      TRUE_FALSE: 'True / False',
      ESSAY: 'Essay'
    };

    return labels[type];
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  trackByQuestionId(_index: number, question: CreateTestQuestion): number {
    return question.id;
  }

  trackByOptionId(_index: number, option: CreateTestOption): string {
    return option.id;
  }

  exportQuestionBank(): void {
    this.testStorage.exportQuestionBank()
      .then((blob) => this.testStorage.downloadBlob(blob, 'QuestionBank.json'))
      .catch(() => this.notifier.warningToastr('Question bank export failed.'));
  }

  importQuestionBank(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.testStorage.importQuestionBank(file)
      .then((questions) => {
        this.questionBank = questions as any;
        this.questions = [];
        this.refreshQuestionNumbers();
        this.notifier.successToastr('Encrypted question bank imported.');
        input.value = '';
      })
      .catch(() => this.notifier.warningToastr('Question bank import failed.'));
  }

  updateQuestionBank(): void {
    this.saveCurrentQuestionBank();
    this.notifier.successToastr('Question bank updated locally.');
  }

  private loadStoredQuestionBank(): void {
    this.testStorage.loadQuestionBank([])
      .then((questions) => {
        this.questionBank = questions as any;
      })
      .catch(() => this.notifier.warningToastr('Stored question bank could not be loaded.'));
  }

  private saveCurrentQuestionBank(): void {
    this.testStorage.saveQuestionBank(this.questionBank as any)
      .catch(() => this.notifier.warningToastr('Question bank could not be saved locally.'));
  }

  private patchQuestionForm(question: CreateTestQuestion, index: number): void {
    this.editingIndex = index;
    this.questionSubmitted = false;
    this.questionErrors = [];
    this.clearPendingQuestionMediaFiles();
    this.questionForm = {
      id: question.id,
      questionType: question.questionType,
      subject: question.subject,
      topic: question.topic,
      difficulty: question.difficulty,
      questionText: question.questionText,
      questionImageUrl: question.questionImageUrl || '',
      audioUrl: question.audioUrl || '',
      videoUrl: question.videoUrl || '',
      options: (question.options || []).map((option) => ({ ...option })),
      correctOptionId: question.correctOptionId || '',
      correctOptionIds: [...(question.correctOptionIds || [])],
      expectedAnswer: question.expectedAnswer || '',
      sampleAnswer: question.sampleAnswer || '',
      manualReviewRequired: !!question.manualReviewRequired,
      explanation: question.explanation || '',
      explanationImageUrl: question.explanationImageUrl || '',
      marks: question.marks,
      negativeMarks: question.negativeMarks,
      estimatedTimeSeconds: question.estimatedTimeSeconds
    };
  }

  private validateTestDetails(): string[] {
    const errors: string[] = [];

    if (!this.testDetails.testTitle.trim()) {
      errors.push('Test title is required.');
    }

    if (!this.testDetails.durationMinutes || this.testDetails.durationMinutes <= 0) {
      errors.push('Duration must be greater than 0.');
    }

    if (!this.questions.length) {
      errors.push('Map at least 1 question to the test.');
    }

    if (this.testDetails.totalQuestions && this.testDetails.totalQuestions < this.questions.length) {
      errors.push('Total questions cannot be less than currently mapped questions.');
    }

    return errors;
  }

  private validateQuestion(): string[] {
    const errors: string[] = [];
    const questionType = this.questionForm.questionType;

    if (!this.questionForm.questionText.trim()) {
      errors.push('Question text is required.');
    }

    if (!questionType) {
      errors.push('Question type is required.');
    }

    if (questionType === 'MCSA') {
      this.validateOptionQuestion(errors, false);
    }

    if (questionType === 'MCMA') {
      this.validateOptionQuestion(errors, true);
    }

    if (questionType === 'TRUE_FALSE' && !this.questionForm.correctOptionId) {
      errors.push('Select the correct True / False answer.');
    }

    if (questionType === 'ESSAY' && !this.questionForm.expectedAnswer.trim() && !this.questionForm.sampleAnswer.trim()) {
      errors.push('Essay question must have an expected answer or sample answer.');
    }

    return errors;
  }

  private validateOptionQuestion(errors: string[], allowMultipleCorrect: boolean): void {
    const validOptions = this.questionForm.options.filter((option) => option.text.trim());

    if (validOptions.length < 2) {
      errors.push(`${this.questionForm.questionType} must have at least 2 options.`);
    }

    if (allowMultipleCorrect) {
      const validCorrectIds = this.questionForm.correctOptionIds.filter((optionId) => validOptions.some((option) => option.id === optionId));

      if (!validCorrectIds.length) {
        errors.push('Select at least 1 correct answer.');
      }
      return;
    }

    if (!this.questionForm.correctOptionId || !validOptions.some((option) => option.id === this.questionForm.correctOptionId)) {
      errors.push('Select 1 correct answer.');
    }
  }

  private buildQuestionFromForm(): CreateTestQuestion {
    const questionType = this.questionForm.questionType;
    const options = this.buildOptionsForQuestion();
    const correctOptionIds = questionType === 'MCMA'
      ? this.questionForm.correctOptionIds.filter((optionId) => options.some((option) => option.id === optionId))
      : (this.questionForm.correctOptionId ? [this.questionForm.correctOptionId] : []);

    return {
      id: this.questionForm.id || Date.now(),
      questionNo: this.editingIndex === null ? this.questionBank.length + 1 : this.questionBank[this.editingIndex].questionNo,
      questionType,
      subject: this.getValueOrNA(this.questionForm.subject || this.testDetails.subject),
      topic: this.getValueOrNA(this.questionForm.topic || this.testDetails.topic),
      difficulty: this.questionForm.difficulty,
      questionText: this.questionForm.questionText.trim(),
      questionImageUrl: this.cleanOptionalValue(this.questionForm.questionImageUrl),
      audioUrl: this.cleanOptionalValue(this.questionForm.audioUrl),
      videoUrl: this.cleanOptionalValue(this.questionForm.videoUrl),
      options: questionType === 'ESSAY' ? undefined : options,
      correctOptionId: questionType === 'MCMA' ? correctOptionIds[0] : this.cleanOptionalValue(this.questionForm.correctOptionId),
      correctOptionIds,
      expectedAnswer: this.cleanOptionalValue(this.questionForm.expectedAnswer),
      sampleAnswer: this.cleanOptionalValue(this.questionForm.sampleAnswer),
      manualReviewRequired: questionType === 'ESSAY' ? this.questionForm.manualReviewRequired : false,
      explanation: this.questionForm.explanation.trim(),
      explanationImageUrl: this.cleanOptionalValue(this.questionForm.explanationImageUrl),
      marks: this.getValidMarks(this.questionForm.marks),
      negativeMarks: this.questionForm.negativeMarks || 0,
      estimatedTimeSeconds: this.getPositiveNumber(this.questionForm.estimatedTimeSeconds, 60)
    };
  }

  private buildOptionsForQuestion(): CreateTestOption[] {
    if (this.questionForm.questionType === 'TRUE_FALSE') {
      return this.createTrueFalseOptions();
    }

    return this.questionForm.options
      .filter((option) => option.text.trim())
      .map((option) => ({
        id: option.id,
        text: option.text.trim(),
        imageUrl: this.cleanOptionalValue(option.imageUrl)
      }));
  }


  private mergeQuestionBanks(existingQuestions: CreateTestQuestion[], incomingQuestions: CreateTestQuestion[]): CreateTestQuestion[] {
    const questions = new Map<string, CreateTestQuestion>();
    existingQuestions.forEach((question) => questions.set(this.getQuestionMapId(question), question));
    incomingQuestions.forEach((question) => questions.set(this.getQuestionMapId(question), question));
    return Array.from(questions.values());
  }
  private refreshQuestionNumbers(): void {
    this.questions = this.questions.map((question, index) => ({ ...question, questionNo: index + 1 }));
    this.mappedQuestionsCurrentPage = Math.min(this.mappedQuestionsCurrentPage, this.mappedQuestionsTotalPages);
    if (this.mappedQuestionsCurrentPage < 1) {
      this.mappedQuestionsCurrentPage = 1;
    }
  }

  private createEmptyTestDetails(): CreateTestDetails {
    return {
      testTitle: '',
      description: '',
      subject: 'NA',
      topic: 'NA',
      durationMinutes: DEFAULT_DURATION_MINUTES,
      passingPercentage: DEFAULT_PASSING_PERCENTAGE,
      instructions: '',
      status: DEFAULT_TEST_STATUS,
      totalQuestions: null
    };
  }

  private createEmptyQuestionForm(): CreateTestQuestionForm {
    return {
      id: null,
      questionType: 'MCSA',
      subject: '',
      topic: '',
      difficulty: 'Easy',
      questionText: '',
      questionImageUrl: '',
      audioUrl: '',
      videoUrl: '',
      options: [this.createOption(), this.createOption()],
      correctOptionId: '',
      correctOptionIds: [],
      expectedAnswer: '',
      sampleAnswer: '',
      manualReviewRequired: false,
      explanation: '',
      explanationImageUrl: '',
      marks: DEFAULT_QUESTION_MARKS,
      negativeMarks: 0,
      estimatedTimeSeconds: DEFAULT_ESTIMATED_TIME_SECONDS
    };
  }

  private createOption(): CreateTestOption {
    return {
      id: `option-${Date.now()}-${Math.round(Math.random() * 10000)}`,
      text: '',
      imageUrl: ''
    };
  }

  private createTrueFalseOptions(): CreateTestOption[] {
    return [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' }
    ];
  }

  private getValidMarks(value: number | null | undefined): number {
    return value && value > 0 ? value : DEFAULT_QUESTION_MARKS;
  }

  private getPositiveNumber(value: number | null | undefined, fallback: number): number {
    return value && value > 0 ? value : fallback;
  }

  private getTrimmedValue(value: string | undefined | null): string {
    return (value || '').trim();
  }

  private cleanOptionalValue(value: string | undefined): string | undefined {
    const cleanValue = this.getTrimmedValue(value);
    return cleanValue || undefined;
  }
}


























