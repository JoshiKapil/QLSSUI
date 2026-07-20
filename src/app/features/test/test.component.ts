import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestStorageService } from './services/test-storage.service';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import {
  EvaluationStatus,
  QuestionResult,
  SavedResultListItem,
  TestDefinition,
  TestOption,
  TestQuestion,
  TestQuestionType,
  TestResult,
  TestSubmission,
  TestSummaryItem,
  UserAnswer
} from './test.model';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

const DEFAULT_TEST_NAME = 'Test 1';
const DEFAULT_USERNAME = 'demo-user';
const STORAGE_KEY_START_TEST = 'qlss-start-test';
const DEFAULT_RESULT_SOURCE = 'Current Submitted Result';
const ANSWERED_STATUS = 'answered';
const SKIPPED_STATUS = 'skipped';
const NOT_ANSWERED_STATUS = 'notAnswered';
const PASSING_PERCENTAGE = 60;
const PENDING_RESULT_KEY = 'qlss-pending-test-result';

type ResultTestOption = TestDefinition & { assetFileName?: string; optionKey?: string };

interface ResultUserOption {
  username: string;
  normalizedUsername?: string;
}

interface DirectTrainingOption {
  trainingId: string;
  trainingName: string;
  displayName: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  questions: TestQuestion[] = [];
  currentQuestionIndex = 0;
  answers: UserAnswer[] = [];
  isSubmitted = false;
  isAutoSubmitted = false;
  isSubmitModalOpen = false;
  result: TestResult | null = null;
  resultSourceLabel = '';
  resultSaveWarning = '';
  username = DEFAULT_USERNAME;
  testName = DEFAULT_TEST_NAME;
  testType: 'pre' | 'post' | 'assessment' | 'NOR' = 'assessment';
  private startTrainingId = '';
  savedResultUsername = '';
  savedResultTestName = '';
  isResultTestDropdownOpen = false;
  highlightedResultTestIndex = -1;
  selectedResultTestKey = '';
  resultAvailableTests: ResultTestOption[] = [];
  isResultUserDropdownOpen = false;
  highlightedResultUserIndex = -1;
  selectedResultUsername = '';
  resultAvailableUsers: ResultUserOption[] = [];
  private resultDropdownsLoaded = false;
  savedResultMessage = '';
  savedResults: SavedResultListItem[] = [];
  totalSeconds = 15 * 60;
  remainingSeconds = this.totalSeconds;
  isLoadingTest = true;
  testLoadWarning = '';
  isDirectEntry = false;
  directEntryLoading = false;
  directEntryMessage = '';
  directEmail = '';
  selectedTrainingId = '';
  trainingSearch = '';
  isTrainingDropdownOpen = false;
  directTrainings: DirectTrainingOption[] = [];
  private directTests: TestDefinition[] = [];
  isAdmin = false;
  private destroy$ = new Subject<void>();
  activeTestDefinition: TestDefinition | null = null;

  brokenMedia: { [url: string]: boolean } = {};

  private timerId: ReturnType<typeof setInterval> | null = null;
  private currentQuestionStartedAt: number | null = null;

  constructor(
    private testStorage: TestStorageService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isAdmin = false;
      if (this.isAdmin && !this.resultDropdownsLoaded) {
        this.loadResultDropdownData();
      }
    });
  }

  ngOnInit(): void {
    const startTestData = this.getStartTestData(); 
    console.log('Start Test Data:', startTestData); // Debugging line
    if (!startTestData) {
      this.isDirectEntry = true;
      this.isLoadingTest = false;
      this.loadDirectEntryData();
      return;
    }
    this.testName = this.sanitizeDisplayValue(startTestData?.testName, this.testName);
    this.testType = startTestData?.testType || this.getTestType(this.testName);
    this.startTrainingId = String(startTestData?.trainingId || '').trim();
    this.username = this.sanitizeDisplayValue(startTestData?.username, this.username);
    this.savedResults = this.getSavedResultList();
    if (this.isAdmin && !this.resultDropdownsLoaded) {
      this.loadResultDropdownData();
    }
    if (!this.isAdmin) {
      this.loadTestForAttempt(this.testName);
    }
  }

  private async loadDirectEntryData(): Promise<void> {
    this.directEntryLoading = true;
    this.directEntryMessage = '';

    try {
      const [, tests] = await Promise.all([
        this.loadTrainingList(),
        this.testStorage.listTestDefinitions()
      ]);
      this.directTests = tests;
    } catch {
      this.directEntryMessage = 'Training list could not be loaded. Please try again.';
    } finally {
      this.directEntryLoading = false;
    }
  }

  private async loadTrainingList(): Promise<void> {
    const headers = new HttpHeaders({
      ETag: 'f88dd058fe004909615a64f01be66a7',
      'Content-Type': 'application/json'
    });
    const encryptedData = await firstValueFrom(
      this.http.get('assets/Training.json', { headers, responseType: 'text' })
    );
    const trainings = this.dataService.decrypt(encryptedData)?.Table || [];

    this.directTrainings = trainings
      .map((training: any): DirectTrainingOption => ({
        trainingId: String(training.TrainingId ?? training.trainingId ?? ''),
        trainingName: training.TrainingName ?? training.trainingName ?? '',
        displayName: training.DisplayName ?? training.displayName ?? training.TrainingName ?? ''
      }))
      .filter((training: DirectTrainingOption) => training.trainingId && this.getDirectTrainingLabel(training))
      .sort((a: DirectTrainingOption, b: DirectTrainingOption) =>
        this.getDirectTrainingLabel(a).localeCompare(this.getDirectTrainingLabel(b))
      );
  }

  async startDirectTest(): Promise<void> {
    this.directEntryMessage = '';
    const email = this.directEmail.trim();

    if (!this.selectedTrainingId || !email || !this.isValidEmail(email)) {
      this.directEntryMessage = 'Select training and enter a valid email address.';
      return;
    }

    this.directEntryLoading = true;

    try {
      if (this.testType === 'post') {
        const isAllowed = await this.testStorage.validatePostTestAccess(email, this.selectedTrainingId);
        if (!isAllowed) {
          this.directEntryMessage = 'This email is not registered for the selected training.';
          return;
        }
      }

      const selectedTest = this.directTests.find((test) =>
        String(test.trainingId || '') === this.selectedTrainingId &&
        this.getDefinitionTestType(test) === this.testType
      );

      if (!selectedTest) {
        this.directEntryMessage = 'No test is available for the selected training and test type.';
        return;
      }

      this.username = email;
      this.isDirectEntry = false;
      this.loadTestForAttempt(selectedTest.testId);
    } catch {
      this.directEntryMessage = 'Test access could not be verified. Please try again.';
    } finally {
      this.directEntryLoading = false;
    }
  }

  get filteredDirectTrainings(): DirectTrainingOption[] {
    const search = this.trainingSearch.trim().toLowerCase();
    if (!search) {
      return this.directTrainings;
    }

    return this.directTrainings.filter((training) =>
      this.getDirectTrainingLabel(training).toLowerCase().includes(search) ||
      training.trainingId.toLowerCase().includes(search)
    );
  }

  getDirectTrainingLabel(training: DirectTrainingOption): string {
    return training.trainingName || training.displayName || training.trainingId;
  }

  getSelectedDirectTrainingLabel(): string {
    const selected = this.directTrainings.find((training) => training.trainingId === this.selectedTrainingId);
    return selected ? this.getDirectTrainingLabel(selected) : 'Select Training';
  }

  toggleDirectTrainingDropdown(): void {
    this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
    if (this.isTrainingDropdownOpen) {
      this.trainingSearch = '';
    }
  }

  selectDirectTraining(training: DirectTrainingOption): void {
    this.selectedTrainingId = training.trainingId;
    this.trainingSearch = this.getDirectTrainingLabel(training);
    this.isTrainingDropdownOpen = false;
  }

  private getDefinitionTestType(test: TestDefinition): 'pre' | 'post' | 'assessment' | 'NOR' {
    if (test.testFileType) {
      return test.testFileType;
    }

    try {
      const metadata = JSON.parse(String((test as any).metadataJson || '{}'));
      if (metadata.testType === 'pre' || metadata.testType === 'post' || metadata.testType === 'assessment' || metadata.testType === 'NOR') {
        return metadata.testType;
      }
    } catch {
      // Test names are used only for older records without test type metadata.
    }

    return this.getTestType(test.testName || test.displayName || '');
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private getStartTestData(): { testName: string; username: string; testType?: 'pre' | 'post' | 'assessment' | 'NOR'; trainingId?: string; name?: string; contact?: string } | null {
    const savedData = sessionStorage.getItem(STORAGE_KEY_START_TEST);
    sessionStorage.removeItem(STORAGE_KEY_START_TEST);

    if (!savedData) {
      return null;
    }

    try {
      return JSON.parse(savedData);
    } catch {
      return null;
    }
  }

  private sanitizeDisplayValue(value: string | undefined, fallback: string): string {
    return (value || '').trim() || fallback;
  }

  private getTestType(testName: string): 'pre' | 'post' | 'assessment' {
    const normalizedName = testName.toLowerCase();
    if (normalizedName.includes('pre')) return 'pre';
    if (normalizedName.includes('post')) return 'post';
    return 'assessment';
  }

  ngOnDestroy(): void {
    this.saveCurrentQuestionTime();
    this.clearTimer();
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentQuestion(): TestQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  get currentAnswer(): UserAnswer {
    return this.answers[this.currentQuestionIndex];
  }

  get timerText(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
  }

  get answeredCount(): number {
    return this.answers.filter((answer) => answer.status === ANSWERED_STATUS).length;
  }

  get skippedCount(): number {
    return this.answers.filter((answer) => answer.status === SKIPPED_STATUS).length;
  }

  get notAnsweredCount(): number {
    return this.answers.filter((answer) => answer.status === NOT_ANSWERED_STATUS).length;
  }

  loadAssessmentByTestName(testName: string): void {
    this.loadTestForAttempt(testName);
  }
//SPCPreTest
  loadTestForAttempt(testName: string): void {
    const displayTestName = this.sanitizeDisplayValue(testName, DEFAULT_TEST_NAME);

    this.isLoadingTest = true;
    this.testLoadWarning = '';
    this.saveCurrentQuestionTime();
    this.clearTimer();

    // Previous database/local assessment lookup kept for reference:
    // this.testStorage.resolveAssessmentQuestions(displayTestName)
    this.testStorage.resolveAssessmentFileQuestions(displayTestName, this.testType === 'NOR' ? 'assessment' : this.testType)
      .then((attempt) => {
        this.applyTestAttempt(attempt.testDefinition, attempt.questions, attempt.missingQuestionIds);
      })
      .catch(() => this.handleTestLoadFailure(displayTestName))
      .finally(() => (this.isLoadingTest = false));
  }

  private handleTestLoadFailure(displayTestName: string): void {
    this.questions = [];
    this.answers = [];
    this.activeTestDefinition = null;
    this.testName = displayTestName;
    this.testLoadWarning = 'Assessment could not be loaded. Please create or import the encrypted assessment first.';
  }

  loadSavedSubmission(username: string, testName: string): void {
    this.savedResultMessage = '';

    const normalizedUsername = username.trim();
    const normalizedTestName = testName.trim();

    if (!normalizedUsername) {
      this.savedResultMessage = 'Select a user.';
      return;
    }

    if (!normalizedTestName) {
      this.savedResultMessage = 'Select a test.';
      return;
    }

    this.testStorage.loadSavedSubmission(normalizedUsername, normalizedTestName)
      .then((submission) => {
        if (!submission) {
          this.savedResultMessage = 'No saved result found.';
          return;
        }

        this.displaySubmissionResult({ ...submission, resultSource: 'Saved Result Loaded' });
      })
      .catch(() => {
        this.savedResultMessage = 'Saved result could not be loaded.';
      });
  }

  saveSubmissionResult(submission: TestSubmission): Promise<void> {
    return this.testStorage.saveSubmissionResult(submission);
  }

  displaySubmissionResult(submission: TestSubmission): void {
    this.questions = submission.questions;
    this.answers = submission.userAnswers;
    this.result = submission.resultSummary;
    this.resultSourceLabel = submission.resultSource;
    this.isAutoSubmitted = submission.isAutoSubmitted;
    this.isSubmitted = true;
    this.savedResults = this.getSavedResultList();
  }

  getSavedResultList(): SavedResultListItem[] {
    return this.testStorage.getSavedResultList();
  }

  async loadResultDropdownData(): Promise<void> {
    this.resultDropdownsLoaded = true;
    this.savedResults = this.getSavedResultList();
    this.resultAvailableTests = this.buildResultTestOptions([], this.savedResults);
    this.resultAvailableUsers = this.buildResultUserOptions([], this.savedResults);

    const [tests, users, savedResults] = await Promise.all([
      this.loadResultTests(),
      this.loadResultUsers(),
      this.loadResultSavedResults()
    ]);

    this.savedResults = savedResults.length ? savedResults : this.savedResults;
    this.resultAvailableTests = this.buildResultTestOptions(tests, this.savedResults);
    this.resultAvailableUsers = this.buildResultUserOptions(users, this.savedResults);
  }

  private async loadResultTests(): Promise<TestDefinition[]> {
    try {
      return await this.testStorage.listTestDefinitions();
    } catch {
      return this.testStorage.listAssessments();
    }
  }

  private async loadResultUsers(): Promise<string[]> {
    try {
      return await this.testStorage.listResultUsers();
    } catch {
      return [];
    }
  }

  private async loadResultSavedResults(): Promise<SavedResultListItem[]> {
    try {
      return await this.testStorage.listSavedResults();
    } catch {
      return this.getSavedResultList();
    }
  }

  private buildResultTestOptions(tests: TestDefinition[], savedResults: SavedResultListItem[]): ResultTestOption[] {
    const options = new Map<string, ResultTestOption>();

    tests.forEach((test) => {
      const assetFileName = (test as any).assetFileName;
      const optionKey = assetFileName
        ? `asset:${assetFileName}`
        : `local:${this.testStorage.normalizeFileName(test.testName)}`;
      const label = test.displayName || test.testName || test.fileName || '';

      if (label) {
        options.set(optionKey, { ...test, optionKey, assetFileName });
      }
    });

    savedResults.forEach((item) => {
      const label = item.testName || item.fileName || '';
      const optionKey = `saved:${this.testStorage.normalizeFileName(label)}`;

      if (label && !options.has(optionKey)) {
        options.set(optionKey, {
          testId: optionKey,
          testName: label,
          displayName: label,
          fileName: item.fileName || this.testStorage.normalizeFileName(label),
          testTitle: label,
          description: '',
          subject: '',
          topic: '',
          durationMinutes: 0,
          passingPercentage: PASSING_PERCENTAGE,
          instructions: '',
          status: 'Active',
          mappedQuestionIds: [],
          questionOrder: [],
          totalQuestions: 0,
          totalMarks: 0,
          version: 1,
          createdAt: item.submittedAt || new Date().toISOString(),
          updatedAt: item.submittedAt || new Date().toISOString(),
          optionKey
        });
      }
    });

    return Array.from(options.values()).sort((a, b) => this.getResultTestLabel(a).localeCompare(this.getResultTestLabel(b)));
  }

  private buildResultUserOptions(users: string[], savedResults: SavedResultListItem[]): ResultUserOption[] {
    const options = new Map<string, ResultUserOption>();

    users.forEach((username) => this.addResultUserOption(options, username));
    savedResults.forEach((item) => this.addResultUserOption(options, item.username || item.normalizedUsername || ''));

    return Array.from(options.values()).sort((a, b) => a.username.localeCompare(b.username));
  }

  private addResultUserOption(options: Map<string, ResultUserOption>, username: string): void {
    const cleanUsername = (username || '').trim();
    if (!cleanUsername) {
      return;
    }

    const key = this.testStorage.normalizeFileName(cleanUsername).toLowerCase();
    if (!options.has(key)) {
      options.set(key, { username: cleanUsername, normalizedUsername: this.testStorage.normalizeFileName(cleanUsername) });
    }
  }

  private getResultTestLabel(test: ResultTestOption): string {
    return test.displayName || test.testName || test.fileName || 'Test';
  }

  getSelectedResultTestLabel(): string {
    const selectedTest = this.resultAvailableTests.find((test) => test.optionKey === this.selectedResultTestKey);
    return selectedTest ? this.getResultTestLabel(selectedTest) : 'Select Test';
  }

  toggleResultTestDropdown(): void {
    this.isResultTestDropdownOpen = !this.isResultTestDropdownOpen;
    this.isResultUserDropdownOpen = false;

    if (this.isResultTestDropdownOpen) {
      const currentIndex = this.resultAvailableTests.findIndex((test) => test.optionKey === this.selectedResultTestKey);
      this.highlightedResultTestIndex = currentIndex >= 0 ? currentIndex : 0;
    } else {
      this.highlightedResultTestIndex = -1;
    }
  }

  closeResultTestDropdown(): void {
    this.isResultTestDropdownOpen = false;
    this.highlightedResultTestIndex = -1;
  }

  selectResultTest(test: ResultTestOption): void {
    this.selectedResultTestKey = test.optionKey || '';
    this.savedResultTestName = test.displayName || test.testName || test.fileName || '';
    this.closeResultTestDropdown();
  }

  onResultTestDropdownKeydown(event: KeyboardEvent): void {
    this.handleResultDropdownKeydown(event, this.resultAvailableTests.length, this.isResultTestDropdownOpen, this.highlightedResultTestIndex, (index) => {
      this.highlightedResultTestIndex = index;
    }, () => this.toggleResultTestDropdown(), (index) => this.selectResultTest(this.resultAvailableTests[index]), () => this.closeResultTestDropdown());
  }

  getSelectedResultUserLabel(): string {
    return this.selectedResultUsername || 'Select User';
  }

  toggleResultUserDropdown(): void {
    this.isResultUserDropdownOpen = !this.isResultUserDropdownOpen;
    this.isResultTestDropdownOpen = false;

    if (this.isResultUserDropdownOpen) {
      const currentIndex = this.resultAvailableUsers.findIndex((user) => user.username === this.selectedResultUsername);
      this.highlightedResultUserIndex = currentIndex >= 0 ? currentIndex : 0;
    } else {
      this.highlightedResultUserIndex = -1;
    }
  }

  closeResultUserDropdown(): void {
    this.isResultUserDropdownOpen = false;
    this.highlightedResultUserIndex = -1;
  }

  selectResultUser(user: ResultUserOption): void {
    this.selectedResultUsername = user.username;
    this.savedResultUsername = user.username;
    this.closeResultUserDropdown();
  }

  onResultUserDropdownKeydown(event: KeyboardEvent): void {
    this.handleResultDropdownKeydown(event, this.resultAvailableUsers.length, this.isResultUserDropdownOpen, this.highlightedResultUserIndex, (index) => {
      this.highlightedResultUserIndex = index;
    }, () => this.toggleResultUserDropdown(), (index) => this.selectResultUser(this.resultAvailableUsers[index]), () => this.closeResultUserDropdown());
  }

  private handleResultDropdownKeydown(
    event: KeyboardEvent,
    optionCount: number,
    isOpen: boolean,
    highlightedIndex: number,
    setHighlightedIndex: (index: number) => void,
    openDropdown: () => void,
    selectIndex: (index: number) => void,
    closeDropdown: () => void
  ): void {
    if (!optionCount && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        openDropdown();
        return;
      }

      const maxIndex = optionCount - 1;
      setHighlightedIndex(event.key === 'ArrowDown'
        ? (highlightedIndex < maxIndex ? highlightedIndex + 1 : 0)
        : (highlightedIndex > 0 ? highlightedIndex - 1 : maxIndex));
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (isOpen && highlightedIndex >= 0) {
        event.preventDefault();
        selectIndex(highlightedIndex);
      }
      return;
    }

    if (event.key === 'Escape') {
      closeDropdown();
    }
  }
  clearSavedResultSearch(): void {
    this.savedResultUsername = '';
    this.savedResultTestName = '';
    this.selectedResultUsername = '';
    this.selectedResultTestKey = '';
    this.closeResultUserDropdown();
    this.closeResultTestDropdown();
    this.savedResultMessage = '';
  }

  viewSavedResult(item: SavedResultListItem): void {
    this.loadSavedSubmission(item.username, item.testName);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.direct-training-search')) {
      this.isTrainingDropdownOpen = false;
    }
    if (!target.closest('.result-dropdown')) {
      this.closeResultTestDropdown();
      this.closeResultUserDropdown();
    }
  }

  downloadCurrentResult(): void {
    if (!this.result) {
      return;
    }

    const submission = this.buildSubmissionPayload(this.result, this.isAutoSubmitted, this.resultSourceLabel || DEFAULT_RESULT_SOURCE);
    this.testStorage.exportSubmissionResult(submission)
      .then((blob) => this.testStorage.downloadBlob(blob, `${submission.testName}-result.json`))
      .catch(() => (this.resultSaveWarning = 'Result export failed.'));
  }
  selectOption(optionId: string): void {
    if (this.isSubmitted || this.isSubmitModalOpen || this.isEssayQuestion(this.currentQuestion)) {
      return;
    }

    if (this.currentQuestion.questionType === 'MCMA') {
      this.toggleMultipleOption(optionId);
      return;
    }

    this.currentAnswer.selectedOptionId = optionId;
    this.currentAnswer.selectedOptionIds = [optionId];
    this.currentAnswer.status = ANSWERED_STATUS;
  }

  onEssayAnswerChange(value: string): void {
    if (this.isSubmitted || this.isSubmitModalOpen) {
      return;
    }

    this.currentAnswer.essayAnswer = value;
    this.currentAnswer.status = value.trim() ? ANSWERED_STATUS : NOT_ANSWERED_STATUS;
  }

  clearCurrentAnswer(): void {
    if (this.isSubmitted || this.isSubmitModalOpen || !this.hasCurrentAnswer()) {
      return;
    }

    this.currentAnswer.selectedOptionId = null;
    this.currentAnswer.selectedOptionIds = [];
    this.currentAnswer.essayAnswer = '';
    this.currentAnswer.status = NOT_ANSWERED_STATUS;
    this.currentAnswer.evaluationStatus = NOT_ANSWERED_STATUS;
  }

  hasCurrentAnswer(): boolean {
    return this.hasAnswer(this.currentQuestion, this.currentAnswer);
  }

  isOptionSelected(optionId: string): boolean {
    if (this.currentQuestion.questionType === 'MCMA') {
      return this.currentAnswer.selectedOptionIds.includes(optionId);
    }

    return this.currentAnswer.selectedOptionId === optionId;
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  isMultipleAnswerQuestion(question: TestQuestion): boolean {
    return question.questionType === 'MCMA';
  }

  moveToQuestion(index: number): void {
    if (index < 0 || index >= this.questions.length || index === this.currentQuestionIndex || this.isSubmitted || this.isSubmitModalOpen) {
      return;
    }

    this.saveCurrentQuestionTime();
    this.currentQuestionIndex = index;
    this.startQuestionVisit();
  }

  goToQuestion(index: number): void {
    this.moveToQuestion(index);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      // Keep the user on the last question and open the submit confirmation.
      this.openSubmitModal();
      return;
    }

    this.moveToQuestion(this.currentQuestionIndex + 1);
  }

  previousQuestion(): void {
    this.moveToQuestion(this.currentQuestionIndex - 1);
  }

  skipQuestion(): void {
    if (this.isSubmitted || this.isSubmitModalOpen) {
      return;
    }

    if (!this.hasCurrentAnswer()) {
      this.currentAnswer.status = SKIPPED_STATUS;
    }

    this.moveToQuestion(this.currentQuestionIndex + 1);
  }

  openSubmitModal(): void {
    if (this.isSubmitted) {
      return;
    }

    this.saveCurrentQuestionTime();
    this.isSubmitModalOpen = true;
  }

  closeSubmitModal(): void {
    if (this.isSubmitted) {
      return;
    }

    this.isSubmitModalOpen = false;
    this.startQuestionVisit();
  }

  submitFromModal(): void {
    this.submitTest(false);
  }

  submitTest(isAutoSubmitted = false): void {
    if (this.isSubmitted) {
      return;
    }

    this.saveCurrentQuestionTime();
    this.clearTimer();
    this.isSubmitModalOpen = false;
    this.isAutoSubmitted = isAutoSubmitted;

    const resultSummary = this.calculateResult();
    const submission = this.buildSubmissionPayload(resultSummary, isAutoSubmitted, DEFAULT_RESULT_SOURCE);
    this.isSubmitted = true;

    this.saveSubmissionResult(submission)
      .then(() => {
        this.completeSubmissionNavigation(submission, '');
      })
      .catch(() => {
        this.completeSubmissionNavigation(submission, 'Result is shown, but could not be saved.');
      });
  }

  private completeSubmissionNavigation(submission: TestSubmission, warning: string): void {
    if (this.testType === 'NOR') {
      this.router.navigate(['/training']);
      return;
    }

    this.openResultPage(submission, warning);
  }

  private openResultPage(submission: TestSubmission, warning: string): void {
    sessionStorage.setItem(PENDING_RESULT_KEY, JSON.stringify({ submission, warning }));
    this.router.navigate(['/test/result']);
  }

  restartTest(): void {
    this.currentQuestionIndex = 0;
    this.remainingSeconds = this.totalSeconds;
    this.isSubmitted = false;
    this.isAutoSubmitted = false;
    this.isSubmitModalOpen = false;
    this.result = null;
    this.resultSourceLabel = '';
    this.resultSaveWarning = '';
    this.answers = this.createEmptyAnswers();
    this.startQuestionVisit();
    this.startTimer();
  }

  getQuestionStatus(index: number): string {
    // if (index === this.currentQuestionIndex && !this.isSubmitted) {
    //   return 'Current Question';
    // }

    const status = this.answers[index].status;

    if (status === ANSWERED_STATUS) {
      return 'Answered';
    }

    if (status === SKIPPED_STATUS) {
      return 'Skipped';
    }

    return 'Not Answered';
  }

  getReviewOptionClass(question: TestQuestion, answer: UserAnswer, optionId: string): string {
    const isSelected = this.isReviewOptionSelected(question, answer, optionId);
    const isCorrect = this.getCorrectOptionIds(question).includes(optionId);

    if (isSelected && isCorrect) {
      return 'test-option--correct';
    }

    if (isSelected && !isCorrect) {
      return 'test-option--wrong';
    }

    if (isCorrect) {
      return 'test-option--correct-answer';
    }

    return '';
  }

  getEvaluationClass(answer: UserAnswer): string {
    return `evaluation--${answer.evaluationStatus}`;
  }

  getEvaluationLabel(answer: UserAnswer): string {
    const labels: { [key in EvaluationStatus]: string } = {
      correct: 'Correct',
      wrong: 'Wrong',
      skipped: 'Skipped',
      manualReview: 'Manual Review Required',
      notAnswered: 'Not Answered'
    };

    return labels[answer.evaluationStatus];
  }

  getSelectedAnswerText(question: TestQuestion, answer: UserAnswer): string {
    if (question.questionType === 'ESSAY') {
      return answer.essayAnswer.trim() || 'Not answered';
    }

    const selectedIds = question.questionType === 'MCMA' ? answer.selectedOptionIds : (answer.selectedOptionId ? [answer.selectedOptionId] : []);

    if (!selectedIds.length) {
      return 'Not answered';
    }

    return this.getOptionTexts(question, selectedIds).join(', ');
  }

  getCorrectAnswerText(question: TestQuestion): string {
    if (question.questionType === 'ESSAY') {
      return question.expectedAnswer || 'Manual review required';
    }

    return this.getOptionTexts(question, this.getCorrectOptionIds(question)).join(', ');
  }

  getQuestionMarks(question: TestQuestion): number {
    return question.marks && question.marks > 0 ? question.marks : 1;
  }

  getQuestionNegativeMarks(question: TestQuestion): number {
    return question.negativeMarks || 0;
  }

  getQuestionTypeLabel(type: TestQuestionType): string {
    const labels: { [key in TestQuestionType]: string } = {
      MCSA: 'Single Answer',
      MCMA: 'Multiple Answer',
      TRUE_FALSE: 'True / False',
      ESSAY: 'Essay'
    };

    return labels[type];
  }

  isEssayQuestion(question: TestQuestion): boolean {
    return question.questionType === 'ESSAY';
  }

  hasOptions(question: TestQuestion): boolean {
    return !!question.options && question.options.length > 0;
  }

  markBrokenMedia(url: string | undefined): void {
    if (url) {
      this.brokenMedia[url] = true;
    }
  }

  isMediaAvailable(url: string | undefined): boolean {
    return !!url && !this.brokenMedia[url];
  }

  hasVisibleMedia(question: TestQuestion): boolean {
    return (
      this.isMediaAvailable(question.questionImageUrl) ||
      this.isMediaAvailable(question.audioUrl) ||
      this.isMediaAvailable(question.videoUrl)
    );
  }

  trackByQuestionId(_index: number, question: TestQuestion): number {
    return question.id;
  }

  trackByOptionId(_index: number, option: TestOption): string {
    return option.id;
  }

  trackBySummaryLabel(_index: number, item: TestSummaryItem): string {
    return item.label;
  }

  private buildSubmissionPayload(resultSummary: TestResult, isAutoSubmitted: boolean, resultSource: string): TestSubmission {
    // Save the randomized attempt order so the result shows the same question sequence.
    const questionsInAttemptOrder = [...this.questions];
    const solutionReview = questionsInAttemptOrder.map((question, index) => this.buildQuestionResult(question, this.answers[index], index));
    const displayName = this.activeTestDefinition?.displayName || this.testName || 'Test 1';
    const fileName = this.testStorage.normalizeFileName(displayName);
    const username = this.username.trim() || 'demo-user';

    return {
      submissionId: `submission-${Date.now()}`,
      username,
      normalizedUsername: this.testStorage.normalizeFileName(username),
      testId: this.activeTestDefinition?.testId,
      testName: displayName,
      displayName,
      fileName,
      testTitle: this.activeTestDefinition?.testTitle || displayName,
      submittedAt: new Date().toISOString(),
      isAutoSubmitted,
      resultSource,
      testDetailsSnapshot: this.activeTestDefinition || undefined,
      questionSnapshots: questionsInAttemptOrder,
      totalDurationSeconds: this.totalSeconds,
      totalTimeUsedSeconds: resultSummary.totalTimeUsedSeconds,
      questions: questionsInAttemptOrder,
      userAnswers: this.answers,
      resultSummary,
      questionResults: solutionReview,
      solutionReview,
      manualReviewItems: solutionReview.filter((item) => item.evaluationStatus === 'manualReview'),
      questionTypeBreakdown: resultSummary.questionTypeBreakdown,
      difficultyBreakdown: resultSummary.difficultyBreakdown,
      subjectWiseSummary: resultSummary.subjectWiseSummary,
      topicWiseSummary: resultSummary.topicWiseSummary
    };
  }
  private buildQuestionResult(question: TestQuestion, answer: UserAnswer, index: number): QuestionResult {
    const status = answer.evaluationStatus;
    const marks = this.getQuestionMarks(question);
    const negativeMarks = this.getQuestionNegativeMarks(question);
    const obtainedMarks = status === 'correct' ? marks : status === 'wrong' ? -negativeMarks : 0;

    return {
      questionId: question.id,
      questionNo: index + 1,
      questionType: question.questionType,
      subject: question.subject,
      topic: question.topic,
      difficulty: question.difficulty,
      questionText: question.questionText,
      selectedOptionId: answer.selectedOptionId,
      selectedOptionIds: answer.selectedOptionIds,
      essayAnswer: answer.essayAnswer,
      correctOptionId: question.correctOptionId,
      correctOptionIds: question.correctOptionIds,
      evaluationStatus: status,
      timeSpentSeconds: answer.timeSpentSeconds,
      marks,
      negativeMarks,
      obtainedMarks,
      explanation: question.explanation,
      mediaUrls: {
        questionImageUrl: question.questionImageUrl,
        audioUrl: question.audioUrl,
        videoUrl: question.videoUrl,
        explanationImageUrl: question.explanationImageUrl
      }
    };
  }

  private applyTestAttempt(testDefinition: TestDefinition, questions: TestQuestion[], missingQuestionIds: string[]): void {
    if (!questions.length) {
      this.testLoadWarning = 'No active mapped questions were found for this assessment.';
      return;
    }

    // Randomize questions for every new test attempt.
    const randomizedQuestions = this.shuffleQuestions(questions);

    this.questions = randomizedQuestions.map((question, index) => ({
      ...question,
      questionNo: index + 1,
      marks: question.marks && question.marks > 0 ? question.marks : 1,
      negativeMarks: question.negativeMarks || 0,
      estimatedTimeSeconds: question.estimatedTimeSeconds && question.estimatedTimeSeconds > 0 ? question.estimatedTimeSeconds : 60
    }));
    this.activeTestDefinition = {
      ...testDefinition,
      trainingId: this.startTrainingId || testDefinition.trainingId,
      testFileType: this.testType
    };
    this.testName = this.sanitizeDisplayValue(testDefinition.displayName || testDefinition.testName, DEFAULT_TEST_NAME);
    this.totalSeconds = testDefinition.durationMinutes && testDefinition.durationMinutes > 0 ? testDefinition.durationMinutes * 60 : this.totalSeconds;
    this.remainingSeconds = this.totalSeconds;
    this.currentQuestionIndex = 0;
    this.isSubmitted = false;
    this.isAutoSubmitted = false;
    this.isSubmitModalOpen = false;
    this.result = null;
    this.resultSourceLabel = '';
    this.resultSaveWarning = '';
    this.answers = this.createEmptyAnswers();
    this.brokenMedia = {};
    this.testLoadWarning = missingQuestionIds.length ? `${missingQuestionIds.length} mapped question(s) were not found in the question bank.` : '';
    this.startQuestionVisit();
    if (!this.isAdmin)
      this.startTimer();
  }

  private shuffleQuestions(questions: TestQuestion[]): TestQuestion[] {
    const shuffledQuestions = [...questions];

    for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffledQuestions[index], shuffledQuestions[randomIndex]] =
        [shuffledQuestions[randomIndex], shuffledQuestions[index]];
    }

    return shuffledQuestions;
  }

  private toggleMultipleOption(optionId: string): void {
    const selectedIds = this.currentAnswer.selectedOptionIds;

    if (selectedIds.includes(optionId)) {
      this.currentAnswer.selectedOptionIds = selectedIds.filter((id) => id !== optionId);
    } else {
      this.currentAnswer.selectedOptionIds = [...selectedIds, optionId];
    }

    this.currentAnswer.selectedOptionId = this.currentAnswer.selectedOptionIds[0] || null;
    this.currentAnswer.status = this.currentAnswer.selectedOptionIds.length ? ANSWERED_STATUS : NOT_ANSWERED_STATUS;
  }

  private startQuestionVisit(): void {
    if (this.isSubmitted || this.isSubmitModalOpen) {
      return;
    }

    const now = Date.now();
    const answer = this.currentAnswer;

    if (!answer.firstVisitedAt) {
      answer.firstVisitedAt = now;
    }

    answer.lastVisitedAt = now;
    answer.visitedCount += 1;
    this.currentQuestionStartedAt = now;
  }

  private saveCurrentQuestionTime(): void {
    if (this.currentQuestionStartedAt === null || !this.answers.length) {
      return;
    }

    const elapsedSeconds = Math.floor((Date.now() - this.currentQuestionStartedAt) / 1000);

    if (elapsedSeconds > 0) {
      this.currentAnswer.timeSpentSeconds += elapsedSeconds;
      this.currentAnswer.lastVisitedAt = Date.now();
    }

    this.currentQuestionStartedAt = null;
  }

  private startTimer(): void {
    this.clearTimer();

    this.timerId = setInterval(() => {
      if (this.remainingSeconds <= 1) {
        this.remainingSeconds = 0;
        this.submitTest(true);
        return;
      }

      this.remainingSeconds -= 1;
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private calculateResult(): TestResult {
    let correct = 0;
    let wrong = 0;
    let manualReviewCount = 0;
    let positiveMarks = 0;
    let manualReviewMarks = 0;
    let negativeMarksDeducted = 0;
    const perQuestionObtainedMarks: number[] = [];
    const totalMarks = this.questions.reduce((sum, question) => sum + this.getQuestionMarks(question), 0);

    this.questions.forEach((question, index) => {
      const answer = this.answers[index];
      const marks = this.getQuestionMarks(question);
      const negativeMarks = this.getQuestionNegativeMarks(question);
      let questionObtainedMarks = 0;

      answer.evaluationStatus = this.evaluateAnswer(question, answer);

      if (answer.evaluationStatus === 'correct') {
        correct += 1;
        positiveMarks += marks;
        questionObtainedMarks = marks;
      } else if (answer.evaluationStatus === 'wrong') {
        wrong += 1;
        negativeMarksDeducted += negativeMarks;
        questionObtainedMarks = -negativeMarks;
      } else if (answer.evaluationStatus === 'manualReview') {
        manualReviewCount += 1;
        manualReviewMarks += marks;
      }

      perQuestionObtainedMarks[index] = questionObtainedMarks;
    });

    const obtainedMarks = Math.max(0, positiveMarks - negativeMarksDeducted);
    const totalTimeUsedSeconds = this.answers.reduce((sum, answer) => sum + answer.timeSpentSeconds, 0);
    const averageTimePerQuestionSeconds = this.answeredCount ? Math.round(totalTimeUsedSeconds / this.answeredCount) : 0;
    const percentage = totalMarks ? Math.round((obtainedMarks / totalMarks) * 100) : 0;

    return {
      totalQuestions: this.questions.length,
      attempted: this.answeredCount,
      skipped: this.skippedCount,
      notAnswered: this.notAnsweredCount,
      correct,
      wrong,
      manualReviewCount,
      totalMarks,
      obtainedMarks,
      manualReviewMarks,
      negativeMarksDeducted,
      percentage,
      passed: percentage >= PASSING_PERCENTAGE,
      totalTimeUsedSeconds,
      averageTimePerQuestionSeconds,
      questionTypeBreakdown: this.buildBreakdown((question) => this.getQuestionTypeLabel(question.questionType), perQuestionObtainedMarks),
      difficultyBreakdown: this.buildBreakdown((question) => question.difficulty, perQuestionObtainedMarks),
      marksBreakdown: this.buildBreakdown((question) => `${this.getQuestionMarks(question)} Mark${this.getQuestionMarks(question) === 1 ? '' : 's'}`, perQuestionObtainedMarks),
      subjectWiseSummary: this.buildBreakdown((question) => question.subject, perQuestionObtainedMarks),
      topicWiseSummary: this.buildBreakdown((question) => question.topic, perQuestionObtainedMarks)
    };
  }

  private evaluateAnswer(question: TestQuestion, answer: UserAnswer): EvaluationStatus {
    if (answer.status === 'skipped') {
      return 'skipped';
    }

    if (!this.hasAnswer(question, answer)) {
      return 'notAnswered';
    }

    if (question.questionType === 'ESSAY') {
      if (question.expectedAnswer && this.normalizeText(answer.essayAnswer) === this.normalizeText(question.expectedAnswer)) {
        return 'correct';
      }

      return 'manualReview';
    }

    if (question.questionType === 'MCMA') {
      return this.areOptionSetsEqual(answer.selectedOptionIds, question.correctOptionIds || []) ? 'correct' : 'wrong';
    }

    return answer.selectedOptionId === question.correctOptionId ? 'correct' : 'wrong';
  }

  private buildBreakdown(getLabel: (question: TestQuestion) => string, perQuestionObtainedMarks: number[]): TestSummaryItem[] {
    const summary: { [label: string]: TestSummaryItem } = {};

    this.questions.forEach((question, index) => {
      const label = getLabel(question);

      if (!summary[label]) {
        summary[label] = { label, total: 0, correct: 0, marks: 0, obtainedMarks: 0 };
      }

      summary[label].total += 1;
      summary[label].marks = (summary[label].marks || 0) + this.getQuestionMarks(question);
      summary[label].obtainedMarks = Math.max(0, (summary[label].obtainedMarks || 0) + perQuestionObtainedMarks[index]);

      if (this.answers[index].evaluationStatus === 'correct') {
        summary[label].correct = (summary[label].correct || 0) + 1;
      }
    });

    return Object.values(summary);
  }

  private hasAnswer(question: TestQuestion, answer: UserAnswer): boolean {
    if (question.questionType === 'ESSAY') {
      return !!answer.essayAnswer.trim();
    }

    if (question.questionType === 'MCMA') {
      return answer.selectedOptionIds.length > 0;
    }

    return !!answer.selectedOptionId;
  }

  isReviewOptionSelected(question: TestQuestion, answer: UserAnswer, optionId: string): boolean {
    return question.questionType === 'MCMA' ? answer.selectedOptionIds.includes(optionId) : answer.selectedOptionId === optionId;
  }

  private getCorrectOptionIds(question: TestQuestion): string[] {
    if (question.correctOptionIds && question.correctOptionIds.length) {
      return question.correctOptionIds;
    }

    return question.correctOptionId ? [question.correctOptionId] : [];
  }

  private getOptionTexts(question: TestQuestion, optionIds: string[]): string[] {
    const options = question.options || [];
    return options.filter((option) => optionIds.includes(option.id)).map((option) => option.text);
  }

  private areOptionSetsEqual(selectedOptionIds: string[], correctOptionIds: string[]): boolean {
    if (selectedOptionIds.length !== correctOptionIds.length) {
      return false;
    }

    return correctOptionIds.every((optionId) => selectedOptionIds.includes(optionId));
  }

  private normalizeText(value: string): string {
    return value.trim().replace(/\s+/g, ' ').toLowerCase();
  }

  private createEmptyAnswers(): UserAnswer[] {
    return this.questions.map((question) => ({
      questionId: question.id,
      selectedOptionId: null,
      selectedOptionIds: [],
      essayAnswer: '',
      status: NOT_ANSWERED_STATUS,
      evaluationStatus: NOT_ANSWERED_STATUS,
      timeSpentSeconds: 0,
      firstVisitedAt: null,
      lastVisitedAt: null,
      visitedCount: 0
    }));
  }

  private padTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}










