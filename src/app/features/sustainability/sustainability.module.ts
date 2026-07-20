import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SustainabilityComponent } from './sustainability.component';
import { SustainabilityRoutingModule } from './sustainability-routing.module';

@NgModule({
  declarations: [SustainabilityComponent],
  imports: [SharedModule, SustainabilityRoutingModule]
})
export class SustainabilityModule {}