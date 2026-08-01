import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./services/test-storage.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
function ResultComponent_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", ctx_r0.submission.testName, " - ", ctx_r0.submission.username, "");
} }
function ResultComponent_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Select a user and training to view a saved result.");
    i0.ɵɵelementEnd();
} }
function ResultComponent_section_9_option_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "titlecase");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r8);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r8));
} }
function ResultComponent_section_9_option_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", user_r9);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(user_r9);
} }
function ResultComponent_section_9_option_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const training_r10 = ctx.$implicit;
    i0.ɵɵproperty("value", training_r10.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(training_r10.label);
} }
function ResultComponent_section_9_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 8)(1, "div")(2, "span", 3);
    i0.ɵɵtext(3, "Saved Results");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Find a Result");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 9)(7, "select", 10);
    i0.ɵɵlistener("ngModelChange", function ResultComponent_section_9_Template_select_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.selectedTestType = $event); })("ngModelChange", function ResultComponent_section_9_Template_select_ngModelChange_7_listener() { i0.ɵɵrestoreView(_r12); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.onSelectionChange()); });
    i0.ɵɵelementStart(8, "option", 11);
    i0.ɵɵtext(9, "Select Test Type");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, ResultComponent_section_9_option_10_Template, 3, 4, "option", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 13);
    i0.ɵɵlistener("ngModelChange", function ResultComponent_section_9_Template_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.selectedUsername = $event); })("ngModelChange", function ResultComponent_section_9_Template_select_ngModelChange_11_listener() { i0.ɵɵrestoreView(_r12); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.onSelectionChange()); });
    i0.ɵɵelementStart(12, "option", 11);
    i0.ɵɵtext(13, "Select User");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, ResultComponent_section_9_option_14_Template, 2, 2, "option", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 14);
    i0.ɵɵlistener("ngModelChange", function ResultComponent_section_9_Template_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.selectedTraining = $event); })("ngModelChange", function ResultComponent_section_9_Template_select_ngModelChange_15_listener() { i0.ɵɵrestoreView(_r12); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.onSelectionChange()); });
    i0.ɵɵelementStart(16, "option", 11);
    i0.ɵɵtext(17, "Select Training");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, ResultComponent_section_9_option_18_Template, 2, 2, "option", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 15);
    i0.ɵɵlistener("click", function ResultComponent_section_9_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r12); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.clearSelection()); });
    i0.ɵɵtext(20, "Clear");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r2.selectedTestType);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.testTypes);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r2.selectedUsername);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.users);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r2.selectedTraining);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.trainings);
} }
function ResultComponent_section_10_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "The result appears automatically after test type, user, and training are selected.");
    i0.ɵɵelementEnd();
} }
function ResultComponent_section_10_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r20.resultMessage);
} }
function ResultComponent_section_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 17)(1, "h2");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, ResultComponent_section_10_p_3_Template, 2, 0, "p", 4);
    i0.ɵɵtemplate(4, ResultComponent_section_10_p_4_Template, 2, 1, "p", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isLoadingOptions ? "Loading Users and Trainings" : ctx_r3.isLoadingResult ? "Loading Result" : "Choose All Options");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.isLoadingOptions && !ctx_r3.isLoadingResult && !ctx_r3.resultMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.resultMessage);
} }
function ResultComponent_section_11_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r21.resultSaveWarning);
} }
function ResultComponent_section_11_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1, "The test was automatically submitted when time expired.");
    i0.ɵɵelementEnd();
} }
function ResultComponent_section_11_p_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r28 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate4("", item_r28.label, ": ", item_r28.total, " questions, ", item_r28.obtainedMarks, "/", item_r28.marks, " marks");
} }
function ResultComponent_section_11_p_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r29 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3("", item_r29.label, ": ", item_r29.total, " questions, ", item_r29.correct, " correct");
} }
function ResultComponent_section_11_p_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r30 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3("", item_r30.label, ": ", item_r30.obtainedMarks, "/", item_r30.marks, " marks");
} }
function ResultComponent_section_11_p_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r31 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", item_r31.label, ": ", item_r31.total, " question(s)");
} }
function ResultComponent_section_11_article_96_div_7_div_1_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtext(1, "Correct answer");
    i0.ɵɵelementEnd();
} }
function ResultComponent_section_11_article_96_div_7_div_1_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtext(1, "Selected");
    i0.ɵɵelementEnd();
} }
function ResultComponent_section_11_article_96_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "span", 41);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 42);
    i0.ɵɵelementStart(4, "span", 43);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, ResultComponent_section_11_article_96_div_7_div_1_span_6_Template, 2, 0, "span", 44);
    i0.ɵɵtemplate(7, ResultComponent_section_11_article_96_div_7_div_1_span_7_Template, 2, 0, "span", 44);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r38 = ctx.$implicit;
    const optionIndex_r39 = ctx.index;
    const ctx_r42 = i0.ɵɵnextContext(2);
    const question_r32 = ctx_r42.$implicit;
    const index_r33 = ctx_r42.index;
    const ctx_r37 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r37.getReviewOptionClass(question_r32, ctx_r37.answers[index_r33], option_r38.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r37.getOptionLabel(optionIndex_r39));
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("result-option__control--checkbox", question_r32.questionType === "MCMA")("result-option__control--radio", question_r32.questionType !== "MCMA")("result-option__control--checked", ctx_r37.isReviewOptionSelected(question_r32, ctx_r37.answers[index_r33], option_r38.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r38.text);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.isCorrectOption(question_r32, option_r38.id));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r37.isReviewOptionSelected(question_r32, ctx_r37.answers[index_r33], option_r38.id));
} }
function ResultComponent_section_11_article_96_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtemplate(1, ResultComponent_section_11_article_96_div_7_div_1_Template, 8, 11, "div", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r32 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", question_r32.options);
} }
function ResultComponent_section_11_article_96_div_8_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "strong");
    i0.ɵɵtext(2, "Expected answer:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r32 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", question_r32.expectedAnswer, "");
} }
function ResultComponent_section_11_article_96_div_8_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "strong");
    i0.ɵɵtext(2, "Explanation:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r32 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", question_r32.explanation, "");
} }
function ResultComponent_section_11_article_96_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "h4");
    i0.ɵɵtext(2, "Given answer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 47);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, ResultComponent_section_11_article_96_div_8_p_5_Template, 4, 1, "p", 4);
    i0.ɵɵtemplate(6, ResultComponent_section_11_article_96_div_8_p_6_Template, 4, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r48 = i0.ɵɵnextContext();
    const question_r32 = ctx_r48.$implicit;
    const index_r33 = ctx_r48.index;
    const ctx_r35 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r35.getSelectedAnswerText(question_r32, ctx_r35.answers[index_r33]));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r35.hasExpectedAnswer(question_r32));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r35.hasExplanation(question_r32));
} }
function ResultComponent_section_11_article_96_div_9_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "strong");
    i0.ɵɵtext(2, "Explanation:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r32 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", question_r32.explanation, "");
} }
function ResultComponent_section_11_article_96_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "p")(2, "strong");
    i0.ɵɵtext(3, "Selected answer:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p")(6, "strong");
    i0.ɵɵtext(7, "Correct answer:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ResultComponent_section_11_article_96_div_9_p_9_Template, 4, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r51 = i0.ɵɵnextContext();
    const question_r32 = ctx_r51.$implicit;
    const index_r33 = ctx_r51.index;
    const ctx_r36 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r36.getSelectedAnswerText(question_r32, ctx_r36.answers[index_r33]), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r36.getCorrectAnswerText(question_r32), "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r36.hasExplanation(question_r32));
} }
function ResultComponent_section_11_article_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 33)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 34);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, ResultComponent_section_11_article_96_div_7_Template, 2, 1, "div", 35);
    i0.ɵɵtemplate(8, ResultComponent_section_11_article_96_div_8_Template, 7, 3, "div", 36);
    i0.ɵɵtemplate(9, ResultComponent_section_11_article_96_div_9_Template, 10, 3, "div", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r32 = ctx.$implicit;
    const index_r33 = ctx.index;
    const ctx_r27 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Question ", question_r32.questionNo, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(question_r32.questionText);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r27.getEvaluationClass(ctx_r27.answers[index_r33]));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r27.getEvaluationLabel(ctx_r27.answers[index_r33]));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r32.options == null ? null : question_r32.options.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r32.questionType === "ESSAY");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r32.questionType !== "ESSAY");
} }
function ResultComponent_section_11_Template(rf, ctx) { if (rf & 1) {
    const _r53 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 20)(1, "div", 21)(2, "div")(3, "span", 3);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, ResultComponent_section_11_p_7_Template, 2, 1, "p", 22);
    i0.ɵɵtemplate(8, ResultComponent_section_11_p_8_Template, 2, 0, "p", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 23)(10, "div", 24)(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Percentage");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 25)(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Marks");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "button", 15);
    i0.ɵɵlistener("click", function ResultComponent_section_11_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r53); const ctx_r52 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r52.downloadCurrentResult()); });
    i0.ɵɵtext(21, "Download Result JSON");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 26)(23, "article")(24, "span");
    i0.ɵɵtext(25, "Total Questions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "strong");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "article")(29, "span");
    i0.ɵɵtext(30, "Attempted");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "strong");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "article")(34, "span");
    i0.ɵɵtext(35, "Skipped");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "strong");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "article")(39, "span");
    i0.ɵɵtext(40, "Not Answered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "strong");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "article")(44, "span");
    i0.ɵɵtext(45, "Correct");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "strong");
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "article")(49, "span");
    i0.ɵɵtext(50, "Wrong");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "strong");
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "article")(54, "span");
    i0.ɵɵtext(55, "Manual Review");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "strong");
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(58, "article")(59, "span");
    i0.ɵɵtext(60, "Total Marks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "strong");
    i0.ɵɵtext(62);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "article")(64, "span");
    i0.ɵɵtext(65, "Obtained Marks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "strong");
    i0.ɵɵtext(67);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(68, "article")(69, "span");
    i0.ɵɵtext(70, "Total Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "strong");
    i0.ɵɵtext(72);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(73, "div", 27)(74, "article")(75, "h3");
    i0.ɵɵtext(76, "Question Type Breakdown");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(77, ResultComponent_section_11_p_77_Template, 2, 4, "p", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "article")(79, "h3");
    i0.ɵɵtext(80, "Difficulty Breakdown");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(81, ResultComponent_section_11_p_81_Template, 2, 3, "p", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "article")(83, "h3");
    i0.ɵɵtext(84, "Subject-wise Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(85, ResultComponent_section_11_p_85_Template, 2, 3, "p", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "article")(87, "h3");
    i0.ɵɵtext(88, "Topic-wise Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(89, ResultComponent_section_11_p_89_Template, 2, 2, "p", 28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(90, "div", 29)(91, "h2");
    i0.ɵɵtext(92, "Solution Review");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "button", 15);
    i0.ɵɵlistener("click", function ResultComponent_section_11_Template_button_click_93_listener() { i0.ɵɵrestoreView(_r53); const ctx_r54 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r54.retakeTest()); });
    i0.ɵɵtext(94, "Retake Test");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(95, "div", 30);
    i0.ɵɵtemplate(96, ResultComponent_section_11_article_96_Template, 10, 7, "article", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((ctx_r4.submission == null ? null : ctx_r4.submission.resultSource) || "Result");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.result.passed ? "Passed" : "Needs Improvement");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.resultSaveWarning);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.submission == null ? null : ctx_r4.submission.isAutoSubmitted);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("--score", ctx_r4.result.percentage, "%");
    i0.ɵɵclassProp("score-circle--failed", !ctx_r4.result.passed);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r4.result.percentage, "%");
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("--score", ctx_r4.result.totalMarks ? ctx_r4.result.obtainedMarks / ctx_r4.result.totalMarks * 100 : 0, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r4.result.obtainedMarks, "/", ctx_r4.result.totalMarks, "");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r4.result.totalQuestions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.attempted);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.skipped);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.notAnswered);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.correct);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.wrong);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.manualReviewCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.totalMarks);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.result.obtainedMarks);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r4.result.totalTimeUsedSeconds, "s");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r4.result.questionTypeBreakdown);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r4.result.difficultyBreakdown);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r4.result.subjectWiseSummary);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r4.result.topicWiseSummary);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r4.questions);
} }
const PENDING_RESULT_KEY = 'qlss-pending-test-result';
const START_TEST_KEY = 'qlss-start-test';
export class ResultComponent {
    constructor(testStorage, router) {
        this.testStorage = testStorage;
        this.router = router;
        this.submission = null;
        this.resultSaveWarning = '';
        this.showSelectors = true;
        this.isLoadingOptions = false;
        this.isLoadingResult = false;
        this.resultMessage = '';
        this.selectedUsername = '';
        this.selectedTraining = '';
        this.selectedTestType = '';
        this.testTypes = ['pre', 'post', 'assessment'];
        this.users = [];
        this.trainings = [];
    }
    ngOnInit() {
        var _a;
        const pendingResult = sessionStorage.getItem(PENDING_RESULT_KEY);
        sessionStorage.removeItem(PENDING_RESULT_KEY);
        if (pendingResult) {
            try {
                const parsed = JSON.parse(pendingResult);
                if ((_a = parsed.submission) === null || _a === void 0 ? void 0 : _a.resultSummary) {
                    this.submission = parsed.submission;
                    this.resultSaveWarning = parsed.warning || '';
                    this.showSelectors = false;
                    return;
                }
            }
            catch (_b) {
                // Invalid navigation data falls back to direct result lookup.
            }
        }
        this.loadSelectorOptions();
    }
    get result() {
        var _a;
        return ((_a = this.submission) === null || _a === void 0 ? void 0 : _a.resultSummary) || null;
    }
    get questions() {
        var _a, _b;
        return ((_a = this.submission) === null || _a === void 0 ? void 0 : _a.questions) || ((_b = this.submission) === null || _b === void 0 ? void 0 : _b.questionSnapshots) || [];
    }
    get answers() {
        var _a;
        return ((_a = this.submission) === null || _a === void 0 ? void 0 : _a.userAnswers) || [];
    }
    loadSelectorOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoadingOptions = true;
            this.resultMessage = '';
            try {
                const [users, tests] = yield Promise.all([
                    this.testStorage.listResultUsers(),
                    this.testStorage.listTestDefinitions().catch(() => this.testStorage.listAssessments())
                ]);
                this.users = this.uniqueSorted(users);
                this.trainings = Array.from(new Map(tests
                    .filter((test) => String(test.trainingId || '').trim())
                    .map((test) => [
                    String(test.trainingId),
                    {
                        id: String(test.trainingId),
                        label: test.displayName || test.trainingName || test.testName
                    }
                ])).values()).sort((a, b) => a.label.localeCompare(b.label));
            }
            catch (_a) {
                this.resultMessage = 'Users and trainings could not be loaded.';
            }
            finally {
                this.isLoadingOptions = false;
            }
        });
    }
    onSelectionChange() {
        this.submission = null;
        this.resultMessage = '';
        if (this.selectedUsername && this.selectedTraining && this.selectedTestType) {
            this.loadSelectedResult();
        }
    }
    loadSelectedResult() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoadingResult = true;
            this.resultMessage = '';
            try {
                // Previous database/local result lookup kept for reference:
                // const submission = await this.testStorage.loadSavedSubmission(
                //   this.selectedUsername,
                //   this.selectedTraining
                // );
                const submission = yield this.testStorage.loadSubmissionFileFromServer(this.selectedTestType, this.selectedTraining, this.selectedUsername);
                if (!submission) {
                    this.resultMessage = 'No saved result was found for the selected user and training.';
                    return;
                }
                this.submission = Object.assign(Object.assign({}, submission), { resultSource: 'Saved Result' });
            }
            catch (_a) {
                this.resultMessage = 'The selected result could not be loaded.';
            }
            finally {
                this.isLoadingResult = false;
            }
        });
    }
    clearSelection() {
        this.selectedUsername = '';
        this.selectedTraining = '';
        this.selectedTestType = '';
        this.submission = null;
        this.resultMessage = '';
    }
    downloadCurrentResult() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.submission) {
                return;
            }
            try {
                const blob = yield this.testStorage.exportSubmissionResult(this.submission);
                this.testStorage.downloadBlob(blob, `${this.submission.testName}-result.json`);
            }
            catch (_a) {
                this.resultSaveWarning = 'Result export failed.';
            }
        });
    }
    retakeTest() {
        if (this.submission) {
            sessionStorage.setItem(START_TEST_KEY, JSON.stringify({
                testName: this.submission.testName,
                username: this.submission.username
            }));
        }
        this.router.navigate(['/test']);
    }
    getEvaluationClass(answer) {
        return `evaluation--${(answer === null || answer === void 0 ? void 0 : answer.evaluationStatus) || 'notAnswered'}`;
    }
    getEvaluationLabel(answer) {
        const labels = {
            correct: 'Correct',
            wrong: 'Wrong',
            skipped: 'Skipped',
            manualReview: 'Manual Review Required',
            notAnswered: 'Not Answered'
        };
        return labels[(answer === null || answer === void 0 ? void 0 : answer.evaluationStatus) || 'notAnswered'];
    }
    getSelectedAnswerText(question, answer) {
        var _a;
        if (!answer) {
            return 'Not answered';
        }
        if (question.questionType === 'ESSAY') {
            return ((_a = answer.essayAnswer) === null || _a === void 0 ? void 0 : _a.trim()) || 'Not answered';
        }
        const selectedIds = question.questionType === 'MCMA'
            ? answer.selectedOptionIds || []
            : answer.selectedOptionId ? [answer.selectedOptionId] : [];
        return selectedIds.length
            ? this.getOptionTexts(question, selectedIds).join(', ')
            : 'Not answered';
    }
    getCorrectAnswerText(question) {
        var _a;
        if (question.questionType === 'ESSAY') {
            return question.expectedAnswer || 'Manual review required';
        }
        const correctIds = ((_a = question.correctOptionIds) === null || _a === void 0 ? void 0 : _a.length)
            ? question.correctOptionIds
            : question.correctOptionId ? [question.correctOptionId] : [];
        return this.getOptionTexts(question, correctIds).join(', ');
    }
    getReviewOptionClass(question, answer, optionId) {
        const isSelected = this.isReviewOptionSelected(question, answer, optionId);
        const isCorrect = this.isCorrectOption(question, optionId);
        if (isSelected && isCorrect) {
            return 'result-option--correct';
        }
        if (isSelected) {
            return 'result-option--wrong';
        }
        return isCorrect ? 'result-option--correct-answer' : '';
    }
    isReviewOptionSelected(question, answer, optionId) {
        if (!answer) {
            return false;
        }
        return question.questionType === 'MCMA'
            ? (answer.selectedOptionIds || []).includes(optionId)
            : answer.selectedOptionId === optionId;
    }
    isCorrectOption(question, optionId) {
        var _a;
        const correctOptionIds = ((_a = question.correctOptionIds) === null || _a === void 0 ? void 0 : _a.length)
            ? question.correctOptionIds
            : question.correctOptionId ? [question.correctOptionId] : [];
        return correctOptionIds.includes(optionId);
    }
    getOptionLabel(index) {
        return String.fromCharCode(65 + index);
    }
    hasExpectedAnswer(question) {
        var _a;
        return Boolean((_a = question.expectedAnswer) === null || _a === void 0 ? void 0 : _a.trim());
    }
    hasExplanation(question) {
        var _a;
        return Boolean((_a = question.explanation) === null || _a === void 0 ? void 0 : _a.trim());
    }
    getOptionTexts(question, optionIds) {
        return optionIds.map((id) => { var _a, _b; return ((_b = (_a = question.options) === null || _a === void 0 ? void 0 : _a.find((option) => option.id === id)) === null || _b === void 0 ? void 0 : _b.text) || id; });
    }
    uniqueSorted(values) {
        return Array.from(new Set(values.map((value) => (value || '').trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    }
}
ResultComponent.ɵfac = function ResultComponent_Factory(t) { return new (t || ResultComponent)(i0.ɵɵdirectiveInject(i1.TestStorageService), i0.ɵɵdirectiveInject(i2.Router)); };
ResultComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResultComponent, selectors: [["app-result"]], decls: 12, vars: 5, consts: [[1, "result-page"], [1, "container"], [1, "result-page__header"], [1, "result-page__kicker"], [4, "ngIf"], ["class", "result-search", 4, "ngIf"], ["class", "result-state", 4, "ngIf"], ["class", "result-panel", 4, "ngIf"], [1, "result-search"], [1, "result-search__controls"], ["aria-label", "Select test type", 3, "ngModel", "ngModelChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["aria-label", "Select user", 3, "ngModel", "ngModelChange"], ["aria-label", "Select training", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "result-button", "result-button--secondary", 3, "click"], [3, "value"], [1, "result-state"], ["class", "result-state__message", 4, "ngIf"], [1, "result-state__message"], [1, "result-panel"], [1, "result-summary"], ["class", "result-note", 4, "ngIf"], [1, "result-summary__actions"], [1, "score-circle"], [1, "score-circle", "score-circle--marks"], [1, "result-grid"], [1, "breakdown-grid"], [4, "ngFor", "ngForOf"], [1, "review-header"], [1, "review-list"], ["class", "review-item", 4, "ngFor", "ngForOf"], [1, "result-note"], [1, "review-item"], [1, "evaluation-badge", 3, "ngClass"], ["class", "result-option-list", 4, "ngIf"], ["class", "essay-review", 4, "ngIf"], ["class", "answer-box", 4, "ngIf"], [1, "result-option-list"], ["class", "result-option", "aria-disabled", "true", 3, "ngClass", 4, "ngFor", "ngForOf"], ["aria-disabled", "true", 1, "result-option", 3, "ngClass"], [1, "result-option__marker"], [1, "result-option__control"], [1, "result-option__text"], ["class", "result-option__status", 4, "ngIf"], [1, "result-option__status"], [1, "essay-review"], [1, "essay-review__answer"], [1, "answer-box"]], template: function ResultComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "header", 2)(3, "span", 3);
        i0.ɵɵtext(4, "Assessment Result");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "h1");
        i0.ɵɵtext(6, "Test Result");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, ResultComponent_p_7_Template, 2, 2, "p", 4);
        i0.ɵɵtemplate(8, ResultComponent_p_8_Template, 2, 0, "p", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, ResultComponent_section_9_Template, 21, 6, "section", 5);
        i0.ɵɵtemplate(10, ResultComponent_section_10_Template, 5, 3, "section", 6);
        i0.ɵɵtemplate(11, ResultComponent_section_11_Template, 97, 28, "section", 7);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngIf", ctx.submission);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.submission);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showSelectors);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoadingOptions || ctx.isLoadingResult || ctx.showSelectors && !ctx.submission);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.result);
    } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgModel, i3.TitleCasePipe], styles: [".result-page[_ngcontent-%COMP%] {\n  background: #f5f8fc;\n  min-height: 100vh;\n  padding: 48px 0 72px;\n}\n\n.result-page__header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.result-page__header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .result-search[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .result-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .review-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #071126;\n  margin: 6px 0;\n}\n\n.result-page__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .result-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .result-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 6px 0;\n}\n\n.result-page__kicker[_ngcontent-%COMP%] {\n  color: var(--primary, #2f7ce8);\n  font-size: 12px;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.result-search[_ngcontent-%COMP%], .result-state[_ngcontent-%COMP%], .result-panel[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5edf8;\n  border-radius: 12px;\n  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.07);\n}\n\n.result-search[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 20px;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding: 20px;\n}\n\n.result-search__controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  justify-content: flex-end;\n}\n\n.result-search[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  background: #f8fbff;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  font: inherit;\n  min-width: 220px;\n  padding: 12px 14px;\n}\n\n.result-button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  font: inherit;\n  font-weight: 700;\n  padding: 12px 16px;\n}\n\n.result-button--secondary[_ngcontent-%COMP%] {\n  background: #eef4fc;\n  color: #1d4ed8;\n}\n\n.result-state[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding: 28px;\n}\n\n.result-state__message[_ngcontent-%COMP%], .result-note[_ngcontent-%COMP%] {\n  color: #b45309 !important;\n  font-weight: 700;\n}\n\n.result-panel[_ngcontent-%COMP%] {\n  padding: 28px;\n}\n\n.result-summary[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 24px;\n  justify-content: space-between;\n  margin-bottom: 28px;\n}\n\n.result-summary__actions[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 14px;\n  justify-content: flex-end;\n}\n\n.score-circle[_ngcontent-%COMP%] {\n  --score: 0;\n  align-items: center;\n  background: conic-gradient(#22c55e calc(var(--score) * 1%), #e5edf8 0);\n  border-radius: 50%;\n  color: #166534;\n  display: flex;\n  flex-direction: column;\n  height: 118px;\n  justify-content: center;\n  position: relative;\n  width: 118px;\n}\n\n.score-circle[_ngcontent-%COMP%]::before {\n  background: #fff;\n  border-radius: 50%;\n  content: '';\n  inset: 10px;\n  position: absolute;\n}\n\n.score-circle[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .score-circle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.score-circle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.score-circle--failed[_ngcontent-%COMP%] {\n  background: conic-gradient(#ef4444 calc(var(--score) * 1%), #e5edf8 0);\n  color: #b91c1c;\n}\n\n.score-circle--marks[_ngcontent-%COMP%] {\n  background: conic-gradient(#2f7ce8 calc(var(--score) * 1%), #e5edf8 0);\n  color: #1d4ed8;\n}\n\n.result-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  margin-bottom: 28px;\n}\n\n.result-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], .breakdown-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], .review-item[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5edf8;\n  border-radius: 10px;\n  padding: 18px;\n}\n\n.result-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n\n.result-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n}\n\n.result-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 24px;\n}\n\n.breakdown-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin-bottom: 30px;\n}\n\n.breakdown-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .review-item[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #071126;\n  margin: 0 0 12px;\n}\n\n.breakdown-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 7px 0;\n}\n\n.review-header[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n\n.review-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n\n.review-item[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.evaluation-badge[_ngcontent-%COMP%] {\n  background: #eef2f7;\n  border-radius: 999px;\n  display: inline-flex;\n  font-size: 13px;\n  font-weight: 800;\n  padding: 7px 12px;\n}\n\n.evaluation--correct[_ngcontent-%COMP%] { background: #ecfdf3; color: #166534; }\n.evaluation--wrong[_ngcontent-%COMP%] { background: #fef2f2; color: #991b1b; }\n.evaluation--skipped[_ngcontent-%COMP%] { background: #fff7ed; color: #9a3412; }\n.evaluation--manualReview[_ngcontent-%COMP%], .evaluation--notAnswered[_ngcontent-%COMP%] { background: #eef2f7; color: #64748b; }\n\n.result-option-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n  margin-top: 14px;\n  pointer-events: none;\n  user-select: none;\n}\n\n.result-option[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 1.5px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  display: flex;\n  gap: 12px;\n  min-height: 54px;\n  padding: 10px 12px;\n  cursor: default;\n}\n\n.result-option--correct[_ngcontent-%COMP%], .result-option--correct-answer[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  border-color: #22c55e;\n  color: #166534;\n}\n\n.result-option--wrong[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-color: #ef4444;\n  color: #991b1b;\n}\n\n.result-option__marker[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ebf2fd;\n  border-radius: 50%;\n  color: #2f7ce8;\n  display: inline-flex;\n  flex: 0 0 32px;\n  font-weight: 800;\n  height: 32px;\n  justify-content: center;\n}\n\n.result-option__control[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 2px solid #b8c7dc;\n  display: inline-flex;\n  flex: 0 0 20px;\n  height: 20px;\n  width: 20px;\n}\n\n.result-option__control--radio[_ngcontent-%COMP%] {\n  border-radius: 50%;\n}\n\n.result-option__control--checkbox[_ngcontent-%COMP%] {\n  border-radius: 5px;\n}\n\n.result-option__control--checked[_ngcontent-%COMP%] {\n  background: #2f7ce8;\n  border-color: #2f7ce8;\n}\n\n.result-option__control--radio.result-option__control--checked[_ngcontent-%COMP%]::after {\n  background: #ffffff;\n  border-radius: 50%;\n  content: \"\";\n  height: 7px;\n  margin: 5px;\n  width: 7px;\n}\n\n.result-option__control--checkbox.result-option__control--checked[_ngcontent-%COMP%]::after {\n  border-bottom: 2px solid #ffffff;\n  border-left: 2px solid #ffffff;\n  content: \"\";\n  height: 5px;\n  margin: 4px 0 0 3px;\n  transform: rotate(-45deg);\n  width: 9px;\n}\n.result-option--correct[_ngcontent-%COMP%]   .result-option__control--checked[_ngcontent-%COMP%] {\n  background: #22c55e;\n  border-color: #22c55e;\n}\n\n.result-option--wrong[_ngcontent-%COMP%]   .result-option__control--checked[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border-color: #ef4444;\n}\n\n.result-option__text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.result-option__status[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 800;\n}\n.essay-review[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-left: 4px solid #64748b;\n  border-radius: 8px;\n  color: #475569;\n  margin-top: 14px;\n  padding: 16px;\n}\n\n.essay-review[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #071126;\n  margin: 0 0 10px;\n}\n\n.essay-review__answer[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  line-height: 1.6;\n  min-height: 80px;\n  padding: 14px;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n\n.essay-review[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  white-space: pre-wrap;\n}\n.answer-box[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-left: 4px solid #cbd5e1;\n  border-radius: 8px;\n  color: #475569;\n  margin-top: 14px;\n  padding: 14px;\n}\n\n.answer-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0;\n}\n\n@media (max-width: 991px) {\n  .result-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .result-search[_ngcontent-%COMP%], .result-summary[_ngcontent-%COMP%] { align-items: stretch; flex-direction: column; }\n  .result-summary__actions[_ngcontent-%COMP%] { justify-content: flex-start; }\n}\n\n@media (max-width: 575px) {\n  .result-page[_ngcontent-%COMP%] { padding-top: 28px; }\n  .result-panel[_ngcontent-%COMP%] { padding: 18px; }\n  .result-grid[_ngcontent-%COMP%], .breakdown-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .result-search__controls[_ngcontent-%COMP%], .result-search[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { width: 100%; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResultComponent, [{
        type: Component,
        args: [{ selector: 'app-result', template: "<section class='result-page'>\n  <div class='container'>\n    <header class='result-page__header'>\n      <span class='result-page__kicker'>Assessment Result</span>\n      <h1>Test Result</h1>\n      <p *ngIf='submission'>{{ submission.testName }} - {{ submission.username }}</p>\n      <p *ngIf='!submission'>Select a user and training to view a saved result.</p>\n    </header>\n\n    <section class='result-search' *ngIf='showSelectors'>\n      <div>\n        <span class='result-page__kicker'>Saved Results</span>\n        <h2>Find a Result</h2>\n      </div>\n      <div class='result-search__controls'>\n        <select [(ngModel)]='selectedTestType' (ngModelChange)='onSelectionChange()' aria-label='Select test type'>\n          <option value=''>Select Test Type</option>\n          <option *ngFor='let type of testTypes' [value]='type'>{{ type | titlecase }}</option>\n        </select>\n        <select [(ngModel)]='selectedUsername' (ngModelChange)='onSelectionChange()' aria-label='Select user'>\n          <option value=''>Select User</option>\n          <option *ngFor='let user of users' [value]='user'>{{ user }}</option>\n        </select>\n        <select [(ngModel)]='selectedTraining' (ngModelChange)='onSelectionChange()' aria-label='Select training'>\n          <option value=''>Select Training</option>\n          <option *ngFor='let training of trainings' [value]='training.id'>{{ training.label }}</option>\n        </select>\n        <button type='button' class='result-button result-button--secondary' (click)='clearSelection()'>Clear</button>\n      </div>\n    </section>\n\n    <section class='result-state' *ngIf='isLoadingOptions || isLoadingResult || (showSelectors && !submission)'>\n      <h2>{{ isLoadingOptions ? 'Loading Users and Trainings' : isLoadingResult ? 'Loading Result' : 'Choose All Options' }}</h2>\n      <p *ngIf='!isLoadingOptions && !isLoadingResult && !resultMessage'>The result appears automatically after test type, user, and training are selected.</p>\n      <p class='result-state__message' *ngIf='resultMessage'>{{ resultMessage }}</p>\n    </section>\n\n    <section class='result-panel' *ngIf='result'>\n      <div class='result-summary'>\n        <div>\n          <span class='result-page__kicker'>{{ submission?.resultSource || 'Result' }}</span>\n          <h2>{{ result.passed ? 'Passed' : 'Needs Improvement' }}</h2>\n          <p class='result-note' *ngIf='resultSaveWarning'>{{ resultSaveWarning }}</p>\n          <p class='result-note' *ngIf='submission?.isAutoSubmitted'>The test was automatically submitted when time expired.</p>\n        </div>\n        <div class='result-summary__actions'>\n          <div class='score-circle' [class.score-circle--failed]='!result.passed' [style.--score.%]='result.percentage'>\n            <strong>{{ result.percentage }}%</strong>\n            <span>Percentage</span>\n          </div>\n          <div class='score-circle score-circle--marks' [style.--score.%]='result.totalMarks ? result.obtainedMarks / result.totalMarks * 100 : 0'>\n            <strong>{{ result.obtainedMarks }}/{{ result.totalMarks }}</strong>\n            <span>Marks</span>\n          </div>\n          <button type='button' class='result-button result-button--secondary' (click)='downloadCurrentResult()'>Download Result JSON</button>\n        </div>\n      </div>\n\n      <div class='result-grid'>\n        <article><span>Total Questions</span><strong>{{ result.totalQuestions }}</strong></article>\n        <article><span>Attempted</span><strong>{{ result.attempted }}</strong></article>\n        <article><span>Skipped</span><strong>{{ result.skipped }}</strong></article>\n        <article><span>Not Answered</span><strong>{{ result.notAnswered }}</strong></article>\n        <article><span>Correct</span><strong>{{ result.correct }}</strong></article>\n        <article><span>Wrong</span><strong>{{ result.wrong }}</strong></article>\n        <article><span>Manual Review</span><strong>{{ result.manualReviewCount }}</strong></article>\n        <article><span>Total Marks</span><strong>{{ result.totalMarks }}</strong></article>\n        <article><span>Obtained Marks</span><strong>{{ result.obtainedMarks }}</strong></article>\n        <article><span>Total Time</span><strong>{{ result.totalTimeUsedSeconds }}s</strong></article>\n      </div>\n\n      <div class='breakdown-grid'>\n        <article><h3>Question Type Breakdown</h3><p *ngFor='let item of result.questionTypeBreakdown'>{{ item.label }}: {{ item.total }} questions, {{ item.obtainedMarks }}/{{ item.marks }} marks</p></article>\n        <article><h3>Difficulty Breakdown</h3><p *ngFor='let item of result.difficultyBreakdown'>{{ item.label }}: {{ item.total }} questions, {{ item.correct }} correct</p></article>\n        <article><h3>Subject-wise Summary</h3><p *ngFor='let item of result.subjectWiseSummary'>{{ item.label }}: {{ item.obtainedMarks }}/{{ item.marks }} marks</p></article>\n        <article><h3>Topic-wise Summary</h3><p *ngFor='let item of result.topicWiseSummary'>{{ item.label }}: {{ item.total }} question(s)</p></article>\n      </div>\n\n      <div class='review-header'>\n        <h2>Solution Review</h2>\n        <button type='button' class='result-button result-button--secondary' (click)='retakeTest()'>Retake Test</button>\n      </div>\n      <div class='review-list'>\n        <article class='review-item' *ngFor='let question of questions; let index = index'>\n          <span>Question {{ question.questionNo }}</span>\n          <h3>{{ question.questionText }}</h3>\n          <p class='evaluation-badge' [ngClass]='getEvaluationClass(answers[index])'>{{ getEvaluationLabel(answers[index]) }}</p>\n          <div class=\"result-option-list\" *ngIf=\"question.options?.length\">\n            <div\n              class=\"result-option\"\n              *ngFor=\"let option of question.options; let optionIndex = index\"\n              [ngClass]=\"getReviewOptionClass(question, answers[index], option.id)\"\r\n              aria-disabled=\"true\"\n            >\n              <span class=\"result-option__marker\">{{ getOptionLabel(optionIndex) }}</span>\n              <span\n                class=\"result-option__control\"\n                [class.result-option__control--checkbox]=\"question.questionType === 'MCMA'\"\n                [class.result-option__control--radio]=\"question.questionType !== 'MCMA'\"\n                [class.result-option__control--checked]=\"isReviewOptionSelected(question, answers[index], option.id)\"\n              ></span>\n              <span class=\"result-option__text\">{{ option.text }}</span>\n              <span class=\"result-option__status\" *ngIf=\"isCorrectOption(question, option.id)\">Correct answer</span>\n              <span class=\"result-option__status\" *ngIf=\"isReviewOptionSelected(question, answers[index], option.id)\">Selected</span>\n            </div>\n          </div>\n          <div class=\"essay-review\" *ngIf=\"question.questionType === 'ESSAY'\">\n            <h4>Given answer</h4>\n            <div class=\"essay-review__answer\">{{ getSelectedAnswerText(question, answers[index]) }}</div>\n            <p *ngIf=\"hasExpectedAnswer(question)\"><strong>Expected answer:</strong> {{ question.expectedAnswer }}</p>\n            <p *ngIf=\"hasExplanation(question)\"><strong>Explanation:</strong> {{ question.explanation }}</p>\n          </div>\n          <div class='answer-box' *ngIf=\"question.questionType !== 'ESSAY'\">\n            <p><strong>Selected answer:</strong> {{ getSelectedAnswerText(question, answers[index]) }}</p>\n            <p><strong>Correct answer:</strong> {{ getCorrectAnswerText(question) }}</p>\n            <p *ngIf=\"hasExplanation(question)\"><strong>Explanation:</strong> {{ question.explanation }}</p>\n          </div>\n        </article>\n      </div>\n    </section>\n  </div>\n</section>\n", styles: [".result-page {\n  background: #f5f8fc;\n  min-height: 100vh;\n  padding: 48px 0 72px;\n}\n\n.result-page__header {\n  margin-bottom: 24px;\n}\n\n.result-page__header h1,\n.result-search h2,\n.result-summary h2,\n.review-header h2 {\n  color: #071126;\n  margin: 6px 0;\n}\n\n.result-page__header p,\n.result-summary p,\n.result-state p {\n  color: #64748b;\n  margin: 6px 0;\n}\n\n.result-page__kicker {\n  color: var(--primary, #2f7ce8);\n  font-size: 12px;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.result-search,\n.result-state,\n.result-panel {\n  background: #fff;\n  border: 1px solid #e5edf8;\n  border-radius: 12px;\n  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.07);\n}\n\n.result-search {\n  align-items: center;\n  display: flex;\n  gap: 20px;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding: 20px;\n}\n\n.result-search__controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  justify-content: flex-end;\n}\n\n.result-search select {\n  background: #f8fbff;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  font: inherit;\n  min-width: 220px;\n  padding: 12px 14px;\n}\n\n.result-button {\n  border: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  font: inherit;\n  font-weight: 700;\n  padding: 12px 16px;\n}\n\n.result-button--secondary {\n  background: #eef4fc;\n  color: #1d4ed8;\n}\n\n.result-state {\n  margin-bottom: 24px;\n  padding: 28px;\n}\n\n.result-state__message,\n.result-note {\n  color: #b45309 !important;\n  font-weight: 700;\n}\n\n.result-panel {\n  padding: 28px;\n}\n\n.result-summary {\n  align-items: center;\n  display: flex;\n  gap: 24px;\n  justify-content: space-between;\n  margin-bottom: 28px;\n}\n\n.result-summary__actions {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 14px;\n  justify-content: flex-end;\n}\n\n.score-circle {\n  --score: 0;\n  align-items: center;\n  background: conic-gradient(#22c55e calc(var(--score) * 1%), #e5edf8 0);\n  border-radius: 50%;\n  color: #166534;\n  display: flex;\n  flex-direction: column;\n  height: 118px;\n  justify-content: center;\n  position: relative;\n  width: 118px;\n}\n\n.score-circle::before {\n  background: #fff;\n  border-radius: 50%;\n  content: '';\n  inset: 10px;\n  position: absolute;\n}\n\n.score-circle strong,\n.score-circle span {\n  position: relative;\n}\n\n.score-circle span {\n  color: #64748b;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.score-circle--failed {\n  background: conic-gradient(#ef4444 calc(var(--score) * 1%), #e5edf8 0);\n  color: #b91c1c;\n}\n\n.score-circle--marks {\n  background: conic-gradient(#2f7ce8 calc(var(--score) * 1%), #e5edf8 0);\n  color: #1d4ed8;\n}\n\n.result-grid {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  margin-bottom: 28px;\n}\n\n.result-grid article,\n.breakdown-grid article,\n.review-item {\n  background: #fff;\n  border: 1px solid #e5edf8;\n  border-radius: 10px;\n  padding: 18px;\n}\n\n.result-grid article {\n  display: grid;\n  gap: 7px;\n}\n\n.result-grid span {\n  color: #64748b;\n  font-size: 13px;\n}\n\n.result-grid strong {\n  color: #071126;\n  font-size: 24px;\n}\n\n.breakdown-grid {\n  display: grid;\n  gap: 14px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin-bottom: 30px;\n}\n\n.breakdown-grid h3,\n.review-item h3 {\n  color: #071126;\n  margin: 0 0 12px;\n}\n\n.breakdown-grid p {\n  color: #64748b;\n  margin: 7px 0;\n}\n\n.review-header {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n\n.review-list {\n  display: grid;\n  gap: 16px;\n}\n\n.review-item > span {\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.evaluation-badge {\n  background: #eef2f7;\n  border-radius: 999px;\n  display: inline-flex;\n  font-size: 13px;\n  font-weight: 800;\n  padding: 7px 12px;\n}\n\n.evaluation--correct { background: #ecfdf3; color: #166534; }\n.evaluation--wrong { background: #fef2f2; color: #991b1b; }\n.evaluation--skipped { background: #fff7ed; color: #9a3412; }\n.evaluation--manualReview,\n.evaluation--notAnswered { background: #eef2f7; color: #64748b; }\n\n.result-option-list {\n  display: grid;\n  gap: 10px;\n  margin-top: 14px;\n  pointer-events: none;\n  user-select: none;\n}\n\n.result-option {\n  align-items: center;\n  background: #ffffff;\n  border: 1.5px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  display: flex;\n  gap: 12px;\n  min-height: 54px;\n  padding: 10px 12px;\n  cursor: default;\n}\n\n.result-option--correct,\n.result-option--correct-answer {\n  background: #ecfdf3;\n  border-color: #22c55e;\n  color: #166534;\n}\n\n.result-option--wrong {\n  background: #fef2f2;\n  border-color: #ef4444;\n  color: #991b1b;\n}\n\n.result-option__marker {\n  align-items: center;\n  background: #ebf2fd;\n  border-radius: 50%;\n  color: #2f7ce8;\n  display: inline-flex;\n  flex: 0 0 32px;\n  font-weight: 800;\n  height: 32px;\n  justify-content: center;\n}\n\n.result-option__control {\n  background: #ffffff;\n  border: 2px solid #b8c7dc;\n  display: inline-flex;\n  flex: 0 0 20px;\n  height: 20px;\n  width: 20px;\n}\n\n.result-option__control--radio {\n  border-radius: 50%;\n}\n\n.result-option__control--checkbox {\n  border-radius: 5px;\n}\n\n.result-option__control--checked {\n  background: #2f7ce8;\n  border-color: #2f7ce8;\n}\n\n.result-option__control--radio.result-option__control--checked::after {\n  background: #ffffff;\n  border-radius: 50%;\n  content: \"\";\n  height: 7px;\n  margin: 5px;\n  width: 7px;\n}\n\n.result-option__control--checkbox.result-option__control--checked::after {\n  border-bottom: 2px solid #ffffff;\n  border-left: 2px solid #ffffff;\n  content: \"\";\n  height: 5px;\n  margin: 4px 0 0 3px;\n  transform: rotate(-45deg);\n  width: 9px;\n}\n.result-option--correct .result-option__control--checked {\n  background: #22c55e;\n  border-color: #22c55e;\n}\n\n.result-option--wrong .result-option__control--checked {\n  background: #ef4444;\n  border-color: #ef4444;\n}\n\n.result-option__text {\n  flex: 1;\n}\n\n.result-option__status {\n  font-size: 12px;\n  font-weight: 800;\n}\n.essay-review {\n  background: #f8fafc;\n  border-left: 4px solid #64748b;\n  border-radius: 8px;\n  color: #475569;\n  margin-top: 14px;\n  padding: 16px;\n}\n\n.essay-review h4 {\n  color: #071126;\n  margin: 0 0 10px;\n}\n\n.essay-review__answer {\n  background: #ffffff;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  line-height: 1.6;\n  min-height: 80px;\n  padding: 14px;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n\n.essay-review p {\n  margin: 12px 0 0;\n  white-space: pre-wrap;\n}\n.answer-box {\n  background: #f8fafc;\n  border-left: 4px solid #cbd5e1;\n  border-radius: 8px;\n  color: #475569;\n  margin-top: 14px;\n  padding: 14px;\n}\n\n.answer-box p {\n  margin: 6px 0;\n}\n\n@media (max-width: 991px) {\n  .result-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .result-search,\n  .result-summary { align-items: stretch; flex-direction: column; }\n  .result-summary__actions { justify-content: flex-start; }\n}\n\n@media (max-width: 575px) {\n  .result-page { padding-top: 28px; }\n  .result-panel { padding: 18px; }\n  .result-grid,\n  .breakdown-grid { grid-template-columns: 1fr; }\n  .result-search__controls,\n  .result-search select { width: 100%; }\n}\n"] }]
    }], function () { return [{ type: i1.TestStorageService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=result.component.js.map