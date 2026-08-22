import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {
  PmOnboardingThemeId,
  PmOnboardingThemeOption,
  PmOnboardingThemeService
} from '../../shared/pm-onboarding-theme.service';

@Component({
  selector: 'app-onboarding-shell',
  templateUrl: './onboarding-shell.component.html',
  styleUrls: ['./onboarding-shell.component.scss']
})
export class OnboardingShellComponent {
  menuOpen = false;
  theme: PmOnboardingThemeId;
  readonly themeOptions: PmOnboardingThemeOption[];

  constructor(
    public auth: AuthService,
    private readonly themeService: PmOnboardingThemeService
  ) {
    this.themeOptions = this.themeService.options;
    this.theme = this.themeService.getTheme();
  }

  get role(): string { return this.auth.getCurrentUser()?.role || ''; }
  get name(): string { return this.auth.getCurrentUser()?.name || 'Employee'; }
  get isAdmin(): boolean { return this.auth.hasRole('Admin', 'SuperAdmin'); }
  get isSuperAdmin(): boolean { return this.auth.hasRole('SuperAdmin'); }
  get canSetupOnboarding(): boolean {
    return this.auth.hasRole('SuperAdmin');
    // Future Admin enablement: return this.auth.hasRole('SuperAdmin', 'Admin');
  }
  get themeClass(): string { return `feature-theme--${this.theme}`; }
  get themeName(): string { return this.themeOptions.find(x => x.id === this.theme)?.name || 'QLSS Classic'; }

  setTheme(theme: PmOnboardingThemeId): void {
    this.theme = theme;
    this.themeService.setTheme(theme);
  }

  close(): void { this.menuOpen = false; }
}
