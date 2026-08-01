import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstError, passwordMatchValidator, passwordPattern } from '../auth-form.helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "../../../core/services/notifier.service";
import * as i4 from "@angular/common";
function ChangePasswordComponent_small_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Passwords must match.");
    i0.ɵɵelementEnd();
} }
export class ChangePasswordComponent {
    constructor(fb, authService, notifier) {
        this.fb = fb;
        this.authService = authService;
        this.notifier = notifier;
        this.isSubmitting = false;
        this.firstError = firstError;
        this.form = this.fb.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
            confirmPassword: ['', Validators.required]
        }, { validators: passwordMatchValidator('newPassword', 'confirmPassword') });
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        this.authService
            .changePassword({
            oldPassword: this.form.value.oldPassword || '',
            newPassword: this.form.value.newPassword || '',
            confirmPassword: this.form.value.confirmPassword || ''
        })
            .subscribe({
            next: () => this.notifier.successToastr('Password changed successfully.'),
            complete: () => {
                this.form.reset();
                this.isSubmitting = false;
            }
        });
    }
}
ChangePasswordComponent.ɵfac = function ChangePasswordComponent_Factory(t) { return new (t || ChangePasswordComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.NotifierService)); };
ChangePasswordComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChangePasswordComponent, selectors: [["app-change-password"]], decls: 28, vars: 6, consts: [[1, "auth-section"], [1, "container", "auth-shell"], [1, "auth-panel"], [1, "auth-panel__header"], [1, "auth-eyebrow"], [1, "auth-form", 3, "formGroup", "ngSubmit"], [1, "form-field"], ["type", "password", "formControlName", "oldPassword"], [1, "auth-grid"], ["type", "password", "formControlName", "newPassword"], ["type", "password", "formControlName", "confirmPassword"], [4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "auth-submit", 3, "disabled"]], template: function ChangePasswordComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        i0.ɵɵtext(5, "Security");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Change Password");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Update the password for your logged-in account.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "form", 5);
        i0.ɵɵlistener("ngSubmit", function ChangePasswordComponent_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(11, "label", 6);
        i0.ɵɵtext(12, " Current Password ");
        i0.ɵɵelement(13, "input", 7);
        i0.ɵɵelementStart(14, "small");
        i0.ɵɵtext(15);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(16, "div", 8)(17, "label", 6);
        i0.ɵɵtext(18, " New Password ");
        i0.ɵɵelement(19, "input", 9);
        i0.ɵɵelementStart(20, "small");
        i0.ɵɵtext(21);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(22, "label", 6);
        i0.ɵɵtext(23, " Confirm Password ");
        i0.ɵɵelement(24, "input", 10);
        i0.ɵɵtemplate(25, ChangePasswordComponent_small_25_Template, 2, 0, "small", 11);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(26, "button", 12);
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        let tmp_3_0;
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("oldPassword"), "Current password"));
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("newPassword"), "New password"));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.form.hasError("passwordMismatch") && ((tmp_3_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_3_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Saving..." : "Change Password", " ");
    } }, dependencies: [i4.NgIf, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChangePasswordComponent, [{
        type: Component,
        args: [{ selector: 'app-change-password', template: "<section class=\"auth-section\">\n  <div class=\"container auth-shell\">\n    <div class=\"auth-panel\">\n      <div class=\"auth-panel__header\">\n        <span class=\"auth-eyebrow\">Security</span>\n        <h1>Change Password</h1>\n        <p>Update the password for your logged-in account.</p>\n      </div>\n\n      <form class=\"auth-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <label class=\"form-field\">\n          Current Password\n          <input type=\"password\" formControlName=\"oldPassword\" />\n          <small>{{ firstError(form.get('oldPassword'), 'Current password') }}</small>\n        </label>\n\n        <div class=\"auth-grid\">\n          <label class=\"form-field\">\n            New Password\n            <input type=\"password\" formControlName=\"newPassword\" />\n            <small>{{ firstError(form.get('newPassword'), 'New password') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Confirm Password\n            <input type=\"password\" formControlName=\"confirmPassword\" />\n            <small *ngIf=\"form.hasError('passwordMismatch') && form.get('confirmPassword')?.touched\">Passwords must match.</small>\n          </label>\n        </div>\n\n        <button class=\"btn btn-primary auth-submit\" type=\"submit\" [disabled]=\"isSubmitting\">\n          {{ isSubmitting ? 'Saving...' : 'Change Password' }}\n        </button>\n      </form>\n    </div>\n  </div>\n</section>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.NotifierService }]; }, null); })();
//# sourceMappingURL=change-password.component.js.map