import { ListPage } from '../../../shared/list-page';
import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { ZeissFollowUp, ZeissInstrument, ZeissQuotation } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';
@Component({
  selector: 'app-zeiss-quotations',
  templateUrl: './zeiss-quotations.component.html',
  styleUrls: ['./zeiss-quotations.component.scss'],
})
export class ZeissQuotationsComponent implements OnInit {
  readonly instrumentsPage = new ListPage('Instrument selection');
  loadInstruments(): void { this.api.instruments(this.instrumentsPage).subscribe({next: rows => this.instruments = rows, error: e => this.err(e)}); }
  readonly quotationsPage = new ListPage('Quotations');
  reloadquotationsPage(): void { this.load(); }

  saving = false;
  private detailVersion = 0;

  rows: ZeissQuotation[] = [];
  selected?: ZeissQuotation;
  instruments: ZeissInstrument[] = [];
  followups: ZeissFollowUp[] = [];
  q = '';
  edit = false;
  send = false;
  confirm = false;
  form: any = {};
  sendForm: any = { to: '', cc: '', subject: '', message: '', followUpDays: 2 };
  confirmForm: any = { confirmedOn: this.today(), vendorCode: '', remarks: '' };
  constructor(
    private api: ZeissManagementService,
    private notify: NotifierService,
    private auth: AuthService,
  ) {}
  ngOnInit() {
    this.loadInstruments();
    this.load();
  }
  get isSuperAdmin() {
    return (this.auth.getCurrentUser()?.role || '').toLowerCase() === 'superadmin';
  }
  get filtered() {
    const x = this.q.toLowerCase().trim();
    return !x
      ? this.rows
      : this.rows.filter((r) =>
          `${r.quotationNo} ${r.enquiryNo} ${r.customerName} ${r.status}`.toLowerCase().includes(x),
        );
  }
  load() {
    this.api.quotations(this.quotationsPage).subscribe({
      next: (x) => {
        this.rows = x;
        const id = this.selected?.quotationId;
        this.select(x.find((r) => r.quotationId === id) || x[0]);
      },
      error: (e) => this.err(e),
    });
  }
  select(x?: ZeissQuotation) {
    const version = ++this.detailVersion;
    this.selected = undefined;
    if (!x) return;
    this.api.quotation(x.quotationId).subscribe({
      next: detail => {
        if (version !== this.detailVersion) return;
        this.selected = detail;
        this.api.followUps(detail.quotationId).subscribe({next: rows => { if(version === this.detailVersion) this.followups = rows; }, error: e => this.err(e)});
      }, error: e => this.err(e)
    });
  }

  openEdit() {
    if (!this.selected) return;
    const x = this.selected;
    this.form = {
      quotationDate: (x.quotationDate || '').slice(0, 10),
      validityDays: x.validityDays,
      discountPercent: x.discountPercent,
      taxPercent: x.taxPercent,
      paymentTerms: x.paymentTerms,
      deliveryTerms: x.deliveryTerms,
      specialConditions: x.specialConditions,
      items: x.items.map((i) => ({ instrumentId: i.instrumentId, quantity: i.quantity, unitPrice: i.unitPrice })),
    };
    this.edit = true;
  }
  addItem() {
    this.form.items.push({ instrumentId: null, quantity: 1, unitPrice: 0 });
  }
  removeItem(i: number) {
    this.form.items.splice(i, 1);
  }
  itemChanged(i: any) {
    const z = this.instruments.find((x) => x.instrumentId === i.instrumentId);
    if (z && !i.unitPrice) i.unitPrice = z.unitPrice;
  }
  saveQuote() {
    if (!this.selected) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .updateQuotation(this.selected.quotationId, this.form)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (x) => {
          this.edit = false;
          this.selected = x;
          this.load();
        },
        error: (e) => this.err(e),
      });
  }
  submit() {
    if (!this.selected) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .submitQuotation(this.selected.quotationId)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (x) => {
          this.selected = x;
          this.load();
        },
        error: (e) => this.err(e),
      });
  }
  decision(action: 'Approve' | 'Reject' | 'Return') {
    if (!this.selected) return;
    const remark = action === 'Approve' ? '' : prompt('Remark');
    if (remark === null) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .decideQuotation(this.selected.quotationId, action, remark)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (x) => {
          this.selected = x;
          this.load();
        },
        error: (e) => this.err(e),
      });
  }
  openSend() {
    if (!this.selected) return;
    this.sendForm = {
      to: this.selected.customerEmail,
      cc: '',
      subject: `QLSS Zeiss Quotation - ${this.selected.quotationNo}`,
      message: `Dear ${this.selected.contactPerson || 'Customer'},\n\nPlease find attached our Zeiss quotation ${this.selected.quotationNo}.\n\nRegards,\nTeam QLSS`,
      followUpDays: 2,
    };
    this.send = true;
  }
  sendMail() {
    if (!this.selected) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .sendQuotation(this.selected.quotationId, this.sendForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.send = false;
          this.load();
        },
        error: (e) => this.err(e),
      });
  }
  viewPdf() {
    if (!this.selected) return;
    this.api
      .quotationPdf(this.selected.quotationId)
      .subscribe({ next: (b) => this.openBlob(b), error: (e) => this.err(e) });
  }
  addFollowUp() {
    if (!this.selected) return;
    const days = Number(prompt('Follow-up after how many days?', '2') || 2);
    const notes = prompt('Follow-up note', 'Quotation follow-up') || '';
    if (this.saving) return;
    this.saving = true;
    this.api
      .addFollowUp(this.selected.quotationId, days, notes)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({ next: () => this.select(this.selected), error: (e) => this.err(e) });
  }
  complete(f: ZeissFollowUp) {
    if (this.saving) return;
    this.saving = true;
    this.api
      .completeFollowUp(f.followUpId, prompt('Completion note', '') || '')
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({ next: () => this.select(this.selected), error: (e) => this.err(e) });
  }
  openConfirm() {
    this.confirmForm = { confirmedOn: this.today(), vendorCode: '', remarks: '' };
    this.confirm = true;
  }
  confirmClient() {
    if (!this.selected) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .confirmQuotation(this.selected.quotationId, this.confirmForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.confirm = false;
          this.load();
          this.notify.successToastr(
            'Sales lifecycle created. Continue Vendor ID, PO, PI, Payment, Delivery and Acknowledgement.',
            'Zeiss Module',
          );
        },
        error: (e) => this.err(e),
      });
  }
  private openBlob(b: Blob) {
    const u = URL.createObjectURL(b);
    window.open(u, '_blank');
    setTimeout(() => URL.revokeObjectURL(u), 60000);
  }
  private today() {
    return new Date().toISOString().slice(0, 10);
  }
  private err(e: any) {
    this.notify.warningToastr(e?.error?.message || 'Action failed.', 'Zeiss Quotation');
  }
}
