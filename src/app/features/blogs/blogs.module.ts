import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BlogsComponent } from './blogs.component';
import { BlogsRoutingModule } from './blogs-routing.module';

@NgModule({
  declarations: [BlogsComponent],
  imports: [SharedModule, BlogsRoutingModule]
})
export class BlogsModule {}
