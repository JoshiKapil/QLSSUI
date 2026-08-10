import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { TrainingFeedback } from '../models/training-feedback.model';

@Injectable({ providedIn: 'root' })
export class TrainingFeedbackService {
  constructor(private apiClient: ApiClientService) {}

  submitFeedback(payload: TrainingFeedback): Observable<void> {
    return this.apiClient.post<void>('training-feedback', payload);
  }

  getAll(): Observable<TrainingFeedback[]> {
    return this.apiClient.get<TrainingFeedback[]>('training-feedback');
  }
}
