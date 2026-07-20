import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('About QLSS Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
    });
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  ngOnDestroy(): void {}
}