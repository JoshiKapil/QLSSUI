import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { firstError, passwordMatchValidator, passwordPattern } from '../auth-form.helpers';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  isSubmitting = false;
  firstError = firstError;
  form = this.fb.group(
    {
      token: [this.route.snapshot.queryParamMap.get('token')],
      newPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: passwordMatchValidator('newPassword', 'confirmPassword') }
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authService
      .resetPassword({
        token: this.form.value.token,
        newPassword: this.form.value.newPassword || '',
        confirmPassword: this.form.value.confirmPassword || ''
      })
      .subscribe({
        next: () => {
          this.notifier.successToastr('Password reset successfully.');
          this.router.navigate(['/login']);
        },
        complete: () => (this.isSubmitting = false)
      });
  }
}
