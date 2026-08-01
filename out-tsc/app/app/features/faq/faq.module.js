import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import * as i0 from "@angular/core";
export class FaqModule {
}
FaqModule.ɵfac = function FaqModule_Factory(t) { return new (t || FaqModule)(); };
FaqModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: FaqModule });
FaqModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, FaqRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FaqModule, [{
        type: NgModule,
        args: [{
                declarations: [FaqComponent],
                imports: [SharedModule, FaqRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(FaqModule, { declarations: [FaqComponent], imports: [SharedModule, FaqRoutingModule] }); })();
//# sourceMappingURL=faq.module.js.map