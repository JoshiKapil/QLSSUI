import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWorkspaceGuard } from '../../core/guards/project-workspace.guard';
import { ProjectApprovalsComponent } from './approvals/project-approvals.component';
import { ProjectDashboardComponent } from './dashboard/project-dashboard.component';
import { ProjectDocumentsComponent } from './documents/project-documents.component';
import { ProjectEnquiriesComponent } from './enquiries/project-enquiries.component';
import { ProjectManagementAdminComponent } from './management/project-management-admin.component';
import { ProjectNotificationsComponent } from './notifications/project-notifications.component';
import { ProjectProjectsComponent } from './projects/project-projects.component';
import { ProjectQuotationsComponent } from './quotations/project-quotations.component';
import { ProjectReportsComponent } from './reports/project-reports.component';
import { ProjectWorkspaceShellComponent } from './shell/project-workspace-shell.component';
import { ProjectOperationsComponent } from './operations/project-operations.component';

const routes: Routes = [{
  path: '', component: ProjectWorkspaceShellComponent, canActivate: [ProjectWorkspaceGuard], children: [
    { path: 'dashboard', component: ProjectDashboardComponent },
    { path: 'enquiries', component: ProjectEnquiriesComponent },
    { path: 'quotations', component: ProjectQuotationsComponent },
    { path: 'projects', component: ProjectProjectsComponent },
    { path: 'approvals', component: ProjectApprovalsComponent },
    { path: 'documents', component: ProjectDocumentsComponent },
    { path: 'notifications', component: ProjectNotificationsComponent },
    { path: 'reports', component: ProjectReportsComponent },
    { path: 'management', component: ProjectManagementAdminComponent },
    { path: 'operations', component: ProjectOperationsComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
  ]
}];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ProjectManagementRoutingModule {}
