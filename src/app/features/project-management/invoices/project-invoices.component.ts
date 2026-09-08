import { ListPage } from '../../../shared/list-page';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { PmProject, PmProjectBilling, PmProjectInvoice } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-invoices',
  templateUrl: './project-invoices.component.html',
  styleUrls: ['./project-invoices.component.scss'],
})
export class ProjectInvoicesComponent implements OnInit, OnChanges {
  readonly projectsPage = new ListPage('Projects');
  reloadprojectsPage(): void { this.ngOnInit(); }

  @Input() embedded = false;
  @Input() embeddedProjectId?: number;

  projects: PmProject[] = [];
  selectedProject?: PmProject;
  billing?: PmProjectBilling;
  invoices: PmProjectInvoice[] = [];
  busy = false;
  message = '';
  error = '';
  projectSearch = '';
  projectStatus = 'ALL';

  sendDialogInvoice?: PmProjectInvoice;
  sendForm = { to: '', cc: '', subject: '', message: '' };

  form = {
    paymentPlan: 'FULL' as 'FULL' | 'SPLIT_50_50',
    clientGstin: '',
    hsnCode: '998312',
    taxMode: 'INTRA_STATE' as 'INTRA_STATE' | 'INTER_STATE',
    taxPercent: 18,
    serviceDate: '',
  };

  constructor(
    private readonly api: ProjectManagementService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.embedded && this.embeddedProjectId) {
      this.loadProjectById(this.embeddedProjectId);
      return;
    }

    this.busy = true;
    this.api
      .projects(this.projectsPage)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: (projects) => {
          this.projects = projects;
          const requestedId = Number(this.route.snapshot.queryParamMap.get('projectId') || 0);
          const requested = requestedId ? projects.find((x) => x.projectId === requestedId) : undefined;
          const first = requested || projects.find((x) => x.status !== 'PROJECT CLOSED') || projects[0];
          if (first) this.selectProject(first);
        },
        error: (e) => this.fail(e),
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['embeddedProjectId'] &&
      !changes['embeddedProjectId'].firstChange &&
      this.embedded &&
      this.embeddedProjectId
    ) {
      this.loadProjectById(this.embeddedProjectId);
    }
  }

  get filteredProjects(): PmProject[] {
    const q = this.projectSearch.trim().toLowerCase();
    return this.projects.filter((p) => {
      const searchOk = !q || `${p.projectNo} ${p.customerName} ${p.projectTitle}`.toLowerCase().includes(q);
      const statusOk = this.projectStatus === 'ALL' || p.status === this.projectStatus;
      return searchOk && statusOk;
    });
  }

  get statusOptions(): string[] {
    return Array.from(new Set(this.projects.map((x) => x.status).filter(Boolean))).sort();
  }

  selectProject(project: PmProject): void {
    if (this.selectedProject?.projectId === project.projectId && this.billing) return;
    this.selectedProject = project;
    this.clearStatus();
    this.loadSelected();
  }

  loadSelected(): void {
    const projectId = this.selectedProject?.projectId || this.embeddedProjectId;
    if (!projectId) return;
    this.busy = true;
    forkJoin({
      billing: this.api.projectBilling(projectId),
      invoices: this.api.projectInvoices(projectId),
    })
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: (data) => {
          this.billing = data.billing;
          this.invoices = data.invoices || [];
          this.form = {
            paymentPlan: data.billing.paymentPlan,
            clientGstin: data.billing.clientGstin || '',
            hsnCode: data.billing.hsnCode || '998312',
            taxMode: data.billing.taxMode,
            taxPercent: data.billing.taxPercent,
            serviceDate: data.billing.serviceDate ? data.billing.serviceDate.substring(0, 10) : '',
          };
        },
        error: (e) => this.fail(e),
      });
  }

  saveBilling(): void {
    const projectId = this.projectId;
    if (!projectId || this.billing?.isLocked) return;
    this.run(
      this.api.saveProjectBilling(projectId, this.billingPayload()),
      'Billing selection saved. Generate the Proforma only after checking these values.',
    );
  }

  generateProforma(): void {
    const projectId = this.projectId;
    if (!projectId || !this.billing?.poWoReference || this.has('PROFORMA', 1)) return;
    this.clearStatus();
    this.busy = true;
    this.api
      .saveProjectBilling(projectId, this.billingPayload())
      .pipe(
        switchMap(() => this.api.createProformaInvoice(projectId)),
        finalize(() => (this.busy = false)),
      )
      .subscribe({
        next: (invoice) => {
          this.message = 'Proforma Invoice generated. Preview the PDF, then use Send to Client.';
          this.loadSelected();
          this.openSendDialog(invoice, false);
        },
        error: (e) => this.fail(e),
      });
  }

  generateFirstTaxInvoice(): void {
    const projectId = this.projectId;
    if (!projectId || !this.has('PROFORMA', 1) || this.has('TAX', 1)) return;
    this.clearStatus();
    this.busy = true;
    this.api
      .createTaxInvoice(projectId, 1, true)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: (invoice) => {
          this.message = 'Cash receipt recorded and Tax Invoice generated. Preview it before sending.';
          this.loadSelected();
          this.openSendDialog(invoice, false);
        },
        error: (e) => this.fail(e),
      });
  }

  generateRemainingInvoice(): void {
    const projectId = this.projectId;
    if (!projectId || !this.canGenerateRemaining) return;
    this.clearStatus();
    this.busy = true;
    this.api
      .createTaxInvoice(projectId, 2, false)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: (invoice) => {
          this.message = 'Remaining 50% Tax Invoice generated. Preview it before sending.';
          this.loadSelected();
          this.openSendDialog(invoice, false);
        },
        error: (e) => this.fail(e),
      });
  }

  openSendDialog(invoice: PmProjectInvoice, resend = true): void {
    this.sendDialogInvoice = invoice;
    const kind = this.typeName(invoice);
    this.sendForm = {
      to: invoice.customerEmail || this.billing?.customerEmail || '',
      cc: '',
      subject: `QLSS ${kind} - ${invoice.invoiceNo} - ${invoice.projectNo}`,
      message: `Dear ${invoice.customerName || 'Customer'},\n\nPlease find attached QLSS ${kind} ${invoice.invoiceNo} for ${invoice.projectTitle} (${invoice.paymentLabel}).\nPO / WO Ref: ${invoice.poWoReference || '-'}\n\nRegards,\nTeam QLSS`,
    };
    if (resend) this.clearStatus();
  }

  closeSendDialog(): void {
    this.sendDialogInvoice = undefined;
  }

  sendCurrentInvoice(): void {
    if (!this.sendDialogInvoice || !this.sendForm.to.trim()) return;
    const invoice = this.sendDialogInvoice;
    this.busy = true;
    this.clearStatus();
    this.api
      .sendProjectInvoice(invoice.invoiceId, {
        to: this.sendForm.to.trim(),
        cc: this.sendForm.cc.trim(),
        subject: this.sendForm.subject.trim(),
        message: this.sendForm.message.trim(),
      })
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: () => {
          this.sendDialogInvoice = undefined;
          this.message = `${this.typeName(invoice)} sent successfully to ${this.sendForm.to.trim()}.`;
          this.loadSelected();
        },
        error: (e) => this.fail(e),
      });
  }

  viewPdf(invoice?: PmProjectInvoice): void {
    if (!invoice) return;
    this.api.invoicePdf(invoice.invoiceId).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener');
        window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      },
      error: (e) => this.fail(e),
    });
  }

  downloadPdf(invoice: PmProjectInvoice): void {
    this.api.invoicePdf(invoice.invoiceId).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${invoice.documentType === 'PROFORMA' ? 'Proforma_Invoice' : 'Tax_Invoice'}_${invoice.invoiceNo}_${invoice.projectNo}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (e) => this.fail(e),
    });
  }

  has(documentType: 'PROFORMA' | 'TAX', installmentNo: number): boolean {
    return this.invoices.some((x) => x.documentType === documentType && x.installmentNo === installmentNo);
  }

  findInvoice(documentType: 'PROFORMA' | 'TAX', installmentNo: number): PmProjectInvoice | undefined {
    return this.invoices.find((x) => x.documentType === documentType && x.installmentNo === installmentNo);
  }

  get canGenerateRemaining(): boolean {
    return (
      !!this.billing &&
      this.billing.paymentPlan === 'SPLIT_50_50' &&
      this.billing.completionPercent >= 100 &&
      this.has('TAX', 1) &&
      !this.has('TAX', 2)
    );
  }

  get installmentCaption(): string {
    return this.form.paymentPlan === 'SPLIT_50_50' ? '50% Advance + 50% Remaining' : '100% Full Payment';
  }

  get workflowProgress(): number {
    if (!this.billing) return 0;
    const total = this.billing.paymentPlan === 'SPLIT_50_50' ? 4 : 3;
    let done = this.billing.poWoReference ? 1 : 0;
    if (this.has('PROFORMA', 1)) done++;
    if (this.has('TAX', 1)) done++;
    if (this.billing.paymentPlan === 'SPLIT_50_50' && this.has('TAX', 2)) done++;
    return Math.round((done / total) * 100);
  }

  get projectId(): number | undefined {
    return this.selectedProject?.projectId || this.embeddedProjectId;
  }
  amount(invoice: PmProjectInvoice): string {
    return Number(invoice.totalAmount || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  baseAmount(): string {
    return Number(this.billing?.taxableProjectValue || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  typeName(invoice?: PmProjectInvoice): string {
    return invoice?.documentType === 'PROFORMA' ? 'Proforma Invoice' : 'Tax Invoice';
  }
  trackProject(_: number, project: PmProject): number {
    return project.projectId;
  }
  trackInvoice(_: number, invoice: PmProjectInvoice): number {
    return invoice.invoiceId;
  }

  private loadProjectById(projectId: number): void {
    this.selectedProject = this.projects.find((x) => x.projectId === projectId) || ({ projectId } as PmProject);
    this.loadSelected();
  }

  private billingPayload(): any {
    return { ...this.form, serviceDate: this.form.serviceDate || null };
  }

  private run<T>(request: any, success: string): void {
    this.busy = true;
    this.clearStatus();
    request.pipe(finalize(() => (this.busy = false))).subscribe({
      next: () => {
        this.message = success;
        this.loadSelected();
      },
      error: (e: any) => this.fail(e),
    });
  }

  private clearStatus(): void {
    this.message = '';
    this.error = '';
  }
  private fail(error: any): void {
    this.busy = false;
    this.message = '';
    this.error =
      error?.error?.message || error?.error?.title || error?.message || 'Unable to complete the invoice action.';
  }
}
