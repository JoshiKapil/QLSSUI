import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteInteractionsService } from '../../core/services/site-interactions.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements AfterViewInit, OnDestroy {
  constructor(
    private interactions: SiteInteractionsService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Blogs - QLSS Business Consulting');
    this.meta.updateTag({
      name: 'description',
      content: 'QLSS Business Consulting blogs, training updates and industry insights.'
    });
  }

  ngAfterViewInit(): void {
    this.interactions.initPage();
  }

  currentPage = 1;
  readonly totalPages = 2;

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    document.querySelectorAll<HTMLElement>('.blog-card').forEach((card) => {
      const cardPage = Number(card.dataset['page'] || '1');
      card.style.display = cardPage === page ? '' : 'none';
      if (cardPage === page) {
        card.classList.remove('active');
        setTimeout(() => card.classList.add('active'), 10);
      }
    });
    document.querySelectorAll<HTMLElement>('.blog-page-btn[data-page-num]').forEach((button) => {
      button.classList.toggle('active', Number(button.dataset['pageNum']) === page);
    });
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    const info = document.getElementById('pageInfo');
    prev?.setAttribute('aria-disabled', String(page === 1));
    next?.setAttribute('aria-disabled', String(page === this.totalPages));
    if (info) info.textContent = `Page ${page} of ${this.totalPages}`;
    document.querySelector('.blog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  changePage(delta: number): void {
    this.goToPage(this.currentPage + delta);
  }

  ngOnDestroy(): void {}
}
