import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/notifier.service";
import * as i3 from "../../../core/services/linkedin-post.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
function LinkedinPostComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtext(1, "Loading records...");
    i0.ɵɵelementEnd();
} }
function LinkedinPostComponent_table_59_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "button", 30);
    i0.ɵɵlistener("click", function LinkedinPostComponent_table_59_tr_14_Template_button_click_10_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const record_r5 = restoredCtx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.edit(record_r5)); });
    i0.ɵɵtext(11, "Edit");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r5.postId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r5.content);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r5.createdDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r5.author);
} }
function LinkedinPostComponent_table_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 28)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "PostId");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Content");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "CreatedDate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Author");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, LinkedinPostComponent_table_59_tr_14_Template, 12, 4, "tr", 29);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r1.records)("ngForTrackBy", ctx_r1.trackByRecordId);
} }
function LinkedinPostComponent_ng_template_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtext(1, "No records found.");
    i0.ɵɵelementEnd();
} }
export class LinkedinPostComponent {
    constructor(fb, notifier, linkedInPostService) {
        this.fb = fb;
        this.notifier = notifier;
        this.linkedInPostService = linkedInPostService;
        this.title = 'LinkedInPost';
        this.searchPlaceholder = 'Search by PostId or Author';
        this.idKey = 'postId';
        this.records = [];
        this.selectedRecord = null;
        this.searchTerm = '';
        this.isLoading = false;
        this.isSaving = false;
    }
    ngOnInit() {
        this.initForm();
        this.loadRecords();
    }
    initForm() {
        this.form = this.fb.group({
            postId: ['', Validators.required],
            content: ['', Validators.required],
            createdDate: ['', Validators.required],
            author: ['', Validators.required]
        });
    }
    loadRecords() {
        this.isLoading = true;
        this.linkedInPostService.getAll().subscribe({
            next: (records) => (this.records = records || []),
            complete: () => (this.isLoading = false)
        });
    }
    search() {
        this.isLoading = true;
        this.linkedInPostService.search(this.searchTerm).subscribe({
            next: (records) => (this.records = records || []),
            complete: () => (this.isLoading = false)
        });
    }
    edit(record) {
        this.selectedRecord = record;
        this.form.patchValue(record);
    }
    resetForm() {
        this.selectedRecord = null;
        this.form.reset();
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSaving = true;
        const payload = Object.assign(Object.assign({}, this.selectedRecord), this.form.value);
        this.linkedInPostService.save(payload).subscribe({
            next: () => {
                this.notifier.successToastr(`LinkedInPost saved successfully.`);
                this.resetForm();
                this.loadRecords();
            },
            complete: () => (this.isSaving = false)
        });
    }
    fieldError(key, label) {
        const control = this.form.get(key);
        if (!(control === null || control === void 0 ? void 0 : control.touched) || !control.errors) {
            return '';
        }
        return control.errors['required'] ? `${label} is required.` : `${label} is invalid.`;
    }
    trackByRecordId(index, record) {
        return String(record[this.idKey] || index);
    }
    onImageSelected(event, key) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => { var _a; return (_a = this.form.get(key)) === null || _a === void 0 ? void 0 : _a.setValue(reader.result); };
        reader.readAsDataURL(file);
    }
}
LinkedinPostComponent.ɵfac = function LinkedinPostComponent_Factory(t) { return new (t || LinkedinPostComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.NotifierService), i0.ɵɵdirectiveInject(i3.LinkedInPostService)); };
LinkedinPostComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LinkedinPostComponent, selectors: [["app-linkedin-post-admin"]], decls: 62, vars: 13, consts: [[1, "admin-section"], [1, "container", "admin-shell"], [1, "admin-header"], [1, "auth-eyebrow"], [1, "admin-actions"], ["routerLink", "/admin/trainings", 1, "btn", "btn-outline"], ["routerLink", "/admin/trainer", 1, "btn", "btn-outline"], ["routerLink", "/admin/clients", 1, "btn", "btn-outline"], ["routerLink", "/admin/linkedin-posts", 1, "btn", "btn-outline"], ["routerLink", "/admin/linkedin-comments", 1, "btn", "btn-outline"], [1, "admin-layout"], [1, "admin-form", 3, "formGroup", "ngSubmit"], [1, "form-field"], ["type", "text", "formControlName", "postId"], ["rows", "4", "formControlName", "content"], ["type", "date", "formControlName", "createdDate"], ["type", "text", "formControlName", "author"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [1, "admin-tools"], [1, "admin-search"], ["type", "text", "name", "searchTerm", 3, "ngModel", "placeholder", "ngModelChange", "keydown.enter"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["class", "admin-loading", 4, "ngIf"], [1, "admin-table-wrap"], ["class", "admin-table", 4, "ngIf", "ngIfElse"], ["emptyState", ""], [1, "admin-loading"], [1, "admin-table"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "table-link", 3, "click"]], template: function LinkedinPostComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "LinkedInPost");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div", 4)(9, "a", 5);
        i0.ɵɵtext(10, "Trainings");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "a", 6);
        i0.ɵɵtext(12, "Trainer");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "a", 7);
        i0.ɵɵtext(14, "Clients");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "a", 8);
        i0.ɵɵtext(16, "Posts");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "a", 9);
        i0.ɵɵtext(18, "Comments");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(19, "div", 10)(20, "form", 11);
        i0.ɵɵlistener("ngSubmit", function LinkedinPostComponent_Template_form_ngSubmit_20_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(21, "h2");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "label", 12);
        i0.ɵɵtext(24, "PostId ");
        i0.ɵɵelement(25, "input", 13);
        i0.ɵɵelementStart(26, "small");
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(28, "label", 12);
        i0.ɵɵtext(29, "Content ");
        i0.ɵɵelement(30, "textarea", 14);
        i0.ɵɵelementStart(31, "small");
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(33, "label", 12);
        i0.ɵɵtext(34, "CreatedDate ");
        i0.ɵɵelement(35, "input", 15);
        i0.ɵɵelementStart(36, "small");
        i0.ɵɵtext(37);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(38, "label", 12);
        i0.ɵɵtext(39, "Author ");
        i0.ɵɵelement(40, "input", 16);
        i0.ɵɵelementStart(41, "small");
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(43, "div", 4)(44, "button", 17);
        i0.ɵɵtext(45);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(46, "button", 18);
        i0.ɵɵlistener("click", function LinkedinPostComponent_Template_button_click_46_listener() { return ctx.resetForm(); });
        i0.ɵɵtext(47, "Clear");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(48, "div", 19)(49, "h2");
        i0.ɵɵtext(50, "Search");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "div", 20)(52, "input", 21);
        i0.ɵɵlistener("ngModelChange", function LinkedinPostComponent_Template_input_ngModelChange_52_listener($event) { return ctx.searchTerm = $event; })("keydown.enter", function LinkedinPostComponent_Template_input_keydown_enter_52_listener() { return ctx.search(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "button", 22);
        i0.ɵɵlistener("click", function LinkedinPostComponent_Template_button_click_53_listener() { return ctx.search(); });
        i0.ɵɵtext(54, "Search");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "button", 18);
        i0.ɵɵlistener("click", function LinkedinPostComponent_Template_button_click_55_listener() { return ctx.loadRecords(); });
        i0.ɵɵtext(56, "Reset");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(57, LinkedinPostComponent_div_57_Template, 2, 0, "div", 23);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(58, "div", 24);
        i0.ɵɵtemplate(59, LinkedinPostComponent_table_59_Template, 15, 2, "table", 25);
        i0.ɵɵtemplate(60, LinkedinPostComponent_ng_template_60_Template, 2, 0, "ng-template", null, 26, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(61);
        i0.ɵɵadvance(20);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.selectedRecord ? "Edit" : "Add", " LinkedInPost");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("postId", "PostId"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("content", "Content"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("createdDate", "CreatedDate"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("author", "Author"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.isSaving ? "Saving..." : "Save");
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngModel", ctx.searchTerm)("placeholder", ctx.searchPlaceholder);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.records.length)("ngIfElse", _r2);
    } }, dependencies: [i4.NgForOf, i4.NgIf, i5.RouterLinkWithHref, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, i1.FormGroupDirective, i1.FormControlName], styles: [".admin-form[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  min-height: 1rem;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkedinPostComponent, [{
        type: Component,
        args: [{ selector: 'app-linkedin-post-admin', template: "<section class=\"admin-section\">\n  <div class=\"container admin-shell\">\n    <div class=\"admin-header\">\n      <div>\n        <span class=\"auth-eyebrow\">Admin</span>\n        <h1>LinkedInPost</h1>\n      </div>\n      <div class=\"admin-actions\">\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainings\">Trainings</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainer\">Trainer</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/clients\">Clients</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-posts\">Posts</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-comments\">Comments</a>\n      </div>\n    </div>\n\n    <div class=\"admin-layout\">\n      <form class=\"admin-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <h2>{{ selectedRecord ? 'Edit' : 'Add' }} LinkedInPost</h2>\n        <label class=\"form-field\">PostId\n          <input type=\"text\" formControlName=\"postId\" />\n          <small>{{ fieldError('postId', 'PostId') }}</small>\n        </label>\n        <label class=\"form-field\">Content\n          <textarea rows=\"4\" formControlName=\"content\"></textarea>\n          <small>{{ fieldError('content', 'Content') }}</small>\n        </label>\n        <label class=\"form-field\">CreatedDate\n          <input type=\"date\" formControlName=\"createdDate\" />\n          <small>{{ fieldError('createdDate', 'CreatedDate') }}</small>\n        </label>\n        <label class=\"form-field\">Author\n          <input type=\"text\" formControlName=\"author\" />\n          <small>{{ fieldError('author', 'Author') }}</small>\n        </label>\n\n        <div class=\"admin-actions\">\n          <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"isSaving\">{{ isSaving ? 'Saving...' : 'Save' }}</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"resetForm()\">Clear</button>\n        </div>\n      </form>\n\n      <div class=\"admin-tools\">\n        <h2>Search</h2>\n        <div class=\"admin-search\">\n          <input type=\"text\" [(ngModel)]=\"searchTerm\" [placeholder]=\"searchPlaceholder\" name=\"searchTerm\" (keydown.enter)=\"search()\" />\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"search()\">Search</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"loadRecords()\">Reset</button>\n        </div>\n\n        <div class=\"admin-loading\" *ngIf=\"isLoading\">Loading records...</div>\n      </div>\n    </div>\n\n    <div class=\"admin-table-wrap\">\n      <table class=\"admin-table\" *ngIf=\"records.length; else emptyState\">\n        <thead>\n          <tr>\n            <th>PostId</th>\n            <th>Content</th>\n            <th>CreatedDate</th>\n            <th>Author</th>\n            <th>Action</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let record of records; trackBy: trackByRecordId\">\n            <td>{{ record.postId }}</td>\n            <td>{{ record.content }}</td>\n            <td>{{ record.createdDate }}</td>\n            <td>{{ record.author }}</td>\n            <td><button class=\"table-link\" type=\"button\" (click)=\"edit(record)\">Edit</button></td>\n          </tr>\n        </tbody>\n      </table>\n      <ng-template #emptyState>\n        <div class=\"admin-loading\">No records found.</div>\n      </ng-template>\n    </div>\n  </div>\n</section>\n\r\n", styles: [".admin-form small {\n  min-height: 1rem;\n}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.NotifierService }, { type: i3.LinkedInPostService }]; }, null); })();
//# sourceMappingURL=linkedin-post.component.js.map