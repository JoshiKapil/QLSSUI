import { AfterViewInit, Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { CertificationData } from '../../core/models/certification.model';
import { CertificationService } from '../../core/services/certification.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements AfterViewInit {
  CertificateNo = '';
  UserData: any[] = [];
  Certificate = false;
  resultMessage = '';

  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta,
    private certificationService: CertificationService
  ) {
    this.title.setTitle('Verify Certificate - QLSS Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
    });
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  Validate(): void { 
    this.ValidateFromApi();
  }

  // Future API integration: call this method instead of Validate().
  ValidateFromApi(): void {
    const certificationNumber = this.CertificateNo.trim();
    if (!certificationNumber) {
      this.Certificate = false;
      this.resultMessage = 'Please enter a certificate number.';
      return;
    }
  
    this.certificationService.getByNumber(certificationNumber).subscribe({
      next: (item: CertificationData) => {
        const certificate = {
          ...item,
          UserName: item.name,
          IssuedDate: item.date,
          TrainingName: item.displayName || item.trainingName || String(item.trainingId)
        };
        this.UserData = [certificate];
        this.Certificate = true;
        this.resultMessage = 'Certificate Verified.';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Certificate verification request failed.', { status: error.status });
        this.UserData = [];
        this.Certificate = false;
        this.resultMessage = error.status === 404 ? 'Certificate Not Found.' : 'Unable to verify certificate.';
      }
    });
  }
  formatIssuedDate(value: string | null | undefined): string {
  if (!value) {
    return '';
  }
  // Match format: yyyy-MM-dd or yyyy-MM-dd HH:mm:ss
  const sqlDatePattern = /^\d{4}-\d{2}-\d{2}(?:\s+\d{2}:\d{2}:\d{2})?$/;
  if (sqlDatePattern.test(value.trim())) {
    const datePart = value.trim().substring(0, 10);
    const [year, month, day] = datePart.split('-');
    return `${day}-${month}-${year}`;
  }
  // Keep old descriptive dates as they are
  return value;
}
}
