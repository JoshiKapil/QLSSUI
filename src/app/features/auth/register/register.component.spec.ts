import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let notifier: jasmine.SpyObj<NotifierService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['register']);
    notifier = jasmine.createSpyObj<NotifierService>('NotifierService', ['successToastr']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NotifierService, useValue: notifier },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates and enforces password match validation', () => {
    component.form.patchValue({ password: 'abc123', confirmPassword: 'abc124' });

    expect(component).toBeTruthy();
    expect(component.form.errors).toEqual({ passwordMismatch: true });
  });

  it('submits valid registration and navigates to login', () => {
    authService.register.and.returnValue(of({ id: 1 } as any));
    component.form.patchValue({
      name: 'New User',
      email: 'new@example.com',
      password: 'abc123',
      confirmPassword: 'abc123',
      phone: '9876543210',
      address: 'Main Street',
      role: 'User'
    });

    component.submit();

    expect(authService.register).toHaveBeenCalled();
    expect(notifier.successToastr).toHaveBeenCalledWith('Registration completed. Please login.');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('shows registration errors without navigating', () => {
    authService.register.and.returnValue(throwError(() => new Error('Email already exists.')));
    component.form.patchValue({
      name: 'New User',
      email: 'new@example.com',
      password: 'abc123',
      confirmPassword: 'abc123',
      phone: '9876543210',
      address: 'Main Street',
      role: 'User'
    });

    component.submit();

    expect(component.errorMessage).toBe('Email already exists.');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
