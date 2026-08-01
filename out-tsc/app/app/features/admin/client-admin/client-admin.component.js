import { Component, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { of, switchMap } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/notifier.service";
import * as i3 from "../../../core/services/client-management.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
const _c0 = ["imageFileInput"];
function ClientAdminComponent_div_26_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("mousedown", function ClientAdminComponent_div_26_button_4_Template_button_mousedown_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r10); const client_r8 = restoredCtx.$implicit; const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.selectClient(client_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const client_r8 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", client_r8.clientName, " ");
} }
function ClientAdminComponent_div_26_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " No Company found ");
    i0.ɵɵelementEnd();
} }
const _c1 = function () { return { standalone: true }; };
function ClientAdminComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "input", 29);
    i0.ɵɵlistener("ngModelChange", function ClientAdminComponent_div_26_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.clientSearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 30);
    i0.ɵɵlistener("mousedown", function ClientAdminComponent_div_26_Template_button_mousedown_2_listener() { i0.ɵɵrestoreView(_r12); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.selectClient(null)); });
    i0.ɵɵtext(3, " New Company ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ClientAdminComponent_div_26_button_4_Template, 2, 1, "button", 31);
    i0.ɵɵtemplate(5, ClientAdminComponent_div_26_div_5_Template, 2, 0, "div", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r0.clientSearch)("ngModelOptions", i0.ɵɵpureFunction0(5, _c1));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredClientList)("ngForTrackBy", ctx_r0.trackByRecordId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.filteredClientList.length);
} }
function ClientAdminComponent_img_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 34);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r2.imagePreviewUrl || ctx_r2.getClientImageUrl(ctx_r2.form.controls["image"].value), i0.ɵɵsanitizeUrl)("alt", ctx_r2.form.controls["clientName"].value || "Client logo preview");
} }
function ClientAdminComponent_table_56_tr_10_img_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 41);
} if (rf & 2) {
    const record_r15 = i0.ɵɵnextContext().$implicit;
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r16.getClientImageUrl(record_r15.image), i0.ɵɵsanitizeUrl)("alt", record_r15.clientName + " logo");
} }
function ClientAdminComponent_table_56_tr_10_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "No image");
    i0.ɵɵelementEnd();
} }
function ClientAdminComponent_table_56_tr_10_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtemplate(4, ClientAdminComponent_table_56_tr_10_img_4_Template, 1, 2, "img", 37);
    i0.ɵɵtemplate(5, ClientAdminComponent_table_56_tr_10_span_5_Template, 2, 0, "span", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 39)(7, "button", 40);
    i0.ɵɵlistener("click", function ClientAdminComponent_table_56_tr_10_Template_button_click_7_listener() { const restoredCtx = i0.ɵɵrestoreView(_r20); const record_r15 = restoredCtx.$implicit; const ctx_r19 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r19.selectClient(record_r15)); });
    i0.ɵɵtext(8, " Edit ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r15 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r15.clientName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", record_r15.image);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !record_r15.image);
} }
function ClientAdminComponent_table_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 35)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Company Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Image");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "tbody");
    i0.ɵɵtemplate(10, ClientAdminComponent_table_56_tr_10_Template, 9, 3, "tr", 36);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r3.records)("ngForTrackBy", ctx_r3.trackByRecordId);
} }
function ClientAdminComponent_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵtext(1, "No clients found.");
    i0.ɵɵelementEnd();
} }
export class ClientAdminComponent {
    constructor(fb, notifier, clientService) {
        this.fb = fb;
        this.notifier = notifier;
        this.clientService = clientService;
        this.searchPlaceholder = "Search by Company Name";
        this.records = [];
        this.selectedRecord = null;
        this.selectedClientId = "";
        this.clientSearch = "";
        this.searchTerm = "";
        this.isClientDropdownOpen = false;
        this.isLoading = false;
        this.isSaving = false;
        this.busyClientId = "";
        this.selectedImageFile = null;
        this.imagePreviewUrl = "";
    }
    ngOnInit() {
        this.form = this.fb.group({
            clientName: ["", Validators.required],
            clientNameDesc: ["", Validators.required],
            image: [""],
            displayOrder: ["", Validators.required],
        });
        this.loadRecords();
    }
    loadRecords() {
        this.isLoading = true;
        this.clientService.getAll().subscribe({
            next: (records) => (this.records = records || []),
            error: () => {
                this.records = [];
                this.notifier.warningToastr("Clients could not be loaded.");
            },
            complete: () => (this.isLoading = false),
        });
    }
    search() {
        this.isLoading = true;
        this.clientService.search(this.searchTerm).subscribe({
            next: (records) => (this.records = records || []),
            error: () => this.notifier.warningToastr("Client search failed."),
            complete: () => (this.isLoading = false),
        });
    }
    get filteredClientList() {
        const search = this.clientSearch.trim().toLowerCase();
        return !search
            ? this.records
            : this.records.filter((client) => (client.clientName || "").toLowerCase().includes(search));
    }
    getSelectedClientLabel() {
        var _a;
        return ((_a = this.selectedRecord) === null || _a === void 0 ? void 0 : _a.clientName) || "New Company";
    }
    toggleClientDropdown() {
        this.isClientDropdownOpen = !this.isClientDropdownOpen;
        if (this.isClientDropdownOpen)
            this.clientSearch = "";
    }
    selectClient(client) {
        this.isClientDropdownOpen = false;
        if (!(client === null || client === void 0 ? void 0 : client.clientId)) {
            this.resetForm();
            return;
        }
        this.isLoading = true;
        this.clientService.getById(client.clientId).subscribe({
            next: (record) => this.edit(record || client),
            error: () => this.notifier.warningToastr("Client details could not be loaded."),
            complete: () => (this.isLoading = false),
        });
    }
    edit(record) {
        this.selectedRecord = record;
        this.selectedClientId = String(record.clientId || "");
        this.clientSearch = record.clientName;
        this.form.patchValue(record);
    }
    resetForm() {
        this.selectedRecord = null;
        this.selectedClientId = "";
        this.clientSearch = "";
        this.isClientDropdownOpen = false;
        this.selectedImageFile = null;
        this.imagePreviewUrl = "";
        if (this.imageFileInput) {
            this.imageFileInput.nativeElement.value = "";
        }
        this.form.reset();
    }
    submit() {
        var _a;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSaving = true;
        const formValue = this.form.getRawValue();
        const imageUpload$ = this.selectedImageFile
            ? this.clientService.uploadImage(this.selectedImageFile)
            : of({
                fileName: String(formValue.image || ((_a = this.selectedRecord) === null || _a === void 0 ? void 0 : _a.image) || ""),
            });
        imageUpload$
            .pipe(switchMap(({ fileName }) => {
            var _a, _b;
            const payload = Object.assign(Object.assign(Object.assign({}, this.selectedRecord), formValue), { image: this.removeSpaces(fileName), isActive: (_b = (_a = this.selectedRecord) === null || _a === void 0 ? void 0 : _a.isActive) !== null && _b !== void 0 ? _b : true });
            return this.clientService.save(payload);
        }))
            .subscribe({
            next: () => {
                this.notifier.successToastr(this.selectedRecord
                    ? "Client updated successfully."
                    : "Client saved successfully.");
                this.resetForm();
                this.loadRecords();
            },
            error: () => {
                this.notifier.warningToastr("Client image or details could not be saved.");
                this.isSaving = false;
            },
            complete: () => (this.isSaving = false),
        });
    }
    setActive(record, isActive) {
        if (!record.clientId)
            return;
        this.busyClientId = String(record.clientId);
        this.clientService.setActive(record, isActive).subscribe({
            next: () => {
                this.notifier.successToastr(`Client ${isActive ? "activated" : "deactivated"} successfully.`);
                this.loadRecords();
            },
            error: () => this.notifier.warningToastr("Client status could not be updated."),
            complete: () => (this.busyClientId = ""),
        });
    }
    delete(record) {
        if (!record.clientId || !window.confirm(`Delete "${record.clientName}"?`))
            return;
        this.busyClientId = String(record.clientId);
        this.clientService.delete(record.clientId).subscribe({
            next: () => {
                this.notifier.successToastr("Client deleted successfully.");
                if (this.selectedClientId === String(record.clientId))
                    this.resetForm();
                this.loadRecords();
            },
            error: () => this.notifier.warningToastr("Client could not be deleted."),
            complete: () => (this.busyClientId = ""),
        });
    }
    fieldError(key, label) {
        const control = this.form.get(key);
        if (!(control === null || control === void 0 ? void 0 : control.touched) || !control.errors)
            return "";
        return control.errors["required"]
            ? `${label} is required.`
            : `${label} is invalid.`;
    }
    trackByRecordId(index, record) {
        return record.clientId || index;
    }
    onImageSelected(event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith("image/")) {
            this.notifier.warningToastr("Please select a valid image file.");
            input.value = "";
            return;
        }
        const fileName = this.removeSpaces(file.name);
        this.selectedImageFile = new File([file], fileName, { type: file.type });
        this.form.controls["image"].setValue(fileName);
        const reader = new FileReader();
        reader.onload = () => (this.imagePreviewUrl = String(reader.result || ""));
        reader.readAsDataURL(file);
    }
    getClientImageUrl(imageName) {
        return imageName
            ? `assets/img/CustomerLogo/${encodeURIComponent(imageName)}`
            : "";
    }
    removeSpaces(fileName) {
        return fileName.replace(/\s+/g, "");
    }
}
ClientAdminComponent.ɵfac = function ClientAdminComponent_Factory(t) { return new (t || ClientAdminComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.NotifierService), i0.ɵɵdirectiveInject(i3.ClientManagementService)); };
ClientAdminComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ClientAdminComponent, selectors: [["app-client-admin"]], viewQuery: function ClientAdminComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.imageFileInput = _t.first);
    } }, decls: 59, vars: 13, consts: [[1, "admin-section"], [1, "container", "admin-shell"], [1, "admin-header"], [1, "auth-eyebrow"], [1, "admin-actions"], ["routerLink", "/admin/trainings", 1, "btn", "btn-outline"], ["routerLink", "/admin/trainer", 1, "btn", "btn-outline"], ["routerLink", "/admin/clients", 1, "btn", "btn-outline"], [1, "admin-layout"], [1, "admin-form", 3, "formGroup", "ngSubmit"], [1, "form-field", "client-search-field"], [1, "client-search-control"], ["type", "button", "aria-haspopup", "listbox", 1, "btn", "btn-outline", "btn-small", "client-dropdown-toggle", 3, "click"], [1, "dropdown-icon"], ["class", "client-search-menu", "role", "listbox", 4, "ngIf"], [1, "form-field"], ["type", "text", "formControlName", "clientName"], ["rows", "4", "formControlName", "clientNameDesc"], ["type", "text", "formControlName", "image", "readonly", "", "placeholder", "No image selected"], ["type", "file", "accept", "image/*", 3, "change"], ["imageFileInput", ""], ["class", "client-image-preview", 3, "src", "alt", 4, "ngIf"], ["type", "number", "formControlName", "displayOrder"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [1, "admin-table-wrap"], ["class", "admin-table", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["role", "listbox", 1, "client-search-menu"], ["type", "text", "placeholder", "Search Company name", "autocomplete", "off", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["type", "button", 1, "client-search-option", 3, "mousedown"], ["class", "client-search-option", "type", "button", 3, "mousedown", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "client-search-empty", 4, "ngIf"], [1, "client-search-empty"], [1, "client-image-preview", 3, "src", "alt"], [1, "admin-table"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "client-logo", 3, "src", "alt", 4, "ngIf"], [4, "ngIf"], [1, "row-actions"], ["type", "button", 1, "table-link", 3, "click"], [1, "client-logo", 3, "src", "alt"], [1, "admin-loading"]], template: function ClientAdminComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Company");
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
        i0.ɵɵlistener("ngSubmit", function ClientAdminComponent_Template_form_ngSubmit_16_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(17, "h2");
        i0.ɵɵtext(18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "label", 10);
        i0.ɵɵtext(20, "Company Name ");
        i0.ɵɵelementStart(21, "div", 11)(22, "button", 12);
        i0.ɵɵlistener("click", function ClientAdminComponent_Template_button_click_22_listener() { return ctx.toggleClientDropdown(); });
        i0.ɵɵtext(23);
        i0.ɵɵelementStart(24, "span", 13);
        i0.ɵɵtext(25, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(26, ClientAdminComponent_div_26_Template, 6, 6, "div", 14);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(27, "label", 15);
        i0.ɵɵtext(28, "Company Name ");
        i0.ɵɵelement(29, "input", 16);
        i0.ɵɵelementStart(30, "small");
        i0.ɵɵtext(31);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(32, "label", 15);
        i0.ɵɵtext(33, "Description ");
        i0.ɵɵelement(34, "textarea", 17);
        i0.ɵɵelementStart(35, "small");
        i0.ɵɵtext(36);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(37, "label", 15);
        i0.ɵɵtext(38, " Image ");
        i0.ɵɵelement(39, "input", 18);
        i0.ɵɵelementStart(40, "input", 19, 20);
        i0.ɵɵlistener("change", function ClientAdminComponent_Template_input_change_40_listener($event) { return ctx.onImageSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(42, ClientAdminComponent_img_42_Template, 1, 2, "img", 21);
        i0.ɵɵelementStart(43, "small");
        i0.ɵɵtext(44, "The image is uploaded only when you save the Company.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(45, "label", 15);
        i0.ɵɵtext(46, "Display Order ");
        i0.ɵɵelement(47, "input", 22);
        i0.ɵɵelementStart(48, "small");
        i0.ɵɵtext(49);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(50, "div", 4)(51, "button", 23);
        i0.ɵɵtext(52);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "button", 24);
        i0.ɵɵlistener("click", function ClientAdminComponent_Template_button_click_53_listener() { return ctx.resetForm(); });
        i0.ɵɵtext(54, " Clear ");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(55, "div", 25);
        i0.ɵɵtemplate(56, ClientAdminComponent_table_56_Template, 11, 2, "table", 26);
        i0.ɵɵtemplate(57, ClientAdminComponent_ng_template_57_Template, 2, 0, "ng-template", null, 27, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        const _r4 = i0.ɵɵreference(58);
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.selectedRecord ? "Edit" : "Add", " Company");
        i0.ɵɵadvance(4);
        i0.ɵɵattribute("aria-expanded", ctx.isClientDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.getSelectedClientLabel(), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isClientDropdownOpen);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("clientName", "Company Name"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("clientNameDesc", "Description"));
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngIf", ctx.imagePreviewUrl || ctx.form.controls["image"].value);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.fieldError("displayOrder", "Display Order"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSaving ? "Saving..." : ctx.selectedRecord ? "Update" : "Save", " ");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.records.length)("ngIfElse", _r4);
    } }, dependencies: [i4.NgForOf, i4.NgIf, i5.RouterLinkWithHref, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, i1.FormGroupDirective, i1.FormControlName], styles: [".admin-form[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  min-height: 1rem;\n}\n\n.client-search-field[_ngcontent-%COMP%], .client-search-control[_ngcontent-%COMP%] {\n  position: relative;\n}\n.client-dropdown-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n.client-dropdown-toggle[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.client-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: #fff;\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);\n}\n.client-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 42px;\n  margin-bottom: 7px;\n  padding: 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n}\n.client-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n.client-search-option[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  text-align: left;\n  cursor: pointer;\n}\n.client-search-option[_ngcontent-%COMP%]:hover, .client-search-option[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n}\n.client-search-empty[_ngcontent-%COMP%] {\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  text-align: center;\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: #dcfce7;\n  color: #166534;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.status-pill.inactive[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.row-actions[_ngcontent-%COMP%] { \n  flex-wrap: wrap;\n  gap: 8px;\n}\n.table-link.danger[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.client-image-preview[_ngcontent-%COMP%], .client-logo[_ngcontent-%COMP%] {\n  display: block;\n  width: 88px;\n  height: 64px;\n  padding: 6px;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  background: #fff;\n  object-fit: contain;\n}\n\n.client-image-preview[_ngcontent-%COMP%] {\n  width: 140px;\n  height: 90px;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClientAdminComponent, [{
        type: Component,
        args: [{ selector: "app-client-admin", template: "<section class=\"admin-section\">\n  <div class=\"container admin-shell\">\n    <div class=\"admin-header\">\n      <div>\n        <span class=\"auth-eyebrow\">Admin</span>\n        <h1>Company</h1>\n      </div>\n      <div class=\"admin-actions\">\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainings\">Trainings</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainer\">Trainer</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/clients\">Companies</a>\n        <!-- <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-posts\">Posts</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-comments\"\n          >Comments</a\n        > -->\n      </div>\n    </div>\n\n    <div class=\"admin-layout\">\n      <form class=\"admin-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <h2>{{ selectedRecord ? \"Edit\" : \"Add\" }} Company</h2>\n\n        <label class=\"form-field client-search-field\"\n          >Company Name\n          <div class=\"client-search-control\">\n            <button\n              class=\"btn btn-outline btn-small client-dropdown-toggle\"\n              type=\"button\"\n              (click)=\"toggleClientDropdown()\"\n              aria-haspopup=\"listbox\"\n              [attr.aria-expanded]=\"isClientDropdownOpen\"\n            >\n              {{ getSelectedClientLabel() }}\n              <span class=\"dropdown-icon\">&#9662;</span>\n            </button>\n            <div\n              class=\"client-search-menu\"\n              *ngIf=\"isClientDropdownOpen\"\n              role=\"listbox\"\n            >\n              <input\n                type=\"text\"\n                [(ngModel)]=\"clientSearch\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                placeholder=\"Search Company name\"\n                autocomplete=\"off\"\n              />\n              <button\n                class=\"client-search-option\"\n                type=\"button\"\n                (mousedown)=\"selectClient(null)\"\n              >\n                New Company\n              </button>\n              <button\n                class=\"client-search-option\"\n                type=\"button\"\n                *ngFor=\"\n                  let client of filteredClientList;\n                  trackBy: trackByRecordId\n                \"\n                (mousedown)=\"selectClient(client)\"\n              >\n                {{ client.clientName }}\n              </button>\n              <div\n                class=\"client-search-empty\"\n                *ngIf=\"!filteredClientList.length\"\n              >\n                No Company found\n              </div>\n            </div>\n          </div>\n        </label>\n\n        <label class=\"form-field\"\n          >Company Name\n          <input type=\"text\" formControlName=\"clientName\" />\n          <small>{{ fieldError(\"clientName\", \"Company Name\") }}</small>\n        </label>\n        <label class=\"form-field\"\n          >Description\n          <textarea rows=\"4\" formControlName=\"clientNameDesc\"></textarea>\n          <small>{{ fieldError(\"clientNameDesc\", \"Description\") }}</small>\n        </label>\n        <label class=\"form-field\">\n          Image\n          <input\n            type=\"text\"\n            formControlName=\"image\"\n            readonly\n            placeholder=\"No image selected\"\n          />\n          <input\n            #imageFileInput\n            type=\"file\"\n            accept=\"image/*\"\n            (change)=\"onImageSelected($event)\"\n          />\n          <img\n            class=\"client-image-preview\"\n            *ngIf=\"imagePreviewUrl || form.controls['image'].value\"\n            [src]=\"\n              imagePreviewUrl || getClientImageUrl(form.controls['image'].value)\n            \"\n            [alt]=\"form.controls['clientName'].value || 'Client logo preview'\"\n          />\n          <small>The image is uploaded only when you save the Company.</small>\n        </label>\n        <label class=\"form-field\"\n          >Display Order\n          <input type=\"number\" formControlName=\"displayOrder\" />\n          <small>{{ fieldError(\"displayOrder\", \"Display Order\") }}</small>\n        </label>\n        <div class=\"admin-actions\">\n          <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"isSaving\">\n            {{ isSaving ? \"Saving...\" : selectedRecord ? \"Update\" : \"Save\" }}\n          </button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"resetForm()\">\n            Clear\n          </button>\n        </div>\n      </form>\n\n      <!-- <div class=\"admin-tools\">\n        <h2>Search</h2>\n        <div class=\"admin-search\">\n          <input\n            type=\"text\"\n            [(ngModel)]=\"searchTerm\"\n            [placeholder]=\"searchPlaceholder\"\n            name=\"searchTerm\"\n            (keydown.enter)=\"search()\"\n          />\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"search()\">\n            Search\n          </button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"loadRecords()\">\n            Reset\n          </button>\n        </div>\n        <div class=\"admin-loading\" *ngIf=\"isLoading\">Loading Companies...</div>\n      </div> -->\n    \n\n      <div class=\"admin-table-wrap\">\n        <table class=\"admin-table\" *ngIf=\"records.length; else emptyState\">\n          <thead>\n            <tr>\n              <th>Company Name</th>\n              <!-- <th>Description</th> -->\n              <th>Image</th>\n              <!-- <th>Display Order</th>\n              <th>Status</th> -->\n              <th>Actions</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let record of records; trackBy: trackByRecordId\">\n              <td>{{ record.clientName }}</td>\n              <!-- <td>{{ record.clientNameDesc }}</td> -->\n              <td>\n                <img\n                  class=\"client-logo\"\n                  *ngIf=\"record.image\"\n                  [src]=\"getClientImageUrl(record.image)\"\n                  [alt]=\"record.clientName + ' logo'\"\n                /><span *ngIf=\"!record.image\">No image</span>\n              </td>\n             <!-- <td>{{ record.displayOrder }}</td>\n               <td>\n                <span\n                  class=\"status-pill\"\n                  [class.inactive]=\"record.isActive === false\"\n                  >{{ record.isActive === false ? \"Inactive\" : \"Active\" }}</span\n                >\n              </td> -->\n              <td class=\"row-actions\">\n                <button\n                  class=\"table-link\"\n                  type=\"button\"\n                  (click)=\"selectClient(record)\"\n                >\n                  Edit\n                </button>\n                <!-- <button\n                  class=\"table-link\"\n                  type=\"button\"\n                  [disabled]=\"busyClientId === record.clientId?.toString()\"\n                  (click)=\"setActive(record, record.isActive === false)\"\n                >\n                  {{ record.isActive === false ? \"Activate\" : \"Deactivate\" }}\n                </button>\n                <button\n                  class=\"table-link danger\"\n                  type=\"button\"\n                  [disabled]=\"busyClientId === record.clientId?.toString()\"\n                  (click)=\"delete(record)\"\n                >\n                  Delete\n                </button> -->\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <ng-template #emptyState\n          ><div class=\"admin-loading\">No clients found.</div></ng-template\n        >\n      </div>\n    </div>\n  </div>\n</section>\n\n\n\n", styles: [".admin-form small {\n  min-height: 1rem;\n}\n\n.client-search-field,\n.client-search-control {\n  position: relative;\n}\n.client-dropdown-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n.client-dropdown-toggle .dropdown-icon {\n  margin-left: auto;\n}\n.client-search-menu {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: #fff;\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);\n}\n.client-search-menu input {\n  width: 100%;\n  min-height: 42px;\n  margin-bottom: 7px;\n  padding: 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n}\n.client-search-menu input:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n.client-search-option {\n  display: block;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  text-align: left;\n  cursor: pointer;\n}\n.client-search-option:hover,\n.client-search-option:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n}\n.client-search-empty {\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  text-align: center;\n}\n.status-pill {\n  display: inline-flex;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: #dcfce7;\n  color: #166534;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.status-pill.inactive {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.row-actions { \n  flex-wrap: wrap;\n  gap: 8px;\n}\n.table-link.danger {\n  color: #b91c1c;\n}\n\n.client-image-preview,\n.client-logo {\n  display: block;\n  width: 88px;\n  height: 64px;\n  padding: 6px;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  background: #fff;\n  object-fit: contain;\n}\n\n.client-image-preview {\n  width: 140px;\n  height: 90px;\n}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.NotifierService }, { type: i3.ClientManagementService }]; }, { imageFileInput: [{
            type: ViewChild,
            args: ["imageFileInput"]
        }] }); })();
//# sourceMappingURL=client-admin.component.js.map