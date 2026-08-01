import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { InformationSecurityRoutingModule } from './information-security-routing.module';
import { InformationSecurityComponent } from './information-security.component';
import * as i0 from "@angular/core";
export class InformationSecurityModule {
}
InformationSecurityModule.ɵfac = function InformationSecurityModule_Factory(t) { return new (t || InformationSecurityModule)(); };
InformationSecurityModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: InformationSecurityModule });
InformationSecurityModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, InformationSecurityRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InformationSecurityModule, [{
        type: NgModule,
        args: [{
                declarations: [InformationSecurityComponent],
                imports: [SharedModule, InformationSecurityRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(InformationSecurityModule, { declarations: [InformationSecurityComponent], imports: [SharedModule, InformationSecurityRoutingModule] }); })();
//# sourceMappingURL=information-security.module.js.map