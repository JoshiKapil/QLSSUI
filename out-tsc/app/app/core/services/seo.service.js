import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/platform-browser";
export class SeoService {
    constructor(router, title, meta, document) {
        this.router = router;
        this.title = title;
        this.meta = meta;
        this.document = document;
        this.fallbackSiteUrl = 'https://YOURDOMAIN.COM';
        this.defaultDescription = 'QLSS Business Consulting provides training, operational excellence, analytics, sustainability, financial services, and supply chain consulting.';
        this.defaultKeywords = 'QLSS Consulting, business consulting, training, operational excellence, data analytics, sustainability, financial services, supply chain';
        this.initialized = false;
    }
    init() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.applyRouteSeo();
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.applyRouteSeo());
    }
    applyRouteSeo() {
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
    buildCanonicalUrl() {
        const path = this.router.url.split('?')[0].split('#')[0];
        const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');
        return `${this.getSiteUrl()}${normalizedPath}`;
    }
    getSiteUrl() {
        var _a;
        const origin = (_a = this.document.location) === null || _a === void 0 ? void 0 : _a.origin;
        return origin && origin !== 'null' ? origin : this.fallbackSiteUrl;
    }
    getCurrentDescription() {
        var _a;
        const descriptionTag = this.document.querySelector('meta[name="description"]');
        const description = (_a = descriptionTag === null || descriptionTag === void 0 ? void 0 : descriptionTag.getAttribute('content')) === null || _a === void 0 ? void 0 : _a.trim();
        return description || this.defaultDescription;
    }
    setCanonical(url) {
        let canonical = this.document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = this.document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            this.document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);
    }
}
SeoService.ɵfac = function SeoService_Factory(t) { return new (t || SeoService)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.Title), i0.ɵɵinject(i2.Meta), i0.ɵɵinject(DOCUMENT)); };
SeoService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SeoService, factory: SeoService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SeoService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.Title }, { type: i2.Meta }, { type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=seo.service.js.map