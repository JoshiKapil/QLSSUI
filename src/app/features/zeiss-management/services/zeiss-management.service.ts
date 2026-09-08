import { ListPage } from '../../../shared/list-page';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, unwrapApiResponse } from '../../../core/models/api-response.model';
import {
  ZeissAttachment,
  ZeissBilling,
  ZeissCustomer,
  ZeissDashboard,
  ZeissEnquiry,
  ZeissFollowUp,
  ZeissGrn,
  ZeissInstrument,
  ZeissInventoryTransaction,
  ZeissInvoice,
  ZeissLifecycle,
  ZeissLookups,
  ZeissNotification,
  ZeissQuotation,
} from '../models/zeiss-management.models';

@Injectable({ providedIn: 'root' })
export class ZeissManagementService {
  private readonly url = `${environment.apiBaseUrl}/zeiss-management`;
  private lookupCache$?: Observable<ZeissLookups>;
  constructor(private http: HttpClient) {}
  private unwrap<T>() {
    return map((x: ApiResponse<T> | T) => unwrapApiResponse<T>(x));
  }

  dashboard() {
    return this.http
      .get<ApiResponse<ZeissDashboard> | ZeissDashboard>(`${this.url}/dashboard`)
      .pipe(this.unwrap<ZeissDashboard>());
  }
  lookups(refresh = false) {
    if (refresh || !this.lookupCache$)
      this.lookupCache$ = this.http
        .get<ApiResponse<ZeissLookups> | ZeissLookups>(`${this.url}/lookups`)
        .pipe(this.unwrap<ZeissLookups>(), shareReplay(1));
    return this.lookupCache$;
  }
  customers(page?: ListPage) {
    if (page) return page.read<ZeissCustomer>(this.http, `${this.url}/customers`);

    return this.http
      .get<ApiResponse<ZeissCustomer[]> | ZeissCustomer[]>(`${this.url}/customers`)
      .pipe(this.unwrap<ZeissCustomer[]>());
  }
  instruments(page?: ListPage) {
    if (page) return page.read<ZeissInstrument>(this.http, `${this.url}/instruments`);

    return this.http
      .get<ApiResponse<ZeissInstrument[]> | ZeissInstrument[]>(`${this.url}/instruments`)
      .pipe(this.unwrap<ZeissInstrument[]>());
  }

  enquiries(page?: ListPage) {
    if (page) return page.read<ZeissEnquiry>(this.http, `${this.url}/enquiries`);

    return this.http
      .get<ApiResponse<ZeissEnquiry[]> | ZeissEnquiry[]>(`${this.url}/enquiries`)
      .pipe(this.unwrap<ZeissEnquiry[]>());
  }
  enquiry(id: number) {
    return this.http
      .get<ApiResponse<ZeissEnquiry> | ZeissEnquiry>(`${this.url}/enquiries/${id}`)
      .pipe(this.unwrap<ZeissEnquiry>());
  }
  createEnquiry(body: any) {
    return this.http
      .post<ApiResponse<ZeissEnquiry> | ZeissEnquiry>(`${this.url}/enquiries`, body)
      .pipe(this.unwrap<ZeissEnquiry>());
  }
  updateEnquiry(id: number, body: any) {
    return this.http
      .put<ApiResponse<ZeissEnquiry> | ZeissEnquiry>(`${this.url}/enquiries/${id}`, body)
      .pipe(this.unwrap<ZeissEnquiry>());
  }

  quotations(page?: ListPage) {
    if (page) return page.read<ZeissQuotation>(this.http, `${this.url}/quotations`);

    return this.http
      .get<ApiResponse<ZeissQuotation[]> | ZeissQuotation[]>(`${this.url}/quotations`)
      .pipe(this.unwrap<ZeissQuotation[]>());
  }
  quotation(id: number) {
    return this.http
      .get<ApiResponse<ZeissQuotation> | ZeissQuotation>(`${this.url}/quotations/${id}`)
      .pipe(this.unwrap<ZeissQuotation>());
  }
  updateQuotation(id: number, body: any) {
    return this.http
      .put<ApiResponse<ZeissQuotation> | ZeissQuotation>(`${this.url}/quotations/${id}`, body)
      .pipe(this.unwrap<ZeissQuotation>());
  }
  submitQuotation(id: number) {
    return this.http
      .post<ApiResponse<ZeissQuotation> | ZeissQuotation>(`${this.url}/quotations/${id}/submit`, {})
      .pipe(this.unwrap<ZeissQuotation>());
  }
  decideQuotation(id: number, action: 'Approve' | 'Reject' | 'Return', remark = '') {
    return this.http
      .post<ApiResponse<ZeissQuotation> | ZeissQuotation>(`${this.url}/quotations/${id}/decision`, { action, remark })
      .pipe(this.unwrap<ZeissQuotation>());
  }
  sendQuotation(id: number, body: any) {
    return this.http.post(`${this.url}/quotations/${id}/send`, body);
  }
  quotationPdf(id: number) {
    return this.http.get(`${this.url}/quotations/${id}/pdf`, { responseType: 'blob' });
  }
  followUps(id: number) {
    return this.http
      .get<ApiResponse<ZeissFollowUp[]> | ZeissFollowUp[]>(`${this.url}/quotations/${id}/follow-ups`)
      .pipe(this.unwrap<ZeissFollowUp[]>());
  }
  addFollowUp(id: number, daysFromNow: number, notes = '') {
    return this.http
      .post<ApiResponse<ZeissFollowUp> | ZeissFollowUp>(`${this.url}/quotations/${id}/follow-ups`, {
        daysFromNow,
        notes,
      })
      .pipe(this.unwrap<ZeissFollowUp>());
  }
  completeFollowUp(id: number, notes = '') {
    return this.http.post(`${this.url}/follow-ups/${id}/complete`, { notes });
  }
  confirmQuotation(id: number, body: any) {
    return this.http
      .post<ApiResponse<ZeissLifecycle> | ZeissLifecycle>(`${this.url}/quotations/${id}/confirm`, body)
      .pipe(this.unwrap<ZeissLifecycle>());
  }

  lifecycles(page?: ListPage) {
    if (page) return page.read<ZeissLifecycle>(this.http, `${this.url}/sales`);

    return this.http
      .get<ApiResponse<ZeissLifecycle[]> | ZeissLifecycle[]>(`${this.url}/sales`)
      .pipe(this.unwrap<ZeissLifecycle[]>());
  }
  lifecycle(id: number) {
    return this.http
      .get<ApiResponse<ZeissLifecycle> | ZeissLifecycle>(`${this.url}/sales/${id}`)
      .pipe(this.unwrap<ZeissLifecycle>());
  }
  updateLifecycle(id: number, body: any) {
    return this.http
      .put<ApiResponse<ZeissLifecycle> | ZeissLifecycle>(`${this.url}/sales/${id}`, this.normalizeSaleDates(body))
      .pipe(this.unwrap<ZeissLifecycle>());
  }
  deliver(id: number, body: any) {
    return this.http
      .post<ApiResponse<ZeissLifecycle> | ZeissLifecycle>(`${this.url}/sales/${id}/delivery`, body)
      .pipe(this.unwrap<ZeissLifecycle>());
  }
  acknowledge(id: number, body: any) {
    return this.http
      .post<ApiResponse<ZeissLifecycle> | ZeissLifecycle>(`${this.url}/sales/${id}/acknowledgement`, body)
      .pipe(this.unwrap<ZeissLifecycle>());
  }
  closeSale(id: number) {
    return this.http
      .post<ApiResponse<ZeissLifecycle> | ZeissLifecycle>(`${this.url}/sales/${id}/close`, {})
      .pipe(this.unwrap<ZeissLifecycle>());
  }

  billing(id: number) {
    return this.http
      .get<ApiResponse<ZeissBilling> | ZeissBilling>(`${this.url}/sales/${id}/billing`)
      .pipe(this.unwrap<ZeissBilling>());
  }
  saveBilling(id: number, body: any) {
    return this.http
      .put<ApiResponse<ZeissBilling> | ZeissBilling>(`${this.url}/sales/${id}/billing`, body)
      .pipe(this.unwrap<ZeissBilling>());
  }
  invoices(id: number) {
    return this.http
      .get<ApiResponse<ZeissInvoice[]> | ZeissInvoice[]>(`${this.url}/sales/${id}/invoices`)
      .pipe(this.unwrap<ZeissInvoice[]>());
  }
  createPi(id: number) {
    return this.http
      .post<ApiResponse<ZeissInvoice> | ZeissInvoice>(`${this.url}/sales/${id}/pi`, {})
      .pipe(this.unwrap<ZeissInvoice>());
  }
  createTi(id: number) {
    return this.http
      .post<ApiResponse<ZeissInvoice> | ZeissInvoice>(`${this.url}/sales/${id}/ti`, {})
      .pipe(this.unwrap<ZeissInvoice>());
  }
  invoicePdf(id: number) {
    return this.http.get(`${this.url}/invoices/${id}/pdf`, { responseType: 'blob' });
  }
  sendInvoice(id: number, body: any) {
    return this.http.post(`${this.url}/invoices/${id}/send`, body);
  }

  grns(page?: ListPage) {
    if (page) return page.read<ZeissGrn>(this.http, `${this.url}/inventory/grns`);

    return this.http
      .get<ApiResponse<ZeissGrn[]> | ZeissGrn[]>(`${this.url}/inventory/grns`)
      .pipe(this.unwrap<ZeissGrn[]>());
  }
  createGrn(body: any) {
    return this.http
      .post<ApiResponse<ZeissGrn> | ZeissGrn>(`${this.url}/inventory/grns`, body)
      .pipe(this.unwrap<ZeissGrn>());
  }
  updateGrnQc(id: number, body: any) {
    return this.http
      .put<ApiResponse<ZeissGrn> | ZeissGrn>(`${this.url}/inventory/grns/${id}/qc`, body)
      .pipe(this.unwrap<ZeissGrn>());
  }
  inventoryTransactions(page?: ListPage) {
    if (page) return page.read<ZeissInventoryTransaction>(this.http, `${this.url}/inventory/transactions`);

    return this.http
      .get<ApiResponse<ZeissInventoryTransaction[]> | ZeissInventoryTransaction[]>(`${this.url}/inventory/transactions`)
      .pipe(this.unwrap<ZeissInventoryTransaction[]>());
  }
  notifications(page?: ListPage) {
    if (page) return page.read<ZeissNotification>(this.http, `${this.url}/notifications`);

    return this.http
      .get<ApiResponse<ZeissNotification[]> | ZeissNotification[]>(`${this.url}/notifications`)
      .pipe(this.unwrap<ZeissNotification[]>());
  }
  markNotificationRead(id: number) {
    return this.http.post(`${this.url}/notifications/${id}/read`, {});
  }

  catalogueUrl(fileName: string) {
    return `/assets/zeiss-catalogue/${encodeURIComponent(fileName)}`;
  }
  attachments(entityType: string, entityId: number) {
    return this.http
      .get<ApiResponse<ZeissAttachment[]> | ZeissAttachment[]>(`${this.url}/attachments/${entityType}/${entityId}`)
      .pipe(this.unwrap<ZeissAttachment[]>());
  }
  uploadAttachment(entityType: string, entityId: number, file: File) {
    const f = new FormData();
    f.append('file', file, file.name);
    return this.http
      .post<ApiResponse<ZeissAttachment> | ZeissAttachment>(`${this.url}/attachments/${entityType}/${entityId}`, f)
      .pipe(this.unwrap<ZeissAttachment>());
  }
  private normalizeSaleDates(body: Record<string, unknown>) {
    const result = { ...body };
    for (const field of ['poDate', 'followUpCallOn', 'followUpMailOn', 'paymentReceivedDate']) {
      if (result[field] === '') result[field] = null;
    }
    return result;
  }
  attachmentUrl(id: number) {
    return `${this.url}/attachments/file/${id}`;
  }
}
