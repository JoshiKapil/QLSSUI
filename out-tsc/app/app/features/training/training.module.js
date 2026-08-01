import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';
import * as i0 from "@angular/core";
export class TrainingModule {
}
TrainingModule.ɵfac = function TrainingModule_Factory(t) { return new (t || TrainingModule)(); };
TrainingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TrainingModule });
TrainingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, TrainingRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrainingModule, [{
        type: NgModule,
        args: [{
                declarations: [TrainingComponent],
                imports: [SharedModule, TrainingRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TrainingModule, { declarations: [TrainingComponent], imports: [SharedModule, TrainingRoutingModule] }); })();
//# sourceMappingURL=training.module.js.map