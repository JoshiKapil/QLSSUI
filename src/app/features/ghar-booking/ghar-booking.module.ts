import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GharBookingComponent } from './ghar-booking.component';
import { GharBookingRoutingModule } from './ghar-booking-routing.module';
@NgModule({ declarations: [GharBookingComponent], imports: [SharedModule, GharBookingRoutingModule] })
export class GharBookingModule {}
