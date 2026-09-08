import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AssessmentAdminComponent } from './admin/assessment-admin.component';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentComponent } from './assessment.component';

@NgModule({
  declarations: [AssessmentComponent, AssessmentAdminComponent],
  imports: [SharedModule, AssessmentRoutingModule],
})
export class AssessmentModule {}
