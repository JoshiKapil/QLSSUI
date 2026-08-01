import { Component, HostListener, OnInit } from '@angular/core';
import { Client } from '../../../core/models/client.model';
import { CertificationForm } from '../../../core/models/certification-form.model';
import { ClientManagementService } from '../../../core/services/client-management.service';
import { CertificationFormService } from '../../../core/services/certification-form.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { Training } from '../../../core/models/training.model';
import { Trainer } from '../../../core/models/trainer.model';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { TrainerService } from '../../../core/services/trainer.service';
import { finalize } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-approve-certificate',
  templateUrl: './approve-certificate.component.html',
  styleUrls: ['./approve-certificate.component.scss']
})
export class ApproveCertificateComponent implements OnInit {
  records: CertificationForm[] = [];
  companies: Client[] = [];
  trainings: Training[] = [];
  trainers: Trainer[] = [];
  importCompanyId = '';
  importTrainingId = '';
  importTrainerId = '';
  importTrainingSearch = '';
  importTrainerSearch = '';
  importCompanySearch = '';
  importTrainingDropdownOpen = false;
  importTrainerDropdownOpen = false;
  importCompanyDropdownOpen = false;
  selectedIds = new Set<number>();
  selectedCompanyId = '';
  selectedUserId = '';
  companySearch = '';
  userSearch = '';
  companyDropdownOpen = false;
  userDropdownOpen = false;
  loading = false;
  approving = false;
  importRecords: CertificationForm[] = [];
  importErrors: string[] = [];
  importFileName = '';
  importing = false;
  draggingFile = false;

  constructor(
    private certificationService: CertificationFormService,
    private clientService: ClientManagementService,
    private trainingService: TrainingManagementService,
    private trainerService: TrainerService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.load();
    this.clientService.getAll().subscribe(clients => {
      this.companies = (clients || []).filter(client => client.isActive !== false);
    });
    this.trainingService.getPaged(1, 100).subscribe({
      next: response => {
        this.trainings = (response.items || [])
          .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
      },
      error: () => this.notifier.warningToastr('Training dropdown could not be loaded.')
    });
    this.trainerService.getAll().subscribe(trainers => {
      this.trainers = (trainers || []).filter(trainer => trainer.isActive !== false).sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  load(): void {
    this.loading = true;
    this.certificationService.getAll().subscribe({
      next: records => this.records = (records || []).filter(record => !record.certificationNumber),
      error: () => this.notifier.warningToastr('Pending certificate requests could not be loaded.'),
      complete: () => this.loading = false
    });
  }

  get filteredCompanies(): Client[] {
    const search = this.companySearch.trim().toLowerCase();
    if (!search) {
      return this.companies;
    }

    return this.companies.filter(company =>
      company.clientName.toLowerCase().includes(search)
    );
  }

  get filteredImportTrainings(): Training[] {
    const search = this.importTrainingSearch.trim().toLowerCase();
    return this.trainings.filter(training =>
      !search || [this.trainingLabel(training), training.trainingId, training.topicCovered]
        .join(' ').toLowerCase().includes(search));
  }

  get filteredImportTrainers(): Trainer[] {
    const search = this.importTrainerSearch.trim().toLowerCase();
    return this.trainers.filter(trainer =>
      !search || [trainer.name, trainer.email, trainer.mobile].join(' ').toLowerCase().includes(search));
  }

  get filteredImportCompanies(): Client[] {
    const search = this.importCompanySearch.trim().toLowerCase();
    return this.companies.filter(company =>
      !search || [company.clientName, company.clientId].join(' ').toLowerCase().includes(search));
  }

  selectedImportTrainingLabel(): string {
    const selected = this.trainings.find(training => String(training.trainingId) === this.importTrainingId);
    return selected ? this.trainingLabel(selected) : 'Select training';
  }

  selectedImportTrainerLabel(): string {
    return this.trainers.find(trainer => String(trainer.trainerId) === this.importTrainerId)?.name || 'Select trainer';
  }

  selectedImportCompanyLabel(): string {
    return this.companies.find(company => String(company.clientId) === this.importCompanyId)?.clientName || 'Select company';
  }

  toggleImportDropdown(type: 'training' | 'trainer' | 'company'): void {
    this.companyDropdownOpen = false;
    this.userDropdownOpen = false;
    this.importTrainingDropdownOpen = type === 'training' ? !this.importTrainingDropdownOpen : false;
    this.importTrainerDropdownOpen = type === 'trainer' ? !this.importTrainerDropdownOpen : false;
    this.importCompanyDropdownOpen = type === 'company' ? !this.importCompanyDropdownOpen : false;
    if (type === 'training') this.importTrainingSearch = '';
    if (type === 'trainer') this.importTrainerSearch = '';
    if (type === 'company') this.importCompanySearch = '';
  }

  selectImportTraining(training: Training): void {
    this.importTrainingId = String(training.trainingId || '');
    this.importTrainingDropdownOpen = false;
    this.clearImport();
  }

  selectImportTrainer(trainer: Trainer): void {
    this.importTrainerId = String(trainer.trainerId || '');
    this.importTrainerDropdownOpen = false;
    this.clearImport();
  }

  selectImportCompany(company: Client): void {
    this.importCompanyId = String(company.clientId || '');
    this.importCompanyDropdownOpen = false;
    this.clearImport();
  }

  @HostListener('document:click', ['$event'])
  closeDropdownsOnOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('.search-dropdown')) {
      return;
    }

    this.importTrainingDropdownOpen = false;
    this.importTrainerDropdownOpen = false;
    this.importCompanyDropdownOpen = false;
    this.companyDropdownOpen = false;
    this.userDropdownOpen = false;
  }

  @HostListener('document:keydown.escape')
  closeDropdownsOnEscape(): void {
    this.importTrainingDropdownOpen = false;
    this.importTrainerDropdownOpen = false;
    this.importCompanyDropdownOpen = false;
    this.companyDropdownOpen = false;
    this.userDropdownOpen = false;
  }

  get filteredUsers(): CertificationForm[] {
    const search = this.userSearch.trim().toLowerCase();
    return this.records.filter(record =>
      (!this.selectedCompanyId || String(record.location) === this.selectedCompanyId) &&
      (!search || record.name.toLowerCase().includes(search) || record.email.toLowerCase().includes(search)));
  }

  get visibleRecords(): CertificationForm[] {
    return this.records.filter(record =>
      !this.selectedCompanyId || String(record.location) === this.selectedCompanyId);
  }

  companyName(location: string): string {
    const company = this.companies.find(
      item => String(item.clientId) === String(location)
    );
    return company ? company.clientName : location;
  }

  selectedCompanyName(): string {
    if (!this.selectedCompanyId) {
      return 'All companies';
    }
    return this.companyName(this.selectedCompanyId);
  }

  selectedUserName(): string {
    const user = this.records.find(
      record => String(record.certificationDataId) === this.selectedUserId
    );
    return user ? `${user.name} - ${user.email}` : 'Select user';
  }

  toggleCompanyDropdown(): void {
    this.importTrainingDropdownOpen = false;
    this.importTrainerDropdownOpen = false;
    this.importCompanyDropdownOpen = false;
    this.companyDropdownOpen = !this.companyDropdownOpen;
    this.userDropdownOpen = false;
    if (this.companyDropdownOpen) {
      this.companySearch = '';
    }
  }

  selectCompany(companyId: string | number): void {
    this.selectedCompanyId = String(companyId);
    this.selectedUserId = '';
    this.companyDropdownOpen = false;
  }

  toggleUserDropdown(): void {
    this.importTrainingDropdownOpen = false;
    this.importTrainerDropdownOpen = false;
    this.importCompanyDropdownOpen = false;
    this.userDropdownOpen = !this.userDropdownOpen;
    this.companyDropdownOpen = false;
    if (this.userDropdownOpen) {
      this.userSearch = '';
    }
  }

  selectUser(userId: number | undefined): void {
    this.selectedUserId = userId ? String(userId) : '';
    this.userDropdownOpen = false;
  }

  toggle(record: CertificationForm, checked: boolean): void {
    const id = Number(record.certificationDataId);
    if (!id) {
      return;
    }

    if (checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
  }

  toggleAll(checked: boolean): void {
    this.selectedIds.clear();
    if (!checked) {
      return;
    }

    this.visibleRecords.forEach(record => {
      if (record.certificationDataId) {
        this.selectedIds.add(record.certificationDataId);
      }
    });
  }

  approveSelected(): void {
    const ids = this.selectedUserId
      ? [Number(this.selectedUserId)]
      : Array.from(this.selectedIds);
    this.approve(ids, '');
  }

  approveCompany(): void {
    if (!this.selectedCompanyId) {
      this.notifier.warningToastr('Select a company first.');
      return;
    }
    this.approve([], this.selectedCompanyId);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.readImportFile(file);
    }
    input.value = '';
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.draggingFile = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.readImportFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.draggingFile = true;
  }

  clearImport(): void {
    this.importRecords = [];
    this.importErrors = [];
    this.importFileName = '';
  }

  uploadImport(): void {
    if (!this.importTrainingId || !this.importTrainerId || !this.importCompanyId) {
      this.notifier.warningToastr('Training, trainer, and company are mandatory for upload.');
      return;
    }
    if (!this.importRecords.length || this.importErrors.length) {
      this.notifier.warningToastr('Select a valid Excel file before uploading.');
      return;
    }

    this.importing = true;
    const records = this.importRecords.map(record => ({
      ...record,
      trainingId: Number(this.importTrainingId),
      trainerId: Number(this.importTrainerId),
      location: this.importCompanyId
    }));
    this.certificationService.import(records).pipe(
      finalize(() => this.importing = false)
    ).subscribe({
      next: result => {
        this.notifier.successToastr(`${result.importedCount} certification record(s) uploaded.`);
        this.clearImport();
        this.load();
      },
      error: error => {
        const message = error?.error?.message || 'Certification records could not be uploaded.';
        this.notifier.warningToastr(message);
      }
    });
  }

  private readImportFile(file: File): void {
    this.clearImport();
    if (!this.importTrainingId || !this.importTrainerId || !this.importCompanyId) {
      this.importErrors = ['Select the training, trainer, and company before choosing the Excel file.'];
      return;
    }
    this.importFileName = file.name;

    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      this.importErrors = ['Only .xlsx and .xls files are supported.'];
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const workbook = XLSX.read(reader.result, { type: 'array', cellDates: false });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
          defval: '',
          raw: false
        });
        this.mapImportRows(rows);
      } catch {
        this.importErrors = ['The selected Excel file could not be read.'];
      }
    };
    reader.onerror = () => this.importErrors = ['The selected Excel file could not be read.'];
    reader.readAsArrayBuffer(file);
  }

  private mapImportRows(rows: Record<string, unknown>[]): void {
    if (!rows.length) {
      this.importErrors = ['The first worksheet does not contain any data rows.'];
      return;
    }

    const requiredHeaders = ['Date', 'Totalpoints', 'Name', 'ContactNo', 'Email', 'Days'];
    const availableHeaders = Object.keys(rows[0]).map(header => this.normalizeHeader(header));
    const missingHeaders = requiredHeaders.filter(header =>
      !availableHeaders.includes(this.normalizeHeader(header))
    );
    if (missingHeaders.length) {
      this.importErrors = [`Missing required column(s): ${missingHeaders.join(', ')}.`];
      return;
    }

    const errors: string[] = [];
    this.importRecords = rows.map((row, index) => {
      const rowNumber = index + 2;
      const name = this.excelValue(row, 'Name');
      const email = this.excelValue(row, 'Email');
      const trainingId = Number(this.importTrainingId);
      const days = this.excelInteger(row, 'Days');
      const trainerId = Number(this.importTrainerId);
      const totalPoints = this.excelInteger(row, 'Totalpoints', 'TotalPoints');

      if (!name) errors.push(`Row ${rowNumber}: Name is required.`);
      if (!email) errors.push(`Row ${rowNumber}: Email is required.`);
      if (trainingId <= 0) errors.push(`Row ${rowNumber}: TrainingId must be greater than zero.`);
      if (days < 0) errors.push(`Row ${rowNumber}: Days cannot be negative.`);
      if (trainerId <= 0) errors.push(`Row ${rowNumber}: TrainerId must be greater than zero.`);
      if (totalPoints < 0) errors.push(`Row ${rowNumber}: Totalpoints cannot be negative.`);

      return {
        certificationDate: '',
        certificationNumber: '',
        name,
        trainingId,
        date: this.excelValue(row, 'Date'),
        batchNo: this.excelValue(row, 'BatchNo'),
        contactNo: this.excelValue(row, 'ContactNo'),
        email,
        location: this.importCompanyId,
        days,
        totalPoints,
        trainerId,
        isComplete: true,
        isPaid: false,
        paymentId: '',
        paymentDate: null
      };
    });
    this.importErrors = errors;
  }

  private excelValue(row: Record<string, unknown>, ...headers: string[]): string {
    const normalized = headers.map(header => this.normalizeHeader(header));
    const key = Object.keys(row).find(header => normalized.includes(this.normalizeHeader(header)));
    return key ? String(row[key] ?? '').trim() : '';
  }

  private excelInteger(row: Record<string, unknown>, ...headers: string[]): number {
    const value = Number(this.excelValue(row, ...headers));
    return Number.isInteger(value) ? value : -1;
  }

  private normalizeHeader(header: string): string {
    return header.replace(/[\s_-]/g, '').toLowerCase();
  }

  trainingLabel(training: Training): string {
    return String(training.displayName || training.trainingName || training.trainingId || 'Training');
  }

  private approve(ids: number[], location: string): void {
    if (!ids.length && !location) {
      this.notifier.warningToastr('Select one or more users.');
      return;
    }
    this.approving = true;
    this.certificationService.approve(ids, location).subscribe({
      next: result => {
        this.notifier.successToastr(`${result.approvedCount} certificate(s) approved.`);
        this.selectedIds.clear();
        this.selectedUserId = '';
        this.load();
      },
      error: () => this.notifier.warningToastr('Certificates could not be approved.'),
      complete: () => this.approving = false
    });
  }
}
