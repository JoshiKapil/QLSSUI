import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ManagementSystemComponent } from './management-system.component';
import { ManagementSystemRoutingModule } from './management-system-routing.module';
import * as i0 from "@angular/core";
export class ManagementSystemModule {
}
ManagementSystemModule.ɵfac = function ManagementSystemModule_Factory(t) { return new (t || ManagementSystemModule)(); };
ManagementSystemModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ManagementSystemModule });
ManagementSystemModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, ManagementSystemRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ManagementSystemModule, [{
        type: NgModule,
        args: [{
                declarations: [ManagementSystemComponent],
                imports: [SharedModule, ManagementSystemRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ManagementSystemModule, { declarations: [ManagementSystemComponent], imports: [SharedModule, ManagementSystemRoutingModule] }); })();
//# sourceMappingURL=management-system.module.js.map