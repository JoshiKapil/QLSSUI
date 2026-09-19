import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { PmProject, PmQuotation } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-approvals',
  templateUrl: './project-approvals.component.html',
  styleUrls: ['./project-approvals.component.scss'],
})
export class ProjectApprovalsComponent implements OnInit {
  readonly quotationsPage = new ListPage('Quotations');
  reloadquotationsPage(): void { this.load(); }
  readonly projectsPage = new ListPage('Projects');
  reloadprojectsPage(): void { this.load(); }

  quotations: PmQuotation[] = [];
  projects: PmProject[] = [];
  error = '';
  success = '';
  followUpDays = 2;

  quotationDecisionModal: {
    open: boolean;
    quotation?: PmQuotation;
    action: 'Approve' | 'Reject' | 'Return';
    remark: string;
  } = { open: false, action: 'Approve', remark: '' };

  closureDecisionModal: {
    open: boolean;
    project?: PmProject;
    action: 'Approve' | 'Return';
    remark: string;
  } = { open: false, action: 'Approve', remark: '' };

  constructor(
    private api: ProjectManagementService,
    public auth: AuthService,
  ) {}
  ngOnInit(): void {
    this.load();
  }
  get isSuperAdmin(): boolean {
    return (this.auth.getCurrentUser()?.role || '').toLowerCase() === 'superadmin';
  }
  get pendingQuotations(): PmQuotation[] {
    return this.quotations.filter((x) => x.status === 'Approval Pending');
  }
  get closureProjects(): PmProject[] {
    return this.projects.filter((x) => x.status === 'Closure Pending');
  }
  load(): void {
    this.quotationsPage.filters = { Status: 'Approval Pending' };
    this.projectsPage.filters = { Status: 'Closure Pending' };
    this.api.quotations(this.quotationsPage).subscribe({
      next: (v) => (this.quotations = v),
      error: (e) => (this.error = e?.error?.message || 'Unable to load quotation approvals.'),
    });
    this.api.projects(this.projectsPage).subscribe({
      next: (v) => (this.projects = v),
      error: (e) => (this.error = e?.error?.message || 'Unable to load closure approvals.'),
    });
  }
  decideQuotation(q: PmQuotation, action: 'Approve' | 'Reject' | 'Return'): void {
    if (action === 'Approve') {
      this.error = '';
      this.success = '';
      this.api.decideQuotation(q.quotationId, action, '', false, Math.max(1, +this.followUpDays || 2)).subscribe({
        next: () => {
          this.success = `${q.quotationNo}: Approve completed.`;
          this.load();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to process quotation approval.'),
      });
      return;
    }
    this.quotationDecisionModal = {
      open: true,
      quotation: q,
      action,
      remark: '',
    };
  }

  confirmQuotationDecision(): void {
    if (!this.quotationDecisionModal.quotation) return;
    const { quotation, action, remark } = this.quotationDecisionModal;
    if (action !== 'Approve' && !remark.trim()) {
      this.error = `Please enter a remark for ${action}.`;
      return;
    }
    this.error = '';
    this.success = '';
    this.api.decideQuotation(quotation.quotationId, action, remark.trim(), false, Math.max(1, +this.followUpDays || 2)).subscribe({
      next: () => {
        this.success = `${quotation.quotationNo}: ${action} completed.`;
        this.quotationDecisionModal.open = false;
        this.load();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to process quotation approval.'),
    });
  }

  closeQuotationDecisionModal(): void {
    this.quotationDecisionModal.open = false;
  }

  decideClosure(p: PmProject, action: 'Approve' | 'Return'): void {
    if (action === 'Approve') {
      this.error = '';
      this.success = '';
      this.api.decideClosure(p.projectId, action, '', true).subscribe({
        next: () => {
          this.success = `${p.projectNo}: closure approve processed.`;
          this.load();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to process closure approval.'),
      });
      return;
    }
    this.closureDecisionModal = {
      open: true,
      project: p,
      action,
      remark: '',
    };
  }

  confirmClosureDecision(): void {
    if (!this.closureDecisionModal.project) return;
    const { project, action, remark } = this.closureDecisionModal;
    if (action === 'Return' && !remark.trim()) {
      this.error = 'Please enter a pending activity or return remark.';
      return;
    }
    this.error = '';
    this.success = '';
    this.api.decideClosure(project.projectId, action, remark.trim(), true).subscribe({
      next: () => {
        this.success = `${project.projectNo}: closure ${action.toLowerCase()} processed.`;
        this.closureDecisionModal.open = false;
        this.load();
      },
      error: (e) => (this.error = e?.error?.message || 'Unable to process closure approval.'),
    });
  }

  closeClosureDecisionModal(): void {
    this.closureDecisionModal.open = false;
  }
  download(q: PmQuotation): void {
    this.api.quotationPdf(q.quotationId).subscribe((blob) => {
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = u;
      a.download = `Quotation_${q.quotationNo}_V${q.versionNo}.pdf`;
      a.click();
      URL.revokeObjectURL(u);
    });
  }
}
