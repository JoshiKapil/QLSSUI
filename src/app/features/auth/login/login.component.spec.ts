import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let notifier: jasmine.SpyObj<NotifierService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    notifier = jasmine.createSpyObj<NotifierService>('NotifierService', ['successToastr']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NotifierService, useValue: notifier },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates with invalid required fields', () => {
    expect(component).toBeTruthy();
    expect(component.form.invalid).toBeTrue();
  });

  it('marks invalid form as touched without calling login', () => {
    component.submit();

    expect(component.form.get('email')?.touched).toBeTrue();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('submits valid credentials and navigates home', () => {
    authService.login.and.returnValue(of({ token: 't', user: {} as any }));
    component.form.setValue({ email: 'user@example.com', password: 'abc123', rememberMe: true });

    component.submit();

    expect(authService.login).toHaveBeenCalledWith({ email: 'user@example.com', password: 'abc123', rememberMe: true });
    expect(notifier.successToastr).toHaveBeenCalledWith('Logged in successfully.');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isSubmitting).toBeFalse();
  });

  it('shows API error messages', () => {
    authService.login.and.returnValue(throwError(() => new Error('Invalid')));
    component.form.setValue({ email: 'user@example.com', password: 'bad', rememberMe: true });

    component.submit();

    expect(component.errorMessage).toBe('Invalid email or password.');
    expect(component.isSubmitting).toBeFalse();
  });
});
