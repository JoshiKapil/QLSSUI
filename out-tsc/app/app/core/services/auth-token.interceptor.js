import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
export class AuthTokenInterceptor {
    constructor(auth) {
        this.auth = auth;
    }
    intercept(request, next) {
        const isApiRequest = request.url.startsWith(environment.apiBaseUrl);
        const token = this.auth.getToken();
        const authenticatedRequest = token && isApiRequest && this.auth.isServerAuthenticated()
            ? this.withBearerToken(request, token)
            : request;
        return next.handle(authenticatedRequest).pipe(catchError((error) => {
            const isAuthRequest = /\/Auth\/(login|register|refresh)$/i.test(request.url);
            if (error.status !== 401 || !isApiRequest || isAuthRequest) {
                return throwError(() => error);
            }
            return this.auth.refreshAccessToken().pipe(switchMap((newToken) => next.handle(this.withBearerToken(request, newToken))), catchError((refreshError) => {
                this.auth.logout();
                return throwError(() => refreshError);
            }));
        }));
    }
    withBearerToken(request, token) {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
}
AuthTokenInterceptor.ɵfac = function AuthTokenInterceptor_Factory(t) { return new (t || AuthTokenInterceptor)(i0.ɵɵinject(i1.AuthService)); };
AuthTokenInterceptor.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthTokenInterceptor, factory: AuthTokenInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthTokenInterceptor, [{
        type: Injectable
    }], function () { return [{ type: i1.AuthService }]; }, null); })();
//# sourceMappingURL=auth-token.interceptor.js.map