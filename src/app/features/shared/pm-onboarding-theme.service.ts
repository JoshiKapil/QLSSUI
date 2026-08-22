import { Injectable } from '@angular/core';

export type PmOnboardingThemeId = 'classic' | 'aurora' | 'crystal' | 'peach';

export interface PmOnboardingThemeOption {
  id: PmOnboardingThemeId;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class PmOnboardingThemeService {
  private readonly storageKey = 'qlss.pm-onboarding.theme';

  readonly options: PmOnboardingThemeOption[] = [
    { id: 'classic', name: 'QLSS Classic', description: 'Current workspace look' },
    { id: 'aurora', name: 'Aurora Nav', description: 'Indigo, aqua and coral navigation' },
    { id: 'crystal', name: 'Crystal Glass', description: 'Frosted glass and crystal surfaces' },
    { id: 'peach', name: 'Peach Bloom', description: 'Warm peach, coral and plum' }
  ];

  getTheme(): PmOnboardingThemeId {
    try {
      const saved = localStorage.getItem(this.storageKey) as PmOnboardingThemeId | null;
      return this.isValid(saved) ? saved : 'classic';
    } catch {
      return 'classic';
    }
  }

  setTheme(theme: PmOnboardingThemeId): void {
    if (!this.isValid(theme)) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // The theme still applies for the current screen when storage is unavailable.
    }
  }

  private isValid(theme: string | null): theme is PmOnboardingThemeId {
    return theme === 'classic' || theme === 'aurora' || theme === 'crystal' || theme === 'peach';
  }
}
