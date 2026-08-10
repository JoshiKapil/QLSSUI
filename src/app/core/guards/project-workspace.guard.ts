import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../services/notifier.service';
@Injectable({ providedIn: 'root' })
export class ProjectWorkspaceGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private notifier: NotifierService) {}
  canActivate(): boolean | UrlTree {
    if (!this.auth.isLoggedIn()) return this.router.createUrlTree(['/login']);
    if (!this.auth.hasWorkspaceAccess()) {
      this.notifier.warningToastr('Your role does not have Project Workspace access.', 'Unauthorized');
      return this.router.createUrlTree(['/']);
    }
    return true;
  }
}
