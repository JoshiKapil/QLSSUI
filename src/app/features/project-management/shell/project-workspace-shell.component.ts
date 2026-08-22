import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {
  PmOnboardingThemeId,
  PmOnboardingThemeOption,
  PmOnboardingThemeService
} from '../../shared/pm-onboarding-theme.service';

@Component({
  selector: 'app-project-workspace-shell',
  templateUrl: './project-workspace-shell.component.html',
  styleUrls: ['./project-workspace-shell.component.scss']
})
export class ProjectWorkspaceShellComponent {
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
  get name(): string { return this.auth.getCurrentUser()?.name || 'Team Member'; }
  get isAdminLike(): boolean { return ['admin', 'superadmin'].includes(this.role.toLowerCase()); }
  get isSuperAdmin(): boolean { return this.role.toLowerCase() === 'superadmin'; }
  get themeClass(): string { return `feature-theme--${this.theme}`; }
  get themeName(): string { return this.themeOptions.find(x => x.id === this.theme)?.name || 'QLSS Classic'; }

  setTheme(theme: PmOnboardingThemeId): void {
    this.theme = theme;
    this.themeService.setTheme(theme);
  }

  closeMenu(): void { this.menuOpen = false; }
}
