import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedResult, Training } from '../models/training.model';
import { ApiClientService } from './api-client.service';
import { CertificatePrintRecord } from '../models/certificate-data.model';

@Injectable({ providedIn: 'root' })
export class TrainingManagementService {
  private readonly endpoint = 'Training';
  private readonly operationEndpoint = 'TrainingOperation';

  constructor(
    private apiClient: ApiClientService
  ) { }

  getAll(): Observable<Training[]> {
    return this.getPaged(1, 500).pipe(map((response) => response.items || []));
  }

  search(query: string): Observable<Training[]> {
    const search = query.trim().toLowerCase();
    return this.getAll().pipe(map((records) => records.filter((record) =>
      !search ||
      String(record.trainingName || '').toLowerCase().includes(search) ||
      String(record.trainingId || '').toLowerCase().includes(search)
    )));
  }

  save(record: Training): Observable<Training> {
    return record.trainingId
      ? this.apiClient.put<Training>(`${this.operationEndpoint}/${record.trainingId}`, record)
      : this.apiClient.post<Training>(`${this.operationEndpoint}/save`, record);
  }

  getPaged(pageNumber = 1, pageSize = 100): Observable<PagedResult<Training>> {
    return this.apiClient.get<PagedResult<Training>>(this.operationEndpoint, { pageNumber, pageSize });
  }

  getDocument(trainingId: number | string): Observable<HttpResponse<Blob>> {
    return this.apiClient.getBlob(`${this.operationEndpoint}/documents/${encodeURIComponent(String(trainingId))}`);
  }

  getCertificationData(): Observable<CertificatePrintRecord[]> {
    return this.apiClient.get<CertificatePrintRecord[]>(`/CertificationData`);
  }
}
