import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { PmActivity, PmDashboard } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  data?: PmDashboard;
  loading = true;
  error = '';

  constructor(private api: ProjectManagementService, public auth: AuthService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.error = '';
    this.api.dashboard().subscribe({
      next: value => this.data = value,
      error: e => { this.error = e?.error?.message || e?.message || 'Unable to load dashboard.'; this.loading = false; },
      complete: () => this.loading = false
    });
  }

  get role(): string { return this.auth.getCurrentUser()?.role || ''; }
  get isSuperAdmin(): boolean { return this.role.toLowerCase() === 'superadmin'; }

  badge(status: string): string {
    const value = (status || '').toLowerCase();
    if (value.includes('closed') || value.includes('complete') || value.includes('approved')) return 'pm-badge pm-badge--ok';
    if (value.includes('delay') || value.includes('overdue') || value.includes('reject')) return 'pm-badge pm-badge--danger';
    if (value.includes('pending') || value.includes('progress') || value.includes('due')) return 'pm-badge pm-badge--warn';
    return 'pm-badge';
  }

  activityClass(activity: PmActivity): string {
    if (!activity.plannedCompletionDate) return 'activity-card';
    const due = new Date(activity.plannedCompletionDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (due.getTime() < today.getTime()) return 'activity-card activity-card--danger';
    if (due.getTime() === today.getTime()) return 'activity-card activity-card--warn';
    return 'activity-card activity-card--upcoming';
  }
}
