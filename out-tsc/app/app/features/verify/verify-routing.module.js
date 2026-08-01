import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerifyComponent } from './verify.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: VerifyComponent }];
export class VerifyRoutingModule {
}
VerifyRoutingModule.ɵfac = function VerifyRoutingModule_Factory(t) { return new (t || VerifyRoutingModule)(); };
VerifyRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: VerifyRoutingModule });
VerifyRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VerifyRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VerifyRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=verify-routing.module.js.map