import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, ChangePasswordRequest, LoginRequest, RegisterRequest, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/Auth`;
  private readonly tokenKey = 'qlss_auth_token';
  private readonly userKey = 'qlss_auth_user';
  private readonly expiryKey = 'qlss_auth_expires_at';
  private readonly localUsersKey = 'qlss_registered_users';
  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.readStoredUser());
  // TEMPORARY: Dummy admin fallback for local/demo use when the API is unavailable.
  // Remove this block entirely once the real API is available.
  private readonly temporaryAdminEmail = 'admin@qlss.com';
  private readonly temporaryAdminPassword = 'Admin@123';
  private readonly temporaryAdminRole = 'Admin';

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => this.storeSession(response, request.rememberMe)),
      catchError(() => this.handleLoginFallback(request))
    );
  }

  register(request: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, request).pipe(
      tap((user) => this.saveLocalUser({ ...user, role: user.role || request.role }, request.passwordHash)),
      catchError(() => this.registerLocalUser(request))
    );
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, { email }).pipe(catchError(() => of(void 0)));
  }

  resetPassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, request).pipe(catchError(() => of(void 0)));
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/change-password`, request).pipe(catchError(() => of(void 0)));
  }

  updateProfile(profile: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, profile).pipe(
      tap((user) => this.updateStoredUser(user)),
      catchError(() => {
        const user = { ...this.currentUserSubject.value, ...profile, updatedAt: new Date().toISOString() } as User;
        this.updateStoredUser(user);
        return of(user);
      })
    );
  }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/email-exists`, { params: { email } }).pipe(
      catchError(() => of(this.getLocalUsers().some((entry) => entry.user.email.toLowerCase() === email.toLowerCase())))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.expiryKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.expiryKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiry = this.getExpiry();
    return !!token && (!expiry || new Date(expiry).getTime() > Date.now());
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'Admin';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private handleLoginFallback(request: LoginRequest): Observable<AuthResponse> {
    // TEMPORARY: Try the dummy admin fallback before falling back to local users.
    const temporaryAdminResponse = this.tryTemporaryAdminLogin(request);
    if (temporaryAdminResponse) {
      return of(temporaryAdminResponse);
    }

    return this.loginFromLocalUsers(request);
  }

  private tryTemporaryAdminLogin(request: LoginRequest): AuthResponse | null {
    // TEMPORARY: Dummy admin credentials used only until the API is available.
    const isTemporaryAdminLogin = request.email.trim().toLowerCase() === this.temporaryAdminEmail.toLowerCase()
      && request.password === this.temporaryAdminPassword;

    if (!isTemporaryAdminLogin) {
      return null;
    }

    const response: AuthResponse = {
      token: `temporary-admin-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      user: {
        id: 'temporary-admin',
        name: 'Temporary Admin',
        email: this.temporaryAdminEmail,
        role: this.temporaryAdminRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    this.storeSession(response, request.rememberMe);
    return response;
  }

  private loginFromLocalUsers(request: LoginRequest): Observable<AuthResponse> {
    const entry = this.getLocalUsers().find(
      (item) => item.user.email.toLowerCase() === request.email.toLowerCase() && item.password === request.password
    );

    if (!entry) {
      return throwError(() => new Error('Invalid email or password.'));
    }

    const response: AuthResponse = {
      token: `local-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      user: entry.user
    };
    this.storeSession(response, request.rememberMe);
    return of(response);
  }

  private registerLocalUser(request: RegisterRequest): Observable<User> {
    if (this.getLocalUsers().some((entry) => entry.user.email.toLowerCase() === request.email.toLowerCase())) {
      return throwError(() => new Error('Email already exists.'));
    }

    const user: User = {
      id: Date.now(),
      name: request.name,
      email: request.email,
      phone: request.phone,
      address: request.address,
      role: request.role,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt
    };
    this.saveLocalUser(user, request.passwordHash);
    return of(user);
  }

  private storeSession(response: AuthResponse, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.tokenKey, response.token);
    storage.setItem(this.userKey, JSON.stringify(response.user));
    if (response.expiresAt) {
      storage.setItem(this.expiryKey, response.expiresAt);
    }
    this.currentUserSubject.next(response.user);
  }

  private updateStoredUser(user: User): void {
    const storage = localStorage.getItem(this.tokenKey) ? localStorage : sessionStorage;
    storage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  private getExpiry(): string | null {
    return localStorage.getItem(this.expiryKey) || sessionStorage.getItem(this.expiryKey);
  }

  private getLocalUsers(): Array<{ user: User; password: string }> {
    const raw = localStorage.getItem(this.localUsersKey);
    return raw ? JSON.parse(raw) : [];
  }

  private saveLocalUser(user: User, password: string): void {
    const users = this.getLocalUsers().filter((entry) => entry.user.email.toLowerCase() !== user.email.toLowerCase());
    users.push({ user, password });
    localStorage.setItem(this.localUsersKey, JSON.stringify(users));
  }
}

