import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';
import * as i0 from "@angular/core";
export class TeamsModule {
}
TeamsModule.ɵfac = function TeamsModule_Factory(t) { return new (t || TeamsModule)(); };
TeamsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TeamsModule });
TeamsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, TeamsRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeamsModule, [{
        type: NgModule,
        args: [{
                declarations: [TeamsComponent],
                imports: [SharedModule, TeamsRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TeamsModule, { declarations: [TeamsComponent], imports: [SharedModule, TeamsRoutingModule] }); })();
//# sourceMappingURL=teams.module.js.map