import { ListPage } from '../../../shared/list-page';
import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from '../../../core/services/notifier.service';
import { ZeissLifecycle } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';
@Component({
  selector: 'app-zeiss-sales-lifecycle',
  templateUrl: './zeiss-sales-lifecycle.component.html',
  styleUrls: ['./zeiss-sales-lifecycle.component.scss'],
})
export class ZeissSalesLifecycleComponent implements OnInit {
  readonly lifecyclesPage = new ListPage('Sales');
  reloadlifecyclesPage(): void { this.load(); }

  saving = false;
  private detailVersion = 0;

  rows: ZeissLifecycle[] = [];
  selected?: ZeissLifecycle;
  q = '';
  edit = false;
  delivery = false;
  ack = false;
  form: any = {};
  deliveryForm: any = {};
  ackForm: any = {};
  stages: string[] = [];
  constructor(
    private api: ZeissManagementService,
    private notify: NotifierService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.stages = ['1 - Enquiry Logged', 'Waiting for Details', '2 - Quotation Sent', '3 - PO Received', '4 - PI Issued', '5 - Payment Received', '6 - Delivered', '7 - Tax Invoice Shared', '8 - Closed/Completed', 'Lost/Cancelled'];
    this.load();
  }

  goToPi(): void {
    if (!this.selected) return;
    if (!this.selected.clientPoNo?.trim()) {
      this.notify.warningToastr('Please fill Client PO first to generate PI.');
      this.openEdit();
      return;
    }
    this.router.navigate(['/zeiss/invoices'], { queryParams: { q: this.selected.quotationNo } });
  }
  get filtered() {
    const q = this.q.toLowerCase().trim();
    return !q
      ? this.rows
      : this.rows.filter((x) =>
          `${x.enquiryNo} ${x.quotationNo} ${x.customerName} ${x.currentStage} ${x.clientPoNo}`
            .toLowerCase()
            .includes(q),
        );
  }
  load() {
    this.api.lifecycles(this.lifecyclesPage).subscribe({
      next: (x) => {
        this.rows = x;
        const id = this.selected?.lifecycleId;
        this.select(x.find((v) => v.lifecycleId === id) || x[0]);
      },
      error: (e) => this.err(e),
    });
  }
  select(x?: ZeissLifecycle) {
    const version = ++this.detailVersion;
    this.selected = undefined;
    if (!x) return;
    this.api.lifecycle(x.lifecycleId).subscribe({
      next: detail => {
        if (version !== this.detailVersion) return;
        this.selected = detail;
        
      }, error: e => this.err(e)
    });
  }

  openEdit() {
    if (!this.selected) return;
    const x = this.selected;
    this.form = {
      vendorCode: x.vendorCode,
      clientPoNo: x.clientPoNo,
      poDate: (x.poDate || '').slice(0, 10),
      followUpCallOn: (x.followUpCallOn || '').slice(0, 10),
      followUpMailOn: (x.followUpMailOn || '').slice(0, 10),
      paymentStatus: x.paymentStatus || 'Pending',
      paymentReceivedDate: (x.paymentReceivedDate || '').slice(0, 10),
      remarks: x.remarks,
    };
    this.edit = true;
  }
  save() {
    if (!this.selected) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .updateLifecycle(this.selected.lifecycleId, this.form)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (x) => {
          this.selected = x;
          this.edit = false;
          this.load();
        },
        error: (e) => this.err(e),
      });
  }
  openDelivery() {
    this.deliveryForm = { deliveryDate: this.today(), deliveryMode: 'Courier', remarks: '' };
    this.delivery = true;
  }
  deliver() {
    if (!this.selected) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .deliver(this.selected.lifecycleId, this.deliveryForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (x) => {
          this.selected = x;
          this.delivery = false;
          this.load();
        },
        error: (e) => this.err(e),
      });
  }
  openAck() {
    this.ackForm = { acknowledgementDate: this.today(), remarks: '' };
    this.ack = true;
  }
  acknowledge() {
    if (!this.selected) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .acknowledge(this.selected.lifecycleId, this.ackForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (x) => {
          this.selected = x;
          this.ack = false;
          this.load();
        },
        error: (e) => this.err(e),
      });
  }
  private today() {
    return new Date().toISOString().slice(0, 10);
  }
  private err(e: any) {
    this.notify.warningToastr(e?.error?.message || 'Action failed.', 'Zeiss Sales Lifecycle');
  }
}
