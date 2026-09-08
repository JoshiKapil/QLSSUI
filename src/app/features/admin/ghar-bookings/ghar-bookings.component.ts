import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { GharBookingAdminItem, GharBookingService } from '../../ghar-booking/ghar-booking.service';

@Component({
  selector: 'app-ghar-bookings',
  templateUrl: './ghar-bookings.component.html',
  styleUrls: ['./ghar-bookings.component.scss'],
})
export class GharBookingsComponent implements OnInit {
  readonly statuses = [
    'PaymentSubmitted',
    'PaymentVerified',
    'PaymentRejected',
    'Processing',
    'Packed',
    'Shipped',
    'OutForDelivery',
    'Delivered',
    'Cancelled',
  ];

  records: GharBookingAdminItem[] = [];
  isLoading = false;
  loadError = '';
  savingBookingId: number | null = null;
  downloadingBookingId: number | null = null;
  statusFilter = 'All';
  statusDraft: Record<number, string> = {};
  remarkDraft: Record<number, string> = {};

  get visibleRecords(): GharBookingAdminItem[] {
    return this.statusFilter === 'All' ? this.records : this.records.filter((row) => row.status === this.statusFilter);
  }

  countStatus(status: string): number {
    return this.records.filter((row) => row.status === status).length;
  }

  constructor(
    private readonly service: GharBookingService,
    private readonly notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.loadError = '';
    this.service.getAll().subscribe({
      next: (rows) => {
        this.records = rows || [];
        this.records.forEach((row) => {
          this.statusDraft[row.bookingId] = row.status;
          this.remarkDraft[row.bookingId] = row.adminRemark || '';
        });
      },
      error: (error) => {
        this.records = [];
        this.isLoading = false;
        this.loadError = 'Bookings could not be loaded. Please try Refresh.';
        this.notifier.warningToastr(this.loadError);
      },
      complete: () => (this.isLoading = false),
    });
  }

  saveStatus(row: GharBookingAdminItem): void {
    const status = this.statusDraft[row.bookingId];
    if (!status || this.savingBookingId !== null) return;

    this.savingBookingId = row.bookingId;
    this.service.updateStatus(row.bookingId, status, this.remarkDraft[row.bookingId]).subscribe({
      next: () => {
        row.status = status;
        row.adminRemark = this.remarkDraft[row.bookingId]?.trim() || null;
        row.updatedDate = new Date().toISOString();
        this.notifier.successToastr(`Booking #${row.bookingId} updated to ${this.statusLabel(status)}.`);
      },
      error: (error) => this.notifier.warningToastr(error?.message || 'Status could not be updated.'),
      complete: () => (this.savingBookingId = null),
    });
  }

  viewPaymentProof(row: GharBookingAdminItem): void {
    if (!row.paymentScreenshotOriginalName || this.downloadingBookingId !== null) return;

    this.downloadingBookingId = row.bookingId;
    this.service.getPaymentProof(row.bookingId).subscribe({
      next: (response) => {
        const url = URL.createObjectURL(response.body || new Blob());
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.rel = 'noopener';
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      },
      error: (error) => this.notifier.warningToastr(error?.message || 'Payment proof could not be opened.'),
      complete: () => (this.downloadingBookingId = null),
    });
  }

  statusLabel(status: string): string {
    return status.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  trackByBookingId(_: number, row: GharBookingAdminItem): number {
    return row.bookingId;
  }
}


