import { Component, OnDestroy, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http'; // Training.json path disabled.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from '../../../core/models/training.model';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { NotifierService } from '../../../core/services/notifier.service';
// import { DataService } from '../../../core/services/data.service'; // Training.json path disabled.
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-training-admin',
  templateUrl: './training-admin.component.html',
  styleUrls: ['./training-admin.component.scss']
})
export class TrainingAdminComponent implements OnInit, OnDestroy {
  readonly title = 'Training';
  readonly searchPlaceholder = 'Search by TrainingName or TrainingId';
  readonly idKey = 'trainingId';

  form!: FormGroup;
  records: Training[] = [];
  private allRecords: Training[] = [];
  selectedRecord: Training | null = null;
  searchTerm = '';
  isLoading = false;
  isSaving = false;
  selectedTrainingId = '';
  trainingSearch = '';
  isTrainingDropdownOpen = false;
  currentPage = 1;
  pageSize = 10;
  goToPageValue: number | null = 1;
  private Destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private trainingService: TrainingManagementService
    // private http: HttpClient, // Training.json path disabled.
    // private dataService: DataService // Training.json path disabled.
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRecords();
  }

  ngOnDestroy(): void {
    this.Destroy$.next();
    this.Destroy$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      trainingName: ['', Validators.required],
      trainingDesc: ['', Validators.required],
      topicCovered: ['', []],
      displayName: ['', Validators.required],
      image: ['', []],
      displayOrder: ['', Validators.required]
    });
  }

  loadRecords(): void {
    this.isLoading = true;
    // this.isLoading = true;
    // const reqHeader = new HttpHeaders({
    //   ETag: 'f88dd058fe004909615a64f01be66a7',
    //   'Content-Type': 'application/json'
    // });

    // this.http
    //   .get('assets/Training.json', { headers: reqHeader, responseType: 'text' })
    //   .pipe(takeUntil(this.Destroy$))
    //   .subscribe({
    //     next: (data: string) => {
    //       const decrypted = this.dataService.decrypt(data);
    //       const trainings = decrypted?.Table || [];
    //       this.allRecords = trainings
    //         .map((training: unknown) => this.mapTrainingFromAsset(training))
    //         .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
    //       this.records = [...this.allRecords];
    //       this.isLoading = false;
    //     },
    //     error: () => {
    //       this.allRecords = [];
    //       this.records = [];
    //       this.isLoading = false;
    //     }
    //   });

    // Active path: database-backed API with server-side memory caching.
    this.trainingService.getAll().pipe(takeUntil(this.Destroy$)).subscribe({
      next: (trainings) => {
        this.allRecords = trainings
          .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        this.applySearch();
      },
      error: (error) => {
        console.error('Failed to load training data.', { status: error.status });
        this.allRecords = [];
        this.records = [];
        this.isLoading = false;
        this.notifier.warningToastr('Training data could not be refreshed. Please try again.');
      },
      complete: () => (this.isLoading = false)
    });
  }

  search(): void {
    this.currentPage = 1;
    this.goToPageValue = 1;
    this.applySearch();
  }

  private applySearch(): void {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) {
      this.records = [...this.allRecords];
      this.ensureValidPage();
      return;
    }

    this.records = this.allRecords.filter((training) => {
      const id = String(training.trainingId || '').toLowerCase();
      const name = (training.trainingName || '').toLowerCase();
      return id.includes(search) || name.includes(search);
    });
    this.ensureValidPage();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.records.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get paginatedRecords(): Training[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  get firstVisibleRecord(): number {
    return this.records.length ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }

  get lastVisibleRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.records.length);
  }

  goToPage(page: number): void {
    const safePage = Math.min(Math.max(Math.trunc(Number(page) || 1), 1), this.totalPages);
    this.currentPage = safePage;
    this.goToPageValue = safePage;
  }

  changePageSize(value: string | number): void {
    this.pageSize = Number(value) || 10;
    this.goToPage(1);
  }

  submitGoToPage(): void {
    this.goToPage(Number(this.goToPageValue));
  }

  private ensureValidPage(): void {
    this.goToPage(Math.min(this.currentPage, this.totalPages));
  }


  // Legacy Training.json mapping retained as comments only.
  // private mapTrainingFromAsset(training: unknown): Training {
  // const item = training as Record<string, unknown>;
  //
  // return {
  // trainingId: (item['trainingId'] ?? item['TrainingId'] ?? item['TrainingID'] ?? item['Id'] ?? item['id'] ?? '') as string | number,
  // trainingName: String(item['trainingName'] ?? item['TrainingName'] ?? item['Name'] ?? ''),
  // trainingDesc: String(item['trainingDesc'] ?? item['TrainingDesc'] ?? item['Description'] ?? ''),
  // topicCovered: String(item['topicCovered'] ?? item['TopicCovered'] ?? item['TopicCoveredName'] ?? ''),
  // displayName: String(item['displayName'] ?? item['DisplayName'] ?? item['TrainingName'] ?? ''),
  // image: String(item['image'] ?? item['Image'] ?? ''),
  // displayOrder: Number(item['displayOrder'] ?? item['DisplayOrder'] ?? 0)
  // };
  // }
  //
  edit(record: Training): void {
    this.selectedRecord = record;
    this.selectedTrainingId = String(record.trainingId || '');
    this.trainingSearch = this.getTrainingLabel(record);
    this.form.patchValue(record);
  }

  resetForm(): void {
    this.selectedRecord = null;
    this.selectedTrainingId = '';
    this.trainingSearch = '';
    this.isTrainingDropdownOpen = false;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const payload = { ...this.selectedRecord, ...this.form.value } as Training;

    this.trainingService.save(payload).pipe(takeUntil(this.Destroy$)).subscribe({
      next: (savedTraining) => {
        this.upsertSavedTraining(savedTraining);
        this.notifier.successToastr(`Training saved successfully.`);
        this.resetForm();
      },
      error: () => {
        this.isSaving = false;
        this.notifier.warningToastr('Training could not be saved. Please try again.');
      },
      complete: () => (this.isSaving = false)
    });
  }

  private upsertSavedTraining(savedTraining: Training): void {
    const savedId = String(savedTraining.trainingId || '');
    const index = this.allRecords.findIndex(
      (training) => String(training.trainingId || '') === savedId
    );

    if (index >= 0) {
      this.allRecords[index] = savedTraining;
    } else {
      this.allRecords.push(savedTraining);
    }

    this.allRecords.sort(
      (a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0)
    );
    this.searchTerm = '';
    this.applySearch();
    const savedIndex = this.records.findIndex(
      (training) => String(training.trainingId || '') === savedId
    );
    if (savedIndex >= 0) {
      this.goToPage(Math.floor(savedIndex / this.pageSize) + 1);
    }
  }

  fieldError(key: string, label: string): string {
    const control = this.form.get(key);
    if (!control?.touched || !control.errors) {
      return '';
    }

    return control.errors['required'] ? `${label} is required.` : `${label} is invalid.`;
  }

  trackByRecordId(index: number, record: Training): string | number {
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

  onTrainingSelected(trainingId: string): void {
    this.selectedTrainingId = trainingId;

    if (!trainingId) {
      this.resetForm();
      return;
    }

    const selected = this.records.find((training) => String(training.trainingId || '') === String(trainingId));
    if (selected) {
      this.edit(selected);
    }
  }

  get filteredTrainingList(): Training[] {
    const search = this.trainingSearch.trim().toLowerCase();

    if (!search) {
      return this.records;
    }

    return this.records.filter((training) => {
      const label = this.getTrainingLabel(training).toLowerCase();
      const id = String(training.trainingId || '').toLowerCase();
      return label.includes(search) || id.includes(search);
    });
  }

  getTrainingLabel(training: Training): string {
    return training.displayName || training.trainingName || String(training.trainingId || 'Training');
  }

  getSelectedTrainingLabel(): string {
    if (!this.selectedTrainingId) {
      return 'New Training';
    }

    const selected = this.records.find((training) => String(training.trainingId || '') === String(this.selectedTrainingId));
    return selected ? this.getTrainingLabel(selected) : 'New Training';
  }

  toggleTrainingDropdown(): void {
    this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;

    if (this.isTrainingDropdownOpen) {
      this.trainingSearch = '';
    }
  }

  onTrainingSearchChange(): void {
    this.isTrainingDropdownOpen = true;
  }

  selectTrainingFromDropdown(training: Training | null): void {
    if (!training) {
      this.onTrainingSelected('');
      this.isTrainingDropdownOpen = false;
      return;
    }

    this.onTrainingSelected(String(training.trainingId || ''));
    this.trainingSearch = this.getTrainingLabel(training);
    this.isTrainingDropdownOpen = false;
  }
}
