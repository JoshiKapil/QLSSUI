import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FillcertificationfromComponent } from './fillcertificationfrom.component';

const routes: Routes = [{ path: '', component: FillcertificationfromComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillcertificationfromRoutingModule {}
