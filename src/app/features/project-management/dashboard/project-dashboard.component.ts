import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { OnboardingDashboard, OnboardingLoginState } from '../../employee-onboarding/models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../../employee-onboarding/services/employee-onboarding.service';
import { PmActivity, PmDashboard } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
})
export class ProjectDashboardComponent implements OnInit {
  data?: PmDashboard;
  loading = true;
  error = '';
  onboardingDashboard?: OnboardingDashboard;
  onboardingState?: OnboardingLoginState;
  readonly today = new Date();

  constructor(
    private api: ProjectManagementService,
    private onboardingApi: EmployeeOnboardingService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loadOnboardingSummary();
    this.loading = true;
    this.error = '';
    this.api.dashboard().subscribe({
      next: (value) => (this.data = value),
      error: (e) => {
        this.error = e?.error?.message || e?.message || 'Unable to load dashboard.';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }

  get role(): string {
    return this.auth.getCurrentUser()?.role || '';
  }
  get name(): string {
    return this.auth.getCurrentUser()?.name || 'Team Member';
  }
  get isSuperAdmin(): boolean {
    return this.role.toLowerCase() === 'superadmin';
  }
  get isAdminLike(): boolean {
    return ['admin', 'superadmin'].includes(this.role.toLowerCase());
  }
  get isEmployee(): boolean {
    return this.role.toLowerCase() === 'employee';
  }

  get attentionCount(): number {
    if (!this.data) return 0;
    const s = this.data.summary;
    return (
      s.quotationsPendingApproval +
      s.projectsUnassigned +
      s.activitiesOverdue +
      s.followUpsDue +
      s.projectsPendingClosure
    );
  }

  get deliveryHealth(): number {
    if (!this.data) return 100;
    const active = Math.max(0, this.data.summary.activeProjects);
    const delayed = Math.max(0, this.data.summary.delayedProjects);
    if (!active) return delayed ? 0 : 100;
    return Math.max(0, Math.min(100, Math.round(100 - (delayed / active) * 100)));
  }

  get executionRate(): number {
    if (!this.data) return 100;
    const s = this.data.summary;
    const total = s.activitiesCompleted + s.activitiesDueToday + s.activitiesUpcoming + s.activitiesOverdue;
    if (!total) return 100;
    return Math.max(0, Math.min(100, Math.round((s.activitiesCompleted / total) * 100)));
  }

  get openActivityCount(): number {
    if (!this.data) return 0;
    const s = this.data.summary;
    return s.activitiesDueToday + s.activitiesUpcoming + s.activitiesOverdue;
  }

  get pipelineCount(): number {
    if (!this.data) return 0;
    const s = this.data.summary;
    return s.newEnquiries + s.quotationsUnderPreparation + s.quotationsPendingApproval + s.quotationsSent;
  }

  loadOnboardingSummary(): void {
    if (this.isAdminLike) {
      this.onboardingApi.dashboard().subscribe({
        next: (value) => (this.onboardingDashboard = value),
        error: () => (this.onboardingDashboard = undefined),
      });
      return;
    }

    if (this.isEmployee) {
      this.onboardingApi.loginState().subscribe({
        next: (value) => (this.onboardingState = value),
        error: () => (this.onboardingState = undefined),
      });
    }
  }

  badge(status: string): string {
    const value = (status || '').toLowerCase();
    if (value.includes('closed') || value.includes('complete') || value.includes('approved'))
      return 'pm-badge pm-badge--ok';
    if (value.includes('delay') || value.includes('overdue') || value.includes('reject'))
      return 'pm-badge pm-badge--danger';
    if (value.includes('pending') || value.includes('progress') || value.includes('due'))
      return 'pm-badge pm-badge--warn';
    return 'pm-badge';
  }

  activityClass(activity: PmActivity): string {
    if (!activity.plannedCompletionDate) return 'priority-row';
    const due = new Date(activity.plannedCompletionDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (due.getTime() < today.getTime()) return 'priority-row priority-row--danger';
    if (due.getTime() === today.getTime()) return 'priority-row priority-row--warn';
    return 'priority-row priority-row--upcoming';
  }
}
