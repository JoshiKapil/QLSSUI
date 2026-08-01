import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OperationalexcellenceComponent } from './operationalexcellence.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: OperationalexcellenceComponent }];
export class OperationalexcellenceRoutingModule {
}
OperationalexcellenceRoutingModule.ɵfac = function OperationalexcellenceRoutingModule_Factory(t) { return new (t || OperationalexcellenceRoutingModule)(); };
OperationalexcellenceRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: OperationalexcellenceRoutingModule });
OperationalexcellenceRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OperationalexcellenceRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(OperationalexcellenceRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=operationalexcellence-routing.module.js.map