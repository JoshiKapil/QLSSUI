import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  menuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  hasWorkspaceAccess = false;
  hasZeissAccess = false;
  userMenuOpen = false;
  adminMenuOpen = false;
  userName = 'User';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    public themeService: ThemeService,
  ) {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isAdmin = this.authService.isAdmin();
      // Workspace visibility follows the dedicated role rule. Admin is excluded there temporarily.
      this.hasWorkspaceAccess = this.authService.hasWorkspaceAccess();
      this.hasZeissAccess = (user?.role || '').toLowerCase() === 'superadmin' || (user?.email || '').toLowerCase() === 'consultant@qlssconsulting.com';
      this.userName = user?.name || user?.email || 'User';
    });
  }

  get isHeritage(): boolean {
    return this.themeService.isHeritage;
  }

  get hasOnboardingAccess(): boolean {
    return this.isLoggedIn;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
    if (!this.menuOpen) {
      this.closeUserMenu();
    }
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.closeUserMenu();
  }

  toggleUserMenu(event?: Event): void {
    event?.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
    if (!this.userMenuOpen) {
      this.adminMenuOpen = false;
    }
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
    this.adminMenuOpen = false;
  }

  toggleAdminMenu(event?: Event): void {
    event?.stopPropagation();
    this.adminMenuOpen = !this.adminMenuOpen;
  }

  get truncatedUserName(): string {
    if (this.userName.length > 18) {
      return this.userName.substring(0, 15) + '...';
    }
    return this.userName;
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.destroy$.next();
    this.destroy$.complete();
  }
}



