import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';

@NgModule({
  declarations: [GalleryComponent],
  imports: [SharedModule, GalleryRoutingModule]
})
export class GalleryModule {}