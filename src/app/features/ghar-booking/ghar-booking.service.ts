import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';

export interface GharBookingRequest {
  name: string | null;
  whatsAppNumber: string | null;
  quantity: number | null;
  shippingAddress: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
  // transactionId: string | null; // PhonePe payment is paused.
}

export interface GharBookingResult {
  bookingId: number;
  status: string;
  createdDate: string;
  listPricePerCopy: number;
  discountedPricePerCopy: number;
  deliveryCharge: number;
  finalAmount: number;
  transactionId?: string | null;
}

export interface GharBookingAdminItem extends GharBookingResult {
  name: string;
  whatsAppNumber: string;
  quantity: number;
  shippingAddress: string;
  city: string;
  state: string;
  pinCode: string;
  paymentScreenshotOriginalName: string;
  paymentScreenshotContentType: string;
  paymentScreenshotSize: number;
  updatedDate?: string | null;
  adminRemark?: string | null;
}

@Injectable({ providedIn: 'root' })
export class GharBookingService {
  constructor(private readonly api: ApiClientService) {}

  create(request: GharBookingRequest): Observable<GharBookingResult> {
    const formData = new FormData();
    Object.entries(request).forEach(([key, value]) => formData.append(key, value == null ? '' : String(value)));
    // PhonePe payment is paused: no payment proof is required.
    // formData.append('paymentScreenshot', paymentScreenshot, paymentScreenshot.name);
    return this.api.post<GharBookingResult>('GharBooking', formData);
  }

  updateStatus(bookingId: number, status: string, adminRemark?: string | null): Observable<unknown> {
    return this.api.put<unknown>(`GharBooking/admin/${bookingId}/status`, { status, adminRemark });
  }

  getPaymentProof(bookingId: number) {
    return this.api.getBlob(`GharBooking/admin/${bookingId}/payment-proof`);
  }

  getAll(): Observable<GharBookingAdminItem[]> {
    return this.api.get<GharBookingAdminItem[]>('GharBooking/admin');
  }
}


