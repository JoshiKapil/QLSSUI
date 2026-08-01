import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import * as i0 from "@angular/core";
export class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                declarations: [ContactModalComponent],
                imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
                exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ContactModalComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SharedModule, { declarations: [ContactModalComponent], imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule], exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ContactModalComponent] }); })();
//# sourceMappingURL=shared.module.js.map