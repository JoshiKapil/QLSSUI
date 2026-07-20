import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ExpertiseComponent } from './expertise.component';
import { ExpertiseRoutingModule } from './expertise-routing.module';

@NgModule({
  declarations: [ExpertiseComponent],
  imports: [SharedModule, ExpertiseRoutingModule]
})
export class ExpertiseModule {}