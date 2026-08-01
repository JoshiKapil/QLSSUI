import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstError, phonePattern } from '../auth-form.helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "../../../core/services/notifier.service";
export class EditProfileComponent {
    constructor(fb, authService, notifier) {
        var _a, _b, _c, _d, _e, _f;
        this.fb = fb;
        this.authService = authService;
        this.notifier = notifier;
        this.isSubmitting = false;
        this.firstError = firstError;
        this.user = this.authService.getCurrentUser();
        this.form = this.fb.group({
            name: [((_a = this.user) === null || _a === void 0 ? void 0 : _a.name) || '', Validators.required],
            email: [((_b = this.user) === null || _b === void 0 ? void 0 : _b.email) || '', [Validators.required, Validators.email]],
            phone: [((_c = this.user) === null || _c === void 0 ? void 0 : _c.phone) || '', [Validators.required, Validators.pattern(phonePattern)]],
            address: [((_d = this.user) === null || _d === void 0 ? void 0 : _d.address) || '', Validators.required],
            role: [((_e = this.user) === null || _e === void 0 ? void 0 : _e.role) || 'User', Validators.required],
            createdAt: [((_f = this.user) === null || _f === void 0 ? void 0 : _f.createdAt) || new Date().toISOString(), Validators.required],
            updatedAt: [new Date().toISOString(), Validators.required]
        });
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        this.authService.updateProfile(Object.assign(Object.assign(Object.assign({}, this.user), this.form.value), { updatedAt: new Date().toISOString() })).subscribe({
            next: () => this.notifier.successToastr('Profile updated successfully.'),
            complete: () => (this.isSubmitting = false)
        });
    }
}
EditProfileComponent.ɵfac = function EditProfileComponent_Factory(t) { return new (t || EditProfileComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.NotifierService)); };
EditProfileComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EditProfileComponent, selectors: [["app-edit-profile"]], decls: 49, vars: 8, consts: [[1, "auth-section"], [1, "container", "auth-shell"], [1, "auth-panel"], [1, "auth-panel__header"], [1, "auth-eyebrow"], [1, "auth-form", 3, "formGroup", "ngSubmit"], [1, "auth-grid"], [1, "form-field"], ["type", "text", "formControlName", "name"], ["type", "email", "formControlName", "email"], ["type", "tel", "formControlName", "phone"], ["formControlName", "role"], ["value", "User"], ["value", "Admin"], ["type", "text", "formControlName", "createdAt", "readonly", ""], ["type", "text", "formControlName", "updatedAt", "readonly", ""], ["rows", "3", "formControlName", "address"], ["type", "submit", 1, "btn", "btn-primary", "auth-submit", 3, "disabled"]], template: function EditProfileComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        i0.ɵɵtext(5, "My Account");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Edit Profile");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Keep your profile details up to date.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "form", 5);
        i0.ɵɵlistener("ngSubmit", function EditProfileComponent_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
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
        i0.ɵɵtext(23, " Phone ");
        i0.ɵɵelement(24, "input", 10);
        i0.ɵɵelementStart(25, "small");
        i0.ɵɵtext(26);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(27, "label", 7);
        i0.ɵɵtext(28, " Role ");
        i0.ɵɵelementStart(29, "select", 11)(30, "option", 12);
        i0.ɵɵtext(31, "User");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "option", 13);
        i0.ɵɵtext(33, "Admin");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(34, "small");
        i0.ɵɵtext(35);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(36, "label", 7);
        i0.ɵɵtext(37, " CreatedAt ");
        i0.ɵɵelement(38, "input", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(39, "label", 7);
        i0.ɵɵtext(40, " UpdatedAt ");
        i0.ɵɵelement(41, "input", 15);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(42, "label", 7);
        i0.ɵɵtext(43, " Address ");
        i0.ɵɵelement(44, "textarea", 16);
        i0.ɵɵelementStart(45, "small");
        i0.ɵɵtext(46);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(47, "button", 17);
        i0.ɵɵtext(48);
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("name"), "Name"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("email"), "Email"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("phone"), "Phone"));
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("role"), "Role"));
        i0.ɵɵadvance(11);
        i0.ɵɵtextInterpolate(ctx.firstError(ctx.form.get("address"), "Address"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Saving..." : "Save Profile", " ");
    } }, dependencies: [i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EditProfileComponent, [{
        type: Component,
        args: [{ selector: 'app-edit-profile', template: "<section class=\"auth-section\">\n  <div class=\"container auth-shell\">\n    <div class=\"auth-panel\">\n      <div class=\"auth-panel__header\">\n        <span class=\"auth-eyebrow\">My Account</span>\n        <h1>Edit Profile</h1>\n        <p>Keep your profile details up to date.</p>\n      </div>\n\n      <form class=\"auth-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <div class=\"auth-grid\">\n          <label class=\"form-field\">\n            Name\n            <input type=\"text\" formControlName=\"name\" />\n            <small>{{ firstError(form.get('name'), 'Name') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Email\n            <input type=\"email\" formControlName=\"email\" />\n            <small>{{ firstError(form.get('email'), 'Email') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Phone\n            <input type=\"tel\" formControlName=\"phone\" />\n            <small>{{ firstError(form.get('phone'), 'Phone') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            Role\n            <select formControlName=\"role\">\n              <option value=\"User\">User</option>\n              <option value=\"Admin\">Admin</option>\n            </select>\n            <small>{{ firstError(form.get('role'), 'Role') }}</small>\n          </label>\n\n          <label class=\"form-field\">\n            CreatedAt\n            <input type=\"text\" formControlName=\"createdAt\" readonly />\n          </label>\n\n          <label class=\"form-field\">\n            UpdatedAt\n            <input type=\"text\" formControlName=\"updatedAt\" readonly />\n          </label>\n        </div>\n\n        <label class=\"form-field\">\n          Address\n          <textarea rows=\"3\" formControlName=\"address\"></textarea>\n          <small>{{ firstError(form.get('address'), 'Address') }}</small>\n        </label>\n\n        <button class=\"btn btn-primary auth-submit\" type=\"submit\" [disabled]=\"isSubmitting\">\n          {{ isSubmitting ? 'Saving...' : 'Save Profile' }}\n        </button>\n      </form>\n    </div>\n  </div>\n</section>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.NotifierService }]; }, null); })();
//# sourceMappingURL=edit-profile.component.js.map