import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FillcertificationfromRoutingModule } from './fillcertificationfrom-routing.module';
import { FillcertificationfromComponent } from './fillcertificationfrom.component';

@NgModule({
  declarations: [FillcertificationfromComponent],
  imports: [SharedModule, FillcertificationfromRoutingModule]
})
export class FillcertificationfromModule {}
