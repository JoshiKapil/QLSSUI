import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { OnboardingAccessRequest } from '../models/employee-onboarding.models';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';
@Component({
  selector: 'app-onboarding-access-requests',
  templateUrl: './onboarding-access-requests.component.html',
  styleUrls: ['./onboarding-access-requests.component.scss'],
})
export class OnboardingAccessRequestsComponent implements OnInit {
  readonly accessRequestsPage = new ListPage('Access requests');
  reloadaccessRequestsPage(): void { this.load(); }

  rows: OnboardingAccessRequest[] = [];
  selected?: OnboardingAccessRequest;
  extensionDays = 1;
  remark = '';
  saving = false;
  loading = false;
  filter = 'Pending';
  constructor(
    private api: EmployeeOnboardingService,
    private notifier: NotifierService,
  ) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.api.accessRequests(this.filter || undefined, this.accessRequestsPage).subscribe({
      next: (rows) => {
        this.rows = rows;
        this.loading = false;
        if (this.selected && !rows.some((x) => x.accessRequestId === this.selected!.accessRequestId))
          this.selected = undefined;
      },
      error: () => {
        this.rows = [];
        this.loading = false;
        this.notifier.warningToastr('Unable to load access requests.');
      },
    });
  }
  select(row: OnboardingAccessRequest) {
    this.selected = row;
    this.extensionDays = 1;
    this.remark = '';
  }
  decide(decision: 'Approved' | 'Rejected') {
    if (!this.selected || this.saving) return;
    this.saving = true;
    this.api.decideAccessRequest(this.selected.accessRequestId, decision, this.extensionDays, this.remark).subscribe({
      next: () => {
        this.notifier.successToastr(`Access request ${decision.toLowerCase()}.`);
        this.saving = false;
        this.selected = undefined;
        this.load();
      },
      error: (e) => {
        this.saving = false;
        this.notifier.warningToastr(e?.error?.message || 'Unable to review access request.');
      },
    });
  }
}
