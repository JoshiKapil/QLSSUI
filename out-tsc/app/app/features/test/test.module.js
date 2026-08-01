import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TestComponent } from './test.component';
import { TestRoutingModule } from './test-routing.module';
import { ResultComponent } from './result.component';
import * as i0 from "@angular/core";
export class TestModule {
}
TestModule.ɵfac = function TestModule_Factory(t) { return new (t || TestModule)(); };
TestModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TestModule });
TestModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, TestRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestModule, [{
        type: NgModule,
        args: [{
                declarations: [TestComponent, ResultComponent],
                imports: [SharedModule, TestRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TestModule, { declarations: [TestComponent, ResultComponent], imports: [SharedModule, TestRoutingModule] }); })();
//# sourceMappingURL=test.module.js.map