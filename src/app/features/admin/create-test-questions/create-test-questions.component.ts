import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Training } from '../../../core/models/training.model';
import { DataService } from '../../../core/services/data.service';
import { QuestionApiService } from '../../test/services/question-api.service';
import { TestApiService } from '../../test/services/test-api.service';
import { TestStorageService } from '../../test/services/test-storage.service';
import { QuestionDto, QuestionOptionDto, QuestionTestImportResultDto } from '../../test/services/test-api.models';
import { TestDefinition, TestQuestion } from '../../test/test.model';

interface TrainingPage { items: Training[]; }
interface PreviewQuestion extends QuestionDto { validationErrors: string[]; }
interface ParsedQuestion {
  text: string; type: string; subject: string; topic: string; difficulty: string;
  answer: string; expectedAnswer: string; explanation: string; marks: string;
  options: Array<{ id: string; text: string }>;
}

@Component({
  selector: 'app-create-test-questions',
  templateUrl: './create-test-questions.component.html',
  styleUrls: ['./create-test-questions.component.scss']
})
export class CreateTestQuestionsComponent implements OnInit, OnDestroy {
  trainings: Training[] = [];
  testTypes: string[] = [];
  trainingId = '';
  trainingSearch = '';
  isTrainingDropdownOpen = false;
  testType = '';
  testName = '';
  questions: PreviewQuestion[] = [];
  result: QuestionTestImportResultDto | null = null;
  progress = 0;
  busy = false;
  fileSaving = false;
  message = '';
  errorMessage = '';
  saveStatus: 'idle' | 'saving' | 'success' | 'error' = 'idle';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly dataService: DataService,
    private readonly questionApi: QuestionApiService,
    private readonly testApi: TestApiService,
    private readonly testStorage: TestStorageService
  ) {}

  ngOnInit(): void {
    this.loadTrainingList();

    this.testApi.getTestTypes().pipe(takeUntil(this.destroy$)).subscribe({
      next: (types) => this.testTypes = types,
      error: (error) => this.fail('Test type dropdown could not be loaded.', error)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get validQuestions(): PreviewQuestion[] {
    return this.questions.filter((question) => !question.validationErrors.length);
  }

  private loadTrainingList(): void {
    const headers = new HttpHeaders({
      ETag: 'f88dd058fe004909615a64f01be66a7',
      'Content-Type': 'application/json'
    });

    this.http.get('assets/Training.json', { headers, responseType: 'text' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const decrypted = this.dataService.decrypt(data);
          this.trainings = (decrypted?.Table || [])
            .map((training: any) => this.mapTrainingFromAsset(training))
            .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        },
        error: (error) => this.fail('Training dropdown could not be loaded.', error)
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
    if (!search) return this.trainings;
    return this.trainings.filter((training) => {
      const label = this.getTrainingLabel(training).toLowerCase();
      const id = String(training.trainingId || '').toLowerCase();
      const topic = (training.topicCovered || '').toLowerCase();
      return label.includes(search) || id.includes(search) || topic.includes(search);
    });
  }

  getTrainingLabel(training: Training): string {
    return training.displayName.replace('Training','') || training.trainingName.replace('Training','') || String(training.trainingId || 'Training');
  }

  getSelectedTrainingLabel(): string {
    const selected = this.trainings.find((training) => String(training.trainingId ?? '') === this.trainingId);
    return selected ? this.getTrainingLabel(selected) : 'Select Training';
  }

  toggleTrainingDropdown(): void {
    if (this.busy) return;
    this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
    if (this.isTrainingDropdownOpen) this.trainingSearch = '';
  }

  onTrainingSearchChange(): void {
    this.isTrainingDropdownOpen = true;
  }

  selectTrainingFromDropdown(training: Training): void {
    this.trainingId = String(training.trainingId ?? '');
    this.trainingSearch = this.getTrainingLabel(training);
    this.isTrainingDropdownOpen = false;
  }

  clearTrainingSelection(): void {
    this.trainingId = '';
    this.trainingSearch = '';
    this.isTrainingDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeTrainingDropdown(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.training-search-field')) {
      this.isTrainingDropdownOpen = false;
    }
  }
  async selectFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.reset();
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.docx') || file.size > 10 * 1024 * 1024) {
      this.errorMessage = 'Select a .docx Word file no larger than 10 MB.';
      input.value = '';
      return;
    }
    this.busy = true;
    this.progress = 20;
    //this.testName = file.name.replace(/\.docx$/i, '');
    try {
      const mammoth = await import('mammoth');
      const extracted = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
      this.progress = 70;
      this.questions = this.parse(extracted.value);
      this.progress = 100;
      this.message = `${this.questions.length} question(s) parsed: ${this.validQuestions.length} valid.`;
    } catch (error) {
      this.fail('The Word file could not be parsed.', error);
    } finally {
      this.busy = false;
    }
  }

  save(): void {
    if (this.busy || this.fileSaving || !this.validQuestions.length) return;
    const training = this.trainings.find((item) => String(item.trainingId || '') === this.trainingId);
    const trainingName = training?.trainingName || training?.displayName || '';
    const questions = this.questions.map(({ validationErrors, ...question }) => ({
      ...question,
      trainingId: this.trainingId,
      trainingName
    }));
    this.busy = true;
    this.progress = 0;
    this.result = null;
    this.message = '';
    this.errorMessage = '';
    this.saveStatus = 'saving';
    this.questionApi.importWordQuestions({
      trainingId: this.trainingId,
      trainingName,
      testType: this.testType,
      testName: this.testName,
      questions
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = event.total ? Math.round(event.loaded * 100 / event.total) : 50;
        }
        if (event.type === HttpEventType.Response && event.body) {
          this.result = event.body;
          this.progress = 100;
          const hasMappedQuestions = event.body.details.some((detail) =>
            !!detail.questionId && (detail.status === 'inserted' || detail.status === 'duplicate')
          );
          if (event.body.testCreated && !!event.body.testId && questions.length > 0 && hasMappedQuestions) {
            this.fileSaving = true;
            this.saveStatus = 'saving';
            this.message = '';
            void this.saveCreatedTestFile(event.body, questions)
              .then(() => {
                this.saveStatus = 'success';
                this.message = `Completed: test ${event.body!.testId}, ${event.body!.inserted + event.body!.duplicate} mapping(s), and encrypted test file were saved.`;
              })
              .catch((error) => {
                this.saveStatus = 'error';
                this.fail('Test and mappings were saved, but the encrypted test file could not be generated.', error);
              })
              .finally(() => {
                this.fileSaving = false;
                this.busy = false;
              });
          } else {
            this.saveStatus = 'success';
            this.message = `Completed: ${event.body.inserted} question(s) saved to the question bank.`;
          }
        }
      },
      error: (error) => {
        this.busy = false;
        this.saveStatus = 'error';
        this.fail('Import failed. The transaction was rolled back.', error);
      },
      complete: () => this.busy = false
    });
  }

  private async saveCreatedTestFile(result: QuestionTestImportResultDto, importedQuestions: QuestionDto[]): Promise<void> {
    const mappedQuestions: TestQuestion[] = result.details
      .filter((detail) => !!detail.questionId && (detail.status === 'inserted' || detail.status === 'duplicate'))
      .map((detail, index) => {
        const source = importedQuestions[detail.rowNumber - 1];
        return {
          ...(source as any),
          id: Number(detail.questionId) || index + 1,
          questionId: detail.questionId,
          questionNo: index + 1,
          questionType: source.questionType as TestQuestion['questionType'],
          difficulty: source.difficulty as TestQuestion['difficulty'],
          options: source.options.map((option) => ({
            id: option.id,
            text: option.text,
            imageUrl: option.imageUrl,
            imageAlt: option.imageAlt
          }))
        } as TestQuestion;
      });
    const mappedQuestionIds = mappedQuestions.map((question) => String(question.questionId));
    if (!result.testCreated || !result.testId || !importedQuestions.length || !mappedQuestions.length) {
      return;
    }
    const now = new Date().toISOString();
    const testType = this.testType.toLowerCase() as 'pre' | 'post' | 'assessment';
    const testFile: TestDefinition = {
      testId: result.testId,
      testName: this.testName,
      displayName: this.testName,
      fileName: result.testId,
      testTitle: this.testName,
      description: this.testName,
      trainingId: this.trainingId,
      trainingName: this.trainings.find((item) => String(item.trainingId || '') === this.trainingId)?.trainingName || '',
      testFileType: testType,
      subject: '',
      topic: '',
      durationMinutes: 60,
      passingPercentage: 50,
      instructions: this.testName,
      status: 'Active',
      mappedQuestionIds,
      questionOrder: mappedQuestionIds,
      totalQuestions: mappedQuestions.length,
      totalMarks: mappedQuestions.reduce((sum, question) => sum + (question.marks || 1), 0),
      createdAt: now,
      updatedAt: now,
      version: 1,
      questions: mappedQuestions
    };

    await this.testStorage.saveAssessmentFileToServer(testFile, testType);
  }

  private parse(text: string): PreviewQuestion[] {
    const parsed: ParsedQuestion[] = [];
    let current: ParsedQuestion | null = null;
    const lines = text.replace(/\r/g, '').split('\n');
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      const start = line.match(/^(?:(?:question\s*\d*|q\s*\d+)|\d+)\s*[:.)-]\s*(.+)$/i);
      if (start) {
        if (current) parsed.push(current);
        const marks = start[1].match(/\(\s*(\d+(?:\.\d+)?)\s*(?:points?|marks?)\s*\)\s*$/i);
        const questionText = start[1].replace(/\s*\(\s*\d+(?:\.\d+)?\s*(?:points?|marks?)\s*\)\s*$/i, '').trim();
        current = this.emptyParsed(questionText);
        if (marks) current.marks = marks[1];
        continue;
      }
      if (!current) continue;
      const option = line.match(/^(?:option\s+)?([a-h]|true|false)\s*[:.)-]\s*(.+)$/i);
      if (option) {
        current.options.push({ id: option[1].toLowerCase(), text: option[2] });
        continue;
      }
      const field = line.match(/^([a-z ]+)\s*:\s*(.*)$/i);
      if (!field) continue;
      const label = field[1].trim().toLowerCase();
      const value = field[2].trim();
      if (['training id', 'training name', 'test type'].includes(label)) continue;
      if (label === 'type' || label === 'question type') current.type = value;
      // Subject and topic are not used for Word-imported questions.
      if (label === 'difficulty') current.difficulty = value;
      if (label === 'answer' || label === 'correct answer') current.answer = value;
      if (label === 'expected answer' || label === 'sample answer') current.expectedAnswer = value;
      if (label === 'explanation') current.explanation = value;
      if (label === 'marks') current.marks = value;
    }
    if (current) parsed.push(current);
    return parsed.map((item, index) => this.toQuestion(item, index));
  }

  private emptyParsed(text: string): ParsedQuestion {
    return {
      text, type: 'MCSA', subject: '', topic: '', difficulty: 'Easy', answer: '',
      expectedAnswer: '', explanation: '', marks: '1', options: []
    };
  }

  private toQuestion(item: ParsedQuestion, index: number): PreviewQuestion {
    const type = this.normalizeType(item.type);
    const sourceOptions = type === 'TRUE_FALSE' && !item.options.length
      ? [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }]
      : item.options;
    const answerIds = item.answer.split(/[,;|]/).map((value) => value.trim().toLowerCase()).filter(Boolean);
    const options: QuestionOptionDto[] = sourceOptions.map((option, optionIndex) => {
      const id = option.id.toLowerCase();
      const correct = answerIds.some((answer) =>
        answer.replace(/^option\s+/, '') === id || answer === option.text.toLowerCase()
      );
      return {
        id, text: option.text, imageUrl: '', audioUrl: '', videoUrl: '', imageAlt: '',
        displayOrder: optionIndex + 1, isCorrect: correct
      };
    });
    const correctIds = options.filter((option) => option.isCorrect).map((option) => option.id);
    const now = new Date().toISOString();
    const question: PreviewQuestion = {
      questionId: '', id: '', trainingId: '', trainingName: '', questionNo: index + 1,
      questionType: type, subject: item.subject, topic: item.topic, category: '', section: '',
      difficulty: this.normalizeDifficulty(item.difficulty), questionText: item.text,
      questionImageUrl: '', questionImageAlt: '', audioUrl: '', videoUrl: '', options,
      correctOptionId: correctIds[0] || '', correctOptionIds: correctIds,
      expectedAnswer: type === 'ESSAY' ? (item.expectedAnswer || item.answer) : '',
      sampleAnswer: '', manualReviewRequired: type === 'ESSAY', explanation: item.explanation,
      explanationImageUrl: '', explanationImageAlt: '', marks: Number(item.marks || 1),
      negativeMarks: 0, estimatedTimeSeconds: 60, metadataJson: '', isActive: true,
      version: 1, createdAt: now, updatedAt: now, validationErrors: []
    };
    question.validationErrors = this.validate(question);
    return question;
  }

  private validate(question: PreviewQuestion): string[] {
    const errors: string[] = [];
    if (!question.questionText) errors.push('Question text is required.');
    if (!Number.isFinite(question.marks) || question.marks <= 0) errors.push('Marks must be greater than zero.');
    if (question.questionType === 'ESSAY') {
      if (!question.expectedAnswer) errors.push('Expected answer is required.');
      return errors;
    }
    if (question.options.length < 2) errors.push('At least two options are required.');
    if (!question.correctOptionIds.length) errors.push('Correct answer must match an option.');
    if (question.questionType !== 'MCMA' && question.correctOptionIds.length > 1) {
      errors.push('Only MCMA may have multiple correct answers.');
    }
    return errors;
  }

  private normalizeType(value: string): string {
    const clean = value.replace(/[\s_-]/g, '').toUpperCase();
    if (clean === 'MCMA') return 'MCMA';
    if (clean === 'TRUEFALSE') return 'TRUE_FALSE';
    if (clean === 'ESSAY') return 'ESSAY';
    return 'MCSA';
  }

  private normalizeDifficulty(value: string): string {
    const clean = value.toLowerCase();
    return clean === 'hard' ? 'Hard' : clean === 'medium' ? 'Medium' : 'Easy';
  }

  private reset(): void {
    this.questions = [];
    this.result = null;
    this.progress = 0;
    this.message = '';
    this.errorMessage = '';
    this.saveStatus = 'idle';
  }

  private fail(message: string, error: unknown): void {
    console.error('[CreateTestQuestions]', message, error);
    const apiMessage = (error as any)?.error?.message
      || (error as any)?.error?.title
      || (error as any)?.message;
    this.errorMessage = apiMessage ? `${message} ${apiMessage}` : message;
  }
}
