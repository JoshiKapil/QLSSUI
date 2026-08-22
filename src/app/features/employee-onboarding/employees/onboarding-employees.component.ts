import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { OnboardingDepartment, OnboardingEnrollmentDetail, OnboardingEnrollmentSummary, OnboardingPlan, OnboardingUserLookup } from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';

@Component({ selector: 'app-onboarding-employees', templateUrl: './onboarding-employees.component.html', styleUrls: ['./onboarding-employees.component.scss'] })
export class OnboardingEmployeesComponent implements OnInit {
  employees: OnboardingUserLookup[] = [];
  departments: OnboardingDepartment[] = [];
  plans: OnboardingPlan[] = [];
  enrollments: OnboardingEnrollmentSummary[] = [];
  selectedUserId: number | null = null;
  selectedDepartmentId: number | null = null;
  completionDays = 7;
  saving = false;
  detail?: OnboardingEnrollmentDetail;

  constructor(private api: EmployeeOnboardingService, private notifier: NotifierService) {}
  ngOnInit(): void { this.load(); }
  load(): void {
    this.api.eligibleEmployees().subscribe(rows => this.employees = rows);
    this.api.departments().subscribe(rows => this.departments = rows.filter(x => x.isActive));
    this.api.assignmentPlans().subscribe(rows => { this.plans = rows; this.departmentChanged(); });
    this.api.enrollments().subscribe(rows => this.enrollments = rows);
  }



  get assignmentPreview(): Array<{ videoId: number; videoTitle: string; sourceScope: string; minimumWatchPercent: number; passingPercent: number; mustPassAssignment: boolean }> {
    const defaultPlan = this.plans.find(plan => plan.isActive && plan.planStatus === 'Published' && plan.isDefault && !plan.departmentId);
    const departmentPlan = this.selectedDepartmentId
      ? this.plans.find(plan => plan.isActive && plan.planStatus === 'Published' && !plan.isDefault && plan.departmentId === this.selectedDepartmentId)
      : undefined;

    const departmentVideoIds = new Set((departmentPlan?.items || []).filter(item => item.isActive).map(item => item.videoId));
    const commonItems = (defaultPlan?.items || [])
      .filter(item => item.isActive && !departmentVideoIds.has(item.videoId))
      .sort((a, b) => a.sequenceNo - b.sequenceNo)
      .map(item => ({ ...item, sourceScope: 'Default / Common' }));

    const departmentItems = (departmentPlan?.items || [])
      .filter(item => item.isActive)
      .sort((a, b) => a.sequenceNo - b.sequenceNo)
      .map(item => ({ ...item, sourceScope: 'Department' }));

    return [...commonItems, ...departmentItems];
  }

  get selectedEmployeeName(): string {
    return this.employees.find(x => x.id === this.selectedUserId)?.name || 'Selected employee';
  }

  departmentChanged(): void {
    const departmentPlan = this.plans.find(plan => plan.departmentId === this.selectedDepartmentId && !plan.isDefault);
    const defaultPlan = this.plans.find(plan => plan.isDefault && !plan.departmentId);
    this.completionDays = departmentPlan?.completionDays || defaultPlan?.completionDays || 7;
  }
  showDetail(row: OnboardingEnrollmentSummary): void { this.api.enrollmentDetail(row.enrollmentId).subscribe(detail => this.detail = detail); }
  closeDetail(): void { this.detail = undefined; }
  assign(): void {
    if (!this.selectedUserId) { this.notifier.warningToastr('Select an employee.'); return; }
    this.saving = true;
    this.api.enroll({ userId: this.selectedUserId, departmentId: this.selectedDepartmentId, completionDays: this.completionDays }).subscribe({
      next: () => { this.notifier.successToastr('Mandatory onboarding assigned.'); this.selectedUserId = null; this.selectedDepartmentId = null; this.completionDays = 7; this.saving = false; this.load(); },
      error: err => { this.saving = false; this.notifier.warningToastr(err?.error?.message || 'Unable to assign onboarding.'); }
    });
  }
}
