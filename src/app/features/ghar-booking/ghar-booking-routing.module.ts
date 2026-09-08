import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GharBookingComponent } from './ghar-booking.component';
const routes: Routes = [{ path: '', component: GharBookingComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class GharBookingRoutingModule {}
