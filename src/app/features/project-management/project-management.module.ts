import { NgModule } from '@angular/core';
import { WorkspaceHeaderComponent } from '../../shared/components/workspace-header/workspace-header.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectApprovalsComponent } from './approvals/project-approvals.component';
import { ProjectDashboardComponent } from './dashboard/project-dashboard.component';
import { ProjectDocumentsComponent } from './documents/project-documents.component';
import { ProjectEnquiriesComponent } from './enquiries/project-enquiries.component';
import { ProjectManagementAdminComponent } from './management/project-management-admin.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectNotificationsComponent } from './notifications/project-notifications.component';
import { ProjectProjectsComponent } from './projects/project-projects.component';
import { ProjectQuotationsComponent } from './quotations/project-quotations.component';
import { ProjectReportsComponent } from './reports/project-reports.component';
import { ProjectWorkspaceShellComponent } from './shell/project-workspace-shell.component';
import { PmSearchSelectComponent } from './shared/pm-search-select.component';
import { ProjectOperationsComponent } from './operations/project-operations.component';
import { ProjectInvoicesComponent } from './invoices/project-invoices.component';

@NgModule({
  declarations: [
    ProjectWorkspaceShellComponent,
    ProjectDashboardComponent,
    ProjectEnquiriesComponent,
    ProjectQuotationsComponent,
    ProjectProjectsComponent,
    ProjectApprovalsComponent,
    ProjectDocumentsComponent,
    ProjectNotificationsComponent,
    ProjectReportsComponent,
    ProjectManagementAdminComponent,
    PmSearchSelectComponent,
    ProjectOperationsComponent,
    ProjectInvoicesComponent,
  ],
  imports: [WorkspaceHeaderComponent, SharedModule, ProjectManagementRoutingModule],
})
export class ProjectManagementModule {}
