import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SustainabilityComponent } from './sustainability.component';
import { SustainabilityRoutingModule } from './sustainability-routing.module';
import * as i0 from "@angular/core";
export class SustainabilityModule {
}
SustainabilityModule.ɵfac = function SustainabilityModule_Factory(t) { return new (t || SustainabilityModule)(); };
SustainabilityModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SustainabilityModule });
SustainabilityModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, SustainabilityRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SustainabilityModule, [{
        type: NgModule,
        args: [{
                declarations: [SustainabilityComponent],
                imports: [SharedModule, SustainabilityRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SustainabilityModule, { declarations: [SustainabilityComponent], imports: [SharedModule, SustainabilityRoutingModule] }); })();
//# sourceMappingURL=sustainability.module.js.map