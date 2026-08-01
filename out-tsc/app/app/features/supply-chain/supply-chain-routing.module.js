import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupplyChainComponent } from './supply-chain.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: SupplyChainComponent }];
export class SupplyChainRoutingModule {
}
SupplyChainRoutingModule.ɵfac = function SupplyChainRoutingModule_Factory(t) { return new (t || SupplyChainRoutingModule)(); };
SupplyChainRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SupplyChainRoutingModule });
SupplyChainRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupplyChainRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SupplyChainRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=supply-chain-routing.module.js.map