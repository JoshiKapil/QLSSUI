import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { InformationSecurityRoutingModule } from './information-security-routing.module';
import { InformationSecurityComponent } from './information-security.component';

@NgModule({
  declarations: [InformationSecurityComponent],
  imports: [SharedModule, InformationSecurityRoutingModule]
})
export class InformationSecurityModule {}
