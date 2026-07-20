import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    const isApiRequest = request.url.startsWith(environment.apiBaseUrl);

    if (!token || !isApiRequest || token.startsWith('local-')) {
      return next.handle(request);
    }

    return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
  }
}
