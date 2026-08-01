import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import * as i0 from "@angular/core";
export class LayoutsModule {
}
LayoutsModule.ɵfac = function LayoutsModule_Factory(t) { return new (t || LayoutsModule)(); };
LayoutsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: LayoutsModule });
LayoutsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LayoutsModule, [{
        type: NgModule,
        args: [{
                declarations: [HeaderComponent, FooterComponent, MainLayoutComponent],
                imports: [SharedModule, RouterModule],
                exports: [MainLayoutComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LayoutsModule, { declarations: [HeaderComponent, FooterComponent, MainLayoutComponent], imports: [SharedModule, RouterModule], exports: [MainLayoutComponent] }); })();
//# sourceMappingURL=layouts.module.js.map