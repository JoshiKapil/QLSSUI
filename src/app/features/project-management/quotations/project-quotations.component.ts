import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { PmAttachment, PmEmailLog, PmFollowUp, PmLookups, PmProjectTemplate, PmQuotation, PmQuotationApprovalHistory } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-quotations',
  templateUrl: './project-quotations.component.html',
  styleUrls: ['./project-quotations.component.scss']
})
export class ProjectQuotationsComponent implements OnInit {
  items: PmQuotation[] = [];
  selected?: PmQuotation;
  followUps: PmFollowUp[] = [];
  attachments: PmAttachment[] = [];
  emailLogs: PmEmailLog[] = [];
  approvalHistory: PmQuotationApprovalHistory[] = [];
  lookups?: PmLookups;
  projectTemplates: PmProjectTemplate[] = [];

  search = '';
  statusFilter = '';
  error = '';
  success = '';
  saving = false;
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
    poWoReference: ''
  };

  constructor(private api: ProjectManagementService, public auth: AuthService) {}

  ngOnInit(): void {
    this.refresh();
    this.api.lookups().subscribe({ next: v => this.lookups = v });
    this.api.projectTemplates().subscribe({ next: v => this.projectTemplates = v });
  }

  get role(): string { return this.auth.getCurrentUser()?.role || ''; }
  get isSuperAdmin(): boolean { return this.role.toLowerCase() === 'superadmin'; }
  get canManage(): boolean { return ['superadmin', 'admin', 'manager'].includes(this.role.toLowerCase()); }

  get filteredItems(): PmQuotation[] {
    const q = this.search.trim().toLowerCase();
    return this.items.filter(x =>
      (!this.statusFilter || x.status === this.statusFilter) &&
      (!q || `${x.quotationNo} ${x.customerName} ${x.serviceType} ${x.status}`.toLowerCase().includes(q))
    );
  }

  get statuses(): string[] {
    return [...new Set(this.items.map(x => x.status).filter(Boolean))].sort();
  }

  countStatus(status: string): number {
    return this.items.filter(x => x.status === status).length;
  }

  refresh(): void {
    this.error = '';
    this.api.quotations().subscribe({
      next: v => {
        this.items = v;
        if (this.selected) {
          const current = v.find(x => x.quotationId === this.selected?.quotationId);
          if (current) this.open(current, false);
        }
      },
      error: e => this.error = e?.error?.message || 'Unable to load quotations.'
    });
  }

  open(q: PmQuotation, resetPanel = true): void {
    this.selected = q;
    this.form = { ...q };
    this.sendForm.followUpDays = 2;
    if (resetPanel) this.activePanel = 'details';
    this.loadFollowUps(q.quotationId);
    this.loadAttachments(q.quotationId);
    this.loadEmailLogs(q.quotationId);
    this.loadApprovalHistory(q.quotationId);
  }

  editable(q: PmQuotation): boolean {
    return ['Draft Quotation', 'Quotation Under Preparation', 'Returned for Modification'].includes(q.status);
  }

  save(): void {
    if (!this.selected) return;
    this.saving = true;
    this.clearMessage();
    this.api.updateQuotation(this.selected.quotationId, {
      scope: this.form.scope,
      consultingDays: this.form.consultingDays || null,
      numberOfParticipants: this.form.numberOfParticipants || null,
      professionalFees: +this.form.professionalFees || 0,
      travelAccommodation: +this.form.travelAccommodation || 0,
      taxPercent: +this.form.taxPercent || 18,
      paymentTerms: this.form.paymentTerms,
      validityDays: +this.form.validityDays || 30,
      specialConditions: this.form.specialConditions,
      customerSpecificChanges: this.form.customerSpecificChanges
    }).subscribe({
      next: q => {
        this.selected = q;
        this.form = { ...q };
        this.success = 'Quotation draft saved.';
        this.refresh();
      },
      error: e => { this.error = e?.error?.message || 'Unable to save quotation.'; this.saving = false; },
      complete: () => this.saving = false
    });
  }

  submit(q: PmQuotation): void {
    if (!confirm(`Submit ${q.quotationNo} to SuperAdmin for approval?`)) return;
    this.clearMessage();
    this.api.submitQuotation(q.quotationId).subscribe({
      next: () => { this.success = 'Quotation submitted for approval.'; this.refresh(); },
      error: e => this.error = e?.error?.message || 'Unable to submit quotation.'
    });
  }

  decide(q: PmQuotation, action: 'Approve' | 'Reject' | 'Return'): void {
    const remark = action === 'Approve' ? '' : (window.prompt(`${action} remark:`, '') || '').trim();
    if (action !== 'Approve' && !remark) return;
    const sendAfterApproval = action === 'Approve';
    this.clearMessage();
    this.api.decideQuotation(q.quotationId, action, remark, sendAfterApproval, this.sendForm.followUpDays).subscribe({
      next: () => { this.success = `Quotation ${action.toLowerCase()} completed.`; this.refresh(); },
      error: e => this.error = e?.error?.message || 'Unable to save quotation decision.'
    });
  }

  send(q: PmQuotation): void {
    this.clearMessage();
    this.api.sendQuotation(q.quotationId, Math.max(1, +this.sendForm.followUpDays || 2), this.sendForm.cc || '').subscribe({
      next: () => { this.success = 'Approved quotation sent and follow-up scheduled.'; this.refresh(); },
      error: e => this.error = e?.error?.message || 'Unable to send quotation.'
    });
  }

  download(q: PmQuotation): void {
    this.api.quotationPdf(q.quotationId).subscribe({
      next: blob => this.saveBlob(blob, `Quotation_${q.quotationNo}_V${q.versionNo}.pdf`),
      error: e => this.error = e?.error?.message || 'Unable to download quotation PDF.'
    });
  }

  loadFollowUps(quotationId: number): void {
    this.api.followUps(quotationId).subscribe({ next: v => this.followUps = v, error: () => this.followUps = [] });
  }

  scheduleFollowUp(): void {
    if (!this.selected) return;
    this.clearMessage();
    this.api.createFollowUp(this.selected.quotationId, Math.max(1, +this.followUpForm.daysFromNow || 2), this.followUpForm.notes).subscribe({
      next: () => {
        this.success = 'Follow-up scheduled.';
        this.followUpForm.notes = '';
        this.loadFollowUps(this.selected!.quotationId);
        this.refresh();
      },
      error: e => this.error = e?.error?.message || 'Unable to schedule follow-up.'
    });
  }

  sendFollowUp(item?: PmFollowUp): void {
    if (!this.selected) return;
    this.clearMessage();
    this.api.sendFollowUp(this.selected.quotationId, item?.followUpId, this.followUpForm.notes, this.followUpForm.cc).subscribe({
      next: () => { this.success = 'Follow-up email sent.'; this.loadFollowUps(this.selected!.quotationId); },
      error: e => this.error = e?.error?.message || 'Unable to send follow-up.'
    });
  }

  completeFollowUp(item: PmFollowUp): void {
    this.api.completeFollowUp(item.followUpId, this.followUpForm.notes).subscribe({
      next: () => { this.success = 'Follow-up marked completed.'; this.loadFollowUps(this.selected!.quotationId); },
      error: e => this.error = e?.error?.message || 'Unable to complete follow-up.'
    });
  }

  setOutcome(status: string): void {
    if (!this.selected || !status) return;
    const remark = window.prompt(`Remark for "${status}":`, '') || '';
    this.api.updateEnquiryStatus(this.selected.enquiryId, status, remark).subscribe({
      next: () => { this.success = `Enquiry status changed to ${status}.`; this.refresh(); },
      error: e => this.error = e?.error?.message || 'Unable to update enquiry outcome.'
    });
  }

  toggleMember(userId: number, checked: boolean): void {
    const ids: number[] = [...(this.projectForm.memberUserIds || [])];
    if (checked && !ids.includes(userId)) ids.push(userId);
    if (!checked) this.projectForm.memberUserIds = ids.filter(x => x !== userId);
    else this.projectForm.memberUserIds = ids;
  }

  memberSelected(userId: number): boolean {
    return (this.projectForm.memberUserIds || []).includes(userId);
  }

  confirmProject(q: PmQuotation): void {
    if (!this.isSuperAdmin) return;
    const leaderId = this.projectForm.projectLeaderUserId ? +this.projectForm.projectLeaderUserId : null;
    const memberIds = [...new Set<number>([...(this.projectForm.memberUserIds || []), ...(leaderId ? [leaderId] : [])])];
    this.clearMessage();
    this.api.createProject(q.quotationId, {
      projectTemplateId: this.projectForm.projectTemplateId || null,
      projectLeaderUserId: leaderId,
      memberUserIds: memberIds,
      projectStartDate: this.projectForm.projectStartDate || null,
      targetCompletionDate: this.projectForm.targetCompletionDate || null,
      projectLocation: this.projectForm.projectLocation || '',
      poWoReference: this.projectForm.poWoReference || ''
    }).subscribe({
      next: p => {
        this.success = `Project ${p.projectNo} created successfully.`;
        this.activePanel = 'details';
        this.refresh();
      },
      error: e => this.error = e?.error?.message || 'Unable to confirm project.'
    });
  }

  loadEmailLogs(id: number): void {
    this.api.emailLogs('Quotation', id).subscribe({ next: v => this.emailLogs = v, error: () => this.emailLogs = [] });
  }

  loadApprovalHistory(id: number): void {
    this.api.approvalHistory(id).subscribe({ next: v => this.approvalHistory = v, error: () => this.approvalHistory = [] });
  }

  loadAttachments(id: number): void {
    this.api.attachments('Quotation', id).subscribe({ next: v => this.attachments = v, error: () => this.attachments = [] });
  }

  upload(event: Event): void {
    if (!this.selected) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.api.uploadAttachment('Quotation', this.selected.quotationId, file).subscribe({
      next: () => { this.success = 'Quotation attachment uploaded.'; this.loadAttachments(this.selected!.quotationId); input.value = ''; },
      error: e => this.error = e?.error?.message || 'Unable to upload attachment.'
    });
  }

  downloadAttachment(file: PmAttachment): void {
    this.api.attachmentFile(file.attachmentId).subscribe({ next: blob => this.saveBlob(blob, file.originalFileName) });
  }

  money(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0);
  }

  badge(status: string): string {
    const s = (status || '').toLowerCase();
    if (s.includes('approved') || s.includes('sent')) return 'pm-badge pm-badge--ok';
    if (s.includes('pending') || s.includes('preparation') || s.includes('draft') || s.includes('returned')) return 'pm-badge pm-badge--warn';
    if (s.includes('reject') || s.includes('lost') || s.includes('not received')) return 'pm-badge pm-badge--danger';
    return 'pm-badge';
  }

  private clearMessage(): void { this.error = ''; this.success = ''; }
  private saveBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
