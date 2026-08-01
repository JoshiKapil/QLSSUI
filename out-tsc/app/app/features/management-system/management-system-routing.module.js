import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagementSystemComponent } from './management-system.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: ManagementSystemComponent }];
export class ManagementSystemRoutingModule {
}
ManagementSystemRoutingModule.ɵfac = function ManagementSystemRoutingModule_Factory(t) { return new (t || ManagementSystemRoutingModule)(); };
ManagementSystemRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ManagementSystemRoutingModule });
ManagementSystemRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ManagementSystemRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ManagementSystemRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=management-system-routing.module.js.map