import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { firstError, passwordMatchValidator, passwordPattern, phonePattern } from '../auth-form.helpers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isSubmitting = false;
  errorMessage = '';
  firstError = firstError;

  form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(phonePattern)]],
      address: ['', Validators.required],
      role: ['User', Validators.required],
      createdAt: [new Date().toISOString(), Validators.required],
      updatedAt: [new Date().toISOString(), Validators.required],
    },
    { validators: passwordMatchValidator() },
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    this.isSubmitting = true;
    this.authService
      .register({
        name: value.name || '',
        email: value.email || '',
        password: value.password || '',
        phone: value.phone || '',
        address: value.address || '',
        role: value.role || 'User',
        createdAt: value.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .subscribe({
        next: () => {
          this.notifier.successToastr('Registration completed. Please login.');
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.route.snapshot.queryParamMap.get('returnUrl') } });
        },
        error: (error) => {
          this.errorMessage = error?.message || 'Registration failed.';
          this.isSubmitting = false;
        },
        complete: () => (this.isSubmitting = false),
      });
  }
}
