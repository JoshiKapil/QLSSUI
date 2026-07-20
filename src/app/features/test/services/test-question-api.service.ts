import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/services/api-client.service';
import { AffectedRowsDto, BulkMapQuestionsRequest, MapQuestionRequest, QuestionDto, UnmapQuestionRequest } from './test-api.models';
import { invalidServerId, isServerNumericId, normalizeServerId } from './server-id.util';

@Injectable({ providedIn: 'root' })
export class TestQuestionApiService {
  constructor(private readonly api: ApiClientService) {}

  mapQuestion(request: MapQuestionRequest): Observable<unknown> {
    const serverTestId = normalizeServerId(request.testId);
    const serverQuestionId = normalizeServerId(request.questionId);
    return serverTestId && serverQuestionId
      ? this.api.post<unknown>('TestQuestion/map', { ...request, testId: Number(serverTestId), questionId: serverQuestionId })
      : invalidServerId<unknown>('testId/questionId', `${request.testId}/${request.questionId}`);
  }

  bulkMapQuestions(request: BulkMapQuestionsRequest): Observable<AffectedRowsDto> {
    const serverTestId = normalizeServerId(request.testId);
    const questions = (request.questions || [])
      .filter((item) => isServerNumericId(item.questionId))
      .map((item) => ({ ...item, testId: Number(serverTestId), questionId: normalizeServerId(item.questionId) }));

    return serverTestId
      ? this.api.post<AffectedRowsDto>('TestQuestion/bulk-map', { ...request, testId: Number(serverTestId), questions })
      : invalidServerId<AffectedRowsDto>('testId', request.testId);
  }

  bulkMapQuestionsPascal(request: BulkMapQuestionsRequest): Observable<AffectedRowsDto> {
    const serverTestId = normalizeServerId(request.testId);
    const questions = (request.questions || [])
      .filter((item) => isServerNumericId(item.questionId))
      .map((item) => ({ ...item, testId: Number(serverTestId), questionId: normalizeServerId(item.questionId) }));

    return serverTestId
      ? this.api.post<AffectedRowsDto>('TestQuestion/BulkMap', { ...request, testId: Number(serverTestId), questions })
      : invalidServerId<AffectedRowsDto>('testId', request.testId);
  }

  unmapQuestion(request: UnmapQuestionRequest): Observable<null> {
    const serverTestId = normalizeServerId(request.testId);
    const serverQuestionId = normalizeServerId(request.questionId);
    return serverTestId && serverQuestionId
      ? this.api.delete<null>('TestQuestion/unmap', { testId: Number(serverTestId), questionId: serverQuestionId })
      : invalidServerId<null>('testId/questionId', `${request.testId}/${request.questionId}`);
  }

  getQuestionsByTest(testId: string): Observable<QuestionDto[]> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<QuestionDto[]>(`TestQuestion/by-test/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<QuestionDto[]>('testId', testId);
  }

  getQuestionsByTestPascal(testId: string): Observable<QuestionDto[]> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<QuestionDto[]>(`TestQuestion/ByTest/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<QuestionDto[]>('testId', testId);
  }

  getAvailableQuestions(testId: string): Observable<QuestionDto[]> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<QuestionDto[]>(`TestQuestion/available-questions/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<QuestionDto[]>('testId', testId);
  }

  getAvailableQuestionsPascal(testId: string): Observable<QuestionDto[]> {
    const serverTestId = normalizeServerId(testId);
    return serverTestId
      ? this.api.get<QuestionDto[]>(`TestQuestion/AvailableQuestions/${encodeURIComponent(serverTestId)}`)
      : invalidServerId<QuestionDto[]>('testId', testId);
  }
}
