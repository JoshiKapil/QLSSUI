import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import * as i0 from "@angular/core";
export class HomeModule {
}
HomeModule.ɵfac = function HomeModule_Factory(t) { return new (t || HomeModule)(); };
HomeModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: HomeModule });
HomeModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, HomeRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeModule, [{
        type: NgModule,
        args: [{
                declarations: [HomeComponent],
                imports: [SharedModule, HomeRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(HomeModule, { declarations: [HomeComponent], imports: [SharedModule, HomeRoutingModule] }); })();
//# sourceMappingURL=home.module.js.map