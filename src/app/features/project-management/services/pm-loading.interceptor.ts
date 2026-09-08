import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { PmLoadingService } from './pm-loading.service';

@Injectable()
export class PmLoadingInterceptor implements HttpInterceptor {
  constructor(private readonly loader: PmLoadingService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isProjectManagementRequest(req.url)) {
      return next.handle(req);
    }

    this.loader.begin(this.loadingMessage(req));

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const message = this.successMessage(req);
            if (message) this.loader.registerSuccess(message);
          }
        },
        error: () => this.loader.registerFailure(),
      }),
      finalize(() => this.loader.end()),
    );
  }

  private isProjectManagementRequest(url: string): boolean {
    return url.toLowerCase().includes('/project-management');
  }

  private loadingMessage(req: HttpRequest<unknown>): string {
    const url = req.url.toLowerCase();

    if (req.body instanceof FormData) return 'Uploading file...';
    if (url.includes('/pdf') || url.includes('generated-pdf')) return 'Preparing document...';
    if (url.includes('/invoices/') && url.includes('/send')) return 'Sending invoice PDF...';
    if (url.includes('/invoices')) return req.method === 'GET' ? 'Loading invoices...' : 'Preparing invoice...';
    if (url.includes('/send') || url.includes('/retry')) return 'Sending email...';
    if (url.includes('/decision') || url.includes('/final-close')) return 'Processing approval...';
    if (url.includes('/closure/request')) return 'Submitting closure request...';
    if (url.includes('/assignments')) return 'Saving assignment...';
    if (url.includes('/activities'))
      return req.method === 'GET' ? 'Loading project activities...' : 'Saving activity...';

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
      return 'Saving changes...';
    }

    return 'Loading project data...';
  }

  private successMessage(req: HttpRequest<unknown>): string {
    const method = req.method.toUpperCase();
    const url = req.url.toLowerCase();

    // User-triggered downloads are GET requests but still deserve completion feedback.
    if (method === 'GET' && (url.includes('/pdf') || url.includes('/attachments/file/'))) {
      return 'Document is ready.';
    }

    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return '';

    if (url.includes('/final-close')) return 'Project closed successfully.';
    if (url.includes('/closure/request')) return 'Project closure request submitted successfully.';
    if (url.includes('/closure/decision')) return 'Closure decision completed successfully.';
    if (url.includes('/decision')) return 'Approval action completed successfully.';
    if (url.includes('/invoices/') && url.includes('/send')) return 'Invoice PDF sent successfully.';
    if (url.includes('/invoices')) return 'Invoice updated successfully.';
    if (url.includes('/send')) return 'Email sent successfully.';
    if (url.includes('/retry')) return 'Email resent successfully.';
    if (url.includes('/generated-pdf')) return 'Quotation document prepared successfully.';
    if (url.includes('/attachments/')) return 'File uploaded successfully.';
    if (url.includes('/assignments')) return 'Assignment updated successfully.';
    if (url.includes('/follow-ups/') && url.includes('/complete')) return 'Follow-up completed successfully.';
    if (url.includes('/follow-ups')) return 'Follow-up updated successfully.';
    if (url.includes('/notifications/') && url.includes('/read')) return 'Notification updated successfully.';
    if (url.includes('/operations/settings')) return 'Project Management settings saved successfully.';
    if (url.includes('/customer-responses')) return 'Customer response saved successfully.';
    if (url.includes('/role')) return 'User role updated successfully.';
    if (url.includes('/quotation-templates')) return 'Quotation template saved successfully.';
    if (url.includes('/project-templates')) return 'Project template saved successfully.';
    if (url.includes('/activities'))
      return method === 'DELETE' ? 'Activity removed successfully.' : 'Activity saved successfully.';
    if (url.includes('/enquiries')) return 'Enquiry saved successfully.';
    if (url.includes('/quotations')) return 'Quotation updated successfully.';
    if (url.includes('/projects')) return 'Project updated successfully.';

    return 'Action completed successfully.';
  }
}
