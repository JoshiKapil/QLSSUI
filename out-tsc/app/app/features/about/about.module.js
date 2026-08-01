import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import * as i0 from "@angular/core";
export class AboutModule {
}
AboutModule.ɵfac = function AboutModule_Factory(t) { return new (t || AboutModule)(); };
AboutModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AboutModule });
AboutModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, AboutRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AboutModule, [{
        type: NgModule,
        args: [{
                declarations: [AboutComponent],
                imports: [SharedModule, AboutRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AboutModule, { declarations: [AboutComponent], imports: [SharedModule, AboutRoutingModule] }); })();
//# sourceMappingURL=about.module.js.map