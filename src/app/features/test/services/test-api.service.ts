import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService, QueryParams } from '../../../core/services/api-client.service';
import { AffectedRowsDto, ImportResultDto, TestAttemptDto, TestDto } from './test-api.models';
import { invalidServerId, isServerNumericId, normalizeServerId } from './server-id.util';

@Injectable({ providedIn: 'root' })
export class TestApiService {
  constructor(private readonly api: ApiClientService) {}

  getTests(filter?: QueryParams): Observable<TestDto[]> {
    return this.api.get<TestDto[]>('Test', filter);
  }

  getAllTests(filter?: QueryParams): Observable<TestDto[]> {
    return this.api.get<TestDto[]>('Test/all', filter);
  }

  getTestTypes(): Observable<string[]> {
    return this.api.get<string[]>('Test/types');
  }

  getTestById(testId: string): Observable<TestDto> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<TestDto>(`Test/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<TestDto>('testId', testId);
  }

  getTestComplete(testId: string): Observable<TestAttemptDto> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<TestAttemptDto>(`Test/${encodeURIComponent(serverTestId)}/complete`)
      : invalidServerId<TestAttemptDto>('testId', testId);
  }

  getTestAttempt(testId: string): Observable<TestAttemptDto> {
    return this.getTestComplete(testId);
  }

  getTestAttemptByRoute(testId: string): Observable<TestAttemptDto> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<TestAttemptDto>(`Test/attempt/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<TestAttemptDto>('testId', testId);
  }

  getTestAttemptBySuffix(testId: string): Observable<TestAttemptDto> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<TestAttemptDto>(`Test/${encodeURIComponent(serverTestId)}/attempt`)
      : invalidServerId<TestAttemptDto>('testId', testId);
  }

  saveTest(test: Partial<TestDto> & Record<string, any>): Observable<TestDto> {
    const payload = this.normalizeTestPayload(test);

    if (!isServerNumericId(payload.testId)) {
      payload.testId = '';
      return this.createTest(payload);
    }

    return this.updateTest(payload.testId, payload);
  }

  createTest(test: Partial<TestDto> & Record<string, any>): Observable<TestDto> {
    return this.api.post<TestDto>('Test/create', this.normalizeTestPayload(test));
  }

  createTestViaCreateRoute(test: Partial<TestDto> & Record<string, any>): Observable<TestDto> {
    return this.createTest(test);
  }

  updateTest(testId: string, test: Partial<TestDto> & Record<string, any>): Observable<TestDto> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.put<TestDto>(`Test/update/${encodeURIComponent(serverTestId)}`, this.normalizeTestPayload(test))
      : invalidServerId<TestDto>('testId', testId);
  }

  updateTestViaUpdateRoute(testId: string, test: Partial<TestDto> & Record<string, any>): Observable<TestDto> {
    return this.updateTest(testId, test);
  }

  deleteTest(testId: string): Observable<null> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.delete<null>(`Test/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<null>('testId', testId);
  }

  saveTestQuestions(testId: string, questionIds: string[]): Observable<AffectedRowsDto> {
    const serverTestId = normalizeServerId(testId);
    const serverQuestionIds = questionIds.filter((questionId) => isServerNumericId(questionId));
    return serverTestId
      ? this.api.post<AffectedRowsDto>(`Test/${encodeURIComponent(serverTestId)}/questions`, serverQuestionIds)
      : invalidServerId<AffectedRowsDto>('testId', testId);
  }

  unmapTestQuestion(testId: string, questionId: string): Observable<null> {
    const serverTestId = normalizeServerId(testId);
    const serverQuestionId = normalizeServerId(questionId);
    return serverTestId && serverQuestionId
      ? this.api.delete<null>(`Test/${encodeURIComponent(serverTestId)}/questions/${encodeURIComponent(serverQuestionId)}`)
      : invalidServerId<null>('testId/questionId', `${testId}/${questionId}`);
  }

  importTests(tests: TestDto[]): Observable<ImportResultDto> {
    return this.api.post<ImportResultDto>('Test/import', {
      tests: tests.map((test) => this.normalizeTestPayload(test))
    });
  }

  importTestExcel(file: File): Observable<ImportResultDto> {
    return this.api.upload<ImportResultDto>('Test/import-excel', file);
  }

  importTestExcelPascal(file: File): Observable<ImportResultDto> {
    return this.api.upload<ImportResultDto>('Test/ImportExcel', file);
  }

  private normalizeTestPayload(test: Partial<TestDto> & Record<string, any>): TestDto {
    return {
      testId: String(test.testId ?? test.id ?? ''),
      testName: String(test.testName ?? test.name ?? test.displayName ?? ''),
      displayName: String(test.displayName ?? test.testName ?? test.name ?? ''),
      fileName: String(test.fileName ?? test.testName ?? ''),
      testTitle: String(test.testTitle ?? test.title ?? test.displayName ?? test.testName ?? ''),
      description: String(test.description ?? ''),
      trainingId: String(test.trainingId ?? ''),
      trainingName: String(test.trainingName ?? ''),
      subject: String(test.subject ?? ''),
      topic: String(test.topic ?? ''),
      category: String(test.category ?? ''),
      section: String(test.section ?? ''),
      durationMinutes: Number(test.durationMinutes ?? 0),
      passingPercentage: Number(test.passingPercentage ?? 0),
      instructions: String(test.instructions ?? ''),
      status: String(test.status ?? 'Draft'),
      totalQuestions: Number(test.totalQuestions ?? test.questions?.length ?? test.mappedQuestionIds?.length ?? 0),
      totalMarks: Number(test.totalMarks ?? 0),
      negativeMarks: Number(test.negativeMarks ?? 0),
      imageUrl: String(test.imageUrl ?? ''),
      audioUrl: String(test.audioUrl ?? ''),
      videoUrl: String(test.videoUrl ?? ''),
      metadataJson: String(test.metadataJson ?? ''),
      isActive: test.isActive ?? true,
      version: Number(test.version ?? 1),
      createdAt: String(test.createdAt ?? new Date().toISOString()),
      updatedAt: String(test.updatedAt ?? new Date().toISOString()),
      mappedQuestionIds: this.toStringArray(test.mappedQuestionIds),
      questionOrder: this.toStringArray(test.questionOrder),
      questions: test.questions ?? []
    };
  }

  private toStringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
  }
}
