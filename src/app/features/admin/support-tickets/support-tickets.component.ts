import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { SupportTicketApiService, TicketDetail, TicketRow } from '../../../core/services/support-ticket-api.service';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.scss']
})
export class SupportTicketsComponent implements OnInit {
  rows: TicketRow[] = [];
  selected: TicketDetail | null = null;
  dashboard: any = {};
  users: any[] = [];
  sources: any[] = [];
  loading = false;
  loadError = '';
  status = '';
  priority = '';
  search = '';
  reply = '';
  internal = false;
  rootCause = '';
  resolution = '';
  resolutionType = 'Bug Fixed';
  fixedVersion = '';
  showCreate = false;
  creating = false;

  newTicket: any = this.emptyTicket();

  constructor(private api: SupportTicketApiService, private notifier: NotifierService) {}

  ngOnInit(): void {
    this.refresh();
    this.api.users().subscribe({ next: x => this.users = x, error: () => this.notifier.warningToastr('Unable to load assignees.') });
    this.api.sources().subscribe({ next: x => this.sources = x, error: () => this.notifier.warningToastr('Unable to load customer sources.') });
  }

  emptyTicket(): any {
    return {
      showInEkrupa: true,
      sourceCode: '',
      sourceUserId: null,
      sourceEmployeeId: null,
      sourceCompanyName: '',
      sourceUserName: '',
      sourceUserEmail: '',
      sourceDepartment: '',
      moduleName: 'Documents',
      issueType: 'Error / Bug',
      priority: 'Normal',
      subject: '',
      description: '',
      assignedToUserId: null
    };
  }

  refresh(): void {
    this.loading = true;
    this.loadError = '';
    this.api.dashboard().subscribe({ next: x => this.dashboard = x, error: () => this.dashboard = {} });
    this.api.list({ status: this.status, priority: this.priority, search: this.search }).subscribe({
      next: x => {
        this.rows = x;
        this.loading = false;
        if (this.selected && !x.find((r: TicketRow) => r.ticketId === this.selected!.ticketId)) this.selected = null;
      },
      error: () => {
        this.loading = false;
        this.loadError = 'Unable to load support tickets. Please try again.';
      }
    });
  }

  createTicket(): void {
    const n = this.newTicket;
    if (!n.sourceCompanyName?.trim() || !n.sourceUserName?.trim() || !n.moduleName?.trim() || !n.issueType?.trim() || !n.subject?.trim() || !n.description?.trim()) {
      this.notifier.warningToastr('Company/contact, module, issue type, subject and description are required.');
      return;
    }
    if (n.showInEkrupa && !n.sourceCode) {
      this.notifier.warningToastr('Select the eKRUPA source/tenant.');
      return;
    }
    if (n.showInEkrupa && !n.sourceUserEmail?.trim() && !n.sourceUserId) {
      this.notifier.warningToastr('Enter eKRUPA user email or User ID so the ticket can appear in My Tickets.');
      return;
    }
    this.creating = true;
    this.api.createManual(n).subscribe({
      next: ticket => {
        this.creating = false;
        this.showCreate = false;
        this.newTicket = this.emptyTicket();
        this.notifier.successToastr(`Ticket ${ticket.ticketNo} created.`);
        this.refresh();
        this.open(ticket);
      },
      error: e => {
        this.creating = false;
        this.notifier.warningToastr(e?.error?.message || 'Unable to create ticket.');
      }
    });
  }

  open(r: TicketRow): void { this.api.get(r.ticketId).subscribe(x => this.selected = x); }

  saveControl(): void {
    if (!this.selected) return;
    this.api.update(this.selected.ticketId, {
      status: this.selected.status,
      priority: this.selected.priority,
      assignedToUserId: this.selected.assignedToUserId
    }).subscribe(() => { this.notifier.successToastr('Ticket updated'); this.reloadSelected(); });
  }

  sendReply(): void {
    if (!this.selected || !this.reply.trim()) return;
    this.api.reply(this.selected.ticketId, this.reply, this.internal).subscribe(() => {
      this.notifier.successToastr(this.internal ? 'Internal note saved' : 'Reply sent');
      this.reply = '';
      this.reloadSelected();
    });
  }

  resolve(): void {
    if (!this.selected || !this.rootCause.trim() || !this.resolution.trim()) {
      this.notifier.warningToastr('Root cause and resolution are required.');
      return;
    }
    this.api.resolve(this.selected.ticketId, {
      rootCause: this.rootCause,
      resolution: this.resolution,
      resolutionType: this.resolutionType,
      fixedVersion: this.fixedVersion
    }).subscribe(() => { this.notifier.successToastr('Ticket resolved'); this.reloadSelected(); });
  }

  upload(e: any): void {
    if (!this.selected || !e.target.files?.length) return;
    this.api.upload(this.selected.ticketId, e.target.files[0]).subscribe(() => {
      this.notifier.successToastr('Attachment uploaded');
      this.reloadSelected();
    });
  }

  download(a: any): void {
    if (!this.selected) return;
    this.api.download(this.selected.ticketId, a.attachmentId).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = a.originalFileName || 'attachment';
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  reloadSelected(): void {
    if (!this.selected) return;
    this.api.get(this.selected.ticketId).subscribe(x => { this.selected = x; this.refresh(); });
  }
}
