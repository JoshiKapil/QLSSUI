import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import * as i0 from "@angular/core";
export class GalleryModule {
}
GalleryModule.ɵfac = function GalleryModule_Factory(t) { return new (t || GalleryModule)(); };
GalleryModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: GalleryModule });
GalleryModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, GalleryRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GalleryModule, [{
        type: NgModule,
        args: [{
                declarations: [GalleryComponent],
                imports: [SharedModule, GalleryRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(GalleryModule, { declarations: [GalleryComponent], imports: [SharedModule, GalleryRoutingModule] }); })();
//# sourceMappingURL=gallery.module.js.map