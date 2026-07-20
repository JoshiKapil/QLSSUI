import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { NotifierService } from '../../core/services/notifier.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

describe('remaining auth components', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let notifier: jasmine.SpyObj<NotifierService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'changePassword',
      'forgotPassword',
      'resetPassword',
      'updateProfile',
      'getCurrentUser'
    ]);
    notifier = jasmine.createSpyObj<NotifierService>('NotifierService', ['successToastr']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authService.changePassword.and.returnValue(of(void 0));
    authService.forgotPassword.and.returnValue(of(void 0));
    authService.resetPassword.and.returnValue(of(void 0));
    authService.updateProfile.and.returnValue(of({} as any));
    authService.getCurrentUser.and.returnValue({
      id: 1,
      name: 'User',
      email: 'user@example.com',
      phone: '9876543210',
      address: 'Main Street',
      role: 'User',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01'
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        ChangePasswordComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        EditProfileComponent
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NotifierService, useValue: notifier },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: { get: () => 'token-1' } } }
        }
      ]
    }).compileComponents();
  });

  function create<T>(component: new (...args: any[]) => T): ComponentFixture<T> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  }

  it('changes password only when form is valid', () => {
    const fixture = create(ChangePasswordComponent);
    const component = fixture.componentInstance;

    component.submit();
    expect(authService.changePassword).not.toHaveBeenCalled();

    component.form.setValue({ oldPassword: 'old123', newPassword: 'new123', confirmPassword: 'new123' });
    component.submit();

    expect(authService.changePassword).toHaveBeenCalledWith({
      oldPassword: 'old123',
      newPassword: 'new123',
      confirmPassword: 'new123'
    });
    expect(notifier.successToastr).toHaveBeenCalledWith('Password changed successfully.');
    expect(component.isSubmitting).toBeFalse();
  });

  it('submits forgot password email and clears loading flag', () => {
    const fixture = create(ForgotPasswordComponent);
    const component = fixture.componentInstance;
    component.form.setValue({ email: 'user@example.com' });

    component.submit();

    expect(authService.forgotPassword).toHaveBeenCalledWith('user@example.com');
    expect(notifier.successToastr).toHaveBeenCalledWith('Password reset instructions sent if the account exists.');
    expect(component.isSubmitting).toBeFalse();
  });

  it('resets password with route token and navigates to login', () => {
    const fixture = create(ResetPasswordComponent);
    const component = fixture.componentInstance;
    component.form.patchValue({ newPassword: 'new123', confirmPassword: 'new123' });

    component.submit();

    expect(authService.resetPassword).toHaveBeenCalledWith({
      token: 'token-1',
      newPassword: 'new123',
      confirmPassword: 'new123'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('updates profile from current user values', () => {
    const fixture = create(EditProfileComponent);
    const component = fixture.componentInstance;

    expect(component.form.value.email).toBe('user@example.com');
    component.form.patchValue({ name: 'Updated User' });
    component.submit();

    expect(authService.updateProfile).toHaveBeenCalled();
    expect(notifier.successToastr).toHaveBeenCalledWith('Profile updated successfully.');
  });
});
