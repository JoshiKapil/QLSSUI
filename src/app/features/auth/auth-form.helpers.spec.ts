import { FormControl, FormGroup } from '@angular/forms';
import { firstError, passwordMatchValidator, passwordPattern, phonePattern } from './auth-form.helpers';

describe('auth form helpers', () => {
  it('validates password strength and phone format', () => {
    expect(passwordPattern.test('abc123')).toBeTrue();
    expect(passwordPattern.test('abcdef')).toBeFalse();
    expect(phonePattern.test('+91 98765 43210')).toBeTrue();
    expect(phonePattern.test('bad-phone')).toBeFalse();
  });

  it('returns password mismatch errors when confirmation differs', () => {
    const form = new FormGroup({
      password: new FormControl('abc123'),
      confirmPassword: new FormControl('abc124')
    });

    expect(passwordMatchValidator()(form)).toEqual({ passwordMismatch: true });
  });

  it('returns readable first validation messages for touched controls', () => {
    const control = new FormControl('');
    control.setErrors({ required: true });
    control.markAsTouched();

    expect(firstError(control, 'Email')).toBe('Email is required.');
  });
});
