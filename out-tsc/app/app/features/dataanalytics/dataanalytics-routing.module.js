import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataanalyticsComponent } from './dataanalytics.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: DataanalyticsComponent }];
export class DataanalyticsRoutingModule {
}
DataanalyticsRoutingModule.ɵfac = function DataanalyticsRoutingModule_Factory(t) { return new (t || DataanalyticsRoutingModule)(); };
DataanalyticsRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: DataanalyticsRoutingModule });
DataanalyticsRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataanalyticsRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DataanalyticsRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=dataanalytics-routing.module.js.map