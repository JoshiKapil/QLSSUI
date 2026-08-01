import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Certification, CertificationBulk, CertificationData } from '../models/certification.model';
import { AdminManagementService } from './admin-management.service';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class CertificationService {
  private readonly endpoint = 'CertificateOperation';
  private readonly certificationDataEndpoint = 'CertificationData';

  constructor(
    private adminService: AdminManagementService,
    private apiClient: ApiClientService
  ) {}

  getAll(): Observable<Certification[]> {
    return this.apiClient.get<CertificationData[]>(this.certificationDataEndpoint).pipe(
      map((records) => records.map((record) => ({
        userName: record.name,
        certificationNumber: record.certificationNumber,
        issuedDate: record.date,
        topic: record.displayName || record.trainingName || String(record.trainingId),
        description: ''
      })))
    );
  }

  search(query: string): Observable<Certification[]> {
    const search = query.trim().toLowerCase();
    return this.getAll().pipe(map((records) => records.filter((record) =>
      !search ||
      record.certificationNumber.toLowerCase().includes(search) ||
      record.userName.toLowerCase().includes(search)
    )));
  }

  save(record: Certification): Observable<Certification> {
    return this.apiClient.post<Certification>(`${this.endpoint}/save`, record);
  }

  uploadExcelData(records: readonly CertificationBulk[]): Observable<number> {
    return this.adminService.uploadBulkData<CertificationBulk>(this.endpoint, records);
  }

  uploadBulk(file: any): Observable<void> {
    return this.adminService.uploadBulk(this.endpoint, file);
  }

  getByNumber(certificationNumber: string): Observable<CertificationData> {
    return this.apiClient.get<CertificationData>(
      `${this.certificationDataEndpoint}/by-number/${encodeURIComponent(certificationNumber)}`
    );
  }
}
