import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: FaqComponent }];
export class FaqRoutingModule {
}
FaqRoutingModule.ɵfac = function FaqRoutingModule_Factory(t) { return new (t || FaqRoutingModule)(); };
FaqRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: FaqRoutingModule });
FaqRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FaqRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(FaqRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=faq-routing.module.js.map