import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { VerifyComponent } from './verify.component';
import { VerifyRoutingModule } from './verify-routing.module';
import * as i0 from "@angular/core";
export class VerifyModule {
}
VerifyModule.ɵfac = function VerifyModule_Factory(t) { return new (t || VerifyModule)(); };
VerifyModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: VerifyModule });
VerifyModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, VerifyRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VerifyModule, [{
        type: NgModule,
        args: [{
                declarations: [VerifyComponent],
                imports: [SharedModule, VerifyRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VerifyModule, { declarations: [VerifyComponent], imports: [SharedModule, VerifyRoutingModule] }); })();
//# sourceMappingURL=verify.module.js.map