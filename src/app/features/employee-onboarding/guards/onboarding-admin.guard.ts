import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class OnboardingAdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.hasRole('Admin', 'SuperAdmin')) return true;
    this.router.navigate(['/onboarding/my-learning']);
    return false;
  }
}
