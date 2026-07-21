import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Training } from '../../../core/models/training.model';
import { NotifierService } from '../../../core/services/notifier.service';
import { DataService } from '../../../core/services/data.service';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { TEST_QUESTIONS } from '../../test/test-data';
import { QuestionUsageInfo, TestDefinition, TestDifficulty, TestOption, TestQuestion, TestQuestionType } from '../../test/test.model';
import { TestStorageService } from '../../test/services/test-storage.service';
import { TestExcelImportService } from '../../test/services/test-excel-import.service';
import { ImportDuplicateAction, QuestionImportPreview, QuestionImportResult } from '../../test/services/test-excel-import.model';
import { Subject, takeUntil } from 'rxjs';

const DEFAULT_QUESTION_MARKS = 1;
const DEFAULT_ESTIMATED_TIME_SECONDS = 60;
const DEFAULT_TEST_NAME = 'Test 1';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, OnDestroy {
  questionTypes: TestQuestionType[] = ['MCSA', 'MCMA', 'TRUE_FALSE', 'ESSAY'];
  difficulties: TestDifficulty[] = ['Easy', 'Medium', 'Hard'];

  questionBank: TestQuestion[] = [];
  trainingList: Training[] = [];
  trainingSearch = '';
  isTrainingDropdownOpen = false;
  selectedTrainingId = '';
  form: TestQuestion = this.createEmptyQuestion();
  editingIndex: number | null = null;
  validationErrors: string[] = [];
  usageInfo: QuestionUsageInfo | null = null;
  isSaving = false;
  private pendingQuestionMediaFiles: Partial<Record<'questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl', File>> = {};
  private pendingOptionImageFiles: Record<number, File> = {};
  private Destroy$ = new Subject<void>();

  searchText = '';
  filterTraining = '';
  filterSubject = '';
  filterTopic = '';
  filterType: TestQuestionType | '' = '';
  filterDifficulty: TestDifficulty | '' = '';
  filterMarks: number | null = null;
  filterActive: 'all' | 'active' | 'inactive' = 'all';
  mappingTestName = 'Test 1';
  mappingQuestionNumber: number | null = null;
  mappingMessage = '';
  questionImportDuplicateAction: ImportDuplicateAction = 'skip';
  questionImportFileName = '';
  questionImportPreview: QuestionImportPreview | null = null;
  questionImportResult: QuestionImportResult | null = null;

  // Pagination
  pageSize = 10;
  currentPage = 1;

  readonly mediaAssetRoot = 'assets/tests/media';
  readonly mediaFolders = {
    images: 'images',
    audios: 'audios',
    videos: 'videos'
  } as const;

  constructor(
    private storage: TestStorageService,
    private notifier: NotifierService,
    private excelImport: TestExcelImportService,
    private http: HttpClient,
    private dataService: DataService,
    private trainingService: TrainingManagementService
  ) {}

  ngOnInit(): void {
    this.loadQuestionBank();
    this.loadTrainingList();
  }

  ngOnDestroy(): void {
    this.Destroy$.next();
    this.Destroy$.complete();
  }

  get filteredQuestions(): TestQuestion[] {
    const search = this.searchText.trim().toLowerCase();
    return this.questionBank.filter((question) => {
      const matchesSearch = !search || question.questionText.toLowerCase().includes(search);
      const matchesTraining = !this.filterTraining.trim() || (question.trainingName || '').toLowerCase().includes(this.filterTraining.trim().toLowerCase());
      const matchesSubject = !this.filterSubject.trim() || question.subject.toLowerCase().includes(this.filterSubject.trim().toLowerCase());
      const matchesTopic = !this.filterTopic.trim() || question.topic.toLowerCase().includes(this.filterTopic.trim().toLowerCase());
      const matchesType = !this.filterType || question.questionType === this.filterType;
      const matchesDifficulty = !this.filterDifficulty || question.difficulty === this.filterDifficulty;
      const matchesMarks = !this.filterMarks || (question.marks || 1) === this.filterMarks;
      const matchesActive = this.filterActive === 'all' || (this.filterActive === 'active' ? question.isActive !== false : question.isActive === false);
      return matchesSearch && matchesTraining && matchesSubject && matchesTopic && matchesType && matchesDifficulty && matchesMarks && matchesActive;
    });
  }



  downloadQuestionTemplate(): void {
    this.storage.downloadBlob(this.excelImport.buildQuestionTemplate(), 'QuestionImportTemplate.xlsx');
  }

  onQuestionExcelSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.questionImportFileName = file.name;
    this.questionImportResult = null;
    this.storage.importQuestionExcelToServer(file);
    this.excelImport.parseQuestionExcel(file, this.questionImportDuplicateAction)
      .then((preview) => (this.questionImportPreview = preview))
      .catch(() => this.notifier.warningToastr('Question Excel file could not be read.'));
    input.value = '';
  }

  confirmQuestionImport(): void {
    if (!this.questionImportPreview) {
      return;
    }

    this.excelImport.applyQuestionImport(this.questionImportPreview)
      .then((result) => {
        this.questionImportResult = result;
        this.questionImportPreview = null;
        this.loadQuestionBank();
        this.notifier.successToastr('Question Excel import completed.');
      })
      .catch(() => this.notifier.warningToastr('Question Excel import failed.'));
  }

  cancelQuestionImport(): void {
    this.questionImportPreview = null;
    this.questionImportFileName = '';
  }

  async saveQuestion(): Promise<void> {
    if (this.isSaving) {
      return;
    }

    this.validationErrors = this.validateQuestion();
    if (this.validationErrors.length) {
      return;
    }

    this.isSaving = true;

    try {
      await this.uploadPendingMediaFiles();
      let question = this.buildQuestionFromForm();
      const savedQuestion = await this.storage.saveQuestionToServer(question);
      const savedServerId = this.getSavedServerQuestionId(savedQuestion);

      if (savedServerId) {
        question = {
          ...question,
          questionId: savedServerId,
          id: Number(savedServerId)
        };
        this.form = { ...this.form, questionId: savedServerId, id: Number(savedServerId) };
      }

      const questionToStore = savedQuestion ? {
        ...question,
        ...savedQuestion,
        questionId: savedServerId || savedQuestion.questionId || question.questionId,
        id: savedServerId ? Number(savedServerId) : (savedQuestion.id || question.id)
      } : question;

      if (this.editingIndex === null) {
        this.questionBank = [...this.questionBank, questionToStore];
      } else {
        this.questionBank = this.questionBank.map((item, index) => (index === this.editingIndex ? questionToStore : item));
      }

      this.persistQuestionBank('Question bank saved.', false);
      this.clearForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Question could not be saved.';
      this.validationErrors = [message];
      this.notifier.warningToastr(message);
    } finally {
      this.isSaving = false;
    }
  }

  editQuestion(index: number): void {
    const question = this.filteredQuestions[index];
    const bankIndex = this.questionBank.findIndex((item) => this.storage.getQuestionKey(item) === this.storage.getQuestionKey(question));
    this.editingIndex = bankIndex;
    this.clearPendingMediaFiles();
    this.form = this.createEditableQuestion(question);
    this.syncSelectedTrainingFromForm();
    this.validationErrors = [];
    this.loadUsageInfo(question);
  }

  cloneQuestion(index: number): void {
    const source = this.filteredQuestions[index];
    const now = new Date().toISOString();
    const clone: TestQuestion = {
      ...source,
      id: Date.now(),
      questionId: `q-${Date.now()}`,
      questionNo: this.questionBank.length + 1,
      questionText: `${source.questionText} Copy`,
      version: 1,
      createdAt: now,
      updatedAt: now
    };
    this.questionBank = [...this.questionBank, clone];
    this.persistQuestionBank('Question cloned.');
  }

  deactivateQuestion(index: number): void {
    const question = this.filteredQuestions[index];
    this.questionBank = this.questionBank.map((item) => this.storage.getQuestionKey(item) === this.storage.getQuestionKey(question) ? { ...item, isActive: false, updatedAt: new Date().toISOString() } : item);
    this.persistQuestionBank('Question deactivated.');
  }



  mapQuestionToTest(question: TestQuestion): void {
    if (!question) {
      return;
    }

    if (question.isActive === false) {
      this.notifier.warningToastr('Inactive questions cannot be mapped to a test.');
      return;
    }

    const testName = this.mappingTestName.trim() || DEFAULT_TEST_NAME;
    const questionKey = this.storage.getQuestionKey(question);
    this.mappingMessage = '';

    this.storage.loadAssessment(testName)
      .then((assessment) => {
        const nextAssessment = assessment || this.createDefaultAssessment(testName);
        const existingOrder = nextAssessment.questionOrder?.length ? nextAssessment.questionOrder : nextAssessment.mappedQuestionIds || [];
        const withoutCurrent = existingOrder.filter((mappedQuestionId) => mappedQuestionId !== questionKey);
        const requestedNumber = this.mappingQuestionNumber && this.mappingQuestionNumber > 0 ? this.mappingQuestionNumber : withoutCurrent.length + 1;
        const insertIndex = Math.min(Math.max(requestedNumber - 1, 0), withoutCurrent.length);

        withoutCurrent.splice(insertIndex, 0, questionKey);
        nextAssessment.mappedQuestionIds = [...withoutCurrent];
        nextAssessment.questionOrder = [...withoutCurrent];
        nextAssessment.totalQuestions = withoutCurrent.length;
        nextAssessment.totalMarks = this.calculateMappedMarks(withoutCurrent);
        nextAssessment.updatedAt = new Date().toISOString();

        return this.storage.saveAssessment(nextAssessment)
          .then(() => this.storage.mapQuestionToTestOnServer(nextAssessment.testId, questionKey, nextAssessment.questionOrder.indexOf(questionKey) + 1))
          .then(() => nextAssessment);
      })
      .then((assessment) => {
        this.mappingMessage = `Question mapped as Q${assessment.questionOrder.indexOf(questionKey) + 1} in ${assessment.displayName || assessment.testName}.`;
        this.notifier.successToastr(this.mappingMessage);
      })
      .catch(() => this.notifier.warningToastr('Question could not be mapped to test.'));
  }

  deleteQuestion(index: number): void {
    const question = this.filteredQuestions[index];
    if (!question) {
      return;
    }

    const questionKey = this.storage.getQuestionKey(question);
    this.storage.getQuestionUsage(questionKey).then((usage) => {
      if (usage.usageCount) {
        this.notifier.warningToastr(`Question is used in ${usage.usageCount} test(s). Please deactivate it instead.`);
        return;
      }

      this.storage.deleteQuestionFromServer(questionKey);
      this.questionBank = this.questionBank.filter((item) => this.storage.getQuestionKey(item) !== questionKey);
      this.persistQuestionBank('Question deleted.');
    });
  }

  clearForm(): void {
    this.form = this.createEmptyQuestion();
    this.trainingSearch = '';
    this.isTrainingDropdownOpen = false;
    this.selectedTrainingId = '';
    this.editingIndex = null;
    this.validationErrors = [];
    this.usageInfo = null;
    this.clearPendingMediaFiles();
  }

  onQuestionTypeChange(): void {
    if (this.form.questionType === 'TRUE_FALSE') {
      this.form.options = [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }];
      this.form.correctOptionId = '';
      this.form.correctOptionIds = [];
      return;
    }

    if (this.form.questionType === 'ESSAY') {
      this.form.options = [];
      this.form.correctOptionId = '';
      this.form.correctOptionIds = [];
      return;
    }

    if (!this.form.options?.length) {
      this.form.options = [this.createOption(), this.createOption()];
    }
  }

  addOption(): void {
    this.form.options = [...(this.form.options || []), this.createOption()];
  }

  removeOption(index: number): void {
    const option = this.form.options?.[index];
    this.form.options = (this.form.options || []).filter((_item, optionIndex) => optionIndex !== index);
    this.form.correctOptionIds = (this.form.correctOptionIds || []).filter((id) => id !== option?.id);
    if (this.form.correctOptionId === option?.id) {
      this.form.correctOptionId = '';
    }
  }

  toggleCorrectOption(optionId: string): void {
    if (this.form.questionType === 'MCMA') {
      const selected = this.form.correctOptionIds || [];
      this.form.correctOptionIds = selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId];
      this.form.correctOptionId = this.form.correctOptionIds[0] || '';
      return;
    }

    this.form.correctOptionId = optionId;
    this.form.correctOptionIds = [optionId];
  }

  isCorrectOption(optionId: string): boolean {
    return this.form.questionType === 'MCMA' ? !!this.form.correctOptionIds?.includes(optionId) : this.form.correctOptionId === optionId;
  }

  exportQuestionBank(): void {
    this.storage.exportQuestionBank()
      .then((blob) => this.storage.downloadBlob(blob, 'QuestionBank.json'))
      .catch(() => this.notifier.warningToastr('Question bank export failed.'));
  }

  importQuestionBank(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.storage.importQuestionBank(file)
      .then((questions) => {
        this.questionBank = questions;
        input.value = '';
        this.notifier.successToastr('Question bank imported.');
      })
      .catch(() => this.notifier.warningToastr('Invalid encrypted question bank file.'));
  }

  getAffectedTestNames(): string {
    return this.usageInfo?.affectedTests?.map((test) => test.testName).join(', ') || '';
  }
  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  buildMediaAssetPath(folder: keyof typeof this.mediaFolders, fileName: string): string {
    const rawName = fileName.trim().replace(/\\/g, '/').split('/').pop() || fileName;
    const sanitized = rawName
      .trim()
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '');

    return `${this.mediaAssetRoot}/${this.mediaFolders[folder]}/${sanitized}`;
  }

  onMediaFileSelected(field: 'questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl', event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
    this.pendingQuestionMediaFiles[field] = file;
    this.form[field] = this.buildMediaAssetPath(folder, file.name);
    input.value = '';
  }

  removeMediaFile(field: 'questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl'): void {
    delete this.pendingQuestionMediaFiles[field];
    this.form[field] = '';
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
    this.form.options = (this.form.options || []).map((option, index) =>
      index === optionIndex ? { ...option, imageUrl } : option
    );
  }

  private async uploadPendingMediaFiles(): Promise<void> {
    const mediaFields = Object.entries(this.pendingQuestionMediaFiles) as Array<['questionImageUrl' | 'audioUrl' | 'videoUrl' | 'explanationImageUrl', File]>;

    for (const [field, file] of mediaFields) {
      const mediaType = field === 'audioUrl' ? 'audio' : field === 'videoUrl' ? 'video' : 'image';
      const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
      const fallbackPath = this.buildMediaAssetPath(folder, file.name);
      const uploadedPath = await this.storage.uploadMediaFile(mediaType, file, 'question');
      this.form[field] = uploadedPath || fallbackPath;
    }

    for (const [indexKey, file] of Object.entries(this.pendingOptionImageFiles)) {
      const optionIndex = Number(indexKey);
      const fallbackPath = this.buildMediaAssetPath('images', file.name);
      const uploadedPath = await this.storage.uploadMediaFile('image', file, 'answer');
      this.setOptionImage(optionIndex, uploadedPath || fallbackPath);
    }
  }

  private clearPendingMediaFiles(): void {
    this.pendingQuestionMediaFiles = {};
    this.pendingOptionImageFiles = {};
  }
  getMediaFileName(url: string): string {
    return url.trim().replace(/\\/g, '/').split('/').pop() || url;
  }

  trackByQuestion(_index: number, question: TestQuestion): string {
    // Guard against cases where `storage` may be unavailable during change detection.
    // Fall back to stable identifiers on the question so trackBy never throws.
    const key = this.storage?.getQuestionKey?.(question);
    if (key) return key;
    return question?.questionId || String(question?.id) || String(_index);
  }

  trackByOption(_index: number, option: TestOption): string {
    return option.id;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredQuestions.length / this.pageSize));
  }

  get pagedQuestions(): TestQuestion[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredQuestions.slice(start, start + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  // Helpers that operate by question object so pagination indices are irrelevant
  editQuestionByItem(question: TestQuestion): void {
    const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
    if (index > -1) this.editQuestion(index);
  }

  cloneQuestionByItem(question: TestQuestion): void {
    const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
    if (index > -1) this.cloneQuestion(index);
  }

  deactivateQuestionByItem(question: TestQuestion): void {
    const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
    if (index > -1) this.deactivateQuestion(index);
  }

  deleteQuestionByItem(question: TestQuestion): void {
    const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
    if (index > -1) this.deleteQuestion(index);
  }



  private getSavedServerQuestionId(savedQuestion: TestQuestion | null): string {
    const saved = (savedQuestion as any)?.data ?? savedQuestion;
    const questionId = saved?.questionId ?? saved?.id;
    const serverId = String(questionId ?? '');
    return /^[0-9]+$/.test(serverId) ? serverId : '';
  }
  private createDefaultAssessment(testName: string): TestDefinition {
    const displayName = testName.trim() || DEFAULT_TEST_NAME;
    const now = new Date().toISOString();

    return {
      testId: `test-${this.storage.normalizeFileName(displayName)}`,
      testName: displayName,
      displayName,
      fileName: this.storage.normalizeFileName(displayName),
      testTitle: displayName,
      description: '',
      subject: '',
      topic: '',
      durationMinutes: 30,
      passingPercentage: 60,
      instructions: '',
      status: 'Active',
      mappedQuestionIds: [],
      questionOrder: [],
      totalQuestions: 0,
      totalMarks: 0,
      createdAt: now,
      updatedAt: now,
      version: 1
    };
  }

  private calculateMappedMarks(questionIds: string[]): number {
    return questionIds.reduce((total, questionId) => {
      const question = this.questionBank.find((item) => this.storage.getQuestionKey(item) === questionId);
      return total + (question?.marks && question.marks > 0 ? question.marks : 1);
    }, 0);
  }

  private loadQuestionBank(): void {
    this.storage.loadQuestionBank(TEST_QUESTIONS)
      .then((questions) => (this.questionBank = questions))
      .catch(() => this.notifier.warningToastr('Question bank could not be loaded.'));
  }

  private loadUsageInfo(question: TestQuestion): void {
    this.storage.getQuestionUsage(this.storage.getQuestionKey(question)).then((usage) => (this.usageInfo = usage));
  }

  private persistQuestionBank(message: string, syncServer = true): void {
    const savePromise = syncServer
      ? this.storage.saveQuestionBank(this.questionBank)
      : this.storage.saveQuestionBankLocallyOnly(this.questionBank);

    savePromise
      .then(() => this.notifier.successToastr(message))
      .catch(() => this.notifier.warningToastr('Question bank could not be saved locally.'));
  }

  onTrainingSelected(trainingId: string): void {
    const selected = this.trainingList.find((training) => String(training.trainingId ?? '') === String(trainingId));
    this.selectedTrainingId = trainingId;
    this.form.trainingId = selected ? String(selected.trainingId ?? '') : '';
    this.form.trainingName = selected?.trainingName || '';
    this.trainingSearch = selected ? this.getTrainingLabel(selected) : '';
  }

  private loadTrainingList(): void {
    // const reqHeader = new HttpHeaders({
    //   ETag: 'f88dd058fe004909615a64f01be66a7',
    //   'Content-Type': 'application/json'
    // });

    // this.http
    //   .get('assets/Training.json', { headers: reqHeader, responseType: 'text' })
    //   .pipe(takeUntil(this.Destroy$))
    //   .subscribe({
    //     next: (data: string) => {
    //       const decrypted = this.dataService.decrypt(data);
    //       const trainings = decrypted?.Table || [];
    //       this.trainingList = trainings
    //         .map((training: any) => this.mapTrainingFromAsset(training))
    //         .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
    //       this.syncSelectedTrainingFromForm();
    //     },
    //     error: () => {
    //       this.trainingList = [];
    //       this.syncSelectedTrainingFromForm();
    //     }
    //   });

    // Future API integration: call this block instead of the asset request above.
    this.trainingService.getPaged(1, 100).pipe(takeUntil(this.Destroy$)).subscribe({
      next: (response) => {
        this.trainingList = (response.items || [])
          .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        this.syncSelectedTrainingFromForm();
      },
      error: (error) => {
        console.error('Failed to load training data.', { status: error.status });
        this.trainingList = [];
        this.syncSelectedTrainingFromForm();
      }
    });
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
    return training.trainingName || training.displayName || String(training.trainingId || 'Training');
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

  private syncSelectedTrainingFromForm(): void {
    const trainingId = String(this.form.trainingId || '');
    this.selectedTrainingId = trainingId;

    if (!trainingId) {
      return;
    }

    const selected = this.trainingList.find((training) => String(training.trainingId ?? '') === trainingId);
    if (selected) {
      this.form.trainingName = selected.trainingName;
      this.trainingSearch = this.getTrainingLabel(selected);
    }
  }

  private getValueOrNA(value: string | null | undefined): string {
    const trimmed = (value || '').trim();
    return trimmed || 'NA';
  }

  private validateQuestion(): string[] {
    const errors: string[] = [];
    const options = this.form.options || [];
    const validOptions = options.filter((option) => option.text.trim());

    if (!this.form.trainingName?.trim() && !this.form.trainingId?.trim()) errors.push('Training is required.');
    if (!this.form.questionType) errors.push('Question type is required.');
    if (!this.form.questionText.trim()) errors.push('Question text is required.');
    if (this.form.questionType === 'MCSA' && (validOptions.length < 2 || !this.form.correctOptionId)) errors.push('MCSA requires at least 2 options and exactly 1 correct option.');
    if (this.form.questionType === 'MCMA' && (validOptions.length < 2 || !this.form.correctOptionIds?.length)) errors.push('MCMA requires at least 2 options and at least 1 correct option.');
    if (this.form.questionType === 'TRUE_FALSE' && !this.form.correctOptionId) errors.push('Select the correct True / False answer.');
    if (this.form.questionType === 'ESSAY' && !this.form.expectedAnswer?.trim() && !this.form.sampleAnswer?.trim()) errors.push('Essay requires expected answer or sample answer.');

    return errors;
  }

  private createEmptyQuestion(): TestQuestion {
    return {
      id: 0,
      questionId: '',
      questionNo: this.questionBank.length + 1,
      trainingId: '',
      trainingName: '',
      subject: 'NA',
      topic: 'NA',
      questionType: 'MCSA',
      difficulty: 'Easy',
      questionText: '',
      questionImageUrl: '',
      questionImageAlt: '',
      audioUrl: '',
      videoUrl: '',
      options: [this.createOption(), this.createOption()],
      correctOptionId: '',
      correctOptionIds: [],
      expectedAnswer: '',
      sampleAnswer: '',
      explanation: '',
      explanationImageUrl: '',
      explanationImageAlt: '',
      marks: DEFAULT_QUESTION_MARKS,
      negativeMarks: 0,
      estimatedTimeSeconds: DEFAULT_ESTIMATED_TIME_SECONDS,
      isActive: true,
      version: 1
    };
  }

  private createEditableQuestion(question: TestQuestion): TestQuestion {
    return {
      ...question,
      subject: question.subject || 'NA',
      topic: question.topic || 'NA',
      options: (question.options || []).map((option) => ({ ...option }))
    };
  }

  private buildQuestionFromForm(): TestQuestion {
    const now = new Date().toISOString();

    return {
      ...this.form,
      questionId: this.form.questionId || `q-${Date.now()}`,
      id: this.form.id || Date.now(),
      subject: this.getValueOrNA(this.form.subject),
      topic: this.getValueOrNA(this.form.topic),
      marks: this.getValidMarks(this.form.marks),
      estimatedTimeSeconds: this.getValidDuration(this.form.estimatedTimeSeconds),
      isActive: this.form.isActive !== false,
      version: (this.form.version || 0) + (this.editingIndex === null ? 1 : 1),
      createdAt: this.form.createdAt || now,
      updatedAt: now
    };
  }

  private getValidMarks(value: number | null | undefined): number {
    return value && value > 0 ? value : DEFAULT_QUESTION_MARKS;
  }

  private getValidDuration(value: number | null | undefined): number {
    return value && value > 0 ? value : DEFAULT_ESTIMATED_TIME_SECONDS;
  }

  private createOption(): TestOption {
    return { id: `option-${Date.now()}-${Math.round(Math.random() * 10000)}`, text: '', imageUrl: '' };
  }
}













