import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { firstError, phonePattern } from '../auth-form.helpers';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  isSubmitting = false;
  firstError = firstError;
  user = this.authService.getCurrentUser();

  form = this.fb.group({
    name: [this.user?.name || '', Validators.required],
    email: [this.user?.email || '', [Validators.required, Validators.email]],
    phone: [this.user?.phone || '', [Validators.required, Validators.pattern(phonePattern)]],
    address: [this.user?.address || '', Validators.required],
    role: [this.user?.role || 'User', Validators.required],
    createdAt: [this.user?.createdAt || new Date().toISOString(), Validators.required],
    updatedAt: [new Date().toISOString(), Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private notifier: NotifierService) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authService.updateProfile({ ...this.user, ...this.form.value, updatedAt: new Date().toISOString() }).subscribe({
      next: () => this.notifier.successToastr('Profile updated successfully.'),
      complete: () => (this.isSubmitting = false)
    });
  }
}
