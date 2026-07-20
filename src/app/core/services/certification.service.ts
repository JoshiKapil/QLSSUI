import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.adminService.getAll<Certification>(this.endpoint);
  }

  search(query: string): Observable<Certification[]> {
    return this.adminService.search<Certification>(this.endpoint, ['certificationNumber', 'userName'], query);
  }

  save(record: Certification): Observable<Certification> {
    return this.adminService.save<Certification>(this.endpoint, 'certificationNumber', record);
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
