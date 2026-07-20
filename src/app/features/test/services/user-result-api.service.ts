import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/services/api-client.service';
import { SaveUserResultRequest, UserResultDto } from './test-api.models';
import { invalidServerId, normalizeServerId } from './server-id.util';

@Injectable({ providedIn: 'root' })
export class UserResultApiService {
  constructor(private readonly api: ApiClientService) {}

  saveUserResult(request: Partial<SaveUserResultRequest> & Record<string, any>): Observable<{ usersResultId: number }> {
    return this.api.post<{ usersResultId: number }>('UserResult/save', this.normalizeSaveRequest(request));
  }

  saveUserResultViaSaveRoute(request: Partial<SaveUserResultRequest> & Record<string, any>): Observable<{ usersResultId: number }> {
    return this.saveUserResult(request);
  }

  getUserResult(usersResultId: number | string): Observable<UserResultDto> {
    const serverUsersResultId = normalizeServerId(usersResultId);
    return serverUsersResultId
      ? this.api.get<UserResultDto>(`UserResult/${encodeURIComponent(serverUsersResultId)}`)
      : invalidServerId<UserResultDto>('usersResultId', usersResultId);
  }

  getUserResultBySubmission(submissionId: string): Observable<UserResultDto> {
    return this.api.get<UserResultDto>(`UserResult/submission/${encodeURIComponent(submissionId)}`);
  }

  getUserResults(filter?: { userId?: number | null; username?: string | null }): Observable<UserResultDto[]> {
    return this.api.get<UserResultDto[]>('UserResult', filter);
  }

  private normalizeSaveRequest(request: Partial<SaveUserResultRequest> & Record<string, any>): SaveUserResultRequest {
    const resultJson = request.resultJson ?? (request.result ? JSON.stringify(request.result) : '');

    return {
      userId: this.toNullableNumber(request.userId),
      testId: this.toNullableNumber(request.testId),
      submissionId: String(request.submissionId ?? ''),
      username: String(request.username ?? ''),
      testName: String(request.testName ?? ''),
      result: request.result,
      resultJson: String(resultJson ?? ''),
      score: this.toNullableNumber(request.score),
      percentage: this.toNullableNumber(request.percentage),
      passed: request.passed ?? null,
      isAutoSubmitted: !!request.isAutoSubmitted,
      submittedAt: request.submittedAt ? String(request.submittedAt) : null
    };
  }

  private toNullableNumber(value: unknown): number | null {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
  }
}
