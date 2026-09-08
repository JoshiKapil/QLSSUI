import { ListPage } from '../../../shared/list-page';
import { Component, OnInit } from '@angular/core';
import { ZeissNotification } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';
@Component({
  selector: 'app-zeiss-notifications',
  templateUrl: './zeiss-notifications.component.html',
  styleUrls: ['./zeiss-notifications.component.scss'],
})
export class ZeissNotificationsComponent implements OnInit {
  readonly notificationsPage = new ListPage('Notifications');
  reloadnotificationsPage(): void { this.ngOnInit(); }

  rows: ZeissNotification[] = [];
  error = '';
  constructor(private api: ZeissManagementService) {}
  ngOnInit() {
    this.api
      .notifications(this.notificationsPage)
      .subscribe({
        next: (x) => (this.rows = x),
        error: () => (this.error = 'Could not load notifications. Please refresh and try again.'),
      });
  }
}
