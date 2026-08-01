import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { finalize, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, unwrapApiResponse } from '../models/api-response.model';
import { AuthResponse, ChangePasswordRequest, LoginRequest, RegisterRequest, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/Auth`;
  private readonly userApiUrl = `${environment.apiBaseUrl}/User`;
  private readonly tokenKey = 'qlss_auth_token';
  private readonly userKey = 'qlss_auth_user';
  private readonly expiryKey = 'qlss_auth_expires_at';
  private readonly refreshTokenKey = 'qlss_auth_refresh_token';
  private readonly refreshExpiryKey = 'qlss_auth_refresh_expires_at';
  private refreshRequest$: Observable<string> | null = null;
  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.readStoredUser());

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.clearLegacyLocalAuth();
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse> | AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      map((response) => unwrapApiResponse<AuthResponse>(response)),
      tap((response) => this.storeSession(response, request.rememberMe))
    );
  }

  refreshAccessToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token is available.'));
    }

    if (this.refreshRequest$) {
      return this.refreshRequest$;
    }

    this.refreshRequest$ = this.http
      .post<ApiResponse<AuthResponse> | AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken })
      .pipe(
        map((response) => unwrapApiResponse<AuthResponse>(response)),
        tap((response) => this.storeRefreshedSession(response)),
        map((response) => response.token),
        finalize(() => (this.refreshRequest$ = null)),
        shareReplay({ bufferSize: 1, refCount: false })
      );

    return this.refreshRequest$;
  }
  register(request: RegisterRequest): Observable<User> {
    return this.http.post<ApiResponse<User> | User>(`${this.apiUrl}/register`, request).pipe(
      map((response) => unwrapApiResponse<User>(response))
    );
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, request);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.userApiUrl}/change-password`, request);
  }

  updateProfile(profile: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User> | User>(`${this.userApiUrl}/profile`, profile).pipe(
      map((response) => unwrapApiResponse<User>(response)),
      tap((user) => this.updateStoredUser(user))
    );
  }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<ApiResponse<boolean> | boolean>(`${this.apiUrl}/email-exists`, { params: { email } }).pipe(
      map((response) => unwrapApiResponse<boolean>(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.expiryKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.refreshExpiryKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.expiryKey);
    sessionStorage.removeItem(this.refreshTokenKey);
    sessionStorage.removeItem(this.refreshExpiryKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const accessTokenIsValid = this.isServerAuthenticated() && this.isFutureOrMissing(this.getExpiry());
    const refreshTokenIsValid = !!this.getRefreshToken() && this.isFuture(this.getRefreshExpiry());
    return accessTokenIsValid || refreshTokenIsValid;
  }

  isAdmin(): boolean {
    return (this.currentUserSubject.value?.role || '').trim().toLowerCase() === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  isServerAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !token.startsWith('local-') && !token.startsWith('temporary-admin-');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private storeSession(response: AuthResponse, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    const otherStorage = rememberMe ? sessionStorage : localStorage;
    this.clearSessionStorage(otherStorage);
    storage.setItem(this.tokenKey, response.token);
    storage.setItem(this.userKey, JSON.stringify(response.user));

    const accessExpiry = response.expiresAtUtc || response.expiresAt;
    if (accessExpiry) {
      storage.setItem(this.expiryKey, accessExpiry);
    }
    if (response.refreshToken) {
      storage.setItem(this.refreshTokenKey, response.refreshToken);
    }
    if (response.refreshTokenExpiresAtUtc) {
      storage.setItem(this.refreshExpiryKey, response.refreshTokenExpiresAtUtc);
    }
    this.currentUserSubject.next(response.user);
  }

  private storeRefreshedSession(response: AuthResponse): void {
    const rememberMe = !!localStorage.getItem(this.refreshTokenKey) || !!localStorage.getItem(this.tokenKey);
    this.storeSession(response, rememberMe);
  }

  private updateStoredUser(user: User): void {
    const storage = localStorage.getItem(this.tokenKey) ? localStorage : sessionStorage;
    storage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
    if (!raw || raw === 'undefined' || raw === 'null') {
      this.clearStoredUser();
      return null;
    }

    try {
      const user = JSON.parse(raw) as User | null;
      if (!user || typeof user !== 'object' || !user.email) {
        this.clearStoredUser();
        return null;
      }
      return user;
    } catch {
      this.clearStoredUser();
      return null;
    }
  }

  private clearStoredUser(): void {
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.userKey);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey) || sessionStorage.getItem(this.refreshTokenKey);
  }

  private getRefreshExpiry(): string | null {
    return localStorage.getItem(this.refreshExpiryKey) || sessionStorage.getItem(this.refreshExpiryKey);
  }

  private isFuture(value: string | null): boolean {
    return !!value && new Date(value).getTime() > Date.now();
  }

  private isFutureOrMissing(value: string | null): boolean {
    return !value || this.isFuture(value);
  }

  private clearSessionStorage(storage: Storage): void {
    storage.removeItem(this.tokenKey);
    storage.removeItem(this.userKey);
    storage.removeItem(this.expiryKey);
    storage.removeItem(this.refreshTokenKey);
    storage.removeItem(this.refreshExpiryKey);
  }
  private getExpiry(): string | null {
    return localStorage.getItem(this.expiryKey) || sessionStorage.getItem(this.expiryKey);
  }

  private clearLegacyLocalAuth(): void {
    localStorage.removeItem('qlss_registered_users');
    const token = this.getToken();
    if (!token || (!token.startsWith('local-') && !token.startsWith('temporary-admin-'))) {
      return;
    }

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.expiryKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.refreshExpiryKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.expiryKey);
    sessionStorage.removeItem(this.refreshTokenKey);
    sessionStorage.removeItem(this.refreshExpiryKey);
    this.currentUserSubject.next(null);
  }

}
