import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from '../../../core/models/training.model';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { DataService } from '../../../core/services/data.service';
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
  private Destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private trainingService: TrainingManagementService,
    private http: HttpClient,
    private dataService: DataService
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

    // Future API integration: call this method instead of loadRecords().
    this.trainingService.getPaged(1, 100).pipe(takeUntil(this.Destroy$)).subscribe({
      next: (response) => {
        this.allRecords = (response.items || [])
          .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        this.records = [...this.allRecords];
      },
      error: (error) => {
        console.error('Failed to load training data.', { status: error.status });
        this.allRecords = [];
        this.records = [];
      },
      complete: () => (this.isLoading = false)
    });
  }

  search(): void {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) {
      this.records = [...this.allRecords];
      return;
    }

    this.records = this.allRecords.filter((training) => {
      const id = String(training.trainingId || '').toLowerCase();
      const name = (training.trainingName || '').toLowerCase();
      return id.includes(search) || name.includes(search);
    });
  }


  private mapTrainingFromAsset(training: unknown): Training {
    const item = training as Record<string, unknown>;

    return {
      trainingId: (item['trainingId'] ?? item['TrainingId'] ?? item['TrainingID'] ?? item['Id'] ?? item['id'] ?? '') as string | number,
      trainingName: String(item['trainingName'] ?? item['TrainingName'] ?? item['Name'] ?? ''),
      trainingDesc: String(item['trainingDesc'] ?? item['TrainingDesc'] ?? item['Description'] ?? ''),
      topicCovered: String(item['topicCovered'] ?? item['TopicCovered'] ?? item['TopicCoveredName'] ?? ''),
      displayName: String(item['displayName'] ?? item['DisplayName'] ?? item['TrainingName'] ?? ''),
      image: String(item['image'] ?? item['Image'] ?? ''),
      displayOrder: Number(item['displayOrder'] ?? item['DisplayOrder'] ?? 0)
    };
  }

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

    this.trainingService.save(payload).subscribe({
      next: () => {
        this.notifier.successToastr(`Training saved successfully.`);
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
    return training.trainingName || training.displayName || String(training.trainingId || 'Training');
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
