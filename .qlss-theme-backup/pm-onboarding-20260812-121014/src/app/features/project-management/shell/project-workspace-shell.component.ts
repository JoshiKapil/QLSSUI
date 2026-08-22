import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-project-workspace-shell',
  templateUrl: './project-workspace-shell.component.html',
  styleUrls: ['./project-workspace-shell.component.scss']
})
export class ProjectWorkspaceShellComponent {
  menuOpen = false;

  constructor(public auth: AuthService) {}

  get role(): string { return this.auth.getCurrentUser()?.role || ''; }
  get name(): string { return this.auth.getCurrentUser()?.name || 'Team Member'; }
  get isAdminLike(): boolean { return ['admin', 'superadmin'].includes(this.role.toLowerCase()); }
  get isSuperAdmin(): boolean { return this.role.toLowerCase() === 'superadmin'; }

  closeMenu(): void { this.menuOpen = false; }
}
