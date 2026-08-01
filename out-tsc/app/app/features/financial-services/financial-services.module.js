import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FinancialServicesComponent } from './financial-services.component';
import { FinancialServicesRoutingModule } from './financial-services-routing.module';
import * as i0 from "@angular/core";
export class FinancialServicesModule {
}
FinancialServicesModule.ɵfac = function FinancialServicesModule_Factory(t) { return new (t || FinancialServicesModule)(); };
FinancialServicesModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: FinancialServicesModule });
FinancialServicesModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, FinancialServicesRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FinancialServicesModule, [{
        type: NgModule,
        args: [{
                declarations: [FinancialServicesComponent],
                imports: [SharedModule, FinancialServicesRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(FinancialServicesModule, { declarations: [FinancialServicesComponent], imports: [SharedModule, FinancialServicesRoutingModule] }); })();
//# sourceMappingURL=financial-services.module.js.map