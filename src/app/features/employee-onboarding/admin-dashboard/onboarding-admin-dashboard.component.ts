import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OnboardingDashboard, OnboardingEnrollmentSummary } from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-onboarding-admin-dashboard',
  templateUrl: './onboarding-admin-dashboard.component.html',
  styleUrls: ['./onboarding-admin-dashboard.component.scss'],
})
export class OnboardingAdminDashboardComponent implements OnInit {
  readonly enrollmentsPage = new ListPage('Enrollments');
  reloadenrollmentsPage(): void { this.reload(); }

  dashboard: OnboardingDashboard = {
    activeEmployees: 0,
    dueSoon: 0,
    grace: 0,
    blocked: 0,
    completed: 0,
    pendingAccessRequests: 0,
  };
  enrollments: OnboardingEnrollmentSummary[] = [];
  loading = true;
  constructor(
    private api: EmployeeOnboardingService,
    private auth: AuthService,
  ) {}
  get isSuperAdmin(): boolean {
    return this.auth.hasRole('SuperAdmin');
  }
  ngOnInit(): void {
    this.reload();
  }
  reload(): void {
    this.loading = true;
    forkJoin({
      dashboard: this.api.dashboard().pipe(catchError(() => of(this.dashboard))),
      enrollments: this.api.enrollments(this.enrollmentsPage).pipe(catchError(() => of(this.enrollments))),
    }).subscribe({
      next: (data) => {
        this.dashboard = data.dashboard;
        this.enrollments = data.enrollments;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
  statusClass(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-');
  }
}
