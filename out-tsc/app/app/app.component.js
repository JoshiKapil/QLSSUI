import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./core/services/seo.service";
import * as i2 from "@angular/router";
export class AppComponent {
    constructor(seoService) {
        this.seoService = seoService;
    }
    ngOnInit() {
        this.seoService.init();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(i0.ɵɵdirectiveInject(i1.SeoService)); };
AppComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "router-outlet");
    } }, dependencies: [i2.RouterOutlet] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{ selector: 'app-root', template: "<router-outlet></router-outlet>" }]
    }], function () { return [{ type: i1.SeoService }]; }, null); })();
//# sourceMappingURL=app.component.js.map