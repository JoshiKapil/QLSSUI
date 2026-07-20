import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SupplyChainComponent } from './supply-chain.component';
import { SupplyChainRoutingModule } from './supply-chain-routing.module';

@NgModule({
  declarations: [SupplyChainComponent],
  imports: [SharedModule, SupplyChainRoutingModule]
})
export class SupplyChainModule {}