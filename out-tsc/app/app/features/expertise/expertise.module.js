import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ExpertiseComponent } from './expertise.component';
import { ExpertiseRoutingModule } from './expertise-routing.module';
import * as i0 from "@angular/core";
export class ExpertiseModule {
}
ExpertiseModule.ɵfac = function ExpertiseModule_Factory(t) { return new (t || ExpertiseModule)(); };
ExpertiseModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ExpertiseModule });
ExpertiseModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, ExpertiseRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExpertiseModule, [{
        type: NgModule,
        args: [{
                declarations: [ExpertiseComponent],
                imports: [SharedModule, ExpertiseRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ExpertiseModule, { declarations: [ExpertiseComponent], imports: [SharedModule, ExpertiseRoutingModule] }); })();
//# sourceMappingURL=expertise.module.js.map