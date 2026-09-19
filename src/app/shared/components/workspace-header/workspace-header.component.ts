import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
@Component({
  selector: 'app-workspace-header', standalone: true, imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './workspace-header.component.html', styleUrls: ['./workspace-header.component.scss'],
})
export class WorkspaceHeaderComponent {
  @Input() workspace: 'zeiss' | 'workspace' | 'onboarding' = 'zeiss';
  @Output() menuToggle = new EventEmitter<void>();
  query = '';
  constructor(public readonly auth: AuthService, public readonly theme: ThemeService) {}
  get title(): string { return this.workspace === 'zeiss' ? 'Zeiss Workspace' : this.workspace === 'workspace' ? 'Project Workspace' : 'Employee Onboarding'; }
  get name(): string { return this.auth.getCurrentUser()?.name || 'Account'; }
  get initials(): string { return this.name.split(' ').filter(Boolean).slice(0, 2).map(x => x.charAt(0)).join(''); }
  get pages(): { label: string; path: string }[] {
    const entries = this.workspace === 'zeiss'
      ? ['Dashboard', 'Enquiries', 'Quotations', 'Sales Lifecycle', 'Invoices', 'Instruments', 'Customers', 'Inventory', 'Notifications']
      : this.workspace === 'workspace'
        ? ['Dashboard', 'Enquiries', 'Quotations', 'Projects', 'Invoices', 'Documents', 'Notifications', 'Reports']
        : ['My Learning'];
    if (this.workspace === 'onboarding' && this.auth.hasRole('Admin', 'SuperAdmin')) entries.push('Dashboard', 'Employees');
    if (this.workspace === 'onboarding' && this.auth.hasRole('SuperAdmin')) entries.push('Setup Studio', 'Master Setup', 'Access Requests');
    if (this.workspace === 'workspace' && this.auth.hasRole('Admin', 'SuperAdmin')) entries.push('Management', 'Operations');
    if (this.workspace === 'workspace' && this.auth.hasRole('SuperAdmin')) entries.push('Approvals');
    return entries.filter(x => x.toLowerCase().includes(this.query.trim().toLowerCase())).map(label => ({ label, path: '/' + this.workspace + '/' + label.toLowerCase().replace(/ /g, '-') }));
  }
}
