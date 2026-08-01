import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiRequest = request.url.startsWith(environment.apiBaseUrl);
    const token = this.auth.getToken();
    const authenticatedRequest = token && isApiRequest && this.auth.isServerAuthenticated()
      ? this.withBearerToken(request, token)
      : request;

    return next.handle(authenticatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const isAuthRequest = /\/Auth\/(login|register|refresh)$/i.test(request.url);
        if (error.status !== 401 || !isApiRequest || isAuthRequest) {
          return throwError(() => error);
        }

        return this.auth.refreshAccessToken().pipe(
          switchMap((newToken) => next.handle(this.withBearerToken(request, newToken))),
          catchError((refreshError) => {
            this.auth.logout();
            return throwError(() => refreshError);
          })
        );
      })
    );
  }

  private withBearerToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}