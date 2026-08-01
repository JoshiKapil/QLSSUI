import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [{ path: '', component: GalleryComponent }];
export class GalleryRoutingModule {
}
GalleryRoutingModule.ɵfac = function GalleryRoutingModule_Factory(t) { return new (t || GalleryRoutingModule)(); };
GalleryRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: GalleryRoutingModule });
GalleryRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GalleryRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(GalleryRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=gallery-routing.module.js.map