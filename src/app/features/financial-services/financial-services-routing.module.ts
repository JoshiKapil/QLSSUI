import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialServicesComponent } from './financial-services.component';

const routes: Routes = [{ path: '', component: FinancialServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialServicesRoutingModule {}