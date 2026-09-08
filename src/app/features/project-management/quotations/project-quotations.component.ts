import { ListPage } from '../../../shared/list-page';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  PmAttachment,
  PmEmailLog,
  PmFollowUp,
  PmLookups,
  PmProjectTemplate,
  PmQuotation,
  PmQuotationApprovalHistory,
} from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';
import { QuotationPdfTemplateService } from '../services/quotation-pdf-template.service';

@Component({
  selector: 'app-project-quotations',
  templateUrl: './project-quotations.component.html',
  styleUrls: ['./project-quotations.component.scss'],
})
export class ProjectQuotationsComponent implements AfterViewInit, OnDestroy, OnInit {
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
      this.ensureDefaultProjectTemplate();
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
  readonly projectTemplatesPage = new ListPage('Project templates');
  reloadprojectTemplatesPage(): void { this.ngOnInit(); }
  readonly quotationsPage = new ListPage('Quotations');
  reloadquotationsPage(): void { this.refresh(); }

  @ViewChild('listPane') private listPane?: ElementRef<HTMLElement>;
  @ViewChild('detailPane') private detailPane?: ElementRef<HTMLElement>;
  @ViewChild('splitWorkspace') private splitWorkspace?: ElementRef<HTMLElement>;
  private splitObserver?: ResizeObserver;
  private splitFrame?: number;
  items: PmQuotation[] = [];
  selected?: PmQuotation;
  followUps: PmFollowUp[] = [];
  attachments: PmAttachment[] = [];
  emailLogs: PmEmailLog[] = [];
  approvalHistory: PmQuotationApprovalHistory[] = [];
  lookups?: PmLookups;
  projectTemplates: PmProjectTemplate[] = [];
  submitConfirmation?: PmQuotation;

  search = '';
  statusFilter = '';
  error = '';
  success = '';
  saving = false;
  preparingPdf = false;
  activePanel: 'details' | 'followup' | 'confirm' | 'files' = 'details';

  form: any = {};
  sendForm = { followUpDays: 2, cc: '' };
  followUpForm = { daysFromNow: 2, notes: '', cc: '' };
  projectForm: any = {
    projectTemplateId: null,
    projectLeaderUserId: null,
    memberUserIds: [],
    projectStartDate: '',
    targetCompletionDate: '',
    projectLocation: '',
    poWoReference: '',
  };

  constructor(
    private api: ProjectManagementService,
    private quotationPdf: QuotationPdfTemplateService,
    private router: Router,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.api.settings().subscribe({
      next: (values) => {
        const item = values.find((x) => x.settingKey === 'QuotationFollowUpDays');
        const days = +(item?.settingValue || 2);
        this.sendForm.followUpDays = days;
        this.followUpForm.daysFromNow = days;
      },
    });
    this.refresh();
    this.loadLookupOptions();
    this.api.projectTemplates(this.projectTemplatesPage).subscribe({
      next: (v) => {
        this.projectTemplates = v;
        this.ensureDefaultProjectTemplate();
      },
    });
  }

  ngAfterViewInit(): void {
    this.splitObserver = new ResizeObserver(() => this.syncSplitHeight());
    if (this.detailPane) this.splitObserver.observe(this.detailPane.nativeElement);
    if (this.listPane) this.splitObserver.observe(this.listPane.nativeElement);
    this.syncSplitHeight();
  }

  ngOnDestroy(): void {
    this.splitObserver?.disconnect();
    if (this.splitFrame) cancelAnimationFrame(this.splitFrame);
  }

  private syncSplitHeight(): void {
    if (!this.splitWorkspace || !this.listPane || !this.detailPane || window.innerWidth <= 1100) return;
    if (this.splitFrame) cancelAnimationFrame(this.splitFrame);
    this.splitFrame = requestAnimationFrame(() => {
      const list = this.listPane!.nativeElement;
      const detail = this.detailPane!.nativeElement;
      list.style.height = 'auto';
      list.style.maxHeight = 'none';
      list.style.overflowY = 'visible';
      const detailHeight = detail.scrollHeight;
      const listContentHeight = list.scrollHeight;
      list.style.height = `${detailHeight}px`;
      list.style.overflowY = listContentHeight > detailHeight + 1 ? 'auto' : 'visible';
    });
  }

  get role(): string {
    return this.auth.getCurrentUser()?.role || '';
  }
  get isSuperAdmin(): boolean {
    return this.role.toLowerCase() === 'superadmin';
  }
  get canManage(): boolean {
    return ['superadmin', 'admin', 'manager'].includes(this.role.toLowerCase());
  }

  get filteredItems(): PmQuotation[] {
    const q = this.search.trim().toLowerCase();
    const filtered = this.items.filter(
      (x) =>
        (!this.statusFilter || x.status === this.statusFilter) &&
        (!q || `${x.quotationNo} ${x.customerName} ${x.serviceType} ${x.status}`.toLowerCase().includes(q)),
    );

    // PM_SELECTED_FIRST_V3: selected record is rendered as the first card.
    if (!this.selected) return filtered;
    const selectedIndex = filtered.findIndex((x) => x.quotationId === this.selected?.quotationId);
    if (selectedIndex <= 0) return filtered;
    return [filtered[selectedIndex], ...filtered.slice(0, selectedIndex), ...filtered.slice(selectedIndex + 1)];
  }

  get statuses(): string[] {
    return [...new Set(this.items.map((x) => x.status).filter(Boolean))].sort();
  }

  countStatus(status: string): number {
    return this.items.filter((x) => x.status === status).length;
  }

  get currentStep(): number {
    const status = this.selected?.status || '';
    if (['Draft Quotation', 'Quotation Under Preparation', 'Returned for Modification'].includes(status)) return 2;
    if (status === 'Approval Pending') return 3;
    if (status === 'Quotation Approved') return 4;
    if (status === 'Quotation Sent') return 5;
    return 2;
  }

  get nextActionTitle(): string {
    const status = this.selected?.status || '';
    if (status === 'Approval Pending')
      return this.isSuperAdmin ? 'Review and approve this quotation' : 'Waiting for SuperAdmin approval';
    if (status === 'Quotation Approved') return 'Preview the branded PDF, then send it to the customer';
    if (status === 'Quotation Sent')
      return this.isSuperAdmin ? 'Create the project when the customer confirms' : 'Record the customer response';
    if (status === 'Returned for Modification') return 'Update the quotation and submit it again';
    return 'Enter the fees, save, and submit for approval';
  }

  get nextActionHelp(): string {
    const status = this.selected?.status || '';
    if (status === 'Approval Pending')
      return this.isSuperAdmin
        ? 'Check the scope and amount, then choose Approve, Return, or Reject below.'
        : 'No action is needed now. You can follow the decision in the approval trail.';
    if (status === 'Quotation Approved')
      return 'The branded PDF uses the QLSS template and the live Client Master list. Preview it before sending.';

    if (status === 'Quotation Sent')
      return this.isSuperAdmin
        ? 'Open Confirm project, add the delivery team and dates, then create the project.'
        : 'Use the customer-response buttons below or ask SuperAdmin to create the confirmed project.';
    return 'Professional fees cannot be zero. Travel and stay will be billed separately as per the provided bill.';
  }

  get displayedProfessionalFees(): number {
    if (!this.selected) return 0;
    return this.editable(this.selected) ? +this.form.professionalFees || 0 : this.selected.professionalFees || 0;
  }

  get displayedTotalAmount(): number {
    if (!this.selected) return 0;
    if (!this.editable(this.selected)) return this.selected.totalAmount || 0;
    const fees = +this.form.professionalFees || 0;
    const taxPercent = +this.form.taxPercent || 0;
    return fees + (fees * taxPercent) / 100;
  }

  get hasUnsavedPriceChanges(): boolean {
    if (!this.selected || !this.editable(this.selected)) return false;
    return (
      (+this.form.professionalFees || 0) !== (+this.selected.professionalFees || 0) ||
      (+this.form.taxPercent || 0) !== (+this.selected.taxPercent || 0)
    );
  }

  refresh(): void {
    this.error = '';
    this.api.quotations(this.quotationsPage).subscribe({
      next: (v) => {
        this.items = v;
        if (this.selected) {
          const current = v.find((x) => x.quotationId === this.selected?.quotationId);
          if (current) this.open(current, false, false);
        } else if (v.length) {
          this.open(v[0], true, false);
        }
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to load quotations.'),
    });
  }

  open(q: PmQuotation, resetPanel = true, focusSelection = true): void {
    this.selected = q;
    this.form = { ...q };
    this.restoreProjectDraft(q.quotationId);
    this.sendForm.followUpDays = 2;
    if (resetPanel) this.activePanel = 'details';
    this.followUps = [];
    this.attachments = [];
    this.emailLogs = [];
    this.approvalHistory = [];
    this.loadActivePanel();
    if (focusSelection) this.focusSelectedQuotation();
  }

  selectPanel(panel: typeof this.activePanel): void {
    this.activePanel = panel;
    this.loadActivePanel();
  }

  private loadActivePanel(): void {
    const id = this.selected?.quotationId;
    if (!id) return;
    if (this.activePanel === 'details') this.loadApprovalHistory(id);
    if (this.activePanel === 'followup') {
      this.loadFollowUps(id);
      this.loadEmailLogs(id);
    }
    if (this.activePanel === 'files') this.loadAttachments(id);
  }

  // PM_SELECTED_FIRST_V3: reorder the chosen record to the first card; do not scroll to its old LHS position.
  private focusSelectedQuotation(): void {
    setTimeout(() => {
      const container = document.querySelector('.quote-grid') as HTMLElement | null;
      if (container) container.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  editable(q: PmQuotation): boolean {
    return [
      'Draft Quotation',
      'Quotation Under Preparation',
      'Returned for Modification',
      'Quotation Approved',
      'Quotation Sent',
    ].includes(q.status);
  }

  save(): void {
    if (!this.selected) return;
    if (!this.form.scope?.trim()) {
      this.error = 'Quotation scope is required.';
      return;
    }
    if (!(+this.form.professionalFees > 0)) {
      this.error = 'Professional fees must be greater than zero before saving the quotation.';
      return;
    }
    this.saving = true;
    this.clearMessage();
    this.api
      .updateQuotation(this.selected.quotationId, {
        scope: this.form.scope,
        consultingDays: this.form.consultingDays || null,
        numberOfParticipants: this.form.numberOfParticipants || null,
        professionalFees: +this.form.professionalFees || 0,
        travelAccommodation: +this.form.travelAccommodation || 0,
        taxPercent: +this.form.taxPercent || 18,
        paymentTerms: this.form.paymentTerms,
        validityDays: +this.form.validityDays || 30,
        specialConditions: this.form.specialConditions,
        customerSpecificChanges: this.form.customerSpecificChanges,
      })
      .subscribe({
        next: (q) => {
          this.selected = q;
          this.form = { ...q };
          this.success = 'Quotation draft saved.';
          this.refresh();
        },
        error: (e) => {
          this.error = e?.error?.message || 'Unable to save quotation.';
          this.saving = false;
        },
        complete: () => (this.saving = false),
      });
  }

  submit(q: PmQuotation): void {
    if (!(+this.form.professionalFees > 0) || !(q.totalAmount > 0)) {
      this.error = 'Enter and save professional fees greater than zero before submitting for approval.';
      return;
    }
    this.submitConfirmation = q;
  }

  async confirmSubmit(): Promise<void> {
    const q = this.submitConfirmation;
    if (!q) return;
    this.submitConfirmation = undefined;
    this.clearMessage();
    try {
      await this.prepareBrandedPdf(q, false);
      this.api.submitQuotation(q.quotationId).subscribe({
        next: () => {
          this.success = 'Quotation submitted for approval with branded PDF preview.';
          this.refresh();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to submit quotation.'),
      });
    } catch (e: any) {
      this.error = e?.message || 'Unable to prepare quotation PDF before approval.';
    }
  }

  decide(q: PmQuotation, action: 'Approve' | 'Reject' | 'Return'): void {
    const remark = action === 'Approve' ? '' : (window.prompt(`${action} remark:`, '') || '').trim();
    if (action !== 'Approve' && !remark) return;
    this.clearMessage();
    this.api.decideQuotation(q.quotationId, action, remark, false, this.sendForm.followUpDays).subscribe({
      next: () => {
        this.success = `Quotation ${action.toLowerCase()} completed.`;
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to save quotation decision.'),
    });
  }

  async send(q: PmQuotation): Promise<void> {
    this.clearMessage();
    try {
      await this.prepareBrandedPdf(q, false);
      this.api
        .sendQuotation(q.quotationId, Math.max(1, +this.sendForm.followUpDays || 2), this.sendForm.cc || '')
        .subscribe({
          next: () => {
            this.success = 'Branded quotation PDF sent and follow-up scheduled.';
            this.refresh();
          },
          error: (e) => (this.error = e?.error?.message || 'Unable to send quotation.'),
        });
    } catch (e: any) {
      this.error = e?.message || 'Unable to prepare quotation PDF.';
    }
  }

  async download(q: PmQuotation): Promise<void> {
    this.clearMessage();
    try {
      await this.prepareBrandedPdf(q, true);
    } catch (e: any) {
      this.error = e?.message || 'Unable to prepare quotation PDF.';
    }
  }

  private async prepareBrandedPdf(q: PmQuotation, download: boolean): Promise<void> {
    if (!this.lookups) throw new Error('Quotation lookups are still loading. Please try again.');
    this.preparingPdf = true;
    try {
      const canUseForm =
        this.selected?.quotationId === q.quotationId &&
        ['Draft Quotation', 'Quotation Under Preparation', 'Returned for Modification'].includes(q.status);
      const current = canUseForm ? { ...q, ...this.form } : q;
      const bytes = await this.quotationPdf.build(current, this.lookups.clients || []);
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const fileName = `QLSS_Quotation_${q.quotationNo}_V${q.versionNo}.pdf`;
      const file = new File([blob], fileName, { type: 'application/pdf' });
      await this.api.uploadGeneratedQuotationPdf(q.quotationId, file).toPromise();
      if (download) this.saveBlob(blob, fileName);
    } finally {
      this.preparingPdf = false;
    }
  }

  loadFollowUps(quotationId: number): void {
    this.api.followUps(quotationId).subscribe({
      next: (v) => (this.followUps = v),
      error: () => (this.followUps = []),
    });
  }

  scheduleFollowUp(): void {
    if (!this.selected) return;
    this.clearMessage();
    this.api
      .createFollowUp(
        this.selected.quotationId,
        Math.max(1, +this.followUpForm.daysFromNow || 2),
        this.followUpForm.notes,
      )
      .subscribe({
        next: () => {
          this.success = 'Follow-up scheduled.';
          this.followUpForm.notes = '';
          this.loadFollowUps(this.selected!.quotationId);
          this.refresh();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to schedule follow-up.'),
      });
  }

  sendFollowUp(item?: PmFollowUp): void {
    if (!this.selected) return;
    this.clearMessage();
    this.api
      .sendFollowUp(this.selected.quotationId, item?.followUpId, this.followUpForm.notes, this.followUpForm.cc)
      .subscribe({
        next: () => {
          this.success = 'Follow-up email sent.';
          this.loadFollowUps(this.selected!.quotationId);
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to send follow-up.'),
      });
  }

  completeFollowUp(item: PmFollowUp): void {
    this.api.completeFollowUp(item.followUpId, this.followUpForm.notes).subscribe({
      next: () => {
        this.success = 'Follow-up marked completed.';
        this.loadFollowUps(this.selected!.quotationId);
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to complete follow-up.'),
    });
  }

  setOutcome(status: string): void {
    if (!this.selected || !status) return;
    const remark = window.prompt(`Remark for "${status}":`, '') || '';
    this.api.updateEnquiryStatus(this.selected.enquiryId, status, remark).subscribe({
      next: () => {
        this.success = `Enquiry status changed to ${status}.`;
        this.refresh();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to update enquiry outcome.'),
    });
  }

  toggleMember(userId: number, checked: boolean): void {
    const ids: number[] = [...(this.projectForm.memberUserIds || [])];
    if (checked && !ids.includes(userId)) ids.push(userId);
    if (!checked) this.projectForm.memberUserIds = ids.filter((x) => x !== userId);
    else this.projectForm.memberUserIds = ids;
  }

  memberSelected(userId: number): boolean {
    return (this.projectForm.memberUserIds || []).includes(userId);
  }

  confirmProject(q: PmQuotation): void {
    if (!this.isSuperAdmin) return;
    const leaderId = this.projectForm.projectLeaderUserId ? +this.projectForm.projectLeaderUserId : null;
    const memberIds = [
      ...new Set<number>([...(this.projectForm.memberUserIds || []), ...(leaderId ? [leaderId] : [])]),
    ];
    this.clearMessage();
    this.api
      .createProject(q.quotationId, {
        projectTemplateId: this.projectForm.projectTemplateId || null,
        projectLeaderUserId: leaderId,
        memberUserIds: memberIds,
        projectStartDate: this.projectForm.projectStartDate || null,
        targetCompletionDate: this.projectForm.targetCompletionDate || null,
        projectLocation: this.projectForm.projectLocation || '',
        poWoReference: this.projectForm.poWoReference || '',
      })
      .subscribe({
        next: (p) => {
          localStorage.removeItem(this.projectDraftKey(q.quotationId));
          this.success = `Project ${p.projectNo} created successfully.`;
          this.activePanel = 'details';
          this.router.navigate(['/workspace/projects'], { queryParams: { projectId: p.projectId } });
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to confirm project.'),
      });
  }

  projectTemplateChanged(value: number | null): void {
    this.projectForm.projectTemplateId = value;
    this.saveProjectDraft();
  }

  saveProjectDraft(): void {
    if (!this.selected) return;
    localStorage.setItem(this.projectDraftKey(this.selected.quotationId), JSON.stringify(this.projectForm));
  }

  loadEmailLogs(id: number): void {
    this.api.emailLogs('Quotation', id).subscribe({
      next: (v) => (this.emailLogs = v),
      error: () => (this.emailLogs = []),
    });
  }

  loadApprovalHistory(id: number): void {
    this.api.approvalHistory(id).subscribe({
      next: (v) => (this.approvalHistory = v),
      error: () => (this.approvalHistory = []),
    });
  }

  loadAttachments(id: number): void {
    this.api.attachments('Quotation', id).subscribe({
      next: (v) => (this.attachments = v),
      error: () => (this.attachments = []),
    });
  }

  upload(event: Event): void {
    if (!this.selected) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.api.uploadAttachment('Quotation', this.selected.quotationId, file).subscribe({
      next: () => {
        this.success = 'Quotation attachment uploaded.';
        this.loadAttachments(this.selected!.quotationId);
        input.value = '';
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to upload attachment.'),
    });
  }

  downloadAttachment(file: PmAttachment): void {
    this.api.attachmentFile(file.attachmentId).subscribe({
      next: (blob) => this.saveBlob(blob, file.originalFileName),
    });
  }

  money(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  badge(status: string): string {
    const s = (status || '').toLowerCase();
    if (s.includes('approved') || s.includes('sent')) return 'pm-badge pm-badge--ok';
    if (s.includes('pending') || s.includes('preparation') || s.includes('draft') || s.includes('returned'))
      return 'pm-badge pm-badge--warn';
    if (s.includes('reject') || s.includes('lost') || s.includes('not received')) return 'pm-badge pm-badge--danger';
    return 'pm-badge';
  }

  private clearMessage(): void {
    this.error = '';
    this.success = '';
  }
  private projectDraftKey(quotationId: number): string {
    return `pm-project-conversion-${quotationId}`;
  }
  private restoreProjectDraft(quotationId: number): void {
    const empty = {
      projectTemplateId: null,
      projectLeaderUserId: null,
      memberUserIds: [],
      projectStartDate: '',
      targetCompletionDate: '',
      projectLocation: '',
      poWoReference: '',
    };
    try {
      const saved = JSON.parse(localStorage.getItem(this.projectDraftKey(quotationId)) || 'null');
      this.projectForm = saved ? { ...empty, ...saved } : empty;
      this.ensureDefaultProjectTemplate();
    } catch {
      this.projectForm = empty;
      this.ensureDefaultProjectTemplate();
    }
  }
  private ensureDefaultProjectTemplate(): void {
    if (!this.selected || this.projectForm.projectTemplateId || !this.projectTemplates.length) return;
    const quotationCategoryId =
      this.selected.categoryId ||
      this.lookups?.categories.find(
        (category) => category.name.trim().toLowerCase() === this.selected?.serviceType.trim().toLowerCase(),
      )?.id;
    if (!quotationCategoryId) return;
    const match = this.projectTemplates.find(
      (template) => template.isActive && +template.categoryId! === +quotationCategoryId,
    );
    if (match) {
      this.projectForm.projectTemplateId = match.projectTemplateId;
      this.saveProjectDraft();
    }
  }
  private saveBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
