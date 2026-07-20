import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../services/notifier.service';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let notifier: jasmine.SpyObj<NotifierService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'isAdmin']);
    router = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    notifier = jasmine.createSpyObj<NotifierService>('NotifierService', ['warningToastr']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: NotifierService, useValue: notifier }
      ]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('redirects unauthenticated users to login', () => {
    const tree = {} as UrlTree;
    authService.isLoggedIn.and.returnValue(false);
    router.createUrlTree.and.returnValue(tree);

    expect(guard.canActivate()).toBe(tree);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
  });

  it('redirects non-admin users and shows a warning', () => {
    const tree = {} as UrlTree;
    authService.isLoggedIn.and.returnValue(true);
    authService.isAdmin.and.returnValue(false);
    router.createUrlTree.and.returnValue(tree);

    expect(guard.canActivate()).toBe(tree);
    expect(notifier.warningToastr).toHaveBeenCalledWith('You are not authorized to access admin pages.', 'Unauthorized');
    expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
  });

  it('allows authenticated admins', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.isAdmin.and.returnValue(true);

    expect(guard.canActivate()).toBeTrue();
  });
});
