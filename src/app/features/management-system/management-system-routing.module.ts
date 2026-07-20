import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementSystemComponent } from './management-system.component';

const routes: Routes = [{ path: '', component: ManagementSystemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementSystemRoutingModule {}
