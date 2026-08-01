import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import * as JSZip from 'jszip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../../core/services/data.service";
import * as i3 from "../../../core/services/certificate-pdf.service";
import * as i4 from "../../../core/services/notifier.service";
import * as i5 from "@angular/platform-browser";
import * as i6 from "../../../core/services/training-management.service";
import * as i7 from "../../../core/services/api-client.service";
import * as i8 from "../../../core/services/auth.service";
import * as i9 from "../../../core/services/client-management.service";
import * as i10 from "@angular/common";
import * as i11 from "@angular/router";
import * as i12 from "@angular/forms";
function PrintCertificateComponent_div_42_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_42_button_2_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r16); const company_r14 = restoredCtx.$implicit; const ctx_r15 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r15.selectCompany(company_r14)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const company_r14 = ctx.$implicit;
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(company_r14.clientName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r12.getBulkCompanyCertificateCount(company_r14), " certificates");
} }
function PrintCertificateComponent_div_42_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1, "No company with certificate data found.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63)(1, "input", 64);
    i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_div_42_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.companySearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, PrintCertificateComponent_div_42_button_2_Template, 5, 2, "button", 65);
    i0.ɵɵtemplate(3, PrintCertificateComponent_div_42_p_3_Template, 2, 0, "p", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r0.companySearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredBulkCompanies);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.filteredBulkCompanies.length);
} }
function PrintCertificateComponent_div_51_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_51_button_7_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r23); const training_r21 = restoredCtx.$implicit; const ctx_r22 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r22.selectBulkTraining(training_r21)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const training_r21 = ctx.$implicit;
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r19.getTrainingLabel(training_r21));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r19.getBulkTrainingCertificateCount(training_r21), " certificates");
} }
function PrintCertificateComponent_div_51_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1, "No related training found.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63)(1, "input", 69);
    i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_div_51_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r24.bulkTrainingSearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_51_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r25); const ctx_r26 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r26.selectBulkTraining()); });
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, "All trainings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6, "Include every training for this company");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, PrintCertificateComponent_div_51_button_7_Template, 5, 2, "button", 70);
    i0.ɵɵtemplate(8, PrintCertificateComponent_div_51_p_8_Template, 2, 0, "p", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r1.bulkTrainingSearch);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredBulkTrainingList)("ngForTrackBy", ctx_r1.trackByTrainingId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.filteredBulkTrainingList.length);
} }
function PrintCertificateComponent_div_54_strong_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r27.bulkPercentage, "%");
} }
function PrintCertificateComponent_div_54_progress_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "progress", 74);
} if (rf & 2) {
    const ctx_r28 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", ctx_r28.bulkProcessed)("max", ctx_r28.bulkTotal);
} }
function PrintCertificateComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵtemplate(3, PrintCertificateComponent_div_54_strong_3_Template, 2, 1, "strong", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PrintCertificateComponent_div_54_progress_4_Template, 1, 2, "progress", 73);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.bulkStatus, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.bulkTotal);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.bulkTotal);
} }
function PrintCertificateComponent_div_84_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_84_button_2_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r33); const company_r31 = restoredCtx.$implicit; const ctx_r32 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r32.selectEmailCompany(company_r31)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const company_r31 = ctx.$implicit;
    const ctx_r29 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(company_r31.clientName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r29.getBulkCompanyCertificateCount(company_r31), " participants");
} }
function PrintCertificateComponent_div_84_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1, "No company with certificate data found.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_84_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63)(1, "input", 75);
    i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_div_84_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r35); const ctx_r34 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r34.emailCompanySearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, PrintCertificateComponent_div_84_button_2_Template, 5, 2, "button", 65);
    i0.ɵɵtemplate(3, PrintCertificateComponent_div_84_p_3_Template, 2, 0, "p", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r3.emailCompanySearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredEmailCompanies);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.filteredEmailCompanies.length);
} }
function PrintCertificateComponent_div_94_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_94_button_2_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r40); const training_r38 = restoredCtx.$implicit; const ctx_r39 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r39.selectEmailTraining(training_r38)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const training_r38 = ctx.$implicit;
    const ctx_r36 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r36.getTrainingLabel(training_r38));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r36.getEmailTrainingCertificateCount(training_r38), " certificates");
} }
function PrintCertificateComponent_div_94_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1, "No related training found.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_94_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63)(1, "input", 76);
    i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_div_94_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r42); const ctx_r41 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r41.emailTrainingSearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, PrintCertificateComponent_div_94_button_2_Template, 5, 2, "button", 70);
    i0.ɵɵtemplate(3, PrintCertificateComponent_div_94_p_3_Template, 2, 0, "p", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r4.emailTrainingSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.filteredEmailTrainingList)("ngForTrackBy", ctx_r4.trackByTrainingId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r4.filteredEmailTrainingList.length);
} }
function PrintCertificateComponent_div_106_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_106_button_1_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r47); const option_r45 = restoredCtx.$implicit; const ctx_r46 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r46.selectEmailDate(option_r45.value)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵelement(2, "i", 78);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r45 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", option_r45.label, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", option_r45.count, " ", option_r45.count === 1 ? "certificate" : "certificates", "");
} }
function PrintCertificateComponent_div_106_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1, "No certificate dates found for this training.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_106_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77);
    i0.ɵɵtemplate(1, PrintCertificateComponent_div_106_button_1_Template, 6, 3, "button", 65);
    i0.ɵɵtemplate(2, PrintCertificateComponent_div_106_p_2_Template, 2, 0, "p", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r5.emailDateOptions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r5.emailDateOptions.length);
} }
function PrintCertificateComponent_div_107_div_19_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r55 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 94)(1, "input", 95);
    i0.ɵɵlistener("change", function PrintCertificateComponent_div_107_div_19_label_1_Template_input_change_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r55); const user_r53 = restoredCtx.$implicit; const ctx_r54 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r54.toggleEmailUser(user_r53.certificationDataId)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 96);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "uppercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 97)(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "span", 98);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const user_r53 = ctx.$implicit;
    const ctx_r52 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("is-selected", ctx_r52.isEmailUserSelected(user_r53.certificationDataId))("is-unavailable", !ctx_r52.isEmailUserEligible(user_r53));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("checked", ctx_r52.isEmailUserSelected(user_r53.certificationDataId))("disabled", !ctx_r52.isEmailUserEligible(user_r53) || ctx_r52.isBulkEmailSending);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 10, (user_r53.userName || user_r53.name || "?").charAt(0)));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r52.formatPersonName(user_r53.userName || user_r53.name));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(!user_r53.email ? "No email address available" : !user_r53.certificationNumber ? "No certificate number available" : user_r53.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r53.certificationNumber || "No certificate no.");
} }
function PrintCertificateComponent_div_107_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92);
    i0.ɵɵtemplate(1, PrintCertificateComponent_div_107_div_19_label_1_Template, 12, 12, "label", 93);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r48 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r48.emailUsers)("ngForTrackBy", ctx_r48.trackByUserId);
} }
function PrintCertificateComponent_div_107_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 99);
    i0.ɵɵtext(1, "No participants match this selection.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_107_div_31_strong_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r56 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", ctx_r56.emailPercentage, "%");
} }
function PrintCertificateComponent_div_107_div_31_progress_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "progress", 74);
} if (rf & 2) {
    const ctx_r57 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("value", ctx_r57.emailProcessed)("max", ctx_r57.emailTotal);
} }
function PrintCertificateComponent_div_107_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵtemplate(3, PrintCertificateComponent_div_107_div_31_strong_3_Template, 2, 1, "strong", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PrintCertificateComponent_div_107_div_31_progress_4_Template, 1, 2, "progress", 73);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r51 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r51.emailStatus, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r51.emailTotal);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r51.emailTotal);
} }
function PrintCertificateComponent_div_107_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79)(1, "div", 26)(2, "span");
    i0.ɵɵtext(3, "2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5, "Select participants");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 80)(7, "label", 81);
    i0.ɵɵelement(8, "i", 82);
    i0.ɵɵelementStart(9, "input", 83);
    i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_div_107_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r58.emailUserSearch = $event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 84);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_107_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r59); const ctx_r60 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r60.toggleAllEmailUsers()); });
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 85)(13, "span")(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16, " selected");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, PrintCertificateComponent_div_107_div_19_Template, 2, 2, "div", 86);
    i0.ɵɵtemplate(20, PrintCertificateComponent_div_107_ng_template_20_Template, 2, 0, "ng-template", null, 87, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(22, "div", 88)(23, "div")(24, "strong");
    i0.ɵɵtext(25, "Ready to send");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "Each participant receives their own certificate PDF.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "button", 89);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_107_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r59); const ctx_r61 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r61.sendSelectedCertificates()); });
    i0.ɵɵelement(29, "i", 90);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(31, PrintCertificateComponent_div_107_div_31_Template, 5, 3, "div", 91);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r49 = i0.ɵɵreference(21);
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngModel", ctx_r6.emailUserSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r6.selectableEmailUsers.length || ctx_r6.isBulkEmailSending);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r6.allVisibleEmailUsersSelected ? "Clear visible" : "Select all visible", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r6.selectedEmailUserCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r6.emailUsers.length, " shown");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.emailUsers.length)("ngIfElse", _r49);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", !ctx_r6.selectedEmailUserCount || ctx_r6.isBulkEmailSending);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r6.isBulkEmailSending ? "Sending..." : "Send selected", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.emailStatus);
} }
function PrintCertificateComponent_div_135_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r66 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_135_button_2_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r66); const training_r64 = restoredCtx.$implicit; const ctx_r65 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r65.selectTraining(training_r64)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const training_r64 = ctx.$implicit;
    const ctx_r62 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r62.getTrainingLabel(training_r64));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r62.getTrainingUserCount(training_r64), " ", ctx_r62.getTrainingUserCount(training_r64) === 1 ? "participant" : "participants", "");
} }
function PrintCertificateComponent_div_135_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1, "No training found.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_135_Template(rf, ctx) { if (rf & 1) {
    const _r68 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63)(1, "input", 101);
    i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_div_135_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r67 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r67.trainingSearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, PrintCertificateComponent_div_135_button_2_Template, 5, 3, "button", 70);
    i0.ɵɵtemplate(3, PrintCertificateComponent_div_135_p_3_Template, 2, 0, "p", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r7.trainingSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r7.filteredTrainingList)("ngForTrackBy", ctx_r7.trackByTrainingId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r7.filteredTrainingList.length);
} }
function PrintCertificateComponent_div_144_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function PrintCertificateComponent_div_144_button_2_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r73); const user_r71 = restoredCtx.$implicit; const ctx_r72 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r72.selectUser(user_r71.certificationDataId)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const user_r71 = ctx.$implicit;
    const ctx_r69 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r69.formatPersonName(user_r71.userName || user_r71.name));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r71.email || user_r71.certificationNumber);
} }
function PrintCertificateComponent_div_144_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1, "No participant found.");
    i0.ɵɵelementEnd();
} }
function PrintCertificateComponent_div_144_Template(rf, ctx) { if (rf & 1) {
    const _r75 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63)(1, "input", 102);
    i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_div_144_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r74 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r74.userSearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, PrintCertificateComponent_div_144_button_2_Template, 5, 2, "button", 70);
    i0.ɵɵtemplate(3, PrintCertificateComponent_div_144_p_3_Template, 2, 0, "p", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r8.userSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r8.filteredUserData)("ngForTrackBy", ctx_r8.trackByUserId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.filteredUserData.length);
} }
function PrintCertificateComponent_iframe_203_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "iframe", 103);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r9.previewUrl, i0.ɵɵsanitizeResourceUrl);
} }
function PrintCertificateComponent_ng_template_204_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104)(1, "div", 105);
    i0.ɵɵtext(2, "PDF");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Your certificate will appear here");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Select a training and participant, then choose Preview PDF.");
    i0.ɵɵelementEnd()();
} }
export class PrintCertificateComponent {
    constructor(http, dataService, pdfService, notifier, sanitizer, trainingService, apiClient, authService, clientService) {
        this.http = http;
        this.dataService = dataService;
        this.pdfService = pdfService;
        this.notifier = notifier;
        this.sanitizer = sanitizer;
        this.trainingService = trainingService;
        this.apiClient = apiClient;
        this.authService = authService;
        this.clientService = clientService;
        this.trainingList = [];
        this.selectedTrainingId = '';
        this.selectedUserId = '';
        this.trainingSearch = '';
        this.userSearch = '';
        this.UserData = [];
        this.allUserData = [];
        this.isTrainingDropdownOpen = false;
        this.isUserDropdownOpen = false;
        this.previewUrl = null;
        this.previewObjectUrl = '';
        this.isGenerating = false;
        this.isSending = false;
        this.companies = [];
        this.bulkTrainingList = [];
        this.selectedCompanyId = '';
        this.selectedBulkTrainingId = '';
        this.isBulkGenerating = false;
        this.bulkProcessed = 0;
        this.bulkTotal = 0;
        this.bulkStatus = '';
        this.companySearch = '';
        this.bulkTrainingSearch = '';
        this.isCompanyDropdownOpen = false;
        this.isBulkTrainingDropdownOpen = false;
        this.emailCompanyId = '';
        this.emailTrainingId = '';
        this.emailDateValue = '';
        this.emailCompanySearch = '';
        this.emailTrainingSearch = '';
        this.emailUserSearch = '';
        this.emailTrainingList = [];
        this.selectedEmailUserIds = new Set();
        this.isEmailCompanyDropdownOpen = false;
        this.isEmailTrainingDropdownOpen = false;
        this.isEmailDateDropdownOpen = false;
        this.isBulkEmailSending = false;
        this.emailProcessed = 0;
        this.emailTotal = 0;
        this.emailStatus = '';
        // Temporary data until the training-result API is connected.
        this.users = [
            { id: 'usr-101', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', marks: 86, completionType: 'assessment' },
            { id: 'usr-102', name: 'Meera Kulkarni', email: 'meera.kulkarni@example.com', marks: 52, completionType: 'assessment' },
            { id: 'usr-103', name: 'Vikram Patil', email: 'vikram.patil@example.com', marks: null, completionType: 'attendance' }
        ];
        this.certificate = this.createEmptyCertificate();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.loadTrainingList();
        this.loadCertificateUsers();
        this.loadCompanies();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.revokePreviewUrl();
    }
    get filteredTrainingList() {
        const search = this.trainingSearch.trim().toLowerCase();
        if (!search)
            return this.trainingList;
        return this.trainingList.filter((training) => {
            const searchable = `${this.getTrainingLabel(training)} ${training.trainingId || ''} ${training.topicCovered || ''}`.toLowerCase();
            return searchable.includes(search);
        });
    }
    get selectedTraining() {
        return this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '') === this.selectedTrainingId; });
    }
    get selectedUser() {
        return this.UserData.find((user) => String(user.certificationDataId) === this.selectedUserId);
    }
    get filteredUserData() {
        const search = this.userSearch.trim().toLowerCase();
        if (!search)
            return this.UserData;
        return this.UserData.filter((user) => `${user.userName || user.name || ''} ${user.email || ''} ${user.certificationNumber || user.certificateNumber || ''}`.toLowerCase().includes(search));
    }
    get completionPreview() {
        var _a, _b;
        if (!this.selectedUser)
            return 'Select a user to calculate the completion statement.';
        if (this.certificate.completionType === 'attendance') {
            return 'has successfully attended the training program on';
        }
        return ((_a = this.certificate.marks) !== null && _a !== void 0 ? _a : 0) >= ((_b = this.certificate.passingMarks) !== null && _b !== void 0 ? _b : 60)
            ? 'has successfully attended and completed the assessment on'
            : 'has successfully attended the training program on';
    }
    get bulkPercentage() {
        return this.bulkTotal ? Math.round((this.bulkProcessed / this.bulkTotal) * 100) : 0;
    }
    get selectedCompany() {
        return this.companies.find((company) => String(company.clientId) === this.selectedCompanyId);
    }
    get selectedBulkTraining() {
        return this.bulkTrainingList.find((training) => String(training.trainingId) === this.selectedBulkTrainingId);
    }
    get filteredBulkCompanies() {
        const companyIds = new Set(this.allUserData.map((record) => String(record.location)));
        const search = this.companySearch.trim().toLowerCase();
        return this.companies.filter((company) => {
            var _a;
            return companyIds.has(String(company.clientId))
                && (!search || `${company.clientName} ${(_a = company.clientId) !== null && _a !== void 0 ? _a : ''}`.toLowerCase().includes(search));
        });
    }
    get filteredBulkTrainingList() {
        const search = this.bulkTrainingSearch.trim().toLowerCase();
        if (!search)
            return this.bulkTrainingList;
        return this.bulkTrainingList.filter((training) => { var _a; return `${this.getTrainingLabel(training)} ${(_a = training.trainingId) !== null && _a !== void 0 ? _a : ''}`.toLowerCase().includes(search); });
    }
    get selectedEmailCompany() {
        return this.companies.find((company) => String(company.clientId) === this.emailCompanyId);
    }
    get selectedEmailTraining() {
        return this.emailTrainingList.find((training) => String(training.trainingId) === this.emailTrainingId);
    }
    get filteredEmailCompanies() {
        const companyIds = new Set(this.allUserData.map((record) => String(record.location)));
        const search = this.emailCompanySearch.trim().toLowerCase();
        return this.companies.filter((company) => {
            var _a;
            return companyIds.has(String(company.clientId))
                && (!search || `${company.clientName} ${(_a = company.clientId) !== null && _a !== void 0 ? _a : ''}`.toLowerCase().includes(search));
        });
    }
    get filteredEmailTrainingList() {
        const search = this.emailTrainingSearch.trim().toLowerCase();
        if (!search)
            return this.emailTrainingList;
        return this.emailTrainingList.filter((training) => { var _a; return `${this.getTrainingLabel(training)} ${(_a = training.trainingId) !== null && _a !== void 0 ? _a : ''}`.toLowerCase().includes(search); });
    }
    get emailDateOptions() {
        if (!this.emailCompanyId || !this.emailTrainingId)
            return [];
        const counts = new Map();
        this.allUserData
            .filter((record) => String(record.location) === this.emailCompanyId
            && String(record.trainingId) === this.emailTrainingId)
            .forEach((record) => {
            const value = this.getRecordDateValue(record);
            if (value)
                counts.set(value, (counts.get(value) || 0) + 1);
        });
        return Array.from(counts.entries())
            .sort(([left], [right]) => right.localeCompare(left))
            .map(([value, count]) => ({ value, count, label: this.formatDisplayDate(value) }));
    }
    get selectedEmailDateLabel() {
        return this.emailDateValue ? this.formatDisplayDate(this.emailDateValue) : '';
    }
    get emailUsers() {
        if (!this.emailCompanyId || !this.emailTrainingId || !this.emailDateValue)
            return [];
        const search = this.emailUserSearch.trim().toLowerCase();
        return this.allUserData.filter((record) => {
            const matchesSelection = String(record.location) === this.emailCompanyId
                && String(record.trainingId) === this.emailTrainingId
                && this.getRecordDateValue(record) === this.emailDateValue;
            const matchesSearch = !search || `${record.userName || record.name || ''} ${record.email || ''} ${record.certificationNumber || ''}`
                .toLowerCase().includes(search);
            return matchesSelection && matchesSearch;
        });
    }
    get selectedEmailUserCount() {
        return this.selectedEmailUserIds.size;
    }
    get selectableEmailUsers() {
        return this.emailUsers.filter((user) => this.isEmailUserEligible(user));
    }
    get allVisibleEmailUsersSelected() {
        return this.selectableEmailUsers.length > 0
            && this.selectableEmailUsers.every((user) => this.selectedEmailUserIds.has(String(user.certificationDataId)));
    }
    getEmailTrainingCertificateCount(training) {
        return this.allUserData.filter((record) => String(record.location) === this.emailCompanyId
            && String(record.trainingId) === String(training.trainingId)).length;
    }
    get emailPercentage() {
        return this.emailTotal ? Math.round((this.emailProcessed / this.emailTotal) * 100) : 0;
    }
    toggleEmailCompanyDropdown() {
        if (this.isBulkEmailSending)
            return;
        this.isEmailCompanyDropdownOpen = !this.isEmailCompanyDropdownOpen;
        this.isEmailTrainingDropdownOpen = false;
        this.isEmailDateDropdownOpen = false;
        if (this.isEmailCompanyDropdownOpen)
            this.emailCompanySearch = '';
    }
    toggleEmailTrainingDropdown() {
        if (!this.emailCompanyId || this.isBulkEmailSending)
            return;
        this.isEmailTrainingDropdownOpen = !this.isEmailTrainingDropdownOpen;
        this.isEmailCompanyDropdownOpen = false;
        this.isEmailDateDropdownOpen = false;
        if (this.isEmailTrainingDropdownOpen)
            this.emailTrainingSearch = '';
    }
    toggleEmailDateDropdown() {
        if (!this.emailTrainingId || this.isBulkEmailSending)
            return;
        this.isEmailDateDropdownOpen = !this.isEmailDateDropdownOpen;
        this.isEmailCompanyDropdownOpen = false;
        this.isEmailTrainingDropdownOpen = false;
    }
    selectEmailDate(value) {
        this.emailDateValue = value;
        this.emailUserSearch = '';
        this.selectedEmailUserIds.clear();
        this.emailStatus = '';
        this.isEmailDateDropdownOpen = false;
    }
    selectEmailCompany(company) {
        var _a;
        this.emailCompanyId = String((_a = company.clientId) !== null && _a !== void 0 ? _a : '');
        this.emailTrainingId = '';
        this.emailDateValue = '';
        this.emailCompanySearch = company.clientName;
        this.emailTrainingSearch = '';
        this.emailUserSearch = '';
        this.selectedEmailUserIds.clear();
        this.emailStatus = '';
        this.isEmailCompanyDropdownOpen = false;
        this.isEmailTrainingDropdownOpen = false;
        this.isEmailDateDropdownOpen = false;
        this.updateEmailTrainingList();
    }
    selectEmailTraining(training) {
        var _a;
        this.emailTrainingId = String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '');
        this.emailTrainingSearch = this.getTrainingLabel(training);
        this.emailDateValue = '';
        this.emailUserSearch = '';
        this.selectedEmailUserIds.clear();
        this.emailStatus = '';
        this.isEmailTrainingDropdownOpen = false;
        this.isEmailDateDropdownOpen = false;
    }
    isEmailUserEligible(user) {
        return !!String((user === null || user === void 0 ? void 0 : user.email) || '').trim() && !!String((user === null || user === void 0 ? void 0 : user.certificationNumber) || '').trim();
    }
    isEmailUserSelected(userId) {
        return this.selectedEmailUserIds.has(String(userId));
    }
    toggleEmailUser(userId) {
        const id = String(userId);
        if (this.selectedEmailUserIds.has(id))
            this.selectedEmailUserIds.delete(id);
        else
            this.selectedEmailUserIds.add(id);
    }
    toggleAllEmailUsers() {
        if (this.allVisibleEmailUsersSelected) {
            this.selectableEmailUsers.forEach((user) => this.selectedEmailUserIds.delete(String(user.certificationDataId)));
        }
        else {
            this.selectableEmailUsers.forEach((user) => this.selectedEmailUserIds.add(String(user.certificationDataId)));
        }
    }
    sendSelectedCertificates() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.emailCompanyId || !this.emailTrainingId || !this.emailDateValue || !this.selectedEmailUserIds.size) {
                this.notifier.warningToastr('Select a company, training, certificate date, and at least one participant.');
                return;
            }
            if (!this.authService.isServerAuthenticated()) {
                this.notifier.warningToastr('Sign in with your server account before sending certificate emails.', 'Authentication required');
                return;
            }
            const records = this.allUserData.filter((record) => this.selectedEmailUserIds.has(String(record.certificationDataId))
                && String(record.location) === this.emailCompanyId
                && String(record.trainingId) === this.emailTrainingId
                && this.getRecordDateValue(record) === this.emailDateValue);
            const missingEmail = records.filter((record) => !String(record.email || '').trim()).length;
            const sendable = records.filter((record) => !!String(record.email || '').trim());
            if (!sendable.length) {
                this.notifier.warningToastr('The selected participants do not have email addresses.');
                return;
            }
            this.isBulkEmailSending = true;
            this.emailProcessed = 0;
            this.emailTotal = sendable.length;
            let failed = 0;
            try {
                for (const record of sendable) {
                    const certificate = this.mapBulkCertificate(record);
                    const recipientEmail = String(record.email).trim();
                    this.emailStatus = `Sending ${this.emailProcessed + 1} of ${this.emailTotal} to ${recipientEmail}...`;
                    try {
                        const bytes = yield this.pdfService.generate(certificate);
                        const fileName = `${this.sanitizeFilePart(certificate.userName, 'Participant')}-${this.sanitizeFilePart(certificate.trainingName, 'Training')}.pdf`;
                        const file = new File([new Blob([bytes], { type: 'application/pdf' })], fileName, { type: 'application/pdf' });
                        yield firstValueFrom(this.apiClient.upload('CertificateOperation/send-email', file, {
                            recipientEmail,
                            recipientName: certificate.userName,
                            trainingName: certificate.trainingName,
                            certificateNumber: certificate.certificateNumber
                        }));
                    }
                    catch (error) {
                        failed++;
                        console.error('Certificate email failed', { recipientEmail, error });
                    }
                    this.emailProcessed++;
                    yield this.yieldToBrowser();
                }
                const sent = this.emailTotal - failed;
                this.emailStatus = `Completed: ${sent} sent${failed ? `, ${failed} failed` : ''}${missingEmail ? `, ${missingEmail} skipped without email` : ''}.`;
                if (sent)
                    this.notifier.successToastr(`${sent} certificate email${sent === 1 ? '' : 's'} sent.`);
                if (failed || missingEmail)
                    this.notifier.warningToastr(this.emailStatus, 'Some emails need attention');
            }
            finally {
                this.isBulkEmailSending = false;
            }
        });
    }
    updateEmailTrainingList() {
        if (!this.emailCompanyId) {
            this.emailTrainingList = [];
            return;
        }
        const trainingIds = new Set(this.allUserData
            .filter((record) => String(record.location) === this.emailCompanyId)
            .map((record) => String(record.trainingId)));
        this.emailTrainingList = this.trainingList.filter((training) => trainingIds.has(String(training.trainingId)));
    }
    toggleCompanyDropdown() {
        if (this.isBulkGenerating)
            return;
        this.isCompanyDropdownOpen = !this.isCompanyDropdownOpen;
        this.isBulkTrainingDropdownOpen = false;
        if (this.isCompanyDropdownOpen)
            this.companySearch = '';
    }
    toggleBulkTrainingDropdown() {
        if (!this.selectedCompanyId || this.isBulkGenerating)
            return;
        this.isBulkTrainingDropdownOpen = !this.isBulkTrainingDropdownOpen;
        this.isCompanyDropdownOpen = false;
        if (this.isBulkTrainingDropdownOpen)
            this.bulkTrainingSearch = '';
    }
    selectCompany(company) {
        var _a;
        this.selectedCompanyId = String((_a = company.clientId) !== null && _a !== void 0 ? _a : '');
        this.selectedBulkTrainingId = '';
        this.companySearch = company.clientName;
        this.bulkTrainingSearch = '';
        this.isCompanyDropdownOpen = false;
        this.updateBulkTrainingList(this.allUserData);
    }
    selectBulkTraining(training) {
        var _a;
        this.selectedBulkTrainingId = String((_a = training === null || training === void 0 ? void 0 : training.trainingId) !== null && _a !== void 0 ? _a : '');
        this.bulkTrainingSearch = training ? this.getTrainingLabel(training) : '';
        this.isBulkTrainingDropdownOpen = false;
    }
    getBulkCompanyCertificateCount(company) {
        return this.allUserData.filter((record) => String(record.location) === String(company.clientId)).length;
    }
    getBulkTrainingCertificateCount(training) {
        return this.allUserData.filter((record) => String(record.location) === this.selectedCompanyId
            && String(record.trainingId) === String(training.trainingId)).length;
    }
    downloadAllCertificates() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isBulkGenerating || !this.selectedCompanyId)
                return;
            let fileHandle = null;
            try {
                fileHandle = yield this.chooseZipLocation();
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.name) === 'AbortError')
                    return;
                console.error('ZIP save location could not be selected.', error);
            }
            this.isBulkGenerating = true;
            this.bulkProcessed = 0;
            this.bulkTotal = 0;
            this.bulkStatus = 'Loading certificate data...';
            try {
                const records = yield firstValueFrom(this.trainingService.getCertificationData());
                const selectedRecords = this.filterBulkRecords(records || []);
                if (!selectedRecords.length) {
                    this.notifier.warningToastr('No certificates found for the selected company and training.');
                    return;
                }
                const zip = new JSZip();
                this.bulkTotal = selectedRecords.length;
                for (const record of selectedRecords) {
                    const certificate = this.mapBulkCertificate(record);
                    const bytes = yield this.pdfService.generate(certificate);
                    const folderName = this.sanitizeFilePart(certificate.trainingName, 'Training');
                    const certificateNumber = this.sanitizeFilePart(certificate.certificateNumber, 'Certificate');
                    const participant = this.sanitizeFilePart(certificate.userName, 'Participant');
                    zip.file(`${folderName}/${certificateNumber}_${participant}.pdf`, bytes);
                    this.bulkProcessed++;
                    this.bulkStatus = `Generating ${this.bulkProcessed} of ${this.bulkTotal} certificates...`;
                    yield this.yieldToBrowser();
                }
                this.bulkStatus = 'Creating ZIP file...';
                const zipBlob = yield zip.generateAsync({ type: 'blob' });
                yield this.saveZip(zipBlob, fileHandle);
                this.bulkStatus = `Completed ${this.bulkTotal} certificates.`;
                this.notifier.successToastr(`${this.bulkTotal} certificates downloaded.`);
            }
            catch (error) {
                console.error('Bulk certificate generation failed.', error);
                this.bulkStatus = 'Bulk download failed.';
                this.notifier.warningToastr('Could not generate the certificate ZIP.', 'Generation failed');
            }
            finally {
                this.isBulkGenerating = false;
            }
        });
    }
    toggleTrainingDropdown() {
        this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
        this.isUserDropdownOpen = false;
        if (this.isTrainingDropdownOpen)
            this.trainingSearch = '';
    }
    toggleUserDropdown() {
        if (!this.selectedTrainingId)
            return;
        this.isUserDropdownOpen = !this.isUserDropdownOpen;
        this.isTrainingDropdownOpen = false;
        if (this.isUserDropdownOpen)
            this.userSearch = '';
    }
    selectTraining(training) {
        var _a;
        this.selectedTrainingId = String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '');
        this.trainingSearch = this.getTrainingLabel(training);
        this.isTrainingDropdownOpen = false;
        this.isUserDropdownOpen = false;
        this.selectedUserId = '';
        this.userSearch = '';
        this.getTrainingUsers();
        this.certificate = Object.assign(Object.assign({}, this.createEmptyCertificate()), { trainingName: this.getTrainingLabel(training), coveredTopics: this.parseTopics(training.topicCovered, this.getTrainingLabel(training), training.trainingId) });
        this.revokePreviewUrl();
    }
    selectUser(userId) {
        var _a, _b;
        this.selectedUserId = String(userId);
        const user = this.UserData.find((x) => String(x.certificationDataId) === String(userId));
        if (!user)
            return;
        this.userSearch = this.getUserLabel(user);
        this.isUserDropdownOpen = false;
        this.certificate = Object.assign(Object.assign({}, this.certificate), { certificateNumber: user.certificationNumber || user.certificateNumber || '', userName: this.formatPersonName(user.userName || user.name), marks: (_b = (_a = user.marks) !== null && _a !== void 0 ? _a : user.totalPoints) !== null && _b !== void 0 ? _b : null, completionType: user.completionType || 'assessment', dateOfIssue: this.toDateInputValue(user.issuedDate || user.date || user.certificationDate), trainingHours: Number(user.days || 0) * 8, location: user.location || '', trainerName: user.trainerName || '' });
        this.revokePreviewUrl();
    }
    updateTopics(value) {
        this.certificate.coveredTopics = this.parseTopics(value, this.certificate.trainingName, this.selectedTrainingId);
        this.revokePreviewUrl();
    }
    clearBulkDownload() {
        this.selectedCompanyId = '';
        this.selectedBulkTrainingId = '';
        this.companySearch = '';
        this.bulkTrainingSearch = '';
        this.bulkTrainingList = [];
        this.bulkProcessed = 0;
        this.bulkTotal = 0;
        this.bulkStatus = '';
        this.isCompanyDropdownOpen = false;
        this.isBulkTrainingDropdownOpen = false;
    }
    clearEmailCertificates() {
        this.emailCompanyId = '';
        this.emailTrainingId = '';
        this.emailDateValue = '';
        this.emailCompanySearch = '';
        this.emailTrainingSearch = '';
        this.emailUserSearch = '';
        this.emailTrainingList = [];
        this.selectedEmailUserIds.clear();
        this.isEmailCompanyDropdownOpen = false;
        this.isEmailTrainingDropdownOpen = false;
        this.isEmailDateDropdownOpen = false;
        this.emailProcessed = 0;
        this.emailTotal = 0;
        this.emailStatus = '';
    }
    clearAll() {
        this.selectedCompanyId = '';
        this.selectedBulkTrainingId = '';
        this.companySearch = '';
        this.bulkTrainingSearch = '';
        this.bulkTrainingList = [];
        this.bulkProcessed = 0;
        this.bulkTotal = 0;
        this.bulkStatus = '';
        this.isCompanyDropdownOpen = false;
        this.isBulkTrainingDropdownOpen = false;
        this.emailCompanyId = '';
        this.emailTrainingId = '';
        this.emailDateValue = '';
        this.emailCompanySearch = '';
        this.emailTrainingSearch = '';
        this.emailUserSearch = '';
        this.emailTrainingList = [];
        this.selectedEmailUserIds.clear();
        this.isEmailCompanyDropdownOpen = false;
        this.isEmailTrainingDropdownOpen = false;
        this.isEmailDateDropdownOpen = false;
        this.emailProcessed = 0;
        this.emailTotal = 0;
        this.emailStatus = '';
        this.selectedTrainingId = '';
        this.selectedUserId = '';
        this.trainingSearch = '';
        this.userSearch = '';
        this.UserData = [];
        this.isTrainingDropdownOpen = false;
        this.isUserDropdownOpen = false;
        this.certificate = this.createEmptyCertificate();
        this.revokePreviewUrl();
    }
    preview() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runPdfAction(() => __awaiter(this, void 0, void 0, function* () {
                this.revokePreviewUrl();
                this.previewObjectUrl = yield this.pdfService.createPreviewUrl(this.certificate);
                this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewObjectUrl);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }), 'Certificate preview is ready.');
        });
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runPdfAction(() => this.pdfService.download(this.certificate), 'Certificate downloaded.');
        });
    }
    print() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runPdfAction(() => this.pdfService.print(this.certificate), 'Print dialog opened.');
        });
    }
    sendEmail() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isCertificateReady()) {
                this.notifier.warningToastr('Select a training and user, then complete all certificate fields.');
                return;
            }
            if (!this.authService.isServerAuthenticated()) {
                this.notifier.warningToastr('Sign in with your server account before sending certificate emails.', 'Authentication required');
                return;
            }
            const recipientEmail = String(((_a = this.selectedUser) === null || _a === void 0 ? void 0 : _a.email) || '').trim();
            if (!recipientEmail) {
                this.notifier.warningToastr('The selected participant does not have an email address.');
                return;
            }
            this.isSending = true;
            try {
                const bytes = yield this.pdfService.generate(this.certificate);
                const file = new File([new Blob([bytes], { type: 'application/pdf' })], this.getCertificateFileName(), { type: 'application/pdf' });
                yield firstValueFrom(this.apiClient.upload('CertificateOperation/send-email', file, {
                    recipientEmail,
                    recipientName: this.certificate.userName,
                    trainingName: this.certificate.trainingName,
                    certificateNumber: this.certificate.certificateNumber
                }));
                this.notifier.successToastr(`Certificate sent to ${recipientEmail}.`);
            }
            catch (error) {
                console.error('Certificate email failed', error);
                this.notifier.warningToastr('Could not send the certificate email.', 'Email failed');
            }
            finally {
                this.isSending = false;
            }
        });
    }
    getTrainingLabel(training) {
        return String(training.displayName || '').trim()
            || String(training.trainingName || '').trim()
            || String(training.trainingId || 'Training');
    }
    getTrainingTopicCount(training) {
        return this.parseTopics(training.topicCovered, this.getTrainingLabel(training), training.trainingId).length;
    }
    getTrainingUserCount(training) {
        return this.allUserData.filter((user) => { var _a; return String(user.trainingId) === String((_a = training.trainingId) !== null && _a !== void 0 ? _a : ''); }).length;
    }
    getUserLabel(user) {
        return [this.formatPersonName(user.userName || user.name), user.email].filter(Boolean).join(' - ');
    }
    formatPersonName(value) {
        return String(value !== null && value !== void 0 ? value : '')
            .trim()
            .replace(/\s+/g, ' ')
            .toLocaleLowerCase('en-IN')
            .replace(/(^|[\s'-])([a-z])/g, (_match, separator, letter) => `${separator}${letter.toUpperCase()}`);
    }
    normalizeParticipantName() {
        this.certificate.userName = this.formatPersonName(this.certificate.userName);
        this.revokePreviewUrl();
    }
    trackByUserId(_index, user) {
        var _a, _b;
        return String((_b = (_a = user.certificationDataId) !== null && _a !== void 0 ? _a : user.email) !== null && _b !== void 0 ? _b : _index);
    }
    trackByTrainingId(_index, training) {
        var _a;
        return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : training.displayName);
    }
    runPdfAction(action, successMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isCertificateReady()) {
                this.notifier.warningToastr('Select a training and user, then complete all certificate fields.');
                return;
            }
            this.isGenerating = true;
            try {
                yield action();
                this.notifier.successToastr(successMessage);
            }
            catch (error) {
                console.error('Certificate PDF generation failed', error);
                this.notifier.warningToastr('Could not generate the certificate PDF.', 'Generation failed');
            }
            finally {
                this.isGenerating = false;
            }
        });
    }
    getCertificateFileName() {
        const slug = `${this.certificate.userName}-${this.certificate.trainingName}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 60);
        return `${slug || 'training-certificate'}.pdf`;
    }
    isCertificateReady() {
        return !!this.selectedTrainingId && !!this.selectedUserId && !!this.certificate.userName.trim()
            && !!this.certificate.trainingName.trim() && !!this.certificate.certificateNumber.trim()
            && !!this.certificate.location.trim() && !!this.certificate.trainerName.trim()
            && this.certificate.trainingHours > 0;
    }
    // private loadTrainingList(): void {
    //   const headers = new HttpHeaders({ ETag: 'f88dd058fe004909615a64f01be66a7', 'Content-Type': 'application/json' });
    //   this.http.get('assets/Training.json', { headers, responseType: 'text' })
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //       next: (data) => {
    //         const decrypted = this.dataService.decrypt(data);
    //         this.trainingList = (decrypted?.Table || [])
    //           .map((item: any) => this.mapTraining(item))
    //           .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
    //       },
    //       error: () => {
    //         this.trainingList = [];
    //         this.notifier.warningToastr('Training list could not be loaded.');
    //       }
    //     });
    // }
    // Future API integration: call this method instead of loadTrainingList().
    loadTrainingList() {
        this.trainingService.getPaged(1, 100).pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                this.trainingList = (response.items || [])
                    .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
                this.updateBulkTrainingList(this.allUserData);
            },
            error: (error) => {
                console.error('Failed to load training data.', { status: error.status });
                this.trainingList = [];
                this.notifier.warningToastr('Training list could not be loaded.');
            }
        });
    }
    mapTraining(item) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        return {
            trainingId: (_e = (_d = (_c = (_b = (_a = item.trainingId) !== null && _a !== void 0 ? _a : item.TrainingId) !== null && _b !== void 0 ? _b : item.TrainingID) !== null && _c !== void 0 ? _c : item.Id) !== null && _d !== void 0 ? _d : item.id) !== null && _e !== void 0 ? _e : '',
            trainingName: (_h = (_g = (_f = item.trainingName) !== null && _f !== void 0 ? _f : item.TrainingName) !== null && _g !== void 0 ? _g : item.Name) !== null && _h !== void 0 ? _h : '',
            trainingDesc: (_l = (_k = (_j = item.trainingDesc) !== null && _j !== void 0 ? _j : item.TrainingDesc) !== null && _k !== void 0 ? _k : item.Description) !== null && _l !== void 0 ? _l : '',
            topicCovered: (_p = (_o = (_m = item.topicCovered) !== null && _m !== void 0 ? _m : item.TopicCovered) !== null && _o !== void 0 ? _o : item.TopicCoveredName) !== null && _p !== void 0 ? _p : '',
            displayName: (_s = (_r = (_q = item.displayName) !== null && _q !== void 0 ? _q : item.DisplayName) !== null && _r !== void 0 ? _r : item.TrainingName) !== null && _s !== void 0 ? _s : '',
            image: (_u = (_t = item.image) !== null && _t !== void 0 ? _t : item.Image) !== null && _u !== void 0 ? _u : '',
            displayOrder: Number((_w = (_v = item.displayOrder) !== null && _v !== void 0 ? _v : item.DisplayOrder) !== null && _w !== void 0 ? _w : 0)
        };
    }
    parseTopics(value, trainingName = '', trainingId) {
        if (!(value === null || value === void 0 ? void 0 : value.trim()))
            return this.getDefaultTopics(trainingName, trainingId);
        const plainText = value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
        const topics = plainText.split(',').map((topic) => topic.replace(/^[-\s]+/, '').trim()).filter(Boolean);
        return topics.length ? topics : this.getDefaultTopics(trainingName, trainingId);
    }
    getDefaultTopics(trainingName, trainingId) {
        const normalizedName = trainingName.toLowerCase();
        if (normalizedName.includes('ims internal')) {
            return [
                'Integrated Management System Requirements',
                'Internal Audit Planning and Execution',
                'Audit Findings and Corrective Actions'
            ];
        }
        if (normalizedName.includes('iatf') || normalizedName.includes('16949')) {
            return [
                'IATF 16949 Standard Requirements',
                'Automotive Process Approach',
                'Internal Audit Planning and Execution',
                'Nonconformity and Corrective Actions'
            ];
        }
        if (normalizedName.includes('core tool')) {
            return [
                'Advanced Product Quality Planning (APQP)',
                'Production Part Approval Process (PPAP)',
                'Statistical Process Control (SPC)',
                'Measurement System Analysis (MSA)',
                'Failure Mode and Effects Analysis (FMEA)',
                'Control Plan'
            ];
        }
        if (normalizedName.includes('7 qc') || normalizedName.includes('seven qc')) {
            return [
                'Check Sheet',
                'Histogram',
                'Pareto Chart',
                'Cause and Effect Diagram',
                'Scatter Diagram',
                'Control Chart',
                'Stratification'
            ];
        }
        const genericTopics = [
            'Introduction and Training Objectives',
            'Core Concepts and Terminology',
            'Process and System Requirements',
            'Practical Applications',
            'Case Studies and Exercises',
            'Assessment and Review',
            'Continuous Improvement Actions'
        ];
        const testCounts = [3, 4, 6, 7];
        const seed = `${trainingId !== null && trainingId !== void 0 ? trainingId : ''}${trainingName}`;
        const hash = seed.split('').reduce((total, character) => total + character.charCodeAt(0), 0);
        return genericTopics.slice(0, testCounts[hash % testCounts.length]);
    }
    createCertificateNumber(trainingId, userId = 'PENDING') {
        var _a;
        const date = new Date();
        const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
        const trainingCode = String(trainingId || 'TRN').replace(/\W/g, '').slice(-5).toUpperCase();
        const sequence = (((_a = userId.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.join('')) || '1').slice(-6).padStart(6, '0');
        return `QLSS/${trainingCode}/${date.getFullYear()}/${sequence}`;
    }
    loadCertificateUsers() {
        // const reqHeader = new HttpHeaders({
        //   'Content-Type': 'application/json'
        // });
        // this.http.get(environment.certificateUrl, { headers: reqHeader, responseType: 'text' })
        //   .pipe(takeUntil(this.destroy$))
        //   .subscribe({
        //     next: (data) => {
        //       const decryptedData = this.dataService.decrypt(data);
        //       this.allUserData = Array.isArray(decryptedData) ? decryptedData : [];
        //       this.getTrainingUsers();
        //     },
        //     error: () => {
        //       this.allUserData = [];
        //       this.UserData = [];
        //     }
        //   });
        this.trainingService.getCertificationData()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (data) => {
                this.allUserData = Array.isArray(data) ? data : [];
                this.getTrainingUsers();
            },
            error: () => {
                this.allUserData = [];
                this.UserData = [];
            }
        });
    }
    getTrainingUsers() {
        this.UserData = this.allUserData.filter((user) => String(user.trainingId) === this.selectedTrainingId);
    }
    loadCompanies() {
        this.clientService.getAll().pipe(takeUntil(this.destroy$)).subscribe({
            next: (companies) => {
                this.companies = (companies || [])
                    .filter((company) => company.isActive !== false)
                    .sort((a, b) => a.clientName.localeCompare(b.clientName));
            },
            error: () => this.notifier.warningToastr('Company list could not be loaded.')
        });
    }
    updateBulkTrainingList(records) {
        if (!this.selectedCompanyId) {
            this.bulkTrainingList = [];
            return;
        }
        const trainingIds = new Set(records
            .filter((record) => String(record.location) === this.selectedCompanyId)
            .map((record) => String(record.trainingId)));
        this.bulkTrainingList = this.trainingList.filter((training) => trainingIds.has(String(training.trainingId)));
    }
    filterBulkRecords(records) {
        return records.filter((record) => String(record.location) === this.selectedCompanyId
            && (!this.selectedBulkTrainingId || String(record.trainingId) === this.selectedBulkTrainingId)
            && !!String(record.certificationNumber || '').trim());
    }
    mapBulkCertificate(record) {
        var _a;
        const training = this.trainingList.find((item) => String(item.trainingId) === String(record.trainingId));
        const trainingName = training
            ? this.getTrainingLabel(training)
            : (record.trainingName || `Training ${record.trainingId}`);
        return {
            userName: this.formatPersonName(record.userName || record.name),
            coveredTopics: this.parseTopics(training === null || training === void 0 ? void 0 : training.topicCovered, trainingName, record.trainingId),
            completionType: record.completionType || 'assessment',
            marks: (_a = record.totalPoints) !== null && _a !== void 0 ? _a : null,
            passingMarks: 60,
            trainingName,
            certificateNumber: record.certificationNumber,
            trainingHours: Number(record.days || 0) * 8,
            location: record.location || '',
            trainerName: record.trainerName || '',
            dateOfIssue: this.toDateInputValue(record.issuedDate || record.date)
        };
    }
    chooseZipLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const pickerWindow = window;
            if (!pickerWindow.showSaveFilePicker)
                return null;
            return pickerWindow.showSaveFilePicker({
                suggestedName: `${this.getSelectedCompanyFileName()}_Certificates.zip`,
                types: [{ description: 'ZIP archive', accept: { 'application/zip': ['.zip'] } }]
            });
        });
    }
    saveZip(blob, fileHandle) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fileHandle) {
                const writable = yield fileHandle.createWritable();
                yield writable.write(blob);
                yield writable.close();
                return;
            }
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${this.getSelectedCompanyFileName()}_Certificates.zip`;
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        });
    }
    getSelectedCompanyFileName() {
        const company = this.companies.find((item) => String(item.clientId) === this.selectedCompanyId);
        return this.sanitizeFilePart(company === null || company === void 0 ? void 0 : company.clientName, 'Company');
    }
    sanitizeFilePart(value, fallback) {
        const sanitized = String(value !== null && value !== void 0 ? value : '')
            .normalize('NFKC')
            .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
            .replace(/[.\s]+$/g, '')
            .trim()
            .slice(0, 100);
        return sanitized || fallback;
    }
    yieldToBrowser() {
        return new Promise((resolve) => setTimeout(resolve, 0));
    }
    getRecordDateValue(record) {
        return this.toDateInputValue((record === null || record === void 0 ? void 0 : record.issuedDate) || (record === null || record === void 0 ? void 0 : record.date) || (record === null || record === void 0 ? void 0 : record.certificationDate));
    }
    formatDisplayDate(value) {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
        return match ? `${match[3]}-${match[2]}-${match[1]}` : value;
    }
    toDateInputValue(value) {
        if (value instanceof Date) {
            return Number.isNaN(value.getTime()) ? '' : this.formatDateParts(value.getFullYear(), value.getMonth() + 1, value.getDate());
        }
        const text = String(value !== null && value !== void 0 ? value : '').trim();
        if (!text)
            return '';
        // SQL/HTML date formats: yyyy-MM-dd, yyyy/MM/dd, with an optional time.
        const yearFirst = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/.exec(text);
        if (yearFirst) {
            return this.formatDateParts(Number(yearFirst[1]), Number(yearFirst[2]), Number(yearFirst[3]));
        }
        // Bulk-upload dates use the Indian day-first convention.
        const dayFirst = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[T\s].*)?$/.exec(text);
        if (dayFirst) {
            return this.formatDateParts(Number(dayFirst[3]), Number(dayFirst[2]), Number(dayFirst[1]));
        }
        // Supports unambiguous values such as "28 Jul 2026" without throwing.
        const parsed = new Date(text);
        return Number.isNaN(parsed.getTime()) ? '' : this.formatDateParts(parsed.getFullYear(), parsed.getMonth() + 1, parsed.getDate());
    }
    formatDateParts(year, month, day) {
        const candidate = new Date(year, month - 1, day);
        const isValid = candidate.getFullYear() === year
            && candidate.getMonth() === month - 1
            && candidate.getDate() === day;
        return isValid
            ? `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            : '';
    }
    createEmptyCertificate() {
        return {
            userName: '',
            coveredTopics: [],
            completionType: 'assessment',
            marks: null,
            passingMarks: 60,
            trainingName: '',
            certificateNumber: '',
            trainingHours: 8,
            location: 'Pune, India',
            trainerName: 'QLSS Training Faculty',
            dateOfIssue: new Date().toISOString().slice(0, 10)
        };
    }
    revokePreviewUrl() {
        if (this.previewObjectUrl)
            URL.revokeObjectURL(this.previewObjectUrl);
        this.previewObjectUrl = '';
        this.previewUrl = null;
    }
}
PrintCertificateComponent.ɵfac = function PrintCertificateComponent_Factory(t) { return new (t || PrintCertificateComponent)(i0.ɵɵdirectiveInject(i1.HttpClient), i0.ɵɵdirectiveInject(i2.DataService), i0.ɵɵdirectiveInject(i3.CertificatePdfService), i0.ɵɵdirectiveInject(i4.NotifierService), i0.ɵɵdirectiveInject(i5.DomSanitizer), i0.ɵɵdirectiveInject(i6.TrainingManagementService), i0.ɵɵdirectiveInject(i7.ApiClientService), i0.ɵɵdirectiveInject(i8.AuthService), i0.ɵɵdirectiveInject(i9.ClientManagementService)); };
PrintCertificateComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PrintCertificateComponent, selectors: [["app-print-certificate"]], decls: 206, vars: 57, consts: [[1, "certificate-page"], [1, "container", "certificate-shell"], [1, "page-header"], [1, "eyebrow"], ["routerLink", "/admin/create-test", 1, "btn", "btn-outline"], ["aria-labelledby", "certificateOperationsHeading", 1, "operations-section"], [1, "operations-heading"], ["id", "certificateOperationsHeading"], [1, "bulk-email-grid"], [1, "form-card", "bulk-card"], [1, "section-heading"], [1, "card-kicker"], ["type", "button", "aria-label", "Clear bulk certificate download selections", 1, "card-clear", 3, "disabled", "click"], ["aria-hidden", "true", 1, "fas", "fa-rotate-left"], [1, "field-label"], [1, "search-select"], ["type", "button", 1, "select-toggle", 3, "disabled", "click"], ["aria-hidden", "true"], ["class", "select-menu", "role", "listbox", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", "bulk-download", 3, "disabled", "click"], ["class", "bulk-progress", "role", "status", "aria-live", "polite", 4, "ngIf"], [1, "form-card", "email-card"], [1, "section-heading", "email-heading"], ["aria-hidden", "true", 1, "email-icon"], [1, "fas", "fa-envelope"], ["type", "button", "aria-label", "Clear email certificate selections", 1, "card-clear", 3, "disabled", "click"], [1, "email-step"], [1, "email-selector-grid"], [1, "email-date-field"], [1, "required-label"], ["class", "select-menu date-menu", "role", "listbox", 4, "ngIf"], ["class", "email-recipient-section", 4, "ngIf"], [1, "operations-heading", "workspace-heading"], ["id", "individualCertificateHeading"], ["aria-labelledby", "individualCertificateHeading", 1, "workspace-grid"], [1, "certificate-form", 3, "submit"], [1, "form-card", "training-card"], ["aria-label", "Step 1", 1, "step-badge"], ["type", "button", 1, "select-toggle", 3, "click"], [1, "form-card"], ["aria-label", "Step 2", 1, "step-badge"], [1, "form-grid"], [1, "full"], ["type", "text", "name", "userName", 3, "ngModel", "ngModelChange", "blur"], ["type", "text", "name", "trainingName", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "0.5", "step", "0.5", "name", "trainingHours", 3, "ngModel", "ngModelChange"], ["type", "date", "name", "dateOfIssue", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "location", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "trainerName", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "certificateNumber", 3, "ngModel", "ngModelChange"], ["rows", "5", "name", "coveredTopics", "placeholder", "Topic one, Topic two, Topic three, Topic four", 3, "ngModel", "ngModelChange"], [1, "action-bar"], ["type", "button", 1, "btn", "btn-outline", "btn-clear", 3, "disabled", "click"], [1, "fas", "fa-rotate-left"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], ["aria-hidden", "true", 1, "fas", "fa-eye"], ["type", "button", 1, "btn", "btn-outline", 3, "disabled", "click"], ["aria-hidden", "true", 1, "fas", "fa-download"], [1, "preview-card"], [1, "preview-heading"], [1, "page-size"], ["title", "Certificate PDF preview", 3, "src", 4, "ngIf", "ngIfElse"], ["previewPlaceholder", ""], ["role", "listbox", 1, "select-menu"], ["type", "search", "name", "companySearch", "placeholder", "Search company", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["class", "empty-option", 4, "ngIf"], ["type", "button", 3, "click"], [1, "empty-option"], ["type", "search", "name", "bulkTrainingSearch", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "button", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["role", "status", "aria-live", "polite", 1, "bulk-progress"], [4, "ngIf"], [3, "value", "max", 4, "ngIf"], [3, "value", "max"], ["type", "search", "name", "emailCompanySearch", "placeholder", "Search company", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "search", "name", "emailTrainingSearch", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["role", "listbox", 1, "select-menu", "date-menu"], ["aria-hidden", "true", 1, "fas", "fa-calendar-day"], [1, "email-recipient-section"], [1, "recipient-toolbar"], [1, "recipient-search"], ["aria-hidden", "true", 1, "fas", "fa-search"], ["type", "search", "name", "emailUserSearch", "placeholder", "Search name, email or certificate number", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "selection-toggle", 3, "disabled", "click"], [1, "recipient-summary"], ["class", "recipient-list", 4, "ngIf", "ngIfElse"], ["noEmailUsers", ""], [1, "email-send-bar"], ["type", "button", 1, "btn", "btn-email", 3, "disabled", "click"], ["aria-hidden", "true", 1, "fas", "fa-paper-plane"], ["class", "bulk-progress email-progress", "role", "status", "aria-live", "polite", 4, "ngIf"], [1, "recipient-list"], ["class", "recipient-row", 3, "is-selected", "is-unavailable", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "recipient-row"], ["type", "checkbox", 3, "checked", "disabled", "change"], [1, "recipient-avatar"], [1, "recipient-details"], [1, "certificate-ref"], [1, "recipient-empty"], ["role", "status", "aria-live", "polite", 1, "bulk-progress", "email-progress"], ["type", "search", "name", "trainingSearch", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "search", "name", "userSearch", "placeholder", "Search by name, email or certificate number", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["title", "Certificate PDF preview", 3, "src"], [1, "preview-placeholder"], [1, "document-icon"]], template: function PrintCertificateComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "header", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin Facility");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Certificate Center");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Create, download, print, or email professional A4 landscape certificates from one workspace.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "a", 4);
        i0.ɵɵtext(11, "Create Test");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(12, "section", 5)(13, "div", 6)(14, "div")(15, "span", 3);
        i0.ɵɵtext(16, "Batch Operations");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "h2", 7);
        i0.ɵɵtext(18, "Certificate Operations");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "p");
        i0.ɵɵtext(20, "Download certificate batches or email certificates to selected participants.");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(21, "div", 8)(22, "section", 9)(23, "div", 10)(24, "div")(25, "span", 11);
        i0.ɵɵtext(26, "Bulk Export");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "h2");
        i0.ɵɵtext(28, "Bulk Certificate Download");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "p");
        i0.ɵɵtext(30, "Download organized certificate batches by company and training.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(31, "button", 12);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_31_listener() { return ctx.clearBulkDownload(); });
        i0.ɵɵelement(32, "i", 13);
        i0.ɵɵtext(33, " Clear");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(34, "label", 14);
        i0.ɵɵtext(35, "Company");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 15)(37, "button", 16);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_37_listener() { return ctx.toggleCompanyDropdown(); });
        i0.ɵɵelementStart(38, "span");
        i0.ɵɵtext(39);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(40, "span", 17);
        i0.ɵɵtext(41, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(42, PrintCertificateComponent_div_42_Template, 4, 3, "div", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "label", 14);
        i0.ɵɵtext(44, "Training (optional)");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 15)(46, "button", 16);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_46_listener() { return ctx.toggleBulkTrainingDropdown(); });
        i0.ɵɵelementStart(47, "span");
        i0.ɵɵtext(48);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(49, "span", 17);
        i0.ɵɵtext(50, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(51, PrintCertificateComponent_div_51_Template, 9, 4, "div", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "button", 19);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_52_listener() { return ctx.downloadAllCertificates(); });
        i0.ɵɵtext(53);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(54, PrintCertificateComponent_div_54_Template, 5, 3, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "section", 21)(56, "div", 22)(57, "span", 23);
        i0.ɵɵelement(58, "i", 24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(59, "div")(60, "span", 11);
        i0.ɵɵtext(61, "Email Delivery");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(62, "h2");
        i0.ɵɵtext(63, "Email Certificates");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(64, "p");
        i0.ɵɵtext(65, "Send personalized certificate PDFs to multiple participants for a selected company, training, and date.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(66, "button", 25);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_66_listener() { return ctx.clearEmailCertificates(); });
        i0.ɵɵelement(67, "i", 13);
        i0.ɵɵtext(68, " Clear");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(69, "div", 26)(70, "span");
        i0.ɵɵtext(71, "1");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(72, "strong");
        i0.ɵɵtext(73, "Choose company, training & date");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(74, "div", 27)(75, "div")(76, "label", 14);
        i0.ɵɵtext(77, "Company");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(78, "div", 15)(79, "button", 16);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_79_listener() { return ctx.toggleEmailCompanyDropdown(); });
        i0.ɵɵelementStart(80, "span");
        i0.ɵɵtext(81);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(82, "span", 17);
        i0.ɵɵtext(83, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(84, PrintCertificateComponent_div_84_Template, 4, 3, "div", 18);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(85, "div")(86, "label", 14);
        i0.ɵɵtext(87, "Training");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(88, "div", 15)(89, "button", 16);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_89_listener() { return ctx.toggleEmailTrainingDropdown(); });
        i0.ɵɵelementStart(90, "span");
        i0.ɵɵtext(91);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(92, "span", 17);
        i0.ɵɵtext(93, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(94, PrintCertificateComponent_div_94_Template, 4, 4, "div", 18);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(95, "div", 28)(96, "label", 14);
        i0.ɵɵtext(97, "Certificate date ");
        i0.ɵɵelementStart(98, "span", 29);
        i0.ɵɵtext(99, "Required");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(100, "div", 15)(101, "button", 16);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_101_listener() { return ctx.toggleEmailDateDropdown(); });
        i0.ɵɵelementStart(102, "span");
        i0.ɵɵtext(103);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(104, "span", 17);
        i0.ɵɵtext(105, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(106, PrintCertificateComponent_div_106_Template, 3, 2, "div", 30);
        i0.ɵɵelementEnd()()();
        i0.ɵɵtemplate(107, PrintCertificateComponent_div_107_Template, 32, 10, "div", 31);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(108, "div", 32)(109, "div")(110, "span", 3);
        i0.ɵɵtext(111, "Individual Certificate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(112, "h2", 33);
        i0.ɵɵtext(113, "Create & Preview Certificate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(114, "p");
        i0.ɵɵtext(115, "Select one training and participant, review the certificate details, then preview, download, or email it.");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(116, "div", 34)(117, "form", 35);
        i0.ɵɵlistener("submit", function PrintCertificateComponent_Template_form_submit_117_listener($event) { return $event.preventDefault(); });
        i0.ɵɵelementStart(118, "section", 36)(119, "div", 10)(120, "span", 37);
        i0.ɵɵtext(121, "1");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(122, "div")(123, "h2");
        i0.ɵɵtext(124, "Training & participant");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(125, "p");
        i0.ɵɵtext(126, "Topics are brought in automatically from the selected training.");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(127, "label", 14);
        i0.ɵɵtext(128, "Training");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(129, "div", 15)(130, "button", 38);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_130_listener() { return ctx.toggleTrainingDropdown(); });
        i0.ɵɵelementStart(131, "span");
        i0.ɵɵtext(132);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(133, "span", 17);
        i0.ɵɵtext(134, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(135, PrintCertificateComponent_div_135_Template, 4, 4, "div", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(136, "label", 14);
        i0.ɵɵtext(137, "Participant");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(138, "div", 15)(139, "button", 16);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_139_listener() { return ctx.toggleUserDropdown(); });
        i0.ɵɵelementStart(140, "span");
        i0.ɵɵtext(141);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(142, "span", 17);
        i0.ɵɵtext(143, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(144, PrintCertificateComponent_div_144_Template, 4, 4, "div", 18);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(145, "section", 39)(146, "div", 10)(147, "span", 40);
        i0.ɵɵtext(148, "2");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(149, "div")(150, "h2");
        i0.ɵɵtext(151, "Certificate details");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(152, "p");
        i0.ɵɵtext(153, "All fields remain editable before generation.");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(154, "div", 41)(155, "label", 42);
        i0.ɵɵtext(156, "Participant name");
        i0.ɵɵelementStart(157, "input", 43);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_input_ngModelChange_157_listener($event) { return ctx.certificate.userName = $event; })("blur", function PrintCertificateComponent_Template_input_blur_157_listener() { return ctx.normalizeParticipantName(); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(158, "label", 42);
        i0.ɵɵtext(159, "Training name");
        i0.ɵɵelementStart(160, "input", 44);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_input_ngModelChange_160_listener($event) { return ctx.certificate.trainingName = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(161, "label");
        i0.ɵɵtext(162, "Training hours");
        i0.ɵɵelementStart(163, "input", 45);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_input_ngModelChange_163_listener($event) { return ctx.certificate.trainingHours = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(164, "label");
        i0.ɵɵtext(165, "Date of issue");
        i0.ɵɵelementStart(166, "input", 46);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_input_ngModelChange_166_listener($event) { return ctx.certificate.dateOfIssue = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(167, "label");
        i0.ɵɵtext(168, "Location");
        i0.ɵɵelementStart(169, "input", 47);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_input_ngModelChange_169_listener($event) { return ctx.certificate.location = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(170, "label");
        i0.ɵɵtext(171, "Trainer name");
        i0.ɵɵelementStart(172, "input", 48);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_input_ngModelChange_172_listener($event) { return ctx.certificate.trainerName = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(173, "label", 42);
        i0.ɵɵtext(174, "Certificate number");
        i0.ɵɵelementStart(175, "input", 49);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_input_ngModelChange_175_listener($event) { return ctx.certificate.certificateNumber = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(176, "label", 42);
        i0.ɵɵtext(177, "Covered topics");
        i0.ɵɵelementStart(178, "textarea", 50);
        i0.ɵɵlistener("ngModelChange", function PrintCertificateComponent_Template_textarea_ngModelChange_178_listener($event) { return ctx.updateTopics($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(179, "small");
        i0.ɵɵtext(180, "Enter 4 to 6 topics separated by commas. Each topic uses its own colored bullet line in the PDF.");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(181, "div", 51)(182, "button", 52);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_182_listener() { return ctx.clearAll(); });
        i0.ɵɵelement(183, "i", 53);
        i0.ɵɵtext(184, " Clear All");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(185, "button", 54);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_185_listener() { return ctx.preview(); });
        i0.ɵɵelement(186, "i", 55);
        i0.ɵɵtext(187);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(188, "button", 56);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_188_listener() { return ctx.download(); });
        i0.ɵɵelement(189, "i", 57);
        i0.ɵɵtext(190, " Download");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(191, "button", 56);
        i0.ɵɵlistener("click", function PrintCertificateComponent_Template_button_click_191_listener() { return ctx.sendEmail(); });
        i0.ɵɵelement(192, "i", 24);
        i0.ɵɵtext(193);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(194, "aside", 58)(195, "div", 59)(196, "div")(197, "span");
        i0.ɵɵtext(198, "Live output");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(199, "h2");
        i0.ɵɵtext(200, "PDF Preview");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(201, "span", 60);
        i0.ɵɵtext(202, "A4 Landscape");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(203, PrintCertificateComponent_iframe_203_Template, 1, 1, "iframe", 61);
        i0.ɵɵtemplate(204, PrintCertificateComponent_ng_template_204_Template, 7, 0, "ng-template", null, 62, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        const _r10 = i0.ɵɵreference(205);
        i0.ɵɵadvance(22);
        i0.ɵɵclassProp("dropdown-open", ctx.isCompanyDropdownOpen || ctx.isBulkTrainingDropdownOpen);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("disabled", ctx.isBulkGenerating);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("disabled", ctx.isBulkGenerating);
        i0.ɵɵattribute("aria-expanded", ctx.isCompanyDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedCompany ? ctx.selectedCompany.clientName : "Select Company");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isCompanyDropdownOpen);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("disabled", !ctx.selectedCompanyId || ctx.isBulkGenerating);
        i0.ɵɵattribute("aria-expanded", ctx.isBulkTrainingDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedBulkTraining ? ctx.getTrainingLabel(ctx.selectedBulkTraining) : ctx.selectedCompanyId ? "All trainings" : "Select company first");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isBulkTrainingDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.selectedCompanyId || ctx.isBulkGenerating);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.isBulkGenerating ? "Generating..." : "Download All Certificates", " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.bulkStatus);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("dropdown-open", ctx.isEmailCompanyDropdownOpen || ctx.isEmailTrainingDropdownOpen || ctx.isEmailDateDropdownOpen);
        i0.ɵɵadvance(11);
        i0.ɵɵproperty("disabled", ctx.isBulkEmailSending);
        i0.ɵɵadvance(13);
        i0.ɵɵproperty("disabled", ctx.isBulkEmailSending);
        i0.ɵɵattribute("aria-expanded", ctx.isEmailCompanyDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedEmailCompany ? ctx.selectedEmailCompany.clientName : "Select company");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isEmailCompanyDropdownOpen);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("disabled", !ctx.emailCompanyId || ctx.isBulkEmailSending);
        i0.ɵɵattribute("aria-expanded", ctx.isEmailTrainingDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedEmailTraining ? ctx.getTrainingLabel(ctx.selectedEmailTraining) : ctx.emailCompanyId ? "Select training" : "Select company first");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isEmailTrainingDropdownOpen);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("disabled", !ctx.emailTrainingId || ctx.isBulkEmailSending);
        i0.ɵɵattribute("aria-expanded", ctx.isEmailDateDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedEmailDateLabel || (ctx.emailTrainingId ? "Select certificate date" : "Select training first"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isEmailDateDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.emailDateValue);
        i0.ɵɵadvance(11);
        i0.ɵɵclassProp("dropdown-open", ctx.isTrainingDropdownOpen || ctx.isUserDropdownOpen);
        i0.ɵɵadvance(12);
        i0.ɵɵattribute("aria-expanded", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedTraining ? ctx.getTrainingLabel(ctx.selectedTraining) : "Select Training");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("disabled", !ctx.selectedTrainingId);
        i0.ɵɵattribute("aria-expanded", ctx.isUserDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.selectedUser ? ctx.getUserLabel(ctx.selectedUser) : ctx.selectedTrainingId ? "Select User" : "Select training first");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isUserDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("is-disabled", !ctx.selectedUserId);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("ngModel", ctx.certificate.userName);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.certificate.trainingName);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.certificate.trainingHours);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.certificate.dateOfIssue);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.certificate.location);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.certificate.trainerName);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.certificate.certificateNumber);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.certificate.coveredTopics.join(", "));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("disabled", ctx.isGenerating || ctx.isSending || ctx.isBulkGenerating || ctx.isBulkEmailSending);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("disabled", ctx.isGenerating || ctx.isSending);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.isGenerating ? "Generating..." : "Preview PDF", "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.isGenerating || ctx.isSending);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("disabled", ctx.isGenerating || ctx.isSending);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.isSending ? "Sending..." : "Send to Email", "");
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngIf", ctx.previewUrl)("ngIfElse", _r10);
    } }, dependencies: [i10.NgForOf, i10.NgIf, i11.RouterLinkWithHref, i12.ɵNgNoValidate, i12.DefaultValueAccessor, i12.NumberValueAccessor, i12.NgControlStatus, i12.NgControlStatusGroup, i12.MinValidator, i12.NgModel, i12.NgForm, i10.UpperCasePipe], styles: ["[_nghost-%COMP%] { display: block; }\n\n.certificate-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 120px 0 64px;\n  background: linear-gradient(145deg, #f3f7fb 0%, #fbfaf7 55%, #eef4f8 100%);\n  color: #14283d;\n}\n\n.certificate-shell[_ngcontent-%COMP%] { max-width: 1440px; margin: 0 auto; padding: 0 28px; }\n.page-header[_ngcontent-%COMP%] { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }\n.eyebrow[_ngcontent-%COMP%] { color: #a4742b; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 6px 0 8px; font-size: clamp(30px, 4vw, 46px); line-height: 1; }\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { max-width: 700px; margin: 0; color: #5d6b78; line-height: 1.6; }\n\n.operations-section[_ngcontent-%COMP%] { margin-bottom: 30px; }\n.operations-heading[_ngcontent-%COMP%] { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 14px; padding: 0 3px; }\n.operations-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 4px 0 5px; color: #14283d; font-size: 24px; }\n.operations-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #687784; font-size: 13px; line-height: 1.5; }\n.workspace-heading[_ngcontent-%COMP%] { margin-top: 4px; margin-bottom: 14px; padding-top: 2px; border-top: 1px solid rgba(180, 195, 205, .55); }\n.workspace-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { padding-top: 22px; }\n.bulk-email-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(320px, .8fr) minmax(520px, 1.2fr); gap: 22px; align-items: start; }\n.bulk-email-grid[_ngcontent-%COMP%]    > .form-card[_ngcontent-%COMP%] { margin: 0; border-width: 1px; border-style: solid; box-shadow: 0 16px 42px rgba(30,55,77,.1); }\n.bulk-email-grid[_ngcontent-%COMP%]    > .bulk-card[_ngcontent-%COMP%] { border-color: #dcc9a8; border-top: 3px solid #b37a24; }\n.bulk-email-grid[_ngcontent-%COMP%]    > .email-card[_ngcontent-%COMP%] { border-color: #bad7ca; border-top: 3px solid #16734a; }\n.bulk-email-grid[_ngcontent-%COMP%]   .section-heading[_ngcontent-%COMP%] { align-items: flex-start; justify-content: space-between; }\n.bulk-email-grid[_ngcontent-%COMP%]   .section-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.card-kicker[_ngcontent-%COMP%] { display: block; margin-bottom: 4px; color: #8b6a37; font-size: 9px; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }\n.email-card[_ngcontent-%COMP%]   .card-kicker[_ngcontent-%COMP%] { color: #16734a; }\n.card-clear[_ngcontent-%COMP%] { display: inline-flex; flex: 0 0 auto; min-height: 32px; align-items: center; gap: 6px; margin: -3px -2px 0 8px; padding: 0 10px; border: 1px solid #c8d5dd; border-radius: 8px; background: #fff; color: #536b7c; font-size: 10px; font-weight: 800; cursor: pointer; }\n.card-clear[_ngcontent-%COMP%]:hover { border-color: #9eafba; background: #f4f7f9; color: #173a57; }\n.card-clear[_ngcontent-%COMP%]:disabled { opacity: .5; cursor: wait; }\n.workspace-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(390px, .85fr) minmax(520px, 1.35fr); gap: 26px; align-items: start; overflow: visible; }\n.certificate-form[_ngcontent-%COMP%] { position: relative; display: grid; gap: 18px; overflow: visible; }\n.form-card[_ngcontent-%COMP%], .preview-card[_ngcontent-%COMP%] { background: rgba(255,255,255,.96); border: 1px solid #dce5ec; border-radius: 18px; box-shadow: 0 18px 48px rgba(30,55,77,.08); }\n.workspace-grid[_ngcontent-%COMP%]   .form-card[_ngcontent-%COMP%] { border-top: 3px solid #173a57; }\n.workspace-grid[_ngcontent-%COMP%]   .preview-card[_ngcontent-%COMP%] { border-top: 3px solid #b37a24; }\n.form-card[_ngcontent-%COMP%] { position: relative; z-index: 1; overflow: visible; padding: 24px; }\n.training-card[_ngcontent-%COMP%] { z-index: 2; }\n.bulk-card[_ngcontent-%COMP%] { z-index: 3; }\n.bulk-download[_ngcontent-%COMP%] { width: 100%; margin-top: 20px; }\n.bulk-progress[_ngcontent-%COMP%] { margin-top: 14px; }\n.bulk-progress[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: 12px; margin: 0 0 7px; color: #536879; font-size: 13px; }\n.bulk-progress[_ngcontent-%COMP%]   progress[_ngcontent-%COMP%] { width: 100%; height: 10px; accent-color: #173a57; }\n.training-card.dropdown-open[_ngcontent-%COMP%] { z-index: 100; }\n.form-card.is-disabled[_ngcontent-%COMP%] { opacity: .66; }\n.section-heading[_ngcontent-%COMP%] { display: flex; gap: 13px; align-items: flex-start; margin-bottom: 20px; }\n.section-heading[_ngcontent-%COMP%]    > .step-badge[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 0 0 32px;\n  width: 32px;\n  height: 32px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: #142f49;\n  color: #fff;\n  font-family: Arial, Helvetica, sans-serif !important;\n  font-size: 17px;\n  font-style: normal;\n  font-weight: 700;\n  font-variant-numeric: lining-nums;\n  line-height: 1;\n}\n.section-heading[_ngcontent-%COMP%]    > .step-badge[_ngcontent-%COMP%]::before, .section-heading[_ngcontent-%COMP%]    > .step-badge[_ngcontent-%COMP%]::after { content: none !important; display: none !important; }\n.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 1px 0 4px; font-size: 18px; }\n.section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #74818c; font-size: 13px; }\n\n.field-label[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { display: grid; gap: 7px; margin-top: 14px; color: #354a5d; font-size: 12px; font-weight: 750; letter-spacing: .02em; }\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], .select-toggle[_ngcontent-%COMP%] { width: 100%; border: 1px solid #cdd9e2; border-radius: 10px; background: #fff; color: #172d42; font: inherit; font-size: 14px; font-weight: 500; outline: none; }\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%], .select-toggle[_ngcontent-%COMP%] { min-height: 45px; padding: 0 13px; }\ntextarea[_ngcontent-%COMP%] { padding: 12px 13px; resize: vertical; line-height: 1.5; }\ninput[_ngcontent-%COMP%]:focus, select[_ngcontent-%COMP%]:focus, textarea[_ngcontent-%COMP%]:focus, .select-toggle[_ngcontent-%COMP%]:focus { border-color: #a4742b; box-shadow: 0 0 0 3px rgba(164,116,43,.12); }\nselect[_ngcontent-%COMP%]:disabled { background: #f1f4f6; cursor: not-allowed; }\n\n.search-select[_ngcontent-%COMP%] { position: relative; }\n.select-toggle[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 12px; text-align: left; cursor: pointer; }\n.select-toggle[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.select-toggle[_ngcontent-%COMP%]:disabled { background: #f1f4f6; color: #7b8791; cursor: not-allowed; }\n.select-menu[_ngcontent-%COMP%] { position: absolute; z-index: 200; top: calc(100% + 7px); left: 0; right: 0; max-height: 360px; overflow-y: auto; padding: 9px; border: 1px solid #ccd8e2; border-radius: 12px; background: #fff; box-shadow: 0 18px 42px rgba(18,45,67,.24); }\n.select-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { margin-bottom: 7px; }\n.select-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { display: grid; width: 100%; gap: 2px; padding: 10px; border: 0; border-radius: 8px; background: transparent; color: #1d3449; text-align: left; cursor: pointer; }\n.select-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover { background: #edf4f8; }\n.select-menu[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { overflow: hidden; color: #71808c; text-overflow: ellipsis; white-space: nowrap; }\n.empty-option[_ngcontent-%COMP%] { margin: 10px; color: #73808c; text-align: center; }\n\n.result-strip[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 18px; padding: 14px; border: 1px solid #d6e5dc; border-radius: 12px; background: #f2f9f4; }\n.result-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { display: grid; gap: 2px; }\n.result-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #65806e; font-size: 11px; text-transform: uppercase; }\n.result-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 14px; }\n.result-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { grid-column: 1 / -1; margin: 4px 0 0; color: #315b40; font-size: 13px; }\n.form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }\n.form-grid[_ngcontent-%COMP%]   .full[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n\n.action-bar[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; padding: 4px 0; }\n.btn[_ngcontent-%COMP%] { display: inline-flex; min-width: 0; min-height: 43px; align-items: center; justify-content: center; gap: 7px; padding: 0 10px; border: 1px solid transparent; border-radius: 10px; font-size: 11px; font-weight: 750; line-height: 1.2; text-align: center; text-decoration: none; cursor: pointer; white-space: nowrap; }\r\n.action-bar[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { flex: 0 0 auto; font-size: 12px; }\n.btn-primary[_ngcontent-%COMP%] { background: #173a57; color: #fff; }\n.btn-primary[_ngcontent-%COMP%]:hover { background: #0e2b43; }\n.btn-outline[_ngcontent-%COMP%] { border-color: #b8c8d4; background: #fff; color: #173a57; }\n.btn[_ngcontent-%COMP%]:disabled { opacity: .55; cursor: wait; }\n\n.preview-card[_ngcontent-%COMP%] { position: sticky; z-index: 0; top: 105px; overflow: hidden; }\n.preview-heading[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid #e1e8ed; }\n.preview-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #8b6a37; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }\n.preview-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: 18px; }\n.preview-heading[_ngcontent-%COMP%]   .page-size[_ngcontent-%COMP%] { padding: 6px 8px; border-radius: 6px; background: #eef3f6; color: #5e6d79; letter-spacing: .04em; }\n.preview-card[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] { display: block; width: 100%; height: min(72vh, 720px); border: 0; background: #51575d; }\n.preview-placeholder[_ngcontent-%COMP%] { display: grid; min-height: 520px; place-items: center; align-content: center; padding: 48px; color: #788691; text-align: center; }\n.preview-placeholder[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 16px 0 7px; color: #30485b; }\n.preview-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { max-width: 330px; margin: 0; line-height: 1.6; }\n.document-icon[_ngcontent-%COMP%] { display: grid; width: 74px; height: 88px; place-items: center; border: 2px solid #c69245; border-radius: 8px; color: #9a6820; font-weight: 900; box-shadow: 8px 8px 0 #edf2f5; }\n\n.email-card[_ngcontent-%COMP%] { width: 100%; min-width: 0; z-index: 2; border-color: #d5e5df; background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(246,251,249,.98)); }\n.email-card.dropdown-open[_ngcontent-%COMP%] { z-index: 110; }\n.email-heading[_ngcontent-%COMP%] { margin-bottom: 16px; }\n.email-icon[_ngcontent-%COMP%] { display: grid; flex: 0 0 38px; width: 38px; height: 38px; place-items: center; border-radius: 11px; background: #e8f5ef; color: #16734a; font-size: 16px; }\n.email-step[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; margin: 18px 0 2px; color: #2f4858; font-size: 12px; letter-spacing: .02em; }\n.email-step[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { display: grid; width: 22px; height: 22px; place-items: center; border-radius: 50%; background: #16734a; color: #fff; font-size: 11px; }\n.email-selector-grid[_ngcontent-%COMP%] { display: grid; width: 100%; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; align-items: end; }\n.email-selector-grid[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { min-width: 0; }\n.email-selector-grid[_ngcontent-%COMP%]   .search-select[_ngcontent-%COMP%], .email-selector-grid[_ngcontent-%COMP%]   .select-toggle[_ngcontent-%COMP%], .email-selector-grid[_ngcontent-%COMP%]   .select-menu[_ngcontent-%COMP%], .email-selector-grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { box-sizing: border-box; width: 100%; min-width: 0; }\n.email-selector-grid[_ngcontent-%COMP%]   .select-menu[_ngcontent-%COMP%] { right: 0; left: 0; }\n.email-selector-grid[_ngcontent-%COMP%]   .select-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { min-width: 0; }\n.email-selector-grid[_ngcontent-%COMP%]   .select-menu[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .email-selector-grid[_ngcontent-%COMP%]   .select-menu[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.email-date-field[_ngcontent-%COMP%] { grid-column: auto; }\n.required-label[_ngcontent-%COMP%] { display: inline-flex; margin-left: 5px; padding: 2px 6px; border-radius: 999px; background: #fff0e7; color: #b34e16; font-size: 8px; font-weight: 850; letter-spacing: .06em; text-transform: uppercase; vertical-align: middle; }\n.date-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 7px; }\n.date-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #16734a; }\n.email-recipient-section[_ngcontent-%COMP%] { margin-top: 20px; padding-top: 2px; border-top: 1px solid #dce9e3; }\n.recipient-toolbar[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 9px; margin-top: 12px; }\n.recipient-search[_ngcontent-%COMP%] { position: relative; flex: 1; margin: 0; }\n.recipient-search[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] { position: absolute; z-index: 1; top: 50%; left: 13px; color: #83948c; transform: translateY(-50%); }\n.recipient-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding-left: 36px; }\n.selection-toggle[_ngcontent-%COMP%] { min-height: 40px; padding: 0 11px; border: 1px solid #b9d2c6; border-radius: 9px; background: #f3faf6; color: #176543; font-size: 11px; font-weight: 800; cursor: pointer; white-space: nowrap; }\n.selection-toggle[_ngcontent-%COMP%]:disabled { opacity: .55; cursor: not-allowed; }\n.recipient-summary[_ngcontent-%COMP%] { display: flex; justify-content: space-between; margin: 10px 1px 7px; color: #6f7f78; font-size: 11px; }\n.recipient-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #176543; }\n.recipient-list[_ngcontent-%COMP%] { display: grid; max-height: 270px; gap: 6px; overflow-y: auto; padding: 2px 3px 2px 1px; }\n.recipient-row[_ngcontent-%COMP%] { display: grid; grid-template-columns: 18px 34px minmax(0, 1fr) auto; gap: 9px; align-items: center; margin: 0; padding: 9px 10px; border: 1px solid #dce7e1; border-radius: 11px; background: #fff; cursor: pointer; transition: border-color .18s ease, background .18s ease, box-shadow .18s ease; }\n.recipient-row[_ngcontent-%COMP%]:hover { border-color: #a8cbbb; }\n.recipient-row.is-selected[_ngcontent-%COMP%] { border-color: #65a989; background: #f0faf5; box-shadow: inset 3px 0 #16734a; }\n.recipient-row.is-unavailable[_ngcontent-%COMP%] { opacity: .58; cursor: not-allowed; }\n.recipient-row[_ngcontent-%COMP%]   input[type='checkbox'][_ngcontent-%COMP%] { width: 17px; height: 17px; min-height: 0; margin: 0; padding: 0; accent-color: #16734a; }\n.recipient-avatar[_ngcontent-%COMP%] { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; background: #e9f1f5; color: #25465d; font-size: 12px; font-weight: 850; }\n.recipient-details[_ngcontent-%COMP%] { display: grid; min-width: 0; gap: 2px; }\n.recipient-details[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .recipient-details[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.recipient-details[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #21394a; font-size: 12px; }\n.recipient-details[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #718078; font-size: 10px; }\n.certificate-ref[_ngcontent-%COMP%] { max-width: 92px; overflow: hidden; color: #78877f; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }\n.recipient-empty[_ngcontent-%COMP%] { margin: 10px 0 0; padding: 20px; border: 1px dashed #cbdcd4; border-radius: 11px; color: #75857d; text-align: center; }\n.email-send-bar[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; padding: 13px; border-radius: 12px; background: #173a57; color: #fff; }\n.email-send-bar[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: grid; gap: 2px; }\n.email-send-bar[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 12px; }\n.email-send-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #cbd9e3; font-size: 9px; }\n.btn-email[_ngcontent-%COMP%] { flex: 0 0 auto; min-height: 39px; padding: 0 13px; border-color: #fff; background: #fff; color: #173a57; font-size: 11px; }\n.btn-email[_ngcontent-%COMP%]:hover { background: #eaf4ef; }\n.email-progress[_ngcontent-%COMP%]   progress[_ngcontent-%COMP%] { accent-color: #16734a; }\n@media (max-width: 1050px) {\n  .bulk-email-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .workspace-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .preview-card[_ngcontent-%COMP%] { position: static; }\n}\n\n@media (max-width: 760px) {\n  .email-selector-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n}\n\n@media (max-width: 620px) {\n  .certificate-page[_ngcontent-%COMP%] { padding-top: 96px; }\n  .certificate-shell[_ngcontent-%COMP%] { padding: 0 16px; }\n  .page-header[_ngcontent-%COMP%] { align-items: flex-start; flex-direction: column; }\n  .action-bar[_ngcontent-%COMP%] { grid-template-columns: repeat(2, minmax(0, 1fr)); }\r\n  .action-bar[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child { grid-column: 1 / -1; }\r\n  .email-selector-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .recipient-toolbar[_ngcontent-%COMP%], .email-send-bar[_ngcontent-%COMP%] { align-items: stretch; flex-direction: column; }\n  .selection-toggle[_ngcontent-%COMP%], .btn-email[_ngcontent-%COMP%] { width: 100%; }\n  .recipient-row[_ngcontent-%COMP%] { grid-template-columns: 18px 34px minmax(0, 1fr); }\n  .certificate-ref[_ngcontent-%COMP%] { display: none; }\n  .form-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .form-grid[_ngcontent-%COMP%]   .full[_ngcontent-%COMP%] { grid-column: auto; }\n  .preview-placeholder[_ngcontent-%COMP%] { min-height: 360px; padding: 30px; }\n  .preview-card[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] { height: 520px; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PrintCertificateComponent, [{
        type: Component,
        args: [{ selector: 'app-print-certificate', template: "<section class=\"certificate-page\">\n  <div class=\"container certificate-shell\">\n    <header class=\"page-header\">\n      <div>\n        <span class=\"eyebrow\">Admin Facility</span>\n        <h1>Certificate Center</h1>\n        <p>Create, download, print, or email professional A4 landscape certificates from one workspace.</p>\n      </div>\n      <a class=\"btn btn-outline\" routerLink=\"/admin/create-test\">Create Test</a>\n    </header>\n\n    <section class=\"operations-section\" aria-labelledby=\"certificateOperationsHeading\">\n      <div class=\"operations-heading\">\n        <div>\n          <span class=\"eyebrow\">Batch Operations</span>\n          <h2 id=\"certificateOperationsHeading\">Certificate Operations</h2>\n          <p>Download certificate batches or email certificates to selected participants.</p>\n        </div>\n      </div>\n      <div class=\"bulk-email-grid\">\n        <section class=\"form-card bulk-card\" [class.dropdown-open]=\"isCompanyDropdownOpen || isBulkTrainingDropdownOpen\">\n          <div class=\"section-heading\">\n            <div><span class=\"card-kicker\">Bulk Export</span><h2>Bulk Certificate Download</h2><p>Download organized certificate batches by company and training.</p></div>\r\n<button class=\"card-clear\" type=\"button\" (click)=\"clearBulkDownload()\" [disabled]=\"isBulkGenerating\" aria-label=\"Clear bulk certificate download selections\"><i class=\"fas fa-rotate-left\" aria-hidden=\"true\"></i> Clear</button>\n          </div>\n\n          <label class=\"field-label\">Company</label>\n          <div class=\"search-select\">\n            <button class=\"select-toggle\" type=\"button\" (click)=\"toggleCompanyDropdown()\" [disabled]=\"isBulkGenerating\" [attr.aria-expanded]=\"isCompanyDropdownOpen\">\n              <span>{{ selectedCompany ? selectedCompany.clientName : 'Select Company' }}</span><span aria-hidden=\"true\">&#9662;</span>\n            </button>\n            <div class=\"select-menu\" *ngIf=\"isCompanyDropdownOpen\" role=\"listbox\">\n              <input type=\"search\" [(ngModel)]=\"companySearch\" name=\"companySearch\" placeholder=\"Search company\" autocomplete=\"off\" />\n              <button type=\"button\" *ngFor=\"let company of filteredBulkCompanies\" (click)=\"selectCompany(company)\">\n                <strong>{{ company.clientName }}</strong>\n                <small>{{ getBulkCompanyCertificateCount(company) }} certificates</small>\n              </button>\n              <p class=\"empty-option\" *ngIf=\"!filteredBulkCompanies.length\">No company with certificate data found.</p>\n            </div>\n          </div>\n\n          <label class=\"field-label\">Training (optional)</label>\n          <div class=\"search-select\">\n            <button class=\"select-toggle\" type=\"button\" (click)=\"toggleBulkTrainingDropdown()\" [disabled]=\"!selectedCompanyId || isBulkGenerating\" [attr.aria-expanded]=\"isBulkTrainingDropdownOpen\">\n              <span>{{ selectedBulkTraining ? getTrainingLabel(selectedBulkTraining) : (selectedCompanyId ? 'All trainings' : 'Select company first') }}</span><span aria-hidden=\"true\">&#9662;</span>\n            </button>\n            <div class=\"select-menu\" *ngIf=\"isBulkTrainingDropdownOpen\" role=\"listbox\">\n              <input type=\"search\" [(ngModel)]=\"bulkTrainingSearch\" name=\"bulkTrainingSearch\" placeholder=\"Search training\" autocomplete=\"off\" />\n              <button type=\"button\" (click)=\"selectBulkTraining()\">\n                <strong>All trainings</strong>\n                <small>Include every training for this company</small>\n              </button>\n              <button type=\"button\" *ngFor=\"let training of filteredBulkTrainingList; trackBy: trackByTrainingId\" (click)=\"selectBulkTraining(training)\">\n                <strong>{{ getTrainingLabel(training) }}</strong>\n                <small>{{ getBulkTrainingCertificateCount(training) }} certificates</small>\n              </button>\n              <p class=\"empty-option\" *ngIf=\"!filteredBulkTrainingList.length\">No related training found.</p>\n            </div>\n          </div>\n\n          <button class=\"btn btn-primary bulk-download\" type=\"button\" (click)=\"downloadAllCertificates()\" [disabled]=\"!selectedCompanyId || isBulkGenerating\">\n            {{ isBulkGenerating ? 'Generating...' : 'Download All Certificates' }}\n          </button>\n\n          <div class=\"bulk-progress\" *ngIf=\"bulkStatus\" role=\"status\" aria-live=\"polite\">\n            <p>{{ bulkStatus }} <strong *ngIf=\"bulkTotal\">{{ bulkPercentage }}%</strong></p>\n            <progress *ngIf=\"bulkTotal\" [value]=\"bulkProcessed\" [max]=\"bulkTotal\"></progress>\n          </div>\n        </section>\n        <section class=\"form-card email-card\" [class.dropdown-open]=\"isEmailCompanyDropdownOpen || isEmailTrainingDropdownOpen || isEmailDateDropdownOpen\">\n          <div class=\"section-heading email-heading\">\n            <span class=\"email-icon\" aria-hidden=\"true\"><i class=\"fas fa-envelope\"></i></span>\n            <div><span class=\"card-kicker\">Email Delivery</span><h2>Email Certificates</h2><p>Send personalized certificate PDFs to multiple participants for a selected company, training, and date.</p></div>\r\n<button class=\"card-clear\" type=\"button\" (click)=\"clearEmailCertificates()\" [disabled]=\"isBulkEmailSending\" aria-label=\"Clear email certificate selections\"><i class=\"fas fa-rotate-left\" aria-hidden=\"true\"></i> Clear</button>\n          </div>\n\n          <div class=\"email-step\"><span>1</span><strong>Choose company, training &amp; date</strong></div>\n          <div class=\"email-selector-grid\">\n            <div>\n              <label class=\"field-label\">Company</label>\n              <div class=\"search-select\">\n                <button class=\"select-toggle\" type=\"button\" (click)=\"toggleEmailCompanyDropdown()\" [disabled]=\"isBulkEmailSending\" [attr.aria-expanded]=\"isEmailCompanyDropdownOpen\">\n                  <span>{{ selectedEmailCompany ? selectedEmailCompany.clientName : 'Select company' }}</span><span aria-hidden=\"true\">&#9662;</span>\n                </button>\n                <div class=\"select-menu\" *ngIf=\"isEmailCompanyDropdownOpen\" role=\"listbox\">\n                  <input type=\"search\" [(ngModel)]=\"emailCompanySearch\" name=\"emailCompanySearch\" placeholder=\"Search company\" autocomplete=\"off\" />\n                  <button type=\"button\" *ngFor=\"let company of filteredEmailCompanies\" (click)=\"selectEmailCompany(company)\">\n                    <strong>{{ company.clientName }}</strong>\n                    <small>{{ getBulkCompanyCertificateCount(company) }} participants</small>\n                  </button>\n                  <p class=\"empty-option\" *ngIf=\"!filteredEmailCompanies.length\">No company with certificate data found.</p>\n                </div>\n              </div>\n            </div>\n\n            <div>\n              <label class=\"field-label\">Training</label>\n              <div class=\"search-select\">\n                <button class=\"select-toggle\" type=\"button\" (click)=\"toggleEmailTrainingDropdown()\" [disabled]=\"!emailCompanyId || isBulkEmailSending\" [attr.aria-expanded]=\"isEmailTrainingDropdownOpen\">\n                  <span>{{ selectedEmailTraining ? getTrainingLabel(selectedEmailTraining) : (emailCompanyId ? 'Select training' : 'Select company first') }}</span><span aria-hidden=\"true\">&#9662;</span>\n                </button>\n                <div class=\"select-menu\" *ngIf=\"isEmailTrainingDropdownOpen\" role=\"listbox\">\n                  <input type=\"search\" [(ngModel)]=\"emailTrainingSearch\" name=\"emailTrainingSearch\" placeholder=\"Search training\" autocomplete=\"off\" />\n                  <button type=\"button\" *ngFor=\"let training of filteredEmailTrainingList; trackBy: trackByTrainingId\" (click)=\"selectEmailTraining(training)\">\n                    <strong>{{ getTrainingLabel(training) }}</strong>\n                    <small>{{ getEmailTrainingCertificateCount(training) }} certificates</small>\n                  </button>\n                  <p class=\"empty-option\" *ngIf=\"!filteredEmailTrainingList.length\">No related training found.</p>\n                </div>\n              </div>\n            </div>\n            <div class=\"email-date-field\">\n              <label class=\"field-label\">Certificate date <span class=\"required-label\">Required</span></label>\n              <div class=\"search-select\">\n                <button class=\"select-toggle\" type=\"button\" (click)=\"toggleEmailDateDropdown()\" [disabled]=\"!emailTrainingId || isBulkEmailSending\" [attr.aria-expanded]=\"isEmailDateDropdownOpen\">\n                  <span>{{ selectedEmailDateLabel || (emailTrainingId ? 'Select certificate date' : 'Select training first') }}</span><span aria-hidden=\"true\">&#9662;</span>\n                </button>\n                <div class=\"select-menu date-menu\" *ngIf=\"isEmailDateDropdownOpen\" role=\"listbox\">\n                  <button type=\"button\" *ngFor=\"let option of emailDateOptions\" (click)=\"selectEmailDate(option.value)\">\n                    <strong><i class=\"fas fa-calendar-day\" aria-hidden=\"true\"></i> {{ option.label }}</strong>\n                    <small>{{ option.count }} {{ option.count === 1 ? 'certificate' : 'certificates' }}</small>\n                  </button>\n                  <p class=\"empty-option\" *ngIf=\"!emailDateOptions.length\">No certificate dates found for this training.</p>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"email-recipient-section\" *ngIf=\"emailDateValue\">\n            <div class=\"email-step\"><span>2</span><strong>Select participants</strong></div>\n            <div class=\"recipient-toolbar\">\n              <label class=\"recipient-search\"><i class=\"fas fa-search\" aria-hidden=\"true\"></i><input type=\"search\" [(ngModel)]=\"emailUserSearch\" name=\"emailUserSearch\" placeholder=\"Search name, email or certificate number\" autocomplete=\"off\" /></label>\n              <button class=\"selection-toggle\" type=\"button\" (click)=\"toggleAllEmailUsers()\" [disabled]=\"!selectableEmailUsers.length || isBulkEmailSending\">\n                {{ allVisibleEmailUsersSelected ? 'Clear visible' : 'Select all visible' }}\n              </button>\n            </div>\n\n            <div class=\"recipient-summary\">\n              <span><strong>{{ selectedEmailUserCount }}</strong> selected</span>\n              <span>{{ emailUsers.length }} shown</span>\n            </div>\n\n            <div class=\"recipient-list\" *ngIf=\"emailUsers.length; else noEmailUsers\">\n              <label class=\"recipient-row\" *ngFor=\"let user of emailUsers; trackBy: trackByUserId\" [class.is-selected]=\"isEmailUserSelected(user.certificationDataId)\" [class.is-unavailable]=\"!isEmailUserEligible(user)\">\n                <input type=\"checkbox\" [checked]=\"isEmailUserSelected(user.certificationDataId)\" (change)=\"toggleEmailUser(user.certificationDataId)\" [disabled]=\"!isEmailUserEligible(user) || isBulkEmailSending\" />\n                <span class=\"recipient-avatar\">{{ (user.userName || user.name || '?').charAt(0) | uppercase }}</span>\n                <span class=\"recipient-details\"><strong>{{ formatPersonName(user.userName || user.name) }}</strong><small>{{ !user.email ? 'No email address available' : (!user.certificationNumber ? 'No certificate number available' : user.email) }}</small></span>\n                <span class=\"certificate-ref\">{{ user.certificationNumber || 'No certificate no.' }}</span>\n              </label>\n            </div>\n            <ng-template #noEmailUsers><p class=\"recipient-empty\">No participants match this selection.</p></ng-template>\n\n            <div class=\"email-send-bar\">\n              <div><strong>Ready to send</strong><span>Each participant receives their own certificate PDF.</span></div>\n              <button class=\"btn btn-email\" type=\"button\" (click)=\"sendSelectedCertificates()\" [disabled]=\"!selectedEmailUserCount || isBulkEmailSending\">\n                <i class=\"fas fa-paper-plane\" aria-hidden=\"true\"></i> {{ isBulkEmailSending ? 'Sending...' : 'Send selected' }}\n              </button>\n            </div>\n\n            <div class=\"bulk-progress email-progress\" *ngIf=\"emailStatus\" role=\"status\" aria-live=\"polite\">\n              <p>{{ emailStatus }} <strong *ngIf=\"emailTotal\">{{ emailPercentage }}%</strong></p>\n              <progress *ngIf=\"emailTotal\" [value]=\"emailProcessed\" [max]=\"emailTotal\"></progress>\n            </div>\n          </div>\n        </section>\n      </div>\n    </section>\n\n    <div class=\"operations-heading workspace-heading\">\n      <div>\n        <span class=\"eyebrow\">Individual Certificate</span>\n        <h2 id=\"individualCertificateHeading\">Create &amp; Preview Certificate</h2>\n        <p>Select one training and participant, review the certificate details, then preview, download, or email it.</p>\n      </div>\n    </div>\n\n    <div class=\"workspace-grid\" aria-labelledby=\"individualCertificateHeading\">\n      <form class=\"certificate-form\" (submit)=\"$event.preventDefault()\">\n        <section class=\"form-card training-card\" [class.dropdown-open]=\"isTrainingDropdownOpen || isUserDropdownOpen\">\n          <div class=\"section-heading\">\n            <span class=\"step-badge\" aria-label=\"Step 1\">1</span>\n            <div><h2>Training &amp; participant</h2><p>Topics are brought in automatically from the selected training.</p></div>\n          </div>\n\n          <label class=\"field-label\">Training</label>\n          <div class=\"search-select\">\n            <button class=\"select-toggle\" type=\"button\" (click)=\"toggleTrainingDropdown()\" [attr.aria-expanded]=\"isTrainingDropdownOpen\">\n              <span>{{ selectedTraining ? getTrainingLabel(selectedTraining) : 'Select Training' }}</span><span aria-hidden=\"true\">&#9662;</span>\n            </button>\n            <div class=\"select-menu\" *ngIf=\"isTrainingDropdownOpen\" role=\"listbox\">\n              <input type=\"search\" [(ngModel)]=\"trainingSearch\" name=\"trainingSearch\" placeholder=\"Search training\" autocomplete=\"off\" />\n              <button type=\"button\" *ngFor=\"let training of filteredTrainingList; trackBy: trackByTrainingId\" (click)=\"selectTraining(training)\">\n                <strong>{{ getTrainingLabel(training) }}</strong>\n                <small>{{ getTrainingUserCount(training) }} {{ getTrainingUserCount(training) === 1 ? 'participant' : 'participants' }}</small>\n              </button>\n              <p class=\"empty-option\" *ngIf=\"!filteredTrainingList.length\">No training found.</p>\n            </div>\n          </div>\n\n          <label class=\"field-label\">Participant</label>\n          <div class=\"search-select\">\n            <button class=\"select-toggle\" type=\"button\" (click)=\"toggleUserDropdown()\" [disabled]=\"!selectedTrainingId\" [attr.aria-expanded]=\"isUserDropdownOpen\">\n              <span>{{ selectedUser ? getUserLabel(selectedUser) : (selectedTrainingId ? 'Select User' : 'Select training first') }}</span><span aria-hidden=\"true\">&#9662;</span>\n            </button>\n            <div class=\"select-menu\" *ngIf=\"isUserDropdownOpen\" role=\"listbox\">\n              <input type=\"search\" [(ngModel)]=\"userSearch\" name=\"userSearch\" placeholder=\"Search by name, email or certificate number\" autocomplete=\"off\" />\n              <button type=\"button\" *ngFor=\"let user of filteredUserData; trackBy: trackByUserId\" (click)=\"selectUser(user.certificationDataId)\">\n                <strong>{{ formatPersonName(user.userName || user.name) }}</strong>\n                <small>{{ user.email || user.certificationNumber }}</small>\n              </button>\n              <p class=\"empty-option\" *ngIf=\"!filteredUserData.length\">No participant found.</p>\n            </div>\n          </div>\n\n          <!-- <div class=\"result-strip\" *ngIf=\"selectedUser\">\n            <div><span>Completion</span><strong>{{ certificate.completionType | titlecase }}</strong></div>\n            <div><span>Marks</span><strong>{{ certificate.marks === null ? 'N/A' : certificate.marks + '%' }}</strong></div>\n            <p>{{ completionPreview }}</p>\n          </div> -->\n        </section>\n\n        <section class=\"form-card\" [class.is-disabled]=\"!selectedUserId\">\n          <div class=\"section-heading\">\n            <span class=\"step-badge\" aria-label=\"Step 2\">2</span>\n            <div><h2>Certificate details</h2><p>All fields remain editable before generation.</p></div>\n          </div>\n\n          <div class=\"form-grid\">\n            <label class=\"full\">Participant name<input type=\"text\" [(ngModel)]=\"certificate.userName\" (blur)=\"normalizeParticipantName()\" name=\"userName\" /></label>\n            <label class=\"full\">Training name<input type=\"text\" [(ngModel)]=\"certificate.trainingName\" name=\"trainingName\" /></label>\n            <label>Training hours<input type=\"number\" min=\"0.5\" step=\"0.5\" [(ngModel)]=\"certificate.trainingHours\" name=\"trainingHours\" /></label>\n            <label>Date of issue<input type=\"date\" [(ngModel)]=\"certificate.dateOfIssue\" name=\"dateOfIssue\" /></label>\n            <label>Location<input type=\"text\" [(ngModel)]=\"certificate.location\" name=\"location\" /></label>\n            <label>Trainer name<input type=\"text\" [(ngModel)]=\"certificate.trainerName\" name=\"trainerName\" /></label>\n            <label class=\"full\">Certificate number<input type=\"text\" [(ngModel)]=\"certificate.certificateNumber\" name=\"certificateNumber\" /></label>\n            <label class=\"full\">Covered topics<textarea rows=\"5\" [ngModel]=\"certificate.coveredTopics.join(', ')\" (ngModelChange)=\"updateTopics($event)\" name=\"coveredTopics\" placeholder=\"Topic one, Topic two, Topic three, Topic four\"></textarea><small>Enter 4 to 6 topics separated by commas. Each topic uses its own colored bullet line in the PDF.</small></label>\n          </div>\n        </section>\n\n        <div class=\"action-bar\">\n          <button class=\"btn btn-outline btn-clear\" type=\"button\" (click)=\"clearAll()\" [disabled]=\"isGenerating || isSending || isBulkGenerating || isBulkEmailSending\"><i class=\"fas fa-rotate-left\"></i> Clear All</button>\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"preview()\" [disabled]=\"isGenerating || isSending\"><i class=\"fas fa-eye\" aria-hidden=\"true\"></i> {{ isGenerating ? 'Generating...' : 'Preview PDF' }}</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"download()\" [disabled]=\"isGenerating || isSending\"><i class=\"fas fa-download\" aria-hidden=\"true\"></i> Download</button>\n          <!-- <button class=\"btn btn-outline\" type=\"button\" (click)=\"print()\" [disabled]=\"isGenerating || isSending\"><i class=\"fas fa-print\" aria-hidden=\"true\"></i> Print</button> -->\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"sendEmail()\" [disabled]=\"isGenerating || isSending\"><i class=\"fas fa-envelope\"></i> {{ isSending ? 'Sending...' : 'Send to Email' }}</button>\n        </div>\n      </form>\n\n      <aside class=\"preview-card\">\n        <div class=\"preview-heading\"><div><span>Live output</span><h2>PDF Preview</h2></div><span class=\"page-size\">A4 Landscape</span></div>\n        <iframe *ngIf=\"previewUrl; else previewPlaceholder\" [src]=\"previewUrl\" title=\"Certificate PDF preview\"></iframe>\n        <ng-template #previewPlaceholder>\n          <div class=\"preview-placeholder\">\n            <div class=\"document-icon\">PDF</div>\n            <h3>Your certificate will appear here</h3>\n            <p>Select a training and participant, then choose Preview PDF.</p>\n          </div>\n        </ng-template>\n      </aside>\n    </div>\n  </div>\n</section>\n", styles: [":host { display: block; }\n\n.certificate-page {\n  min-height: 100vh;\n  padding: 120px 0 64px;\n  background: linear-gradient(145deg, #f3f7fb 0%, #fbfaf7 55%, #eef4f8 100%);\n  color: #14283d;\n}\n\n.certificate-shell { max-width: 1440px; margin: 0 auto; padding: 0 28px; }\n.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }\n.eyebrow { color: #a4742b; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }\n.page-header h1 { margin: 6px 0 8px; font-size: clamp(30px, 4vw, 46px); line-height: 1; }\n.page-header p { max-width: 700px; margin: 0; color: #5d6b78; line-height: 1.6; }\n\n.operations-section { margin-bottom: 30px; }\n.operations-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 14px; padding: 0 3px; }\n.operations-heading h2 { margin: 4px 0 5px; color: #14283d; font-size: 24px; }\n.operations-heading p { margin: 0; color: #687784; font-size: 13px; line-height: 1.5; }\n.workspace-heading { margin-top: 4px; margin-bottom: 14px; padding-top: 2px; border-top: 1px solid rgba(180, 195, 205, .55); }\n.workspace-heading > div { padding-top: 22px; }\n.bulk-email-grid { display: grid; grid-template-columns: minmax(320px, .8fr) minmax(520px, 1.2fr); gap: 22px; align-items: start; }\n.bulk-email-grid > .form-card { margin: 0; border-width: 1px; border-style: solid; box-shadow: 0 16px 42px rgba(30,55,77,.1); }\n.bulk-email-grid > .bulk-card { border-color: #dcc9a8; border-top: 3px solid #b37a24; }\n.bulk-email-grid > .email-card { border-color: #bad7ca; border-top: 3px solid #16734a; }\n.bulk-email-grid .section-heading { align-items: flex-start; justify-content: space-between; }\n.bulk-email-grid .section-heading > div { flex: 1; min-width: 0; }\n.card-kicker { display: block; margin-bottom: 4px; color: #8b6a37; font-size: 9px; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }\n.email-card .card-kicker { color: #16734a; }\n.card-clear { display: inline-flex; flex: 0 0 auto; min-height: 32px; align-items: center; gap: 6px; margin: -3px -2px 0 8px; padding: 0 10px; border: 1px solid #c8d5dd; border-radius: 8px; background: #fff; color: #536b7c; font-size: 10px; font-weight: 800; cursor: pointer; }\n.card-clear:hover { border-color: #9eafba; background: #f4f7f9; color: #173a57; }\n.card-clear:disabled { opacity: .5; cursor: wait; }\n.workspace-grid { display: grid; grid-template-columns: minmax(390px, .85fr) minmax(520px, 1.35fr); gap: 26px; align-items: start; overflow: visible; }\n.certificate-form { position: relative; display: grid; gap: 18px; overflow: visible; }\n.form-card, .preview-card { background: rgba(255,255,255,.96); border: 1px solid #dce5ec; border-radius: 18px; box-shadow: 0 18px 48px rgba(30,55,77,.08); }\n.workspace-grid .form-card { border-top: 3px solid #173a57; }\n.workspace-grid .preview-card { border-top: 3px solid #b37a24; }\n.form-card { position: relative; z-index: 1; overflow: visible; padding: 24px; }\n.training-card { z-index: 2; }\n.bulk-card { z-index: 3; }\n.bulk-download { width: 100%; margin-top: 20px; }\n.bulk-progress { margin-top: 14px; }\n.bulk-progress p { display: flex; justify-content: space-between; gap: 12px; margin: 0 0 7px; color: #536879; font-size: 13px; }\n.bulk-progress progress { width: 100%; height: 10px; accent-color: #173a57; }\n.training-card.dropdown-open { z-index: 100; }\n.form-card.is-disabled { opacity: .66; }\n.section-heading { display: flex; gap: 13px; align-items: flex-start; margin-bottom: 20px; }\n.section-heading > .step-badge {\n  display: flex;\n  flex: 0 0 32px;\n  width: 32px;\n  height: 32px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: #142f49;\n  color: #fff;\n  font-family: Arial, Helvetica, sans-serif !important;\n  font-size: 17px;\n  font-style: normal;\n  font-weight: 700;\n  font-variant-numeric: lining-nums;\n  line-height: 1;\n}\n.section-heading > .step-badge::before,\n.section-heading > .step-badge::after { content: none !important; display: none !important; }\n.section-heading h2 { margin: 1px 0 4px; font-size: 18px; }\n.section-heading p { margin: 0; color: #74818c; font-size: 13px; }\n\n.field-label, .form-grid label { display: grid; gap: 7px; margin-top: 14px; color: #354a5d; font-size: 12px; font-weight: 750; letter-spacing: .02em; }\ninput, select, textarea, .select-toggle { width: 100%; border: 1px solid #cdd9e2; border-radius: 10px; background: #fff; color: #172d42; font: inherit; font-size: 14px; font-weight: 500; outline: none; }\ninput, select, .select-toggle { min-height: 45px; padding: 0 13px; }\ntextarea { padding: 12px 13px; resize: vertical; line-height: 1.5; }\ninput:focus, select:focus, textarea:focus, .select-toggle:focus { border-color: #a4742b; box-shadow: 0 0 0 3px rgba(164,116,43,.12); }\nselect:disabled { background: #f1f4f6; cursor: not-allowed; }\n\n.search-select { position: relative; }\n.select-toggle { display: flex; align-items: center; justify-content: space-between; gap: 12px; text-align: left; cursor: pointer; }\n.select-toggle > span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.select-toggle:disabled { background: #f1f4f6; color: #7b8791; cursor: not-allowed; }\n.select-menu { position: absolute; z-index: 200; top: calc(100% + 7px); left: 0; right: 0; max-height: 360px; overflow-y: auto; padding: 9px; border: 1px solid #ccd8e2; border-radius: 12px; background: #fff; box-shadow: 0 18px 42px rgba(18,45,67,.24); }\n.select-menu input { margin-bottom: 7px; }\n.select-menu button { display: grid; width: 100%; gap: 2px; padding: 10px; border: 0; border-radius: 8px; background: transparent; color: #1d3449; text-align: left; cursor: pointer; }\n.select-menu button:hover { background: #edf4f8; }\n.select-menu small { overflow: hidden; color: #71808c; text-overflow: ellipsis; white-space: nowrap; }\n.empty-option { margin: 10px; color: #73808c; text-align: center; }\n\n.result-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 18px; padding: 14px; border: 1px solid #d6e5dc; border-radius: 12px; background: #f2f9f4; }\n.result-strip div { display: grid; gap: 2px; }\n.result-strip span { color: #65806e; font-size: 11px; text-transform: uppercase; }\n.result-strip strong { font-size: 14px; }\n.result-strip p { grid-column: 1 / -1; margin: 4px 0 0; color: #315b40; font-size: 13px; }\n.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }\n.form-grid .full { grid-column: 1 / -1; }\n\n.action-bar { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; padding: 4px 0; }\n.btn { display: inline-flex; min-width: 0; min-height: 43px; align-items: center; justify-content: center; gap: 7px; padding: 0 10px; border: 1px solid transparent; border-radius: 10px; font-size: 11px; font-weight: 750; line-height: 1.2; text-align: center; text-decoration: none; cursor: pointer; white-space: nowrap; }\r\n.action-bar .btn i { flex: 0 0 auto; font-size: 12px; }\n.btn-primary { background: #173a57; color: #fff; }\n.btn-primary:hover { background: #0e2b43; }\n.btn-outline { border-color: #b8c8d4; background: #fff; color: #173a57; }\n.btn:disabled { opacity: .55; cursor: wait; }\n\n.preview-card { position: sticky; z-index: 0; top: 105px; overflow: hidden; }\n.preview-heading { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid #e1e8ed; }\n.preview-heading span { color: #8b6a37; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }\n.preview-heading h2 { margin: 2px 0 0; font-size: 18px; }\n.preview-heading .page-size { padding: 6px 8px; border-radius: 6px; background: #eef3f6; color: #5e6d79; letter-spacing: .04em; }\n.preview-card iframe { display: block; width: 100%; height: min(72vh, 720px); border: 0; background: #51575d; }\n.preview-placeholder { display: grid; min-height: 520px; place-items: center; align-content: center; padding: 48px; color: #788691; text-align: center; }\n.preview-placeholder h3 { margin: 16px 0 7px; color: #30485b; }\n.preview-placeholder p { max-width: 330px; margin: 0; line-height: 1.6; }\n.document-icon { display: grid; width: 74px; height: 88px; place-items: center; border: 2px solid #c69245; border-radius: 8px; color: #9a6820; font-weight: 900; box-shadow: 8px 8px 0 #edf2f5; }\n\n.email-card { width: 100%; min-width: 0; z-index: 2; border-color: #d5e5df; background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(246,251,249,.98)); }\n.email-card.dropdown-open { z-index: 110; }\n.email-heading { margin-bottom: 16px; }\n.email-icon { display: grid; flex: 0 0 38px; width: 38px; height: 38px; place-items: center; border-radius: 11px; background: #e8f5ef; color: #16734a; font-size: 16px; }\n.email-step { display: flex; align-items: center; gap: 8px; margin: 18px 0 2px; color: #2f4858; font-size: 12px; letter-spacing: .02em; }\n.email-step > span { display: grid; width: 22px; height: 22px; place-items: center; border-radius: 50%; background: #16734a; color: #fff; font-size: 11px; }\n.email-selector-grid { display: grid; width: 100%; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; align-items: end; }\n.email-selector-grid > div { min-width: 0; }\n.email-selector-grid .search-select, .email-selector-grid .select-toggle, .email-selector-grid .select-menu, .email-selector-grid input { box-sizing: border-box; width: 100%; min-width: 0; }\n.email-selector-grid .select-menu { right: 0; left: 0; }\n.email-selector-grid .select-menu button { min-width: 0; }\n.email-selector-grid .select-menu strong, .email-selector-grid .select-menu small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.email-date-field { grid-column: auto; }\n.required-label { display: inline-flex; margin-left: 5px; padding: 2px 6px; border-radius: 999px; background: #fff0e7; color: #b34e16; font-size: 8px; font-weight: 850; letter-spacing: .06em; text-transform: uppercase; vertical-align: middle; }\n.date-menu button strong { display: flex; align-items: center; gap: 7px; }\n.date-menu button i { color: #16734a; }\n.email-recipient-section { margin-top: 20px; padding-top: 2px; border-top: 1px solid #dce9e3; }\n.recipient-toolbar { display: flex; align-items: center; gap: 9px; margin-top: 12px; }\n.recipient-search { position: relative; flex: 1; margin: 0; }\n.recipient-search > i { position: absolute; z-index: 1; top: 50%; left: 13px; color: #83948c; transform: translateY(-50%); }\n.recipient-search input { padding-left: 36px; }\n.selection-toggle { min-height: 40px; padding: 0 11px; border: 1px solid #b9d2c6; border-radius: 9px; background: #f3faf6; color: #176543; font-size: 11px; font-weight: 800; cursor: pointer; white-space: nowrap; }\n.selection-toggle:disabled { opacity: .55; cursor: not-allowed; }\n.recipient-summary { display: flex; justify-content: space-between; margin: 10px 1px 7px; color: #6f7f78; font-size: 11px; }\n.recipient-summary strong { color: #176543; }\n.recipient-list { display: grid; max-height: 270px; gap: 6px; overflow-y: auto; padding: 2px 3px 2px 1px; }\n.recipient-row { display: grid; grid-template-columns: 18px 34px minmax(0, 1fr) auto; gap: 9px; align-items: center; margin: 0; padding: 9px 10px; border: 1px solid #dce7e1; border-radius: 11px; background: #fff; cursor: pointer; transition: border-color .18s ease, background .18s ease, box-shadow .18s ease; }\n.recipient-row:hover { border-color: #a8cbbb; }\n.recipient-row.is-selected { border-color: #65a989; background: #f0faf5; box-shadow: inset 3px 0 #16734a; }\n.recipient-row.is-unavailable { opacity: .58; cursor: not-allowed; }\n.recipient-row input[type='checkbox'] { width: 17px; height: 17px; min-height: 0; margin: 0; padding: 0; accent-color: #16734a; }\n.recipient-avatar { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; background: #e9f1f5; color: #25465d; font-size: 12px; font-weight: 850; }\n.recipient-details { display: grid; min-width: 0; gap: 2px; }\n.recipient-details strong, .recipient-details small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.recipient-details strong { color: #21394a; font-size: 12px; }\n.recipient-details small { color: #718078; font-size: 10px; }\n.certificate-ref { max-width: 92px; overflow: hidden; color: #78877f; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }\n.recipient-empty { margin: 10px 0 0; padding: 20px; border: 1px dashed #cbdcd4; border-radius: 11px; color: #75857d; text-align: center; }\n.email-send-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; padding: 13px; border-radius: 12px; background: #173a57; color: #fff; }\n.email-send-bar > div { display: grid; gap: 2px; }\n.email-send-bar strong { font-size: 12px; }\n.email-send-bar span { color: #cbd9e3; font-size: 9px; }\n.btn-email { flex: 0 0 auto; min-height: 39px; padding: 0 13px; border-color: #fff; background: #fff; color: #173a57; font-size: 11px; }\n.btn-email:hover { background: #eaf4ef; }\n.email-progress progress { accent-color: #16734a; }\n@media (max-width: 1050px) {\n  .bulk-email-grid { grid-template-columns: 1fr; }\n  .workspace-grid { grid-template-columns: 1fr; }\n  .preview-card { position: static; }\n}\n\n@media (max-width: 760px) {\n  .email-selector-grid { grid-template-columns: 1fr; }\n}\n\n@media (max-width: 620px) {\n  .certificate-page { padding-top: 96px; }\n  .certificate-shell { padding: 0 16px; }\n  .page-header { align-items: flex-start; flex-direction: column; }\n  .action-bar { grid-template-columns: repeat(2, minmax(0, 1fr)); }\r\n  .action-bar .btn:last-child { grid-column: 1 / -1; }\r\n  .email-selector-grid { grid-template-columns: 1fr; }\n  .recipient-toolbar, .email-send-bar { align-items: stretch; flex-direction: column; }\n  .selection-toggle, .btn-email { width: 100%; }\n  .recipient-row { grid-template-columns: 18px 34px minmax(0, 1fr); }\n  .certificate-ref { display: none; }\n  .form-grid { grid-template-columns: 1fr; }\n  .form-grid .full { grid-column: auto; }\n  .preview-placeholder { min-height: 360px; padding: 30px; }\n  .preview-card iframe { height: 520px; }\n}\r\n"] }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.DataService }, { type: i3.CertificatePdfService }, { type: i4.NotifierService }, { type: i5.DomSanitizer }, { type: i6.TrainingManagementService }, { type: i7.ApiClientService }, { type: i8.AuthService }, { type: i9.ClientManagementService }]; }, null); })();
//# sourceMappingURL=print-certificate.component.js.map