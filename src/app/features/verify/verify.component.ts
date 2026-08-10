import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { CertificationData } from '../../core/models/certification.model';
import { CertificationService } from '../../core/services/certification.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, AfterViewInit {
  CertificateNo = '';
  UserData: any[] = [];
  Certificate = false;
  resultMessage = '';

  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta,
    private certificationService: CertificationService,
    private route: ActivatedRoute
  ) {
    this.title.setTitle('Verify Certificate - QLSS Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
    });
  }

  ngOnInit(): void {
    const certificateNumber = this.route.snapshot.queryParamMap.get('certificate')?.trim();
    if (certificateNumber) {
      this.CertificateNo = certificateNumber;
      this.ValidateFromApi();
    }
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

    // Certificates may be entered as either the complete value
    // (for example QLSS/IATF/IA/23011) or only their numeric part.
    const searchNumber = this.getCertificateSearchNumber(certificationNumber);
  
    this.certificationService.getByNumber(searchNumber).subscribe({
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

  private getCertificateSearchNumber(certificationNumber: string): string {
    return certificationNumber
      .split('/')
      .map((part) => part.trim())
      .filter(Boolean)
      .pop() ?? certificationNumber;
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
