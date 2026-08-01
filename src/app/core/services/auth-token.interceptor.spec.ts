import { HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { AuthTokenInterceptor } from './auth-token.interceptor';

describe('AuthTokenInterceptor', () => {
  it('refreshes once after a 401 and retries with the new access token', () => {
    const auth = jasmine.createSpyObj<AuthService>('AuthService', [
      'getToken',
      'isServerAuthenticated',
      'refreshAccessToken',
      'logout'
    ]);
    auth.getToken.and.returnValue('expired-token');
    auth.isServerAuthenticated.and.returnValue(true);
    auth.refreshAccessToken.and.returnValue(of('new-token'));

    const handler = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);
    handler.handle.and.returnValues(
      throwError(() => new HttpErrorResponse({ status: 401 })),
      of(new HttpResponse({ status: 200 }))
    );

    const interceptor = new AuthTokenInterceptor(auth);
    const request = new HttpRequest('GET', `${environment.apiBaseUrl}/User/profile`);
    let status = 0;
    interceptor.intercept(request, handler).subscribe((event) => {
      if (event instanceof HttpResponse) status = event.status;
    });

    expect(status).toBe(200);
    expect(auth.refreshAccessToken).toHaveBeenCalledTimes(1);
    expect(handler.handle.calls.count()).toBe(2);
    expect(handler.handle.calls.argsFor(0)[0].headers.get('Authorization')).toBe('Bearer expired-token');
    expect(handler.handle.calls.argsFor(1)[0].headers.get('Authorization')).toBe('Bearer new-token');
    expect(auth.logout).not.toHaveBeenCalled();
  });
});