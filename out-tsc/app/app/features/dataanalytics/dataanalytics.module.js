import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataanalyticsComponent } from './dataanalytics.component';
import { DataanalyticsRoutingModule } from './dataanalytics-routing.module';
import * as i0 from "@angular/core";
export class DataanalyticsModule {
}
DataanalyticsModule.ɵfac = function DataanalyticsModule_Factory(t) { return new (t || DataanalyticsModule)(); };
DataanalyticsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: DataanalyticsModule });
DataanalyticsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, DataanalyticsRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataanalyticsModule, [{
        type: NgModule,
        args: [{
                declarations: [DataanalyticsComponent],
                imports: [SharedModule, DataanalyticsRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DataanalyticsModule, { declarations: [DataanalyticsComponent], imports: [SharedModule, DataanalyticsRoutingModule] }); })();
//# sourceMappingURL=dataanalytics.module.js.map