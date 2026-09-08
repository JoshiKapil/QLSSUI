import { ListPage } from '../../../shared/list-page';
import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NotifierService } from '../../../core/services/notifier.service';
import { ZeissGrn, ZeissInstrument, ZeissInventoryTransaction } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';

@Component({
  selector: 'app-zeiss-inventory',
  templateUrl: './zeiss-inventory.component.html',
  styleUrls: ['./zeiss-inventory.component.scss'],
})
export class ZeissInventoryComponent implements OnInit {
  readonly instrumentsPage = new ListPage('Instruments');
  reloadinstrumentsPage(): void { this.load(); }
  readonly grnsPage = new ListPage('Goods receipts');
  reloadgrnsPage(): void { this.load(); }
  readonly inventoryTransactionsPage = new ListPage('Stock transactions');
  reloadinventoryTransactionsPage(): void { this.load(); }

  saving = false;
  totals = { totalStockQuantity: 0, totalInstruments: 0, lowStockItems: 0, nonMovingItems: 0 };

  instruments: ZeissInstrument[] = [];
  grns: ZeissGrn[] = [];
  transactions: ZeissInventoryTransaction[] = [];
  tab: 'stock' | 'grn' | 'transactions' = 'stock';
  showGrnForm = false;
  editingQc?: ZeissGrn;
  grnForm = this.emptyGrn();
  qcForm = { qcStatus: 'Pending Inspection', qcInspectedBy: '', calibrationCertReceived: false, remarks: '' };

  constructor(
    private api: ZeissManagementService,
    private notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  get low(): ZeissInstrument[] {
    return this.instruments.filter((x) => x.currentQuantity <= 5);
  }
  get nonmoving(): ZeissInstrument[] {
    const cut = Date.now() - 15 * 86400000;
    return this.instruments.filter(
      (x) => x.currentQuantity > 0 && new Date(x.lastTransactionOnUtc || x.createdOnUtc || 0).getTime() < cut,
    );
  }
  get totalQty(): number {
    return this.totals.totalStockQuantity;
  }

  load(): void {
    this.api.dashboard().subscribe({next: totals => this.totals = totals, error: e => this.fail(e)});
    forkJoin({
      instruments: this.api.instruments(this.instrumentsPage),
      grns: this.api.grns(this.grnsPage),
      transactions: this.api.inventoryTransactions(this.inventoryTransactionsPage),
    }).subscribe({
      next: (x) => {
        this.instruments = x.instruments;
        this.grns = x.grns;
        this.transactions = x.transactions;
      },
      error: (e) => this.fail(e),
    });
  }

  openGrn(): void {
    this.grnForm = this.emptyGrn();
    this.showGrnForm = true;
  }
  saveGrn(): void {
    if (!this.grnForm.instrumentId || !this.grnForm.qtyReceived || !this.grnForm.supplier.trim()) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .createGrn(this.grnForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.showGrnForm = false;
          this.notifier.successToastr('GRN saved. Stock will be posted only after QC approval.', 'Zeiss Inventory');
          this.load();
        },
        error: (e) => this.fail(e),
      });
  }

  openQc(row: ZeissGrn): void {
    this.editingQc = row;
    this.qcForm = {
      qcStatus: row.qcStatus || 'Pending Inspection',
      qcInspectedBy: row.qcInspectedBy || '',
      calibrationCertReceived: !!row.calibrationCertReceived,
      remarks: row.remarks || '',
    };
  }
  saveQc(): void {
    if (!this.editingQc) return;
    if (this.saving) return;
    this.saving = true;
    this.api
      .updateGrnQc(this.editingQc.grnId, this.qcForm)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.editingQc = undefined;
          this.notifier.successToastr('QC updated. Approved quantity is posted to stock only once.', 'Zeiss Inventory');
          this.load();
        },
        error: (e) => this.fail(e),
      });
  }

  viewCatalogue(row: ZeissInstrument): void {
    if (!row.catalogueFile) return;
    window.open(this.api.catalogueUrl(row.catalogueFile), '_blank', 'noopener');
  }

  private emptyGrn(): any {
    return {
      dateReceived: new Date().toISOString().slice(0, 10),
      supplier: '',
      supplierPoRef: '',
      instrumentId: 0,
      qtyReceived: 1,
      receivedBy: '',
      qcStatus: 'Pending Inspection',
      qcInspectedBy: '',
      calibrationCertReceived: false,
      remarks: '',
    };
  }
  private fail(e: any): void {
    this.notifier.warningToastr(e?.error?.message || e?.error?.errors?.[0] || 'Action failed.', 'Zeiss Inventory');
  }
}
