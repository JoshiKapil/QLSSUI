import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../services/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private notifier: NotifierService) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }

    if (!this.authService.isAdmin()) {
      this.notifier.warningToastr('You are not authorized to access admin pages.', 'Unauthorized');
      return this.router.createUrlTree(['/']);
    }

    return true;
  }
}

