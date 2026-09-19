import { NgModule } from '@angular/core';
import { WorkspaceHeaderComponent } from '../../shared/components/workspace-header/workspace-header.component';
import { SharedModule } from '../../shared/shared.module';
import { ZeissManagementRoutingModule } from './zeiss-management-routing.module';
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

import { ZmSearchSelectComponent } from './shared/zm-search-select.component';
import { ZeissQuotationPdfService } from './services/zeiss-quotation-pdf.service';

@NgModule({
  declarations: [
    ZeissShellComponent,
    ZeissDashboardComponent,
    ZeissEnquiriesComponent,
    ZeissQuotationsComponent,
    ZeissSalesLifecycleComponent,
    ZeissInvoicesComponent,
    ZeissInstrumentsComponent,
    ZeissCustomersComponent,
    ZeissInventoryComponent,
    ZeissNotificationsComponent,
    ZmSearchSelectComponent,
  ],
  imports: [WorkspaceHeaderComponent, SharedModule, ZeissManagementRoutingModule],
  providers: [ZeissQuotationPdfService],
  exports: [ZmSearchSelectComponent],
})
export class ZeissManagementModule {}
