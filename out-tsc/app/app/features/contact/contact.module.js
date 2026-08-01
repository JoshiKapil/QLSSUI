import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import * as i0 from "@angular/core";
export class ContactModule {
}
ContactModule.ɵfac = function ContactModule_Factory(t) { return new (t || ContactModule)(); };
ContactModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ContactModule });
ContactModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, ContactRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactModule, [{
        type: NgModule,
        args: [{
                declarations: [ContactComponent],
                imports: [SharedModule, ContactRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ContactModule, { declarations: [ContactComponent], imports: [SharedModule, ContactRoutingModule] }); })();
//# sourceMappingURL=contact.module.js.map