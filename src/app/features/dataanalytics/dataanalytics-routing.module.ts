import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataanalyticsComponent } from './dataanalytics.component';

const routes: Routes = [{ path: '', component: DataanalyticsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataanalyticsRoutingModule {}