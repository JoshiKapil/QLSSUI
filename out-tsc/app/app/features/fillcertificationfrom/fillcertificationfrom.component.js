import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common/http";
import * as i3 from "../../core/services/data.service";
import * as i4 from "../../core/services/notifier.service";
import * as i5 from "../../core/services/trainer.service";
import * as i6 from "../../core/services/client-management.service";
import * as i7 from "../../core/services/certification-form.service";
import * as i8 from "../../core/services/training-management.service";
import * as i9 from "@angular/router";
import * as i10 from "@angular/common";
function FillcertificationfromComponent_div_18_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("mousedown", function FillcertificationfromComponent_div_18_button_2_Template_button_mousedown_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const training_r5 = restoredCtx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.selectTrainingFromDropdown(training_r5)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const training_r5 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.getTrainingLabel(training_r5), " ");
} }
function FillcertificationfromComponent_div_18_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, " No training found ");
    i0.ɵɵelementEnd();
} }
const _c0 = function () { return { standalone: true }; };
function FillcertificationfromComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "input", 30);
    i0.ɵɵlistener("ngModelChange", function FillcertificationfromComponent_div_18_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.trainingSearch = $event); })("input", function FillcertificationfromComponent_div_18_Template_input_input_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.onTrainingSearchChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, FillcertificationfromComponent_div_18_button_2_Template, 2, 1, "button", 31);
    i0.ɵɵtemplate(3, FillcertificationfromComponent_div_18_div_3_Template, 2, 0, "div", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r0.trainingSearch)("ngModelOptions", i0.ɵɵpureFunction0(4, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredTrainingList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.filteredTrainingList.length);
} }
function FillcertificationfromComponent_option_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const trainer_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", trainer_r11.trainerId);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", trainer_r11.name, " ");
} }
function FillcertificationfromComponent_div_53_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("mousedown", function FillcertificationfromComponent_div_53_button_2_Template_button_mousedown_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r16); const company_r14 = restoredCtx.$implicit; const ctx_r15 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r15.selectCompany(company_r14)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const company_r14 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", company_r14.clientName, " ");
} }
function FillcertificationfromComponent_div_53_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, "No company found");
    i0.ɵɵelementEnd();
} }
function FillcertificationfromComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 36)(1, "input", 37);
    i0.ɵɵlistener("ngModelChange", function FillcertificationfromComponent_div_53_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.companySearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, FillcertificationfromComponent_div_53_button_2_Template, 2, 1, "button", 38);
    i0.ɵɵtemplate(3, FillcertificationfromComponent_div_53_div_3_Template, 2, 0, "div", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r2.companySearch)("ngModelOptions", i0.ɵɵpureFunction0(4, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredCompanies);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.filteredCompanies.length);
} }
export class FillcertificationfromComponent {
    constructor(fb, http, dataService, notifier, trainerService, clientService, certificationFormService, trainingService, router) {
        this.fb = fb;
        this.http = http;
        this.dataService = dataService;
        this.notifier = notifier;
        this.trainerService = trainerService;
        this.clientService = clientService;
        this.certificationFormService = certificationFormService;
        this.trainingService = trainingService;
        this.router = router;
        this.trainers = [];
        this.companies = [];
        this.isLoadingTrainers = false;
        this.isLoadingCompanies = false;
        this.isSubmitting = false;
        this.trainingList = [];
        this.trainingSearch = "";
        this.isTrainingDropdownOpen = false;
        this.selectedTrainingId = "";
        this.trainingName = "";
        this.companySearch = "";
        this.isCompanyDropdownOpen = false;
        this.selectedCompanyId = "";
    }
    ngOnInit() {
        this.initForm();
        this.loadTrainers();
        this.loadTrainingList();
        this.loadRecords();
    }
    initForm() {
        this.form = this.fb.group({
            name: ["", [Validators.required, Validators.maxLength(200)]],
            mobile: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
            email: ["", [Validators.required, Validators.email]],
            days: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
            trainingId: ["", Validators.required],
            trainerId: ["", Validators.required],
            location: ["", Validators.required],
            certificationDate: ["", Validators.required],
            isComplete: [{ value: false, disabled: true }],
            isPaid: [{ value: false, disabled: true }],
        });
    }
    loadRecords() {
        this.isLoadingCompanies = true;
        this.clientService.getAll().subscribe({
            next: (clients) => {
                this.companies = (clients || []).filter((client) => client.isActive !== false);
            },
            error: () => {
                this.companies = [];
                this.notifier.warningToastr("Companies could not be loaded.");
            },
            complete: () => (this.isLoadingCompanies = false),
        });
    }
    // private loadTrainingList(): void {
    //   const reqHeader = new HttpHeaders({
    //     ETag: "f88dd058fe004909615a64f01be66a7",
    //     "Content-Type": "application/json",
    //   });
    //   this.http
    //     .get("assets/Training.json", { headers: reqHeader, responseType: "text" })
    //     .subscribe({
    //       next: (data: string) => {
    //         const decrypted = this.dataService.decrypt(data);
    //         const trainings = decrypted?.Table || [];
    //         this.trainingList = trainings
    //           .map((training: any) => this.mapTrainingFromAsset(training))
    //           .sort(
    //             (a: Training, b: Training) =>
    //               Number(a.displayOrder || 0) - Number(b.displayOrder || 0),
    //           );
    //         this.syncSelectedTrainingFromDetails();
    //       },
    //       error: () => {
    //         this.trainingList = [];
    //         this.syncSelectedTrainingFromDetails();
    //       },
    //     });
    // }
    //Future API integration: call this method instead of loadTrainingList().
    loadTrainingList() {
        this.trainingService.getPaged(1, 100).subscribe({
            next: (response) => {
                this.trainingList = (response.items || [])
                    .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
                this.syncSelectedTrainingFromDetails();
            },
            error: (error) => {
                console.error("Failed to load training data.", { status: error.status });
                this.trainingList = [];
                this.syncSelectedTrainingFromDetails();
            },
        });
    }
    mapTrainingFromAsset(training) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        return {
            trainingId: (_e = (_d = (_c = (_b = (_a = training.trainingId) !== null && _a !== void 0 ? _a : training.TrainingId) !== null && _b !== void 0 ? _b : training.TrainingID) !== null && _c !== void 0 ? _c : training.Id) !== null && _d !== void 0 ? _d : training.id) !== null && _e !== void 0 ? _e : "",
            trainingName: (_h = (_g = (_f = training.trainingName) !== null && _f !== void 0 ? _f : training.TrainingName) !== null && _g !== void 0 ? _g : training.Name) !== null && _h !== void 0 ? _h : "",
            trainingDesc: (_l = (_k = (_j = training.trainingDesc) !== null && _j !== void 0 ? _j : training.TrainingDesc) !== null && _k !== void 0 ? _k : training.Description) !== null && _l !== void 0 ? _l : "",
            topicCovered: (_p = (_o = (_m = training.topicCovered) !== null && _m !== void 0 ? _m : training.TopicCovered) !== null && _o !== void 0 ? _o : training.TopicCoveredName) !== null && _p !== void 0 ? _p : "",
            displayName: (_s = (_r = (_q = training.displayName) !== null && _q !== void 0 ? _q : training.DisplayName) !== null && _r !== void 0 ? _r : training.TrainingName) !== null && _s !== void 0 ? _s : "",
            image: (_u = (_t = training.image) !== null && _t !== void 0 ? _t : training.Image) !== null && _u !== void 0 ? _u : "",
            displayOrder: Number((_w = (_v = training.displayOrder) !== null && _v !== void 0 ? _v : training.DisplayOrder) !== null && _w !== void 0 ? _w : 0),
        };
    }
    syncSelectedTrainingFromDetails() {
        const trainingId = String(this.form.controls["trainingId"].value || "");
        this.selectedTrainingId = trainingId;
        if (!trainingId) {
            return;
        }
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : "") === trainingId; });
        if (selected) {
            this.trainingName = selected.trainingName;
            this.trainingSearch = this.getTrainingLabel(selected);
        }
    }
    loadTrainers() {
        this.isLoadingTrainers = true;
        this.trainerService.getAll().subscribe({
            next: (trainers) => {
                if (trainers === null || trainers === void 0 ? void 0 : trainers.length) {
                    this.trainers = trainers;
                    this.isLoadingTrainers = false;
                }
                else {
                    this.loadFallbackTrainers();
                }
            },
            error: () => this.loadFallbackTrainers(),
        });
    }
    toggleTrainingDropdown() {
        this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
        if (this.isTrainingDropdownOpen) {
            this.trainingSearch = "";
        }
    }
    get filteredCompanies() {
        const search = this.companySearch.trim().toLowerCase();
        return !search
            ? this.companies
            : this.companies.filter(company => company.clientName.toLowerCase().includes(search) ||
                String(company.clientId).includes(search));
    }
    getSelectedCompanyLabel() {
        const selected = this.companies.find(company => String(company.clientId) === this.selectedCompanyId);
        return (selected === null || selected === void 0 ? void 0 : selected.clientName) || "Select Company";
    }
    toggleCompanyDropdown() {
        this.isCompanyDropdownOpen = !this.isCompanyDropdownOpen;
        if (this.isCompanyDropdownOpen)
            this.companySearch = "";
    }
    selectCompany(company) {
        this.selectedCompanyId = String(company.clientId);
        this.form.controls["location"].setValue(this.selectedCompanyId);
        this.form.controls["location"].markAsTouched();
        this.companySearch = company.clientName;
        this.isCompanyDropdownOpen = false;
    }
    findExistingRecord() {
        const email = String(this.form.controls["email"].value || "").trim();
        const trainingId = Number(this.form.controls["trainingId"].value);
        if (!email || !trainingId || this.form.controls["email"].invalid)
            return;
        this.certificationFormService.getByUserTraining(email, trainingId).subscribe({
            next: record => {
                this.existingRecordId = record.certificationDataId;
                this.form.patchValue({
                    name: record.name,
                    mobile: record.contactNo,
                    email: record.email,
                    days: record.days,
                    trainerId: String(record.trainerId),
                    location: String(record.location),
                    certificationDate: record.date || record.certificationDate
                });
                this.selectedCompanyId = String(record.location || "");
                this.notifier.successToastr("Your existing exam form has been loaded.");
            },
            error: () => this.existingRecordId = undefined
        });
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        const raw = this.form.getRawValue();
        const selectedTrainer = this.trainers.find((trainer) => String(trainer.trainerId || "") === String(raw.trainerId));
        const payload = {
            certificationNumber: "",
            name: raw.name,
            contactNo: raw.mobile,
            email: raw.email,
            days: Number(raw.days),
            trainerId: raw.trainerId,
            trainerName: (selectedTrainer === null || selectedTrainer === void 0 ? void 0 : selectedTrainer.name) || "",
            certificationDate: raw.certificationDate,
            isComplete: false,
            isPaid: false,
            paymentId: "",
            razorpayOrderId: "",
            razorpaySignature: "",
            certificationFormId: "",
            batchNo: "",
            date: raw.certificationDate,
            location: raw.location,
            paymentDate: "",
            trainingId: Number(raw.trainingId),
        };
        console.log(payload);
        this.certificationFormService.save(payload).subscribe({
            next: (saved) => {
                this.notifier.successToastr("Exam form submitted successfully.");
                sessionStorage.setItem("qlss-exam-form-selection", JSON.stringify({
                    username: saved.email || payload.email,
                    trainingId: String(saved.trainingId || payload.trainingId),
                    name: saved.name || payload.name,
                    contact: saved.contactNo || payload.contactNo
                }));
                this.router.navigate(["/test"]);
            },
            error: () => {
                this.notifier.warningToastr("Certification form could not be submitted.");
                this.isSubmitting = false;
            },
            complete: () => (this.isSubmitting = false),
        });
    }
    getSelectedTrainingLabel() {
        if (!this.selectedTrainingId) {
            return "Select Training";
        }
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : "") === String(this.selectedTrainingId); });
        return selected ? this.getTrainingLabel(selected) : "Select Training";
    }
    get filteredTrainingList() {
        const search = this.trainingSearch.trim().toLowerCase();
        if (!search) {
            return this.trainingList;
        }
        return this.trainingList.filter((training) => {
            const label = this.getTrainingLabel(training).toLowerCase();
            const id = String(training.trainingId || "").toLowerCase();
            const topicCovered = (training.topicCovered || "").toLowerCase();
            return (label.includes(search) ||
                id.includes(search) ||
                topicCovered.includes(search));
        });
    }
    getTrainingLabel(training) {
        return (training.displayName ||
            training.trainingName ||
            String(training.trainingId || "Training"));
    }
    openTrainingDropdown() {
        this.isTrainingDropdownOpen = true;
    }
    onTrainingSearchChange() {
        this.isTrainingDropdownOpen = true;
    }
    onTrainingSelected(trainingId) {
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : "") === String(trainingId); });
        this.selectedTrainingId = trainingId;
        this.form.controls["trainingId"].setValue(selected ? trainingId : "");
        this.form.controls["trainingId"].markAsTouched();
        this.trainingName = (selected === null || selected === void 0 ? void 0 : selected.trainingName) || "";
        this.trainingSearch = selected ? this.getTrainingLabel(selected) : "";
    }
    selectTrainingFromDropdown(training) {
        var _a;
        const trainingId = String((_a = training.trainingId) !== null && _a !== void 0 ? _a : "");
        this.onTrainingSelected(trainingId);
        this.trainingSearch = this.getTrainingLabel(training);
        this.isTrainingDropdownOpen = false;
    }
    reset() {
        var _a, _b;
        this.form.reset({
            name: "",
            mobile: "",
            email: "",
            days: "",
            trainingId: "",
            trainerId: "",
            location: "",
            certificationDate: "",
            isComplete: false,
            isPaid: false,
        });
        this.selectedTrainingId = "";
        this.trainingSearch = "";
        this.trainingName = "";
        this.selectedCompanyId = "";
        this.companySearch = "";
        this.isCompanyDropdownOpen = false;
        this.existingRecordId = undefined;
        this.isTrainingDropdownOpen = false;
        (_a = this.form.get("isComplete")) === null || _a === void 0 ? void 0 : _a.disable();
        (_b = this.form.get("isPaid")) === null || _b === void 0 ? void 0 : _b.disable();
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
    loadFallbackTrainers() {
        this.http.get("assets/trainers.json").subscribe({
            next: (trainers) => {
                this.trainers = trainers || [];
                this.isLoadingTrainers = false;
            },
            error: () => {
                this.trainers = [];
                this.isLoadingTrainers = false;
            },
        });
    }
    startDummyPayment() {
        const options = {
            key: "RAZORPAY_KEY_HERE",
            amount: 0,
            currency: "INR",
            name: "QLSS Certification",
            description: "Certification Payment",
            handler: () => {
                this.notifier.successToastr("Payment completed.");
            },
        };
        const razorpay = window.Razorpay;
        if (!razorpay) {
            this.notifier.warningToastr("Razorpay script not loaded. Dummy payment skipped.");
            return;
        }
        const payment = new razorpay(options);
        payment.open();
    }
}
FillcertificationfromComponent.ɵfac = function FillcertificationfromComponent_Factory(t) { return new (t || FillcertificationfromComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.HttpClient), i0.ɵɵdirectiveInject(i3.DataService), i0.ɵɵdirectiveInject(i4.NotifierService), i0.ɵɵdirectiveInject(i5.TrainerService), i0.ɵɵdirectiveInject(i6.ClientManagementService), i0.ɵɵdirectiveInject(i7.CertificationFormService), i0.ɵɵdirectiveInject(i8.TrainingManagementService), i0.ɵɵdirectiveInject(i9.Router)); };
FillcertificationfromComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FillcertificationfromComponent, selectors: [["app-fillcertificationfrom"]], decls: 77, vars: 19, consts: [[1, "certification-form-page"], [1, "container", "certification-form-shell"], [1, "certification-form-header"], [1, "auth-eyebrow"], [1, "certification-form", 3, "formGroup", "ngSubmit"], [1, "form-grid"], [1, "form-field", "training-search-field"], [1, "training-search-control"], ["type", "button", "aria-haspopup", "listbox", 1, "btn", "btn-outline", "btn-small", "training-dropdown-toggle", 3, "click"], [1, "dropdown-icon"], ["class", "training-search-menu", "role", "listbox", 4, "ngIf"], [1, "form-field"], ["type", "text", "formControlName", "name", "maxlength", "200"], ["type", "text", "formControlName", "mobile", "maxlength", "10"], ["type", "email", "formControlName", "email", "maxlength", "200"], ["type", "button", 1, "inline-link", 3, "click"], ["formControlName", "trainerId"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-outline", "btn-small", "training-dropdown-toggle", 3, "click"], ["class", "training-search-menu", 4, "ngIf"], ["type", "number", "formControlName", "days", "min", "1"], ["type", "date", "formControlName", "certificationDate"], [1, "checkbox-field"], ["type", "checkbox", "formControlName", "isComplete"], ["type", "checkbox", "formControlName", "isPaid"], [1, "form-actions"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["role", "listbox", 1, "training-search-menu"], ["type", "text", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelOptions", "ngModelChange", "input"], ["class", "training-search-option", "type", "button", "role", "option", 3, "mousedown", 4, "ngFor", "ngForOf"], ["class", "training-search-empty", 4, "ngIf"], ["type", "button", "role", "option", 1, "training-search-option", 3, "mousedown"], [1, "training-search-empty"], [3, "value"], [1, "training-search-menu"], ["type", "text", "placeholder", "Search company/location", "autocomplete", "off", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["class", "training-search-option", "type", "button", 3, "mousedown", 4, "ngFor", "ngForOf"], ["type", "button", 1, "training-search-option", 3, "mousedown"]], template: function FillcertificationfromComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
        i0.ɵɵtext(4, "Assessment");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "h1");
        i0.ɵɵtext(6, "Fill Exam Form");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "p");
        i0.ɵɵtext(8, " Enter your details to continue to the test. Existing details are loaded automatically for the same email and training. ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(9, "form", 4);
        i0.ɵɵlistener("ngSubmit", function FillcertificationfromComponent_Template_form_ngSubmit_9_listener() { return ctx.submit(); });
        i0.ɵɵelementStart(10, "div", 5)(11, "label", 6);
        i0.ɵɵtext(12, " Training ");
        i0.ɵɵelementStart(13, "div", 7)(14, "button", 8);
        i0.ɵɵlistener("click", function FillcertificationfromComponent_Template_button_click_14_listener() { return ctx.toggleTrainingDropdown(); });
        i0.ɵɵtext(15);
        i0.ɵɵelementStart(16, "span", 9);
        i0.ɵɵtext(17, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(18, FillcertificationfromComponent_div_18_Template, 4, 5, "div", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "small");
        i0.ɵɵtext(20);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(21, "label", 11);
        i0.ɵɵtext(22, "Name ");
        i0.ɵɵelement(23, "input", 12);
        i0.ɵɵelementStart(24, "small");
        i0.ɵɵtext(25);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(26, "label", 11);
        i0.ɵɵtext(27, "Mobile ");
        i0.ɵɵelement(28, "input", 13);
        i0.ɵɵelementStart(29, "small");
        i0.ɵɵtext(30);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(31, "label", 11);
        i0.ɵɵtext(32, "Email ");
        i0.ɵɵelement(33, "input", 14);
        i0.ɵɵelementStart(34, "button", 15);
        i0.ɵɵlistener("click", function FillcertificationfromComponent_Template_button_click_34_listener() { return ctx.findExistingRecord(); });
        i0.ɵɵtext(35, "Load existing details");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "small");
        i0.ɵɵtext(37);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(38, "label", 11);
        i0.ɵɵtext(39, "Trainer Name ");
        i0.ɵɵelementStart(40, "select", 16)(41, "option", 17);
        i0.ɵɵtext(42);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(43, FillcertificationfromComponent_option_43_Template, 2, 2, "option", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "small");
        i0.ɵɵtext(45);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(46, "label", 6);
        i0.ɵɵtext(47, "Company/Location ");
        i0.ɵɵelementStart(48, "div", 7)(49, "button", 19);
        i0.ɵɵlistener("click", function FillcertificationfromComponent_Template_button_click_49_listener() { return ctx.toggleCompanyDropdown(); });
        i0.ɵɵtext(50);
        i0.ɵɵelementStart(51, "span", 9);
        i0.ɵɵtext(52, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(53, FillcertificationfromComponent_div_53_Template, 4, 5, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(54, "small");
        i0.ɵɵtext(55);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(56, "label", 11);
        i0.ɵɵtext(57, "Days ");
        i0.ɵɵelement(58, "input", 21);
        i0.ɵɵelementStart(59, "small");
        i0.ɵɵtext(60);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(61, "label", 11);
        i0.ɵɵtext(62, "Date ");
        i0.ɵɵelement(63, "input", 22);
        i0.ɵɵelementStart(64, "small");
        i0.ɵɵtext(65);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(66, "label", 23);
        i0.ɵɵelement(67, "input", 24);
        i0.ɵɵtext(68, " IsComplete ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(69, "label", 23);
        i0.ɵɵelement(70, "input", 25);
        i0.ɵɵtext(71, " IsPaid ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(72, "div", 26)(73, "button", 27);
        i0.ɵɵtext(74);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(75, "button", 28);
        i0.ɵɵlistener("click", function FillcertificationfromComponent_Template_button_click_75_listener() { return ctx.reset(); });
        i0.ɵɵtext(76, " Reset ");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(5);
        i0.ɵɵattribute("aria-expanded", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.getSelectedTrainingLabel(), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.fieldError("trainingId", "Training"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("name", "Name"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("mobile", "Mobile"));
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.fieldError("email", "Email"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", ctx.isLoadingTrainers ? "Loading trainers..." : "Select Trainer", " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.trainers);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.fieldError("trainerId", "Trainer Name"));
        i0.ɵɵadvance(4);
        i0.ɵɵattribute("aria-expanded", ctx.isCompanyDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isLoadingCompanies ? "Loading companies..." : ctx.getSelectedCompanyLabel(), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isCompanyDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.fieldError("location", "Company/Location"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("days", "Days"));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.fieldError("certificationDate", "Date"));
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("disabled", ctx.isSubmitting);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Submitting..." : "Save & Continue to Test", " ");
    } }, dependencies: [i10.NgForOf, i10.NgIf, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.NgModel, i1.FormGroupDirective, i1.FormControlName], styles: [".certification-form-page[_ngcontent-%COMP%] {\n  padding: 48px 0;\n  background: #f8fafc;\n}\n\n.certification-form-shell[_ngcontent-%COMP%] {\n  max-width: 960px;\n}\n\n.certification-form-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.certification-form-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\n\n.certification-form-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 720px;\n  color: #475569;\n}\n\n.certification-form[_ngcontent-%COMP%] {\n  border: 1px solid rgba(15, 23, 42, 0.1);\n  border-radius: 8px;\n  background: #fff;\n  padding: 24px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 18px;\n}\n\n.form-field[_ngcontent-%COMP%], .checkbox-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  font-weight: 600;\n  color: #111827;\n}\n\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid rgba(15, 23, 42, 0.18);\n  border-radius: 8px;\n  padding: 10px 12px;\n  font: inherit;\n}\n\n.form-field[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  min-height: 1rem;\n  color: #b91c1c;\n  font-weight: 500;\n}\n\n.checkbox-field[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  align-self: center;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 24px;\n}\n\n@media (max-width: 720px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .certification-form[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n}\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow:\n    0 18px 45px rgba(15, 23, 42, 0.18),\n    0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: \"\";\n  transform: rotate(45deg);\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    color 150ms ease,\n    background 150ms ease,\n    transform 150ms ease;\n}\n\n.training-search-option[_ngcontent-%COMP%]:hover, .training-search-option[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FillcertificationfromComponent, [{
        type: Component,
        args: [{ selector: "app-fillcertificationfrom", template: "<section class=\"certification-form-page\">\n  <div class=\"container certification-form-shell\">\n    <div class=\"certification-form-header\">\n      <span class=\"auth-eyebrow\">Assessment</span>\n      <h1>Fill Exam Form</h1>\n      <p>\n        Enter your details to continue to the test. Existing details are loaded\n        automatically for the same email and training.\n      </p>\n    </div>\n\n    <form class=\"certification-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n      <div class=\"form-grid\">\n        <label class=\"form-field training-search-field\">\n          Training\n          <div class=\"training-search-control\">\n            <button\n              class=\"btn btn-outline btn-small training-dropdown-toggle\"\n              type=\"button\"\n              (click)=\"toggleTrainingDropdown()\"\n              aria-haspopup=\"listbox\"\n              [attr.aria-expanded]=\"isTrainingDropdownOpen\"\n            >\n              {{ getSelectedTrainingLabel() }}\n              <span class=\"dropdown-icon\">&#9662;</span>\n            </button>\n            <div\n              class=\"training-search-menu\"\n              *ngIf=\"isTrainingDropdownOpen\"\n              role=\"listbox\"\n            >\n              <input\n                type=\"text\"\n                [(ngModel)]=\"trainingSearch\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                placeholder=\"Search training\"\n                autocomplete=\"off\"\n                (input)=\"onTrainingSearchChange()\"\n              />\n              <button\n                class=\"training-search-option\"\n                type=\"button\"\n                *ngFor=\"let training of filteredTrainingList\"\n                (mousedown)=\"selectTrainingFromDropdown(training)\"\n                role=\"option\"\n              >\n                {{ getTrainingLabel(training) }}\n              </button>\n              <div\n                class=\"training-search-empty\"\n                *ngIf=\"!filteredTrainingList.length\"\n              >\n                No training found\n              </div>\n            </div>\n          </div>\n          <small>{{ fieldError(\"trainingId\", \"Training\") }}</small>\n        </label>\n        <label class=\"form-field\"\n          >Name\n          <input type=\"text\" formControlName=\"name\" maxlength=\"200\" />\n          <small>{{ fieldError(\"name\", \"Name\") }}</small>\n        </label>\n\n        <label class=\"form-field\"\n          >Mobile\n          <input type=\"text\" formControlName=\"mobile\" maxlength=\"10\" />\n          <small>{{ fieldError(\"mobile\", \"Mobile\") }}</small>\n        </label>\n\n        <label class=\"form-field\"\n          >Email\n          <input type=\"email\" formControlName=\"email\" maxlength=\"200\" />\n          <button class=\"inline-link\" type=\"button\" (click)=\"findExistingRecord()\">Load existing details</button>\n          <small>{{ fieldError(\"email\", \"Email\") }}</small>\n        </label>\n\n        <label class=\"form-field\"\n          >Trainer Name\n          <select formControlName=\"trainerId\">\n            <option value=\"\">\n              {{ isLoadingTrainers ? \"Loading trainers...\" : \"Select Trainer\" }}\n            </option>\n            <option\n              *ngFor=\"let trainer of trainers\"\n              [value]=\"trainer.trainerId\"\n            >\n              {{ trainer.name }}\n            </option>\n          </select>\n          <small>{{ fieldError(\"trainerId\", \"Trainer Name\") }}</small>\n        </label>\n\n        <label class=\"form-field training-search-field\">Company/Location\n          <div class=\"training-search-control\">\n            <button class=\"btn btn-outline btn-small training-dropdown-toggle\" type=\"button\"\n              (click)=\"toggleCompanyDropdown()\" [attr.aria-expanded]=\"isCompanyDropdownOpen\">\n              {{ isLoadingCompanies ? \"Loading companies...\" : getSelectedCompanyLabel() }}\n              <span class=\"dropdown-icon\">&#9662;</span>\n            </button>\n            <div class=\"training-search-menu\" *ngIf=\"isCompanyDropdownOpen\">\n              <input type=\"text\" [(ngModel)]=\"companySearch\" [ngModelOptions]=\"{ standalone: true }\"\n                placeholder=\"Search company/location\" autocomplete=\"off\" />\n              <button class=\"training-search-option\" type=\"button\"\n                *ngFor=\"let company of filteredCompanies\" (mousedown)=\"selectCompany(company)\">\n                {{ company.clientName }}\n              </button>\n              <div class=\"training-search-empty\" *ngIf=\"!filteredCompanies.length\">No company found</div>\n            </div>\n          </div>\n          <small>{{ fieldError(\"location\", \"Company/Location\") }}</small>\n        </label>\n\n\n        <label class=\"form-field\"\n          >Days\n          <input type=\"number\" formControlName=\"days\" min=\"1\" />\n          <small>{{ fieldError(\"days\", \"Days\") }}</small>\n        </label>\n        \n        <label class=\"form-field\"\n          >Date\n          <input type=\"date\" formControlName=\"certificationDate\" />\n          <small>{{ fieldError(\"certificationDate\", \"Date\") }}</small>\n        </label>\n\n        <label class=\"checkbox-field\">\n          <input type=\"checkbox\" formControlName=\"isComplete\" />\n          IsComplete\n        </label>\n\n        <label class=\"checkbox-field\">\n          <input type=\"checkbox\" formControlName=\"isPaid\" />\n          IsPaid\n        </label>\n      </div>\n\n      <div class=\"form-actions\">\n        <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"isSubmitting\">\n          {{ isSubmitting ? \"Submitting...\" : \"Save & Continue to Test\" }}\n        </button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"reset()\">\n          Reset\n        </button>\n      </div>\n    </form>\n  </div>\n</section>\n", styles: [".certification-form-page {\n  padding: 48px 0;\n  background: #f8fafc;\n}\n\n.certification-form-shell {\n  max-width: 960px;\n}\n\n.certification-form-header {\n  margin-bottom: 24px;\n}\n\n.certification-form-header h1 {\n  margin: 8px 0;\n}\n\n.certification-form-header p {\n  max-width: 720px;\n  color: #475569;\n}\n\n.certification-form {\n  border: 1px solid rgba(15, 23, 42, 0.1);\n  border-radius: 8px;\n  background: #fff;\n  padding: 24px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 18px;\n}\n\n.form-field,\n.checkbox-field {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  font-weight: 600;\n  color: #111827;\n}\n\n.form-field input,\n.form-field select {\n  min-height: 44px;\n  border: 1px solid rgba(15, 23, 42, 0.18);\n  border-radius: 8px;\n  padding: 10px 12px;\n  font: inherit;\n}\n\n.form-field small {\n  min-height: 1rem;\n  color: #b91c1c;\n  font-weight: 500;\n}\n\n.checkbox-field {\n  flex-direction: row;\n  align-items: center;\n  align-self: center;\n}\n\n.form-actions {\n  display: flex;\n  gap: 12px;\n  margin-top: 24px;\n}\n\n@media (max-width: 720px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .certification-form {\n    padding: 18px;\n  }\n}\n\n.training-search-control {\n  position: relative;\n}\n\n.training-dropdown-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n\n.training-dropdown-toggle .dropdown-icon {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n/* Shared polished training picker */\n.training-search-control {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow:\n    0 18px 45px rgba(15, 23, 42, 0.18),\n    0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: \"\";\n  transform: rotate(45deg);\n}\n\n.training-search-menu input {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n\n.training-search-menu input:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    color 150ms ease,\n    background 150ms ease,\n    transform 150ms ease;\n}\n\n.training-search-option:hover,\n.training-search-option:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu::-webkit-scrollbar-track {\n  background: transparent;\n}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.HttpClient }, { type: i3.DataService }, { type: i4.NotifierService }, { type: i5.TrainerService }, { type: i6.ClientManagementService }, { type: i7.CertificationFormService }, { type: i8.TrainingManagementService }, { type: i9.Router }]; }, null); })();
//# sourceMappingURL=fillcertificationfrom.component.js.map