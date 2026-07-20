import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ManagementSystemComponent } from './management-system.component';
import { ManagementSystemRoutingModule } from './management-system-routing.module';

@NgModule({
  declarations: [ManagementSystemComponent],
  imports: [SharedModule, ManagementSystemRoutingModule]
})
export class ManagementSystemModule {}
