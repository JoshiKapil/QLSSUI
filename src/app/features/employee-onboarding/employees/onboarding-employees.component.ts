import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NotifierService } from '../../../core/services/notifier.service';
import {
  OnboardingDepartment,
  OnboardingEnrollmentDetail,
  OnboardingEnrollmentSummary,
  OnboardingUserLookup,
} from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';

@Component({
  selector: 'app-onboarding-employees',
  templateUrl: './onboarding-employees.component.html',
  styleUrls: ['./onboarding-employees.component.scss'],
})
export class OnboardingEmployeesComponent implements OnInit {
  readonly eligibleEmployeesPage = new ListPage('Employee selection');
  reloadeligibleEmployeesPage(): void { this.load(); }
  readonly departmentsPage = new ListPage('Departments');
  reloaddepartmentsPage(): void { this.load(); }
  readonly enrollmentsPage = new ListPage('Enrollments');
  reloadenrollmentsPage(): void { this.load(); }

  employees: OnboardingUserLookup[] = [];
  departments: OnboardingDepartment[] = [];
  trainings: Array<{trainingId:number; trainingName:string}> = [];
  readonly trainingsPage = new ListPage('Training selection');
  enrollments: OnboardingEnrollmentSummary[] = [];
  preview: any[] = [];
  selectedUserId: number | null = null;
  selectedDepartmentId: number | null = null;
  selectedTrainingId: number | null = null;
  completionDays = 7;
  loading = false;
  saving = false;
  detail?: OnboardingEnrollmentDetail;
  constructor(
    private api: EmployeeOnboardingService,
    private notifier: NotifierService,
  ) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    forkJoin({
      employees: this.api.eligibleEmployees(this.eligibleEmployeesPage),
      departments: this.api.departments(this.departmentsPage),
      trainings: this.api.trainingOptions(this.trainingsPage),
      enrollments: this.api.enrollments(this.enrollmentsPage),
    }).subscribe({
      next: (r) => {
        this.employees = r.employees;
        this.departments = r.departments.filter((x) => x.isActive);
        this.trainings = (r.trainings || []).filter((t) => t.trainingId !== undefined && t.trainingId !== null);
        this.enrollments = r.enrollments;
        this.loading = false;
        this.refreshPreview();
      },
      error: () => {
        this.loading = false;
        this.notifier.warningToastr('Unable to load onboarding assignment data.');
      },
    });
  }
  scopeChanged() {
    this.refreshPreview();
  }
  refreshPreview() {
    this.api
      .mappingPreview(this.selectedDepartmentId, this.selectedTrainingId)
      .subscribe({ next: (x) => (this.preview = x || []), error: () => (this.preview = []) });
  }
  trainingValue(t: {trainingId:number}): number {
    return Number(t.trainingId);
  }
  get selectedEmployeeName() {
    return this.employees.find((x) => x.id === this.selectedUserId)?.name || 'Selected employee';
  }
  get selectionScope() {
    if (this.selectedTrainingId && this.selectedDepartmentId) return 'Training + Department';
    if (this.selectedTrainingId) return 'Training · All departments';
    if (this.selectedDepartmentId) return 'Department · No training required';
    return 'Common / All employees';
  }
  showDetail(row: OnboardingEnrollmentSummary) {
    this.api.enrollmentDetail(row.enrollmentId).subscribe((d) => (this.detail = d));
  }
  closeDetail() {
    this.detail = undefined;
  }
  assign() {
    if (!this.selectedUserId) {
      this.notifier.warningToastr('Select an employee.');
      return;
    }
    if (!this.preview.length) {
      this.notifier.warningToastr('No published onboarding content resolves for this selection.');
      return;
    }
    this.saving = true;
    this.api
      .enroll({
        userId: this.selectedUserId,
        departmentId: this.selectedDepartmentId,
        trainingId: this.selectedTrainingId,
        completionDays: this.completionDays,
      })
      .subscribe({
        next: () => {
          this.notifier.successToastr('Mandatory onboarding assigned.');
          this.selectedUserId = null;
          this.selectedDepartmentId = null;
          this.selectedTrainingId = null;
          this.completionDays = 7;
          this.saving = false;
          this.load();
        },
        error: (e) => {
          this.saving = false;
          this.notifier.warningToastr(e?.error?.message || 'Unable to assign onboarding.');
        },
      });
  }
}
