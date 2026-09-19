import { Injectable } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

export type PmOnboardingThemeId = 'heritage' | 'classic';
export interface PmOnboardingThemeOption {
  id: PmOnboardingThemeId;
  name: string;
  description: string;
}

/** Workspace selectors share the same state as the application header. */
@Injectable({ providedIn: 'root' })
export class PmOnboardingThemeService {
  constructor(private readonly themeService: ThemeService) {}

  readonly options: ReadonlyArray<PmOnboardingThemeOption> = [
    { id: 'heritage', name: 'Precision Heritage', description: 'Obsidian, Warm Porcelain & Burnished Copper' },
    { id: 'classic', name: 'QLSS Classic', description: 'Corporate Blue & Clean Slate' },
  ];

  getTheme(): PmOnboardingThemeId { return this.themeService.currentTheme; }
  setTheme(theme: PmOnboardingThemeId): void { this.themeService.setTheme(theme); }
}
