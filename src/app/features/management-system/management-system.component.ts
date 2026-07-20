import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';

@Component({
  selector: 'app-management-system',
  templateUrl: './management-system.component.html',
  styleUrls: ['./management-system.component.scss']
})
export class ManagementSystemComponent implements AfterViewInit, OnDestroy {
  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Management System Implementation - QLSS Business Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS management system implementation services for ISO and integrated management systems.'
    });
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  ngOnDestroy(): void {}
}
