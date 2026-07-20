import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';

@Component({
  selector: 'app-information-security',
  templateUrl: './information-security.component.html',
  styleUrls: ['./information-security.component.scss']
})
export class InformationSecurityComponent implements AfterViewInit, OnDestroy {
  constructor(
    private readonly interactions: SiteInteractionsService,
    private readonly title: Title,
    private readonly meta: Meta
  ) {
    this.title.setTitle('Information Security & IT Service Management - QLSS Business Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS information security and IT service management consulting for TISAX, ISO/IEC 27001, and ISO/IEC 20000-1.'
    });
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  ngOnDestroy(): void {}
}
