import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstError } from '../auth-form.helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "../../../core/services/notifier.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
function LoginComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
export class LoginComponent {
    constructor(fb, authService, notifier, router) {
        this.fb = fb;
        this.authService = authService;
        this.notifier = notifier;
        this.router = router;
        this.isSubmitting = false;
        this.errorMessage = '';
        this.firstError = firstError;
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [true]
        });
    }
    submit() {
        this.errorMessage = '';
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        const value = this.form.value;
        this.authService
            .login({
            email: value.email || '',
            password: value.password || '',
            rememberMe: !!value.rememberMe
        })
            .subscribe({
            next: () => {
                this.notifier.successToastr('Logged in successfully.');
                this.router.navigate(['/']);
            },
            error: (error) => {
                this.errorMessage = 'Invalid email or password.';
                this.isSubmitting = false;
            },
            complete: () => (this.isSubmitting = false)
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.NotifierService), i0.ɵɵdirectiveInject(i4.Router)); };
LoginComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], decls: 32, vars: 6, consts: [[1, "auth-section"], [1, "container", "auth-shell"], [1, "auth-panel"], [1, "auth-panel__header"], [1, "auth-eyebrow"], [1, "auth-form", 3, "formGroup", "ngSubmit"], [1, "form-field"], ["type", "email", "formControlName", "email", "autocomplete", "email"], ["type", "password", "formControlName", "password", "autocomplete", "current-password"], [1, "check-row"], ["type", "checkbox", "formControlName", "rememberMe"], ["class", "form-error", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "auth-submit", 3, "disabled"], [1, "auth-links"], ["routerLink", "/register"], ["routerLink", "/forgot-password"], [1, "form-error"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        i0.ɵɵtext(5, "Account Access");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Login");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Sign in to manage your profile and protected QLSS pages.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "form", 5);
        i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(11, "label", 6);
        i0.ɵɵtext(12, " Email ");
        i0.ɵɵelement(13, "input", 7);
        i0.ɵɵelementStart(14, "small");
        i0.ɵɵtext(15);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(16, "label", 6);
        i0.ɵɵtext(17, " Password ");
        i0.ɵɵelement(18, "input", 8);
        i0.ɵɵelementStart(19, "small");
        i0.ɵɵtext(20);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(21, "label", 9);
        i0.ɵɵelement(22, "input", 10);
        i0.ɵɵtext(23, " Remember me ");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, LoginComponent_div_24_Template, 2, 1, "div", 11);
        i0.ɵɵelementStart(25, "button", 12);
        i0.ɵɵtext(26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "div", 13)(28, "a", 14);
        i0.ɵɵtext(29, "Create account");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "a", 15);
        i0.ɵɵtext(31, "Forgot password?");
        i0.ɵɵelementEnd()()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("email"), "Email"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("password"), "Password"));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.errorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Signing in..." : "Login", " ");
    } }, dependencies: [i5.NgIf, i4.RouterLinkWithHref, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'app-login', template: "<section class=\"auth-section\">\n  <div class=\"container auth-shell\">\n    <div class=\"auth-panel\">\n      <div class=\"auth-panel__header\">\n        <span class=\"auth-eyebrow\">Account Access</span>\n        <h1>Login</h1>\n        <p>Sign in to manage your profile and protected QLSS pages.</p>\n      </div>\n\n      <form class=\"auth-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <label class=\"form-field\">\n          Email\n          <input type=\"email\" formControlName=\"email\" autocomplete=\"email\" />\n          <small>{{ firstError(form.get('email'), 'Email') }}</small>\n        </label>\n\n        <label class=\"form-field\">\n          Password\n          <input type=\"password\" formControlName=\"password\" autocomplete=\"current-password\" />\n          <small>{{ firstError(form.get('password'), 'Password') }}</small>\n        </label>\n\n        <label class=\"check-row\">\n          <input type=\"checkbox\" formControlName=\"rememberMe\" />\n          Remember me\n        </label>\n\n        <div *ngIf=\"errorMessage\" class=\"form-error\">{{ errorMessage }}</div>\n\n        <button class=\"btn btn-primary auth-submit\" type=\"submit\" [disabled]=\"isSubmitting\">\n          {{ isSubmitting ? 'Signing in...' : 'Login' }}\n        </button>\n\n        <div class=\"auth-links\">\n          <a routerLink=\"/register\">Create account</a>\n          <a routerLink=\"/forgot-password\">Forgot password?</a>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.NotifierService }, { type: i4.Router }]; }, null); })();
//# sourceMappingURL=login.component.js.map