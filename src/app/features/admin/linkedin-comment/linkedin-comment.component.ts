import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinkedInComment } from '../../../core/models/linkedin-comment.model';
import { LinkedInCommentService } from '../../../core/services/linkedin-comment.service';
import { NotifierService } from '../../../core/services/notifier.service';

@Component({
  selector: 'app-linkedin-comment-admin',
  templateUrl: './linkedin-comment.component.html',
  styleUrls: ['./linkedin-comment.component.scss']
})
export class LinkedinCommentComponent implements OnInit {
  readonly title = 'LinkedInComment';
  readonly searchPlaceholder = 'Search by CommentId, PostId or Author';
  readonly idKey = 'commentId';

  form!: FormGroup;
  records: LinkedInComment[] = [];
  selectedRecord: LinkedInComment | null = null;
  searchTerm = '';
  isLoading = false;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private linkedInCommentService: LinkedInCommentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRecords();
  }

  private initForm(): void {
    this.form = this.fb.group({
      commentId: ['', Validators.required],
      postId: ['', Validators.required],
      commentText: ['', Validators.required],
      createdDate: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  loadRecords(): void {
    this.isLoading = true;
    this.linkedInCommentService.getAll().subscribe({
      next: (records) => (this.records = records || []),
      complete: () => (this.isLoading = false)
    });
  }

  search(): void {
    this.isLoading = true;
    this.linkedInCommentService.search(this.searchTerm).subscribe({
      next: (records) => (this.records = records || []),
      complete: () => (this.isLoading = false)
    });
  }

  edit(record: LinkedInComment): void {
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
    const payload = { ...this.selectedRecord, ...this.form.value } as LinkedInComment;

    this.linkedInCommentService.save(payload).subscribe({
      next: () => {
        this.notifier.successToastr(`LinkedInComment saved successfully.`);
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

  trackByRecordId(index: number, record: LinkedInComment): string | number {
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
