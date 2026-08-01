import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EvaluationStatus,
  TestQuestion,
  TestSubmission,
  UserAnswer
} from './test.model';
import { TestStorageService } from './services/test-storage.service';

const PENDING_RESULT_KEY = 'qlss-pending-test-result';
const START_TEST_KEY = 'qlss-start-test';

interface ResultTrainingOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  submission: TestSubmission | null = null;
  resultSaveWarning = '';
  showSelectors = true;
  isLoadingOptions = false;
  isLoadingResult = false;
  resultMessage = '';
  selectedUsername = '';
  selectedTraining = '';
  selectedTestType: 'pre' | 'post' | 'assessment' | '' = '';
  testTypes: Array<'pre' | 'post' | 'assessment'> = ['pre', 'post', 'assessment'];
  users: string[] = [];
  trainings: ResultTrainingOption[] = [];

  constructor(
    private readonly testStorage: TestStorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const pendingResult = sessionStorage.getItem(PENDING_RESULT_KEY);
    sessionStorage.removeItem(PENDING_RESULT_KEY);

    if (pendingResult) {
      try {
        const parsed = JSON.parse(pendingResult) as {
          submission: TestSubmission;
          warning?: string;
        };

        if (parsed.submission?.resultSummary) {
          this.submission = parsed.submission;
          this.resultSaveWarning = parsed.warning || '';
          this.showSelectors = false;
          return;
        }
      } catch {
        // Invalid navigation data falls back to direct result lookup.
      }
    }

    this.loadSelectorOptions();
  }

  get result() {
    return this.submission?.resultSummary || null;
  }

  get questions(): TestQuestion[] {
    return this.submission?.questions || this.submission?.questionSnapshots || [];
  }

  get answers(): UserAnswer[] {
    return this.submission?.userAnswers || [];
  }

  async loadSelectorOptions(): Promise<void> {
    this.isLoadingOptions = true;
    this.resultMessage = '';

    try {
      const [users, tests] = await Promise.all([
        this.testStorage.listResultUsers(),
        this.testStorage.listTestDefinitions().catch(() => this.testStorage.listAssessments())
      ]);

      this.users = this.uniqueSorted(users);
      this.trainings = Array.from(new Map(
        tests
          .filter((test) => String(test.trainingId || '').trim())
          .map((test) => [
            String(test.trainingId),
            {
              id: String(test.trainingId),
              label: test.displayName || test.trainingName || test.testName
            }
          ])
      ).values()).sort((a, b) => a.label.localeCompare(b.label));
    } catch {
      this.resultMessage = 'Users and trainings could not be loaded.';
    } finally {
      this.isLoadingOptions = false;
    }
  }

  onSelectionChange(): void {
    this.submission = null;
    this.resultMessage = '';

    if (this.selectedUsername && this.selectedTraining && this.selectedTestType) {
      this.loadSelectedResult();
    }
  }

  async loadSelectedResult(): Promise<void> {
    this.isLoadingResult = true;
    this.resultMessage = '';

    try {
      // Previous database/local result lookup kept for reference:
      // const submission = await this.testStorage.loadSavedSubmission(
      //   this.selectedUsername,
      //   this.selectedTraining
      // );
      const submission = await this.testStorage.loadSubmissionFileFromServer(
        this.selectedTestType as 'pre' | 'post' | 'assessment',
        this.selectedTraining,
        this.selectedUsername
      );

      if (!submission) {
        this.resultMessage = 'No saved result was found for the selected user and training.';
        return;
      }

      this.submission = { ...submission, resultSource: 'Saved Result' };
    } catch {
      this.resultMessage = 'The selected result could not be loaded.';
    } finally {
      this.isLoadingResult = false;
    }
  }

  clearSelection(): void {
    this.selectedUsername = '';
    this.selectedTraining = '';
    this.selectedTestType = '';
    this.submission = null;
    this.resultMessage = '';
  }

  async downloadCurrentResult(): Promise<void> {
    if (!this.submission) {
      return;
    }

    try {
      const blob = await this.testStorage.exportSubmissionResult(this.submission);
      this.testStorage.downloadBlob(blob, `${this.submission.testName}-result.json`);
    } catch {
      this.resultSaveWarning = 'Result export failed.';
    }
  }

  retakeTest(): void {
    if (this.submission) {
      sessionStorage.setItem(START_TEST_KEY, JSON.stringify({
        testName: this.submission.testName,
        username: this.submission.username
      }));
    }

    this.router.navigate(['/test']);
  }

  getEvaluationClass(answer?: UserAnswer): string {
    return `evaluation--${answer?.evaluationStatus || 'notAnswered'}`;
  }

  getEvaluationLabel(answer?: UserAnswer): string {
    const labels: Record<EvaluationStatus, string> = {
      correct: 'Correct',
      wrong: 'Wrong',
      skipped: 'Skipped',
      manualReview: 'Manual Review Required',
      notAnswered: 'Not Answered'
    };

    return labels[answer?.evaluationStatus || 'notAnswered'];
  }

  getSelectedAnswerText(question: TestQuestion, answer?: UserAnswer): string {
    if (!answer) {
      return 'Not answered';
    }

    if (question.questionType === 'ESSAY') {
      return answer.essayAnswer?.trim() || 'Not answered';
    }

    const selectedIds = question.questionType === 'MCMA'
      ? answer.selectedOptionIds || []
      : answer.selectedOptionId ? [answer.selectedOptionId] : [];

    return selectedIds.length
      ? this.getOptionTexts(question, selectedIds).join(', ')
      : 'Not answered';
  }

  getCorrectAnswerText(question: TestQuestion): string {
    if (question.questionType === 'ESSAY') {
      return question.expectedAnswer || 'Manual review required';
    }

    const correctIds = question.correctOptionIds?.length
      ? question.correctOptionIds
      : question.correctOptionId ? [question.correctOptionId] : [];

    return this.getOptionTexts(question, correctIds).join(', ');
  }

  getReviewOptionClass(question: TestQuestion, answer: UserAnswer | undefined, optionId: string): string {
    const isSelected = this.isReviewOptionSelected(question, answer, optionId);
    const isCorrect = this.isCorrectOption(question, optionId);

    if (isSelected && isCorrect) {
      return 'result-option--correct';
    }

    if (isSelected) {
      return 'result-option--wrong';
    }

    return isCorrect ? 'result-option--correct-answer' : '';
  }

  isReviewOptionSelected(question: TestQuestion, answer: UserAnswer | undefined, optionId: string): boolean {
    if (!answer) {
      return false;
    }

    return question.questionType === 'MCMA'
      ? (answer.selectedOptionIds || []).includes(optionId)
      : answer.selectedOptionId === optionId;
  }

  isCorrectOption(question: TestQuestion, optionId: string): boolean {
    const correctOptionIds = question.correctOptionIds?.length
      ? question.correctOptionIds
      : question.correctOptionId ? [question.correctOptionId] : [];

    return correctOptionIds.includes(optionId);
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  hasExpectedAnswer(question: TestQuestion): boolean {
    return Boolean(question.expectedAnswer?.trim());
  }

  hasExplanation(question: TestQuestion): boolean {
    return Boolean(question.explanation?.trim());
  }

  private getOptionTexts(question: TestQuestion, optionIds: string[]): string[] {
    return optionIds.map((id) =>
      question.options?.find((option) => option.id === id)?.text || id
    );
  }

  private uniqueSorted(values: string[]): string[] {
    return Array.from(new Set(
      values.map((value) => (value || '').trim()).filter(Boolean)
    )).sort((a, b) => a.localeCompare(b));
  }
}
