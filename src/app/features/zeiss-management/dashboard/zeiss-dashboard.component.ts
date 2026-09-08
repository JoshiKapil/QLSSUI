import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { ZeissDashboard } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';
@Component({
  selector: 'app-zeiss-dashboard',
  templateUrl: './zeiss-dashboard.component.html',
  styleUrls: ['./zeiss-dashboard.component.scss'],
})
export class ZeissDashboardComponent implements OnInit {
  data?: ZeissDashboard;
  error = '';
  constructor(
    private api: ZeissManagementService,
    private notifier: NotifierService,
  ) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.error = '';
    this.api.dashboard().subscribe({
      next: (x) => (this.data = x),
      error: (e) => {
        this.error = e?.error?.message || 'Dashboard could not be loaded.';
        this.notifier.warningToastr(this.error, 'Zeiss Dashboard');
      },
    });
  }
}
