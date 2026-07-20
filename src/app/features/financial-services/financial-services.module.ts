import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FinancialServicesComponent } from './financial-services.component';
import { FinancialServicesRoutingModule } from './financial-services-routing.module';

@NgModule({
  declarations: [FinancialServicesComponent],
  imports: [SharedModule, FinancialServicesRoutingModule]
})
export class FinancialServicesModule {}