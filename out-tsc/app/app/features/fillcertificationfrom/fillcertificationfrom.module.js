import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FillcertificationfromRoutingModule } from './fillcertificationfrom-routing.module';
import { FillcertificationfromComponent } from './fillcertificationfrom.component';
import * as i0 from "@angular/core";
export class FillcertificationfromModule {
}
FillcertificationfromModule.ɵfac = function FillcertificationfromModule_Factory(t) { return new (t || FillcertificationfromModule)(); };
FillcertificationfromModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: FillcertificationfromModule });
FillcertificationfromModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, FillcertificationfromRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FillcertificationfromModule, [{
        type: NgModule,
        args: [{
                declarations: [FillcertificationfromComponent],
                imports: [SharedModule, FillcertificationfromRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(FillcertificationfromModule, { declarations: [FillcertificationfromComponent], imports: [SharedModule, FillcertificationfromRoutingModule] }); })();
//# sourceMappingURL=fillcertificationfrom.module.js.map