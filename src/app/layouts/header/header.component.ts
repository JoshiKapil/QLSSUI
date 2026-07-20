import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  menuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  userMenuOpen = false;
  adminMenuOpen = false;
  userName = 'User';
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isAdmin = (user?.role || '').toLowerCase() === 'admin';
      this.userName = user?.name || user?.email || 'User';
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
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
    if (this.userName.length > 8) {
      return this.userName.substring(0, 5) + '...';
    }
    return this.userName;
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
