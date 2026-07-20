import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [ClientComponent],
  imports: [SharedModule, ClientRoutingModule]
})
export class ClientModule {}