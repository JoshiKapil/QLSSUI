import { Injectable } from '@angular/core';

// These ids and names intentionally mirror SystemUI exactly.
// Only Project Management + Employee Onboarding consume this service in QLSS_New_Version.
export type PmOnboardingThemeId = 'classic' | 'aurora' | 'glossy' | 'executive' | 'glassmorphism';

export interface PmOnboardingThemeOption {
  id: PmOnboardingThemeId;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class PmOnboardingThemeService {
  // SystemUI uses qlss_ui_theme. Keep the old PM key as a compatibility fallback.
  private readonly storageKey = 'qlss_ui_theme';
  private readonly legacyStorageKey = 'qlss.pm-onboarding.theme';

  readonly options: ReadonlyArray<PmOnboardingThemeOption> = [
    { id: 'classic', name: 'QLSS Classic', description: 'Current QLSS sidebar theme' },
    { id: 'aurora', name: 'Aurora Nav', description: 'Top navigation with dropdown menus' },
    { id: 'glossy', name: 'Prism Gloss', description: 'Glossy glass and luminous surfaces' },
    { id: 'executive', name: 'Executive Slate', description: 'High-contrast flat enterprise layout' },
    { id: 'glassmorphism', name: 'Glassmorphism', description: 'Light ice frosted-glass workspace' },
  ];

  getTheme(): PmOnboardingThemeId {
    try {
      const systemUiTheme = this.normalise(localStorage.getItem(this.storageKey));
      if (systemUiTheme) return systemUiTheme;

      const legacyTheme = this.normalise(localStorage.getItem(this.legacyStorageKey));
      if (legacyTheme) {
        localStorage.setItem(this.storageKey, legacyTheme);
        return legacyTheme;
      }
    } catch {
      // localStorage can be unavailable in privacy-restricted contexts.
    }
    return 'classic';
  }

  setTheme(theme: PmOnboardingThemeId): void {
    if (!this.isValid(theme)) return;
    try {
      localStorage.setItem(this.storageKey, theme);
      // Keep old builds in sync during a staged deployment.
      localStorage.setItem(this.legacyStorageKey, theme);
    } catch {
      // The current screen still keeps the selected theme in component state.
    }
  }

  private normalise(theme: string | null): PmOnboardingThemeId | null {
    // Previous QLSS_New_Version-only ids are migrated without breaking saved users.
    if (theme === 'crystal') return 'glossy';
    if (theme === 'peach') return 'executive';
    return this.isValid(theme) ? theme : null;
  }

  private isValid(theme: string | null): theme is PmOnboardingThemeId {
    return (
      theme === 'classic' ||
      theme === 'aurora' ||
      theme === 'glossy' ||
      theme === 'executive' ||
      theme === 'glassmorphism'
    );
  }
}
