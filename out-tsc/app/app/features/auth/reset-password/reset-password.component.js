import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstError, passwordMatchValidator, passwordPattern } from '../auth-form.helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "../../../core/services/notifier.service";
import * as i5 from "@angular/common";
function ResetPasswordComponent_small_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Passwords must match.");
    i0.ɵɵelementEnd();
} }
export class ResetPasswordComponent {
    constructor(fb, route, authService, notifier, router) {
        this.fb = fb;
        this.route = route;
        this.authService = authService;
        this.notifier = notifier;
        this.router = router;
        this.isSubmitting = false;
        this.firstError = firstError;
        this.form = this.fb.group({
            token: [this.route.snapshot.queryParamMap.get('token')],
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
            .resetPassword({
            token: this.form.value.token,
            newPassword: this.form.value.newPassword || '',
            confirmPassword: this.form.value.confirmPassword || ''
        })
            .subscribe({
            next: () => {
                this.notifier.successToastr('Password reset successfully.');
                this.router.navigate(['/login']);
            },
            complete: () => (this.isSubmitting = false)
        });
    }
}
ResetPasswordComponent.ɵfac = function ResetPasswordComponent_Factory(t) { return new (t || ResetPasswordComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.NotifierService), i0.ɵɵdirectiveInject(i2.Router)); };
ResetPasswordComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResetPasswordComponent, selectors: [["app-reset-password"]], decls: 26, vars: 5, consts: [[1, "auth-section"], [1, "container", "auth-shell"], [1, "auth-panel"], [1, "auth-panel__header"], [1, "auth-eyebrow"], [1, "auth-form", 3, "formGroup", "ngSubmit"], [1, "form-field"], ["type", "text", "formControlName", "token"], [1, "auth-grid"], ["type", "password", "formControlName", "newPassword"], ["type", "password", "formControlName", "confirmPassword"], [4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "auth-submit", 3, "disabled"]], template: function ResetPasswordComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        i0.ɵɵtext(5, "Reset Access");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Reset Password");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Set a new password using your reset token.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "form", 5);
        i0.ɵɵlistener("ngSubmit", function ResetPasswordComponent_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(11, "label", 6);
        i0.ɵɵtext(12, " Reset Token ");
        i0.ɵɵelement(13, "input", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "div", 8)(15, "label", 6);
        i0.ɵɵtext(16, " New Password ");
        i0.ɵɵelement(17, "input", 9);
        i0.ɵɵelementStart(18, "small");
        i0.ɵɵtext(19);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(20, "label", 6);
        i0.ɵɵtext(21, " Confirm Password ");
        i0.ɵɵelement(22, "input", 10);
        i0.ɵɵtemplate(23, ResetPasswordComponent_small_23_Template, 2, 0, "small", 11);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(24, "button", 12);
        i0.ɵɵtext(25);
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        let tmp_2_0;
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("newPassword"), "New password"));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.form.hasError("passwordMismatch") && ((tmp_2_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_2_0.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Resetting..." : "Reset Password", " ");
    } }, dependencies: [i5.NgIf, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResetPasswordComponent, [{
        type: Component,
        args: [{ selector: 'app-reset-password', template: "<section class=\"auth-section\">\n  <div class=\"container auth-shell\">\n    <div class=\"auth-panel\">\n      <div class=\"auth-panel__header\">\n        <span class=\"auth-eyebrow\">Reset Access</span>\n        <h1>Reset Password</h1>\n        <p>Set a new password using your reset token.</p>\n      </div>\n\n      <form class=\"auth-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <label class=\"form-field\">\n          Reset Token\n          <input type=\"text\" formControlName=\"token\" />\n        </label>\n\n        <div class=\"auth-grid\">\n          <label class=\"form-field\">\n            New Password\n            <input type=\"password\" formControlName=\"newPassword\" />\n            <small>{{ firstError(form.get('newPassword'), 'New password') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Confirm Password\n            <input type=\"password\" formControlName=\"confirmPassword\" />\n            <small *ngIf=\"form.hasError('passwordMismatch') && form.get('confirmPassword')?.touched\">Passwords must match.</small>\n          </label>\n        </div>\n\n        <button class=\"btn btn-primary auth-submit\" type=\"submit\" [disabled]=\"isSubmitting\">\n          {{ isSubmitting ? 'Resetting...' : 'Reset Password' }}\n        </button>\n      </form>\n    </div>\n  </div>\n</section>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.ActivatedRoute }, { type: i3.AuthService }, { type: i4.NotifierService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=reset-password.component.js.map