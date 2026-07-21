import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResult, Training } from '../models/training.model';
import { AdminManagementService } from './admin-management.service';
import { ApiClientService } from './api-client.service';
import { CertificateData } from '../models/certificate-data.model';

@Injectable({ providedIn: 'root' })
export class TrainingManagementService {
  private readonly endpoint = 'Training';
  private readonly operationEndpoint = 'TrainingOperation';

  constructor(
    private adminService: AdminManagementService,
    private apiClient: ApiClientService
  ) { }

  getAll(): Observable<Training[]> {
    return this.adminService.getAll<Training>(this.endpoint);
  }

  search(query: string): Observable<Training[]> {
    return this.adminService.search<Training>(this.endpoint, ['trainingName', 'trainingId'], query);
  }

  save(record: Training): Observable<Training> {
    return this.adminService.save<Training>(this.endpoint, 'trainingId', record);
  }

  getPaged(pageNumber = 1, pageSize = 100): Observable<PagedResult<Training>> {
    return this.apiClient.get<PagedResult<Training>>(this.operationEndpoint, { pageNumber, pageSize });
  }

  getDocument(trainingId: number | string): Observable<HttpResponse<Blob>> {
    return this.apiClient.getBlob(`${this.operationEndpoint}/documents/${encodeURIComponent(String(trainingId))}`);
  }

  getCertificationData(): Observable<CertificateData> {
    return this.apiClient.get<CertificateData>(`/CertificationData`);
  }
}
