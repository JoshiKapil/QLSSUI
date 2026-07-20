import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataanalyticsComponent } from './dataanalytics.component';
import { DataanalyticsRoutingModule } from './dataanalytics-routing.module';

@NgModule({
  declarations: [DataanalyticsComponent],
  imports: [SharedModule, DataanalyticsRoutingModule]
})
export class DataanalyticsModule {}