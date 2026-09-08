import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { OnboardingAccessRequestPublicComponent } from './access-request/onboarding-access-request-public.component';
import { OnboardingAccessRequestsComponent } from './access-requests/onboarding-access-requests.component';
import { OnboardingAdminDashboardComponent } from './admin-dashboard/onboarding-admin-dashboard.component';
import { OnboardingConfigurationComponent } from './configuration/onboarding-configuration.component';
import { OnboardingEmployeesComponent } from './employees/onboarding-employees.component';
import { OnboardingAdminGuard } from './guards/onboarding-admin.guard';
import { OnboardingSuperAdminGuard } from './guards/onboarding-superadmin.guard';
import { OnboardingSetupGuard } from './guards/onboarding-setup.guard';
import { MyOnboardingComponent } from './my-learning/my-onboarding.component';
import { OnboardingMasterSetupComponent } from './master-setup/onboarding-master-setup.component';
import { OnboardingShellComponent } from './shell/onboarding-shell.component';

const routes: Routes = [
  { path: 'access-request', component: OnboardingAccessRequestPublicComponent },
  {
    path: '',
    component: OnboardingShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'my-learning', component: MyOnboardingComponent },
      { path: 'dashboard', component: OnboardingAdminDashboardComponent, canActivate: [OnboardingAdminGuard] },
      { path: 'setup-studio', component: OnboardingConfigurationComponent, canActivate: [OnboardingSetupGuard] },
      { path: 'master-setup', component: OnboardingMasterSetupComponent, canActivate: [OnboardingSetupGuard] },
      { path: 'configuration', redirectTo: 'setup-studio', pathMatch: 'full' },
      { path: 'setup', redirectTo: 'setup-studio', pathMatch: 'full' },
      { path: 'employees', component: OnboardingEmployeesComponent, canActivate: [OnboardingAdminGuard] },
      {
        path: 'access-requests',
        component: OnboardingAccessRequestsComponent,
        canActivate: [OnboardingSuperAdminGuard],
      },
      { path: '', redirectTo: 'my-learning', pathMatch: 'full' },
      { path: '**', redirectTo: 'my-learning' },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class EmployeeOnboardingRoutingModule {}
