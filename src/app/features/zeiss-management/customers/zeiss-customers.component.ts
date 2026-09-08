import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { ZeissCustomer } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';
@Component({
  selector: 'app-zeiss-customers',
  templateUrl: './zeiss-customers.component.html',
  styleUrls: ['./zeiss-customers.component.scss'],
})
export class ZeissCustomersComponent implements OnInit {
  readonly customersPage = new ListPage('Customers');
  reloadcustomersPage(): void { this.ngOnInit(); }

  rows: ZeissCustomer[] = [];
  error = '';
  q = '';
  constructor(private api: ZeissManagementService) {}
  ngOnInit() {
    this.api
      .customers(this.customersPage)
      .subscribe({
        next: (x) => (this.rows = x),
        error: () => (this.error = 'Could not load customers. Please refresh and try again.'),
      });
  }
  get filtered() {
    const q = this.q.toLowerCase();
    return this.rows.filter(
      (x) =>
        !q || `${x.customerName} ${x.customerCode} ${x.area} ${x.contactPerson} ${x.email}`.toLowerCase().includes(q),
    );
  }
}
