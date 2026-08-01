import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/notifier.service";
import * as i3 from "../../../core/services/certification.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
function CertificationComponent_div_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵelement(1, "i", 41);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.excelData.length, " certification ", ctx_r0.excelData.length === 1 ? "row" : "rows", " ready to upload");
} }
function CertificationComponent_div_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.uploadMessage, " ");
} }
function CertificationComponent_div_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1, "Loading records...");
    i0.ɵɵelementEnd();
} }
function CertificationComponent_table_85_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "button", 47);
    i0.ɵɵlistener("click", function CertificationComponent_table_85_tr_16_Template_button_click_12_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const record_r7 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.edit(record_r7)); });
    i0.ɵɵtext(13, "Edit");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r7.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r7.certificationNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r7.issuedDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r7.topic);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r7.description);
} }
function CertificationComponent_table_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 45)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "UserName");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "CertificationNumber");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "IssuedDate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Topic");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, CertificationComponent_table_85_tr_16_Template, 14, 5, "tr", 46);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r3.records)("ngForTrackBy", ctx_r3.trackByRecordId);
} }
function CertificationComponent_ng_template_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1, "No records found.");
    i0.ɵɵelementEnd();
} }
export class CertificationComponent {
    constructor(fb, notifier, certificationService) {
        this.fb = fb;
        this.notifier = notifier;
        this.certificationService = certificationService;
        this.title = 'Certification';
        this.searchPlaceholder = 'Search by CertificationNumber or UserName';
        this.idKey = 'certificationNumber';
        this.records = [];
        this.selectedRecord = null;
        this.searchTerm = '';
        this.isLoading = false;
        this.isSaving = false;
        this.isUploading = false;
        this.uploadMessage = '';
        this.bulkFile = null;
        this.excelData = [];
    }
    ngOnInit() {
        this.initForm();
        this.loadRecords();
    }
    initForm() {
        this.form = this.fb.group({
            userName: ['', Validators.required],
            certificationNumber: ['', Validators.required],
            issuedDate: ['', Validators.required],
            topic: ['', Validators.required],
            description: ['', Validators.required]
        });
    }
    loadRecords() {
        this.isLoading = true;
        this.certificationService.getAll().subscribe({
            next: (records) => (this.records = records || []),
            complete: () => (this.isLoading = false)
        });
    }
    search() {
        this.isLoading = true;
        this.certificationService.search(this.searchTerm).subscribe({
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
        this.certificationService.save(payload).subscribe({
            next: () => {
                this.notifier.successToastr(`Certification saved successfully.`);
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
    onBulkFileSelected(event) {
        var _a;
        const input = event.target;
        this.bulkFile = ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        this.uploadMessage = '';
    }
    onFileChange(event) {
        const target = (event.target);
        if (target.files.length !== 1)
            return;
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const bstr = e.target.result;
            const workbook = XLSX.read(bstr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            this.excelData = XLSX.utils.sheet_to_json(sheet); // convert to JSON
            console.log("Excel Data: ", this.excelData);
        };
        reader.readAsBinaryString(file);
    }
    saveExcelToServer() {
        if (!Array.isArray(this.excelData)) {
            console.error("excelData is not an array!");
            return;
        }
        const payload = this.excelData.map(row => ({
            CertificationNumber: this.getExcelValue(row, 'CertificationNumber'),
            Name: this.getExcelValue(row, 'Name', 'UserName'),
            Topic: this.getExcelValue(row, 'Topic', 'CourseName'),
            Date: this.getExcelDate(row, 'Date', 'IssuedDate'),
            BatchNo: this.getExcelValue(row, 'BatchNo'),
            ContactNo: this.getExcelValue(row, 'ContactNo'),
            Email: this.getExcelValue(row, 'Email'),
            Location: this.getExcelValue(row, 'Location', 'Loacation')
        }));
        this.isUploading = true;
        this.uploadMessage = '';
        this.certificationService.uploadExcelData(payload).pipe(finalize(() => (this.isUploading = false))).subscribe({
            next: (uploadedCount) => {
                this.notifier.successToastr(`${uploadedCount} certification record${uploadedCount === 1 ? '' : 's'} uploaded successfully.`);
                this.excelData = [];
                this.loadRecords();
            },
            error: (error) => {
                this.uploadMessage = this.getUploadError(error);
                this.notifier.warningToastr(this.uploadMessage);
                console.error('Certification upload failed:', error);
            }
        });
    }
    getExcelValue(row, ...headers) {
        var _a;
        const expectedHeaders = headers.map(header => this.normalizeHeader(header));
        const matchingKey = Object.keys(row).find(key => expectedHeaders.includes(this.normalizeHeader(key)));
        return matchingKey == null ? '' : String((_a = row[matchingKey]) !== null && _a !== void 0 ? _a : '').trim();
    }
    getExcelDate(row, ...headers) {
        const value = this.getExcelValue(row, ...headers);
        const excelSerial = Number(value);
        return value !== '' && Number.isFinite(excelSerial)
            ? XLSX.SSF.format('yyyy-mm-dd', excelSerial)
            : value;
    }
    getUploadError(error) {
        const apiError = error === null || error === void 0 ? void 0 : error.error;
        if (typeof apiError === 'string') {
            return apiError;
        }
        if (apiError === null || apiError === void 0 ? void 0 : apiError.errors) {
            const details = Object.values(apiError.errors).flatMap(messages => Array.isArray(messages) ? messages : [messages]);
            if (details.length > 0) {
                return details.join(' ');
            }
        }
        return (apiError === null || apiError === void 0 ? void 0 : apiError.message) || 'Unable to upload certification records.';
    }
    normalizeHeader(header) {
        return header.replace(/[\s_-]/g, '').toLowerCase();
    }
    uploadBulk() {
        if (!this.bulkFile) {
            this.uploadMessage = 'Choose an Excel or CSV file first.';
            return;
        }
        console.log(this.bulkFile);
        this.isUploading = true;
        this.certificationService.uploadBulk(this.bulkFile).subscribe({
            next: () => {
                this.uploadMessage = '';
                this.notifier.successToastr('Bulk upload completed.');
                this.loadRecords();
            },
            complete: () => (this.isUploading = false)
        });
    }
}
CertificationComponent.ɵfac = function CertificationComponent_Factory(t) { return new (t || CertificationComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.NotifierService), i0.ɵɵdirectiveInject(i3.CertificationService)); };
CertificationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CertificationComponent, selectors: [["app-certification-admin"]], decls: 88, vars: 19, consts: [[1, "admin-section"], [1, "container", "admin-shell"], [1, "admin-header"], [1, "auth-eyebrow"], [1, "admin-actions"], ["routerLink", "/admin/trainings", 1, "btn", "btn-outline"], ["routerLink", "/admin/trainer", 1, "btn", "btn-outline"], ["routerLink", "/admin/clients", 1, "btn", "btn-outline"], ["routerLink", "/admin/linkedin-posts", 1, "btn", "btn-outline"], ["routerLink", "/admin/linkedin-comments", 1, "btn", "btn-outline"], [1, "admin-layout"], [1, "admin-form", 3, "formGroup", "ngSubmit"], [1, "form-field"], ["type", "text", "formControlName", "userName"], ["type", "text", "formControlName", "certificationNumber"], ["type", "date", "formControlName", "issuedDate"], ["type", "text", "formControlName", "topic"], ["rows", "4", "formControlName", "description"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [1, "admin-tools"], [1, "admin-search"], ["type", "text", "name", "searchTerm", 3, "ngModel", "placeholder", "ngModelChange", "keydown.enter"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["aria-labelledby", "certUploadTitle", 1, "cert-upload"], [1, "cert-upload__heading"], ["aria-hidden", "true", 1, "cert-upload__icon"], [1, "fa-solid", "fa-file-excel"], ["id", "certUploadTitle"], ["for", "fileInput", 1, "cert-upload__dropzone"], ["aria-hidden", "true", 1, "fa-solid", "fa-cloud-arrow-up"], ["type", "file", "id", "fileInput", "accept", ".xlsx,.xls,.csv", 1, "cert-upload__input", 3, "change"], ["class", "cert-upload__status", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", "cert-upload__button", 3, "disabled", "click"], ["aria-hidden", "true", 1, "fa-solid", 3, "ngClass"], ["class", "form-error cert-upload__error", "role", "alert", 4, "ngIf"], ["class", "admin-loading", 4, "ngIf"], [1, "admin-table-wrap"], ["class", "admin-table", 4, "ngIf", "ngIfElse"], ["emptyState", ""], [1, "cert-upload__status"], ["aria-hidden", "true", 1, "fa-solid", "fa-circle-check"], ["role", "alert", 1, "form-error", "cert-upload__error"], ["aria-hidden", "true", 1, "fa-solid", "fa-circle-exclamation"], [1, "admin-loading"], [1, "admin-table"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "table-link", 3, "click"]], template: function CertificationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Certification");
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
        i0.ɵɵlistener("ngSubmit", function CertificationComponent_Template_form_ngSubmit_20_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(21, "h2");
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "label", 12);
        i0.ɵɵtext(24, "UserName ");
        i0.ɵɵelement(25, "input", 13);
        i0.ɵɵelementStart(26, "small");
        i0.ɵɵtext(27);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(28, "label", 12);
        i0.ɵɵtext(29, "CertificationNumber ");
        i0.ɵɵelement(30, "input", 14);
        i0.ɵɵelementStart(31, "small");
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(33, "label", 12);
        i0.ɵɵtext(34, "IssuedDate ");
        i0.ɵɵelement(35, "input", 15);
        i0.ɵɵelementStart(36, "small");
        i0.ɵɵtext(37);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(38, "label", 12);
        i0.ɵɵtext(39, "Topic ");
        i0.ɵɵelement(40, "input", 16);
        i0.ɵɵelementStart(41, "small");
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(43, "label", 12);
        i0.ɵɵtext(44, "Description ");
        i0.ɵɵelement(45, "textarea", 17);
        i0.ɵɵelementStart(46, "small");
        i0.ɵɵtext(47);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(48, "div", 4)(49, "button", 18);
        i0.ɵɵtext(50);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "button", 19);
        i0.ɵɵlistener("click", function CertificationComponent_Template_button_click_51_listener() { return ctx.resetForm(); });
        i0.ɵɵtext(52, "Clear");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(53, "div", 20)(54, "h2");
        i0.ɵɵtext(55, "Search");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "div", 21)(57, "input", 22);
        i0.ɵɵlistener("ngModelChange", function CertificationComponent_Template_input_ngModelChange_57_listener($event) { return ctx.searchTerm = $event; })("keydown.enter", function CertificationComponent_Template_input_keydown_enter_57_listener() { return ctx.search(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "button", 23);
        i0.ɵɵlistener("click", function CertificationComponent_Template_button_click_58_listener() { return ctx.search(); });
        i0.ɵɵtext(59, "Search");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "button", 19);
        i0.ɵɵlistener("click", function CertificationComponent_Template_button_click_60_listener() { return ctx.loadRecords(); });
        i0.ɵɵtext(61, "Reset");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(62, "section", 24)(63, "div", 25)(64, "span", 26);
        i0.ɵɵelement(65, "i", 27);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "div")(67, "h2", 28);
        i0.ɵɵtext(68, "Bulk Upload");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "p");
        i0.ɵɵtext(70, "Import certification records from an Excel or CSV file.");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(71, "label", 29);
        i0.ɵɵelement(72, "i", 30);
        i0.ɵɵelementStart(73, "strong");
        i0.ɵɵtext(74, "Choose certification file");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "span");
        i0.ɵɵtext(76, "Supported formats: XLSX, XLS and CSV");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(77, "input", 31);
        i0.ɵɵlistener("change", function CertificationComponent_Template_input_change_77_listener($event) { return ctx.onFileChange($event); });
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(78, CertificationComponent_div_78_Template, 4, 2, "div", 32);
        i0.ɵɵelementStart(79, "button", 33);
        i0.ɵɵlistener("click", function CertificationComponent_Template_button_click_79_listener() { return ctx.saveExcelToServer(); });
        i0.ɵɵelement(80, "i", 34);
        i0.ɵɵtext(81);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(82, CertificationComponent_div_82_Template, 3, 1, "div", 35);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(83, CertificationComponent_div_83_Template, 2, 0, "div", 36);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(84, "div", 37);
        i0.ɵɵtemplate(85, CertificationComponent_table_85_Template, 17, 2, "table", 38);
        i0.ɵɵtemplate(86, CertificationComponent_ng_template_86_Template, 2, 0, "ng-template", null, 39, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        const _r4 = i0.ɵɵreference(87);
        i0.ɵɵadvance(20);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.selectedRecord ? "Edit" : "Add", " Certification");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("userName", "UserName"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("certificationNumber", "CertificationNumber"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("issuedDate", "IssuedDate"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("topic", "Topic"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("description", "Description"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.isSaving ? "Saving..." : "Save");
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngModel", ctx.searchTerm)("placeholder", ctx.searchPlaceholder);
        i0.ɵɵadvance(21);
        i0.ɵɵproperty("ngIf", ctx.excelData.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isUploading || ctx.excelData.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isUploading ? "fa-spinner fa-spin" : "fa-cloud-arrow-up");
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isUploading ? "Uploading..." : "Upload to Server", " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.uploadMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.records.length)("ngIfElse", _r4);
    } }, dependencies: [i4.NgClass, i4.NgForOf, i4.NgIf, i5.RouterLinkWithHref, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, i1.FormGroupDirective, i1.FormControlName], styles: [".admin-form[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  min-height: 1rem;\n}\n\n.cert-upload[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1.25rem;\n  border: 1px solid rgba(47, 124, 232, 0.2);\n  border-radius: 16px;\n  background: linear-gradient(145deg, #ffffff 0%, rgba(206, 225, 252, 0.35) 100%);\n  box-shadow: 0 12px 30px rgba(21, 54, 93, 0.08);\n}\n\n.cert-upload__heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  margin-bottom: 1rem;\n\n  h2 {\n    margin: 0 0 0.2rem;\n    font-size: 1.15rem;\n  }\n\n  p {\n    margin: 0;\n    color: #64748b;\n    font-size: 0.85rem;\n    line-height: 1.45;\n  }\n}\n\n.cert-upload__icon[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 44px;\n  width: 44px;\n  height: 44px;\n  place-items: center;\n  border-radius: 12px;\n  color: #ffffff;\n  background: linear-gradient(135deg, var(--primary), var(--secondary));\n  box-shadow: 0 8px 18px rgba(47, 124, 232, 0.24);\n}\n\n.cert-upload__dropzone[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 150px;\n  padding: 1.25rem;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 0.45rem;\n  border: 2px dashed rgba(47, 124, 232, 0.42);\n  border-radius: 14px;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.72);\n  cursor: pointer;\n  text-align: center;\n  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;\n\n  &:hover,\n  &:focus-within {\n    border-color: var(--primary);\n    background: rgba(206, 225, 252, 0.38);\n    transform: translateY(-2px);\n  }\n\n  > i {\n    margin-bottom: 0.2rem;\n    color: var(--primary);\n    font-size: 2rem;\n  }\n\n  strong {\n    color: #1e293b;\n    font-size: 0.95rem;\n  }\n\n  span {\n    color: #64748b;\n    font-size: 0.78rem;\n  }\n}\n\n.cert-upload__input[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n}\n\n.cert-upload__status[_ngcontent-%COMP%] {\n  display: flex;\n  margin-top: 0.85rem;\n  padding: 0.65rem 0.8rem;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  color: #166534;\n  background: #dcfce7;\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n.cert-upload__button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1rem;\n  justify-content: center;\n  gap: 0.5rem;\n\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.55;\n    transform: none;\n  }\n}\n\n.cert-upload__error[_ngcontent-%COMP%] {\n  display: flex;\n  margin-top: 0.85rem;\n  align-items: flex-start;\n  gap: 0.45rem;\n  line-height: 1.4;\n}\n\n@media (max-width: 576px) {\n  .cert-upload[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .cert-upload__dropzone[_ngcontent-%COMP%] {\n    min-height: 130px;\n  }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CertificationComponent, [{
        type: Component,
        args: [{ selector: 'app-certification-admin', template: "<section class=\"admin-section\">\n  <div class=\"container admin-shell\">\n    <div class=\"admin-header\">\n      <div>\n        <span class=\"auth-eyebrow\">Admin</span>\n        <h1>Certification</h1>\n      </div>\n      <div class=\"admin-actions\">\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainings\">Trainings</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainer\">Trainer</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/clients\">Clients</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-posts\">Posts</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-comments\">Comments</a>\n      </div>\n    </div>\n\n    <div class=\"admin-layout\">\n      <form class=\"admin-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <h2>{{ selectedRecord ? 'Edit' : 'Add' }} Certification</h2>\n        <label class=\"form-field\">UserName\n          <input type=\"text\" formControlName=\"userName\" />\n          <small>{{ fieldError('userName', 'UserName') }}</small>\n        </label>\n        <label class=\"form-field\">CertificationNumber\n          <input type=\"text\" formControlName=\"certificationNumber\" />\n          <small>{{ fieldError('certificationNumber', 'CertificationNumber') }}</small>\n        </label>\n        <label class=\"form-field\">IssuedDate\n          <input type=\"date\" formControlName=\"issuedDate\" />\n          <small>{{ fieldError('issuedDate', 'IssuedDate') }}</small>\n        </label>\n        <label class=\"form-field\">Topic\n          <input type=\"text\" formControlName=\"topic\" />\n          <small>{{ fieldError('topic', 'Topic') }}</small>\n        </label>\n        <label class=\"form-field\">Description\n          <textarea rows=\"4\" formControlName=\"description\"></textarea>\n          <small>{{ fieldError('description', 'Description') }}</small>\n        </label>\n\n        <div class=\"admin-actions\">\n          <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"isSaving\">{{ isSaving ? 'Saving...' : 'Save' }}</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"resetForm()\">Clear</button>\n        </div>\n      </form>\n\n      <div class=\"admin-tools\">\n        <h2>Search</h2>\n        <div class=\"admin-search\">\n          <input type=\"text\" [(ngModel)]=\"searchTerm\" [placeholder]=\"searchPlaceholder\" name=\"searchTerm\" (keydown.enter)=\"search()\" />\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"search()\">Search</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"loadRecords()\">Reset</button>\n        </div>\n        <section class=\"cert-upload\" aria-labelledby=\"certUploadTitle\">\n          <div class=\"cert-upload__heading\">\n            <span class=\"cert-upload__icon\" aria-hidden=\"true\">\n              <i class=\"fa-solid fa-file-excel\"></i>\n            </span>\n            <div>\n              <h2 id=\"certUploadTitle\">Bulk Upload</h2>\n              <p>Import certification records from an Excel or CSV file.</p>\n            </div>\n          </div>\n\n          <label class=\"cert-upload__dropzone\" for=\"fileInput\">\n            <i class=\"fa-solid fa-cloud-arrow-up\" aria-hidden=\"true\"></i>\n            <strong>Choose certification file</strong>\n            <span>Supported formats: XLSX, XLS and CSV</span>\n            <input\n              class=\"cert-upload__input\"\n              type=\"file\"\n              id=\"fileInput\"\n              (change)=\"onFileChange($event)\"\n              accept=\".xlsx,.xls,.csv\"\n            />\n          </label>\n\n          <div class=\"cert-upload__status\" *ngIf=\"excelData.length > 0\">\n            <i class=\"fa-solid fa-circle-check\" aria-hidden=\"true\"></i>\n            <span>{{ excelData.length }} certification {{ excelData.length === 1 ? 'row' : 'rows' }} ready to upload</span>\n          </div>\n\n          <button\n            class=\"btn btn-primary cert-upload__button\"\n            type=\"button\"\n            (click)=\"saveExcelToServer()\"\n            [disabled]=\"isUploading || excelData.length === 0\"\n          >\n            <i class=\"fa-solid\" [ngClass]=\"isUploading ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'\" aria-hidden=\"true\"></i>\n            {{ isUploading ? 'Uploading...' : 'Upload to Server' }}\n          </button>\n\n          <div *ngIf=\"uploadMessage\" class=\"form-error cert-upload__error\" role=\"alert\">\n            <i class=\"fa-solid fa-circle-exclamation\" aria-hidden=\"true\"></i>\n            {{ uploadMessage }}\n          </div>\n        </section>\n        <!-- <div class=\"bulk-upload\">\n          <h2>Bulk Upload</h2>\n          <label class=\"form-field\">Excel / CSV File\n            <input type=\"file\" accept=\".xlsx,.xls,.csv\" (change)=\"onBulkFileSelected($event)\" />\n          </label>\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"uploadBulk()\" [disabled]=\"isUploading || !bulkFile\">{{ isUploading ? 'Uploading...' : 'Upload' }}</button>\n          <div *ngIf=\"uploadMessage\" class=\"form-error\">{{ uploadMessage }}</div>\n        </div> -->\n\n        <div class=\"admin-loading\" *ngIf=\"isLoading\">Loading records...</div>\n      </div>\n    </div>\n\n    <div class=\"admin-table-wrap\">\n      <table class=\"admin-table\" *ngIf=\"records.length; else emptyState\">\n        <thead>\n          <tr>\n            <th>UserName</th>\n            <th>CertificationNumber</th>\n            <th>IssuedDate</th>\n            <th>Topic</th>\n            <th>Description</th>\n            <th>Action</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let record of records; trackBy: trackByRecordId\">\n            <td>{{ record.userName }}</td>\n            <td>{{ record.certificationNumber }}</td>\n            <td>{{ record.issuedDate }}</td>\n            <td>{{ record.topic }}</td>\n            <td>{{ record.description }}</td>\n            <td><button class=\"table-link\" type=\"button\" (click)=\"edit(record)\">Edit</button></td>\n          </tr>\n        </tbody>\n      </table>\n      <ng-template #emptyState>\n        <div class=\"admin-loading\">No records found.</div>\n      </ng-template>\n    </div>\n  </div>\n</section>\n", styles: [".admin-form small {\n  min-height: 1rem;\n}\n\n.cert-upload {\n  margin-top: 1.5rem;\n  padding: 1.25rem;\n  border: 1px solid rgba(47, 124, 232, 0.2);\n  border-radius: 16px;\n  background: linear-gradient(145deg, #ffffff 0%, rgba(206, 225, 252, 0.35) 100%);\n  box-shadow: 0 12px 30px rgba(21, 54, 93, 0.08);\n}\n\n.cert-upload__heading {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  margin-bottom: 1rem;\n\n  h2 {\n    margin: 0 0 0.2rem;\n    font-size: 1.15rem;\n  }\n\n  p {\n    margin: 0;\n    color: #64748b;\n    font-size: 0.85rem;\n    line-height: 1.45;\n  }\n}\n\n.cert-upload__icon {\n  display: grid;\n  flex: 0 0 44px;\n  width: 44px;\n  height: 44px;\n  place-items: center;\n  border-radius: 12px;\n  color: #ffffff;\n  background: linear-gradient(135deg, var(--primary), var(--secondary));\n  box-shadow: 0 8px 18px rgba(47, 124, 232, 0.24);\n}\n\n.cert-upload__dropzone {\n  display: flex;\n  min-height: 150px;\n  padding: 1.25rem;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 0.45rem;\n  border: 2px dashed rgba(47, 124, 232, 0.42);\n  border-radius: 14px;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.72);\n  cursor: pointer;\n  text-align: center;\n  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;\n\n  &:hover,\n  &:focus-within {\n    border-color: var(--primary);\n    background: rgba(206, 225, 252, 0.38);\n    transform: translateY(-2px);\n  }\n\n  > i {\n    margin-bottom: 0.2rem;\n    color: var(--primary);\n    font-size: 2rem;\n  }\n\n  strong {\n    color: #1e293b;\n    font-size: 0.95rem;\n  }\n\n  span {\n    color: #64748b;\n    font-size: 0.78rem;\n  }\n}\n\n.cert-upload__input {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n}\n\n.cert-upload__status {\n  display: flex;\n  margin-top: 0.85rem;\n  padding: 0.65rem 0.8rem;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  color: #166534;\n  background: #dcfce7;\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n.cert-upload__button {\n  width: 100%;\n  margin-top: 1rem;\n  justify-content: center;\n  gap: 0.5rem;\n\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.55;\n    transform: none;\n  }\n}\n\n.cert-upload__error {\n  display: flex;\n  margin-top: 0.85rem;\n  align-items: flex-start;\n  gap: 0.45rem;\n  line-height: 1.4;\n}\n\n@media (max-width: 576px) {\n  .cert-upload {\n    padding: 1rem;\n  }\n\n  .cert-upload__dropzone {\n    min-height: 130px;\n  }\n}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.NotifierService }, { type: i3.CertificationService }]; }, null); })();
//# sourceMappingURL=certification.component.js.map