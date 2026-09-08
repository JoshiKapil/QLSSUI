import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Client } from '../../../core/models/client.model';
import { Training } from '../../../core/models/training.model';
import {
  TrainingPresentationEmailHistory,
  TrainingPresentationRecipient,
} from '../../../core/models/training-presentation-email.model';
import { AuthService } from '../../../core/services/auth.service';
import { ClientManagementService } from '../../../core/services/client-management.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { TrainingPresentationEmailService } from '../../../core/services/training-presentation-email.service';

@Component({
  selector: 'app-training-presentation-email',
  templateUrl: './training-presentation-email.component.html',
  styleUrls: ['./training-presentation-email.component.scss'],
})
export class TrainingPresentationEmailComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  companies: Client[] = [];
  trainings: Training[] = [];
  recipients: TrainingPresentationRecipient[] = [];
  allUserData: any[] = [];
  history: TrainingPresentationEmailHistory[] = [];
  selectedFile: File | null = null;
  isLoading = false;
  isLoadingRecipients = false;
  isSending = false;
  openPicker: 'company' | 'training' | 'date' | null = null;
  companySearch = '';
  trainingSearch = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientService: ClientManagementService,
    private readonly trainingService: TrainingManagementService,
    private readonly emailService: TrainingPresentationEmailService,
    private readonly authService: AuthService,
    private readonly notifier: NotifierService,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      companyId: ['', Validators.required],
      trainingId: ['', Validators.required],
      trainingDate: ['', Validators.required],
      subject: ['', [Validators.required, Validators.maxLength(250)]],
      message: ['', [Validators.required, Validators.maxLength(5000)]],
    });
    this.loadLookups();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get selectedRecipientCount(): number {
    return this.recipients.filter((recipient) => recipient.selected).length;
  }

  get allRecipientsSelected(): boolean {
    return this.recipients.length > 0 && this.selectedRecipientCount === this.recipients.length;
  }

  get filteredCompanies(): Client[] {
    const search = this.companySearch.trim().toLowerCase();
    return this.companies.filter((company) => !search || company.clientName.toLowerCase().includes(search));
  }

  get filteredTrainings(): Training[] {
    const companyId = this.form?.get('companyId')?.value;
    const company = this.companies.find((item) => String(item.clientId) === String(companyId));
    const search = this.trainingSearch.trim().toLowerCase();
    const companyTrainingIds = new Set(this.recordsForCompany(company).map((record) => String(record.trainingId)));
    return this.trainings.filter((training) => {
      const label = (training.displayName || training.trainingName || '').toLowerCase();
      return companyTrainingIds.has(String(training.trainingId)) && (!search || label.includes(search));
    });
  }

  get trainingDateOptions(): Array<{ value: string; label: string; count: number }> {
    const companyId = this.form?.get('companyId')?.value;
    const trainingId = this.form?.get('trainingId')?.value;
    const company = this.companies.find((item) => String(item.clientId) === String(companyId));
    const counts = new Map<string, number>();
    this.recordsForCompany(company)
      .filter((record) => String(record.trainingId) === String(trainingId))
      .forEach((record) => {
        const value = this.toDateInputValue(record.issuedDate || record.date || record.certificationDate);
        if (value) counts.set(value, (counts.get(value) || 0) + 1);
      });
    return Array.from(counts.entries())
      .sort(([left], [right]) => right.localeCompare(left))
      .map(([value, count]) => ({
        value,
        count,
        label: this.formatDisplayDate(value),
      }));
  }

  get selectedCompanyLabel(): string {
    const companyId = this.form?.get('companyId')?.value;
    return (
      this.companies.find((company) => String(company.clientId) === String(companyId))?.clientName || 'Select company'
    );
  }

  get selectedTrainingLabel(): string {
    const trainingId = this.form?.get('trainingId')?.value;
    const training = this.trainings.find((item) => String(item.trainingId) === String(trainingId));
    return training?.displayName || training?.trainingName || 'Select training';
  }

  get selectedDateLabel(): string {
    const value = this.form?.get('trainingDate')?.value;
    return value ? this.formatDisplayDate(value) : 'Select training date';
  }

  togglePicker(picker: 'company' | 'training' | 'date'): void {
    if (picker === 'training' && !this.form.get('companyId')?.value) return;
    if (picker === 'date' && !this.form.get('trainingId')?.value) return;
    this.openPicker = this.openPicker === picker ? null : picker;
  }

  selectCompany(company: Client | null): void {
    this.form.get('companyId')?.setValue(company?.clientId || '');
    this.form.patchValue({ trainingId: '', trainingDate: '' });
    this.form.get('companyId')?.markAsTouched();
    this.companySearch = '';
    this.openPicker = null;
    this.fetchRecipients();
  }

  selectTraining(training: Training | null): void {
    this.form.patchValue({ trainingDate: '' });
    this.form.get('trainingId')?.setValue(training?.trainingId || '');
    this.form.get('trainingId')?.markAsTouched();
    this.trainingSearch = '';
    this.openPicker = null;
    this.fetchRecipients();
  }

  selectDate(value: string): void {
    this.form.get('trainingDate')?.setValue(value);
    this.form.get('trainingDate')?.markAsTouched();
    this.openPicker = null;
    this.fetchRecipients();
  }

  @HostListener('document:click', ['$event'])
  closePicker(event?: MouseEvent): void {
    if (!event || !this.elementRef.nativeElement.contains(event.target as Node)) this.openPicker = null;
  }

  @HostListener('document:keydown.escape')
  closePickerOnEscape(): void {
    this.openPicker = null;
  }

  @HostListener('document:mousedown', ['$event'])
  closePickerOnOutsideMouseDown(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) this.openPicker = null;
  }

  private loadLookups(): void {
    this.isLoading = true;
    this.clientService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (companies) => (this.companies = companies || []),
        error: () => this.notifier.warningToastr('Companies could not be loaded.'),
      });
    this.trainingService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (trainings) => (this.trainings = trainings || []),
        error: () => this.notifier.warningToastr('Training data could not be loaded.'),
        complete: () => (this.isLoading = false),
      });
    this.trainingService
      .getCertificationData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (records) => (this.allUserData = Array.isArray(records) ? records : []),
        error: () => this.notifier.warningToastr('Participant data could not be loaded.'),
      });
  }

  fetchRecipients(): void {
    const { companyId, trainingId, trainingDate } = this.form.getRawValue();
    this.recipients = [];
    if (!companyId || !trainingId || !trainingDate) {
      return;
    }

    this.isLoadingRecipients = true;
    const company = this.companies.find((item) => String(item.clientId) === String(companyId));
    this.recipients = this.recordsForCompany(company)
      .filter(
        (record) =>
          String(record.trainingId) === String(trainingId) &&
          this.toDateInputValue(record.issuedDate || record.date || record.certificationDate) === trainingDate,
      )
      .map((record) => ({
        recipientId: record.certificationDataId,
        name: record.userName || record.name || '',
        email: record.email || '',
        selected: true,
      }));
    this.isLoadingRecipients = false;
  }

  toggleAllRecipients(): void {
    const selected = !this.allRecipientsSelected;
    this.recipients.forEach((recipient) => (recipient.selected = selected));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    if (!file) {
      this.selectedFile = null;
      return;
    }

    if (file.size === 0 || file.size > 10 * 1024 * 1024) {
      this.selectedFile = null;
      input.value = '';
      this.notifier.warningToastr('Choose a non-empty file up to 10 MB.');
      return;
    }
    this.selectedFile = file;
  }

  submit(): void {
    if (this.form.invalid || !this.selectedFile || !this.selectedRecipientCount) {
      this.form.markAllAsTouched();
      this.notifier.warningToastr('Complete the form, choose a presentation, and select at least one recipient.');
      return;
    }

    const value = this.form.getRawValue();
    const formData = new FormData();
    formData.append('companyId', String(value.companyId));
    formData.append('trainingId', String(value.trainingId));
    formData.append('trainingDate', value.trainingDate);
    formData.append('subject', value.subject.trim());
    formData.append('message', value.message.trim());
    formData.append(
      'recipientEmails',
      JSON.stringify(this.recipients.filter((recipient) => recipient.selected).map((recipient) => recipient.email)),
    );
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.isSending = true;
    this.emailService
      .send(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.notifier.successToastr(`${result.sentCount} presentation email(s) sent successfully.`);
          if (result.failedCount) {
            this.notifier.warningToastr(`${result.failedCount} recipient(s) failed. They can be resent from history.`);
          }
          this.recipients = [];
          this.form.reset();
          this.selectedFile = null;
        },
        error: (error) =>
          this.notifier.warningToastr(
            error?.status === 404
              ? 'Email sending is not available on the server. Add the TrainingPresentationEmail send API.'
              : 'Presentation emails could not be sent.',
          ),
        complete: () => (this.isSending = false),
      });
  }

  resendFailed(record: TrainingPresentationEmailHistory): void {
    if (!record.failedCount) {
      return;
    }
    if (!this.selectedFile) {
      this.notifier.warningToastr('Choose the presentation file before resending failed recipients.');
      return;
    }
    this.isSending = true;
    this.emailService
      .resendFailed(record.historyId, this.selectedFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.notifier.successToastr(`${result.sentCount} failed recipient(s) resent.`);
        },
        error: (error) =>
          this.notifier.warningToastr(
            error?.status === 404
              ? 'Email resend is not available on the server. Add the TrainingPresentationEmail resend API.'
              : 'Failed recipients could not be resent.',
          ),
        complete: () => (this.isSending = false),
      });
  }

  currentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user?.name || user?.email || 'Current user';
  }

  trackByEmail(index: number, recipient: TrainingPresentationRecipient): string {
    return recipient.email || String(index);
  }

  fieldError(key: string, label: string): string {
    const control = this.form.get(key);
    return control?.touched && control.errors?.['required'] ? `${label} is required.` : '';
  }

  private toDateInputValue(value: unknown): string {
    if (!value) return '';
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) return '';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  private formatDisplayDate(value: string): string {
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
  }

  private recordsForCompany(company: Client | undefined): any[] {
    if (!company) return [];
    const companyId = String(company.clientId);
    const companyName = company.clientName.trim().toLowerCase();
    return this.allUserData.filter((record) => {
      const locationId = String(record.location ?? record.clientId ?? '');
      const locationName = String(record.locationName ?? record.clientName ?? record.companyName ?? '')
        .trim()
        .toLowerCase();
      return locationId === companyId || locationName === companyName;
    });
  }
}
