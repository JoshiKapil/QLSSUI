import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationSecurityComponent } from './information-security.component';

const routes: Routes = [{ path: '', component: InformationSecurityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationSecurityRoutingModule {}
