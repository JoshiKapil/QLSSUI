import { AfterViewInit, Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { DataService } from '../../core/services/data.service';
import { environment } from '../../../environments/environment';
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
    private _HttpClient: HttpClient,
    private dataService: DataService,
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
   // this.ValidateFromApi();
    if (this.CertificateNo && this.CertificateNo.trim() !== '') {
      const searchKey = this.CertificateNo.trim().toLowerCase();
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this._HttpClient.get(environment.certificateUrl, { headers: reqHeader, responseType: 'text' })
        .subscribe({
          next: (data) => {
            try {
              const decryptedData = this.dataService.decrypt(data); 
              if (decryptedData && Array.isArray(decryptedData)) {
                this.UserData = decryptedData.filter((x: any) => {
                  if (!x.CertificationNumber) return false;
                  const certNo = x.CertificationNumber.toString().toLowerCase();
                  return certNo === searchKey || certNo.endsWith('/' + searchKey);
                });
                this.Certificate = this.UserData.length > 0;
                this.resultMessage = this.Certificate ? 'Certificate Verified.' : 'Certificate Not Found.';
              } else {
                this.Certificate = false;
                this.resultMessage = 'Invalid data format returned from certificate source.';
              }
            } catch {
              this.Certificate = false;
              this.resultMessage = 'Error processing certificate data.';
            }
          },
          error: () => {
            this.Certificate = false;
            this.resultMessage = 'Unable to load certificate data.';
          }
        });
    } else {
      this.Certificate = false;
      this.resultMessage = 'Please enter a certificate number.';
    }
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
        console.log(item)
        const certificate = {
          ...item,
          UserName: item.name,
          IssuedDate: item.date,
          TrainingName: item.trainingId
        };
        this.UserData = [certificate];
        console.log(this.UserData)
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
