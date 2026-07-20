import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [TrainingComponent],
  imports: [SharedModule, TrainingRoutingModule]
})
export class TrainingModule {}