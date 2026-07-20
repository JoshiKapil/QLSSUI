import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [SharedModule, FaqRoutingModule]
})
export class FaqModule {}