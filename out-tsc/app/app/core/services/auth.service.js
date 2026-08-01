import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { unwrapApiResponse } from '../models/api-response.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/router";
export class AuthService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.apiUrl = `${environment.apiBaseUrl}/Auth`;
        this.tokenKey = 'qlss_auth_token';
        this.userKey = 'qlss_auth_user';
        this.expiryKey = 'qlss_auth_expires_at';
        this.refreshTokenKey = 'qlss_auth_refresh_token';
        this.refreshExpiryKey = 'qlss_auth_refresh_expires_at';
        this.refreshRequest$ = null;
        this.currentUserSubject = new BehaviorSubject(this.readStoredUser());
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.clearLegacyLocalAuth();
    }
    login(request) {
        return this.http.post(`${this.apiUrl}/login`, request).pipe(map((response) => unwrapApiResponse(response)), tap((response) => this.storeSession(response, request.rememberMe)));
    }
    refreshAccessToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('No refresh token is available.'));
        }
        if (this.refreshRequest$) {
            return this.refreshRequest$;
        }
        this.refreshRequest$ = this.http
            .post(`${this.apiUrl}/refresh`, { refreshToken })
            .pipe(map((response) => unwrapApiResponse(response)), tap((response) => this.storeRefreshedSession(response)), map((response) => response.token), finalize(() => (this.refreshRequest$ = null)), shareReplay({ bufferSize: 1, refCount: false }));
        return this.refreshRequest$;
    }
    register(request) {
        return this.http.post(`${this.apiUrl}/register`, request).pipe(map((response) => unwrapApiResponse(response)));
    }
    forgotPassword(email) {
        return this.http.post(`${this.apiUrl}/forgot-password`, { email }).pipe(catchError(() => of(void 0)));
    }
    resetPassword(request) {
        return this.http.post(`${this.apiUrl}/reset-password`, request).pipe(catchError(() => of(void 0)));
    }
    changePassword(request) {
        return this.http.post(`${this.apiUrl}/change-password`, request).pipe(catchError(() => of(void 0)));
    }
    updateProfile(profile) {
        return this.http.put(`${this.apiUrl}/profile`, profile).pipe(tap((user) => this.updateStoredUser(user)), catchError(() => {
            const user = Object.assign(Object.assign(Object.assign({}, this.currentUserSubject.value), profile), { updatedAt: new Date().toISOString() });
            this.updateStoredUser(user);
            return of(user);
        }));
    }
    emailExists(email) {
        return this.http.get(`${this.apiUrl}/email-exists`, { params: { email } }).pipe(catchError(() => of(false)));
    }
    logout() {
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
    isLoggedIn() {
        const accessTokenIsValid = this.isServerAuthenticated() && this.isFutureOrMissing(this.getExpiry());
        const refreshTokenIsValid = !!this.getRefreshToken() && this.isFuture(this.getRefreshExpiry());
        return accessTokenIsValid || refreshTokenIsValid;
    }
    isAdmin() {
        var _a;
        return (((_a = this.currentUserSubject.value) === null || _a === void 0 ? void 0 : _a.role) || '').trim().toLowerCase() === 'admin';
    }
    getToken() {
        return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
    }
    isServerAuthenticated() {
        const token = this.getToken();
        return !!token && !token.startsWith('local-') && !token.startsWith('temporary-admin-');
    }
    getCurrentUser() {
        return this.currentUserSubject.value;
    }
    storeSession(response, rememberMe) {
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
    storeRefreshedSession(response) {
        const rememberMe = !!localStorage.getItem(this.refreshTokenKey) || !!localStorage.getItem(this.tokenKey);
        this.storeSession(response, rememberMe);
    }
    updateStoredUser(user) {
        const storage = localStorage.getItem(this.tokenKey) ? localStorage : sessionStorage;
        storage.setItem(this.userKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
    readStoredUser() {
        const raw = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
        if (!raw || raw === 'undefined' || raw === 'null') {
            this.clearStoredUser();
            return null;
        }
        try {
            const user = JSON.parse(raw);
            if (!user || typeof user !== 'object' || !user.email) {
                this.clearStoredUser();
                return null;
            }
            return user;
        }
        catch (_a) {
            this.clearStoredUser();
            return null;
        }
    }
    clearStoredUser() {
        localStorage.removeItem(this.userKey);
        sessionStorage.removeItem(this.userKey);
    }
    getRefreshToken() {
        return localStorage.getItem(this.refreshTokenKey) || sessionStorage.getItem(this.refreshTokenKey);
    }
    getRefreshExpiry() {
        return localStorage.getItem(this.refreshExpiryKey) || sessionStorage.getItem(this.refreshExpiryKey);
    }
    isFuture(value) {
        return !!value && new Date(value).getTime() > Date.now();
    }
    isFutureOrMissing(value) {
        return !value || this.isFuture(value);
    }
    clearSessionStorage(storage) {
        storage.removeItem(this.tokenKey);
        storage.removeItem(this.userKey);
        storage.removeItem(this.expiryKey);
        storage.removeItem(this.refreshTokenKey);
        storage.removeItem(this.refreshExpiryKey);
    }
    getExpiry() {
        return localStorage.getItem(this.expiryKey) || sessionStorage.getItem(this.expiryKey);
    }
    clearLegacyLocalAuth() {
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
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.Router)); };
AuthService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=auth.service.js.map