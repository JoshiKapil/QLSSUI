import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { OnboardingAccessRequestPublicComponent } from './access-request/onboarding-access-request-public.component';
import { OnboardingAccessRequestsComponent } from './access-requests/onboarding-access-requests.component';
import { OnboardingAdminDashboardComponent } from './admin-dashboard/onboarding-admin-dashboard.component';
import { OnboardingConfigurationComponent } from './configuration/onboarding-configuration.component';
import { EmployeeOnboardingRoutingModule } from './employee-onboarding-routing.module';
import { OnboardingEmployeesComponent } from './employees/onboarding-employees.component';
import { MyOnboardingComponent } from './my-learning/my-onboarding.component';
import { OnboardingMasterSetupComponent } from './master-setup/onboarding-master-setup.component';
import { OnboardingShellComponent } from './shell/onboarding-shell.component';

@NgModule({
  declarations: [
    OnboardingShellComponent,
    MyOnboardingComponent,
    OnboardingAdminDashboardComponent,
    OnboardingConfigurationComponent,
    OnboardingMasterSetupComponent,
    OnboardingEmployeesComponent,
    OnboardingAccessRequestsComponent,
    OnboardingAccessRequestPublicComponent,
  ],
  imports: [SharedModule, EmployeeOnboardingRoutingModule],
})
export class EmployeeOnboardingModule {}
