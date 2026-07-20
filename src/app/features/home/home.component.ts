import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import * as XLSX from 'xlsx';
import { NotifierService } from '../../core/services/notifier.service';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  excelData: any[] = [];
  // Previous local-only URL: https://localhost:7041/api/CertificateOperation/upload
  readonly saveUrl = `${environment.apiBaseUrl}/CertificateOperation/upload`;
  name = '';
  email = '';
  mobile = '';
  messages = '';
  isSending = false;

  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta,
    private http: HttpClient,
    private notifierService: NotifierService
  ) {
    this.title.setTitle('QLSS Consulting - Empowering Organizations');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
    });
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length !== 1) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const bstr = e.target?.result;
      if (typeof bstr !== 'string') {
        return;
      }

      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(sheet);
    };

    reader.readAsBinaryString(file);
  }

  saveExcelToServer(): void {
    if (!Array.isArray(this.excelData) || !this.excelData.length) {
      return;
    }
    const certifications = this.excelData.map((x: any) => ({
      CertificationNumber: String(x.CertificationNumber ?? x['Certification Number'] ?? '').trim(),
      Name: String(x.Name ?? '').trim(),
      Topic: String(x.Topic ?? '').trim(),
      Date: String(x.Date ?? '').trim(),
      BatchNo: String(x.BatchNo ?? x['Batch No'] ?? '').trim(),
      ContactNo: String(x.ContactNo ?? x['Contact No'] ?? '').trim(),
      Email: String(x.Email ?? '').trim(),
      Location: String(x.Location ?? x.Loacation ?? '').trim()
    }));
    this.http.post(this.saveUrl, certifications).subscribe({
      next: () => this.notifierService.warningToastr('Saved Successfully'),
      error: (err) => {
        console.error('Certificate upload failed.', { status: err.status });
        this.notifierService.warningToastr('Save failed');
      }
    });
  }


  //     'TrainingId': 0,
  //     'Name': Number(localStorage.getItem('SubDurationId')),
  //     'Mode': 'Get',
  //     'Description': this.excelData,
  //     'DisplayName': '0',
  //     'Table': 'Certification'
  //     next: () => this.notifierService.warningToastr('Saved Successfully'),
  //     error: () => undefined


  async sendToMe(): Promise<void> { }
}
