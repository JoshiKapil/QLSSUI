import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/notifier.service";
import * as i3 from "../../../core/services/trainer.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
function TrainerComponent_table_50_tr_10_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 23)(6, "button", 24);
    i0.ɵɵlistener("click", function TrainerComponent_table_50_tr_10_Template_button_click_6_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const record_r4 = restoredCtx.$implicit; const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.edit(record_r4)); });
    i0.ɵɵtext(7, " Edit ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r4.isActive === false ? "Inactive" : "Active");
} }
function TrainerComponent_table_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 21)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "tbody");
    i0.ɵɵtemplate(10, TrainerComponent_table_50_tr_10_Template, 8, 2, "tr", 22);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r0.records)("ngForTrackBy", ctx_r0.trackByTrainerId);
} }
function TrainerComponent_ng_template_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtext(1, "No records found.");
    i0.ɵɵelementEnd();
} }
export class TrainerComponent {
    constructor(fb, notifier, trainerService) {
        this.fb = fb;
        this.notifier = notifier;
        this.trainerService = trainerService;
        this.searchPlaceholder = "Search by Name, Mobile or Email";
        this.records = [];
        this.selectedRecord = null;
        this.searchTerm = "";
        this.isLoading = false;
        this.isSaving = false;
        this.isDeleting = false;
        this.busyTrainerId = "";
    }
    ngOnInit() {
        this.initForm();
        this.loadRecords();
    }
    initForm() {
        this.form = this.fb.group({
            name: ["", [Validators.required, Validators.maxLength(200)]],
            mobile: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
            email: ["", [Validators.required, Validators.email]],
            address: ["", [Validators.maxLength(1000)]],
            company: ["", [Validators.maxLength(1000)]],
        });
    }
    loadRecords() {
        this.isLoading = true;
        this.trainerService.getAll().subscribe({
            next: (records) => (this.records = records || []),
            error: () => {
                this.records = [];
                this.isLoading = false;
            },
            complete: () => (this.isLoading = false),
        });
    }
    search() {
        this.isLoading = true;
        this.trainerService.search(this.searchTerm).subscribe({
            next: (records) => (this.records = records || []),
            error: () => {
                this.records = [];
                this.isLoading = false;
            },
            complete: () => (this.isLoading = false),
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
        var _a, _b;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSaving = true;
        const payload = Object.assign(Object.assign(Object.assign({}, this.selectedRecord), this.form.value), { isActive: (_b = (_a = this.selectedRecord) === null || _a === void 0 ? void 0 : _a.isActive) !== null && _b !== void 0 ? _b : true });
        this.trainerService.save(payload).subscribe({
            next: () => {
                this.notifier.successToastr("Trainer saved successfully.");
                this.resetForm();
                this.loadRecords();
            },
            error: () => {
                this.notifier.warningToastr("Trainer could not be saved.");
                this.isSaving = false;
            },
            complete: () => (this.isSaving = false),
        });
    }
    setActive(record, isActive) {
        if (!record.trainerId) {
            return;
        }
        this.busyTrainerId = String(record.trainerId);
        this.trainerService.setActive(record, isActive).subscribe({
            next: () => {
                this.notifier.successToastr(`Trainer ${isActive ? "activated" : "deactivated"} successfully.`);
                this.loadRecords();
            },
            error: () => {
                this.notifier.warningToastr("Trainer status could not be updated.");
                this.busyTrainerId = "";
            },
            complete: () => (this.busyTrainerId = ""),
        });
    }
    delete(record) {
        if (!record.trainerId || !confirm("Delete this trainer?")) {
            return;
        }
        this.isDeleting = true;
        this.trainerService.delete(record.trainerId).subscribe({
            next: () => {
                var _a;
                // this.notifier.successToastr("Trainer deleted successfully.");
                this.notifier.successToastr(`Trainer ${record.isActive ? "activated" : "deactivated"} successfully.`);
                if (String(((_a = this.selectedRecord) === null || _a === void 0 ? void 0 : _a.trainerId) || "") ===
                    String(record.trainerId)) {
                    this.resetForm();
                }
                this.loadRecords();
            },
            error: () => {
                this.notifier.warningToastr("Trainer could not be deleted.");
                this.isDeleting = false;
            },
            complete: () => (this.isDeleting = false),
        });
    }
    fieldError(key, label) {
        const control = this.form.get(key);
        if (!(control === null || control === void 0 ? void 0 : control.touched) || !control.errors) {
            return "";
        }
        if (control.errors["required"]) {
            return label + " is required.";
        }
        if (control.errors["maxlength"]) {
            return label + " is too long.";
        }
        return label + " is invalid.";
    }
    trackByTrainerId(index, record) {
        return record.trainerId || index;
    }
}
TrainerComponent.ɵfac = function TrainerComponent_Factory(t) { return new (t || TrainerComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.NotifierService), i0.ɵɵdirectiveInject(i3.TrainerService)); };
TrainerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TrainerComponent, selectors: [["app-trainer"]], decls: 53, vars: 11, consts: [[1, "admin-section"], [1, "container", "admin-shell"], [1, "admin-header"], [1, "auth-eyebrow"], [1, "admin-actions"], ["routerLink", "/admin/trainings", 1, "btn", "btn-outline"], ["routerLink", "/admin/trainer", 1, "btn", "btn-outline"], ["routerLink", "/admin/clients", 1, "btn", "btn-outline"], [1, "admin-layout"], [1, "admin-form", 3, "formGroup", "ngSubmit"], [1, "form-field"], ["type", "text", "formControlName", "name", "maxlength", "200"], ["type", "text", "formControlName", "mobile", "maxlength", "10"], ["type", "email", "formControlName", "email", "maxlength", "200"], ["rows", "4", "formControlName", "address", "maxlength", "1000"], ["rows", "4", "formControlName", "company", "maxlength", "1000"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [1, "admin-table-wrap"], ["class", "admin-table", 4, "ngIf", "ngIfElse"], ["emptyState", ""], [1, "admin-table"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "table-actions"], ["type", "button", 1, "table-link", 3, "click"], [1, "admin-loading"]], template: function TrainerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Trainer");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div", 4)(9, "a", 5);
        i0.ɵɵtext(10, "Trainings");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "a", 6);
        i0.ɵɵtext(12, "Trainer");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "a", 7);
        i0.ɵɵtext(14, "Companies");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(15, "div", 8)(16, "form", 9);
        i0.ɵɵlistener("ngSubmit", function TrainerComponent_Template_form_ngSubmit_16_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(17, "h2");
        i0.ɵɵtext(18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "label", 10);
        i0.ɵɵtext(20, "Name ");
        i0.ɵɵelement(21, "input", 11);
        i0.ɵɵelementStart(22, "small");
        i0.ɵɵtext(23);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(24, "label", 10);
        i0.ɵɵtext(25, "Mobile ");
        i0.ɵɵelement(26, "input", 12);
        i0.ɵɵelementStart(27, "small");
        i0.ɵɵtext(28);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(29, "label", 10);
        i0.ɵɵtext(30, "Email ");
        i0.ɵɵelement(31, "input", 13);
        i0.ɵɵelementStart(32, "small");
        i0.ɵɵtext(33);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(34, "label", 10);
        i0.ɵɵtext(35, "Address ");
        i0.ɵɵelement(36, "textarea", 14);
        i0.ɵɵelementStart(37, "small");
        i0.ɵɵtext(38);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(39, "label", 10);
        i0.ɵɵtext(40, "Company ");
        i0.ɵɵelement(41, "textarea", 15);
        i0.ɵɵelementStart(42, "small");
        i0.ɵɵtext(43);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(44, "div", 4)(45, "button", 16);
        i0.ɵɵtext(46);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "button", 17);
        i0.ɵɵlistener("click", function TrainerComponent_Template_button_click_47_listener() { return ctx.resetForm(); });
        i0.ɵɵtext(48, " Clear ");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(49, "div", 18);
        i0.ɵɵtemplate(50, TrainerComponent_table_50_Template, 11, 2, "table", 19);
        i0.ɵɵtemplate(51, TrainerComponent_ng_template_51_Template, 2, 0, "ng-template", null, 20, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(52);
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.selectedRecord ? "Edit" : "Add", " Trainer");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("name", "Name"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("mobile", "Mobile"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("email", "Email"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("address", "Address"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("company", "Company"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSaving ? "Saving..." : "Save", " ");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.records.length)("ngIfElse", _r1);
    } }, dependencies: [i4.NgForOf, i4.NgIf, i5.RouterLinkWithHref, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName], styles: [".admin-form[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\r\n  min-height: 1rem;\r\n}\r\n\r\n.table-actions[_ngcontent-%COMP%] { \r\n  gap: 12px;\r\n  align-items: center;\r\n}\r\n\r\n.table-link.danger[_ngcontent-%COMP%] {\r\n  color: #b91c1c;\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrainerComponent, [{
        type: Component,
        args: [{ selector: "app-trainer", template: "<section class=\"admin-section\">\n  <div class=\"container admin-shell\">\n    <div class=\"admin-header\">\n      <div>\n        <span class=\"auth-eyebrow\">Admin</span>\n        <h1>Trainer</h1>\n      </div>\n      <div class=\"admin-actions\">\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainings\">Trainings</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainer\">Trainer</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/clients\">Companies</a>\n        <!-- <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-posts\">Posts</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-comments\"\n          >Comments</a\n        > -->\n      </div>\n    </div>\n\n    <div class=\"admin-layout\">\n      <form class=\"admin-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <h2>{{ selectedRecord ? \"Edit\" : \"Add\" }} Trainer</h2>\n\n        <label class=\"form-field\"\n          >Name\n          <input type=\"text\" formControlName=\"name\" maxlength=\"200\" />\n          <small>{{ fieldError(\"name\", \"Name\") }}</small>\n        </label>\n\n        <label class=\"form-field\"\n          >Mobile\n          <input type=\"text\" formControlName=\"mobile\" maxlength=\"10\" />\n          <small>{{ fieldError(\"mobile\", \"Mobile\") }}</small>\n        </label>\n\n        <label class=\"form-field\"\n          >Email\n          <input type=\"email\" formControlName=\"email\" maxlength=\"200\" />\n          <small>{{ fieldError(\"email\", \"Email\") }}</small>\n        </label>\n\n        <label class=\"form-field\"\n          >Address\n          <textarea\n            rows=\"4\"\n            formControlName=\"address\"\n            maxlength=\"1000\"\n          ></textarea>\n          <small>{{ fieldError(\"address\", \"Address\") }}</small>\n        </label>\n\n        <label class=\"form-field\"\n          >Company\n          <textarea\n            rows=\"4\"\n            formControlName=\"company\"\n            maxlength=\"1000\"\n          ></textarea>\n          <small>{{ fieldError(\"company\", \"Company\") }}</small>\n        </label>\n\n        <div class=\"admin-actions\">\n          <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"isSaving\">\n            {{ isSaving ? \"Saving...\" : \"Save\" }}\n          </button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"resetForm()\">\n            Clear\n          </button>\n        </div>\n      </form>\n\n      <!-- <div class=\"admin-tools\">\n        <h2>Search</h2>\n        <div class=\"admin-search\">\n          <input\n            type=\"text\"\n            [(ngModel)]=\"searchTerm\"\n            [placeholder]=\"searchPlaceholder\"\n            name=\"trainerSearchTerm\"\n            (keydown.enter)=\"search()\"\n          />\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"search()\">\n            Search\n          </button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"loadRecords()\">\n            Reset\n          </button>\n        </div>\n        <div class=\"admin-loading\" *ngIf=\"isLoading\">Loading records...</div>\n      </div> -->\n\n      <div class=\"admin-table-wrap\">\n        <table class=\"admin-table\" *ngIf=\"records.length; else emptyState\">\n          <thead>\n            <tr>\n              <!-- <th>TrainerId</th> -->\n              <th>Name</th>\n              <!-- <th>Mobile</th>\n              <th>Email</th>\n              <th>Address</th>\n              <th>Company</th> -->\n              <th>Status</th>\n              <th>Action</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let record of records; trackBy: trackByTrainerId\">\n              <!-- <td>{{ record.trainerId }}</td> -->\n              <td>{{ record.name }}</td>\n              <!-- <td>{{ record.mobile }}</td>\n              <td>{{ record.email }}</td>\n              <td>{{ record.address }}</td>\n              <td>{{ record.company }}</td> -->\n              <td>{{ record.isActive === false ? \"Inactive\" : \"Active\" }}</td>\n              <td class=\"table-actions\">\n                <button class=\"table-link\" type=\"button\" (click)=\"edit(record)\">\n                  Edit\n                </button> \n              <!--  <button\n                  class=\"table-link\"\n                  type=\"button\"\n                  [disabled]=\"busyTrainerId === record.trainerId?.toString()\"\n                  (click)=\"delete(record)\"\n                >\n                  {{ record.isActive === false ? \"Activate\" : \"Deactivate\" }}\n                </button>\n                 <button\n                  class=\"table-link danger\"\n                  type=\"button\"\n                  [disabled]=\"isDeleting\"\n                  (click)=\"delete(record)\"\n                >\n                  Delete\n                </button> -->\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <ng-template #emptyState>\n          <div class=\"admin-loading\">No records found.</div>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</section>\n\n", styles: [".admin-form small {\r\n  min-height: 1rem;\r\n}\r\n\r\n.table-actions { \r\n  gap: 12px;\r\n  align-items: center;\r\n}\r\n\r\n.table-link.danger {\r\n  color: #b91c1c;\r\n}\r\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.NotifierService }, { type: i3.TrainerService }]; }, null); })();
//# sourceMappingURL=trainer.component.js.map