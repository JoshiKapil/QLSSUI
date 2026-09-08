import { ListPage } from '../../../shared/list-page';
import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { ZeissCustomer, ZeissEnquiry, ZeissInstrument } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';
@Component({
  selector: 'app-zeiss-enquiries',
  templateUrl: './zeiss-enquiries.component.html',
  styleUrls: ['./zeiss-enquiries.component.scss'],
})
export class ZeissEnquiriesComponent implements OnInit {
  readonly customersPage = new ListPage('Customer selection');
  readonly instrumentsPage = new ListPage('Instrument selection');
  loadCustomers(): void { this.api.customers(this.customersPage).subscribe({next: rows => this.customers = rows, error: e => this.err(e)}); }
  loadInstruments(): void { this.api.instruments(this.instrumentsPage).subscribe({next: rows => this.instruments = rows, error: e => this.err(e)}); }
  readonly enquiriesPage = new ListPage('Enquiries');
  reloadenquiriesPage(): void { this.load(); }

  saving = false;
  private detailVersion = 0;

  rows: ZeissEnquiry[] = [];
  customers: ZeissCustomer[] = [];
  instruments: ZeissInstrument[] = [];
  selected?: ZeissEnquiry;
  q = '';
  show = false;
  editId = 0;
  form: any = { customerId: null, enquiryDate: this.today(), requirement: '', remarks: '', items: [] };
  constructor(
    private api: ZeissManagementService,
    private notify: NotifierService,
  ) {}
  ngOnInit() {
    this.loadCustomers();
    this.loadInstruments();
    this.load();
  }
  get filtered() {
    const x = this.q.toLowerCase().trim();
    return !x
      ? this.rows
      : this.rows.filter((r) =>
          `${r.enquiryNo} ${r.customerName} ${r.status} ${r.requirement}`.toLowerCase().includes(x),
        );
  }
  load() {
    this.api.enquiries(this.enquiriesPage).subscribe({
      next: (x) => {
        this.rows = x;
        this.select(x.find(r => r.enquiryId === this.selected?.enquiryId) || x[0]);
      },
      error: (e) => this.err(e),
    });
  }
  select(x?: ZeissEnquiry) {
    const version = ++this.detailVersion;
    this.selected = undefined;
    if (!x) return;
    this.api.enquiry(x.enquiryId).subscribe({
      next: detail => {
        if (version !== this.detailVersion) return;
        this.selected = detail;
        
      }, error: e => this.err(e)
    });
  }

  add() {
    this.editId = 0;
    this.form = {
      customerId: null,
      enquiryDate: this.today(),
      requirement: '',
      remarks: '',
      items: [{ instrumentId: null, quantity: 1, note: '' }],
    };
    this.show = true;
  }
  edit(x: ZeissEnquiry, loaded = false) {
    if (!loaded) { this.api.enquiry(x.enquiryId).subscribe({next: detail => this.edit(detail, true), error: e => this.err(e)}); return; }
    this.editId = x.enquiryId;
    this.form = {
      customerId: x.customerId,
      enquiryDate: (x.enquiryDate || '').slice(0, 10),
      requirement: x.requirement,
      remarks: x.remarks,
      items: x.items.map((i) => ({ instrumentId: i.instrumentId, quantity: i.quantity, note: i.note })),
    };
    this.show = true;
  }
  addItem() {
    this.form.items.push({ instrumentId: null, quantity: 1, note: '' });
  }
  removeItem(i: number) {
    this.form.items.splice(i, 1);
  }
  save() {
    if (!this.form.customerId || !this.form.items.length) {
      this.notify.warningToastr('Select customer and at least one item.', 'Zeiss Enquiry');
      return;
    }
    const req = this.editId ? this.api.updateEnquiry(this.editId, this.form) : this.api.createEnquiry(this.form);
    if (this.saving) return;
    this.saving = true;
    req.pipe(finalize(() => (this.saving = false))).subscribe({
      next: (x) => {
        this.show = false;
        this.selected = x;
        this.load();
      },
      error: (e) => this.err(e),
    });
  }
  private today() {
    return new Date().toISOString().slice(0, 10);
  }
  private err(e: any) {
    this.notify.warningToastr(e?.error?.message || 'Action failed.', 'Zeiss Enquiry');
  }
}
