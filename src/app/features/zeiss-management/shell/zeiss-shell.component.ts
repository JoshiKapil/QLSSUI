import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {
  PmOnboardingThemeId,
  PmOnboardingThemeOption,
  PmOnboardingThemeService,
} from '../../shared/pm-onboarding-theme.service';
import { ZeissLoadingService } from '../services/zeiss-loading.service';

@Component({
  selector: 'app-zeiss-shell',
  templateUrl: './zeiss-shell.component.html',
  styleUrls: ['./zeiss-shell.component.scss'],
})
export class ZeissShellComponent {
  menuOpen = false;
  theme: PmOnboardingThemeId;
  readonly themeOptions: ReadonlyArray<PmOnboardingThemeOption>;
  readonly loaderState$: ZeissLoadingService['state$'];

  constructor(
    public auth: AuthService,
    private readonly themeService: PmOnboardingThemeService,
    public readonly loading: ZeissLoadingService,
  ) {
    // Deliberately reuse the same persisted theme as Project Management.
    // This keeps PM and Zeiss visually synchronized without sharing PM business data.
    this.themeOptions = this.themeService.options;
    this.loaderState$ = this.loading.state$;
    this.theme = this.themeService.getTheme();
  }

  get role(): string {
    return this.auth.getCurrentUser()?.role || '';
  }

  get name(): string {
    return this.auth.getCurrentUser()?.name || 'Zeiss User';
  }

  get themeClass(): string {
    return `feature-theme--${this.theme}`;
  }

  get themeName(): string {
    return this.themeOptions.find((x) => x.id === this.theme)?.name || 'QLSS Classic';
  }

  get isSuperAdmin(): boolean {
    return this.role.toLowerCase() === 'superadmin';
  }

  setTheme(theme: PmOnboardingThemeId): void {
    this.theme = theme;
    this.themeService.setTheme(theme);
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
