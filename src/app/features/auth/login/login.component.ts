import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { firstError } from '../auth-form.helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitting = false;
  errorMessage = '';
  firstError = firstError;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [true]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const value = this.form.value;   
    this.authService
      .login({
        email: value.email || '',
        password: value.password || '',
        rememberMe: !!value.rememberMe
      })
      .subscribe({
        next: () => {
          this.notifier.successToastr('Logged in successfully.');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid email or password.';
          this.isSubmitting = false;
        },
        complete: () => (this.isSubmitting = false)
      });
  }
}
