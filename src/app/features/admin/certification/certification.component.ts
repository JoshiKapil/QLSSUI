import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { CertificationForm } from '../../../core/models/certification-form.model';
import { CertificationFormService } from '../../../core/services/certification-form.service';
import { NotifierService } from '../../../core/services/notifier.service';

type CertificationFilterKey = 'name' | 'certificationNumber' | 'date' | 'training' | 'email' | 'location' | 'status';

@Component({
  selector: 'app-certification-admin',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  form!: FormGroup;
  records: CertificationForm[] = [];
  selectedRecord: CertificationForm | null = null;
  isLoading = false;
  isSaving = false;
  isUploading = false;
  uploadMessage = '';
  selectedFileName = '';
  excelData: Record<string, unknown>[] = [];

  currentPage = 1;
  pageSize = 10;
  readonly pageSizes = [10, 25, 50, 100];
  filters: Record<CertificationFilterKey, string> = {
    name: '', certificationNumber: '', date: '', training: '', email: '', location: '', status: ''
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly notifier: NotifierService,
    private readonly certificationService: CertificationFormService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRecords();
  }

  private initForm(): void {
    this.form = this.fb.group({
      certificationNumber: [''],
      name: ['', Validators.required],
      trainingId: [null, [Validators.required, Validators.min(1)]],
      trainingName: [''],
      trainerId: [null, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      batchNo: [''],
      contactNo: [''],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      cityId: [null],
      days: [0, Validators.min(0)],
      totalPoints: [0, Validators.min(0)],
      isComplete: [false],
      isPaid: [false],
      paymentId: [''],
      paymentDate: [null]
    });
  }

  loadRecords(): void {
    this.isLoading = true;
    this.certificationService.getAll().pipe(finalize(() => (this.isLoading = false))).subscribe({
      next: (records) => {
        this.records = records || [];
        this.ensureValidPage();
      },
      error: (error) => this.notifier.warningToastr(error?.error?.message || 'Certification data could not be loaded.')
    });
  }

  edit(record: CertificationForm): void {
    this.selectedRecord = record;
    this.form.patchValue({
      ...record,
      date: this.dateInputValue(record.date),
      paymentDate: record.paymentDate ? this.dateInputValue(record.paymentDate) : null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm(): void {
    this.selectedRecord = null;
    this.form.reset({ days: 0, totalPoints: 0, isComplete: false, isPaid: false });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...(this.selectedRecord || {}),
      ...this.form.getRawValue(),
      certificationDate: this.form.value.date || ''
    } as CertificationForm;

    this.isSaving = true;
    const save$: any = this.selectedRecord?.recordSource === 'legacy'
      ? this.certificationService.saveLegacy(payload)
      : this.certificationService.save(payload);
    save$.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.notifier.successToastr(this.selectedRecord ? 'Certification updated successfully.' : 'Certification added successfully.');
        this.resetForm();
        this.loadRecords();
      },
      error: (error) => this.notifier.warningToastr(error?.error?.message || error?.message || 'Certification could not be saved.')
    });
  }

  fieldError(key: string, label: string): string {
    const control = this.form.get(key);
    if (!control?.touched || !control.errors) return '';
    if (control.errors['required']) return `${label} is required.`;
    if (control.errors['email']) return 'Enter a valid email address.';
    if (control.errors['min']) return `${label} must be zero or greater.`;
    return `${label} is invalid.`;
  }

  get filteredRecords(): CertificationForm[] {
    const values = Object.fromEntries(Object.entries(this.filters).map(([key, value]) => [key, value.trim().toLowerCase()])) as Record<CertificationFilterKey, string>;
    return this.records.filter((record) =>
      this.includes(record.name, values.name) &&
      this.includes(record.certificationNumber, values.certificationNumber) &&
      this.includes(record.date, values.date) &&
      this.includes(`${record.trainingName || ''} ${record.trainingId || ''}`, values.training) &&
      this.includes(record.email, values.email) &&
      this.includes(`${record.location || ''} ${record.locationName || ''} ${record.clientName || ''} ${record.cityName || ''}`, values.location) &&
      this.includes(record.isComplete ? 'complete completed yes' : 'pending incomplete no', values.status)
    );
  }

  get pagedRecords(): CertificationForm[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRecords.slice(start, start + this.pageSize);
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredRecords.length / this.pageSize)); }
  get firstRecordNumber(): number { return this.filteredRecords.length ? (this.currentPage - 1) * this.pageSize + 1 : 0; }
  get lastRecordNumber(): number { return Math.min(this.currentPage * this.pageSize, this.filteredRecords.length); }

  get visiblePages(): number[] {
    const start = Math.max(1, Math.min(this.currentPage - 2, this.totalPages - 4));
    const end = Math.min(this.totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  filtersChanged(): void { this.currentPage = 1; }
  clearFilters(): void {
    Object.keys(this.filters).forEach((key) => (this.filters[key as CertificationFilterKey] = ''));
    this.currentPage = 1;
  }
  changePageSize(value: string): void { this.pageSize = Number(value) || 10; this.currentPage = 1; }
  goToPage(page: number): void { this.currentPage = Math.max(1, Math.min(page, this.totalPages)); }
  private ensureValidPage(): void { this.currentPage = Math.min(this.currentPage, this.totalPages); }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.excelData = [];
    this.uploadMessage = '';
    this.selectedFileName = file?.name || '';
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const workbook = XLSX.read(loadEvent.target?.result, { type: 'array', cellDates: true });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        this.excelData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
        if (!this.excelData.length) this.uploadMessage = 'The selected file does not contain any data rows.';
      } catch {
        this.uploadMessage = 'The selected Excel or CSV file could not be read.';
      }
    };
    reader.readAsArrayBuffer(file);
  }

  saveExcelToServer(): void {
    if (!this.excelData.length) {
      this.uploadMessage = 'Choose an Excel or CSV file containing certification records.';
      return;
    }

    const payload = this.excelData.map((row) => this.mapImportRow(row));
    const invalidRow = payload.findIndex((row) => !row.name || !row.email || row.trainingId <= 0 || row.trainerId <= 0);
    if (invalidRow >= 0) {
      this.uploadMessage = `Row ${invalidRow + 2}: Name, Email, TrainingId and TrainerId are required.`;
      return;
    }

    this.isUploading = true;
    this.uploadMessage = '';
    this.certificationService.import(payload).pipe(finalize(() => (this.isUploading = false))).subscribe({
      next: (result) => {
        this.notifier.successToastr(`${result.importedCount} certification record(s) uploaded to Certifications_Data.`);
        this.excelData = [];
        this.selectedFileName = '';
        this.loadRecords();
      },
      error: (error) => {
        this.uploadMessage = error?.error?.message || error?.message || 'Certification records could not be uploaded.';
        this.notifier.warningToastr(this.uploadMessage);
      }
    });
  }

  private configureValidators(isDataRecord: boolean): void {
    const training = this.form.get('trainingId');
    const trainer = this.form.get('trainerId');
    const email = this.form.get('email');
    if (isDataRecord) {
      training?.setValidators([Validators.required, Validators.min(1)]);
      trainer?.setValidators([Validators.required, Validators.min(1)]);
      email?.setValidators([Validators.required, Validators.email]);
    } else {
      training?.clearValidators();
      trainer?.clearValidators();
      email?.setValidators([Validators.email]);
    }
    training?.updateValueAndValidity({ emitEvent: false });
    trainer?.updateValueAndValidity({ emitEvent: false });
    email?.updateValueAndValidity({ emitEvent: false });
  }
  private mapImportRow(row: Record<string, unknown>): CertificationForm {
    const date = this.getExcelDate(row, 'Date', 'IssuedDate', 'CertificationDate');
    return {
      certificationDate: date,
      certificationNumber: this.getExcelValue(row, 'CertificationNumber'),
      name: this.getExcelValue(row, 'Name', 'UserName'),
      trainingId: this.getExcelNumber(row, 'TrainingId'),
      trainerId: this.getExcelNumber(row, 'TrainerId'),
      date,
      batchNo: this.getExcelValue(row, 'BatchNo'),
      contactNo: this.getExcelValue(row, 'ContactNo', 'Phone'),
      email: this.getExcelValue(row, 'Email'),
      location: this.getExcelValue(row, 'Location'),
      cityId: this.getExcelNullableNumber(row, 'CityId'),
      days: this.getExcelNumber(row, 'Days'),
      totalPoints: this.getExcelNumber(row, 'TotalPoints', 'Points'),
      isComplete: this.getExcelBoolean(row, 'IsComplete', 'Complete'),
      isPaid: this.getExcelBoolean(row, 'IsPaid', 'Paid'),
      paymentId: this.getExcelValue(row, 'PaymentId'),
      paymentDate: this.getExcelDate(row, 'PaymentDate') || null
    };
  }

  private getExcelValue(row: Record<string, unknown>, ...headers: string[]): string {
    const expected = headers.map((header) => this.normalizeHeader(header));
    const key = Object.keys(row).find((candidate) => expected.includes(this.normalizeHeader(candidate)));
    return key == null ? '' : String(row[key] ?? '').trim();
  }
  private getExcelNumber(row: Record<string, unknown>, ...headers: string[]): number { return Number(this.getExcelValue(row, ...headers)) || 0; }
  private getExcelNullableNumber(row: Record<string, unknown>, ...headers: string[]): number | null {
    const value = this.getExcelValue(row, ...headers); return value === '' ? null : Number(value) || null;
  }
  private getExcelBoolean(row: Record<string, unknown>, ...headers: string[]): boolean {
    return ['true', 'yes', '1', 'complete', 'paid'].includes(this.getExcelValue(row, ...headers).toLowerCase());
  }
  private getExcelDate(row: Record<string, unknown>, ...headers: string[]): string {
    const expected = headers.map((header) => this.normalizeHeader(header));
    const key = Object.keys(row).find((candidate) => expected.includes(this.normalizeHeader(candidate)));
    const raw = key == null ? '' : row[key];
    if (raw instanceof Date) return raw.toISOString().slice(0, 10);
    const value = String(raw ?? '').trim();
    const serial = Number(value);
    if (value && Number.isFinite(serial)) return XLSX.SSF.format('yyyy-mm-dd', serial);
    return this.dateInputValue(value);
  }
  private normalizeHeader(header: string): string { return header.replace(/[\s_-]/g, '').toLowerCase(); }
  private includes(value: unknown, filter: string): boolean { return !filter || String(value ?? '').toLowerCase().includes(filter); }
  private dateInputValue(value: string): string { return value ? String(value).slice(0, 10) : ''; }

  trackByRecordId(index: number, record: CertificationForm): string | number {
    return `${record.recordSource || 'data'}-${record.certificationDataId || record.certificationNumber || index}`;
  }
}




