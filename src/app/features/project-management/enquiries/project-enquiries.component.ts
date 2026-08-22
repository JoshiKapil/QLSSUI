import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmAttachment, PmEnquiry, PmLookups } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-enquiries',
  templateUrl: './project-enquiries.component.html',
  styleUrls: ['./project-enquiries.component.scss']
})
export class ProjectEnquiriesComponent implements OnInit {
  items: PmEnquiry[] = [];
  lookups?: PmLookups;
  attachments: PmAttachment[] = [];
  error = '';
  success = '';
  showForm = false;
  saving = false;
  editing?: PmEnquiry;
  search = '';
  statusFilter = '';
  employeeSearch = '';
  pendingFile?: File;

  form: any = this.emptyForm();

  constructor(private api: ProjectManagementService, private router: Router) {}

  ngOnInit(): void {
    this.refresh();
    this.api.lookups().subscribe({ next: value => this.lookups = value, error: () => undefined });
  }

  get availableCategories() {
    return (this.lookups?.categories || []).filter(x => (x.code || '').toUpperCase() !== 'CONSULTANCY');
  }

  get selectedCategory() {
    return this.availableCategories.find(x => +x.id === +this.form.categoryId);
  }

  get isTrainingCategory(): boolean {
    return (this.selectedCategory?.code || '').toUpperCase() === 'TRAINING';
  }

  get isOtherCategory(): boolean {
    return (this.selectedCategory?.code || '').toUpperCase() === 'OTHER';
  }

  get scopeLabel(): string {
    const value = (this.form.categoryValueName || '').trim();
    return value ? `Requirement / Scope for ${value} *` : 'Requirement / Scope *';
  }

  onCategoryChange(): void {
    this.form.categoryValueCode = '';
    this.form.categoryValueName = '';
  }

  onTrainingChange(): void {
    const training = (this.lookups?.trainings || []).find(x => +x.id === +this.form.categoryValueCode);
    this.form.categoryValueName = training?.name || '';
  }

  openQuotations(): void {
    this.router.navigate(['/workspace/quotations']);
  }

  get assignableEmployees() {
    const search = this.employeeSearch.trim().toLowerCase();
    return (this.lookups?.users || []).filter(user => {
      const isAssignable = user.role.toLowerCase() !== 'user';
      const matchesSearch = !search || `${user.name} ${user.email}`.toLowerCase().includes(search);
      return isAssignable && matchesSearch;
    });
  }

  get selectedEmployeeNames(): string {
    const selectedIds: number[] = this.form.assigneeUserIds || [];
    return (this.lookups?.users || [])
      .filter(user => selectedIds.includes(user.id))
      .map(user => user.name)
      .join(', ');
  }

  get filteredItems(): PmEnquiry[] {
    const term = this.search.trim().toLowerCase();
    return this.items.filter(item => {
      const matchesStatus = !this.statusFilter || item.status === this.statusFilter;
      const text = `${item.enquiryNo} ${item.customerName} ${item.categoryName} ${item.requirementScope}`.toLowerCase();
      return matchesStatus && (!term || text.includes(term));
    });
  }

  refresh(): void {
    this.error = '';
    this.api.enquiries().subscribe({
      next: value => this.items = value,
      error: e => this.error = e?.error?.message || 'Unable to load enquiries.'
    });
  }

  newEnquiry(): void {
    this.error = '';
    this.editing = undefined;
    this.attachments = [];
    this.pendingFile = undefined;
    this.form = this.emptyForm();
    this.showForm = true;
  }

  edit(item: PmEnquiry): void {
    this.error = '';
    this.editing = item;
    this.pendingFile = undefined;
    this.form = {
      clientId: item.clientId || null,
      customerName: item.customerName,
      contactPerson: item.contactPerson,
      emailId: item.emailId,
      contactNumber: item.contactNumber,
      customerAddress: item.customerAddress || '',
      enquiryDate: this.dateValue(item.enquiryDate),
      categoryId: item.categoryId,
      categoryValueCode: item.categoryValueCode || '',
      categoryValueName: item.categoryValueName || '',
      requirementScope: item.requirementScope,
      expectedTimeline: item.expectedTimeline,
      expectedStartDate: this.dateValue(item.expectedStartDate),
      expectedCompletionDate: this.dateValue(item.expectedCompletionDate),
      remarks: item.remarks,
      status: item.status,
      assigneeUserIds: (item.assignees || []).map(user => user.id)
    };
    this.showForm = true;
    this.loadAttachments(item.enquiryId);
  }

  onClientChange(): void {
    const client = this.lookups?.clients.find(x => x.id === +this.form.clientId);
    if (client && !this.form.customerName) this.form.customerName = client.name;
  }

  toggleUser(id: number, checked: boolean): void {
    const current: number[] = this.form.assigneeUserIds || [];
    this.form.assigneeUserIds = checked ? Array.from(new Set([...current, id])) : current.filter(x => x !== id);
  }

  selected(id: number): boolean { return (this.form.assigneeUserIds || []).includes(id); }

  save(): void {
    if (!this.form.customerName || !this.form.categoryId || !this.form.requirementScope?.trim()) {
      this.error = 'Customer name, category and requirement / scope are required.';
      return;
    }
    if (this.isTrainingCategory && !this.form.categoryValueName?.trim()) {
      this.error = 'Select the required training.';
      return;
    }
    if (this.isOtherCategory && !this.form.categoryValueName?.trim()) {
      this.error = 'Enter the other service / category.';
      return;
    }
    if (new Set<number>(this.form.assigneeUserIds || []).size < 1) {
      this.error = 'Assign at least one QLSS employee to the enquiry.';
      return;
    }
    this.saving = true;
    this.error = '';
    const request = this.editing ? this.api.updateEnquiry(this.editing.enquiryId, this.form) : this.api.createEnquiry(this.form);
    request.subscribe({
      next: saved => {
        const afterAttachment = () => {
          this.success = `${saved.enquiryNo} saved successfully.`;
          this.showForm = false;
          this.pendingFile = undefined;
          this.refresh();
        };
        if (this.pendingFile) {
          this.api.uploadAttachment('enquiry', saved.enquiryId, this.pendingFile).subscribe({ next: afterAttachment, error: e => { this.error = e?.error?.message || 'Enquiry saved, but attachment upload failed.'; afterAttachment(); } });
        } else {
          afterAttachment();
        }
      },
      error: e => { this.error = e?.error?.message || 'Unable to save enquiry.'; this.saving = false; },
      complete: () => this.saving = false
    });
  }

  updateOutcome(item: PmEnquiry, status: string): void {
    const remark = window.prompt(`Remark for ${status}:`, '') || '';
    this.api.updateEnquiryStatus(item.enquiryId, status, remark).subscribe({
      next: () => { this.success = `Enquiry status changed to ${status}.`; this.refresh(); },
      error: e => this.error = e?.error?.message || 'Unable to update enquiry status.'
    });
  }

  fileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.pendingFile = input.files?.[0];
  }

  uploadToEditing(event: Event): void {
    if (!this.editing) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.api.uploadAttachment('enquiry', this.editing.enquiryId, file).subscribe({
      next: () => { input.value = ''; this.loadAttachments(this.editing!.enquiryId); },
      error: e => this.error = e?.error?.message || 'Unable to upload attachment.'
    });
  }

  downloadAttachment(file: PmAttachment): void {
    this.api.attachmentFile(file.attachmentId).subscribe({
      next: blob => this.downloadBlob(blob, file.originalFileName),
      error: e => this.error = e?.error?.message || 'Unable to download attachment.'
    });
  }

  badge(status: string): string {
    const value = status.toLowerCase();
    if (value.includes('lost') || value.includes('not received')) return 'pm-badge pm-badge--danger';
    if (value.includes('project confirmed')) return 'pm-badge pm-badge--ok';
    if (value.includes('pending') || value.includes('discussion')) return 'pm-badge pm-badge--warn';
    return 'pm-badge';
  }

  private loadAttachments(id: number): void {
    this.api.attachments('enquiry', id).subscribe({ next: value => this.attachments = value, error: () => this.attachments = [] });
  }

  private emptyForm(): any {
    return {
      clientId: null,
      customerName: '',
      contactPerson: '',
      emailId: '',
      contactNumber: '',
      customerAddress: '',
      enquiryDate: new Date().toISOString().substring(0, 10),
      categoryId: null,
      categoryValueCode: '',
      categoryValueName: '',
      requirementScope: '',
      expectedTimeline: '',
      expectedStartDate: null,
      expectedCompletionDate: null,
      remarks: '',
      assigneeUserIds: []
    };
  }

  private dateValue(value?: string): string | null { return value ? value.substring(0, 10) : null; }

  private downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
