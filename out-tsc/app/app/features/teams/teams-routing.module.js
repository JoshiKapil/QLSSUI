import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from './teams.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: TeamsComponent }];
export class TeamsRoutingModule {
}
TeamsRoutingModule.ɵfac = function TeamsRoutingModule_Factory(t) { return new (t || TeamsRoutingModule)(); };
TeamsRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TeamsRoutingModule });
TeamsRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeamsRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TeamsRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=teams-routing.module.js.map