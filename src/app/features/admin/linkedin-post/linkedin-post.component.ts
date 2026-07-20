import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinkedInPost } from '../../../core/models/linkedin-post.model';
import { LinkedInPostService } from '../../../core/services/linkedin-post.service';
import { NotifierService } from '../../../core/services/notifier.service';

@Component({
  selector: 'app-linkedin-post-admin',
  templateUrl: './linkedin-post.component.html',
  styleUrls: ['./linkedin-post.component.scss']
})
export class LinkedinPostComponent implements OnInit {
  readonly title = 'LinkedInPost';
  readonly searchPlaceholder = 'Search by PostId or Author';
  readonly idKey = 'postId';

  form!: FormGroup;
  records: LinkedInPost[] = [];
  selectedRecord: LinkedInPost | null = null;
  searchTerm = '';
  isLoading = false;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private linkedInPostService: LinkedInPostService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRecords();
  }

  private initForm(): void {
    this.form = this.fb.group({
      postId: ['', Validators.required],
      content: ['', Validators.required],
      createdDate: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  loadRecords(): void {
    this.isLoading = true;
    this.linkedInPostService.getAll().subscribe({
      next: (records) => (this.records = records || []),
      complete: () => (this.isLoading = false)
    });
  }

  search(): void {
    this.isLoading = true;
    this.linkedInPostService.search(this.searchTerm).subscribe({
      next: (records) => (this.records = records || []),
      complete: () => (this.isLoading = false)
    });
  }

  edit(record: LinkedInPost): void {
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
    const payload = { ...this.selectedRecord, ...this.form.value } as LinkedInPost;

    this.linkedInPostService.save(payload).subscribe({
      next: () => {
        this.notifier.successToastr(`LinkedInPost saved successfully.`);
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

  trackByRecordId(index: number, record: LinkedInPost): string | number {
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
}
