import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ZeissLoadingService } from './zeiss-loading.service';
@Injectable()
export class ZeissLoadingInterceptor implements HttpInterceptor {
  constructor(private loader: ZeissLoadingService) {}
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.toLowerCase().includes('/zeiss-management')) return next.handle(req);
    this.loader.begin(this.message(req));
    return next.handle(req).pipe(
      tap({
        next: (e) => {
          if (e instanceof HttpResponse) {
            const m = this.success(req);
            if (m) this.loader.registerSuccess(m);
          }
        },
        error: () => this.loader.registerFailure(),
      }),
      finalize(() => this.loader.end()),
    );
  }
  private message(req: HttpRequest<unknown>) {
    const u = req.url.toLowerCase();
    if (req.body instanceof FormData) return 'Uploading Zeiss file...';
    if (u.includes('/pdf')) return 'Preparing document...';
    if (u.includes('/send')) return 'Sending email...';
    if (u.includes('/decision')) return 'Processing quotation approval...';
    if (u.includes('/delivery')) return 'Posting delivery and stock...';
    if (req.method !== 'GET') return 'Saving Zeiss changes...';
    return 'Loading Zeiss data...';
  }
  private success(req: HttpRequest<unknown>) {
    const u = req.url.toLowerCase();
    if (req.method === 'GET' && u.includes('/pdf')) return 'Document is ready.';
    if (req.method === 'GET') return '';
    if (u.includes('/send')) return 'Email sent successfully.';
    if (u.includes('/delivery')) return 'Delivery posted and stock updated.';
    if (u.includes('/acknowledgement')) return 'Client acknowledgement saved.';
    if (u.includes('/decision')) return 'Quotation approval action completed.';
    if (u.includes('/pi')) return 'Proforma Invoice generated.';
    if (u.includes('/ti')) return 'Tax Invoice generated.';
    return 'Changes saved successfully.';
  }
}
