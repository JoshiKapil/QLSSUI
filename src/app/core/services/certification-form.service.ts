import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CertificateApprovalResult,
  CertificationForm,
  CertificationImportResult
} from '../models/certification-form.model';
import { AdminManagementService } from './admin-management.service';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class CertificationFormService {
  private readonly endpoint = 'Certification-Data';
  private readonly idKey = 'certificationDataId';

  constructor(private adminService: AdminManagementService, private api: ApiClientService) {}

  getAll(): Observable<CertificationForm[]> {
    return this.adminService.getAll<CertificationForm>(this.endpoint);
  }

  getById(certificationFormId: number | string): Observable<CertificationForm> {
    return this.adminService.getById<CertificationForm>(this.endpoint, this.idKey, certificationFormId);
  }

  save(record: CertificationForm): Observable<CertificationForm> {
    return this.adminService.save<CertificationForm>(this.endpoint, this.idKey, record);
  }

  getByUserTraining(email: string, trainingId: number): Observable<CertificationForm> {
    return this.api.get<CertificationForm>('certification-data/by-user-training', { email, trainingId });
  }

  approve(certificationDataIds: number[], location = ''): Observable<CertificateApprovalResult> {
    return this.api.post<CertificateApprovalResult>('certification-data/approve', {
      certificationDataIds,
      location
    });
  }

  import(records: CertificationForm[]): Observable<CertificationImportResult> {
    return this.api.post<CertificationImportResult>('certification-data/import', { records });
  }
}
