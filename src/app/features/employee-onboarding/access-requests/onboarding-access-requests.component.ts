import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { OnboardingAccessRequest } from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';

@Component({ selector: 'app-onboarding-access-requests', templateUrl: './onboarding-access-requests.component.html', styleUrls: ['./onboarding-access-requests.component.scss'] })
export class OnboardingAccessRequestsComponent implements OnInit {
  rows: OnboardingAccessRequest[] = [];
  selected?: OnboardingAccessRequest;
  extensionDays = 1;
  remark = '';
  saving = false;
  filter = 'Pending';
  constructor(private api: EmployeeOnboardingService, private notifier: NotifierService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.api.accessRequests(this.filter || undefined).subscribe(rows => this.rows = rows); }
  select(row: OnboardingAccessRequest): void { this.selected = row; this.extensionDays = 1; this.remark = ''; }
  decide(decision: 'Approved' | 'Rejected'): void {
    if (!this.selected || this.saving) return;
    this.saving = true;
    this.api.decideAccessRequest(this.selected.accessRequestId, decision, this.extensionDays, this.remark).subscribe({
      next: () => { this.notifier.successToastr(`Access request ${decision.toLowerCase()}.`); this.saving = false; this.selected = undefined; this.load(); },
      error: err => { this.saving = false; this.notifier.warningToastr(err?.error?.message || 'Unable to review access request.'); }
    });
  }
}
