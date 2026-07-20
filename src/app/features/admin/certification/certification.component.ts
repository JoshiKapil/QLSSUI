import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certification, CertificationBulk } from '../../../core/models/certification.model';
import { CertificationService } from '../../../core/services/certification.service';
import { NotifierService } from '../../../core/services/notifier.service';
import * as XLSX from 'xlsx';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-certification-admin',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  readonly title = 'Certification';
  readonly searchPlaceholder = 'Search by CertificationNumber or UserName';
  readonly idKey = 'certificationNumber';

  form!: FormGroup;
  records: Certification[] = [];
  selectedRecord: Certification | null = null;
  searchTerm = '';
  isLoading = false;
  isSaving = false;
  isUploading = false;
  uploadMessage = '';
  bulkFile: File | null = null;
  excelData: Record<string, unknown>[] = [];

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private certificationService: CertificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadRecords();
  }

  private initForm(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      certificationNumber: ['', Validators.required],
      issuedDate: ['', Validators.required],
      topic: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadRecords(): void {
    this.isLoading = true;
    this.certificationService.getAll().subscribe({
      next: (records) => (this.records = records || []),
      complete: () => (this.isLoading = false)
    });
  }

  search(): void {
    this.isLoading = true;
    this.certificationService.search(this.searchTerm).subscribe({
      next: (records) => (this.records = records || []),
      complete: () => (this.isLoading = false)
    });
  }

  edit(record: Certification): void {
    this.selectedRecord = record;
    this.form.patchValue(record);
  }

  resetForm(): void {
    this.selectedRecord = null;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const payload = { ...this.selectedRecord, ...this.form.value } as Certification;

    this.certificationService.save(payload).subscribe({
      next: () => {
        this.notifier.successToastr(`Certification saved successfully.`);
        this.resetForm();
        this.loadRecords();
      },
      complete: () => (this.isSaving = false)
    });
  }

  fieldError(key: string, label: string): string {
    const control = this.form.get(key);
    if (!control?.touched || !control.errors) {
      return '';
    }

    return control.errors['required'] ? `${label} is required.` : `${label} is invalid.`;
  }

  trackByRecordId(index: number, record: Certification): string | number {
    return String((record as unknown as Record<string, unknown>)[this.idKey] || index);
  }

  onImageSelected(event: Event, key: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => this.form.get(key)?.setValue(reader.result);
    reader.readAsDataURL(file);
  }

  onBulkFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bulkFile = input.files?.[0] || null;
    this.uploadMessage = '';
  }



  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) return;

    const file = target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(sheet); // convert to JSON
      console.log("Excel Data: ", this.excelData);
    };

    reader.readAsBinaryString(file);
  }

  saveExcelToServer(): void {
    if (!Array.isArray(this.excelData)) {
      console.error("excelData is not an array!");
      return;
    }

    const payload: CertificationBulk[] = this.excelData.map(row => ({
      CertificationNumber: this.getExcelValue(row, 'CertificationNumber'),
      Name: this.getExcelValue(row, 'Name', 'UserName'),
      Topic: this.getExcelValue(row, 'Topic', 'CourseName'),
      Date: this.getExcelDate(row, 'Date', 'IssuedDate'),
      BatchNo: this.getExcelValue(row, 'BatchNo'),
      ContactNo: this.getExcelValue(row, 'ContactNo'),
      Email: this.getExcelValue(row, 'Email'),
      Location: this.getExcelValue(row, 'Location', 'Loacation')
    }));
    this.isUploading = true;
    this.uploadMessage = '';

    this.certificationService.uploadExcelData(payload).pipe(
      finalize(() => (this.isUploading = false))
    ).subscribe({
      next: (uploadedCount) => {
        this.notifier.successToastr(
          `${uploadedCount} certification record${uploadedCount === 1 ? '' : 's'} uploaded successfully.`
        );
        this.excelData = [];
        this.loadRecords();
      },
      error: (error) => {
        this.uploadMessage = this.getUploadError(error);
        this.notifier.warningToastr(this.uploadMessage);
        console.error('Certification upload failed:', error);
      }
    });
  }

  private getExcelValue(row: Record<string, unknown>, ...headers: string[]): string {
    const expectedHeaders = headers.map(header => this.normalizeHeader(header));
    const matchingKey = Object.keys(row).find(key =>
      expectedHeaders.includes(this.normalizeHeader(key))
    );
    return matchingKey == null ? '' : String(row[matchingKey] ?? '').trim();
  }

  private getExcelDate(row: Record<string, unknown>, ...headers: string[]): string {
    const value = this.getExcelValue(row, ...headers);
    const excelSerial = Number(value);
    return value !== '' && Number.isFinite(excelSerial)
      ? XLSX.SSF.format('yyyy-mm-dd', excelSerial)
      : value;
  }

  private getUploadError(error: unknown): string {
    const apiError = (error as {
      error?: {
        message?: string;
        errors?: Record<string, string[] | string>;
      } | string;
    })?.error;

    if (typeof apiError === 'string') {
      return apiError;
    }

    if (apiError?.errors) {
      const details = Object.values(apiError.errors).flatMap(messages =>
        Array.isArray(messages) ? messages : [messages]
      );
      if (details.length > 0) {
        return details.join(' ');
      }
    }

    return apiError?.message || 'Unable to upload certification records.';
  }

  private normalizeHeader(header: string): string {
    return header.replace(/[\s_-]/g, '').toLowerCase();
  }



  uploadBulk(): void {
    if (!this.bulkFile) {
      this.uploadMessage = 'Choose an Excel or CSV file first.';
      return;
    }
    console.log(this.bulkFile)
    this.isUploading = true;
    this.certificationService.uploadBulk(this.bulkFile).subscribe({
      next: () => {
        this.uploadMessage = '';
        this.notifier.successToastr('Bulk upload completed.');
        this.loadRecords();
      },
      complete: () => (this.isUploading = false)
    });
  }
}
