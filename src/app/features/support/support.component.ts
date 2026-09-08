import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { TicketDetail, TicketRow } from '../../core/services/support-ticket-api.service';

@Component({
  selector: 'app-customer-support', standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './support.component.html', styleUrls: ['./support.component.scss']
})
export class CustomerSupportComponent implements OnInit {
  readonly url = `${environment.apiBaseUrl}/my-support-tickets`;
  rows: TicketRow[] = [];
  selected: TicketDetail | null = null;
  loading = false;
  saving = false;
  replying = false;
  error = '';
  success = '';
  reply = '';
  draft = { contactName: '', company: '', module: 'Other', issueType: 'How-to / Support', subject: '', description: '' };
  constructor(public auth: AuthService, private http: HttpClient) {}
  ngOnInit(): void { if (this.auth.isLoggedIn()) this.load(); }
  load(): void {
    this.loading = true; this.error = '';
    this.http.get<{data: TicketRow[]}>(this.url).subscribe({
      next: r => { this.rows = r.data; this.loading = false; },
      error: () => { this.loading = false; this.error = 'Support is temporarily unavailable. Please try again later.'; }
    });
  }
  submit(): void {
    if (this.saving || Object.values(this.draft).some(v => !v.trim())) return;
    this.saving = true; this.error = ''; this.success = '';
    this.http.post<{data: TicketDetail}>(this.url, this.draft).subscribe({
      next: r => {
        this.saving = false; this.success = `Ticket ${r.data.ticketNo} submitted. You can follow its progress below.`;
        this.draft = { ...this.draft, subject: '', description: '' }; this.selected = r.data; this.load();
      },
      error: () => { this.saving = false; this.error = 'Your ticket could not be submitted. Your details have been kept; please try again.'; }
    });
  }
  open(id: number): void {
    this.error = ''; this.selected = null; this.reply = '';
    this.http.get<{data: TicketDetail}>(`${this.url}/${id}`).subscribe({
      next: r => this.selected = r.data,
      error: () => this.error = 'Unable to load this ticket. Please try again.'
    });
  }
  sendReply(): void {
    if (!this.selected || !this.reply.trim() || this.replying) return;
    const id = this.selected.ticketId;
    this.replying = true; this.error = '';
    this.http.post(`${this.url}/${id}/messages`, { message: this.reply }).subscribe({
      next: () => { this.replying = false; this.reply = ''; this.open(id); },
      error: () => { this.replying = false; this.error = 'Unable to send your reply. Please try again.'; }
    });
  }
}