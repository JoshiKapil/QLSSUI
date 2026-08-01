import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
export const phonePattern = /^[0-9+\-\s()]{7,20}$/;

export function passwordMatchValidator(passwordKey = 'password', confirmKey = 'confirmPassword'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmKey)?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  };
}

export function firstError(control: AbstractControl | null, label: string): string {
  if (!control || !control.touched || !control.errors) {
    return '';
  }

  if (control.errors['required']) {
    return `${label} is required.`;
  }
  if (control.errors['email']) {
    return 'Enter a valid email address.';
  }
  if (control.errors['pattern']) {
    return `${label} format is invalid.`;
  }
  if (control.errors['minlength']) {
    return `${label} must be at least ${control.errors['minlength'].requiredLength} characters.`;
  }
  return `${label} is invalid.`;
}
