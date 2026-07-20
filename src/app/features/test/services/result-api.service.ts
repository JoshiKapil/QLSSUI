import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/services/api-client.service';
import { ManualReviewItemDto, SavedResultListItemDto, TestResultDto, TestSubmissionDto } from './test-api.models';
import { invalidServerId, normalizeServerId } from './server-id.util';

@Injectable({ providedIn: 'root' })
export class ResultApiService {
  constructor(private readonly api: ApiClientService) {}

  submitResult(submission: Partial<TestSubmissionDto> & Record<string, any>): Observable<TestResultDto> {
    return this.api.post<TestResultDto>('results/submit', this.normalizeSubmissionPayload(submission));
  }

  getResults(filter?: { username?: string | null; testId?: string | number | null }): Observable<SavedResultListItemDto[]> {
    return this.api.get<SavedResultListItemDto[]>('results', filter);
  }

  getResultById(submissionId: string): Observable<TestResultDto> {
    return this.api.get<TestResultDto>(`results/${encodeURIComponent(submissionId)}`);
  }

  getResultsByUser(username: string): Observable<TestResultDto[]> {
    return this.api.get<TestResultDto[]>(`results/user/${encodeURIComponent(username)}`);
  }

  getResultsByTest(testId: string | number): Observable<TestResultDto[]> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<TestResultDto[]>(`results/test/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<TestResultDto[]>('testId', testId);
  }

  saveManualReview(submissionId: string, items: ManualReviewItemDto[]): Observable<unknown> {
    return this.api.put<unknown>(`results/${encodeURIComponent(submissionId)}/manual-review`, items);
  }

  deleteResult(submissionId: string): Observable<null> {
    return this.api.delete<null>(`results/${encodeURIComponent(submissionId)}`);
  }

  private normalizeSubmissionPayload(submission: Partial<TestSubmissionDto> & Record<string, any>): TestSubmissionDto {
    return {
      submissionId: String(submission.submissionId ?? ''),
      username: String(submission.username ?? ''),
      normalizedUsername: String(submission.normalizedUsername ?? submission.username ?? '').trim().toLowerCase(),
      testId: this.toNullableNumber(submission.testId),
      testName: String(submission.testName ?? ''),
      displayName: String(submission.displayName ?? submission.testName ?? ''),
      fileName: String(submission.fileName ?? submission.testName ?? ''),
      testTitle: String(submission.testTitle ?? submission.displayName ?? submission.testName ?? ''),
      submittedAt: String(submission.submittedAt ?? new Date().toISOString()),
      isAutoSubmitted: !!submission.isAutoSubmitted,
      resultSource: String(submission.resultSource ?? 'api'),
      totalDurationSeconds: Number(submission.totalDurationSeconds ?? 0),
      totalTimeUsedSeconds: Number(submission.totalTimeUsedSeconds ?? 0),
      testSnapshotJson: String(submission.testSnapshotJson ?? ''),
      questionSnapshotsJson: String(submission.questionSnapshotsJson ?? ''),
      summary: submission.summary ?? {
        breakdownType: 'total',
        label: 'Total',
        total: 0,
        correct: 0,
        marks: 0,
        obtainedMarks: 0,
        attempted: 0,
        skipped: 0,
        notAnswered: 0,
        wrong: 0,
        manualReviewCount: 0,
        manualReviewMarks: 0,
        negativeMarksDeducted: 0,
        percentage: 0,
        passed: false,
        totalTimeUsedSeconds: 0,
        averageTimePerQuestionSeconds: 0
      },
      userAnswers: submission.userAnswers ?? [],
      questionResults: submission.questionResults ?? [],
      breakdowns: submission.breakdowns ?? []
    };
  }

  private toNullableNumber(value: unknown): number | null {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null;
  }
}
