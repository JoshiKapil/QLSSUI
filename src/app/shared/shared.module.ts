import { ListPagerComponent } from './components/list-pager.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@NgModule({
  declarations: [ListPagerComponent, ContactModalComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [ListPagerComponent, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ContactModalComponent],
})
export class SharedModule {}
