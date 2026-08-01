import { __awaiter } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import emailjs from '@emailjs/browser';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/site-interactions.service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common/http";
import * as i4 from "../../core/services/data.service";
import * as i5 from "../../core/services/training-management.service";
import * as i6 from "src/app/core/services/notifier.service";
import * as i7 from "@angular/router";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
const _c0 = ["categoryTagsScroller"];
function TrainingComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵtext(1, "Loading training documents...");
    i0.ɵɵelementEnd();
} }
function TrainingComponent_div_67_span_7_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 77);
    i0.ɵɵlistener("click", function TrainingComponent_div_67_span_7_Template_span_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r12); const category_r10 = restoredCtx.$implicit; const ctx_r11 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r11.selectCategory(category_r10.CategoryId)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r10 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("tag-active", ctx_r8.selectedCategoryId === category_r10.CategoryId);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", category_r10.CategoryName, " (", ctx_r8.getCategoryCount(category_r10.CategoryId), ") ");
} }
const _c1 = function (a0, a1, a2) { return { "card-data": a0, "card-dev": a1, "card-design": a2 }; };
const _c2 = function (a0, a1, a2) { return { "data-fill": a0, "dev-fill": a1, "design-fill": a2 }; };
function TrainingComponent_div_67_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 78)(1, "div", 79)(2, "span", 80);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "i", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 82)(6, "h3", 83);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 84);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 85)(11, "span", 86);
    i0.ɵɵelement(12, "i", 87);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14, " | ");
    i0.ɵɵelementStart(15, "span", 86);
    i0.ɵɵelement(16, "i", 88);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 89);
    i0.ɵɵelement(19, "div", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 91)(21, "div", 92)(22, "button", 93);
    i0.ɵɵlistener("click", function TrainingComponent_div_67_div_14_Template_button_click_22_listener() { const restoredCtx = i0.ɵɵrestoreView(_r16); const training_r13 = restoredCtx.$implicit; const ctx_r15 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r15.openInterestedModal(training_r13)); });
    i0.ɵɵelement(23, "i", 94);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Interested");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "button", 95);
    i0.ɵɵlistener("click", function TrainingComponent_div_67_div_14_Template_button_click_26_listener() { const restoredCtx = i0.ɵɵrestoreView(_r16); const training_r13 = restoredCtx.$implicit; const ctx_r17 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r17.onViewPdf(training_r13)); });
    i0.ɵɵelement(27, "i", 96);
    i0.ɵɵelementStart(28, "span");
    i0.ɵɵtext(29, "Read More");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "button", 97);
    i0.ɵɵlistener("click", function TrainingComponent_div_67_div_14_Template_button_click_30_listener() { const restoredCtx = i0.ɵɵrestoreView(_r16); const training_r13 = restoredCtx.$implicit; const ctx_r18 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r18.openTakeTestModal(training_r13)); });
    i0.ɵɵelement(31, "i", 98);
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33, "Challenge your knowledge");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const training_r13 = ctx.$implicit;
    const i_r14 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(9, _c1, i_r14 % 3 === 1, i_r14 % 3 === 0, i_r14 % 3 === 2));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((training_r13.DisplayName || training_r13.TrainingName || "Training Document").replace("Training", ""));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((training_r13.CategoryName || "Training").replace("Training", ""));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(training_r13.TrainingDesc || "Description not available");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", training_r13.Duration * 8, " Hours");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", training_r13.Modules, " Modules");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", 100, "%");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(13, _c2, i_r14 % 3 === 1, i_r14 % 3 === 0, i_r14 % 3 === 2));
} }
function TrainingComponent_div_67_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62)(1, "div", 63)(2, "div", 64)(3, "button", 65);
    i0.ɵɵlistener("click", function TrainingComponent_div_67_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.scrollCategoryTags("left")); });
    i0.ɵɵelement(4, "i", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 67, 68);
    i0.ɵɵtemplate(7, TrainingComponent_div_67_span_7_Template, 2, 4, "span", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 70);
    i0.ɵɵlistener("click", function TrainingComponent_div_67_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r20); const ctx_r21 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r21.scrollCategoryTags("right")); });
    i0.ɵɵelement(9, "i", 71);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 72);
    i0.ɵɵelement(11, "i", 73);
    i0.ɵɵelementStart(12, "input", 74);
    i0.ɵɵlistener("ngModelChange", function TrainingComponent_div_67_Template_input_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r22 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r22.searchText = $event); })("input", function TrainingComponent_div_67_Template_input_input_12_listener() { i0.ɵɵrestoreView(_r20); const ctx_r23 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r23.onSearch()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "main", 75);
    i0.ɵɵtemplate(14, TrainingComponent_div_67_div_14_Template, 34, 17, "div", 76);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r1.CategoryList);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r1.searchText);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredTrainings)("ngForTrackBy", ctx_r1.trackByTraining);
} }
function TrainingComponent_div_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 99);
    i0.ɵɵtext(1, "No training documents available.");
    i0.ɵɵelementEnd();
} }
function TrainingComponent_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵtext(1, "Loading PDF...");
    i0.ɵɵelementEnd();
} }
function TrainingComponent_div_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.pdfErrorMessage);
} }
function TrainingComponent_iframe_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "iframe", 102);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r5.selectedPdfUrl, i0.ɵɵsanitizeResourceUrl);
} }
function TrainingComponent_div_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 103);
} }
// interface TrainingCard {
//   category: string;
//   categoryClass: 'card-dev' | 'card-design' | 'card-data';
//   fillClass: 'dev-fill' | 'design-fill' | 'data-fill';
//   iconClass: string;
//   title: string;
//   description: string;
//   hours: number;
//   modules: number;
//   progress: number;
//   instructor: {
//     name: string;
//     title: string;
//     avatar: string;
export class TrainingComponent {
    constructor(interactions, title, meta, _HttpClient, dataService, trainingService, notifierService, sanitizer, router) {
        this.interactions = interactions;
        this.title = title;
        this.meta = meta;
        this._HttpClient = _HttpClient;
        this.dataService = dataService;
        this.trainingService = trainingService;
        this.notifierService = notifierService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.TrainingList = [];
        this.isLoading = true;
        this.Name = '';
        this.CId = null;
        this.pdfSrc = '';
        this.pdfModalVisible = false;
        this.selectedPdfUrl = null;
        this.selectedTrainingItem = null;
        this.isReadMoreModalOpen = false;
        this.isInterestedModalOpen = false;
        this.isTakeTestModalOpen = false;
        this.isPdfLoading = false;
        this.pdfErrorMessage = '';
        this.Destroy$ = new Subject();
        this.pdfObjectUrl = null;
        this.ismainLoading = false;
        this.isLoggedIn = false;
        this.name = '';
        this.email = '';
        this.TrainingName = '';
        this.mobile = '';
        this.messages = '';
        this.testUserName = '';
        this.testUserEmail = '';
        this.testUserMobile = '';
        this.CategoryList = [];
        this.selectedCategoryId = 0;
        this.searchText = '';
        this.filteredTrainings = []; // Displayed data
        this.SERVICE_ID = 'service_duh8g6f';
        this.TEMPLATE_ID = 'template_f53kvve';
        this.PUBLIC_KEY = 'ZT9MYx-Gi_6z-chnr';
        this.title.setTitle('Training - QLSS Consulting');
        this.meta.updateTag({
            name: 'description',
            content: 'QLSS Business Consulting services, training, operational excellence and business transformation.'
        });
    }
    ngOnInit() {
        this.GetDataFromApi();
    }
    ngAfterViewInit() {
        this.interactions.initPage();
    }
    ngOnDestroy() {
        this.releasePdfObjectUrl();
        this.Destroy$.next();
        this.Destroy$.complete();
    }
    scrollCategoryTags(direction) {
        var _a;
        const scroller = (_a = this.categoryTagsScroller) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if (!scroller) {
            return;
        }
        const scrollAmount = Math.max(220, Math.round(scroller.clientWidth * 0.65));
        scroller.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
    getCategoryCount(CategoryId) {
        if (CategoryId === 0) {
            return this.TrainingList.length;
        }
        return this.TrainingList.filter(x => Number(x.CategoryId) === Number(CategoryId)).length;
    }
    // trainings: TrainingCard[] = [
    //     category: 'Development',
    //     categoryClass: 'card-dev',
    //     fillClass: 'dev-fill',
    //     iconClass: 'fa-solid fa-code',
    //     title: 'Advanced React & State Management',
    //     description: 'Advanced react & state management contents with encoded advanced react and senole descriptions.',
    //     hours: 24,
    //     modules: 12,
    //     progress: 75,
    //     instructor: {
    //       name: 'Sarah Jenkins',
    //       title: 'Title Manager',
    //       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    //     category: 'UI/UX Design',
    //     categoryClass: 'card-design',
    //     fillClass: 'design-fill',
    //     iconClass: 'fa-solid fa-palette',
    //     title: 'UI/UX Design',
    //     description: 'Design the most uptaution of UI/UX design, UI/UX, and create design with model tracelems.',
    //     hours: 24,
    //     modules: 12,
    //     progress: 40,
    //     instructor: {
    //       name: 'Marcus Chen',
    //       title: 'Title',
    //       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
    //     category: 'Data Science',
    //     categoryClass: 'card-data',
    //     fillClass: 'data-fill',
    //     iconClass: 'fa-solid fa-database',
    //     title: 'Data Science',
    //     description: 'Data science concerns and applying for the based experiences and/or analytics and scach altefucture.',
    //     hours: 24,
    //     modules: 12,
    //     progress: 0,
    //     instructor: {
    //       name: 'Dr. Aris Thorne',
    //       title: 'Title Science',
    //       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
    //     category: 'Development',
    //     categoryClass: 'card-dev',
    //     fillClass: 'dev-fill',
    //     iconClass: 'fa-solid fa-code',
    //     title: 'Advanced React & State Management',
    //     description: 'Advanced react & state management contents with encoded advanced react and senole descriptions.',
    //     hours: 24,
    //     modules: 12,
    //     progress: 75,
    //     instructor: {
    //       name: 'Sarah Jenkins',
    //       title: 'Title Manager',
    //       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    //     category: 'UI/UX Design',
    //     categoryClass: 'card-design',
    //     fillClass: 'design-fill',
    //     iconClass: 'fa-solid fa-palette',
    //     title: 'UI/UX Design',
    //     description: 'Design the most uptaution of UI/UX design, UI/UX, and create design with model tracelems.',
    //     hours: 24,
    //     modules: 12,
    //     progress: 40,
    //     instructor: {
    //       name: 'Marcus Chen',
    //       title: 'Title',
    //       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
    //     category: 'Data Science',
    //     categoryClass: 'card-data',
    //     fillClass: 'data-fill',
    //     iconClass: 'fa-solid fa-database',
    //     title: 'Data Science',
    //     description: 'Data science concerns and applying for the based experiences and/or analytics and scach altefucture.',
    //     hours: 24,
    //     modules: 12,
    //     progress: 0,
    //     instructor: {
    //       name: 'Dr. Aris Thorne',
    //       title: 'Title Science',
    //       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
    GetData() {
        alert(1);
        const reqHeader = new HttpHeaders({
            ETag: 'f88dd058fe004909615a64f01be66a7',
            'Content-Type': 'application/json'
        });
        this._HttpClient
            .get('assets/Training.json', { headers: reqHeader, responseType: 'text' })
            .pipe(takeUntil(this.Destroy$))
            .subscribe({
            next: (data) => {
                const decrypted = this.dataService.decrypt(data);
                this.TrainingList = (decrypted === null || decrypted === void 0 ? void 0 : decrypted.Table) || [];
                this.TrainingList = this.TrainingList.sort((a, b) => Number(a.DisplayOrder) - Number(b.DisplayOrder));
                this.filteredTrainings = [...this.TrainingList];
                this.buildCategoryList();
                this.isLoading = false;
            },
            error: () => {
                this.TrainingList = [];
                this.isLoading = false;
            }
        });
    }
    // Future API integration: uncomment this method and call it instead of GetData().
    GetDataFromApi() {
        this.isLoading = true;
        this.trainingService
            .getPaged(1, 100)
            .pipe(takeUntil(this.Destroy$))
            .subscribe({
            next: (response) => {
                this.TrainingList = (response.items || []).map((item) => {
                    var _a, _b, _c;
                    return (Object.assign(Object.assign({}, item), { TrainingId: item.trainingId, TrainingName: item.trainingName, TrainingDesc: item.trainingDesc, DisplayName: item.displayName, Image: item.image || '', DisplayOrder: item.displayOrder, CategoryId: item.categoryId, Duration: item.duration, Modules: item.modules, TopicCovered: item.topicCovered, PreTestId: (_a = item.preTestId) !== null && _a !== void 0 ? _a : null, PostTestId: (_b = item.postTestId) !== null && _b !== void 0 ? _b : null, ChalangeTestId: (_c = item.chalangeTestId) !== null && _c !== void 0 ? _c : null }));
                });
                this.TrainingList.sort((a, b) => Number(a.DisplayOrder) - Number(b.DisplayOrder));
                this.filteredTrainings = [...this.TrainingList];
                // The endpoint returns CategoryId but not CategoryName.
                this.CategoryList = [{ CategoryId: 0, CategoryName: 'All' }];
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load training data.', { status: error.status });
                this.TrainingList = [];
                this.filteredTrainings = [];
                this.isLoading = false;
            }
        });
    }
    /* Create unique CategoryList from TrainingList */
    buildCategoryList() {
        const map = new Map();
        this.TrainingList.forEach(x => {
            const categoryId = Number(x.CategoryId || 0);
            const categoryName = (x.CategoryName || '').trim();
            if (categoryId > 0 && categoryName && !map.has(categoryId)) {
                map.set(categoryId, {
                    CategoryId: categoryId,
                    CategoryName: categoryName
                });
            }
        });
        this.CategoryList = Array.from(map.values());
        this.CategoryList.unshift({
            CategoryId: 0,
            CategoryName: 'All'
        });
    }
    /* Category click filter */
    selectCategory(categoryId) {
        this.searchText = '';
        this.selectedCategoryId = Number(categoryId);
        if (this.selectedCategoryId === 0) {
            this.filteredTrainings = [...this.TrainingList];
            return;
        }
        this.filteredTrainings = this.TrainingList.filter(x => Number(x.CategoryId) === this.selectedCategoryId);
    }
    /* Search filter */
    onSearch() {
        const search = this.searchText.trim().toLowerCase();
        this.selectedCategoryId = 0;
        if (!search) {
            this.filteredTrainings = [...this.TrainingList];
            return;
        }
        this.filteredTrainings = this.TrainingList.filter(x => {
            var _a, _b;
            const trainingName = ((_a = x.TrainingName) !== null && _a !== void 0 ? _a : '').toLowerCase();
            const displayName = ((_b = x.DisplayName) !== null && _b !== void 0 ? _b : '').toLowerCase();
            return trainingName.includes(search) || displayName.includes(search);
        });
    }
    /* Optional: show count beside All */
    get allTrainingCount() {
        var _a;
        return ((_a = this.TrainingList) === null || _a === void 0 ? void 0 : _a.length) || 0;
    }
    //       next: () => {
    //       error: () => {
    onViewPdf(item) {
        var _a;
        this.selectedTrainingItem = item;
        this.Name = item.DisplayName || item.TrainingName || '';
        this.CId = (_a = item.TrainingId) !== null && _a !== void 0 ? _a : null;
        //const fileName = `${item.TrainingName || this.Name}.pdf`;
        this.pdfSrc = `assets/doc/${this.CId}.pdf`;
        this.selectedPdfUrl = null;
        this.pdfErrorMessage = '';
        this.isPdfLoading = true;
        this.isReadMoreModalOpen = true;
        this.pdfModalVisible = true;
        // const pdfRequest$ = this._HttpClient.get(this.pdfSrc, {
        //   responseType: 'blob',
        //   observe: 'response'
        // });
        // Future API integration: comment the request above and uncomment the service request below.
        const pdfRequest$ = this.trainingService.getDocument(this.CId);
        pdfRequest$
            .pipe(takeUntil(this.Destroy$))
            .subscribe({
            next: (res) => {
                const isPdf = res.body &&
                    res.body.type &&
                    res.body.type.toLowerCase().includes('pdf');
                if (res.status === 200 && isPdf) {
                    this.releasePdfObjectUrl();
                    this.pdfObjectUrl = URL.createObjectURL(res.body);
                    // Previous viewer URL fetched the same PDF a second time:
                    // const viewerUrl = `${encodeURI(this.pdfSrc)}#toolbar=0&navpanes=0&scrollbar=1&download=0&print=0`;
                    const viewerUrl = `${this.pdfObjectUrl}#toolbar=0&navpanes=0&scrollbar=1&download=0&print=0`;
                    this.selectedPdfUrl =
                        this.sanitizer.bypassSecurityTrustResourceUrl(viewerUrl);
                }
                else {
                    this.pdfErrorMessage =
                        'PDF file is not available.';
                }
                this.isPdfLoading = false;
            },
            error: (err) => {
                console.error('Failed to load training PDF.', { status: err.status });
                this.pdfErrorMessage =
                    'PDF file is not available.';
                this.isPdfLoading = false;
            }
        });
    }
    openModal() {
        this.isReadMoreModalOpen = true;
        this.pdfModalVisible = true;
    }
    closeModal() {
        this.closeReadMoreModal();
    }
    closeReadMoreModal() {
        this.isReadMoreModalOpen = false;
        this.pdfModalVisible = false;
        this.selectedPdfUrl = null;
        this.pdfErrorMessage = '';
        this.isPdfLoading = false;
        this.releasePdfObjectUrl();
    }
    releasePdfObjectUrl() {
        if (this.pdfObjectUrl) {
            URL.revokeObjectURL(this.pdfObjectUrl);
            this.pdfObjectUrl = null;
        }
    }
    blockPdfActions(event) {
        event.preventDefault();
    }
    blockPdfShortcuts(event) {
        const key = event.key.toLowerCase();
        if ((event.ctrlKey || event.metaKey) && (key === 'p' || key === 's')) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    openInterestedModal(item) {
        this.selectedTrainingItem = item;
        this.TrainingName = item.DisplayName || item.TrainingName || '';
        this.isInterestedModalOpen = true;
    }
    trackByTraining(_index, item) {
        return item.TrainingId || item.TrainingName || item.DisplayName || _index;
    }
    closeInterestedModal() {
        this.isInterestedModalOpen = false;
    }
    openTakeTestModal(item) {
        this.selectedTrainingItem = item;
        this.TrainingName = item.DisplayName || item.TrainingName || 'Test 1';
        this.testUserName = '';
        this.testUserEmail = '';
        this.testUserMobile = '';
        this.isTakeTestModalOpen = true;
    }
    closeTakeTestModal() {
        this.isTakeTestModalOpen = false;
    }
    submitTakeTestForm() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const testName = this.TrainingName || ((_a = this.selectedTrainingItem) === null || _a === void 0 ? void 0 : _a.DisplayName) || ((_b = this.selectedTrainingItem) === null || _b === void 0 ? void 0 : _b.TrainingName) || 'Test 1';
        const username = this.testUserEmail.trim();
        const trainingId = String((_f = (_d = (_c = this.selectedTrainingItem) === null || _c === void 0 ? void 0 : _c.TrainingId) !== null && _d !== void 0 ? _d : (_e = this.selectedTrainingItem) === null || _e === void 0 ? void 0 : _e.trainingId) !== null && _f !== void 0 ? _f : '').trim();
        const testId = String((_k = (_h = (_g = this.selectedTrainingItem) === null || _g === void 0 ? void 0 : _g.ChalangeTestId) !== null && _h !== void 0 ? _h : (_j = this.selectedTrainingItem) === null || _j === void 0 ? void 0 : _j.chalangeTestId) !== null && _k !== void 0 ? _k : '').trim();
        const testType = 'chalange';
        if (!this.testUserName.trim() || !username || !this.testUserMobile.trim()) {
            this.notifierService.warningToastr('Please fill name, email and contact number.', 'Warning!');
            return;
        }
        if (!trainingId || !testId) {
            this.notifierService.warningToastr('Challenge test is not configured for this training.', 'Warning!');
            return;
        }
        sessionStorage.setItem('qlss-start-test', JSON.stringify({
            testName,
            testId,
            testType,
            trainingId,
            username,
            name: this.testUserName.trim(),
            contact: this.testUserMobile.trim()
        }));
        this.isTakeTestModalOpen = false;
        this.router.navigate(['/test']);
    }
    submitInterestedForm() {
        this.Send();
    }
    Send() {
        return __awaiter(this, void 0, void 0, function* () {
            const templateParams = {
                from_name: this.name,
                user_email: this.email,
                phone_number: this.mobile,
                training_name: this.TrainingName,
                subject_line: `I am instrested in  ${this.TrainingName}`,
            };
            try {
                yield emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY);
                this.ismainLoading = false;
                this.closeInterestedModal();
                this.notifierService.successToastr('Thank you for your interest. We will get back to you soon.', 'Success!');
                this.name = '';
                this.email = '';
                this.mobile = '';
                this.messages = '';
                this.TrainingName = '';
            }
            catch (err) {
                this.notifierService.warningToastr('Failed to send message. Please try again.', 'Warning!');
            }
        });
    }
}
TrainingComponent.ɵfac = function TrainingComponent_Factory(t) { return new (t || TrainingComponent)(i0.ɵɵdirectiveInject(i1.SiteInteractionsService), i0.ɵɵdirectiveInject(i2.Title), i0.ɵɵdirectiveInject(i2.Meta), i0.ɵɵdirectiveInject(i3.HttpClient), i0.ɵɵdirectiveInject(i4.DataService), i0.ɵɵdirectiveInject(i5.TrainingManagementService), i0.ɵɵdirectiveInject(i6.NotifierService), i0.ɵɵdirectiveInject(i2.DomSanitizer), i0.ɵɵdirectiveInject(i7.Router)); };
TrainingComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TrainingComponent, selectors: [["app-training"]], viewQuery: function TrainingComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.categoryTagsScroller = _t.first);
    } }, decls: 125, vars: 21, consts: [[1, "training-hero", "training-hero--final"], [1, "training-hero__blob", "training-hero__blob--a"], [1, "training-hero__blob", "training-hero__blob--b"], [1, "training-hero__content"], [1, "training-hero__copy"], [1, "why-eyebrow-nb"], [1, "ey-line"], [1, "hero-title"], [1, "training-hero__sub"], ["aria-label", "Training highlights", 1, "training-hero__features"], [1, "training-hero__feature"], [1, "fa-solid", "fa-user-group"], [1, "fa-solid", "fa-shield-halved"], [1, "fa-solid", "fa-award"], [1, "fa-solid", "fa-chart-line"], ["aria-label", "Training illustration", 1, "training-hero__visual"], [1, "training-hero__orbit", "training-hero__orbit--one"], [1, "training-hero__orbit", "training-hero__orbit--two"], [1, "training-hero__shape", "training-hero__shape--triangle"], [1, "training-hero__shape", "training-hero__shape--arrow"], [1, "training-stat", "training-stat--left"], [1, "fa-solid", "fa-users"], [1, "training-stat", "training-stat--right"], [1, "fa-solid", "fa-star"], ["src", "assets/img/laptop.png", "alt", "Professional attending online training", 1, "training-hero__image"], [1, "training-section", "p-0"], [1, "dashboard-wrapper"], ["class", "training-library__loading", 4, "ngIf"], ["class", "dashboard-container", 4, "ngIf"], ["class", "training-library__empty", 4, "ngIf"], ["id", "readMoreModal", 1, "custom-modal", "custom-modal--pdf"], [1, "custom-modal__overlay", 3, "click"], [1, "custom-modal__box"], [1, "custom-modal__pdf-header"], [1, "custom-modal__pdf-title"], ["tabindex", "0", 1, "custom-modal__pdf-container", 3, "contextmenu", "keydown"], ["class", "custom-modal__pdf-message", 4, "ngIf"], ["class", "custom-modal__pdf-message custom-modal__pdf-message--error", 4, "ngIf"], ["id", "pdfViewer", "title", "Training PDF viewer", 3, "src", 4, "ngIf"], ["class", "custom-modal__pdf-toolbar-cover", "aria-hidden", "true", 4, "ngIf"], ["type", "button", "id", "closeReadMoreModal", 1, "custom-modal__close", 3, "click"], ["id", "takeTestModal", 1, "custom-modal"], ["type", "button", "aria-label", "Close take test modal", 1, "custom-modal__close", 3, "click"], [1, "custom-modal__header"], [1, "custom-modal__subtitle"], ["id", "takeTestForm", 1, "custom-modal__form", 3, "ngSubmit"], [1, "custom-modal__field"], ["type", "text", "name", "testUserName", "placeholder", "Name", "required", "", 3, "ngModel", "ngModelChange"], ["type", "email", "name", "testUserEmail", "placeholder", "Email address", "required", "", 3, "ngModel", "ngModelChange"], ["type", "tel", "name", "testUserMobile", "placeholder", "Contact Number", "required", "", 3, "ngModel", "ngModelChange"], [1, "custom-modal__actions"], ["type", "button", 1, "btn-close", 3, "click"], ["type", "submit", 1, "btn-send"], ["id", "interestedModal", 1, "custom-modal"], ["type", "button", "id", "closeInterestedModal", 1, "custom-modal__close", 3, "click"], ["id", "interestedForm", 1, "custom-modal__form", 3, "ngSubmit"], [1, "custom-modal__row"], ["type", "text", "name", "name", "placeholder", "Name", "required", "", 3, "ngModel", "ngModelChange"], ["type", "email", "name", "email", "placeholder", "Email address", "required", "", 3, "ngModel", "ngModelChange"], ["type", "tel", "name", "mobile", "placeholder", "Mobile Number", "required", "", 3, "ngModel", "ngModelChange"], ["type", "button", "id", "cancelInterestedModal", 1, "btn-close", 3, "click"], [1, "training-library__loading"], [1, "dashboard-container"], [1, "filter-search-container"], [1, "filter-tags-shell"], ["type", "button", "aria-label", "Scroll categories left", 1, "filter-scroll-btn", 3, "click"], [1, "fa-solid", "fa-chevron-left"], [1, "filter-tags"], ["categoryTagsScroller", ""], ["class", "tag", 3, "tag-active", "click", 4, "ngFor", "ngForOf"], ["type", "button", "aria-label", "Scroll categories right", 1, "filter-scroll-btn", 3, "click"], [1, "fa-solid", "fa-chevron-right"], [1, "search-box"], [1, "fa-solid", "fa-magnifying-glass"], ["type", "text", "placeholder", "Search training...", 3, "ngModel", "ngModelChange", "input"], [1, "cards-grid"], ["class", "training-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "tag", 3, "click"], [1, "training-card"], [1, "card-top-banner", 3, "ngClass"], [1, "category-title"], [1, "category-icon", "fa-solid", "fa-palette"], [1, "card-body-content"], [1, "course-title"], [1, "course-description"], [1, "course-meta-metrics"], [1, "meta-item"], [1, "fa-regular", "fa-clock"], [1, "fa-regular", "fa-calendar"], [1, "progress-track-bg"], [1, "progress-track-fill", 3, "ngClass"], [1, "card-footer-panel"], [1, "card-footer-row"], ["type", "button", "aria-label", "Interested", "title", "Interested", 1, "training-action", "training-action--interest", 3, "click"], [1, "fa-regular", "fa-heart"], ["type", "button", 1, "training-action", "training-action--read", 3, "click"], [1, "fa-solid", "fa-file-pdf"], ["type", "button", 1, "training-action", "training-action--test", 3, "click"], [1, "fa-solid", "fa-clipboard-list"], [1, "training-library__empty"], [1, "custom-modal__pdf-message"], [1, "custom-modal__pdf-message", "custom-modal__pdf-message--error"], ["id", "pdfViewer", "title", "Training PDF viewer", 3, "src"], ["aria-hidden", "true", 1, "custom-modal__pdf-toolbar-cover"]], template: function TrainingComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0);
        i0.ɵɵelement(1, "div", 1)(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "div", 5);
        i0.ɵɵelement(6, "span", 6);
        i0.ɵɵtext(7, " Professional Development ");
        i0.ɵɵelement(8, "span", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "h1", 7);
        i0.ɵɵtext(10, " Empower Skills. ");
        i0.ɵɵelement(11, "br");
        i0.ɵɵtext(12, " Elevate ");
        i0.ɵɵelementStart(13, "em");
        i0.ɵɵtext(14, "Excellence");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(15, "p", 8);
        i0.ɵɵtext(16, "Instantly validate the authenticity of issued certifications. Industry-leading training for quality, safety, and business excellence.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 9)(18, "div", 10);
        i0.ɵɵelement(19, "i", 11);
        i0.ɵɵelementStart(20, "div")(21, "strong");
        i0.ɵɵtext(22, "Expert Trainers");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "span");
        i0.ɵɵtext(24, "Industry Specialists");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(25, "div", 10);
        i0.ɵɵelement(26, "i", 12);
        i0.ɵɵelementStart(27, "div")(28, "strong");
        i0.ɵɵtext(29, "Practical Learning");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "span");
        i0.ɵɵtext(31, "Real-world Skills");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(32, "div", 10);
        i0.ɵɵelement(33, "i", 13);
        i0.ɵɵelementStart(34, "div")(35, "strong");
        i0.ɵɵtext(36, "Globally Recognized");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "span");
        i0.ɵɵtext(38, "Best Practices");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(39, "div", 10);
        i0.ɵɵelement(40, "i", 14);
        i0.ɵɵelementStart(41, "div")(42, "strong");
        i0.ɵɵtext(43, "Career Impact");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(44, "span");
        i0.ɵɵtext(45, "Better Opportunities");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(46, "div", 15);
        i0.ɵɵelement(47, "span", 16)(48, "span", 17)(49, "span", 18)(50, "span", 19);
        i0.ɵɵelementStart(51, "div", 20);
        i0.ɵɵelement(52, "i", 21);
        i0.ɵɵelementStart(53, "strong");
        i0.ɵɵtext(54, "2500+");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "span");
        i0.ɵɵtext(56, "Professionals Trained");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(57, "div", 22);
        i0.ɵɵelement(58, "i", 23);
        i0.ɵɵelementStart(59, "strong");
        i0.ɵɵtext(60, "98%");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "span");
        i0.ɵɵtext(62, "Learner Satisfaction");
        i0.ɵɵelementEnd()();
        i0.ɵɵelement(63, "img", 24);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(64, "section", 25)(65, "div", 26);
        i0.ɵɵtemplate(66, TrainingComponent_div_66_Template, 2, 0, "div", 27);
        i0.ɵɵtemplate(67, TrainingComponent_div_67_Template, 15, 4, "div", 28);
        i0.ɵɵtemplate(68, TrainingComponent_div_68_Template, 2, 0, "div", 29);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(69, "div", 30)(70, "div", 31);
        i0.ɵɵlistener("click", function TrainingComponent_Template_div_click_70_listener() { return ctx.closeReadMoreModal(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "div", 32)(72, "div", 33)(73, "h2", 34);
        i0.ɵɵtext(74);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(75, "div", 35);
        i0.ɵɵlistener("contextmenu", function TrainingComponent_Template_div_contextmenu_75_listener($event) { return ctx.blockPdfActions($event); })("keydown", function TrainingComponent_Template_div_keydown_75_listener($event) { return ctx.blockPdfShortcuts($event); });
        i0.ɵɵtemplate(76, TrainingComponent_div_76_Template, 2, 0, "div", 36);
        i0.ɵɵtemplate(77, TrainingComponent_div_77_Template, 2, 1, "div", 37);
        i0.ɵɵtemplate(78, TrainingComponent_iframe_78_Template, 1, 1, "iframe", 38);
        i0.ɵɵtemplate(79, TrainingComponent_div_79_Template, 1, 0, "div", 39);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(80, "button", 40);
        i0.ɵɵlistener("click", function TrainingComponent_Template_button_click_80_listener() { return ctx.closeReadMoreModal(); });
        i0.ɵɵtext(81, "\u00D7");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(82, "div", 41)(83, "div", 31);
        i0.ɵɵlistener("click", function TrainingComponent_Template_div_click_83_listener() { return ctx.closeTakeTestModal(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(84, "div", 32)(85, "button", 42);
        i0.ɵɵlistener("click", function TrainingComponent_Template_button_click_85_listener() { return ctx.closeTakeTestModal(); });
        i0.ɵɵtext(86, "\u00D7");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(87, "div", 43)(88, "h2");
        i0.ɵɵtext(89, "Start Test");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(90, "p", 44);
        i0.ɵɵtext(91);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(92, "form", 45);
        i0.ɵɵlistener("ngSubmit", function TrainingComponent_Template_form_ngSubmit_92_listener() { return ctx.submitTakeTestForm(); });
        i0.ɵɵelementStart(93, "div", 46)(94, "input", 47);
        i0.ɵɵlistener("ngModelChange", function TrainingComponent_Template_input_ngModelChange_94_listener($event) { return ctx.testUserName = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(95, "div", 46)(96, "input", 48);
        i0.ɵɵlistener("ngModelChange", function TrainingComponent_Template_input_ngModelChange_96_listener($event) { return ctx.testUserEmail = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(97, "div", 46)(98, "input", 49);
        i0.ɵɵlistener("ngModelChange", function TrainingComponent_Template_input_ngModelChange_98_listener($event) { return ctx.testUserMobile = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(99, "div", 50)(100, "button", 51);
        i0.ɵɵlistener("click", function TrainingComponent_Template_button_click_100_listener() { return ctx.closeTakeTestModal(); });
        i0.ɵɵtext(101, "Cancel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(102, "button", 52);
        i0.ɵɵtext(103, "Start Test");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(104, "div", 53)(105, "div", 31);
        i0.ɵɵlistener("click", function TrainingComponent_Template_div_click_105_listener() { return ctx.closeInterestedModal(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(106, "div", 32)(107, "button", 54);
        i0.ɵɵlistener("click", function TrainingComponent_Template_button_click_107_listener() { return ctx.closeInterestedModal(); });
        i0.ɵɵtext(108, "\u00D7");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(109, "div", 43)(110, "h2");
        i0.ɵɵtext(111, "Please provide your details");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(112, "form", 55);
        i0.ɵɵlistener("ngSubmit", function TrainingComponent_Template_form_ngSubmit_112_listener() { return ctx.submitInterestedForm(); });
        i0.ɵɵelementStart(113, "div", 56)(114, "div", 46)(115, "input", 57);
        i0.ɵɵlistener("ngModelChange", function TrainingComponent_Template_input_ngModelChange_115_listener($event) { return ctx.name = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(116, "div", 46)(117, "input", 58);
        i0.ɵɵlistener("ngModelChange", function TrainingComponent_Template_input_ngModelChange_117_listener($event) { return ctx.email = $event; });
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(118, "div", 46)(119, "input", 59);
        i0.ɵɵlistener("ngModelChange", function TrainingComponent_Template_input_ngModelChange_119_listener($event) { return ctx.mobile = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(120, "div", 50)(121, "button", 60);
        i0.ɵɵlistener("click", function TrainingComponent_Template_button_click_121_listener() { return ctx.closeInterestedModal(); });
        i0.ɵɵtext(122, "Close");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(123, "button", 52);
        i0.ɵɵtext(124, "Send Mail");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(66);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.TrainingList.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.TrainingList.length);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("active", ctx.isReadMoreModalOpen);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.Name || (ctx.selectedTrainingItem == null ? null : ctx.selectedTrainingItem.DisplayName) || (ctx.selectedTrainingItem == null ? null : ctx.selectedTrainingItem.TrainingName) || "Training PDF");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isPdfLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isPdfLoading && ctx.pdfErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedPdfUrl && !ctx.isPdfLoading && !ctx.pdfErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedPdfUrl && !ctx.pdfErrorMessage);
        i0.ɵɵadvance(3);
        i0.ɵɵclassProp("active", ctx.isTakeTestModalOpen);
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.TrainingName || (ctx.selectedTrainingItem == null ? null : ctx.selectedTrainingItem.DisplayName) || (ctx.selectedTrainingItem == null ? null : ctx.selectedTrainingItem.TrainingName));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testUserName);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.testUserEmail);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.testUserMobile);
        i0.ɵɵadvance(6);
        i0.ɵɵclassProp("active", ctx.isInterestedModalOpen);
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("ngModel", ctx.name);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.email);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.mobile);
    } }, dependencies: [i8.NgClass, i8.NgForOf, i8.NgIf, i9.ɵNgNoValidate, i9.DefaultValueAccessor, i9.NgControlStatus, i9.NgControlStatusGroup, i9.RequiredValidator, i9.NgModel, i9.NgForm], styles: ["[_nghost-%COMP%] { display: block; }\n\n@keyframes training-svc-shimmer {\n  0% { background-position: -200% center; }\n  100% { background-position: 200% center; }\n}\n\n@keyframes training-svc-blob {\n  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate3d(0, 0, 0) scale(1); }\n  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate3d(18px, -14px, 0) scale(1.06); }\n}\n\n.training-hero--final[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 430px;\n  padding:0;\n  padding-top: 3rem;\n  overflow: hidden;\n  text-align: left;\n  background:\n    radial-gradient(circle at 82% 50%, rgba(86, 133, 244, .32) 0 15%, rgba(86, 133, 244, .16) 16% 30%, transparent 31%),\n    radial-gradient(circle, rgba(43, 123, 255, .075) 1px, transparent 1px),\n    linear-gradient(107deg, #fff 0 49%, #edf5ff 49.2% 100%);\n  background-size: auto, 36px 36px, auto;\n  // border: 1px solid rgba(188, 210, 250, .9);\n  border-radius: 16px;\n  box-shadow: 0 18px 55px rgba(24, 50, 100, .09);\n  width: min(calc(100% - 12px), 1800px);\n  margin: 6px auto 0;\n}\n\n\n.training-hero__blob[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a[_ngcontent-%COMP%] {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b[_ngcontent-%COMP%] {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1.08fr) minmax(420px, .92fr);\n  gap: 28px;\n  min-height: 430px;\n  padding: 70px 100px 26px;\n  align-items: center;\n}\n\n.training-hero__content[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  z-index: -1;\n  right: 70px;\n  top: 28px;\n  width: 490px;\n  height: 490px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, rgba(198,216,255,.32), rgba(74,126,238,.48));\n}\n\n.training-hero__copy[_ngcontent-%COMP%] { max-width: 690px; min-width: 0; }\n.training-hero__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n  color: #075eff;\n  font-size: 11.5px;\n  font-weight: 800;\n  letter-spacing: .14em;\n  line-height: 1;\n  text-transform: uppercase;\n}\n.training-hero__eyebrow[_ngcontent-%COMP%]   .ey-line[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 24px;\n  height: 1.5px;\n  flex-shrink: 0;\n  background: linear-gradient(90deg, #0b3d91, #075eff, #0b3d91);\n  background-size: 200% auto;\n  animation: training-svc-shimmer 2.5s linear infinite;\n}\n.training-hero--final[_ngcontent-%COMP%]   .training-hero__title[_ngcontent-%COMP%] { font-size: clamp(2rem, 3.8vw, 3.1rem);\n    font-weight: 800;\n    color: var(--text-dark);\n    line-height: 1.15;\n    letter-spacing: -0.03em;\n    margin-bottom: 20px;\n    opacity: 0;\n    animation: svc-fade-left 0.65s 0.15s ease forwards;}\n.training-hero--final[_ngcontent-%COMP%]   .training-hero__accent[_ngcontent-%COMP%] { color: #075eff; }\n.training-hero--final[_ngcontent-%COMP%]   .training-hero__sub[_ngcontent-%COMP%] { max-width: 610px; margin: 0; color: #52608d; font-size: 17px; line-height: 1.58; }\n\n.training-hero__features[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 12px 14px;\n  width: 100%;\n  max-width: 100%;\n  margin-top: 32px;\n  align-items: start;\n  overflow: visible;\n}\n\n.training-hero__feature[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  min-width: 0;\n  padding: 0;\n  overflow: visible;\n}\n\n.training-hero__feature[_ngcontent-%COMP%]:first-child { padding-left: 0; }\n.training-hero__feature[_ngcontent-%COMP%]:last-child { padding-right: 0; border-right: 0; }\n.training-hero__feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-grid;\n  width: 50px;\n  height: 50px;\n  place-items: center;\n  border: 1px solid;\n  border-radius: 10px;\n  font-size: 21px;\n  flex-shrink: 0;\n  box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 10px 22px rgba(24,50,100,.06);\n}\n.training-hero__feature[_ngcontent-%COMP%]:nth-child(1)   i[_ngcontent-%COMP%] { color: #075eff; border-color: #cbdcff; background: linear-gradient(145deg, #eef4ff, #fff); }\n.training-hero__feature[_ngcontent-%COMP%]:nth-child(2)   i[_ngcontent-%COMP%] { color: #20b746; border-color: #caefd4; background: linear-gradient(145deg, #effcf3, #fff); }\n.training-hero__feature[_ngcontent-%COMP%]:nth-child(3)   i[_ngcontent-%COMP%] { color: #6a38f0; border-color: #e0d5ff; background: linear-gradient(145deg, #f4efff, #fff); }\n.training-hero__feature[_ngcontent-%COMP%]:nth-child(4)   i[_ngcontent-%COMP%] { color: #ff6b1a; border-color: #ffe0ce; background: linear-gradient(145deg, #fff4ed, #fff); }\n.training-hero__feature[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: visible;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.training-hero__feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .training-hero__feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow: visible;\n  white-space: normal;\n  word-break: break-word;\n  line-height: 1.25;\n}\n\n.training-hero__feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #071747;\n  font-size: clamp(11px, 1.05vw, 12px);\n  font-weight: 900;\n}\n\n.training-hero__feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #4f5d8a;\n  font-size: clamp(9.5px, .95vw, 10.5px);\n  font-weight: 700;\n}\n\n@media (max-width: 1280px) {\n  .training-hero__features[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    max-width: 720px;\n  }\n}\n\n@media (max-width: 640px) {\n  .training-hero__features[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n    max-width: 100%;\n  }\n\n  .training-hero__feature[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n\n  .training-hero__feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n    font-size: 18px;\n  }\n}\n\n.training-hero__visual[_ngcontent-%COMP%] { position: relative; min-height: 350px; overflow: visible; }\n.training-hero__image[_ngcontent-%COMP%] { position: absolute; right: 86px; bottom: 8px; z-index: 2; display: block; width: min(430px, 76%); max-height: 330px; height: auto; object-fit: contain; filter: drop-shadow(0 20px 28px rgba(29,78,216,.16));opacity: .8; }\n.training-hero__orbit[_ngcontent-%COMP%], .training-hero__shape[_ngcontent-%COMP%] { position: absolute; pointer-events: none; }\n.training-hero__orbit[_ngcontent-%COMP%] { border: 1px solid rgba(7,94,255,.34); }\n.training-hero__orbit--one[_ngcontent-%COMP%] { right: 72px; top: 28px; width: 220px; height: 220px; border-radius: 50%; border-color: rgba(16,190,140,.58); }\n.training-hero__orbit--two[_ngcontent-%COMP%] { left: 46px; bottom: 30px; width: 170px; height: 170px; border-style: dashed; border-radius: 50%; border-left-color: transparent; border-bottom-color: transparent; }\n.training-hero__shape--triangle[_ngcontent-%COMP%] { left: -42px; top: 98px; width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-bottom: 24px solid #075eff; }\n.training-hero__shape--arrow[_ngcontent-%COMP%] { right: -10px; top: 74px; width: 118px; height: 118px; border-right: 1px dashed #075eff; border-bottom: 1px dashed #075eff; border-radius: 0 0 95px 0; transform: rotate(-24deg); opacity: .65; }\n\n.training-stat[_ngcontent-%COMP%] { position: absolute; z-index: 3; display: grid; gap: 6px; width: 132px; padding: 16px; border-radius: 13px; background: rgba(255,255,255,.94); box-shadow: 0 22px 42px rgba(23,51,111,.12);animation: heroBubbleFloat var(--dur, 6s) ease-in-out infinite;animation-delay: var(--delay, 0s); }\n.training-stat[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #5a28ff; font-size: 26px; }\n.training-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #3f26d8; font-size: 27px; line-height: 1; }\n.training-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #45537e; font-size: 12.5px; line-height: 1.35; }\n.training-stat--left[_ngcontent-%COMP%] { left: 10px; top: 14px; }\n.training-stat--right[_ngcontent-%COMP%] { right: 28px; top: 146px; }\n.training-stat--right[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #2fc34a; }\n.training-stat--right[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #071747; }\n\n\n\n\n.dashboard-container[_ngcontent-%COMP%] { padding-top: 34px; }\n.filter-search-container[_ngcontent-%COMP%] {\n  align-items: center;\n  gap: 18px;\n  margin-bottom: 34px;\n  padding: 0 2px;\n}\n.filter-tags-shell[_ngcontent-%COMP%] {\n  grid-template-columns: 35px minmax(0, 1fr) 35px;\n  gap: 10px;\n}\n.filter-scroll-btn[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n  border-radius: 10px;\n  border-color: #d8e3f8;\n  color: #071747;\n  background: #fff;\n  box-shadow: 0 10px 22px rgba(24,50,100,.06);\n}\n.filter-scroll-btn[_ngcontent-%COMP%]:hover {\n  background: #075eff;\n  border-color: #075eff;\n  color: #fff;\n}\n.filter-tags[_ngcontent-%COMP%] { gap: 12px; padding: 1px 2px 0px; }\n.tag[_ngcontent-%COMP%] {\n  height: 35px;\n  display: inline-flex;\n  align-items: center;\n  border: 1px solid #d8e3f8;\n  border-radius: 10px;\n  background: #fff;\n  color: #071747;\n  box-shadow: 0 10px 22px rgba(24,50,100,.04);\n}\n.tag-active[_ngcontent-%COMP%] {\n  border-color: #075eff;\n  background: #075eff;\n  color: #fff;\n  box-shadow: 0 12px 22px rgba(7,94,255,.18);\n}\n.search-box[_ngcontent-%COMP%] { width: 300px; }\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  height: 35px;\n  border-color: #cad8f2;\n  border-radius: 10px;\n  color: #071747;\n  font-weight: 700;\n  box-shadow: 0 10px 22px rgba(24,50,100,.04);\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #075eff;\n  box-shadow: 0 0 0 4px rgba(7,94,255,.1);\n}\n\n.training-card[_ngcontent-%COMP%] {\n  border-width: 1px;\n  border-color: #d9e5fa;\n  box-shadow: 0 14px 34px rgba(24,50,100,.08);\n}\n.training-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 22px 46px rgba(24,50,100,.13);\n}\n\n.card-footer-panel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n  margin-top: auto;\n}\n\n.card-footer-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  width: 100%;\n}\n\n.training-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex: 1 1 0;\n  min-width: 0;\n  min-height: 44px;\n  padding: 10px 12px;\n  border: 1px solid #d9e5fa;\n  border-radius: 10px;\n  background: #ffffff;\n  color: #1547b8;\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;\n  box-shadow: 0 8px 18px rgba(24,50,100,.06);\n}\n\n.training-action[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 24px rgba(24,50,100,.12);\n}\n\n.training-action--interest[_ngcontent-%COMP%] {\n  background: #f7faff;\n}\n\n.training-action--read[_ngcontent-%COMP%] {\n  background: #eef5ff;\n}\n\n.training-action--test[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #1d5df5 0%, #3f83ff 100%);\n  color: #ffffff;\n  border-color: transparent;\n  box-shadow: 0 12px 24px rgba(29, 93, 245, 0.2);\n}\n\n@media (max-width: 768px) {\n  .card-footer-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 576px) {\n  .training-action[_ngcontent-%COMP%] {\n    min-height: 35px;\n    font-size: 11px;\n    padding: 10px;\n  }\n}\n\n.custom-modal--pdf[_ngcontent-%COMP%]   .custom-modal__box[_ngcontent-%COMP%] { width: 90vw; max-width: 1100px; height: 85vh; padding: 0; overflow: hidden; }\n.custom-modal__pdf-container[_ngcontent-%COMP%] { width: 100%; height: calc(85vh - 80px); overflow: hidden; position: relative; }\n.custom-modal__pdf-container[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%], #pdfViewer[_ngcontent-%COMP%] { width: 100% !important; height: 100% !important; min-height: 70vh; border: 0; display: block; }\n\n@media (max-width: 1500px) {\n  \n.training-hero__blob[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a[_ngcontent-%COMP%] {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b[_ngcontent-%COMP%] {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content[_ngcontent-%COMP%] { padding-inline: 70px; grid-template-columns: minmax(0, 1fr) minmax(390px, .9fr); }\n  .training-hero__copy[_ngcontent-%COMP%], .training-hero__features[_ngcontent-%COMP%] { max-width: 620px; }\n  .training-hero--final[_ngcontent-%COMP%]   .training-hero__title[_ngcontent-%COMP%] { font-size: clamp(45px, 3.65vw, 56px); }\n  .training-hero__image[_ngcontent-%COMP%] { right: 64px; width: min(390px, 74%); max-height: 310px; opacity: .8; }\n  .training-stat--right[_ngcontent-%COMP%] { right: 14px; }\n  .training-hero__feature[_ngcontent-%COMP%] { grid-template-columns: 44px minmax(0, 1fr); padding-inline: 10px; }\n  .training-hero__feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 44px; height: 44px; font-size: 19px; }\n  .training-hero__feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 9.5px; }\n  .training-hero__feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 8.5px; }\n}\n\n@media (max-width: 1280px) {\n  .training-hero--final[_ngcontent-%COMP%] { min-height: auto; }\n  \n.training-hero__blob[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a[_ngcontent-%COMP%] {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b[_ngcontent-%COMP%] {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content[_ngcontent-%COMP%] { grid-template-columns: 1fr; min-height: auto; padding: 30px; }\n  .training-hero__copy[_ngcontent-%COMP%], .training-hero--final[_ngcontent-%COMP%]   .training-hero__title[_ngcontent-%COMP%], .training-hero--final[_ngcontent-%COMP%]   .training-hero__sub[_ngcontent-%COMP%] { max-width: 100%; }\n  .training-hero__visual[_ngcontent-%COMP%] { min-height: 340px; }\n  .training-hero__image[_ngcontent-%COMP%] { right: 50%; bottom: 4px; width: min(390px, 76%); max-height: 300px; transform: translateX(50%);opacity: .8; }\n  .training-hero__content[_ngcontent-%COMP%]::before { right: 50%; top: auto; bottom: -70px; transform: translateX(50%); }\n  .training-hero__features[_ngcontent-%COMP%] { grid-template-columns: repeat(2, minmax(180px, 1fr)); max-width: 560px; overflow: visible; row-gap: 14px; }\n  .training-hero__feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 11px; }\n  .training-hero__feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 10.5px; }\n  .filter-search-container[_ngcontent-%COMP%] { flex-direction: column-reverse; align-items: stretch; }\n  .search-box[_ngcontent-%COMP%] { width: 100%; }\n}\n\n@media (max-width: 860px) {\n  .training-hero--final[_ngcontent-%COMP%] { width: 100%; margin: 0 0 16px; border-radius: 0; }\n  \n.training-hero__blob[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a[_ngcontent-%COMP%] {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b[_ngcontent-%COMP%] {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content[_ngcontent-%COMP%] { padding: 26px 18px 20px; }\n  .training-hero--final[_ngcontent-%COMP%]   .training-hero__title[_ngcontent-%COMP%] { font-size: clamp(40px, 8vw, 48px); }\n  .training-hero__visual[_ngcontent-%COMP%] { min-height: 320px; overflow: hidden; }\n  .training-hero__image[_ngcontent-%COMP%] { bottom: 6px; width: min(330px, 82%); max-height: 250px;opacity: .8; }\n  .training-stat--left[_ngcontent-%COMP%] { left: 0; top: 12px; }\n  .training-stat--right[_ngcontent-%COMP%] { right: 0; top: 118px; }\n  .training-hero__features[_ngcontent-%COMP%] { grid-template-columns: 1fr; max-width: 100%; }\n  .training-hero__feature[_ngcontent-%COMP%] { grid-template-columns: 52px minmax(0, 1fr); padding-inline: 0; }\n  .training-hero__feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 52px; height: 52px; }\n  .training-hero__feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .training-hero__feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 11px; white-space: normal; }\n}\n\n@media (max-width: 560px) {\n  .training-hero--final[_ngcontent-%COMP%]   .training-hero__title[_ngcontent-%COMP%] { font-size: 40px; line-height: 1.04; }\n  .training-hero__image[_ngcontent-%COMP%] { width: min(300px, 86%);opacity: .8; }\n  .filter-tags-shell[_ngcontent-%COMP%] { grid-template-columns: 38px minmax(0, 1fr) 38px; gap: 8px; }\n  .filter-scroll-btn[_ngcontent-%COMP%] { width: 38px; height: 40px; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrainingComponent, [{
        type: Component,
        args: [{ selector: 'app-training', template: "<section class=\"training-hero training-hero--final\">\n  <div class=\"training-hero__blob training-hero__blob--a\"></div>\n  <div class=\"training-hero__blob training-hero__blob--b\"></div>\n  <div class=\"training-hero__content\">\n    <div class=\"training-hero__copy\">\n      <div class=\"why-eyebrow-nb\">\n              <span class=\"ey-line \"></span>\n               Professional Development\n              <span class=\"ey-line\"></span>\n      </div>\n      <h1 class=\"hero-title\">\n              Empower Skills. <br />\n              Elevate <em>Excellence</em>\n      </h1>\n      <!-- <h1 class=\"training-hero__title\" id=\"training-hero-title\">Empower Skills. Elevate <span class=\"training-hero__accent\"><em>Excellence</em>.</span></h1> -->\n      <p class=\"training-hero__sub\">Instantly validate the authenticity of issued certifications.\n          Industry-leading training for quality, safety, and business excellence.</p>\n\n      <div class=\"training-hero__features\" aria-label=\"Training highlights\">\n        <div class=\"training-hero__feature\"><i class=\"fa-solid fa-user-group\"></i><div><strong>Expert Trainers</strong><span>Industry Specialists</span></div></div>\n        <div class=\"training-hero__feature\"><i class=\"fa-solid fa-shield-halved\"></i><div><strong>Practical Learning</strong><span>Real-world Skills</span></div></div>\n        <div class=\"training-hero__feature\"><i class=\"fa-solid fa-award\"></i><div><strong>Globally Recognized</strong><span>Best Practices</span></div></div>\n        <div class=\"training-hero__feature\"><i class=\"fa-solid fa-chart-line\"></i><div><strong>Career Impact</strong><span>Better Opportunities</span></div></div>\n      </div>\n    </div>\n\n    <div class=\"training-hero__visual\" aria-label=\"Training illustration\">\n      <span class=\"training-hero__orbit training-hero__orbit--one\"></span>\n      <span class=\"training-hero__orbit training-hero__orbit--two\"></span>\n      <span class=\"training-hero__shape training-hero__shape--triangle\"></span>\n      <span class=\"training-hero__shape training-hero__shape--arrow\"></span>\n      <div class=\"training-stat training-stat--left\"><i class=\"fa-solid fa-users\"></i><strong>2500+</strong><span>Professionals Trained</span></div>\n      <div class=\"training-stat training-stat--right\"><i class=\"fa-solid fa-star\"></i><strong>98%</strong><span>Learner Satisfaction</span></div>\n      <img src=\"assets/img/laptop.png\" alt=\"Professional attending online training\" class=\"training-hero__image\" />\n    </div>\n  </div>\n</section>\n\n<section class=\"training-section p-0\">\n  <div class=\"dashboard-wrapper\">\n    <div *ngIf=\"isLoading\" class=\"training-library__loading\">Loading training documents...</div>\n\n    <div *ngIf=\"!isLoading && TrainingList.length\" class=\"dashboard-container\">\n      <div class=\"filter-search-container\">\n        <div class=\"filter-tags-shell\">\n          <button class=\"filter-scroll-btn\" type=\"button\" aria-label=\"Scroll categories left\" (click)=\"scrollCategoryTags('left')\"><i class=\"fa-solid fa-chevron-left\"></i></button>\n          <div class=\"filter-tags\" #categoryTagsScroller>\n            <span class=\"tag\" *ngFor=\"let category of CategoryList\" [class.tag-active]=\"selectedCategoryId === category.CategoryId\" (click)=\"selectCategory(category.CategoryId)\">\n              {{ category.CategoryName }} ({{ getCategoryCount(category.CategoryId) }})\n            </span>\n          </div>\n          <button class=\"filter-scroll-btn\" type=\"button\" aria-label=\"Scroll categories right\" (click)=\"scrollCategoryTags('right')\"><i class=\"fa-solid fa-chevron-right\"></i></button>\n        </div>\n\n        <div class=\"search-box\">\n          <i class=\"fa-solid fa-magnifying-glass\"></i>\n          <input type=\"text\" placeholder=\"Search training...\" [(ngModel)]=\"searchText\" (input)=\"onSearch()\" />\n        </div>\n      </div>\n\n      <main class=\"cards-grid\">\n        <div class=\"training-card\" *ngFor=\"let training of filteredTrainings; trackBy: trackByTraining; index as i\">\n          <div class=\"card-top-banner\" [ngClass]=\"{ 'card-data': i % 3 === 1, 'card-dev': i % 3 === 0, 'card-design': i % 3 === 2 }\">\n            <span class=\"category-title\">{{ (training.DisplayName || training.TrainingName || 'Training Document').replace('Training', '') }}</span>\n            <i class=\"category-icon fa-solid fa-palette\"></i>\n          </div>\n\n          <div class=\"card-body-content\">\n            <h3 class=\"course-title\">{{ (training.CategoryName || 'Training').replace('Training', '') }}</h3>\n            <p class=\"course-description\">{{ training.TrainingDesc || 'Description not available' }}</p>\n\n            <div class=\"course-meta-metrics\">\n              <span class=\"meta-item\"><i class=\"fa-regular fa-clock\"></i> {{ training.Duration * 8 }} Hours</span> |\n              <span class=\"meta-item\"><i class=\"fa-regular fa-calendar\"></i> {{ training.Modules }} Modules</span>\n            </div>\n\n            <div class=\"progress-track-bg\"><div class=\"progress-track-fill\" [ngClass]=\"{ 'data-fill': i % 3 === 1, 'dev-fill': i % 3 === 0, 'design-fill': i % 3 === 2 }\" [style.width.%]=\"100\"></div></div>\n\n            <div class=\"card-footer-panel\">\n              <div class=\"card-footer-row\">\n                <button type=\"button\" class=\"training-action training-action--interest\" aria-label=\"Interested\" title=\"Interested\" (click)=\"openInterestedModal(training)\">\n                  <i class=\"fa-regular fa-heart\"></i>\n                  <span>Interested</span>\n                </button>\n\n                <button type=\"button\" class=\"training-action training-action--read\" (click)=\"onViewPdf(training)\">\n                  <i class=\"fa-solid fa-file-pdf\"></i>\n                  <span>Read More</span>\n                </button>\n              </div>\n\n              <button type=\"button\" class=\"training-action training-action--test\" (click)=\"openTakeTestModal(training)\">\n                <i class=\"fa-solid fa-clipboard-list\"></i>\n                <span>Challenge your knowledge</span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </main>\n    </div>\n\n    <div *ngIf=\"!isLoading && !TrainingList.length\" class=\"training-library__empty\">No training documents available.</div>\n  </div>\n</section>\n\n<div class=\"custom-modal custom-modal--pdf\" id=\"readMoreModal\" [class.active]=\"isReadMoreModalOpen\">\n  <div class=\"custom-modal__overlay\" (click)=\"closeReadMoreModal()\"></div>\n  <div class=\"custom-modal__box\">\n    <div class=\"custom-modal__pdf-header\"><h2 class=\"custom-modal__pdf-title\">{{ Name || selectedTrainingItem?.DisplayName || selectedTrainingItem?.TrainingName || 'Training PDF' }}</h2></div>\n    <div class=\"custom-modal__pdf-container\" tabindex=\"0\" (contextmenu)=\"blockPdfActions($event)\" (keydown)=\"blockPdfShortcuts($event)\">\n      <div *ngIf=\"isPdfLoading\" class=\"custom-modal__pdf-message\">Loading PDF...</div>\n      <div *ngIf=\"!isPdfLoading && pdfErrorMessage\" class=\"custom-modal__pdf-message custom-modal__pdf-message--error\">{{ pdfErrorMessage }}</div>\n      <iframe *ngIf=\"selectedPdfUrl && !isPdfLoading && !pdfErrorMessage\" id=\"pdfViewer\" [src]=\"selectedPdfUrl\" title=\"Training PDF viewer\"></iframe>\n      <div *ngIf=\"selectedPdfUrl && !pdfErrorMessage\" class=\"custom-modal__pdf-toolbar-cover\" aria-hidden=\"true\"></div>\n    </div>\n    <button type=\"button\" class=\"custom-modal__close\" id=\"closeReadMoreModal\" (click)=\"closeReadMoreModal()\">&times;</button>\n  </div>\n</div>\n\n<div class=\"custom-modal\" id=\"takeTestModal\" [class.active]=\"isTakeTestModalOpen\">\n  <div class=\"custom-modal__overlay\" (click)=\"closeTakeTestModal()\"></div>\n  <div class=\"custom-modal__box\">\n    <button type=\"button\" class=\"custom-modal__close\" aria-label=\"Close take test modal\" (click)=\"closeTakeTestModal()\">&times;</button>\n    <div class=\"custom-modal__header\"><h2>Start Test</h2><p class=\"custom-modal__subtitle\">{{ TrainingName || selectedTrainingItem?.DisplayName || selectedTrainingItem?.TrainingName }}</p></div>\n    <form class=\"custom-modal__form\" id=\"takeTestForm\" (ngSubmit)=\"submitTakeTestForm()\">\n      <div class=\"custom-modal__field\"><input type=\"text\" name=\"testUserName\" placeholder=\"Name\" [(ngModel)]=\"testUserName\" required /></div>\n      <div class=\"custom-modal__field\"><input type=\"email\" name=\"testUserEmail\" placeholder=\"Email address\" [(ngModel)]=\"testUserEmail\" required /></div>\n      <div class=\"custom-modal__field\"><input type=\"tel\" name=\"testUserMobile\" placeholder=\"Contact Number\" [(ngModel)]=\"testUserMobile\" required /></div>\n      <div class=\"custom-modal__actions\"><button type=\"button\" class=\"btn-close\" (click)=\"closeTakeTestModal()\">Cancel</button><button type=\"submit\" class=\"btn-send\">Start Test</button></div>\n    </form>\n  </div>\n</div>\n\n<div class=\"custom-modal\" id=\"interestedModal\" [class.active]=\"isInterestedModalOpen\">\n  <div class=\"custom-modal__overlay\" (click)=\"closeInterestedModal()\"></div>\n  <div class=\"custom-modal__box\">\n    <button type=\"button\" class=\"custom-modal__close\" id=\"closeInterestedModal\" (click)=\"closeInterestedModal()\">&times;</button>\n    <div class=\"custom-modal__header\"><h2>Please provide your details</h2></div>\n    <form class=\"custom-modal__form\" id=\"interestedForm\" (ngSubmit)=\"submitInterestedForm()\">\n      <div class=\"custom-modal__row\"><div class=\"custom-modal__field\"><input type=\"text\" name=\"name\" placeholder=\"Name\" [(ngModel)]=\"name\" required /></div><div class=\"custom-modal__field\"><input type=\"email\" name=\"email\" placeholder=\"Email address\" [(ngModel)]=\"email\" required /></div></div>\n      <div class=\"custom-modal__field\"><input type=\"tel\" name=\"mobile\" placeholder=\"Mobile Number\" [(ngModel)]=\"mobile\" required /></div>\n      <div class=\"custom-modal__actions\"><button type=\"button\" class=\"btn-close\" id=\"cancelInterestedModal\" (click)=\"closeInterestedModal()\">Close</button><button type=\"submit\" class=\"btn-send\">Send Mail</button></div>\n    </form>\n  </div>\n</div>\r\n", styles: [":host { display: block; }\n\n@keyframes training-svc-shimmer {\n  0% { background-position: -200% center; }\n  100% { background-position: 200% center; }\n}\n\n@keyframes training-svc-blob {\n  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate3d(0, 0, 0) scale(1); }\n  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate3d(18px, -14px, 0) scale(1.06); }\n}\n\n.training-hero--final {\n  position: relative;\n  min-height: 430px;\n  padding:0;\n  padding-top: 3rem;\n  overflow: hidden;\n  text-align: left;\n  background:\n    radial-gradient(circle at 82% 50%, rgba(86, 133, 244, .32) 0 15%, rgba(86, 133, 244, .16) 16% 30%, transparent 31%),\n    radial-gradient(circle, rgba(43, 123, 255, .075) 1px, transparent 1px),\n    linear-gradient(107deg, #fff 0 49%, #edf5ff 49.2% 100%);\n  background-size: auto, 36px 36px, auto;\n  // border: 1px solid rgba(188, 210, 250, .9);\n  border-radius: 16px;\n  box-shadow: 0 18px 55px rgba(24, 50, 100, .09);\n  width: min(calc(100% - 12px), 1800px);\n  margin: 6px auto 0;\n}\n\n\n.training-hero__blob {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1.08fr) minmax(420px, .92fr);\n  gap: 28px;\n  min-height: 430px;\n  padding: 70px 100px 26px;\n  align-items: center;\n}\n\n.training-hero__content::before {\n  content: \"\";\n  position: absolute;\n  z-index: -1;\n  right: 70px;\n  top: 28px;\n  width: 490px;\n  height: 490px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, rgba(198,216,255,.32), rgba(74,126,238,.48));\n}\n\n.training-hero__copy { max-width: 690px; min-width: 0; }\n.training-hero__eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n  color: #075eff;\n  font-size: 11.5px;\n  font-weight: 800;\n  letter-spacing: .14em;\n  line-height: 1;\n  text-transform: uppercase;\n}\n.training-hero__eyebrow .ey-line {\n  display: inline-block;\n  width: 24px;\n  height: 1.5px;\n  flex-shrink: 0;\n  background: linear-gradient(90deg, #0b3d91, #075eff, #0b3d91);\n  background-size: 200% auto;\n  animation: training-svc-shimmer 2.5s linear infinite;\n}\n.training-hero--final .training-hero__title { font-size: clamp(2rem, 3.8vw, 3.1rem);\n    font-weight: 800;\n    color: var(--text-dark);\n    line-height: 1.15;\n    letter-spacing: -0.03em;\n    margin-bottom: 20px;\n    opacity: 0;\n    animation: svc-fade-left 0.65s 0.15s ease forwards;}\n.training-hero--final .training-hero__accent { color: #075eff; }\n.training-hero--final .training-hero__sub { max-width: 610px; margin: 0; color: #52608d; font-size: 17px; line-height: 1.58; }\n\n.training-hero__features {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 12px 14px;\n  width: 100%;\n  max-width: 100%;\n  margin-top: 32px;\n  align-items: start;\n  overflow: visible;\n}\n\n.training-hero__feature {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  min-width: 0;\n  padding: 0;\n  overflow: visible;\n}\n\n.training-hero__feature:first-child { padding-left: 0; }\n.training-hero__feature:last-child { padding-right: 0; border-right: 0; }\n.training-hero__feature i {\n  display: inline-grid;\n  width: 50px;\n  height: 50px;\n  place-items: center;\n  border: 1px solid;\n  border-radius: 10px;\n  font-size: 21px;\n  flex-shrink: 0;\n  box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 10px 22px rgba(24,50,100,.06);\n}\n.training-hero__feature:nth-child(1) i { color: #075eff; border-color: #cbdcff; background: linear-gradient(145deg, #eef4ff, #fff); }\n.training-hero__feature:nth-child(2) i { color: #20b746; border-color: #caefd4; background: linear-gradient(145deg, #effcf3, #fff); }\n.training-hero__feature:nth-child(3) i { color: #6a38f0; border-color: #e0d5ff; background: linear-gradient(145deg, #f4efff, #fff); }\n.training-hero__feature:nth-child(4) i { color: #ff6b1a; border-color: #ffe0ce; background: linear-gradient(145deg, #fff4ed, #fff); }\n.training-hero__feature div {\n  min-width: 0;\n  overflow: visible;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.training-hero__feature strong,\n.training-hero__feature span {\n  display: block;\n  width: 100%;\n  overflow: visible;\n  white-space: normal;\n  word-break: break-word;\n  line-height: 1.25;\n}\n\n.training-hero__feature strong {\n  color: #071747;\n  font-size: clamp(11px, 1.05vw, 12px);\n  font-weight: 900;\n}\n\n.training-hero__feature span {\n  color: #4f5d8a;\n  font-size: clamp(9.5px, .95vw, 10.5px);\n  font-weight: 700;\n}\n\n@media (max-width: 1280px) {\n  .training-hero__features {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    max-width: 720px;\n  }\n}\n\n@media (max-width: 640px) {\n  .training-hero__features {\n    grid-template-columns: 1fr;\n    gap: 12px;\n    max-width: 100%;\n  }\n\n  .training-hero__feature {\n    gap: 10px;\n  }\n\n  .training-hero__feature i {\n    width: 44px;\n    height: 44px;\n    font-size: 18px;\n  }\n}\n\n.training-hero__visual { position: relative; min-height: 350px; overflow: visible; }\n.training-hero__image { position: absolute; right: 86px; bottom: 8px; z-index: 2; display: block; width: min(430px, 76%); max-height: 330px; height: auto; object-fit: contain; filter: drop-shadow(0 20px 28px rgba(29,78,216,.16));opacity: .8; }\n.training-hero__orbit, .training-hero__shape { position: absolute; pointer-events: none; }\n.training-hero__orbit { border: 1px solid rgba(7,94,255,.34); }\n.training-hero__orbit--one { right: 72px; top: 28px; width: 220px; height: 220px; border-radius: 50%; border-color: rgba(16,190,140,.58); }\n.training-hero__orbit--two { left: 46px; bottom: 30px; width: 170px; height: 170px; border-style: dashed; border-radius: 50%; border-left-color: transparent; border-bottom-color: transparent; }\n.training-hero__shape--triangle { left: -42px; top: 98px; width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-bottom: 24px solid #075eff; }\n.training-hero__shape--arrow { right: -10px; top: 74px; width: 118px; height: 118px; border-right: 1px dashed #075eff; border-bottom: 1px dashed #075eff; border-radius: 0 0 95px 0; transform: rotate(-24deg); opacity: .65; }\n\n.training-stat { position: absolute; z-index: 3; display: grid; gap: 6px; width: 132px; padding: 16px; border-radius: 13px; background: rgba(255,255,255,.94); box-shadow: 0 22px 42px rgba(23,51,111,.12);animation: heroBubbleFloat var(--dur, 6s) ease-in-out infinite;animation-delay: var(--delay, 0s); }\n.training-stat i { color: #5a28ff; font-size: 26px; }\n.training-stat strong { color: #3f26d8; font-size: 27px; line-height: 1; }\n.training-stat span { color: #45537e; font-size: 12.5px; line-height: 1.35; }\n.training-stat--left { left: 10px; top: 14px; }\n.training-stat--right { right: 28px; top: 146px; }\n.training-stat--right i { color: #2fc34a; }\n.training-stat--right strong { color: #071747; }\n\n/* Bubbles removed \u2014 using original training-stat appearance */\n\n/* Final polish for existing filter/search/cards without changing structure */\n.dashboard-container { padding-top: 34px; }\n.filter-search-container {\n  align-items: center;\n  gap: 18px;\n  margin-bottom: 34px;\n  padding: 0 2px;\n}\n.filter-tags-shell {\n  grid-template-columns: 35px minmax(0, 1fr) 35px;\n  gap: 10px;\n}\n.filter-scroll-btn {\n  width: 35px;\n  height: 35px;\n  border-radius: 10px;\n  border-color: #d8e3f8;\n  color: #071747;\n  background: #fff;\n  box-shadow: 0 10px 22px rgba(24,50,100,.06);\n}\n.filter-scroll-btn:hover {\n  background: #075eff;\n  border-color: #075eff;\n  color: #fff;\n}\n.filter-tags { gap: 12px; padding: 1px 2px 0px; }\n.tag {\n  height: 35px;\n  display: inline-flex;\n  align-items: center;\n  border: 1px solid #d8e3f8;\n  border-radius: 10px;\n  background: #fff;\n  color: #071747;\n  box-shadow: 0 10px 22px rgba(24,50,100,.04);\n}\n.tag-active {\n  border-color: #075eff;\n  background: #075eff;\n  color: #fff;\n  box-shadow: 0 12px 22px rgba(7,94,255,.18);\n}\n.search-box { width: 300px; }\n.search-box input {\n  height: 35px;\n  border-color: #cad8f2;\n  border-radius: 10px;\n  color: #071747;\n  font-weight: 700;\n  box-shadow: 0 10px 22px rgba(24,50,100,.04);\n}\n.search-box input:focus {\n  border-color: #075eff;\n  box-shadow: 0 0 0 4px rgba(7,94,255,.1);\n}\n\n.training-card {\n  border-width: 1px;\n  border-color: #d9e5fa;\n  box-shadow: 0 14px 34px rgba(24,50,100,.08);\n}\n.training-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 22px 46px rgba(24,50,100,.13);\n}\n\n.card-footer-panel {\n  display: grid;\n  gap: 10px;\n  margin-top: auto;\n}\n\n.card-footer-row {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  width: 100%;\n}\n\n.training-action {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex: 1 1 0;\n  min-width: 0;\n  min-height: 44px;\n  padding: 10px 12px;\n  border: 1px solid #d9e5fa;\n  border-radius: 10px;\n  background: #ffffff;\n  color: #1547b8;\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;\n  box-shadow: 0 8px 18px rgba(24,50,100,.06);\n}\n\n.training-action:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 24px rgba(24,50,100,.12);\n}\n\n.training-action--interest {\n  background: #f7faff;\n}\n\n.training-action--read {\n  background: #eef5ff;\n}\n\n.training-action--test {\n  background: linear-gradient(135deg, #1d5df5 0%, #3f83ff 100%);\n  color: #ffffff;\n  border-color: transparent;\n  box-shadow: 0 12px 24px rgba(29, 93, 245, 0.2);\n}\n\n@media (max-width: 768px) {\n  .card-footer-row {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 576px) {\n  .training-action {\n    min-height: 35px;\n    font-size: 11px;\n    padding: 10px;\n  }\n}\n\n.custom-modal--pdf .custom-modal__box { width: 90vw; max-width: 1100px; height: 85vh; padding: 0; overflow: hidden; }\n.custom-modal__pdf-container { width: 100%; height: calc(85vh - 80px); overflow: hidden; position: relative; }\n.custom-modal__pdf-container iframe, #pdfViewer { width: 100% !important; height: 100% !important; min-height: 70vh; border: 0; display: block; }\n\n@media (max-width: 1500px) {\n  \n.training-hero__blob {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content { padding-inline: 70px; grid-template-columns: minmax(0, 1fr) minmax(390px, .9fr); }\n  .training-hero__copy, .training-hero__features { max-width: 620px; }\n  .training-hero--final .training-hero__title { font-size: clamp(45px, 3.65vw, 56px); }\n  .training-hero__image { right: 64px; width: min(390px, 74%); max-height: 310px; opacity: .8; }\n  .training-stat--right { right: 14px; }\n  .training-hero__feature { grid-template-columns: 44px minmax(0, 1fr); padding-inline: 10px; }\n  .training-hero__feature i { width: 44px; height: 44px; font-size: 19px; }\n  .training-hero__feature strong { font-size: 9.5px; }\n  .training-hero__feature span { font-size: 8.5px; }\n}\n\n@media (max-width: 1280px) {\n  .training-hero--final { min-height: auto; }\n  \n.training-hero__blob {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content { grid-template-columns: 1fr; min-height: auto; padding: 30px; }\n  .training-hero__copy, .training-hero--final .training-hero__title, .training-hero--final .training-hero__sub { max-width: 100%; }\n  .training-hero__visual { min-height: 340px; }\n  .training-hero__image { right: 50%; bottom: 4px; width: min(390px, 76%); max-height: 300px; transform: translateX(50%);opacity: .8; }\n  .training-hero__content::before { right: 50%; top: auto; bottom: -70px; transform: translateX(50%); }\n  .training-hero__features { grid-template-columns: repeat(2, minmax(180px, 1fr)); max-width: 560px; overflow: visible; row-gap: 14px; }\n  .training-hero__feature strong { font-size: 11px; }\n  .training-hero__feature span { font-size: 10.5px; }\n  .filter-search-container { flex-direction: column-reverse; align-items: stretch; }\n  .search-box { width: 100%; }\n}\n\n@media (max-width: 860px) {\n  .training-hero--final { width: 100%; margin: 0 0 16px; border-radius: 0; }\n  \n.training-hero__blob {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n  filter: blur(72px);\n  pointer-events: none;\n  animation: training-svc-blob 14s ease-in-out infinite;\n}\n\n.training-hero__blob--a {\n  width: 340px;\n  height: 340px;\n  top: -95px;\n  right: -70px;\n  background: rgba(43, 123, 255, .12);\n}\n\n.training-hero__blob--b {\n  width: 260px;\n  height: 260px;\n  bottom: -60px;\n  left: -55px;\n  background: rgba(11, 61, 145, .08);\n  animation-delay: -7s;\n}\n.training-hero__content { padding: 26px 18px 20px; }\n  .training-hero--final .training-hero__title { font-size: clamp(40px, 8vw, 48px); }\n  .training-hero__visual { min-height: 320px; overflow: hidden; }\n  .training-hero__image { bottom: 6px; width: min(330px, 82%); max-height: 250px;opacity: .8; }\n  .training-stat--left { left: 0; top: 12px; }\n  .training-stat--right { right: 0; top: 118px; }\n  .training-hero__features { grid-template-columns: 1fr; max-width: 100%; }\n  .training-hero__feature { grid-template-columns: 52px minmax(0, 1fr); padding-inline: 0; }\n  .training-hero__feature i { width: 52px; height: 52px; }\n  .training-hero__feature strong, .training-hero__feature span { font-size: 11px; white-space: normal; }\n}\n\n@media (max-width: 560px) {\n  .training-hero--final .training-hero__title { font-size: 40px; line-height: 1.04; }\n  .training-hero__image { width: min(300px, 86%);opacity: .8; }\n  .filter-tags-shell { grid-template-columns: 38px minmax(0, 1fr) 38px; gap: 8px; }\n  .filter-scroll-btn { width: 38px; height: 40px; }\n}\n\n\n"] }]
    }], function () { return [{ type: i1.SiteInteractionsService }, { type: i2.Title }, { type: i2.Meta }, { type: i3.HttpClient }, { type: i4.DataService }, { type: i5.TrainingManagementService }, { type: i6.NotifierService }, { type: i2.DomSanitizer }, { type: i7.Router }]; }, { categoryTagsScroller: [{
            type: ViewChild,
            args: ['categoryTagsScroller']
        }] }); })();
//# sourceMappingURL=training.component.js.map