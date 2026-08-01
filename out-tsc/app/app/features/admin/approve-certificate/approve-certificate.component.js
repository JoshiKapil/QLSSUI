import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/certification-form.service";
import * as i2 from "../../../core/services/client-management.service";
import * as i3 from "../../../core/services/notifier.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
import * as i6 from "@angular/forms";
function ApproveCertificateComponent_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function ApproveCertificateComponent_button_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.clearImport()); });
    i0.ɵɵelement(1, "i", 27);
    i0.ɵɵelementEnd();
} }
function ApproveCertificateComponent_div_27_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r9.importRecords.length, " row(s) ready to upload");
} }
function ApproveCertificateComponent_div_27_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r10.importErrors.length, " validation error(s)");
} }
function ApproveCertificateComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵtemplate(1, ApproveCertificateComponent_div_27_span_1_Template, 2, 1, "span", 25);
    i0.ɵɵtemplate(2, ApproveCertificateComponent_div_27_span_2_Template, 2, 1, "span", 29);
    i0.ɵɵelementStart(3, "button", 20);
    i0.ɵɵlistener("click", function ApproveCertificateComponent_div_27_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.uploadImport()); });
    i0.ɵɵelement(4, "i", 30);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.importErrors.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.importErrors.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r1.importing || !ctx_r1.importRecords.length || ctx_r1.importErrors.length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.importing ? "Uploading..." : "Upload", "");
} }
function ApproveCertificateComponent_ul_28_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r15 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(error_r15);
} }
function ApproveCertificateComponent_ul_28_li_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("And ", ctx_r14.importErrors.length - 8, " more.");
} }
function ApproveCertificateComponent_ul_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 32);
    i0.ɵɵtemplate(1, ApproveCertificateComponent_ul_28_li_1_Template, 2, 1, "li", 24);
    i0.ɵɵpipe(2, "slice");
    i0.ɵɵtemplate(3, ApproveCertificateComponent_ul_28_li_3_Template, 2, 1, "li", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx_r2.importErrors, 0, 8));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.importErrors.length > 8);
} }
function ApproveCertificateComponent_div_38_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function ApproveCertificateComponent_div_38_button_4_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r20); const company_r18 = restoredCtx.$implicit; const ctx_r19 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r19.selectCompany(company_r18.clientId)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const company_r18 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", company_r18.clientName, " ");
} }
function ApproveCertificateComponent_div_38_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, " No company found ");
    i0.ɵɵelementEnd();
} }
function ApproveCertificateComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "input", 34);
    i0.ɵɵlistener("ngModelChange", function ApproveCertificateComponent_div_38_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r21.companySearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 35);
    i0.ɵɵlistener("click", function ApproveCertificateComponent_div_38_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r22); const ctx_r23 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r23.selectCompany("")); });
    i0.ɵɵtext(3, " All companies ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ApproveCertificateComponent_div_38_button_4_Template, 2, 1, "button", 36);
    i0.ɵɵtemplate(5, ApproveCertificateComponent_div_38_div_5_Template, 2, 0, "div", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r3.companySearch);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredCompanies);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.filteredCompanies.length);
} }
function ApproveCertificateComponent_div_47_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function ApproveCertificateComponent_div_47_button_2_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r28); const user_r26 = restoredCtx.$implicit; const ctx_r27 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r27.selectUser(user_r26.certificationDataId)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const user_r26 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r26.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r26.email);
} }
function ApproveCertificateComponent_div_47_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, " No user found ");
    i0.ɵɵelementEnd();
} }
function ApproveCertificateComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "input", 39);
    i0.ɵɵlistener("ngModelChange", function ApproveCertificateComponent_div_47_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r29 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r29.userSearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, ApproveCertificateComponent_div_47_button_2_Template, 5, 2, "button", 36);
    i0.ɵɵtemplate(3, ApproveCertificateComponent_div_47_div_3_Template, 2, 0, "div", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r4.userSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.filteredUsers);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r4.filteredUsers.length);
} }
function ApproveCertificateComponent_tr_70_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "input", 40);
    i0.ɵɵlistener("change", function ApproveCertificateComponent_tr_70_Template_input_change_2_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r33); const record_r31 = restoredCtx.$implicit; const ctx_r32 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r32.toggle(record_r31, $event.target.checked)); });
    i0.ɵɵelementEnd()();
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
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const record_r31 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r5.selectedIds.has(record_r31.certificationDataId || 0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r31.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r31.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r31.trainingName || record_r31.trainingId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r5.companyName(record_r31.location));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r31.date);
} }
function ApproveCertificateComponent_tr_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 41);
    i0.ɵɵtext(2, "No pending certificate requests.");
    i0.ɵɵelementEnd()();
} }
export class ApproveCertificateComponent {
    constructor(certificationService, clientService, notifier) {
        this.certificationService = certificationService;
        this.clientService = clientService;
        this.notifier = notifier;
        this.records = [];
        this.companies = [];
        this.selectedIds = new Set();
        this.selectedCompanyId = '';
        this.selectedUserId = '';
        this.companySearch = '';
        this.userSearch = '';
        this.companyDropdownOpen = false;
        this.userDropdownOpen = false;
        this.loading = false;
        this.approving = false;
        this.importRecords = [];
        this.importErrors = [];
        this.importFileName = '';
        this.importing = false;
        this.draggingFile = false;
    }
    ngOnInit() {
        this.load();
        this.clientService.getAll().subscribe(clients => {
            this.companies = (clients || []).filter(client => client.isActive !== false);
        });
    }
    load() {
        this.loading = true;
        this.certificationService.getAll().subscribe({
            next: records => this.records = (records || []).filter(record => !record.certificationNumber),
            error: () => this.notifier.warningToastr('Pending certificate requests could not be loaded.'),
            complete: () => this.loading = false
        });
    }
    get filteredCompanies() {
        const search = this.companySearch.trim().toLowerCase();
        if (!search) {
            return this.companies;
        }
        return this.companies.filter(company => company.clientName.toLowerCase().includes(search));
    }
    get filteredUsers() {
        const search = this.userSearch.trim().toLowerCase();
        return this.records.filter(record => (!this.selectedCompanyId || String(record.location) === this.selectedCompanyId) &&
            (!search || record.name.toLowerCase().includes(search) || record.email.toLowerCase().includes(search)));
    }
    get visibleRecords() {
        return this.records.filter(record => !this.selectedCompanyId || String(record.location) === this.selectedCompanyId);
    }
    companyName(location) {
        const company = this.companies.find(item => String(item.clientId) === String(location));
        return company ? company.clientName : location;
    }
    selectedCompanyName() {
        if (!this.selectedCompanyId) {
            return 'All companies';
        }
        return this.companyName(this.selectedCompanyId);
    }
    selectedUserName() {
        const user = this.records.find(record => String(record.certificationDataId) === this.selectedUserId);
        return user ? `${user.name} - ${user.email}` : 'Select user';
    }
    toggleCompanyDropdown() {
        this.companyDropdownOpen = !this.companyDropdownOpen;
        this.userDropdownOpen = false;
        if (this.companyDropdownOpen) {
            this.companySearch = '';
        }
    }
    selectCompany(companyId) {
        this.selectedCompanyId = String(companyId);
        this.selectedUserId = '';
        this.companyDropdownOpen = false;
    }
    toggleUserDropdown() {
        this.userDropdownOpen = !this.userDropdownOpen;
        this.companyDropdownOpen = false;
        if (this.userDropdownOpen) {
            this.userSearch = '';
        }
    }
    selectUser(userId) {
        this.selectedUserId = userId ? String(userId) : '';
        this.userDropdownOpen = false;
    }
    toggle(record, checked) {
        const id = Number(record.certificationDataId);
        if (!id) {
            return;
        }
        if (checked) {
            this.selectedIds.add(id);
        }
        else {
            this.selectedIds.delete(id);
        }
    }
    toggleAll(checked) {
        this.selectedIds.clear();
        if (!checked) {
            return;
        }
        this.visibleRecords.forEach(record => {
            if (record.certificationDataId) {
                this.selectedIds.add(record.certificationDataId);
            }
        });
    }
    approveSelected() {
        const ids = this.selectedUserId
            ? [Number(this.selectedUserId)]
            : Array.from(this.selectedIds);
        this.approve(ids, '');
    }
    approveCompany() {
        if (!this.selectedCompanyId) {
            this.notifier.warningToastr('Select a company first.');
            return;
        }
        this.approve([], this.selectedCompanyId);
    }
    onFileSelected(event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            this.readImportFile(file);
        }
        input.value = '';
    }
    onFileDrop(event) {
        var _a, _b;
        event.preventDefault();
        this.draggingFile = false;
        const file = (_b = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
        if (file) {
            this.readImportFile(file);
        }
    }
    onDragOver(event) {
        event.preventDefault();
        this.draggingFile = true;
    }
    clearImport() {
        this.importRecords = [];
        this.importErrors = [];
        this.importFileName = '';
    }
    uploadImport() {
        if (!this.importRecords.length || this.importErrors.length) {
            this.notifier.warningToastr('Select a valid Excel file before uploading.');
            return;
        }
        this.importing = true;
        this.certificationService.import(this.importRecords).pipe(finalize(() => this.importing = false)).subscribe({
            next: result => {
                this.notifier.successToastr(`${result.importedCount} certification record(s) uploaded.`);
                this.clearImport();
                this.load();
            },
            error: error => {
                var _a;
                const message = ((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Certification records could not be uploaded.';
                this.notifier.warningToastr(message);
            }
        });
    }
    readImportFile(file) {
        this.clearImport();
        this.importFileName = file.name;
        if (!/\.(xlsx|xls)$/i.test(file.name)) {
            this.importErrors = ['Only .xlsx and .xls files are supported.'];
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const workbook = XLSX.read(reader.result, { type: 'array', cellDates: false });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet, {
                    defval: '',
                    raw: false
                });
                this.mapImportRows(rows);
            }
            catch (_a) {
                this.importErrors = ['The selected Excel file could not be read.'];
            }
        };
        reader.onerror = () => this.importErrors = ['The selected Excel file could not be read.'];
        reader.readAsArrayBuffer(file);
    }
    mapImportRows(rows) {
        if (!rows.length) {
            this.importErrors = ['The first worksheet does not contain any data rows.'];
            return;
        }
        const requiredHeaders = ['Date', 'Totalpoints', 'Name', 'Location', 'ContactNo', 'Email', 'TrainingId', 'Days', 'TrainerId'];
        const availableHeaders = Object.keys(rows[0]).map(header => this.normalizeHeader(header));
        const missingHeaders = requiredHeaders.filter(header => !availableHeaders.includes(this.normalizeHeader(header)));
        if (missingHeaders.length) {
            this.importErrors = [`Missing required column(s): ${missingHeaders.join(', ')}.`];
            return;
        }
        const errors = [];
        this.importRecords = rows.map((row, index) => {
            const rowNumber = index + 2;
            const name = this.excelValue(row, 'Name');
            const email = this.excelValue(row, 'Email');
            const trainingId = this.excelInteger(row, 'TrainingId');
            const days = this.excelInteger(row, 'Days');
            const trainerId = this.excelInteger(row, 'TrainerId');
            const totalPoints = this.excelInteger(row, 'Totalpoints', 'TotalPoints');
            if (!name)
                errors.push(`Row ${rowNumber}: Name is required.`);
            if (!email)
                errors.push(`Row ${rowNumber}: Email is required.`);
            if (trainingId <= 0)
                errors.push(`Row ${rowNumber}: TrainingId must be greater than zero.`);
            if (days < 0)
                errors.push(`Row ${rowNumber}: Days cannot be negative.`);
            if (trainerId <= 0)
                errors.push(`Row ${rowNumber}: TrainerId must be greater than zero.`);
            if (totalPoints < 0)
                errors.push(`Row ${rowNumber}: Totalpoints cannot be negative.`);
            return {
                certificationDate: '',
                certificationNumber: '',
                name,
                trainingId,
                date: this.excelValue(row, 'Date'),
                batchNo: this.excelValue(row, 'BatchNo'),
                contactNo: this.excelValue(row, 'ContactNo'),
                email,
                location: this.excelValue(row, 'Location'),
                days,
                totalPoints,
                trainerId,
                isComplete: true,
                isPaid: false,
                paymentId: '',
                paymentDate: null
            };
        });
        this.importErrors = errors;
    }
    excelValue(row, ...headers) {
        var _a;
        const normalized = headers.map(header => this.normalizeHeader(header));
        const key = Object.keys(row).find(header => normalized.includes(this.normalizeHeader(header)));
        return key ? String((_a = row[key]) !== null && _a !== void 0 ? _a : '').trim() : '';
    }
    excelInteger(row, ...headers) {
        const value = Number(this.excelValue(row, ...headers));
        return Number.isInteger(value) ? value : -1;
    }
    normalizeHeader(header) {
        return header.replace(/[\s_-]/g, '').toLowerCase();
    }
    approve(ids, location) {
        if (!ids.length && !location) {
            this.notifier.warningToastr('Select one or more users.');
            return;
        }
        this.approving = true;
        this.certificationService.approve(ids, location).subscribe({
            next: result => {
                this.notifier.successToastr(`${result.approvedCount} certificate(s) approved.`);
                this.selectedIds.clear();
                this.selectedUserId = '';
                this.load();
            },
            error: () => this.notifier.warningToastr('Certificates could not be approved.'),
            complete: () => this.approving = false
        });
    }
}
ApproveCertificateComponent.ɵfac = function ApproveCertificateComponent_Factory(t) { return new (t || ApproveCertificateComponent)(i0.ɵɵdirectiveInject(i1.CertificationFormService), i0.ɵɵdirectiveInject(i2.ClientManagementService), i0.ɵɵdirectiveInject(i3.NotifierService)); };
ApproveCertificateComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ApproveCertificateComponent, selectors: [["app-approve-certificate"]], decls: 72, vars: 16, consts: [[1, "admin-page"], [1, "container"], [1, "admin-header"], [1, "auth-eyebrow"], ["routerLink", "/admin/print-certificate", 1, "btn", "btn-outline"], ["aria-labelledby", "excel-import-title", 1, "import-panel"], [1, "import-panel__header"], ["id", "excel-import-title"], ["class", "icon-button", "type", "button", "title", "Remove selected file", "aria-label", "Remove selected file", 3, "click", 4, "ngIf"], [1, "file-drop", 3, "drop", "dragover", "dragleave"], ["type", "file", "accept", ".xlsx,.xls", 3, "change"], ["aria-hidden", "true", 1, "fas", "fa-file-excel"], ["class", "import-summary", 4, "ngIf"], ["class", "import-errors", 4, "ngIf"], [1, "filter-card"], [1, "search-dropdown"], ["type", "button", 1, "search-dropdown__toggle", 3, "click"], ["aria-hidden", "true"], ["class", "search-dropdown__menu", 4, "ngIf"], [1, "filter-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], ["type", "button", 1, "btn", "btn-outline", 3, "disabled", "click"], [1, "table-card"], ["type", "checkbox", "aria-label", "Select all visible users", 3, "change"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["type", "button", "title", "Remove selected file", "aria-label", "Remove selected file", 1, "icon-button", 3, "click"], ["aria-hidden", "true", 1, "fas", "fa-times"], [1, "import-summary"], ["class", "import-summary__error", 4, "ngIf"], ["aria-hidden", "true", 1, "fas", "fa-upload"], [1, "import-summary__error"], [1, "import-errors"], [1, "search-dropdown__menu"], ["type", "search", "placeholder", "Search company/location", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "search-dropdown__option", 3, "click"], ["class", "search-dropdown__option", "type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["class", "search-dropdown__empty", 4, "ngIf"], [1, "search-dropdown__empty"], ["type", "search", "placeholder", "Search name or email", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "checkbox", 3, "checked", "change"], ["colspan", "6"]], template: function ApproveCertificateComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Certificates");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Approve Certificates");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Approve every pending user for a company, one user, or a checkbox selection.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "a", 4);
        i0.ɵɵtext(11, "Print Certificates");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(12, "section", 5)(13, "div", 6)(14, "div")(15, "h2", 7);
        i0.ɵɵtext(16, "Upload certification data");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "p");
        i0.ɵɵtext(18, "Import approved certification records from the first worksheet.");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(19, ApproveCertificateComponent_button_19_Template, 2, 0, "button", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "label", 9);
        i0.ɵɵlistener("drop", function ApproveCertificateComponent_Template_label_drop_20_listener($event) { return ctx.onFileDrop($event); })("dragover", function ApproveCertificateComponent_Template_label_dragover_20_listener($event) { return ctx.onDragOver($event); })("dragleave", function ApproveCertificateComponent_Template_label_dragleave_20_listener() { return ctx.draggingFile = false; });
        i0.ɵɵelementStart(21, "input", 10);
        i0.ɵɵlistener("change", function ApproveCertificateComponent_Template_input_change_21_listener($event) { return ctx.onFileSelected($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelement(22, "i", 11);
        i0.ɵɵelementStart(23, "strong");
        i0.ɵɵtext(24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "span");
        i0.ɵɵtext(26, ".xlsx or .xls");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(27, ApproveCertificateComponent_div_27_Template, 6, 4, "div", 12);
        i0.ɵɵtemplate(28, ApproveCertificateComponent_ul_28_Template, 4, 6, "ul", 13);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "div", 14)(30, "label");
        i0.ɵɵtext(31, "Company/Location ");
        i0.ɵɵelementStart(32, "div", 15)(33, "button", 16);
        i0.ɵɵlistener("click", function ApproveCertificateComponent_Template_button_click_33_listener() { return ctx.toggleCompanyDropdown(); });
        i0.ɵɵelementStart(34, "span");
        i0.ɵɵtext(35);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "span", 17);
        i0.ɵɵtext(37, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(38, ApproveCertificateComponent_div_38_Template, 6, 3, "div", 18);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(39, "label");
        i0.ɵɵtext(40, "User ");
        i0.ɵɵelementStart(41, "div", 15)(42, "button", 16);
        i0.ɵɵlistener("click", function ApproveCertificateComponent_Template_button_click_42_listener() { return ctx.toggleUserDropdown(); });
        i0.ɵɵelementStart(43, "span");
        i0.ɵɵtext(44);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "span", 17);
        i0.ɵɵtext(46, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(47, ApproveCertificateComponent_div_47_Template, 4, 3, "div", 18);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(48, "div", 19)(49, "button", 20);
        i0.ɵɵlistener("click", function ApproveCertificateComponent_Template_button_click_49_listener() { return ctx.approveCompany(); });
        i0.ɵɵtext(50, "Approve Company");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "button", 21);
        i0.ɵɵlistener("click", function ApproveCertificateComponent_Template_button_click_51_listener() { return ctx.approveSelected(); });
        i0.ɵɵtext(52, "Approve Selected");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(53, "div", 22)(54, "table")(55, "thead")(56, "tr")(57, "th")(58, "input", 23);
        i0.ɵɵlistener("change", function ApproveCertificateComponent_Template_input_change_58_listener($event) { return ctx.toggleAll($event.target.checked); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(59, "th");
        i0.ɵɵtext(60, "Name");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "th");
        i0.ɵɵtext(62, "Email");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "th");
        i0.ɵɵtext(64, "Training");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(65, "th");
        i0.ɵɵtext(66, "Company/Location");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(67, "th");
        i0.ɵɵtext(68, "Date");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(69, "tbody");
        i0.ɵɵtemplate(70, ApproveCertificateComponent_tr_70_Template, 13, 6, "tr", 24);
        i0.ɵɵtemplate(71, ApproveCertificateComponent_tr_71_Template, 3, 0, "tr", 25);
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(19);
        i0.ɵɵproperty("ngIf", ctx.importFileName);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("file-drop--active", ctx.draggingFile);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.importFileName || "Choose or drop an Excel file");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.importFileName);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.importErrors.length);
        i0.ɵɵadvance(5);
        i0.ɵɵattribute("aria-expanded", ctx.companyDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedCompanyName());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.companyDropdownOpen);
        i0.ɵɵadvance(4);
        i0.ɵɵattribute("aria-expanded", ctx.userDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedUserName());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.userDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.approving);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.approving);
        i0.ɵɵadvance(19);
        i0.ɵɵproperty("ngForOf", ctx.visibleRecords);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.visibleRecords.length);
    } }, dependencies: [i4.NgForOf, i4.NgIf, i5.RouterLinkWithHref, i6.DefaultValueAccessor, i6.NgControlStatus, i6.NgModel, i4.SlicePipe], styles: [".admin-page[_ngcontent-%COMP%] { padding: 48px 0 72px; background: #f6f8fb; min-height: 70vh; }\n.admin-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; margin-bottom: 24px; }\n.admin-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 4px 0 8px; }\n.import-panel[_ngcontent-%COMP%] { margin-bottom: 20px; padding: 20px; border: 1px solid #d7dee8; border-radius: 8px; background: #fff; }\n.import-panel__header[_ngcontent-%COMP%] { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }\n.import-panel__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0 0 4px; font-size: 20px; color: #173b63; }\n.import-panel__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #64748b; }\n.icon-button[_ngcontent-%COMP%] { width: 36px; height: 36px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; color: #475569; cursor: pointer; }\n.file-drop[_ngcontent-%COMP%] { display: flex; min-height: 132px; align-items: center; justify-content: center; flex-direction: column; gap: 7px; padding: 20px; border: 2px dashed #94a3b8; border-radius: 8px; background: #f8fafc; cursor: pointer; text-align: center; }\n.file-drop--active[_ngcontent-%COMP%] { border-color: #2563eb; background: #eff6ff; }\n.file-drop[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }\n.file-drop[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { font-size: 28px; color: #16803c; }\n.file-drop[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #1e293b; }\n.file-drop[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #64748b; font-size: 13px; }\n.import-summary[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 14px; color: #166534; font-weight: 600; }\n.import-summary__error[_ngcontent-%COMP%], .import-errors[_ngcontent-%COMP%] { color: #b42318; }\n.import-errors[_ngcontent-%COMP%] { margin: 12px 0 0; padding-left: 22px; font-size: 14px; }\n.import-errors[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    + li[_ngcontent-%COMP%] { margin-top: 4px; }\n.filter-card[_ngcontent-%COMP%], .table-card[_ngcontent-%COMP%] { background: #fff; border: 1px solid #e0e6ed; border-radius: 14px; padding: 20px; box-shadow: 0 8px 24px rgba(21, 42, 70, .06); }\n.filter-card[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(220px, 1fr)) auto; gap: 16px; margin-bottom: 20px; align-items: end; }\nlabel[_ngcontent-%COMP%] { display: grid; gap: 7px; font-weight: 600; color: #1e3553; }\n.search-dropdown[_ngcontent-%COMP%] { position: relative; }\n.search-dropdown__toggle[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; min-height: 44px; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; background: #fff; color: #1e293b; font: inherit; font-weight: 500; text-align: left; cursor: pointer; }\n.search-dropdown__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.search-dropdown__menu[_ngcontent-%COMP%] { position: absolute; z-index: 100; top: calc(100% + 8px); right: 0; left: 0; max-height: 320px; overflow-y: auto; padding: 8px; border: 1px solid rgba(37, 99, 235, .18); border-radius: 14px; background: #fff; box-shadow: 0 18px 45px rgba(15, 23, 42, .18); }\n.search-dropdown__menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { position: sticky; z-index: 1; top: 0; width: 100%; min-height: 42px; margin-bottom: 7px; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 10px; outline: none; background: #f8fafc; font: inherit; }\n.search-dropdown__menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus { border-color: #2563eb; background: #fff; box-shadow: 0 0 0 3px rgba(37, 99, 235, .13); }\n.search-dropdown__option[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: flex-start; width: 100%; min-height: 42px; margin: 2px 0; padding: 10px 12px; border: 0; border-radius: 9px; background: transparent; color: #1e293b; font: inherit; text-align: left; cursor: pointer; }\n.search-dropdown__option[_ngcontent-%COMP%]:hover, .search-dropdown__option[_ngcontent-%COMP%]:focus-visible { outline: none; background: rgba(37, 99, 235, .1); color: #1d4ed8; }\n.search-dropdown__option[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 3px; color: #64748b; font-weight: 400; }\n.search-dropdown__empty[_ngcontent-%COMP%] { padding: 20px 12px; border-radius: 9px; background: #f8fafc; color: #64748b; text-align: center; }\n.filter-actions[_ngcontent-%COMP%] { display: flex; gap: 10px; padding-bottom: 1px; }\n.table-card[_ngcontent-%COMP%] { overflow-x: auto; padding: 0; }\ntable[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; min-width: 820px; }\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { padding: 13px 15px; text-align: left; border-bottom: 1px solid #e7edf3; }\nth[_ngcontent-%COMP%] { background: #173b63; color: #fff; }\ntd[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%], th[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] { width: auto; }\n@media (max-width: 900px) { .filter-card[_ngcontent-%COMP%] { grid-template-columns: 1fr; } .admin-header[_ngcontent-%COMP%] { flex-direction: column; } .import-summary[_ngcontent-%COMP%] { align-items: stretch; flex-direction: column; } }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApproveCertificateComponent, [{
        type: Component,
        args: [{ selector: 'app-approve-certificate', template: "<section class=\"admin-page\">\n  <div class=\"container\">\n    <div class=\"admin-header\">\n      <div><span class=\"auth-eyebrow\">Certificates</span><h1>Approve Certificates</h1>\n        <p>Approve every pending user for a company, one user, or a checkbox selection.</p></div>\n      <a class=\"btn btn-outline\" routerLink=\"/admin/print-certificate\">Print Certificates</a>\n    </div>\n\n    <section class=\"import-panel\" aria-labelledby=\"excel-import-title\">\n      <div class=\"import-panel__header\">\n        <div><h2 id=\"excel-import-title\">Upload certification data</h2><p>Import approved certification records from the first worksheet.</p></div>\n        <button *ngIf=\"importFileName\" class=\"icon-button\" type=\"button\" title=\"Remove selected file\" aria-label=\"Remove selected file\" (click)=\"clearImport()\"><i class=\"fas fa-times\" aria-hidden=\"true\"></i></button>\n      </div>\n      <label class=\"file-drop\" [class.file-drop--active]=\"draggingFile\" (drop)=\"onFileDrop($event)\" (dragover)=\"onDragOver($event)\" (dragleave)=\"draggingFile = false\">\n        <input type=\"file\" accept=\".xlsx,.xls\" (change)=\"onFileSelected($event)\" />\n        <i class=\"fas fa-file-excel\" aria-hidden=\"true\"></i><strong>{{ importFileName || 'Choose or drop an Excel file' }}</strong><span>.xlsx or .xls</span>\n      </label>\n      <div class=\"import-summary\" *ngIf=\"importFileName\">\n        <span *ngIf=\"!importErrors.length\">{{ importRecords.length }} row(s) ready to upload</span>\n        <span class=\"import-summary__error\" *ngIf=\"importErrors.length\">{{ importErrors.length }} validation error(s)</span>\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"uploadImport()\" [disabled]=\"importing || !importRecords.length || importErrors.length\"><i class=\"fas fa-upload\" aria-hidden=\"true\"></i> {{ importing ? 'Uploading...' : 'Upload' }}</button>\n      </div>\n      <ul class=\"import-errors\" *ngIf=\"importErrors.length\"><li *ngFor=\"let error of importErrors | slice:0:8\">{{ error }}</li><li *ngIf=\"importErrors.length > 8\">And {{ importErrors.length - 8 }} more.</li></ul>\n    </section>\n\n    <div class=\"filter-card\">\n      <label>Company/Location\n        <div class=\"search-dropdown\">\n          <button class=\"search-dropdown__toggle\" type=\"button\"\n            (click)=\"toggleCompanyDropdown()\" [attr.aria-expanded]=\"companyDropdownOpen\">\n            <span>{{ selectedCompanyName() }}</span><span aria-hidden=\"true\">&#9662;</span>\n          </button>\n          <div class=\"search-dropdown__menu\" *ngIf=\"companyDropdownOpen\">\n            <input type=\"search\" [(ngModel)]=\"companySearch\"\n              placeholder=\"Search company/location\" autocomplete=\"off\" />\n            <button class=\"search-dropdown__option\" type=\"button\" (click)=\"selectCompany('')\">\n              All companies\n            </button>\n            <button class=\"search-dropdown__option\" type=\"button\"\n              *ngFor=\"let company of filteredCompanies\"\n              (click)=\"selectCompany(company.clientId)\">\n              {{ company.clientName }}\n            </button>\n            <div class=\"search-dropdown__empty\" *ngIf=\"!filteredCompanies.length\">\n              No company found\n            </div>\n          </div>\n        </div>\n      </label>\n      <label>User\n        <div class=\"search-dropdown\">\n          <button class=\"search-dropdown__toggle\" type=\"button\"\n            (click)=\"toggleUserDropdown()\" [attr.aria-expanded]=\"userDropdownOpen\">\n            <span>{{ selectedUserName() }}</span><span aria-hidden=\"true\">&#9662;</span>\n          </button>\n          <div class=\"search-dropdown__menu\" *ngIf=\"userDropdownOpen\">\n            <input type=\"search\" [(ngModel)]=\"userSearch\"\n              placeholder=\"Search name or email\" autocomplete=\"off\" />\n            <button class=\"search-dropdown__option\" type=\"button\"\n              *ngFor=\"let user of filteredUsers\"\n              (click)=\"selectUser(user.certificationDataId)\">\n              <strong>{{ user.name }}</strong><small>{{ user.email }}</small>\n            </button>\n            <div class=\"search-dropdown__empty\" *ngIf=\"!filteredUsers.length\">\n              No user found\n            </div>\n          </div>\n        </div>\n      </label>\n      <div class=\"filter-actions\">\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"approveCompany()\" [disabled]=\"approving\">Approve Company</button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"approveSelected()\" [disabled]=\"approving\">Approve Selected</button>\n      </div>\n    </div>\n\n    <div class=\"table-card\">\n      <table>\n        <thead><tr>\n          <th><input type=\"checkbox\" (change)=\"toggleAll($any($event.target).checked)\" aria-label=\"Select all visible users\" /></th>\n          <th>Name</th><th>Email</th><th>Training</th><th>Company/Location</th><th>Date</th>\n        </tr></thead>\n        <tbody>\n          <tr *ngFor=\"let record of visibleRecords\">\n            <td><input type=\"checkbox\" [checked]=\"selectedIds.has(record.certificationDataId || 0)\"\n              (change)=\"toggle(record, $any($event.target).checked)\" /></td>\n            <td>{{ record.name }}</td><td>{{ record.email }}</td>\n            <td>{{ record.trainingName || record.trainingId }}</td>\n            <td>{{ companyName(record.location) }}</td><td>{{ record.date }}</td>\n          </tr>\n          <tr *ngIf=\"!loading && !visibleRecords.length\"><td colspan=\"6\">No pending certificate requests.</td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</section>\n", styles: [".admin-page { padding: 48px 0 72px; background: #f6f8fb; min-height: 70vh; }\n.admin-header { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; margin-bottom: 24px; }\n.admin-header h1 { margin: 4px 0 8px; }\n.import-panel { margin-bottom: 20px; padding: 20px; border: 1px solid #d7dee8; border-radius: 8px; background: #fff; }\n.import-panel__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }\n.import-panel__header h2 { margin: 0 0 4px; font-size: 20px; color: #173b63; }\n.import-panel__header p { margin: 0; color: #64748b; }\n.icon-button { width: 36px; height: 36px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; color: #475569; cursor: pointer; }\n.file-drop { display: flex; min-height: 132px; align-items: center; justify-content: center; flex-direction: column; gap: 7px; padding: 20px; border: 2px dashed #94a3b8; border-radius: 8px; background: #f8fafc; cursor: pointer; text-align: center; }\n.file-drop--active { border-color: #2563eb; background: #eff6ff; }\n.file-drop input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }\n.file-drop i { font-size: 28px; color: #16803c; }\n.file-drop strong { color: #1e293b; }\n.file-drop span { color: #64748b; font-size: 13px; }\n.import-summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 14px; color: #166534; font-weight: 600; }\n.import-summary__error, .import-errors { color: #b42318; }\n.import-errors { margin: 12px 0 0; padding-left: 22px; font-size: 14px; }\n.import-errors li + li { margin-top: 4px; }\n.filter-card, .table-card { background: #fff; border: 1px solid #e0e6ed; border-radius: 14px; padding: 20px; box-shadow: 0 8px 24px rgba(21, 42, 70, .06); }\n.filter-card { display: grid; grid-template-columns: repeat(2, minmax(220px, 1fr)) auto; gap: 16px; margin-bottom: 20px; align-items: end; }\nlabel { display: grid; gap: 7px; font-weight: 600; color: #1e3553; }\n.search-dropdown { position: relative; }\n.search-dropdown__toggle { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; min-height: 44px; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; background: #fff; color: #1e293b; font: inherit; font-weight: 500; text-align: left; cursor: pointer; }\n.search-dropdown__toggle span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.search-dropdown__menu { position: absolute; z-index: 100; top: calc(100% + 8px); right: 0; left: 0; max-height: 320px; overflow-y: auto; padding: 8px; border: 1px solid rgba(37, 99, 235, .18); border-radius: 14px; background: #fff; box-shadow: 0 18px 45px rgba(15, 23, 42, .18); }\n.search-dropdown__menu input { position: sticky; z-index: 1; top: 0; width: 100%; min-height: 42px; margin-bottom: 7px; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 10px; outline: none; background: #f8fafc; font: inherit; }\n.search-dropdown__menu input:focus { border-color: #2563eb; background: #fff; box-shadow: 0 0 0 3px rgba(37, 99, 235, .13); }\n.search-dropdown__option { display: flex; flex-direction: column; align-items: flex-start; width: 100%; min-height: 42px; margin: 2px 0; padding: 10px 12px; border: 0; border-radius: 9px; background: transparent; color: #1e293b; font: inherit; text-align: left; cursor: pointer; }\n.search-dropdown__option:hover, .search-dropdown__option:focus-visible { outline: none; background: rgba(37, 99, 235, .1); color: #1d4ed8; }\n.search-dropdown__option small { margin-top: 3px; color: #64748b; font-weight: 400; }\n.search-dropdown__empty { padding: 20px 12px; border-radius: 9px; background: #f8fafc; color: #64748b; text-align: center; }\n.filter-actions { display: flex; gap: 10px; padding-bottom: 1px; }\n.table-card { overflow-x: auto; padding: 0; }\ntable { width: 100%; border-collapse: collapse; min-width: 820px; }\nth, td { padding: 13px 15px; text-align: left; border-bottom: 1px solid #e7edf3; }\nth { background: #173b63; color: #fff; }\ntd input[type=checkbox], th input[type=checkbox] { width: auto; }\n@media (max-width: 900px) { .filter-card { grid-template-columns: 1fr; } .admin-header { flex-direction: column; } .import-summary { align-items: stretch; flex-direction: column; } }\n"] }]
    }], function () { return [{ type: i1.CertificationFormService }, { type: i2.ClientManagementService }, { type: i3.NotifierService }]; }, null); })();
//# sourceMappingURL=approve-certificate.component.js.map