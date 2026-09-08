import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiClientService } from '../../../core/services/api-client.service';
import { AuthService } from '../../../core/services/auth.service';
import { CertificatePdfService } from '../../../core/services/certificate-pdf.service';
import { ClientManagementService } from '../../../core/services/client-management.service';
import { DataService } from '../../../core/services/data.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { PrintCertificateComponent } from '../print-certificate/print-certificate.component';
import { VectorCertificatePdfService } from './vector-certificate-pdf.service';

@Component({
  selector: 'app-print-certification-new',
  templateUrl: '../print-certificate/print-certificate.component.html',
  styleUrls: ['../print-certificate/print-certificate.component.scss'],
  providers: [{ provide: CertificatePdfService, useClass: VectorCertificatePdfService }],
})
export class PrintCertificationNewComponent extends PrintCertificateComponent {
  constructor(
    http: HttpClient,
    dataService: DataService,
    pdfService: CertificatePdfService,
    notifier: NotifierService,
    sanitizer: DomSanitizer,
    trainingService: TrainingManagementService,
    apiClient: ApiClientService,
    authService: AuthService,
    clientService: ClientManagementService,
    router: Router,
  ) {
    super(
      http,
      dataService,
      pdfService,
      notifier,
      sanitizer,
      trainingService,
      apiClient,
      authService,
      clientService,
      router,
    );
  }
}
