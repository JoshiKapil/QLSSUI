import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthResponse, RegisterRequest, User } from '../models/auth.models';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  const user: User = {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '1234567890',
    address: 'Main Street',
    role: 'Admin',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01'
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('clears malformed stored-user values instead of throwing', () => {
    localStorage.setItem('qlss_auth_user', 'undefined');

    expect((service as any).readStoredUser()).toBeNull();
    expect(localStorage.getItem('qlss_auth_user')).toBeNull();
  });
  it('logs in through API and stores remembered sessions in localStorage', () => {
    const response: AuthResponse = {
      token: 'token-1',
      expiresAt: new Date(Date.now() + 100000).toISOString(),
      user
    };

    service.login({ email: user.email, password: 'abc123', rememberMe: true }).subscribe((result) => {
      expect(result).toEqual(response);
      expect(localStorage.getItem('qlss_auth_token')).toBe('token-1');
      expect(service.isLoggedIn()).toBeTrue();
      expect(service.isAdmin()).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: user.email, password: 'abc123', rememberMe: true });
    req.flush({ success: true, data: response });
  });

  it('does not fall back to browser-local users when login API fails', () => {
    localStorage.setItem('qlss_registered_users', JSON.stringify([{ user, password: 'abc123' }]));
    let status = 0;

    service.login({ email: 'ADMIN@example.com', password: 'abc123', rememberMe: false }).subscribe({
      error: (error) => status = error.status
    });

    httpMock.expectOne(`${environment.apiBaseUrl}/Auth/login`).flush(null, { status: 500, statusText: 'Server Error' });
    expect(status).toBe(500);
    expect(sessionStorage.getItem('qlss_auth_token')).toBeNull();
  });

  it('registers only through the API', () => {
    const request: RegisterRequest = {
      name: user.name,
      email: user.email,
      password: 'abc123',
      phone: user.phone,
      address: user.address,
      role: 'User',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    service.register(request).subscribe((result) => expect(result).toEqual({ ...user, role: 'User' }));

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush({ ...user, role: 'User' });

    expect(localStorage.getItem('qlss_registered_users')).toBeNull();

  });

  it('rotates and stores refresh tokens through the API', () => {
    const refreshed: AuthResponse = {
      token: 'access-token-2',
      expiresAtUtc: new Date(Date.now() + 60_000).toISOString(),
      refreshToken: 'refresh-token-2',
      refreshTokenExpiresAtUtc: new Date(Date.now() + 86_400_000).toISOString(),
      user
    };
    localStorage.setItem('qlss_auth_token', 'access-token-1');
    localStorage.setItem('qlss_auth_refresh_token', 'refresh-token-1');

    service.refreshAccessToken().subscribe((token) => expect(token).toBe('access-token-2'));

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Auth/refresh`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ refreshToken: 'refresh-token-1' });
    req.flush({ success: true, data: refreshed });

    expect(localStorage.getItem('qlss_auth_token')).toBe('access-token-2');
    expect(localStorage.getItem('qlss_auth_refresh_token')).toBe('refresh-token-2');
    expect(service.isLoggedIn()).toBeTrue();
  });
  it('updates profile through the user API', () => {
    localStorage.setItem('qlss_auth_token', 'token-1');
    localStorage.setItem('qlss_auth_user', JSON.stringify(user));
    service = TestBed.inject(AuthService);

    service.updateProfile({ name: 'Updated' }).subscribe((updated) => {
      expect(updated.name).toBe('Updated');
      expect(JSON.parse(localStorage.getItem('qlss_auth_user') || '{}').name).toBe('Updated');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/User/profile`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true, data: { ...user, name: 'Updated' } });
  });

  it('checks email existence and logs out from both storages', () => {
    service.emailExists('admin@example.com').subscribe((exists) => expect(exists).toBeTrue());
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Auth/email-exists?email=admin@example.com`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, data: true });

    localStorage.setItem('qlss_auth_token', 'local');
    sessionStorage.setItem('qlss_auth_token', 'session');
    service.logout();

    expect(localStorage.getItem('qlss_auth_token')).toBeNull();
    expect(sessionStorage.getItem('qlss_auth_token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
