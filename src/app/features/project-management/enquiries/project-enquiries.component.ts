import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmAttachment, PmEnquiry, PmEnquiryMetadata, PmLookups } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-enquiries',
  templateUrl: './project-enquiries.component.html',
  styleUrls: ['./project-enquiries.component.scss'],
})
export class ProjectEnquiriesComponent implements OnInit {
  readonly categoriesOptionsPage = new ListPage('categories options');
  readonly usersOptionsPage = new ListPage('users options');
  readonly quotationTemplatesOptionsPage = new ListPage('quotationTemplates options');
  readonly projectTemplatesOptionsPage = new ListPage('projectTemplates options');
  readonly clientsOptionsPage = new ListPage('clients options');
  readonly trainingsOptionsPage = new ListPage('trainings options');
  loadLookupOptions(): void { this.loadcategoriesOptions(); this.loadusersOptions(); this.loadquotationTemplatesOptions(); this.loadprojectTemplatesOptions(); this.loadclientsOptions(); this.loadtrainingsOptions(); }
  loadcategoriesOptions(): void {
    this.api.lookupPage('categories',this.categoriesOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.categories = rows;
    },error: () => this.error = 'Unable to load categories options.'});
  }
  loadusersOptions(): void {
    this.api.lookupPage('users',this.usersOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.users = rows;
    },error: () => this.error = 'Unable to load users options.'});
  }
  loadquotationTemplatesOptions(): void {
    this.api.lookupPage('quotationTemplates',this.quotationTemplatesOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.quotationTemplates = rows;
    },error: () => this.error = 'Unable to load quotationTemplates options.'});
  }
  loadprojectTemplatesOptions(): void {
    this.api.lookupPage('projectTemplates',this.projectTemplatesOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.projectTemplates = rows;
    },error: () => this.error = 'Unable to load projectTemplates options.'});
  }
  loadclientsOptions(): void {
    this.api.lookupPage('clients',this.clientsOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.clients = rows;
    },error: () => this.error = 'Unable to load clients options.'});
  }
  loadtrainingsOptions(): void {
    this.api.lookupPage('trainings',this.trainingsOptionsPage).subscribe({next: rows => {
      this.lookups ||= {categories:[],users:[],quotationTemplates:[],projectTemplates:[],clients:[],trainings:[]};
      this.lookups.trainings = rows;
    },error: () => this.error = 'Unable to load trainings options.'});
  }
  readonly enquiriesPage = new ListPage('Enquiries');
  reloadenquiriesPage(): void { this.refresh(); }

  items: PmEnquiry[] = [];
  lookups?: PmLookups;
  metadata?: PmEnquiryMetadata;
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

  outcomeModal: {
    open: boolean;
    enquiry?: PmEnquiry;
    status: string;
    remark: string;
  } = { open: false, status: '', remark: '' };

  form: any = this.emptyForm();

  constructor(
    private api: ProjectManagementService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.loadLookupOptions();
    this.api.enquiryMetadata().subscribe({ next: (value) => (this.metadata = value), error: () => undefined });
  }

  get availableCategories() {
    return this.lookups?.categories || [];
  }

  get selectedCategory() {
    return this.availableCategories.find((x) => +x.id === +this.form.categoryId);
  }

  get selectedCategoryMetadata() {
    return (this.metadata?.categories || []).find((x) => +x.categoryId === +this.form.categoryId);
  }

  get categoryValues() {
    return (this.metadata?.values || [])
      .filter((x) => +x.categoryId === +this.form.categoryId && x.isActive)
      .map((x) => ({ id: x.code, code: x.code, name: x.name }));
  }

  get selectedCategoryValue() {
    return (this.metadata?.values || []).find(
      (x) => +x.categoryId === +this.form.categoryId && String(x.code) === String(this.form.categoryValueCode || ''),
    );
  }

  get usesValueList(): boolean {
    const source = this.selectedCategoryMetadata?.valueSource || 'NONE';
    return source === 'LIST' || source === 'TRAINING';
  }

  get usesFreeTextValue(): boolean {
    return (this.selectedCategoryMetadata?.valueSource || 'NONE') === 'FREE_TEXT';
  }

  get categoryValueLabel(): string {
    return this.selectedCategoryMetadata?.valueLabel || 'Service / Standard';
  }

  get scopeLabel(): string {
    const value = (this.form.categoryValueName || '').trim();
    return value ? `Requirement / Scope for ${value} *` : 'Requirement / Scope *';
  }

  onCategoryChange(): void {
    this.form.categoryValueCode = '';
    this.form.categoryValueName = '';
    const defaultScope = (this.selectedCategoryMetadata?.defaultRequirementScope || '').trim();
    this.form.requirementScope = defaultScope;
  }

  onCategoryValueChange(): void {
    const selected = this.selectedCategoryValue;
    this.form.categoryValueName = selected?.name || '';
    if (selected?.defaultRequirementScope?.trim()) {
      this.form.requirementScope = selected.defaultRequirementScope.trim();
    } else {
      this.form.requirementScope = (this.selectedCategoryMetadata?.defaultRequirementScope || '').trim();
    }
  }

  onFreeTextValueChange(): void {
    this.form.categoryValueCode = this.form.categoryValueName?.trim() ? 'CUSTOM' : '';
    if (!this.form.requirementScope?.trim()) {
      this.form.requirementScope = (this.selectedCategoryMetadata?.defaultRequirementScope || '').trim();
    }
  }

  openQuotations(): void {
    this.router.navigate(['/workspace/quotations']);
  }

  get assignableEmployees() {
    const search = this.employeeSearch.trim().toLowerCase();
    return (this.lookups?.users || []).filter((user) => {
      const isAssignable = user.role.toLowerCase() !== 'user';
      const matchesSearch = !search || `${user.name} ${user.email}`.toLowerCase().includes(search);
      return isAssignable && matchesSearch;
    });
  }

  get selectedEmployeeNames(): string {
    const selectedIds: number[] = this.form.assigneeUserIds || [];
    return (this.lookups?.users || [])
      .filter((user) => selectedIds.includes(user.id))
      .map((user) => user.name)
      .join(', ');
  }

  get filteredItems(): PmEnquiry[] {
    const term = this.search.trim().toLowerCase();
    return this.items.filter((item) => {
      const matchesStatus = !this.statusFilter || item.status === this.statusFilter;
      const text = `${item.enquiryNo} ${item.customerName} ${item.categoryName} ${item.requirementScope}`.toLowerCase();
      return matchesStatus && (!term || text.includes(term));
    });
  }

  refresh(): void {
    this.error = '';
    this.api.enquiries(this.enquiriesPage).subscribe({
      next: (value) => (this.items = value),
      error: (e) => (this.error = e?.error?.message || 'Unable to load enquiries.'),
    });
  }

  newEnquiry(): void {
    ++this.editVersion;
    this.error = '';
    this.editing = undefined;
    this.attachments = [];
    this.pendingFile = undefined;
    this.form = this.emptyForm();
    this.showForm = true;
  }

  private editVersion = 0;
  edit(item: PmEnquiry): void {
    const version = ++this.editVersion;
    this.showForm = false;
    this.api.enquiry(item.enquiryId).subscribe({
      next: detail => { if (version === this.editVersion) this.editDetail(detail); },
      error: () => { if (version === this.editVersion) this.error = 'Unable to load enquiry details.'; },
    });
  }

  private editDetail(item: PmEnquiry): void {
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
      assigneeUserIds: (item.assignees || []).map((user) => user.id),
    };
    this.showForm = true;
    this.loadAttachments(item.enquiryId);
  }

  onClientChange(): void {
    const client = this.lookups?.clients.find((x) => x.id === +this.form.clientId);
    if (client && !this.form.customerName) this.form.customerName = client.name;
  }

  toggleUser(id: number, checked: boolean): void {
    const current: number[] = this.form.assigneeUserIds || [];
    this.form.assigneeUserIds = checked ? Array.from(new Set([...current, id])) : current.filter((x) => x !== id);
  }

  selected(id: number): boolean {
    return (this.form.assigneeUserIds || []).includes(id);
  }

  save(): void {
    if (!this.metadata) {
      this.error = 'PM enquiry metadata is unavailable. Refresh the page or contact SuperAdmin.';
      return;
    }
    if (!this.form.customerName || !this.form.categoryId || !this.form.requirementScope?.trim()) {
      this.error = 'Customer name, category and requirement / scope are required.';
      return;
    }
    const historicalBlankValue = !!this.editing && !this.editing.categoryValueName?.trim();
    if (this.usesValueList && !this.form.categoryValueName?.trim() && !historicalBlankValue) {
      this.error = `Select ${this.categoryValueLabel.toLowerCase()}.`;
      return;
    }
    if (this.usesFreeTextValue && !this.form.categoryValueName?.trim() && !historicalBlankValue) {
      this.error = `Enter ${this.categoryValueLabel.toLowerCase()}.`;
      return;
    }
    if (new Set<number>(this.form.assigneeUserIds || []).size < 1) {
      this.error = 'Assign at least one QLSS employee to the enquiry.';
      return;
    }
    this.saving = true;
    this.error = '';
    const request = this.editing
      ? this.api.updateEnquiry(this.editing.enquiryId, this.form)
      : this.api.createEnquiry(this.form);
    request.subscribe({
      next: (saved) => {
        const afterAttachment = () => {
          this.success = `${saved.enquiryNo} saved successfully.`;
          this.showForm = false;
          this.pendingFile = undefined;
          this.refresh();
        };
        if (this.pendingFile) {
          this.api.uploadAttachment('enquiry', saved.enquiryId, this.pendingFile).subscribe({
            next: afterAttachment,
            error: (e) => {
              this.error = e?.error?.message || 'Enquiry saved, but attachment upload failed.';
              afterAttachment();
            },
          });
        } else {
          afterAttachment();
        }
      },
      error: (e) => {
        this.error = e?.error?.message || 'Unable to save enquiry.';
        this.saving = false;
      },
      complete: () => (this.saving = false),
    });
  }

  updateOutcome(item: PmEnquiry, status: string): void {
    if (!item || !status) return;
    this.outcomeModal = {
      open: true,
      enquiry: item,
      status,
      remark: '',
    };
  }

  confirmOutcome(): void {
    if (!this.outcomeModal.enquiry || !this.outcomeModal.status) return;
    const { enquiry, status, remark } = this.outcomeModal;
    this.error = '';
    this.success = '';
    this.api.updateEnquiryStatus(enquiry.enquiryId, status, remark.trim()).subscribe({
      next: () => {
        this.success = `Enquiry status changed to ${status}.`;
        this.outcomeModal.open = false;
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to update enquiry status.'),
    });
  }

  closeOutcomeModal(): void {
    this.outcomeModal.open = false;
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
      next: () => {
        input.value = '';
        this.loadAttachments(this.editing!.enquiryId);
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to upload attachment.'),
    });
  }

  downloadAttachment(file: PmAttachment): void {
    this.api.attachmentFile(file.attachmentId).subscribe({
      next: (blob) => this.downloadBlob(blob, file.originalFileName),
      error: (e) => (this.error = e?.error?.message || 'Unable to download attachment.'),
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
    this.api
      .attachments('enquiry', id)
      .subscribe({ next: (value) => (this.attachments = value), error: () => (this.attachments = []) });
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
      assigneeUserIds: [],
    };
  }

  private dateValue(value?: string): string | null {
    return value ? value.substring(0, 10) : null;
  }

  private downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
