import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/site-interactions.service";
import * as i2 from "@angular/platform-browser";
export class GalleryComponent {
    constructor(interactions, title, meta) {
        this.interactions = interactions;
        this.title = title;
        this.meta = meta;
        this.title.setTitle('Gallery - QLSS Consulting');
        this.meta.updateTag({
            name: 'description',
            content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
        });
    }
    ngAfterViewInit() {
        this.interactions.initPage();
    }
    ngOnDestroy() { }
}
GalleryComponent.ɵfac = function GalleryComponent_Factory(t) { return new (t || GalleryComponent)(i0.ɵɵdirectiveInject(i1.SiteInteractionsService), i0.ɵɵdirectiveInject(i2.Title), i0.ɵɵdirectiveInject(i2.Meta)); };
GalleryComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GalleryComponent, selectors: [["app-gallery"]], decls: 27, vars: 0, consts: [["id", "navbar"], [1, "about-gallery", 2, "padding-top", "140px", "padding-bottom", "80px", "min-height", "100vh"], [1, "container"], [1, "section-header", "reveal"], [1, "lp-heading"], [1, "lp-accent"], [1, "section-sub"], [1, "gallery-grid", "reveal"], [1, "gallery-item"], ["src", "assets/img/Img1.png", "alt", "Gallery Image 1"], ["src", "assets/img/Img3.png", "alt", "Gallery Image 3"], ["src", "assets/img/Img4.png", "alt", "Gallery Image 4"], ["src", "assets/img/Img5.png", "alt", "Gallery Image 5"], ["src", "assets/Galleryimg/GallaryImg1.jpeg", "alt", "Gallery Image 6"], ["src", "assets/Galleryimg/GallaryImg2.jpeg", "alt", "Gallery Image 7"], ["src", "assets/Galleryimg/GallaryImg3.jpeg", "alt", "Gallery Image 8"], ["src", "assets/img/Img2.png", "alt", "Gallery Image 2"]], template: function GalleryComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "nav", 0);
        i0.ɵɵelementStart(1, "section", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
        i0.ɵɵtext(5, " Event ");
        i0.ɵɵelementStart(6, "span", 5);
        i0.ɵɵtext(7, "Highlights");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "p", 6);
        i0.ɵɵtext(9, " A glimpse into our training sessions, audits, and consulting engagements across India. ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "div", 7)(11, "div", 8);
        i0.ɵɵelement(12, "img", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelement(14, "img", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 8);
        i0.ɵɵelement(16, "img", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 8);
        i0.ɵɵelement(18, "img", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 8);
        i0.ɵɵelement(20, "img", 13);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "div", 8);
        i0.ɵɵelement(22, "img", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "div", 8);
        i0.ɵɵelement(24, "img", 15);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 8);
        i0.ɵɵelement(26, "img", 16);
        i0.ɵɵelementEnd()()()();
    } } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GalleryComponent, [{
        type: Component,
        args: [{ selector: 'app-gallery', template: "<!-- NAVBAR -->\n  <nav id=\"navbar\"></nav>\n\n  <section class=\"about-gallery\" style=\"padding-top: 140px; padding-bottom: 80px; min-height: 100vh;\">\n    <div class=\"container\">\n      <div class=\"section-header reveal\">\n        <h2 class=\"lp-heading\">\n          Event <span class=\"lp-accent\">Highlights</span>\n        </h2>\n        <p class=\"section-sub\">\n          A glimpse into our training sessions, audits, and consulting\n          engagements across India.\n        </p>\n      </div>\n\n      <div class=\"gallery-grid reveal\">\n        <div class=\"gallery-item\">\n          <img src=\"assets/img/Img1.png\" alt=\"Gallery Image 1\" />\n        </div>\n\n\n\n        <div class=\"gallery-item\">\n          <img src=\"assets/img/Img3.png\" alt=\"Gallery Image 3\" />\n        </div>\n\n        <div class=\"gallery-item\">\n          <img src=\"assets/img/Img4.png\" alt=\"Gallery Image 4\" />\n        </div>\n\n        <div class=\"gallery-item\">\n          <img src=\"assets/img/Img5.png\" alt=\"Gallery Image 5\" />\n        </div>\n\n        <div class=\"gallery-item\">\n          <img src=\"assets/Galleryimg/GallaryImg1.jpeg\" alt=\"Gallery Image 6\" />\n        </div>\n\n        <div class=\"gallery-item\">\n          <img src=\"assets/Galleryimg/GallaryImg2.jpeg\" alt=\"Gallery Image 7\" />\n        </div>\n\n        <div class=\"gallery-item\">\n          <img src=\"assets/Galleryimg/GallaryImg3.jpeg\" alt=\"Gallery Image 8\" />\n        </div>\n        <div class=\"gallery-item\">\n          <img src=\"assets/img/Img2.png\" alt=\"Gallery Image 2\" />\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- FOOTER -->" }]
    }], function () { return [{ type: i1.SiteInteractionsService }, { type: i2.Title }, { type: i2.Meta }]; }, null); })();
//# sourceMappingURL=gallery.component.js.map