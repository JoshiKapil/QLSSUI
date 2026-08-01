import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstError, passwordMatchValidator, passwordPattern, phonePattern } from '../auth-form.helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "../../../core/services/notifier.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
function RegisterComponent_small_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Passwords must match.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_div_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
export class RegisterComponent {
    constructor(fb, authService, notifier, router) {
        this.fb = fb;
        this.authService = authService;
        this.notifier = notifier;
        this.router = router;
        this.isSubmitting = false;
        this.errorMessage = '';
        this.firstError = firstError;
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
            confirmPassword: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern(phonePattern)]],
            address: ['', Validators.required],
            role: ['User', Validators.required],
            createdAt: [new Date().toISOString(), Validators.required],
            updatedAt: [new Date().toISOString(), Validators.required]
        }, { validators: passwordMatchValidator() });
    }
    submit() {
        this.errorMessage = '';
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const value = this.form.value;
        this.isSubmitting = true;
        this.authService
            .register({
            name: value.name || '',
            email: value.email || '',
            password: value.password || '',
            phone: value.phone || '',
            address: value.address || '',
            role: value.role || 'User',
            createdAt: value.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
            .subscribe({
            next: () => {
                this.notifier.successToastr('Registration completed. Please login.');
                this.router.navigate(['/login']);
            },
            error: (error) => {
                this.errorMessage = (error === null || error === void 0 ? void 0 : error.message) || 'Registration failed.';
                this.isSubmitting = false;
            },
            complete: () => (this.isSubmitting = false)
        });
    }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.NotifierService), i0.ɵɵdirectiveInject(i4.Router)); };
RegisterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RegisterComponent, selectors: [["app-register"]], decls: 54, vars: 11, consts: [[1, "auth-section"], [1, "container", "auth-shell"], [1, "auth-panel"], [1, "auth-panel__header"], [1, "auth-eyebrow"], [1, "auth-form", 3, "formGroup", "ngSubmit"], [1, "auth-grid"], [1, "form-field"], ["type", "text", "formControlName", "name"], ["type", "email", "formControlName", "email"], ["type", "password", "formControlName", "password"], ["type", "password", "formControlName", "confirmPassword"], [4, "ngIf"], ["type", "tel", "formControlName", "phone"], ["formControlName", "role"], ["value", "User"], ["rows", "3", "formControlName", "address"], ["class", "form-error", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "auth-submit", 3, "disabled"], [1, "auth-links"], ["routerLink", "/login"], [1, "form-error"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        i0.ɵɵtext(5, "New Account");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Register");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Create your QLSS user profile.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "form", 5);
        i0.ɵɵlistener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(11, "div", 6)(12, "label", 7);
        i0.ɵɵtext(13, " Name ");
        i0.ɵɵelement(14, "input", 8);
        i0.ɵɵelementStart(15, "small");
        i0.ɵɵtext(16);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(17, "label", 7);
        i0.ɵɵtext(18, " Email ");
        i0.ɵɵelement(19, "input", 9);
        i0.ɵɵelementStart(20, "small");
        i0.ɵɵtext(21);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(22, "label", 7);
        i0.ɵɵtext(23, " Password ");
        i0.ɵɵelement(24, "input", 10);
        i0.ɵɵelementStart(25, "small");
        i0.ɵɵtext(26);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(27, "label", 7);
        i0.ɵɵtext(28, " Confirm Password ");
        i0.ɵɵelement(29, "input", 11);
        i0.ɵɵtemplate(30, RegisterComponent_small_30_Template, 2, 0, "small", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "label", 7);
        i0.ɵɵtext(32, " Phone ");
        i0.ɵɵelement(33, "input", 13);
        i0.ɵɵelementStart(34, "small");
        i0.ɵɵtext(35);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(36, "label", 7);
        i0.ɵɵtext(37, " Role ");
        i0.ɵɵelementStart(38, "select", 14)(39, "option", 15);
        i0.ɵɵtext(40, "User");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(41, "small");
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(43, "label", 7);
        i0.ɵɵtext(44, " Address ");
        i0.ɵɵelement(45, "textarea", 16);
        i0.ɵɵelementStart(46, "small");
        i0.ɵɵtext(47);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(48, RegisterComponent_div_48_Template, 2, 1, "div", 17);
        i0.ɵɵelementStart(49, "button", 18);
        i0.ɵɵtext(50);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "div", 19)(52, "a", 20);
        i0.ɵɵtext(53, "Already have an account?");
        i0.ɵɵelementEnd()()()()()();
    } if (rf & 2) {
        let tmp_4_0;
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("name"), "Name"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("email"), "Email"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("password"), "Password"));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.form.hasError("passwordMismatch") && ((tmp_4_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_4_0.touched));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("phone"), "Phone"));
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("role"), "Role"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("address"), "Address"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.errorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Creating..." : "Register", " ");
    } }, dependencies: [i5.NgIf, i4.RouterLinkWithHref, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterComponent, [{
        type: Component,
        args: [{ selector: 'app-register', template: "<section class=\"auth-section\">\n  <div class=\"container auth-shell\">\n    <div class=\"auth-panel\">\n      <div class=\"auth-panel__header\">\n        <span class=\"auth-eyebrow\">New Account</span>\n        <h1>Register</h1>\n        <p>Create your QLSS user profile.</p>\n      </div>\n\n      <form class=\"auth-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <div class=\"auth-grid\">\n          <label class=\"form-field\">\n            Name\n            <input type=\"text\" formControlName=\"name\" />\n            <small>{{ firstError(form.get('name'), 'Name') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Email\n            <input type=\"email\" formControlName=\"email\" />\n            <small>{{ firstError(form.get('email'), 'Email') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Password\n            <input type=\"password\" formControlName=\"password\" />\n            <small>{{ firstError(form.get('password'), 'Password') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Confirm Password\n            <input type=\"password\" formControlName=\"confirmPassword\" />\n            <small *ngIf=\"form.hasError('passwordMismatch') && form.get('confirmPassword')?.touched\">Passwords must match.</small>\n          </label>\n\n          <label class=\"form-field\">\n            Phone\n            <input type=\"tel\" formControlName=\"phone\" />\n            <small>{{ firstError(form.get('phone'), 'Phone') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Role\n            <select formControlName=\"role\">\n              <option value=\"User\">User</option>\n              <!-- <option value=\"Admin\">Admin</option> -->\n            </select>\n            <small>{{ firstError(form.get('role'), 'Role') }}</small>\n          </label>\n        </div>\n\n        <label class=\"form-field\">\n          Address\n          <textarea rows=\"3\" formControlName=\"address\"></textarea>\n          <small>{{ firstError(form.get('address'), 'Address') }}</small>\n        </label>\n\n        <div *ngIf=\"errorMessage\" class=\"form-error\">{{ errorMessage }}</div>\n\n        <button class=\"btn btn-primary auth-submit\" type=\"submit\" [disabled]=\"isSubmitting\">\n          {{ isSubmitting ? 'Creating...' : 'Register' }}\n        </button>\n\n        <div class=\"auth-links\">\n          <a routerLink=\"/login\">Already have an account?</a>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.NotifierService }, { type: i4.Router }]; }, null); })();
//# sourceMappingURL=register.component.js.map