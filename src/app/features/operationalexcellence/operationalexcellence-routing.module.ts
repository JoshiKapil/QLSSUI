import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationalexcellenceComponent } from './operationalexcellence.component';

const routes: Routes = [{ path: '', component: OperationalexcellenceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationalexcellenceRoutingModule {}