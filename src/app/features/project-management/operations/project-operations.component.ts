import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { PmCustomerResponse, PmEmailLog, PmEnquiry, PmProject, PmQuotation } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-operations',
  templateUrl: './project-operations.component.html',
  styleUrls: ['./project-operations.component.scss'],
})
export class ProjectOperationsComponent implements OnInit {
  readonly enquiriesPage = new ListPage('Enquiries');
  reloadenquiriesPage(): void { this.load(); }
  readonly quotationsPage = new ListPage('Quotations');
  reloadquotationsPage(): void { this.load(); }
  readonly projectsPage = new ListPage('Projects');
  reloadprojectsPage(): void { this.load(); }

  tab: 'settings' | 'delivery' | 'responses' = 'settings';
  deliveries: PmEmailLog[] = [];
  responses: PmCustomerResponse[] = [];
  enquiries: PmEnquiry[] = [];
  quotations: PmQuotation[] = [];
  projects: PmProject[] = [];
  settings: any = {
    quotationFollowUpDays: 2,
    activityUpcomingDays: 5,
    emailRetryLimit: 3,
    reminderWorkerMinutes: 30,
  };
  response: any = {
    entityType: 'Quotation',
    entityId: null,
    channel: 'Email',
    responseStatus: 'Received',
    receivedFrom: '',
    subject: '',
    responseText: '',
    receivedOnUtc: new Date().toISOString().slice(0, 16),
  };
  deliveryFilter = '';
  responseFilter = '';
  showResponse = false;
  error = '';
  success = '';
  busy = false;
  constructor(
    private api: ProjectManagementService,
    public auth: AuthService,
  ) {}
  ngOnInit(): void {
    this.load();
  }
  get isSuperAdmin(): boolean {
    return (this.auth.getCurrentUser()?.role || '').toLowerCase() === 'superadmin';
  }
  get entityOptions(): any[] {
    const source: any[] =
      this.response.entityType === 'Enquiry'
        ? this.enquiries
        : this.response.entityType === 'Project'
          ? this.projects
          : this.quotations;
    return source.map((x) => ({
      id: x.enquiryId || x.projectId || x.quotationId,
      name: x.enquiryNo || x.projectNo || x.quotationNo,
      detail: x.customerName,
    }));
  }
  get filteredDeliveries(): PmEmailLog[] {
    const q = this.deliveryFilter.toLowerCase();
    return this.deliveries.filter(
      (x) =>
        !q ||
        `${x.entityType} ${x.emailType} ${x.recipientEmail} ${x.deliveryStatus} ${x.subject}`.toLowerCase().includes(q),
    );
  }
  get filteredResponses(): PmCustomerResponse[] {
    const q = this.responseFilter.toLowerCase();
    return this.responses.filter(
      (x) =>
        !q ||
        `${x.entityReference} ${x.channel} ${x.responseStatus} ${x.receivedFrom} ${x.subject}`
          .toLowerCase()
          .includes(q),
    );
  }
  load(): void {
    this.api.settings().subscribe({
      next: (v) =>
        v.forEach((x) => {
          const k = x.settingKey.charAt(0).toLowerCase() + x.settingKey.slice(1);
          this.settings[k] = +x.settingValue;
        }),
    });
    this.api.emailDeliveries().subscribe({
      next: (v) => (this.deliveries = v),
      error: (e) => (this.error = e?.error?.message || 'Unable to load email deliveries.'),
    });
    this.api.customerResponses().subscribe({ next: (v) => (this.responses = v) });
    this.api.enquiries(this.enquiriesPage).subscribe((v) => (this.enquiries = v));
    this.api.quotations(this.quotationsPage).subscribe((v) => (this.quotations = v));
    this.api.projects(this.projectsPage).subscribe((v) => (this.projects = v));
  }
  saveSettings(): void {
    this.clear();
    this.api.saveSettings(this.settings).subscribe({
      next: () => (this.success = 'PM operating settings saved.'),
      error: (e) => (this.error = e?.error?.message || 'Unable to save settings.'),
    });
  }
  retry(x: PmEmailLog): void {
    if (this.busy) return;
    this.busy = true;
    this.clear();
    this.api.retryEmail(x.emailLogId).subscribe({
      next: () => {
        this.busy = false;
        this.success = 'Email resent successfully.';
        this.load();
      },
      error: (e) => {
        this.busy = false;
        this.error = e?.error?.message || 'Email retry failed.';
        this.load();
      },
    });
  }
  newResponse(): void {
    this.response = {
      entityType: 'Quotation',
      entityId: null,
      channel: 'Email',
      responseStatus: 'Received',
      receivedFrom: '',
      subject: '',
      responseText: '',
      receivedOnUtc: new Date().toISOString().slice(0, 16),
    };
    this.showResponse = true;
  }
  saveResponse(): void {
    if (!this.response.entityId || !this.response.responseText.trim()) {
      this.error = 'Record and response details are required.';
      return;
    }
    this.clear();
    this.api
      .addCustomerResponse({
        ...this.response,
        receivedOnUtc: new Date(this.response.receivedOnUtc).toISOString(),
      })
      .subscribe({
        next: () => {
          this.success = 'Customer response recorded.';
          this.showResponse = false;
          this.load();
        },
        error: (e) => (this.error = e?.error?.message || 'Unable to record response.'),
      });
  }
  exportDeliveries(): void {
    this.csv(
      'QLSS_PM_Email_Delivery',
      ['Entity', 'Type', 'Recipient', 'Subject', 'Status', 'Sent', 'Retries'],
      this.filteredDeliveries.map((x) => [
        `${x.entityType} ${x.entityId}`,
        x.emailType,
        x.recipientEmail,
        x.subject,
        x.deliveryStatus,
        x.sentOnUtc || '',
        x.retryCount,
      ]),
    );
  }
  exportResponses(): void {
    this.csv(
      'QLSS_PM_Customer_Responses',
      ['Reference', 'Channel', 'Status', 'From', 'Subject', 'Response', 'Received'],
      this.filteredResponses.map((x) => [
        x.entityReference,
        x.channel,
        x.responseStatus,
        x.receivedFrom,
        x.subject,
        x.responseText,
        x.receivedOnUtc,
      ]),
    );
  }
  private csv(name: string, head: any[], rows: any[][]): void {
    const data = [head, ...rows]
      .map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const u = URL.createObjectURL(new Blob([data], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = u;
    a.download = `${name}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(u);
  }
  private clear(): void {
    this.error = '';
    this.success = '';
  }
}
