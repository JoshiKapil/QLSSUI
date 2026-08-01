import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/notifier.service";
import * as i3 from "../../../core/services/training-management.service";
import * as i4 from "@angular/common/http";
import * as i5 from "../../../core/services/data.service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/router";
function TrainingAdminComponent_div_26_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("mousedown", function TrainingAdminComponent_div_26_button_4_Template_button_mousedown_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r9); const training_r7 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.selectTrainingFromDropdown(training_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const training_r7 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.getTrainingLabel(training_r7), " ");
} }
function TrainingAdminComponent_div_26_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, "No training found");
    i0.ɵɵelementEnd();
} }
const _c0 = function () { return { standalone: true }; };
function TrainingAdminComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "input", 34);
    i0.ɵɵlistener("ngModelChange", function TrainingAdminComponent_div_26_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.trainingSearch = $event); })("input", function TrainingAdminComponent_div_26_Template_input_input_1_listener() { i0.ɵɵrestoreView(_r11); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.onTrainingSearchChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 35);
    i0.ɵɵlistener("mousedown", function TrainingAdminComponent_div_26_Template_button_mousedown_2_listener() { i0.ɵɵrestoreView(_r11); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.selectTrainingFromDropdown(null)); });
    i0.ɵɵtext(3, "New Training");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, TrainingAdminComponent_div_26_button_4_Template, 2, 1, "button", 36);
    i0.ɵɵtemplate(5, TrainingAdminComponent_div_26_div_5_Template, 2, 0, "div", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r0.trainingSearch)("ngModelOptions", i0.ɵɵpureFunction0(4, _c0));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredTrainingList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.filteredTrainingList.length);
} }
function TrainingAdminComponent_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵtext(1, "Loading records...");
    i0.ɵɵelementEnd();
} }
function TrainingAdminComponent_table_74_tr_20_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td")(16, "button", 42);
    i0.ɵɵlistener("click", function TrainingAdminComponent_table_74_tr_20_Template_button_click_16_listener() { const restoredCtx = i0.ɵɵrestoreView(_r17); const record_r15 = restoredCtx.$implicit; const ctx_r16 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r16.edit(record_r15)); });
    i0.ɵɵtext(17, "Edit");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r15 = ctx.$implicit;
    const ctx_r14 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r15.trainingId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r14.getTrainingLabel(record_r15));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r15.trainingDesc);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r15.topicCovered);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r15.displayName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r15.image);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r15.displayOrder);
} }
function TrainingAdminComponent_table_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 40)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "TrainingId");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "TrainingName");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "TrainingDesc");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Topic Covered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "DisplayName");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Image");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "DisplayOrder");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵtemplate(20, TrainingAdminComponent_table_74_tr_20_Template, 18, 7, "tr", 41);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngForOf", ctx_r2.records)("ngForTrackBy", ctx_r2.trackByRecordId);
} }
function TrainingAdminComponent_ng_template_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵtext(1, "No records found.");
    i0.ɵɵelementEnd();
} }
export class TrainingAdminComponent {
    constructor(fb, notifier, trainingService, http, dataService) {
        this.fb = fb;
        this.notifier = notifier;
        this.trainingService = trainingService;
        this.http = http;
        this.dataService = dataService;
        this.title = 'Training';
        this.searchPlaceholder = 'Search by TrainingName or TrainingId';
        this.idKey = 'trainingId';
        this.records = [];
        this.allRecords = [];
        this.selectedRecord = null;
        this.searchTerm = '';
        this.isLoading = false;
        this.isSaving = false;
        this.selectedTrainingId = '';
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.Destroy$ = new Subject();
    }
    ngOnInit() {
        this.initForm();
        this.loadRecords();
    }
    ngOnDestroy() {
        this.Destroy$.next();
        this.Destroy$.complete();
    }
    initForm() {
        this.form = this.fb.group({
            trainingName: ['', Validators.required],
            trainingDesc: ['', Validators.required],
            topicCovered: ['', []],
            displayName: ['', Validators.required],
            image: ['', []],
            displayOrder: ['', Validators.required]
        });
    }
    loadRecords() {
        // this.isLoading = true;
        // const reqHeader = new HttpHeaders({
        //   ETag: 'f88dd058fe004909615a64f01be66a7',
        //   'Content-Type': 'application/json'
        // });
        // this.http
        //   .get('assets/Training.json', { headers: reqHeader, responseType: 'text' })
        //   .pipe(takeUntil(this.Destroy$))
        //   .subscribe({
        //     next: (data: string) => {
        //       const decrypted = this.dataService.decrypt(data);
        //       const trainings = decrypted?.Table || [];
        //       this.allRecords = trainings
        //         .map((training: unknown) => this.mapTrainingFromAsset(training))
        //         .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        //       this.records = [...this.allRecords];
        //       this.isLoading = false;
        //     },
        //     error: () => {
        //       this.allRecords = [];
        //       this.records = [];
        //       this.isLoading = false;
        //     }
        //   });
        // Future API integration: call this method instead of loadRecords().
        this.trainingService.getPaged(1, 100).pipe(takeUntil(this.Destroy$)).subscribe({
            next: (response) => {
                this.allRecords = (response.items || [])
                    .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
                this.records = [...this.allRecords];
            },
            error: (error) => {
                console.error('Failed to load training data.', { status: error.status });
                this.allRecords = [];
                this.records = [];
            },
            complete: () => (this.isLoading = false)
        });
    }
    search() {
        const search = this.searchTerm.trim().toLowerCase();
        if (!search) {
            this.records = [...this.allRecords];
            return;
        }
        this.records = this.allRecords.filter((training) => {
            const id = String(training.trainingId || '').toLowerCase();
            const name = (training.trainingName || '').toLowerCase();
            return id.includes(search) || name.includes(search);
        });
    }
    mapTrainingFromAsset(training) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const item = training;
        return {
            trainingId: ((_e = (_d = (_c = (_b = (_a = item['trainingId']) !== null && _a !== void 0 ? _a : item['TrainingId']) !== null && _b !== void 0 ? _b : item['TrainingID']) !== null && _c !== void 0 ? _c : item['Id']) !== null && _d !== void 0 ? _d : item['id']) !== null && _e !== void 0 ? _e : ''),
            trainingName: String((_h = (_g = (_f = item['trainingName']) !== null && _f !== void 0 ? _f : item['TrainingName']) !== null && _g !== void 0 ? _g : item['Name']) !== null && _h !== void 0 ? _h : ''),
            trainingDesc: String((_l = (_k = (_j = item['trainingDesc']) !== null && _j !== void 0 ? _j : item['TrainingDesc']) !== null && _k !== void 0 ? _k : item['Description']) !== null && _l !== void 0 ? _l : ''),
            topicCovered: String((_p = (_o = (_m = item['topicCovered']) !== null && _m !== void 0 ? _m : item['TopicCovered']) !== null && _o !== void 0 ? _o : item['TopicCoveredName']) !== null && _p !== void 0 ? _p : ''),
            displayName: String((_s = (_r = (_q = item['displayName']) !== null && _q !== void 0 ? _q : item['DisplayName']) !== null && _r !== void 0 ? _r : item['TrainingName']) !== null && _s !== void 0 ? _s : ''),
            image: String((_u = (_t = item['image']) !== null && _t !== void 0 ? _t : item['Image']) !== null && _u !== void 0 ? _u : ''),
            displayOrder: Number((_w = (_v = item['displayOrder']) !== null && _v !== void 0 ? _v : item['DisplayOrder']) !== null && _w !== void 0 ? _w : 0)
        };
    }
    edit(record) {
        this.selectedRecord = record;
        this.selectedTrainingId = String(record.trainingId || '');
        this.trainingSearch = this.getTrainingLabel(record);
        this.form.patchValue(record);
    }
    resetForm() {
        this.selectedRecord = null;
        this.selectedTrainingId = '';
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.form.reset();
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSaving = true;
        const payload = Object.assign(Object.assign({}, this.selectedRecord), this.form.value);
        this.trainingService.save(payload).subscribe({
            next: () => {
                this.notifier.successToastr(`Training saved successfully.`);
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
    onTrainingSelected(trainingId) {
        this.selectedTrainingId = trainingId;
        if (!trainingId) {
            this.resetForm();
            return;
        }
        const selected = this.records.find((training) => String(training.trainingId || '') === String(trainingId));
        if (selected) {
            this.edit(selected);
        }
    }
    get filteredTrainingList() {
        const search = this.trainingSearch.trim().toLowerCase();
        if (!search) {
            return this.records;
        }
        return this.records.filter((training) => {
            const label = this.getTrainingLabel(training).toLowerCase();
            const id = String(training.trainingId || '').toLowerCase();
            return label.includes(search) || id.includes(search);
        });
    }
    getTrainingLabel(training) {
        return training.displayName || training.trainingName || String(training.trainingId || 'Training');
    }
    getSelectedTrainingLabel() {
        if (!this.selectedTrainingId) {
            return 'New Training';
        }
        const selected = this.records.find((training) => String(training.trainingId || '') === String(this.selectedTrainingId));
        return selected ? this.getTrainingLabel(selected) : 'New Training';
    }
    toggleTrainingDropdown() {
        this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
        if (this.isTrainingDropdownOpen) {
            this.trainingSearch = '';
        }
    }
    onTrainingSearchChange() {
        this.isTrainingDropdownOpen = true;
    }
    selectTrainingFromDropdown(training) {
        if (!training) {
            this.onTrainingSelected('');
            this.isTrainingDropdownOpen = false;
            return;
        }
        this.onTrainingSelected(String(training.trainingId || ''));
        this.trainingSearch = this.getTrainingLabel(training);
        this.isTrainingDropdownOpen = false;
    }
}
TrainingAdminComponent.ɵfac = function TrainingAdminComponent_Factory(t) { return new (t || TrainingAdminComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.NotifierService), i0.ɵɵdirectiveInject(i3.TrainingManagementService), i0.ɵɵdirectiveInject(i4.HttpClient), i0.ɵɵdirectiveInject(i5.DataService)); };
TrainingAdminComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TrainingAdminComponent, selectors: [["app-training-admin"]], decls: 77, vars: 18, consts: [[1, "admin-section"], [1, "container", "admin-shell"], [1, "admin-header"], [1, "auth-eyebrow"], [1, "admin-actions"], ["routerLink", "/admin/trainings", 1, "btn", "btn-outline"], ["routerLink", "/admin/trainer", 1, "btn", "btn-outline"], ["routerLink", "/admin/clients", 1, "btn", "btn-outline"], [1, "admin-layout"], [1, "admin-form", 3, "formGroup", "ngSubmit"], [1, "form-field", "training-search-field"], [1, "training-search-control"], ["type", "button", "aria-haspopup", "listbox", 1, "btn", "btn-outline", "btn-small", "training-dropdown-toggle", 3, "click"], [1, "dropdown-icon"], ["class", "training-search-menu", "role", "listbox", 4, "ngIf"], [1, "form-field"], ["type", "text", "formControlName", "trainingName"], ["rows", "4", "formControlName", "trainingDesc"], ["rows", "4", "formControlName", "topicCovered"], ["type", "text", "formControlName", "displayName"], ["type", "text", "formControlName", "image", "placeholder", "Image URL or uploaded file data"], ["type", "file", "accept", "image/*", 3, "change"], ["type", "number", "formControlName", "displayOrder"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [1, "admin-tools"], [1, "admin-search"], ["type", "text", "name", "searchTerm", 3, "ngModel", "placeholder", "ngModelChange", "keydown.enter"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["class", "admin-loading", 4, "ngIf"], [1, "admin-table-wrap"], ["class", "admin-table", 4, "ngIf", "ngIfElse"], ["emptyState", ""], ["role", "listbox", 1, "training-search-menu"], ["type", "text", "name", "trainingSearch", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelOptions", "ngModelChange", "input"], ["type", "button", "role", "option", 1, "training-search-option", 3, "mousedown"], ["class", "training-search-option", "type", "button", "role", "option", 3, "mousedown", 4, "ngFor", "ngForOf"], ["class", "training-search-empty", 4, "ngIf"], [1, "training-search-empty"], [1, "admin-loading"], [1, "admin-table"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "table-link", 3, "click"]], template: function TrainingAdminComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Training");
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
        i0.ɵɵlistener("ngSubmit", function TrainingAdminComponent_Template_form_ngSubmit_16_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(17, "h2");
        i0.ɵɵtext(18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "label", 10);
        i0.ɵɵtext(20, "Training ");
        i0.ɵɵelementStart(21, "div", 11)(22, "button", 12);
        i0.ɵɵlistener("click", function TrainingAdminComponent_Template_button_click_22_listener() { return ctx.toggleTrainingDropdown(); });
        i0.ɵɵtext(23);
        i0.ɵɵelementStart(24, "span", 13);
        i0.ɵɵtext(25, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(26, TrainingAdminComponent_div_26_Template, 6, 5, "div", 14);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(27, "label", 15);
        i0.ɵɵtext(28, "TrainingName ");
        i0.ɵɵelement(29, "input", 16);
        i0.ɵɵelementStart(30, "small");
        i0.ɵɵtext(31);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(32, "label", 15);
        i0.ɵɵtext(33, "TrainingDesc ");
        i0.ɵɵelement(34, "textarea", 17);
        i0.ɵɵelementStart(35, "small");
        i0.ɵɵtext(36);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(37, "label", 15);
        i0.ɵɵtext(38, "Topic Covered ");
        i0.ɵɵelement(39, "textarea", 18);
        i0.ɵɵelementStart(40, "small");
        i0.ɵɵtext(41);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(42, "label", 15);
        i0.ɵɵtext(43, "DisplayName ");
        i0.ɵɵelement(44, "input", 19);
        i0.ɵɵelementStart(45, "small");
        i0.ɵɵtext(46);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(47, "label", 15);
        i0.ɵɵtext(48, "Image ");
        i0.ɵɵelement(49, "input", 20);
        i0.ɵɵelementStart(50, "input", 21);
        i0.ɵɵlistener("change", function TrainingAdminComponent_Template_input_change_50_listener($event) { return ctx.onImageSelected($event, "image"); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(51, "small");
        i0.ɵɵtext(52);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(53, "label", 15);
        i0.ɵɵtext(54, "DisplayOrder ");
        i0.ɵɵelement(55, "input", 22);
        i0.ɵɵelementStart(56, "small");
        i0.ɵɵtext(57);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(58, "div", 4)(59, "button", 23);
        i0.ɵɵtext(60);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "button", 24);
        i0.ɵɵlistener("click", function TrainingAdminComponent_Template_button_click_61_listener() { return ctx.resetForm(); });
        i0.ɵɵtext(62, "Clear");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(63, "div", 25)(64, "h2");
        i0.ɵɵtext(65, "Search");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "div", 26)(67, "input", 27);
        i0.ɵɵlistener("ngModelChange", function TrainingAdminComponent_Template_input_ngModelChange_67_listener($event) { return ctx.searchTerm = $event; })("keydown.enter", function TrainingAdminComponent_Template_input_keydown_enter_67_listener() { return ctx.search(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "button", 28);
        i0.ɵɵlistener("click", function TrainingAdminComponent_Template_button_click_68_listener() { return ctx.search(); });
        i0.ɵɵtext(69, "Search");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "button", 24);
        i0.ɵɵlistener("click", function TrainingAdminComponent_Template_button_click_70_listener() { return ctx.loadRecords(); });
        i0.ɵɵtext(71, "Reset");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(72, TrainingAdminComponent_div_72_Template, 2, 0, "div", 29);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(73, "div", 30);
        i0.ɵɵtemplate(74, TrainingAdminComponent_table_74_Template, 21, 2, "table", 31);
        i0.ɵɵtemplate(75, TrainingAdminComponent_ng_template_75_Template, 2, 0, "ng-template", null, 32, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        const _r3 = i0.ɵɵreference(76);
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", ctx.selectedRecord ? "Edit" : "Add", " Training");
        i0.ɵɵadvance(4);
        i0.ɵɵattribute("aria-expanded", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.getSelectedTrainingLabel(), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("trainingName", "TrainingName"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("trainingDesc", "TrainingDesc"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("topicCovered", "Topic Covered"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("displayName", "DisplayName"));
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(ctx.fieldError("image", "Image"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("displayOrder", "DisplayOrder"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.isSaving ? "Saving..." : "Save");
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngModel", ctx.searchTerm)("placeholder", ctx.searchPlaceholder);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.records.length)("ngIfElse", _r3);
    } }, dependencies: [i6.NgForOf, i6.NgIf, i7.RouterLinkWithHref, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, i1.FormGroupDirective, i1.FormControlName], styles: [".admin-form[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  min-height: 1rem;\n}\n\n.training-search-field[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  width: 100%;   \n   border: 1px solid #dfdfdf;\n    border-radius: 10px;\n    box-decoration-break: clone;\n    color: var(--text-dark);\n}\n\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 40;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  max-height: 240px;\n  overflow-y: auto;\n  border: 1px solid rgba(17, 24, 39, 0.14);\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: calc(100% - 16px);\n  margin: 8px;\n}\n\n.training-search-option[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 10px 12px;\n  text-align: left;\n  color: #111827;\n  cursor: pointer;\n}\n\n.training-search-option[_ngcontent-%COMP%]:hover, .training-search-option[_ngcontent-%COMP%]:focus {\n  background: rgba(59, 130, 246, 0.08);\n}\n\n.training-search-empty[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  color: #6b7280;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: '';\n  transform: rotate(45deg);\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition: color 150ms ease, background 150ms ease, transform 150ms ease;\n}\n\n.training-search-option[_ngcontent-%COMP%]:hover, .training-search-option[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  background: linear-gradient(90deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.07));\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrainingAdminComponent, [{
        type: Component,
        args: [{ selector: 'app-training-admin', template: "<section class=\"admin-section\">\n  <div class=\"container admin-shell\">\n    <div class=\"admin-header\">\n      <div>\n        <span class=\"auth-eyebrow\">Admin</span>\n        <h1>Training</h1>\n      </div>\n      <div class=\"admin-actions\">\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainings\">Trainings</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/trainer\">Trainer</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/clients\">Companies</a>\n        <!-- <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-posts\">Posts</a>\n        <a class=\"btn btn-outline\" routerLink=\"/admin/linkedin-comments\">Comments</a> -->\n      </div>\n    </div>\n\n    <div class=\"admin-layout\">\n      <form class=\"admin-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <h2>{{ selectedRecord ? 'Edit' : 'Add' }} Training</h2>\n        <label class=\"form-field training-search-field\">Training\n          <div class=\"training-search-control\">\n            <button class=\"btn btn-outline btn-small training-dropdown-toggle\" type=\"button\" (click)=\"toggleTrainingDropdown()\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"isTrainingDropdownOpen\">\n              {{ getSelectedTrainingLabel() }}\n              <span class=\"dropdown-icon\">&#9662;</span>\n            </button>\n            <div class=\"training-search-menu\" *ngIf=\"isTrainingDropdownOpen\" role=\"listbox\">\n              <input type=\"text\" [(ngModel)]=\"trainingSearch\" [ngModelOptions]=\"{ standalone: true }\" name=\"trainingSearch\" placeholder=\"Search training\" autocomplete=\"off\" (input)=\"onTrainingSearchChange()\" />\n              <button class=\"training-search-option\" type=\"button\" (mousedown)=\"selectTrainingFromDropdown(null)\" role=\"option\">New Training</button>\n              <button class=\"training-search-option\" type=\"button\" *ngFor=\"let training of filteredTrainingList\" (mousedown)=\"selectTrainingFromDropdown(training)\" role=\"option\">\n                {{ getTrainingLabel(training) }}\n              </button>\n              <div class=\"training-search-empty\" *ngIf=\"!filteredTrainingList.length\">No training found</div>\n            </div>\n          </div>\n        </label>\n        <label class=\"form-field\">TrainingName\n          <input type=\"text\" formControlName=\"trainingName\" />\n          <small>{{ fieldError('trainingName', 'TrainingName') }}</small>\n        </label>\n        <label class=\"form-field\">TrainingDesc\n          <textarea rows=\"4\" formControlName=\"trainingDesc\"></textarea>\n          <small>{{ fieldError('trainingDesc', 'TrainingDesc') }}</small>\n        </label>\n        <label class=\"form-field\">Topic Covered\n          <textarea rows=\"4\" formControlName=\"topicCovered\"></textarea>\n          <small>{{ fieldError('topicCovered', 'Topic Covered') }}</small>\n        </label>\n        <label class=\"form-field\">DisplayName\n          <input type=\"text\" formControlName=\"displayName\" />\n          <small>{{ fieldError('displayName', 'DisplayName') }}</small>\n        </label>\n        <label class=\"form-field\">Image\n          <input type=\"text\" formControlName=\"image\" placeholder=\"Image URL or uploaded file data\" />\n          <input type=\"file\" accept=\"image/*\" (change)=\"onImageSelected($event, 'image')\" />\n          <small>{{ fieldError('image', 'Image') }}</small>\n        </label>\n        <label class=\"form-field\">DisplayOrder\n          <input type=\"number\" formControlName=\"displayOrder\" />\n          <small>{{ fieldError('displayOrder', 'DisplayOrder') }}</small>\n        </label>\n\n        <div class=\"admin-actions\">\n          <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"isSaving\">{{ isSaving ? 'Saving...' : 'Save' }}</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"resetForm()\">Clear</button>\n        </div>\n      </form>\n\n      <div class=\"admin-tools\">\n        <h2>Search</h2>\n        <div class=\"admin-search\">\n          <input type=\"text\" [(ngModel)]=\"searchTerm\" [placeholder]=\"searchPlaceholder\" name=\"searchTerm\" (keydown.enter)=\"search()\" />\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"search()\">Search</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"loadRecords()\">Reset</button>\n        </div>\n\n        <div class=\"admin-loading\" *ngIf=\"isLoading\">Loading records...</div>\n      </div>\n    </div>\n\n    <div class=\"admin-table-wrap\">\n      <table class=\"admin-table\" *ngIf=\"records.length; else emptyState\">\n        <thead>\n          <tr>\n            <th>TrainingId</th>\n            <th>TrainingName</th>\n            <th>TrainingDesc</th>\n            <th>Topic Covered</th>\n            <th>DisplayName</th>\n            <th>Image</th>\n            <th>DisplayOrder</th>\n            <th>Action</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let record of records; trackBy: trackByRecordId\">\n            <td>{{ record.trainingId }}</td>\n            <td>{{ getTrainingLabel(record) }}</td>\n            <td>{{ record.trainingDesc }}</td>\n            <td>{{ record.topicCovered }}</td>\n            <td>{{ record.displayName }}</td>\n            <td>{{ record.image }}</td>\n            <td>{{ record.displayOrder }}</td>\n            <td><button class=\"table-link\" type=\"button\" (click)=\"edit(record)\">Edit</button></td>\n          </tr>\n        </tbody>\n      </table>\n      <ng-template #emptyState>\n        <div class=\"admin-loading\">No records found.</div>\n      </ng-template>\n    </div>\n  </div>\n</section>\r\n", styles: [".admin-form small {\n  min-height: 1rem;\n}\n\n.training-search-field {\n  position: relative;\n}\n\n.training-search-control {\n  position: relative;\n}\n\n.training-dropdown-toggle {\n  justify-content: space-between;\n  width: 100%;   \n   border: 1px solid #dfdfdf;\n    border-radius: 10px;\n    box-decoration-break: clone;\n    color: var(--text-dark);\n}\n\n.training-search-menu {\n  position: absolute;\n  z-index: 40;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  max-height: 240px;\n  overflow-y: auto;\n  border: 1px solid rgba(17, 24, 39, 0.14);\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);\n}\n\n.training-search-menu input {\n  width: calc(100% - 16px);\n  margin: 8px;\n}\n\n.training-search-option {\n  display: block;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 10px 12px;\n  text-align: left;\n  color: #111827;\n  cursor: pointer;\n}\n\n.training-search-option:hover,\n.training-search-option:focus {\n  background: rgba(59, 130, 246, 0.08);\n}\n\n.training-search-empty {\n  padding: 10px 12px;\n  color: #6b7280;\n}\n\n.training-dropdown-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.training-dropdown-toggle .dropdown-icon {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n/* Shared polished training picker */\n.training-search-control {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: '';\n  transform: rotate(45deg);\n}\n\n.training-search-menu input {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;\n}\n\n.training-search-menu input:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition: color 150ms ease, background 150ms ease, transform 150ms ease;\n}\n\n.training-search-option:hover,\n.training-search-option:focus-visible {\n  outline: none;\n  background: linear-gradient(90deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.07));\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu::-webkit-scrollbar-track {\n  background: transparent;\n}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.NotifierService }, { type: i3.TrainingManagementService }, { type: i4.HttpClient }, { type: i5.DataService }]; }, null); })();
//# sourceMappingURL=training-admin.component.js.map