import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/services/api-client.service';
import {
  GharAssessmentAdminDetail,
  GharAssessmentAdminPage,
  GharAssessmentSaveRequest,
  GharAssessmentSaveResult
} from '../assessment.models';

@Injectable({ providedIn: 'root' })
export class GharAssessmentService {
  private readonly endpoint = 'GharAssessment';

  constructor(private readonly api: ApiClientService) {}

  save(request: GharAssessmentSaveRequest): Observable<GharAssessmentSaveResult> {
    return this.api.post<GharAssessmentSaveResult>(`${this.endpoint}/entries`, request);
  }

  getAdminEntries(filter: {
    tabCode?: string;
    search?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    pageSize?: number;
  }): Observable<GharAssessmentAdminPage> {
    return this.api.get<GharAssessmentAdminPage>(`${this.endpoint}/admin/entries`, filter);
  }

  getAdminEntry(entryId: number): Observable<GharAssessmentAdminDetail> {
    return this.api.get<GharAssessmentAdminDetail>(`${this.endpoint}/admin/entries/${entryId}`);
  }
}
