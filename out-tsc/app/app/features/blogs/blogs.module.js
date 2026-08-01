import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BlogsComponent } from './blogs.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import * as i0 from "@angular/core";
export class BlogsModule {
}
BlogsModule.ɵfac = function BlogsModule_Factory(t) { return new (t || BlogsModule)(); };
BlogsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: BlogsModule });
BlogsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, BlogsRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogsModule, [{
        type: NgModule,
        args: [{
                declarations: [BlogsComponent],
                imports: [SharedModule, BlogsRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BlogsModule, { declarations: [BlogsComponent], imports: [SharedModule, BlogsRoutingModule] }); })();
//# sourceMappingURL=blogs.module.js.map