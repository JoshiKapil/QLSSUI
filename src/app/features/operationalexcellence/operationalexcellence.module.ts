import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { OperationalexcellenceComponent } from './operationalexcellence.component';
import { OperationalexcellenceRoutingModule } from './operationalexcellence-routing.module';

@NgModule({
  declarations: [OperationalexcellenceComponent],
  imports: [SharedModule, OperationalexcellenceRoutingModule]
})
export class OperationalexcellenceModule {}