import { Component, OnInit } from '@angular/core';
import { OnboardingDashboard, OnboardingEnrollmentSummary } from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';

@Component({ selector: 'app-onboarding-admin-dashboard', templateUrl: './onboarding-admin-dashboard.component.html', styleUrls: ['./onboarding-admin-dashboard.component.scss'] })
export class OnboardingAdminDashboardComponent implements OnInit {
  dashboard: OnboardingDashboard = { activeEmployees: 0, dueSoon: 0, grace: 0, blocked: 0, completed: 0, pendingAccessRequests: 0 };
  enrollments: OnboardingEnrollmentSummary[] = [];
  loading = true;
  constructor(private api: EmployeeOnboardingService) {}
  ngOnInit(): void { this.reload(); }
  reload(): void {
    this.loading = true;
    this.api.dashboard().subscribe({ next: d => this.dashboard = d });
    this.api.enrollments().subscribe({ next: rows => { this.enrollments = rows; this.loading = false; }, error: () => this.loading = false });
  }
  statusClass(value: string): string { return value.toLowerCase().replace(/\s+/g, '-'); }
}
