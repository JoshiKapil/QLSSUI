import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstError } from '../auth-form.helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "../../../core/services/notifier.service";
import * as i4 from "@angular/router";
export class ForgotPasswordComponent {
    constructor(fb, authService, notifier) {
        this.fb = fb;
        this.authService = authService;
        this.notifier = notifier;
        this.isSubmitting = false;
        this.firstError = firstError;
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        this.authService.forgotPassword(this.form.value.email || '').subscribe({
            next: () => this.notifier.successToastr('Password reset instructions sent if the account exists.'),
            complete: () => (this.isSubmitting = false)
        });
    }
}
ForgotPasswordComponent.ɵfac = function ForgotPasswordComponent_Factory(t) { return new (t || ForgotPasswordComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.NotifierService)); };
ForgotPasswordComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForgotPasswordComponent, selectors: [["app-forgot-password"]], decls: 23, vars: 4, consts: [[1, "auth-section"], [1, "container", "auth-shell"], [1, "auth-panel"], [1, "auth-panel__header"], [1, "auth-eyebrow"], [1, "auth-form", 3, "formGroup", "ngSubmit"], [1, "form-field"], ["type", "email", "formControlName", "email"], ["type", "submit", 1, "btn", "btn-primary", "auth-submit", 3, "disabled"], [1, "auth-links"], ["routerLink", "/login"], ["routerLink", "/reset-password"]], template: function ForgotPasswordComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        i0.ɵɵtext(5, "Password Help");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Forgot Password");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Enter your email address to request reset instructions.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "form", 5);
        i0.ɵɵlistener("ngSubmit", function ForgotPasswordComponent_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(11, "label", 6);
        i0.ɵɵtext(12, " Email ");
        i0.ɵɵelement(13, "input", 7);
        i0.ɵɵelementStart(14, "small");
        i0.ɵɵtext(15);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(16, "button", 8);
        i0.ɵɵtext(17);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "div", 9)(19, "a", 10);
        i0.ɵɵtext(20, "Back to login");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "a", 11);
        i0.ɵɵtext(22, "I have a reset token");
        i0.ɵɵelementEnd()()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("email"), "Email"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Sending..." : "Send Reset Link", " ");
    } }, dependencies: [i4.RouterLinkWithHref, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotPasswordComponent, [{
        type: Component,
        args: [{ selector: 'app-forgot-password', template: "<section class=\"auth-section\">\n  <div class=\"container auth-shell\">\n    <div class=\"auth-panel\">\n      <div class=\"auth-panel__header\">\n        <span class=\"auth-eyebrow\">Password Help</span>\n        <h1>Forgot Password</h1>\n        <p>Enter your email address to request reset instructions.</p>\n      </div>\n\n      <form class=\"auth-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <label class=\"form-field\">\n          Email\n          <input type=\"email\" formControlName=\"email\" />\n          <small>{{ firstError(form.get('email'), 'Email') }}</small>\n        </label>\n\n        <button class=\"btn btn-primary auth-submit\" type=\"submit\" [disabled]=\"isSubmitting\">\n          {{ isSubmitting ? 'Sending...' : 'Send Reset Link' }}\n        </button>\n\n        <div class=\"auth-links\">\n          <a routerLink=\"/login\">Back to login</a>\n          <a routerLink=\"/reset-password\">I have a reset token</a>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.NotifierService }]; }, null); })();
//# sourceMappingURL=forgot-password.component.js.map