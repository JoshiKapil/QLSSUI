import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test.component';
import { ResultComponent } from './result.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: 'result', component: ResultComponent },
    { path: '', component: TestComponent }
];
export class TestRoutingModule {
}
TestRoutingModule.ɵfac = function TestRoutingModule_Factory(t) { return new (t || TestRoutingModule)(); };
TestRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TestRoutingModule });
TestRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TestRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=test-routing.module.js.map