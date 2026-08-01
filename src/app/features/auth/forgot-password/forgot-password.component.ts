import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { firstError } from '../auth-form.helpers';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  isSubmitting = false;
  firstError = firstError;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private notifier: NotifierService) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authService.forgotPassword(this.form.value.email || '').subscribe({
      next: () => this.notifier.successToastr('Password reset instructions sent if the account exists.'),
      error: () => {
        this.notifier.warningToastr('Unable to request a password reset. Please try again.');
        this.isSubmitting = false;
      },
      complete: () => (this.isSubmitting = false)
    });
  }
}
