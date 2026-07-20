import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements AfterViewInit, OnDestroy {
  // Keeps track of the open item index. null means all are closed.
  openIndex: number | null = null;

  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('FAQ - QLSS Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
    });
  }

  // Toggles the state wrapper. $event.stopPropagation() is used in the HTML
  // to ensure external JS scripts don't break the lifecycle pass.
  toggleFaq(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  ngOnDestroy(): void {}
}