import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SupplyChainComponent } from './supply-chain.component';
import { SupplyChainRoutingModule } from './supply-chain-routing.module';
import * as i0 from "@angular/core";
export class SupplyChainModule {
}
SupplyChainModule.ɵfac = function SupplyChainModule_Factory(t) { return new (t || SupplyChainModule)(); };
SupplyChainModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SupplyChainModule });
SupplyChainModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, SupplyChainRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupplyChainModule, [{
        type: NgModule,
        args: [{
                declarations: [SupplyChainComponent],
                imports: [SharedModule, SupplyChainRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SupplyChainModule, { declarations: [SupplyChainComponent], imports: [SharedModule, SupplyChainRoutingModule] }); })();
//# sourceMappingURL=supply-chain.module.js.map