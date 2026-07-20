import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TestComponent } from './test.component';
import { TestRoutingModule } from './test-routing.module';
import { ResultComponent } from './result.component';

@NgModule({
  declarations: [TestComponent, ResultComponent],
  imports: [SharedModule, TestRoutingModule]
})
export class TestModule {}
