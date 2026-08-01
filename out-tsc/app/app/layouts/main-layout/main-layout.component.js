import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../shared/components/contact-modal/contact-modal.component";
import * as i3 from "../header/header.component";
import * as i4 from "../footer/footer.component";
export class MainLayoutComponent {
}
MainLayoutComponent.ɵfac = function MainLayoutComponent_Factory(t) { return new (t || MainLayoutComponent)(); };
MainLayoutComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MainLayoutComponent, selectors: [["app-main-layout"]], decls: 5, vars: 0, template: function MainLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "app-header");
        i0.ɵɵelementStart(1, "main");
        i0.ɵɵelement(2, "router-outlet");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(3, "app-footer")(4, "app-contact-modal");
    } }, dependencies: [i1.RouterOutlet, i2.ContactModalComponent, i3.HeaderComponent, i4.FooterComponent] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MainLayoutComponent, [{
        type: Component,
        args: [{ selector: 'app-main-layout', template: "<app-header></app-header>\n<main>\n  <router-outlet></router-outlet>\n</main>\n<app-footer></app-footer>\n<app-contact-modal></app-contact-modal>" }]
    }], null, null); })();
//# sourceMappingURL=main-layout.component.js.map