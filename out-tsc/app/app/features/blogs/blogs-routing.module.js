import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: BlogsComponent }];
export class BlogsRoutingModule {
}
BlogsRoutingModule.ɵfac = function BlogsRoutingModule_Factory(t) { return new (t || BlogsRoutingModule)(); };
BlogsRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: BlogsRoutingModule });
BlogsRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogsRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BlogsRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=blogs-routing.module.js.map