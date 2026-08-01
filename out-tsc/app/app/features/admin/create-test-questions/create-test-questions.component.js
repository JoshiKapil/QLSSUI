import { __awaiter, __rest } from "tslib";
import { HttpEventType } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../../core/services/data.service";
import * as i3 from "../../test/services/question-api.service";
import * as i4 from "../../test/services/test-api.service";
import * as i5 from "../../test/services/test-storage.service";
import * as i6 from "../../../core/services/training-management.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
function CreateTestQuestionsComponent_div_19_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("mousedown", function CreateTestQuestionsComponent_div_19_button_2_Template_button_mousedown_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r11); const training_r9 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.selectTrainingFromDropdown(training_r9)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const training_r9 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r7.getTrainingLabel(training_r9));
} }
function CreateTestQuestionsComponent_div_19_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1, "No training found");
    i0.ɵɵelementEnd();
} }
function CreateTestQuestionsComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "input", 22);
    i0.ɵɵlistener("ngModelChange", function CreateTestQuestionsComponent_div_19_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.trainingSearch = $event); })("input", function CreateTestQuestionsComponent_div_19_Template_input_input_1_listener() { i0.ɵɵrestoreView(_r13); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.onTrainingSearchChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, CreateTestQuestionsComponent_div_19_button_2_Template, 3, 1, "button", 23);
    i0.ɵɵtemplate(3, CreateTestQuestionsComponent_div_19_div_3_Template, 2, 0, "div", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r0.trainingSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredTrainingList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.filteredTrainingList.length);
} }
function CreateTestQuestionsComponent_option_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "titlecase");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r15);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r15));
} }
function CreateTestQuestionsComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵelement(1, "span");
    i0.ɵɵelementStart(2, "small");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("width", ctx_r2.progress, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.progress, "%");
} }
function CreateTestQuestionsComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "span", 30);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5, "Preview ready");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r3.message);
} }
function CreateTestQuestionsComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "span", 30);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5, "Unable to complete import");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r4.errorMessage);
} }
function CreateTestQuestionsComponent_section_44_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 38);
} }
function CreateTestQuestionsComponent_section_44_div_10_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 43);
} }
function CreateTestQuestionsComponent_section_44_div_10_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1, "\u2713");
    i0.ɵɵelementEnd();
} }
function CreateTestQuestionsComponent_section_44_div_10_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1, "!");
    i0.ɵɵelementEnd();
} }
function CreateTestQuestionsComponent_section_44_div_10_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "strong");
    i0.ɵɵtext(2, "Saving questions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Please wait while questions and mappings are saved.");
    i0.ɵɵelementEnd()();
} }
function CreateTestQuestionsComponent_section_44_div_10_div_5_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r25 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" | Mapped: ", ctx_r25.result.inserted + ctx_r25.result.duplicate, " | Test ID: ", ctx_r25.result.testId, "");
} }
function CreateTestQuestionsComponent_section_44_div_10_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, CreateTestQuestionsComponent_section_44_div_10_div_5_ng_container_5_Template, 2, 2, "ng-container", 42);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r23.result.testCreated ? "Test created and questions mapped" : "Questions saved");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("New: ", ctx_r23.result.inserted, " | Reused: ", ctx_r23.result.duplicate, " | Failed: ", ctx_r23.result.failed, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.result.testCreated);
} }
function CreateTestQuestionsComponent_section_44_div_10_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "strong");
    i0.ɵɵtext(2, "Save failed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r24.errorMessage);
} }
function CreateTestQuestionsComponent_section_44_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵtemplate(1, CreateTestQuestionsComponent_section_44_div_10_span_1_Template, 1, 0, "span", 40);
    i0.ɵɵtemplate(2, CreateTestQuestionsComponent_section_44_div_10_span_2_Template, 2, 0, "span", 41);
    i0.ɵɵtemplate(3, CreateTestQuestionsComponent_section_44_div_10_span_3_Template, 2, 0, "span", 41);
    i0.ɵɵtemplate(4, CreateTestQuestionsComponent_section_44_div_10_div_4_Template, 5, 0, "div", 42);
    i0.ɵɵtemplate(5, CreateTestQuestionsComponent_section_44_div_10_div_5_Template, 6, 5, "div", 42);
    i0.ɵɵtemplate(6, CreateTestQuestionsComponent_section_44_div_10_div_6_Template, 5, 1, "div", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("status-notification--progress", ctx_r17.saveStatus === "saving")("status-notification--success", ctx_r17.saveStatus === "success")("status-notification--error", ctx_r17.saveStatus === "error");
    i0.ɵɵattribute("role", ctx_r17.saveStatus === "error" ? "alert" : "status");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.saveStatus === "saving");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.saveStatus === "success");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.saveStatus === "error");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.saveStatus === "saving");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.saveStatus === "success" && ctx_r17.result);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.saveStatus === "error");
} }
function CreateTestQuestionsComponent_section_44_article_11_ul_13_li_1_em_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em");
    i0.ɵɵtext(1, "Correct");
    i0.ɵɵelementEnd();
} }
function CreateTestQuestionsComponent_section_44_article_11_ul_13_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "uppercase");
    i0.ɵɵtemplate(3, CreateTestQuestionsComponent_section_44_article_11_ul_13_li_1_em_3_Template, 2, 0, "em", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r32 = ctx.$implicit;
    i0.ɵɵclassProp("correct", option_r32.isCorrect);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind1(2, 5, option_r32.id), ". ", option_r32.text, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", option_r32.isCorrect);
} }
function CreateTestQuestionsComponent_section_44_article_11_ul_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul");
    i0.ɵɵtemplate(1, CreateTestQuestionsComponent_section_44_article_11_ul_13_li_1_Template, 4, 7, "li", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", question_r26.options);
} }
function CreateTestQuestionsComponent_section_44_article_11_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "b");
    i0.ɵɵtext(2, "Expected answer:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", question_r26.expectedAnswer, "");
} }
function CreateTestQuestionsComponent_section_44_article_11_ul_15_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const validationError_r37 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(validationError_r37);
} }
function CreateTestQuestionsComponent_section_44_article_11_ul_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 47);
    i0.ɵɵtemplate(1, CreateTestQuestionsComponent_section_44_article_11_ul_15_li_1_Template, 2, 1, "li", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", question_r26.validationErrors);
} }
function CreateTestQuestionsComponent_section_44_article_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "div", 44)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p")(7, "strong");
    i0.ɵɵtext(8, "Type:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11, "Marks:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, CreateTestQuestionsComponent_section_44_article_11_ul_13_Template, 2, 1, "ul", 42);
    i0.ɵɵtemplate(14, CreateTestQuestionsComponent_section_44_article_11_p_14_Template, 4, 1, "p", 42);
    i0.ɵɵtemplate(15, CreateTestQuestionsComponent_section_44_article_11_ul_15_Template, 2, 1, "ul", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r26 = ctx.$implicit;
    const index_r27 = ctx.index;
    i0.ɵɵclassProp("invalid", question_r26.validationErrors.length);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", index_r27 + 1, ". ", question_r26.questionText, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(question_r26.validationErrors.length ? "Invalid" : "Valid");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", question_r26.questionType, " | ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", question_r26.marks, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r26.options.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r26.questionType === "ESSAY");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r26.validationErrors.length);
} }
function CreateTestQuestionsComponent_section_44_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 32)(1, "div", 33)(2, "div")(3, "h2");
    i0.ɵɵtext(4, "Validation preview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 34);
    i0.ɵɵlistener("click", function CreateTestQuestionsComponent_section_44_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r40); const ctx_r39 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r39.save()); });
    i0.ɵɵtemplate(8, CreateTestQuestionsComponent_section_44_span_8_Template, 1, 0, "span", 35);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, CreateTestQuestionsComponent_section_44_div_10_Template, 7, 13, "div", 36);
    i0.ɵɵtemplate(11, CreateTestQuestionsComponent_section_44_article_11_Template, 16, 10, "article", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate3("", ctx_r5.questions.length, " total | ", ctx_r5.validQuestions.length, " valid | ", ctx_r5.questions.length - ctx_r5.validQuestions.length, " invalid");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r5.busy || ctx_r5.fileSaving || !ctx_r5.validQuestions.length || !ctx_r5.trainingId || !ctx_r5.testType);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.busy);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.busy || ctx_r5.fileSaving ? "Saving..." : "Create Test & Map Questions", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.saveStatus !== "idle");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r5.questions);
} }
function CreateTestQuestionsComponent_section_45_p_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Created Test ID: ");
    i0.ɵɵelementStart(2, "b");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r41 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r41.result.testId);
} }
function CreateTestQuestionsComponent_section_45_table_31_tr_14_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const detail_r44 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(detail_r44.rowNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(detail_r44.questionText);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(detail_r44.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(detail_r44.message);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(detail_r44.questionId || "-");
} }
function CreateTestQuestionsComponent_section_45_table_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table")(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Row");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Question");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Validation/details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "ID");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, CreateTestQuestionsComponent_section_45_table_31_tr_14_Template, 11, 5, "tr", 48);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r42 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r42.result.details);
} }
function CreateTestQuestionsComponent_section_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 49)(1, "h2");
    i0.ɵɵtext(2, "Import result");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 50)(4, "div")(5, "b");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "Total");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div")(10, "b");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Inserted");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div")(15, "b");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "Skipped");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div")(20, "b");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "Duplicate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "b");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28, "Failed");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(29, CreateTestQuestionsComponent_section_45_p_29_Template, 4, 1, "p", 42);
    i0.ɵɵelementStart(30, "div", 51);
    i0.ɵɵtemplate(31, CreateTestQuestionsComponent_section_45_table_31_Template, 15, 1, "table", 42);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r6.result.total);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r6.result.inserted);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r6.result.skipped);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r6.result.duplicate);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r6.result.failed);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r6.result.testCreated);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r6.result.details.length);
} }
export class CreateTestQuestionsComponent {
    constructor(http, dataService, questionApi, testApi, testStorage, trainingService) {
        this.http = http;
        this.dataService = dataService;
        this.questionApi = questionApi;
        this.testApi = testApi;
        this.testStorage = testStorage;
        this.trainingService = trainingService;
        this.trainings = [];
        this.testTypes = [];
        this.trainingId = '';
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.testType = '';
        this.testName = '';
        this.questions = [];
        this.result = null;
        this.progress = 0;
        this.busy = false;
        this.fileSaving = false;
        this.message = '';
        this.errorMessage = '';
        this.saveStatus = 'idle';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.loadTrainingList();
        this.testApi.getTestTypes().pipe(takeUntil(this.destroy$)).subscribe({
            next: (types) => this.testTypes = types.filter((type) => ['pre', 'post', 'chalange'].includes(type.toLowerCase())),
            error: (error) => this.fail('Test type dropdown could not be loaded.', error)
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    get validQuestions() {
        return this.questions.filter((question) => !question.validationErrors.length);
    }
    get availableTestTypes() {
        const training = this.trainings.find((item) => { var _a; return String((_a = item.trainingId) !== null && _a !== void 0 ? _a : '') === this.trainingId; });
        if (!training)
            return this.testTypes;
        return this.testTypes.filter((type) => !this.getLinkedTestId(training, type));
    }
    //private loadTrainingList(): void {
    //   const headers = new HttpHeaders({
    //     ETag: 'f88dd058fe004909615a64f01be66a7',
    //     'Content-Type': 'application/json'
    //   });
    //   this.http.get('assets/Training.json', { headers, responseType: 'text' })
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //       next: (data) => {
    //         const decrypted = this.dataService.decrypt(data);
    //         this.trainings = (decrypted?.Table || [])
    //           .map((training: any) => this.mapTrainingFromAsset(training))
    //           .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
    //       },
    //       error: (error) => this.fail('Training dropdown could not be loaded.', error)
    //     });
    // }
    // Future API integration: call this method instead of loadTrainingList().
    loadTrainingList() {
        this.trainingService.getPaged(1, 100).pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                this.trainings = (response.items || [])
                    .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
            },
            error: (error) => this.fail('Training dropdown could not be loaded.', error)
        });
    }
    mapTrainingFromAsset(training) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        return {
            trainingId: (_e = (_d = (_c = (_b = (_a = training.trainingId) !== null && _a !== void 0 ? _a : training.TrainingId) !== null && _b !== void 0 ? _b : training.TrainingID) !== null && _c !== void 0 ? _c : training.Id) !== null && _d !== void 0 ? _d : training.id) !== null && _e !== void 0 ? _e : '',
            trainingName: (_h = (_g = (_f = training.trainingName) !== null && _f !== void 0 ? _f : training.TrainingName) !== null && _g !== void 0 ? _g : training.Name) !== null && _h !== void 0 ? _h : '',
            trainingDesc: (_l = (_k = (_j = training.trainingDesc) !== null && _j !== void 0 ? _j : training.TrainingDesc) !== null && _k !== void 0 ? _k : training.Description) !== null && _l !== void 0 ? _l : '',
            topicCovered: (_p = (_o = (_m = training.topicCovered) !== null && _m !== void 0 ? _m : training.TopicCovered) !== null && _o !== void 0 ? _o : training.TopicCoveredName) !== null && _p !== void 0 ? _p : '',
            displayName: (_s = (_r = (_q = training.displayName) !== null && _q !== void 0 ? _q : training.DisplayName) !== null && _r !== void 0 ? _r : training.TrainingName) !== null && _s !== void 0 ? _s : '',
            image: (_u = (_t = training.image) !== null && _t !== void 0 ? _t : training.Image) !== null && _u !== void 0 ? _u : '',
            displayOrder: Number((_w = (_v = training.displayOrder) !== null && _v !== void 0 ? _v : training.DisplayOrder) !== null && _w !== void 0 ? _w : 0),
            preTestId: (_y = (_x = training.preTestId) !== null && _x !== void 0 ? _x : training.PreTestId) !== null && _y !== void 0 ? _y : null,
            postTestId: (_0 = (_z = training.postTestId) !== null && _z !== void 0 ? _z : training.PostTestId) !== null && _0 !== void 0 ? _0 : null,
            chalangeTestId: (_2 = (_1 = training.chalangeTestId) !== null && _1 !== void 0 ? _1 : training.ChalangeTestId) !== null && _2 !== void 0 ? _2 : null
        };
    }
    get filteredTrainingList() {
        const search = this.trainingSearch.trim().toLowerCase();
        if (!search)
            return this.trainings;
        return this.trainings.filter((training) => {
            const label = this.getTrainingLabel(training).toLowerCase();
            const id = String(training.trainingId || '').toLowerCase();
            const topic = (training.topicCovered || '').toLowerCase();
            return label.includes(search) || id.includes(search) || topic.includes(search);
        });
    }
    getTrainingLabel(training) {
        return String(training.displayName || '').trim()
            || String(training.trainingName || '').trim()
            || String(training.trainingId || 'Training');
    }
    getSelectedTrainingLabel() {
        const selected = this.trainings.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '') === this.trainingId; });
        return selected ? this.getTrainingLabel(selected) : 'Select Training';
    }
    toggleTrainingDropdown() {
        if (this.busy)
            return;
        this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
        if (this.isTrainingDropdownOpen)
            this.trainingSearch = '';
    }
    onTrainingSearchChange() {
        this.isTrainingDropdownOpen = true;
    }
    selectTrainingFromDropdown(training) {
        var _a;
        this.trainingId = String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '');
        this.trainingSearch = this.getTrainingLabel(training);
        this.isTrainingDropdownOpen = false;
        if (this.testType && this.getLinkedTestId(training, this.testType))
            this.testType = '';
    }
    getLinkedTestId(training, type) {
        const normalized = type.toLowerCase();
        const value = normalized === 'pre'
            ? training.preTestId
            : normalized === 'post'
                ? training.postTestId
                : normalized === 'chalange'
                    ? training.chalangeTestId
                    : null;
        return String(value !== null && value !== void 0 ? value : '').trim();
    }
    clearTrainingSelection() {
        this.trainingId = '';
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
    }
    closeTrainingDropdown(event) {
        if (!event.target.closest('.training-search-field')) {
            this.isTrainingDropdownOpen = false;
        }
    }
    selectFile(event) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const input = event.target;
            const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
            this.reset();
            if (!file)
                return;
            if (!file.name.toLowerCase().endsWith('.docx') || file.size > 10 * 1024 * 1024) {
                this.errorMessage = 'Select a .docx Word file no larger than 10 MB.';
                input.value = '';
                return;
            }
            this.busy = true;
            this.progress = 20;
            if (!this.testName.trim()) {
                this.testName = file.name.replace(/\.docx$/i, '').trim();
            }
            try {
                const mammoth = yield import('mammoth');
                const extracted = yield mammoth.extractRawText({ arrayBuffer: yield file.arrayBuffer() });
                this.progress = 70;
                this.questions = this.parse(extracted.value);
                this.progress = 100;
                this.message = `${this.questions.length} question(s) parsed: ${this.validQuestions.length} valid.`;
            }
            catch (error) {
                this.fail('The Word file could not be parsed.', error);
            }
            finally {
                this.busy = false;
            }
        });
    }
    save() {
        if (this.busy || this.fileSaving || !this.validQuestions.length)
            return;
        if (!this.trainingId) {
            this.fail('Select a training before creating the test.', null);
            return;
        }
        if (!['pre', 'post', 'chalange'].includes(this.testType.toLowerCase())) {
            this.fail('Select Pre, Post, or Chalange as the test type.', null);
            return;
        }
        const training = this.trainings.find((item) => String(item.trainingId || '') === this.trainingId);
        if (!training) {
            this.fail('The selected training is no longer available. Please select it again.', null);
            return;
        }
        const trainingName = (training === null || training === void 0 ? void 0 : training.trainingName) || (training === null || training === void 0 ? void 0 : training.displayName) || '';
        const questions = this.validQuestions.map((_a) => {
            var { validationErrors } = _a, question = __rest(_a, ["validationErrors"]);
            return (Object.assign(Object.assign({}, question), { trainingId: this.trainingId, trainingName }));
        });
        this.busy = true;
        this.progress = 0;
        this.result = null;
        this.message = '';
        this.errorMessage = '';
        this.saveStatus = 'saving';
        this.questionApi.importWordQuestions({
            trainingId: this.trainingId,
            trainingName,
            testType: this.testType,
            testName: this.testName,
            questions
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: (event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress = event.total ? Math.round(event.loaded * 100 / event.total) : 50;
                }
                if (event.type === HttpEventType.Response && event.body) {
                    this.result = event.body;
                    this.progress = 100;
                    const hasMappedQuestions = event.body.details.some((detail) => !!detail.questionId && (detail.status === 'inserted' || detail.status === 'duplicate'));
                    if (event.body.testCreated && !!event.body.testId && questions.length > 0 && hasMappedQuestions) {
                        this.fileSaving = true;
                        this.saveStatus = 'saving';
                        this.message = '';
                        void this.saveCreatedTestFile(event.body, questions)
                            .then(() => {
                            this.saveStatus = 'success';
                            this.message = `Completed: test ${event.body.testId}, ${event.body.inserted + event.body.duplicate} mapping(s), and encrypted test file were saved.`;
                        })
                            .catch((error) => {
                            this.saveStatus = 'error';
                            this.fail('Test and mappings were saved, but the encrypted test file could not be generated.', error);
                        })
                            .finally(() => {
                            this.fileSaving = false;
                            this.busy = false;
                        });
                    }
                    else {
                        this.saveStatus = 'success';
                        this.message = `Completed: ${event.body.inserted} question(s) saved to the question bank.`;
                    }
                }
            },
            error: (error) => {
                this.busy = false;
                this.saveStatus = 'error';
                this.fail('Import failed. The transaction was rolled back.', error);
            },
            complete: () => this.busy = false
        });
    }
    saveCreatedTestFile(result, importedQuestions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const mappedQuestions = result.details
                .filter((detail) => !!detail.questionId && (detail.status === 'inserted' || detail.status === 'duplicate'))
                .map((detail, index) => {
                const source = importedQuestions[detail.rowNumber - 1];
                return Object.assign(Object.assign({}, source), { id: Number(detail.questionId) || index + 1, questionId: detail.questionId, questionNo: index + 1, questionType: source.questionType, difficulty: source.difficulty, options: source.options.map((option) => ({
                        id: option.id,
                        text: option.text,
                        imageUrl: option.imageUrl,
                        imageAlt: option.imageAlt
                    })) });
            });
            const mappedQuestionIds = mappedQuestions.map((question) => String(question.questionId));
            if (!result.testCreated || !result.testId || !importedQuestions.length || !mappedQuestions.length) {
                return;
            }
            const now = new Date().toISOString();
            const testType = this.testType.toLowerCase();
            const testFile = {
                testId: result.testId,
                testName: this.testName,
                displayName: this.testName,
                fileName: result.testId,
                testTitle: this.testName,
                description: this.testName,
                trainingId: this.trainingId,
                trainingName: ((_a = this.trainings.find((item) => String(item.trainingId || '') === this.trainingId)) === null || _a === void 0 ? void 0 : _a.trainingName) || '',
                testFileType: testType,
                subject: '',
                topic: '',
                durationMinutes: 60,
                passingPercentage: 50,
                instructions: this.testName,
                status: 'Active',
                mappedQuestionIds,
                questionOrder: mappedQuestionIds,
                totalQuestions: mappedQuestions.length,
                totalMarks: mappedQuestions.reduce((sum, question) => sum + (question.marks || 1), 0),
                createdAt: now,
                updatedAt: now,
                version: 1,
                questions: mappedQuestions
            };
            yield this.testStorage.saveAssessmentFileToServer(testFile, testType);
        });
    }
    parse(text) {
        const parsed = [];
        let current = null;
        const lines = text.replace(/\r/g, '').split('\n');
        for (const raw of lines) {
            const line = raw.trim();
            if (!line)
                continue;
            const start = line.match(/^(?:(?:question\s*\d*|q\s*\d+)|\d+)\s*[:.)-]\s*(.+)$/i);
            if (start) {
                if (current)
                    parsed.push(current);
                const type = start[1].match(/\b(?:question\s*)?type\s*:\s*([a-z_-]+)/i);
                const marks = start[1].match(/\(\s*(\d+(?:\.\d+)?)\s*(?:points?|marks?)\s*\)/i);
                const questionText = start[1]
                    .replace(/\s*\(\s*\d+(?:\.\d+)?\s*(?:points?|marks?)\s*\)/i, '')
                    .replace(/\s*,?\s*(?:question\s*)?type\s*:\s*[a-z_-]+\s*$/i, '')
                    .trim();
                current = this.emptyParsed(questionText);
                if (marks)
                    current.marks = marks[1];
                if (type)
                    current.type = type[1];
                continue;
            }
            if (!current)
                continue;
            const option = line.match(/^(?:option\s+)?([a-h]|true|false)\s*[:.)-]\s*(.+)$/i);
            if (option) {
                current.options.push({ id: option[1].toLowerCase(), text: option[2] });
                continue;
            }
            const field = line.match(/^([a-z ]+)\s*:\s*(.*)$/i);
            if (!field)
                continue;
            const label = field[1].trim().toLowerCase();
            const value = field[2].trim();
            if (['training id', 'training name', 'test type'].includes(label))
                continue;
            if (label === 'type' || label === 'question type')
                current.type = value;
            // Subject and topic are not used for Word-imported questions.
            if (label === 'difficulty')
                current.difficulty = value;
            if (label === 'answer' || label === 'correct answer')
                current.answer = value;
            if (label === 'expected answer' || label === 'sample answer')
                current.expectedAnswer = value;
            if (label === 'explanation' || label === 'explanation for incorrect answer')
                current.explanation = value;
            if (label === 'marks')
                current.marks = value;
        }
        if (current)
            parsed.push(current);
        return parsed.map((item, index) => this.toQuestion(item, index));
    }
    emptyParsed(text) {
        return {
            text, type: 'MCSA', subject: '', topic: '', difficulty: 'Easy', answer: '',
            expectedAnswer: '', explanation: '', marks: '1', options: []
        };
    }
    toQuestion(item, index) {
        const type = this.normalizeType(item.type);
        const sourceOptions = type === 'TRUE_FALSE' && !item.options.length
            ? [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }]
            : item.options;
        const answerIds = (type === 'MCMA' ? item.answer.split('#') : [item.answer])
            .map((value) => this.normalizeAnswerValue(value))
            .filter(Boolean);
        const options = sourceOptions.map((option, optionIndex) => {
            const id = this.normalizeAnswerValue(option.id);
            const optionText = this.normalizeAnswerValue(option.text);
            const correct = answerIds.some((answer) => answer.replace(/^option\s+/, '') === id || answer === optionText);
            return {
                id, text: option.text, imageUrl: '', audioUrl: '', videoUrl: '', imageAlt: '',
                displayOrder: optionIndex + 1, isCorrect: correct
            };
        });
        const correctIds = options.filter((option) => option.isCorrect).map((option) => option.id);
        const now = new Date().toISOString();
        const question = {
            questionId: '', id: '', trainingId: '', trainingName: '', questionNo: index + 1,
            questionType: type, subject: item.subject, topic: item.topic, category: '', section: '',
            difficulty: this.normalizeDifficulty(item.difficulty), questionText: item.text,
            questionImageUrl: '', questionImageAlt: '', audioUrl: '', videoUrl: '', options,
            correctOptionId: correctIds[0] || '', correctOptionIds: correctIds,
            expectedAnswer: type === 'ESSAY' ? (item.expectedAnswer || item.answer) : '',
            sampleAnswer: '', manualReviewRequired: type === 'ESSAY', explanation: item.explanation,
            explanationImageUrl: '', explanationImageAlt: '', marks: Number(item.marks || 1),
            negativeMarks: 0, estimatedTimeSeconds: 60, metadataJson: '', isActive: true,
            version: 1, createdAt: now, updatedAt: now, validationErrors: []
        };
        question.validationErrors = this.validate(question);
        return question;
    }
    normalizeAnswerValue(value) {
        return value.trim().toLowerCase();
    }
    validate(question) {
        const errors = [];
        if (!question.questionText)
            errors.push('Question text is required.');
        if (!Number.isFinite(question.marks) || question.marks <= 0)
            errors.push('Marks must be greater than zero.');
        if (question.questionType === 'ESSAY') {
            return errors;
        }
        if (question.options.length < 2)
            errors.push('At least two options are required.');
        if (!question.correctOptionIds.length)
            errors.push('Correct answer must match an option.');
        if (question.questionType !== 'MCMA' && question.correctOptionIds.length > 1) {
            errors.push('Only MCMA may have multiple correct answers.');
        }
        return errors;
    }
    normalizeType(value) {
        const clean = value.replace(/[\s_-]/g, '').toUpperCase();
        if (clean === 'MCMA')
            return 'MCMA';
        if (clean === 'TRUEFALSE')
            return 'TRUE_FALSE';
        if (clean === 'ESSAY')
            return 'ESSAY';
        return 'MCSA';
    }
    normalizeDifficulty(value) {
        const clean = value.toLowerCase();
        return clean === 'hard' ? 'Hard' : clean === 'medium' ? 'Medium' : 'Easy';
    }
    reset() {
        this.questions = [];
        this.result = null;
        this.progress = 0;
        this.message = '';
        this.errorMessage = '';
        this.saveStatus = 'idle';
    }
    fail(message, error) {
        var _a, _b;
        console.error('[CreateTestQuestions]', message, error);
        const apiMessage = ((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message)
            || ((_b = error === null || error === void 0 ? void 0 : error.error) === null || _b === void 0 ? void 0 : _b.title)
            || (error === null || error === void 0 ? void 0 : error.message);
        this.errorMessage = apiMessage ? `${message} ${apiMessage}` : message;
    }
}
CreateTestQuestionsComponent.ɵfac = function CreateTestQuestionsComponent_Factory(t) { return new (t || CreateTestQuestionsComponent)(i0.ɵɵdirectiveInject(i1.HttpClient), i0.ɵɵdirectiveInject(i2.DataService), i0.ɵɵdirectiveInject(i3.QuestionApiService), i0.ɵɵdirectiveInject(i4.TestApiService), i0.ɵɵdirectiveInject(i5.TestStorageService), i0.ɵɵdirectiveInject(i6.TrainingManagementService)); };
CreateTestQuestionsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateTestQuestionsComponent, selectors: [["app-create-test-questions"]], hostBindings: function CreateTestQuestionsComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function CreateTestQuestionsComponent_click_HostBindingHandler($event) { return ctx.closeTrainingDropdown($event); }, false, i0.ɵɵresolveDocument);
    } }, decls: 46, vars: 15, consts: [[1, "import-page"], [1, "eyebrow"], [1, "panel", "controls"], [1, "training-search-field"], ["aria-hidden", "true"], [1, "training-search-control"], ["type", "button", "aria-haspopup", "listbox", 1, "training-dropdown-toggle", 3, "disabled", "click"], [1, "dropdown-icon"], ["class", "training-search-menu", "role", "listbox", 4, "ngIf"], [3, "ngModel", "disabled", "ngModelChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["placeholder", "Defaults to Word filename", 3, "ngModel", "disabled", "ngModelChange"], ["type", "file", "accept", ".docx", 3, "disabled", "change"], [1, "note"], ["class", "progress", 4, "ngIf"], ["class", "status-notification status-notification--success", "role", "status", 4, "ngIf"], ["class", "status-notification status-notification--error", "role", "alert", 4, "ngIf"], [1, "panel", "help"], ["class", "preview", 4, "ngIf"], ["class", "panel", 4, "ngIf"], ["role", "listbox", 1, "training-search-menu"], ["type", "text", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelChange", "input"], ["class", "training-search-option", "type", "button", "role", "option", 3, "mousedown", 4, "ngFor", "ngForOf"], ["class", "training-search-empty", 4, "ngIf"], ["type", "button", "role", "option", 1, "training-search-option", 3, "mousedown"], [1, "training-search-empty"], [3, "value"], [1, "progress"], ["role", "status", 1, "status-notification", "status-notification--success"], [1, "status-icon"], ["role", "alert", 1, "status-notification", "status-notification--error"], [1, "preview"], [1, "preview-heading"], ["type", "button", 1, "save-questions-btn", 3, "disabled", "click"], ["class", "save-spinner", 4, "ngIf"], ["class", "status-notification save-result-notification", "aria-live", "polite", 3, "status-notification--progress", "status-notification--success", "status-notification--error", 4, "ngIf"], [3, "invalid", 4, "ngFor", "ngForOf"], [1, "save-spinner"], ["aria-live", "polite", 1, "status-notification", "save-result-notification"], ["class", "save-spinner save-spinner--blue", 4, "ngIf"], ["class", "status-icon", 4, "ngIf"], [4, "ngIf"], [1, "save-spinner", "save-spinner--blue"], [1, "question-heading"], ["class", "errors", 4, "ngIf"], [3, "correct", 4, "ngFor", "ngForOf"], [1, "errors"], [4, "ngFor", "ngForOf"], [1, "panel"], [1, "counts"], [1, "table-wrap"]], template: function CreateTestQuestionsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "header")(2, "p", 1);
        i0.ɵɵtext(3, "Question administration");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "h1");
        i0.ɵɵtext(5, "Create Test Questions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "p");
        i0.ɵɵtext(7, "Upload a Word document, preview validation, and save valid questions.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div", 2)(9, "label", 3);
        i0.ɵɵtext(10, "Training ");
        i0.ɵɵelementStart(11, "span", 4);
        i0.ɵɵtext(12, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 5)(14, "button", 6);
        i0.ɵɵlistener("click", function CreateTestQuestionsComponent_Template_button_click_14_listener() { return ctx.toggleTrainingDropdown(); });
        i0.ɵɵelementStart(15, "span");
        i0.ɵɵtext(16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "span", 7);
        i0.ɵɵtext(18, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(19, CreateTestQuestionsComponent_div_19_Template, 4, 3, "div", 8);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(20, "label");
        i0.ɵɵtext(21, "Test type ");
        i0.ɵɵelementStart(22, "span", 4);
        i0.ɵɵtext(23, "*");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "select", 9);
        i0.ɵɵlistener("ngModelChange", function CreateTestQuestionsComponent_Template_select_ngModelChange_24_listener($event) { return ctx.testType = $event; });
        i0.ɵɵelementStart(25, "option", 10);
        i0.ɵɵtext(26, "Select test type");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(27, CreateTestQuestionsComponent_option_27_Template, 3, 4, "option", 11);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(28, "label");
        i0.ɵɵtext(29, "Test name ");
        i0.ɵɵelementStart(30, "input", 12);
        i0.ɵɵlistener("ngModelChange", function CreateTestQuestionsComponent_Template_input_ngModelChange_30_listener($event) { return ctx.testName = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(31, "label");
        i0.ɵɵtext(32, "Word file (.docx, maximum 10 MB) ");
        i0.ɵɵelementStart(33, "input", 13);
        i0.ɵɵlistener("change", function CreateTestQuestionsComponent_Template_input_change_33_listener($event) { return ctx.selectFile($event); });
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(34, "p", 14);
        i0.ɵɵtext(35, " Word Training Name and Test Type are ignored. Select both fields above; the test is created and all valid questions are mapped, and the matching training test field is updated. ");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(36, CreateTestQuestionsComponent_div_36_Template, 4, 3, "div", 15);
        i0.ɵɵtemplate(37, CreateTestQuestionsComponent_div_37_Template, 8, 1, "div", 16);
        i0.ɵɵtemplate(38, CreateTestQuestionsComponent_div_38_Template, 8, 1, "div", 17);
        i0.ɵɵelementStart(39, "details", 18)(40, "summary");
        i0.ɵɵtext(41, "Supported Word labels");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(42, "pre");
        i0.ɵɵtext(43, "Question: What is 2 + 2?\nType: MCSA\nSubject: Mathematics\nTopic: Addition\nDifficulty: Easy\nOption A: 3\nOption B: 4\nAnswer: B\nExplanation: 2 + 2 equals 4\nMarks: 1\n\nFor MCMA, separate correct answers with #:\nAnswer: B # D");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(44, CreateTestQuestionsComponent_section_44_Template, 12, 8, "section", 19);
        i0.ɵɵtemplate(45, CreateTestQuestionsComponent_section_45_Template, 32, 7, "section", 20);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("disabled", ctx.busy);
        i0.ɵɵattribute("aria-expanded", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.getSelectedTrainingLabel());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngModel", ctx.testType)("disabled", ctx.busy);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.testTypes);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testName)("disabled", ctx.busy);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("disabled", ctx.busy);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.progress);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.message && ctx.saveStatus === "idle");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.errorMessage && ctx.saveStatus === "idle");
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngIf", ctx.questions.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.result);
    } }, dependencies: [i7.NgForOf, i7.NgIf, i8.NgSelectOption, i8.ɵNgSelectMultipleOption, i8.DefaultValueAccessor, i8.SelectControlValueAccessor, i8.NgControlStatus, i8.NgModel, i7.UpperCasePipe, i7.TitleCasePipe], styles: ["[_nghost-%COMP%] { display: block; }\n.import-page[_ngcontent-%COMP%] { max-width: 1120px; margin: auto; color: #172033; }\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%] { margin: 0 0 8px; }\n.eyebrow[_ngcontent-%COMP%] { color: #1b66d2; font-size: 12px; font-weight: 700; text-transform: uppercase; }\n.panel[_ngcontent-%COMP%], article[_ngcontent-%COMP%] { margin-top: 20px; padding: 20px; border: 1px solid #dfe6ef; border-radius: 10px; background: white; }\n.controls[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }\nlabel[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 7px; font-weight: 600; }\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%] { min-height: 42px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; }\n.note[_ngcontent-%COMP%] { padding: 14px; border-left: 4px solid #1b66d2; background: #eef5ff; }\n.progress[_ngcontent-%COMP%] { position: relative; height: 10px; margin-top: 18px; border-radius: 8px; background: #e5eaf1; }\n.progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; height: 100%; border-radius: 8px; background: #1b66d2; }\n.progress[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { position: absolute; right: 0; top: -20px; }\n.success[_ngcontent-%COMP%], .error[_ngcontent-%COMP%] { padding: 12px; border-radius: 6px; }\n.success[_ngcontent-%COMP%] { color: #166534; background: #dcfce7; }\n.error[_ngcontent-%COMP%], .errors[_ngcontent-%COMP%] { color: #991b1b; background: #fee2e2; }\n.help[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] { overflow: auto; padding: 12px; background: #f6f8fb; }\n.preview[_ngcontent-%COMP%] { margin-top: 28px; }\n.preview-heading[_ngcontent-%COMP%], .question-heading[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: 16px; }\nbutton[_ngcontent-%COMP%] { padding: 10px 18px; border: 0; border-radius: 6px; color: white; background: #1b66d2; }\nbutton[_ngcontent-%COMP%]:disabled { opacity: .55; }\narticle[_ngcontent-%COMP%] { border-left: 4px solid #1f9d55; }\narticle.invalid[_ngcontent-%COMP%] { border-left-color: #dc2626; }\n.correct[_ngcontent-%COMP%] { color: #166534; }\n.counts[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }\n.counts[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { padding: 12px; text-align: center; background: #f3f6fa; }\n.counts[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], .counts[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; }\n.counts[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { font-size: 22px; }\n.table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\ntable[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; }\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { padding: 9px; border-bottom: 1px solid #e4e9f1; text-align: left; }\n@media (max-width: 720px) {\n  .controls[_ngcontent-%COMP%], .counts[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .preview-heading[_ngcontent-%COMP%] { flex-direction: column; }\n}\n\n.training-search-field[_ngcontent-%COMP%] { position: relative; }\n.training-search-control[_ngcontent-%COMP%] { position: relative; }\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 42px;\n  padding: 8px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  color: #172033;\n  background: #fff;\n  text-align: left;\n}\n.training-dropdown-toggle[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] { margin-left: auto; color: #64748b; }\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 30;\n  top: calc(100% + 6px);\n  right: 0;\n  left: 0;\n  max-height: 280px;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid #dfe6ef;\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 30px rgba(23, 32, 51, .16);\n}\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 100%; margin-bottom: 6px; box-sizing: border-box; }\n.training-search-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  width: 100%;\n  padding: 10px 12px;\n  color: #172033;\n  background: transparent;\n  text-align: left;\n}\n.training-search-option[_ngcontent-%COMP%]:hover { background: #eef5ff; }\n.training-search-option[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #64748b; font-weight: 400; }\n.training-search-clear[_ngcontent-%COMP%] { color: #64748b; border-bottom: 1px solid #e5eaf1; }\n.training-search-empty[_ngcontent-%COMP%] { padding: 10px 12px; color: #64748b; font-weight: 400; }\n\n.status-notification[_ngcontent-%COMP%] { align-items: center; border: 1px solid; border-radius: 10px; display: flex; gap: 12px; margin-top: 18px; padding: 14px 16px; }\n.status-notification[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { display: grid; gap: 3px; }\n.status-notification[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .status-notification[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; }\n.status-notification--success[_ngcontent-%COMP%] { background: #ecfdf3; border-color: #86efac; color: #166534; }\n.status-notification--error[_ngcontent-%COMP%] { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }\n.status-icon[_ngcontent-%COMP%] { align-items: center; border: 2px solid currentColor; border-radius: 50%; display: inline-flex !important; flex: 0 0 30px; font-weight: 800; height: 30px; justify-content: center; }\n.save-questions-btn[_ngcontent-%COMP%] { align-items: center; background: linear-gradient(135deg, #1557b0, #1b66d2); border: 0; border-radius: 9px; box-shadow: 0 6px 16px rgba(27, 102, 210, .24); color: #fff; cursor: pointer; display: inline-flex; font-size: 15px; font-weight: 700; gap: 9px; justify-content: center; min-height: 44px; padding: 11px 20px; transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease; }\n.save-questions-btn[_ngcontent-%COMP%]:hover:not(:disabled) { box-shadow: 0 8px 20px rgba(27, 102, 210, .32); transform: translateY(-1px); }\n.save-questions-btn[_ngcontent-%COMP%]:focus-visible { outline: 3px solid rgba(27, 102, 210, .3); outline-offset: 3px; }\n.save-questions-btn[_ngcontent-%COMP%]:disabled { cursor: not-allowed; opacity: .55; }\n.save-spinner[_ngcontent-%COMP%] { animation: save-spin .8s linear infinite; border: 2px solid rgba(255, 255, 255, .45); border-radius: 50%; border-top-color: #fff; height: 16px; width: 16px; }\n@keyframes save-spin { to { transform: rotate(360deg); } }\n\n.status-notification--progress[_ngcontent-%COMP%] { background: #eff6ff; border-color: #93c5fd; color: #1e40af; }\n.save-result-notification[_ngcontent-%COMP%] { margin: 0; }\n.save-spinner--blue[_ngcontent-%COMP%] { border-color: rgba(30, 64, 175, .25); border-top-color: #1e40af; flex: 0 0 18px; }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateTestQuestionsComponent, [{
        type: Component,
        args: [{ selector: 'app-create-test-questions', template: "<section class=\"import-page\">\n  <header>\n    <p class=\"eyebrow\">Question administration</p>\n    <h1>Create Test Questions</h1>\n    <p>Upload a Word document, preview validation, and save valid questions.</p>\n  </header>\n\n  <div class=\"panel controls\">\n    <label class=\"training-search-field\">Training <span aria-hidden=\"true\">*</span>\n      <div class=\"training-search-control\">\n        <button class=\"training-dropdown-toggle\" type=\"button\" (click)=\"toggleTrainingDropdown()\" [disabled]=\"busy\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"isTrainingDropdownOpen\">\n          <span>{{ getSelectedTrainingLabel() }}</span>\n          <span class=\"dropdown-icon\">&#9662;</span>\n        </button>\n        <div class=\"training-search-menu\" *ngIf=\"isTrainingDropdownOpen\" role=\"listbox\">\n          <input type=\"text\" [(ngModel)]=\"trainingSearch\" placeholder=\"Search training\" autocomplete=\"off\" (input)=\"onTrainingSearchChange()\" />\n          <button class=\"training-search-option\" type=\"button\" *ngFor=\"let training of filteredTrainingList\" (mousedown)=\"selectTrainingFromDropdown(training)\" role=\"option\">\n            <span>{{ getTrainingLabel(training) }}</span>\n            <!-- <small>{{ training.trainingId }}</small> -->\n          </button>\n          <div class=\"training-search-empty\" *ngIf=\"!filteredTrainingList.length\">No training found</div>\n        </div>\n      </div>\n    </label>\n    <label>Test type <span aria-hidden=\"true\">*</span>\n      <select [(ngModel)]=\"testType\" [disabled]=\"busy\">\n        <option value=\"\">Select test type</option>\n        <option *ngFor=\"let type of testTypes\" [value]=\"type\">{{ type | titlecase }}</option>\n      </select>\n    </label>\n    <label>Test name\n      <input [(ngModel)]=\"testName\" [disabled]=\"busy\" placeholder=\"Defaults to Word filename\">\n    </label>\n    <label>Word file (.docx, maximum 10 MB)\n      <input type=\"file\" accept=\".docx\" (change)=\"selectFile($event)\" [disabled]=\"busy\">\n    </label>\n  </div>\n\n  <p class=\"note\">\n    Word Training Name and Test Type are ignored. Select both fields above; the test is created and\n    all valid questions are mapped, and the matching training test field is updated.\n  </p>\n\n  <div class=\"progress\" *ngIf=\"progress\">\n    <span [style.width.%]=\"progress\"></span>\n    <small>{{ progress }}%</small>\n  </div>\n  <div class=\"status-notification status-notification--success\" *ngIf=\"message && saveStatus === 'idle'\" role=\"status\">\n    <span class=\"status-icon\">&#10003;</span>\n    <div><strong>Preview ready</strong><span>{{ message }}</span></div>\n  </div>\n  <div class=\"status-notification status-notification--error\" *ngIf=\"errorMessage && saveStatus === 'idle'\" role=\"alert\">\n    <span class=\"status-icon\">!</span>\n    <div><strong>Unable to complete import</strong><span>{{ errorMessage }}</span></div>\n  </div>\n\n  <details class=\"panel help\">\n    <summary>Supported Word labels</summary>\n    <pre>Question: What is 2 + 2?\nType: MCSA\nSubject: Mathematics\nTopic: Addition\nDifficulty: Easy\nOption A: 3\nOption B: 4\nAnswer: B\nExplanation: 2 + 2 equals 4\nMarks: 1\n\nFor MCMA, separate correct answers with #:\nAnswer: B # D</pre>\n  </details>\n\n  <section *ngIf=\"questions.length\" class=\"preview\">\n    <div class=\"preview-heading\">\n      <div>\n        <h2>Validation preview</h2>\n        <p>{{ questions.length }} total | {{ validQuestions.length }} valid |\n          {{ questions.length - validQuestions.length }} invalid</p>\n      </div>\n      <button class=\"save-questions-btn\" type=\"button\" (click)=\"save()\" [disabled]=\"busy || fileSaving || !validQuestions.length || !trainingId || !testType\">\n        <span class=\"save-spinner\" *ngIf=\"busy\"></span>\n        {{ (busy || fileSaving) ? 'Saving...' : 'Create Test & Map Questions' }}\n      </button>\n    </div>\n\n    <div class=\"status-notification save-result-notification\" [class.status-notification--progress]=\"saveStatus === 'saving'\" [class.status-notification--success]=\"saveStatus === 'success'\" [class.status-notification--error]=\"saveStatus === 'error'\" *ngIf=\"saveStatus !== 'idle'\" [attr.role]=\"saveStatus === 'error' ? 'alert' : 'status'\" aria-live=\"polite\">\n      <span class=\"save-spinner save-spinner--blue\" *ngIf=\"saveStatus === 'saving'\"></span>\n      <span class=\"status-icon\" *ngIf=\"saveStatus === 'success'\">&#10003;</span>\n      <span class=\"status-icon\" *ngIf=\"saveStatus === 'error'\">!</span>\n      <div *ngIf=\"saveStatus === 'saving'\"><strong>Saving questions</strong><span>Please wait while questions and mappings are saved.</span></div>\n      <div *ngIf=\"saveStatus === 'success' && result\">\n        <strong>{{ result.testCreated ? 'Test created and questions mapped' : 'Questions saved' }}</strong>\n        <span>New: {{ result.inserted }} | Reused: {{ result.duplicate }} | Failed: {{ result.failed }}<ng-container *ngIf=\"result.testCreated\"> | Mapped: {{ result.inserted + result.duplicate }} | Test ID: {{ result.testId }}</ng-container></span>\n      </div>\n      <div *ngIf=\"saveStatus === 'error'\"><strong>Save failed</strong><span>{{ errorMessage }}</span></div>\n    </div>\n\n    <article *ngFor=\"let question of questions; let index = index\"\n             [class.invalid]=\"question.validationErrors.length\">\n      <div class=\"question-heading\">\n        <strong>{{ index + 1 }}. {{ question.questionText }}</strong>\n        <span>{{ question.validationErrors.length ? 'Invalid' : 'Valid' }}</span>\n      </div>\n      <p>\n        <strong>Type:</strong> {{ question.questionType }} |\n        <!-- Subject is intentionally hidden from the question preview. -->\n        <!-- <strong>Subject:</strong> {{ question.subject || 'No subject' }} | -->\n        <!-- Topic is intentionally hidden from the question preview. -->\n        <!-- <strong>Topic:</strong> {{ question.topic || 'No topic' }} | -->\n        <strong>Marks:</strong> {{ question.marks }}\n      </p>\n      <ul *ngIf=\"question.options.length\">\n        <li *ngFor=\"let option of question.options\" [class.correct]=\"option.isCorrect\">\n          {{ option.id | uppercase }}. {{ option.text }} <em *ngIf=\"option.isCorrect\">Correct</em>\n        </li>\n      </ul>\n      <p *ngIf=\"question.questionType === 'ESSAY'\"><b>Expected answer:</b> {{ question.expectedAnswer }}</p>\n      <ul class=\"errors\" *ngIf=\"question.validationErrors.length\">\n        <li *ngFor=\"let validationError of question.validationErrors\">{{ validationError }}</li>\n      </ul>\n    </article>\n  </section>\n\n  <section class=\"panel\" *ngIf=\"result\">\n    <h2>Import result</h2>\n    <div class=\"counts\">\n      <div><b>{{ result.total }}</b><span>Total</span></div>\n      <div><b>{{ result.inserted }}</b><span>Inserted</span></div>\n      <div><b>{{ result.skipped }}</b><span>Skipped</span></div>\n      <div><b>{{ result.duplicate }}</b><span>Duplicate</span></div>\n      <div><b>{{ result.failed }}</b><span>Failed</span></div>\n    </div>\n    <p *ngIf=\"result.testCreated\">Created Test ID: <b>{{ result.testId }}</b></p>\n    <div class=\"table-wrap\">\n      <table *ngIf=\"result.details.length\">\n        <thead><tr><th>Row</th><th>Question</th><th>Status</th><th>Validation/details</th><th>ID</th></tr></thead>\n        <tbody>\n          <tr *ngFor=\"let detail of result.details\">\n            <td>{{ detail.rowNumber }}</td><td>{{ detail.questionText }}</td><td>{{ detail.status }}</td>\n            <td>{{ detail.message }}</td><td>{{ detail.questionId || '-' }}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </section>\n</section>\n", styles: [":host { display: block; }\n.import-page { max-width: 1120px; margin: auto; color: #172033; }\nh1, h2 { margin: 0 0 8px; }\n.eyebrow { color: #1b66d2; font-size: 12px; font-weight: 700; text-transform: uppercase; }\n.panel, article { margin-top: 20px; padding: 20px; border: 1px solid #dfe6ef; border-radius: 10px; background: white; }\n.controls { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }\nlabel { display: flex; flex-direction: column; gap: 7px; font-weight: 600; }\ninput, select { min-height: 42px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; }\n.note { padding: 14px; border-left: 4px solid #1b66d2; background: #eef5ff; }\n.progress { position: relative; height: 10px; margin-top: 18px; border-radius: 8px; background: #e5eaf1; }\n.progress span { display: block; height: 100%; border-radius: 8px; background: #1b66d2; }\n.progress small { position: absolute; right: 0; top: -20px; }\n.success, .error { padding: 12px; border-radius: 6px; }\n.success { color: #166534; background: #dcfce7; }\n.error, .errors { color: #991b1b; background: #fee2e2; }\n.help pre { overflow: auto; padding: 12px; background: #f6f8fb; }\n.preview { margin-top: 28px; }\n.preview-heading, .question-heading { display: flex; justify-content: space-between; gap: 16px; }\nbutton { padding: 10px 18px; border: 0; border-radius: 6px; color: white; background: #1b66d2; }\nbutton:disabled { opacity: .55; }\narticle { border-left: 4px solid #1f9d55; }\narticle.invalid { border-left-color: #dc2626; }\n.correct { color: #166534; }\n.counts { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }\n.counts div { padding: 12px; text-align: center; background: #f3f6fa; }\n.counts b, .counts span { display: block; }\n.counts b { font-size: 22px; }\n.table-wrap { overflow-x: auto; }\ntable { width: 100%; border-collapse: collapse; }\nth, td { padding: 9px; border-bottom: 1px solid #e4e9f1; text-align: left; }\n@media (max-width: 720px) {\n  .controls, .counts { grid-template-columns: 1fr; }\n  .preview-heading { flex-direction: column; }\n}\n\n.training-search-field { position: relative; }\n.training-search-control { position: relative; }\n.training-dropdown-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 42px;\n  padding: 8px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  color: #172033;\n  background: #fff;\n  text-align: left;\n}\n.training-dropdown-toggle .dropdown-icon { margin-left: auto; color: #64748b; }\n.training-search-menu {\n  position: absolute;\n  z-index: 30;\n  top: calc(100% + 6px);\n  right: 0;\n  left: 0;\n  max-height: 280px;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid #dfe6ef;\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 30px rgba(23, 32, 51, .16);\n}\n.training-search-menu input { width: 100%; margin-bottom: 6px; box-sizing: border-box; }\n.training-search-option {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  width: 100%;\n  padding: 10px 12px;\n  color: #172033;\n  background: transparent;\n  text-align: left;\n}\n.training-search-option:hover { background: #eef5ff; }\n.training-search-option small { color: #64748b; font-weight: 400; }\n.training-search-clear { color: #64748b; border-bottom: 1px solid #e5eaf1; }\n.training-search-empty { padding: 10px 12px; color: #64748b; font-weight: 400; }\n\n.status-notification { align-items: center; border: 1px solid; border-radius: 10px; display: flex; gap: 12px; margin-top: 18px; padding: 14px 16px; }\n.status-notification div { display: grid; gap: 3px; }\n.status-notification strong, .status-notification span { display: block; }\n.status-notification--success { background: #ecfdf3; border-color: #86efac; color: #166534; }\n.status-notification--error { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }\n.status-icon { align-items: center; border: 2px solid currentColor; border-radius: 50%; display: inline-flex !important; flex: 0 0 30px; font-weight: 800; height: 30px; justify-content: center; }\n.save-questions-btn { align-items: center; background: linear-gradient(135deg, #1557b0, #1b66d2); border: 0; border-radius: 9px; box-shadow: 0 6px 16px rgba(27, 102, 210, .24); color: #fff; cursor: pointer; display: inline-flex; font-size: 15px; font-weight: 700; gap: 9px; justify-content: center; min-height: 44px; padding: 11px 20px; transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease; }\n.save-questions-btn:hover:not(:disabled) { box-shadow: 0 8px 20px rgba(27, 102, 210, .32); transform: translateY(-1px); }\n.save-questions-btn:focus-visible { outline: 3px solid rgba(27, 102, 210, .3); outline-offset: 3px; }\n.save-questions-btn:disabled { cursor: not-allowed; opacity: .55; }\n.save-spinner { animation: save-spin .8s linear infinite; border: 2px solid rgba(255, 255, 255, .45); border-radius: 50%; border-top-color: #fff; height: 16px; width: 16px; }\n@keyframes save-spin { to { transform: rotate(360deg); } }\n\n.status-notification--progress { background: #eff6ff; border-color: #93c5fd; color: #1e40af; }\n.save-result-notification { margin: 0; }\n.save-spinner--blue { border-color: rgba(30, 64, 175, .25); border-top-color: #1e40af; flex: 0 0 18px; }\n"] }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.DataService }, { type: i3.QuestionApiService }, { type: i4.TestApiService }, { type: i5.TestStorageService }, { type: i6.TrainingManagementService }]; }, { closeTrainingDropdown: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
//# sourceMappingURL=create-test-questions.component.js.map