import { ListPage } from '../../../shared/list-page';
import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NotifierService } from '../../../core/services/notifier.service';
import { ZeissBilling, ZeissInvoice, ZeissLifecycle } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';

@Component({
  selector: 'app-zeiss-invoices',
  templateUrl: './zeiss-invoices.component.html',
  styleUrls: ['./zeiss-invoices.component.scss'],
})
export class ZeissInvoicesComponent implements OnInit {
  readonly lifecyclesPage = new ListPage('Sales');
  reloadlifecyclesPage(): void { this.loadSales(); }

  saving = false;

  sales: ZeissLifecycle[] = [];
  selected?: ZeissLifecycle;
  billing?: ZeissBilling;
  invoices: ZeissInvoice[] = [];
  search = '';
  private selectionVersion = 0;
  sendInvoice?: ZeissInvoice;
  sendForm = { to: '', cc: '', subject: '', message: '' };
  form = { customerAddress: '', clientGstin: '', hsnCode: '9027', taxMode: 'INTRA_STATE', taxPercent: 18 };

  constructor(
    private readonly api: ZeissManagementService,
    private readonly notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  get filteredSales(): ZeissLifecycle[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.sales;
    return this.sales.filter((x) =>
      `${x.enquiryNo} ${x.quotationNo} ${x.customerName} ${x.clientPoNo} ${x.currentStage}`.toLowerCase().includes(q),
    );
  }

  get pi(): ZeissInvoice | undefined {
    return this.invoices.find((x) => x.documentType === 'PI');
  }

  get ti(): ZeissInvoice | undefined {
    return this.invoices.find((x) => x.documentType === 'TI');
  }

  get canGeneratePi(): boolean {
    return !!this.billing && !!this.selected?.vendorCode && !!this.selected?.clientPoNo && !this.pi;
  }

  get canGenerateTi(): boolean {
    return !!this.pi && !!this.selected?.acknowledgementReceived && !this.ti;
  }

  loadSales(): void {
    this.api.lifecycles(this.lifecyclesPage).subscribe({
      next: (rows) => {
        this.sales = rows;
        const currentId = this.selected?.lifecycleId;
        const next = rows.find((x) => x.lifecycleId === currentId) || rows[0];
        if (next) this.select(next);
        else {
          this.selected = undefined;
          this.billing = undefined;
          this.invoices = [];
        }
      },
      error: (e) => this.fail(e),
    });
  }

  select(row: ZeissLifecycle): void {
    const version = ++this.selectionVersion;
    this.selected = row;
    this.billing = undefined;
    this.invoices = [];
    forkJoin({
      billing: this.api.billing(row.lifecycleId),
      invoices: this.api.invoices(row.lifecycleId),
    }).subscribe({
      next: (data) => {
        if (version !== this.selectionVersion) return;
        this.billing = data.billing;
        this.invoices = data.invoices || [];
        this.form = {
          customerAddress: data.billing.customerAddress || '',
          clientGstin: data.billing.clientGstin || '',
          hsnCode: data.billing.hsnCode || '9027',
          taxMode: data.billing.taxMode || 'INTRA_STATE',
          taxPercent: Number(data.billing.taxPercent ?? 18),
        };
      },
      error: (e) => this.fail(e),
    });
  }

  saveBilling(): void {
    if (!this.selected || !this.billing || this.billing.isLocked) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .saveBilling(this.selected.lifecycleId, this.form)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (x) => {
          this.billing = x;
          this.notifier.successToastr('Billing details saved. You can now generate the PI.', 'Zeiss Billing');
        },
        error: (e) => this.fail(e),
      });
  }

  generatePi(): void {
    if (!this.selected || !this.canGeneratePi) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .createPi(this.selected.lifecycleId)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (invoice) => {
          this.notifier.successToastr('Proforma Invoice generated. Preview it before sending.', 'Zeiss Billing');
          this.refreshSelected(invoice);
        },
        error: (e) => this.fail(e),
      });
  }

  generateTi(): void {
    if (!this.selected || !this.canGenerateTi) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .createTi(this.selected.lifecycleId)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (invoice) => {
          this.notifier.successToastr('Tax Invoice generated after client acknowledgement.', 'Zeiss Billing');
          this.refreshSelected(invoice);
        },
        error: (e) => this.fail(e),
      });
  }

  viewPdf(invoice: ZeissInvoice): void {
    this.api.invoicePdf(invoice.invoiceId).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener');
        window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      },
      error: (e) => this.fail(e),
    });
  }

  downloadPdf(invoice: ZeissInvoice): void {
    this.api.invoicePdf(invoice.invoiceId).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Zeiss_${invoice.documentType}_${invoice.invoiceNo}_${invoice.enquiryNo}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (e) => this.fail(e),
    });
  }

  closeSale(): void {
    if (!this.selected || !this.ti || this.ti.status !== 'Sent') return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .closeSale(this.selected.lifecycleId)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.notifier.successToastr('Zeiss sale closed after final Tax Invoice was sent.', 'Zeiss Billing');
          this.loadSales();
        },
        error: (e) => this.fail(e),
      });
  }

  openSend(invoice: ZeissInvoice): void {
    this.sendInvoice = invoice;
    const title = invoice.documentType === 'PI' ? 'Proforma Invoice' : 'Tax Invoice';
    this.sendForm = {
      to: invoice.customerEmail || this.selected?.customerEmail || '',
      cc: '',
      subject: `QLSS Zeiss ${title} - ${invoice.invoiceNo} - ${invoice.enquiryNo}`,
      message: `Dear Customer,\n\nPlease find attached Zeiss ${title} ${invoice.invoiceNo} against quotation ${invoice.quotationNo}.\nClient PO: ${invoice.clientPoNo || '-'}\n\nRegards,\nTeam QLSS`,
    };
  }

  sendCurrent(): void {
    if (!this.sendInvoice || !this.sendForm.to.trim()) return;
    const invoice = this.sendInvoice;
    if (this.saving) return;
    this.saving = true;
    this.api
      .sendInvoice(invoice.invoiceId, this.sendForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.sendInvoice = undefined;
          this.notifier.successToastr('Document sent successfully to client.', 'Zeiss Billing');
          this.loadSales();
        },
        error: (e) => this.fail(e),
      });
  }

  private refreshSelected(invoice?: ZeissInvoice): void {
    if (!this.selected) return;
    const id = this.selected.lifecycleId;
    const version = this.selectionVersion;
    forkJoin({
      sale: this.api.lifecycle(id),
      billing: this.api.billing(id),
      invoices: this.api.invoices(id),
    }).subscribe({
      next: (data) => {
        if (version !== this.selectionVersion || this.selected?.lifecycleId !== id) return;
        this.selected = data.sale;
        this.billing = data.billing;
        this.invoices = data.invoices || [];
        if (invoice) this.openSend(data.invoices.find((x) => x.invoiceId === invoice.invoiceId) || invoice);
      },
      error: (e) => this.fail(e),
    });
  }

  private fail(e: any): void {
    this.notifier.warningToastr(e?.error?.message || e?.error?.errors?.[0] || 'Action failed.', 'Zeiss Billing');
  }
}
