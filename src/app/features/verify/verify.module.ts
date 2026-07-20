import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { VerifyComponent } from './verify.component';
import { VerifyRoutingModule } from './verify-routing.module';

@NgModule({
  declarations: [VerifyComponent],
  imports: [SharedModule, VerifyRoutingModule]
})
export class VerifyModule {}