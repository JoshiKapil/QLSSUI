import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InformationSecurityComponent } from './information-security.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: InformationSecurityComponent }];
export class InformationSecurityRoutingModule {
}
InformationSecurityRoutingModule.ɵfac = function InformationSecurityRoutingModule_Factory(t) { return new (t || InformationSecurityRoutingModule)(); };
InformationSecurityRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: InformationSecurityRoutingModule });
InformationSecurityRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InformationSecurityRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(InformationSecurityRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=information-security-routing.module.js.map