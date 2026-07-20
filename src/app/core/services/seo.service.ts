import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly fallbackSiteUrl = 'https://YOURDOMAIN.COM';
  private readonly defaultDescription =
    'QLSS Business Consulting provides training, operational excellence, analytics, sustainability, financial services, and supply chain consulting.';
  private readonly defaultKeywords =
    'QLSS Consulting, business consulting, training, operational excellence, data analytics, sustainability, financial services, supply chain';
  private initialized = false;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  init(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.applyRouteSeo();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.applyRouteSeo());
  }

  private applyRouteSeo(): void {
    const canonicalUrl = this.buildCanonicalUrl();
    const title = this.title.getTitle() || 'QLSS Consulting';
    const description = this.getCurrentDescription();

    this.setCanonical(canonicalUrl);
    this.meta.updateTag({ name: 'keywords', content: this.defaultKeywords });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'QLSS Consulting' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  private buildCanonicalUrl(): string {
    const path = this.router.url.split('?')[0].split('#')[0];
    const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');

    return `${this.getSiteUrl()}${normalizedPath}`;
  }

  private getSiteUrl(): string {
    const origin = this.document.location?.origin;

    return origin && origin !== 'null' ? origin : this.fallbackSiteUrl;
  }

  private getCurrentDescription(): string {
    const descriptionTag = this.document.querySelector('meta[name="description"]');
    const description = descriptionTag?.getAttribute('content')?.trim();

    return description || this.defaultDescription;
  }

  private setCanonical(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }
}
