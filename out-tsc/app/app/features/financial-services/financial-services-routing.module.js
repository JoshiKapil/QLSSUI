import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinancialServicesComponent } from './financial-services.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: FinancialServicesComponent }];
export class FinancialServicesRoutingModule {
}
FinancialServicesRoutingModule.ɵfac = function FinancialServicesRoutingModule_Factory(t) { return new (t || FinancialServicesRoutingModule)(); };
FinancialServicesRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: FinancialServicesRoutingModule });
FinancialServicesRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FinancialServicesRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(FinancialServicesRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=financial-services-routing.module.js.map