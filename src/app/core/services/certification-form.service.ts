import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificationForm } from '../models/certification-form.model';
import { AdminManagementService } from './admin-management.service';

@Injectable({ providedIn: 'root' })
export class CertificationFormService {
  private readonly endpoint = 'Certification-Data';
  private readonly idKey = 'certificationFormId';

  constructor(private adminService: AdminManagementService) {}

  getAll(): Observable<CertificationForm[]> {
    return this.adminService.getAll<CertificationForm>(this.endpoint);
  }

  getById(certificationFormId: number | string): Observable<CertificationForm> {
    return this.adminService.getById<CertificationForm>(this.endpoint, this.idKey, certificationFormId);
  }

  save(record: CertificationForm): Observable<CertificationForm> {
    return this.adminService.save<CertificationForm>(this.endpoint, this.idKey, record);
  }
}
