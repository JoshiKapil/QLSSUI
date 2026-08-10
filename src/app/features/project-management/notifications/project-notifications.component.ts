import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PmNotification } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-notifications',
  templateUrl: './project-notifications.component.html',
  styleUrls: ['./project-notifications.component.scss']
})
export class ProjectNotificationsComponent implements OnInit {
  items: PmNotification[] = [];
  error = '';
  filter: 'all' | 'unread' = 'all';
  search = '';

  constructor(
    private api: ProjectManagementService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  get isSuperAdmin(): boolean {
    return (this.auth.getCurrentUser()?.role || '').toLowerCase() === 'superadmin';
  }

  get unread(): number {
    return this.items.filter(item => !item.isRead).length;
  }

  get recipientCount(): number {
    return new Set(this.items.map(item => item.recipientUserId)).size;
  }

  get filtered(): PmNotification[] {
    const search = this.search.trim().toLowerCase();
    return this.items.filter(item => {
      const matchesStatus = this.filter === 'all' || !item.isRead;
      const searchable = `${item.title} ${item.message} ${item.notificationType} ${item.recipientName} ${item.recipientEmail}`.toLowerCase();
      return matchesStatus && (!search || searchable.includes(search));
    });
  }

  load(): void {
    this.error = '';
    this.api.notifications().subscribe({
      next: notifications => this.items = notifications,
      error: error => this.error = error?.error?.message || 'Unable to load notifications.'
    });
  }

  open(notification: PmNotification): void {
    this.api.readNotification(notification.notificationId).subscribe({
      next: () => {
        notification.isRead = true;
        if (notification.routeUrl) {
          this.router.navigateByUrl(notification.routeUrl.replace(/\/\d+$/, ''));
        }
      },
      error: () => this.error = 'You are not allowed to update this notification.'
    });
  }

  icon(notification: PmNotification): string {
    const type = (notification.notificationType || '').toLowerCase();
    if (type.includes('quotation')) return 'fa-file-invoice-dollar';
    if (type.includes('project')) return 'fa-diagram-project';
    if (type.includes('activity')) return 'fa-list-check';
    if (type.includes('follow')) return 'fa-clock-rotate-left';
    if (type.includes('closure') || type.includes('acknowledg')) return 'fa-flag-checkered';
    return 'fa-bell';
  }
}