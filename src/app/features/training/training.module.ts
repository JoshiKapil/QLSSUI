import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@NgModule({
  declarations: [TrainingComponent, FeedbackFormComponent],
  imports: [SharedModule, TrainingRoutingModule],
})
export class TrainingModule {}
