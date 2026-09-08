import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import {
  TrainingPresentationEmailHistory,
  TrainingPresentationRecipient,
  TrainingPresentationSendResult,
} from '../models/training-presentation-email.model';

@Injectable({ providedIn: 'root' })
export class TrainingPresentationEmailService {
  private readonly endpoint = 'TrainingPresentationEmail';

  constructor(private readonly apiClient: ApiClientService) {}

  getRecipients(
    companyId: number | string,
    trainingId: number | string,
    trainingDate: string,
  ): Observable<TrainingPresentationRecipient[]> {
    return this.apiClient.get<TrainingPresentationRecipient[]>(`${this.endpoint}/recipients`, {
      companyId,
      trainingId,
      trainingDate,
    });
  }

  send(formData: FormData): Observable<TrainingPresentationSendResult> {
    return this.apiClient.post<TrainingPresentationSendResult>(`${this.endpoint}/send`, formData);
  }

  getHistory(): Observable<TrainingPresentationEmailHistory[]> {
    return this.apiClient.get<TrainingPresentationEmailHistory[]>(`${this.endpoint}/history`);
  }

  resendFailed(historyId: number | string, file: File): Observable<TrainingPresentationSendResult> {
    const formData = new FormData();
    formData.append('historyId', String(historyId));
    formData.append('file', file);
    return this.apiClient.post<TrainingPresentationSendResult>(`${this.endpoint}/resend-failed`, formData);
  }
}
