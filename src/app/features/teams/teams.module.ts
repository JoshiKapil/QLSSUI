import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  declarations: [TeamsComponent],
  imports: [SharedModule, TeamsRoutingModule]
})
export class TeamsModule {}