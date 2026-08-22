import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin.guard';
import { AssessmentAdminComponent } from './admin/assessment-admin.component';
import { AssessmentComponent } from './assessment.component';

const routes: Routes = [
  { path: '', component: AssessmentComponent },
  { path: 'admin', component: AssessmentAdminComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule {}
