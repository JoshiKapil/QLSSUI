import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class OnboardingSetupGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(): boolean {
    if (this.auth.hasRole('SuperAdmin')) return true;

    // Future Admin enablement:
    // if (this.auth.hasRole('SuperAdmin', 'Admin')) return true;

    this.router.navigate(['/onboarding/dashboard']);
    return false;
  }
}
