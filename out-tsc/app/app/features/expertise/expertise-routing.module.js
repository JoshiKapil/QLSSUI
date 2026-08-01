import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpertiseComponent } from './expertise.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: ExpertiseComponent }];
export class ExpertiseRoutingModule {
}
ExpertiseRoutingModule.ɵfac = function ExpertiseRoutingModule_Factory(t) { return new (t || ExpertiseRoutingModule)(); };
ExpertiseRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ExpertiseRoutingModule });
ExpertiseRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExpertiseRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ExpertiseRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=expertise-routing.module.js.map