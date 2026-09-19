import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppTheme = 'classic' | 'heritage';

export interface ThemeMeta {
  id: AppTheme;
  name: string;
  tagline: string;
  primaryColor: string;
  surfaceColor: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'qlss_active_theme';
  private readonly legacyPmStorageKey = 'qlss_ui_theme';

  readonly themes: ReadonlyArray<ThemeMeta> = [
    {
      id: 'heritage',
      name: 'Precision Heritage',
      tagline: 'Obsidian, Warm Porcelain & Burnished Copper',
      primaryColor: '#B5794A',
      surfaceColor: '#F7F3EC',
      icon: 'fa-gem',
    },
    {
      id: 'classic',
      name: 'QLSS Classic',
      tagline: 'Corporate Blue & Clean Slate',
      primaryColor: '#2F7CE8',
      surfaceColor: '#FFFFFF',
      icon: 'fa-shield-halved',
    },
  ];

  private readonly themeSubject = new BehaviorSubject<AppTheme>('heritage');
  readonly currentTheme$: Observable<AppTheme> = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = this.resolveStoredTheme();
      this.applyTheme(saved, false);
    }
  }

  get currentTheme(): AppTheme {
    return this.themeSubject.value;
  }

  get isHeritage(): boolean {
    return this.themeSubject.value === 'heritage';
  }

  get isClassic(): boolean {
    return this.themeSubject.value === 'classic';
  }

  setTheme(theme: AppTheme): void {
    if (theme !== 'classic' && theme !== 'heritage') {
      return;
    }
    this.applyTheme(theme, true);
  }

  toggleTheme(): AppTheme {
    const next: AppTheme = this.currentTheme === 'heritage' ? 'classic' : 'heritage';
    this.setTheme(next);
    return next;
  }

  private applyTheme(theme: AppTheme, persist: boolean): void {
    this.themeSubject.next(theme);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const body = document.body;
      const html = document.documentElement;

      if (theme === 'heritage') {
        body.classList.remove('theme-classic');
        body.classList.add('theme-heritage');
        body.setAttribute('data-theme', 'heritage');
        html.setAttribute('data-theme', 'heritage');
      } else {
        body.classList.remove('theme-heritage');
        body.classList.add('theme-classic');
        body.setAttribute('data-theme', 'classic');
        html.setAttribute('data-theme', 'classic');
      }

      if (persist) {
        localStorage.setItem(this.storageKey, theme);
        localStorage.setItem(this.legacyPmStorageKey, theme);
      }
    } catch {
      // Handle privacy mode or unavailable storage
    }
  }

  private resolveStoredTheme(): AppTheme {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored === 'classic' || stored === 'heritage') {
        return stored;
      }
      const legacy = localStorage.getItem(this.legacyPmStorageKey) || localStorage.getItem('qlss.pm-onboarding.theme');
      if (legacy === 'classic' || legacy === 'heritage') {
        return legacy;
      }
    } catch {
      // Fallback if localStorage restricted
    }
    // Default to the new Precision Heritage theme
    return 'heritage';
  }
}

