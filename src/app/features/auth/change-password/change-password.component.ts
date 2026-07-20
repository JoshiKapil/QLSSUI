import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { firstError, passwordMatchValidator, passwordPattern } from '../auth-form.helpers';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  isSubmitting = false;
  firstError = firstError;
  form = this.fb.group(
    {
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: passwordMatchValidator('newPassword', 'confirmPassword') }
  );

  constructor(private fb: FormBuilder, private authService: AuthService, private notifier: NotifierService) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authService
      .changePassword({
        oldPassword: this.form.value.oldPassword || '',
        newPassword: this.form.value.newPassword || '',
        confirmPassword: this.form.value.confirmPassword || ''
      })
      .subscribe({
        next: () => this.notifier.successToastr('Password changed successfully.'),
        complete: () => {
          this.form.reset();
          this.isSubmitting = false;
        }
      });
  }
}
