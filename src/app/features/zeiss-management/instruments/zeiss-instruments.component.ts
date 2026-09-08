import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { ZeissInstrument } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';
@Component({
  selector: 'app-zeiss-instruments',
  templateUrl: './zeiss-instruments.component.html',
  styleUrls: ['./zeiss-instruments.component.scss'],
})
export class ZeissInstrumentsComponent implements OnInit {
  readonly instrumentsPage = new ListPage('Instruments');
  reloadinstrumentsPage(): void { this.ngOnInit(); }

  rows: ZeissInstrument[] = [];
  error = '';
  q = '';
  constructor(private api: ZeissManagementService) {}
  ngOnInit() {
    this.api
      .instruments(this.instrumentsPage)
      .subscribe({
        next: (x) => (this.rows = x),
        error: () => (this.error = 'Could not load instruments. Please refresh and try again.'),
      });
  }
  get filtered() {
    const q = this.q.toLowerCase();
    return this.rows.filter(
      (x) => !q || `${x.partDescription} ${x.partNumber} ${x.category}`.toLowerCase().includes(q),
    );
  }
  open(x: ZeissInstrument) {
    if (x.catalogueFile) window.open(this.api.catalogueUrl(x.catalogueFile), '_blank', 'noopener');
  }
}
