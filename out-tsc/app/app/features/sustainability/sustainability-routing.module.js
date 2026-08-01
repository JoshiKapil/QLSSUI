import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SustainabilityComponent } from './sustainability.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: SustainabilityComponent }];
export class SustainabilityRoutingModule {
}
SustainabilityRoutingModule.ɵfac = function SustainabilityRoutingModule_Factory(t) { return new (t || SustainabilityRoutingModule)(); };
SustainabilityRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SustainabilityRoutingModule });
SustainabilityRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SustainabilityRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SustainabilityRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=sustainability-routing.module.js.map