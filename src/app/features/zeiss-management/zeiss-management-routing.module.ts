import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZeissAccessGuard } from '../../core/guards/zeiss-access.guard';
import { ZeissShellComponent } from './shell/zeiss-shell.component';
import { ZeissDashboardComponent } from './dashboard/zeiss-dashboard.component';
import { ZeissEnquiriesComponent } from './enquiries/zeiss-enquiries.component';
import { ZeissQuotationsComponent } from './quotations/zeiss-quotations.component';
import { ZeissSalesLifecycleComponent } from './sales-lifecycle/zeiss-sales-lifecycle.component';
import { ZeissInvoicesComponent } from './invoices/zeiss-invoices.component';
import { ZeissInstrumentsComponent } from './instruments/zeiss-instruments.component';
import { ZeissCustomersComponent } from './customers/zeiss-customers.component';
import { ZeissInventoryComponent } from './inventory/zeiss-inventory.component';
import { ZeissNotificationsComponent } from './notifications/zeiss-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: ZeissShellComponent,
    canActivate: [ZeissAccessGuard],
    children: [
      { path: 'dashboard', component: ZeissDashboardComponent },
      { path: 'enquiries', component: ZeissEnquiriesComponent },
      { path: 'quotations', component: ZeissQuotationsComponent },
      { path: 'sales-lifecycle', component: ZeissSalesLifecycleComponent },
      { path: 'invoices', component: ZeissInvoicesComponent },
      { path: 'instruments', component: ZeissInstrumentsComponent },
      { path: 'customers', component: ZeissCustomersComponent },
      { path: 'inventory', component: ZeissInventoryComponent },
      { path: 'notifications', component: ZeissNotificationsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ZeissManagementRoutingModule {}
