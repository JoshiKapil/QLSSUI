import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeOnboardingService } from '../services/employee-onboarding.service';

@Component({
  selector: 'app-onboarding-access-request-public',
  templateUrl: './onboarding-access-request-public.component.html',
  styleUrls: ['./onboarding-access-request-public.component.scss'],
})
export class OnboardingAccessRequestPublicComponent implements OnInit {
  email = '';
  password = '';
  reason = '';
  submitting = false;
  submitted = false;
  error = '';
  pendingAlready = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: EmployeeOnboardingService,
  ) {}
  ngOnInit(): void {
    this.email =
      this.route.snapshot.queryParamMap.get('email') || sessionStorage.getItem('qlss_onboarding_blocked_email') || '';
    this.pendingAlready = this.route.snapshot.queryParamMap.get('pending') === '1';
  }
  submit(): void {
    this.error = '';
    if (!this.email || !this.password || this.reason.trim().length < 20) {
      this.error = 'Enter email, password and at least 20 characters explaining why onboarding was not completed.';
      return;
    }
    this.submitting = true;
    this.api.submitPublicAccessRequest(this.email, this.password, this.reason).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        sessionStorage.removeItem('qlss_onboarding_blocked_email');
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.message || 'Access request could not be submitted.';
      },
    });
  }
  goLogin(): void {
    this.router.navigate(['/login']);
  }
}
