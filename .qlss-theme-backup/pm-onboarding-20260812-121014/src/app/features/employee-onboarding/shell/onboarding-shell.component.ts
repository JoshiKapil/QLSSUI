import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-onboarding-shell', templateUrl: './onboarding-shell.component.html', styleUrls: ['./onboarding-shell.component.scss'] })
export class OnboardingShellComponent {
  menuOpen = false;
  constructor(public auth: AuthService) {}
  get role(): string { return this.auth.getCurrentUser()?.role || ''; }
  get name(): string { return this.auth.getCurrentUser()?.name || 'Employee'; }
  get isAdmin(): boolean { return this.auth.hasRole('Admin', 'SuperAdmin'); }
  get isSuperAdmin(): boolean { return this.auth.hasRole('SuperAdmin'); }
  close(): void { this.menuOpen = false; }
}
