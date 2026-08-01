import { __awaiter } from "tslib";
import { Component, HostListener } from '@angular/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./services/test-storage.service";
import * as i2 from "../../core/services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common/http";
import * as i5 from "../../core/services/data.service";
import * as i6 from "../../core/services/training-management.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
function TestComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("test-timer--ending", ctx_r0.remainingSeconds <= 60 && !ctx_r0.isSubmitted);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.isSubmitted ? "Submitted" : ctx_r0.timerText);
} }
function TestComponent_section_15_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 23)(1, "span", 24);
    i0.ɵɵtext(2, "Submission Notice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4, "Test Already Submitted");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 25);
    i0.ɵɵlistener("click", function TestComponent_section_15_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.returnToTraining()); });
    i0.ɵɵtext(8, "Return to Training");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.submissionMessage);
} }
function TestComponent_section_16_div_17_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function TestComponent_section_16_div_17_button_2_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r13); const training_r11 = restoredCtx.$implicit; const ctx_r12 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r12.selectDirectTraining(training_r11)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const training_r11 = ctx.$implicit;
    const ctx_r9 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r9.getDirectTrainingLabel(training_r11), " ");
} }
function TestComponent_section_16_div_17_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtext(1, "No training found");
    i0.ɵɵelementEnd();
} }
function TestComponent_section_16_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 40)(1, "input", 41);
    i0.ɵɵlistener("ngModelChange", function TestComponent_section_16_div_17_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r14.trainingSearch = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, TestComponent_section_16_div_17_button_2_Template, 2, 1, "button", 42);
    i0.ɵɵtemplate(3, TestComponent_section_16_div_17_div_3_Template, 2, 0, "div", 43);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r7.trainingSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r7.filteredDirectTrainings);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r7.filteredDirectTrainings.length);
} }
function TestComponent_section_16_p_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r8.directEntryMessage);
} }
function TestComponent_section_16_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "span", 24);
    i0.ɵɵtext(2, "Start Test");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4, "Select Your Test");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Choose a training, enter your email, and select the test type.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 27)(8, "label", 28)(9, "span");
    i0.ɵɵtext(10, "Training");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 29)(12, "button", 30);
    i0.ɵɵlistener("click", function TestComponent_section_16_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.toggleDirectTrainingDropdown()); });
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 31);
    i0.ɵɵtext(16, "\u25BE");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, TestComponent_section_16_div_17_Template, 4, 3, "div", 32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "label")(19, "span");
    i0.ɵɵtext(20, "Email Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 33);
    i0.ɵɵlistener("ngModelChange", function TestComponent_section_16_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.directEmail = $event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "label")(23, "span");
    i0.ɵɵtext(24, "Test Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "select", 34);
    i0.ɵɵlistener("ngModelChange", function TestComponent_section_16_Template_select_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.testType = $event); });
    i0.ɵɵelementStart(26, "option", 35);
    i0.ɵɵtext(27, "Pre Test");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "option", 36);
    i0.ɵɵtext(29, "Post Test");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "option", 37);
    i0.ɵɵtext(31, "Assessment");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(32, TestComponent_section_16_p_32_Template, 2, 1, "p", 38);
    i0.ɵɵelementStart(33, "button", 39);
    i0.ɵɵlistener("click", function TestComponent_section_16_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r17); const ctx_r20 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r20.startDirectTest()); });
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("disabled", ctx_r2.directEntryLoading);
    i0.ɵɵattribute("aria-expanded", ctx_r2.isTrainingDropdownOpen);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.getSelectedDirectTrainingLabel());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.isTrainingDropdownOpen);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.directEmail)("disabled", ctx_r2.directEntryLoading);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.testType)("disabled", ctx_r2.directEntryLoading);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.directEntryMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r2.directEntryLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.directEntryLoading ? "Please wait..." : "Load Test", " ");
} }
function TestComponent_section_17_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Loading encrypted assessment and question bank...");
    i0.ɵɵelementEnd();
} }
function TestComponent_section_17_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r22.testLoadWarning);
} }
function TestComponent_section_17_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 47)(1, "span", 24);
    i0.ɵɵtext(2, "Assessment Loader");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, TestComponent_section_17_p_5_Template, 2, 0, "p", 10);
    i0.ɵɵtemplate(6, TestComponent_section_17_p_6_Template, 2, 1, "p", 10);
    i0.ɵɵelementStart(7, "button", 39);
    i0.ɵɵlistener("click", function TestComponent_section_17_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r23.loadTestForAttempt(ctx_r23.testName)); });
    i0.ɵɵtext(8, "Reload Test");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.isLoadingTest ? "Loading Assessment" : "Assessment Not Ready");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.isLoadingTest);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.isLoadingTest && ctx_r3.testLoadWarning);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r3.isLoadingTest);
} }
function TestComponent_ng_container_18_div_25_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "img", 80);
    i0.ɵɵlistener("error", function TestComponent_ng_container_18_div_25_img_1_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r34); const ctx_r33 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r33.markBrokenMedia(ctx_r33.currentQuestion.questionImageUrl)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r29 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("src", ctx_r29.currentQuestion.questionImageUrl, i0.ɵɵsanitizeUrl)("alt", ctx_r29.currentQuestion.questionImageAlt || "Question image");
} }
function TestComponent_ng_container_18_div_25_audio_2_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "audio", 81);
    i0.ɵɵlistener("error", function TestComponent_ng_container_18_div_25_audio_2_Template_audio_error_0_listener() { i0.ɵɵrestoreView(_r36); const ctx_r35 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r35.markBrokenMedia(ctx_r35.currentQuestion.audioUrl)); });
    i0.ɵɵelement(1, "source", 82);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r30 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", ctx_r30.currentQuestion.audioUrl, i0.ɵɵsanitizeUrl);
} }
function TestComponent_ng_container_18_div_25_video_3_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "video", 83);
    i0.ɵɵlistener("error", function TestComponent_ng_container_18_div_25_video_3_Template_video_error_0_listener() { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r37.markBrokenMedia(ctx_r37.currentQuestion.videoUrl)); });
    i0.ɵɵelement(1, "source", 84);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r31 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", ctx_r31.currentQuestion.videoUrl, i0.ɵɵsanitizeUrl);
} }
function TestComponent_ng_container_18_div_25_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85);
    i0.ɵɵelement(1, "i", 86);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Demo audio is not playable in this browser.");
    i0.ɵɵelementEnd()();
} }
function TestComponent_ng_container_18_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 75);
    i0.ɵɵtemplate(1, TestComponent_ng_container_18_div_25_img_1_Template, 1, 2, "img", 76);
    i0.ɵɵtemplate(2, TestComponent_ng_container_18_div_25_audio_2_Template, 2, 1, "audio", 77);
    i0.ɵɵtemplate(3, TestComponent_ng_container_18_div_25_video_3_Template, 2, 1, "video", 78);
    i0.ɵɵtemplate(4, TestComponent_ng_container_18_div_25_div_4_Template, 4, 0, "div", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r25 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r25.isMediaAvailable(ctx_r25.currentQuestion.questionImageUrl));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r25.isMediaAvailable(ctx_r25.currentQuestion.audioUrl));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r25.isMediaAvailable(ctx_r25.currentQuestion.videoUrl));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r25.currentQuestion.audioUrl && !ctx_r25.isMediaAvailable(ctx_r25.currentQuestion.audioUrl));
} }
function TestComponent_ng_container_18_div_26_button_1_img_5_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "img", 94);
    i0.ɵɵlistener("error", function TestComponent_ng_container_18_div_26_button_1_img_5_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r45); const option_r40 = i0.ɵɵnextContext().$implicit; const ctx_r43 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r43.markBrokenMedia(option_r40.imageUrl)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r40 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", option_r40.imageUrl, i0.ɵɵsanitizeUrl)("alt", option_r40.imageAlt || option_r40.text);
} }
function TestComponent_ng_container_18_div_26_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 89);
    i0.ɵɵlistener("click", function TestComponent_ng_container_18_div_26_button_1_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r48); const option_r40 = restoredCtx.$implicit; const ctx_r47 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r47.selectOption(option_r40.id)); });
    i0.ɵɵelementStart(1, "span", 90);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 91);
    i0.ɵɵelementStart(4, "span", 92);
    i0.ɵɵtemplate(5, TestComponent_ng_container_18_div_26_button_1_img_5_Template, 1, 2, "img", 93);
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const option_r40 = ctx.$implicit;
    const optionIndex_r41 = ctx.index;
    const ctx_r39 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("test-option--selected", ctx_r39.isOptionSelected(option_r40.id));
    i0.ɵɵattribute("aria-label", "Select option " + ctx_r39.getOptionLabel(optionIndex_r41));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r39.getOptionLabel(optionIndex_r41));
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("option-control--checkbox", ctx_r39.isMultipleAnswerQuestion(ctx_r39.currentQuestion))("option-control--radio", !ctx_r39.isMultipleAnswerQuestion(ctx_r39.currentQuestion))("option-control--checked", ctx_r39.isOptionSelected(option_r40.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r39.isMediaAvailable(option_r40.imageUrl));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r40.text);
} }
function TestComponent_ng_container_18_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 87);
    i0.ɵɵtemplate(1, TestComponent_ng_container_18_div_26_button_1_Template, 8, 12, "button", 88);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r26 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r26.currentQuestion.options)("ngForTrackBy", ctx_r26.trackByOptionId);
} }
function TestComponent_ng_container_18_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 95)(1, "label", 96);
    i0.ɵɵtext(2, "Your Answer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "textarea", 97);
    i0.ɵɵlistener("ngModelChange", function TestComponent_ng_container_18_div_27_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r50); const ctx_r49 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r49.onEssayAnswerChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Essay responses may require manual evaluation.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r27.currentAnswer.essayAnswer);
} }
function TestComponent_ng_container_18_button_61_Template(rf, ctx) { if (rf & 1) {
    const _r54 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 98);
    i0.ɵɵlistener("click", function TestComponent_ng_container_18_button_61_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r54); const index_r52 = restoredCtx.index; const ctx_r53 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r53.goToQuestion(index_r52)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r51 = ctx.$implicit;
    const index_r52 = ctx.index;
    const ctx_r28 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("is-current", index_r52 === ctx_r28.currentQuestionIndex)("is-answered", ctx_r28.answers[index_r52].status === "answered")("is-skipped", ctx_r28.answers[index_r52].status === "skipped");
    i0.ɵɵattribute("title", ctx_r28.getQuestionTypeLabel(question_r51.questionType) + " - " + question_r51.difficulty)("aria-label", ctx_r28.getQuestionStatus(index_r52));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", question_r51.questionNo, " ");
} }
function TestComponent_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 48)(2, "main", 49)(3, "div", 50)(4, "div", 51)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 52);
    i0.ɵɵlistener("click", function TestComponent_ng_container_18_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r56); const ctx_r55 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r55.openSubmitModal()); });
    i0.ɵɵelement(10, "i", 53);
    i0.ɵɵtext(11, " Submit Test ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 54)(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 55);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "h2");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, TestComponent_ng_container_18_div_25_Template, 5, 4, "div", 56);
    i0.ɵɵtemplate(26, TestComponent_ng_container_18_div_26_Template, 2, 2, "div", 57);
    i0.ɵɵtemplate(27, TestComponent_ng_container_18_div_27_Template, 6, 1, "div", 58);
    i0.ɵɵelementStart(28, "div", 59)(29, "button", 60);
    i0.ɵɵlistener("click", function TestComponent_ng_container_18_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r56); const ctx_r57 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r57.clearCurrentAnswer()); });
    i0.ɵɵelement(30, "i", 61);
    i0.ɵɵtext(31, " Clear ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 62);
    i0.ɵɵlistener("click", function TestComponent_ng_container_18_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r56); const ctx_r58 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r58.skipQuestion()); });
    i0.ɵɵelement(33, "i", 63);
    i0.ɵɵtext(34, " Skip ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "button", 60);
    i0.ɵɵlistener("click", function TestComponent_ng_container_18_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r56); const ctx_r59 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r59.previousQuestion()); });
    i0.ɵɵelement(36, "i", 64);
    i0.ɵɵtext(37, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 25);
    i0.ɵɵlistener("click", function TestComponent_ng_container_18_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r56); const ctx_r60 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r60.nextQuestion()); });
    i0.ɵɵtext(39, " Next ");
    i0.ɵɵelement(40, "i", 65);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(41, "aside", 66)(42, "h3");
    i0.ɵɵtext(43, "Question Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 67)(45, "div")(46, "strong");
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49, "Answered");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div")(51, "strong");
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span");
    i0.ɵɵtext(54, "Not Answered");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div")(56, "strong");
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "span");
    i0.ɵɵtext(59, "Skipped");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(60, "div", 68);
    i0.ɵɵtemplate(61, TestComponent_ng_container_18_button_61_Template, 2, 9, "button", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div", 70)(63, "span");
    i0.ɵɵelement(64, "i", 71);
    i0.ɵɵtext(65, "Answered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "span");
    i0.ɵɵelement(67, "i", 72);
    i0.ɵɵtext(68, "Not Answered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span");
    i0.ɵɵelement(70, "i", 73);
    i0.ɵɵtext(71, "Skipped");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "span");
    i0.ɵɵelement(73, "i", 74);
    i0.ɵɵtext(74, "Current");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("Question ", ctx_r4.currentQuestion.questionNo, " of ", ctx_r4.questions.length, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.testName);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r4.getQuestionTypeLabel(ctx_r4.currentQuestion.questionType));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", "difficulty--" + ctx_r4.currentQuestion.difficulty.toLowerCase());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r4.currentQuestion.difficulty);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r4.getQuestionMarks(ctx_r4.currentQuestion), " marks");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r4.getQuestionNegativeMarks(ctx_r4.currentQuestion), " negative");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r4.currentQuestion.estimatedTimeSeconds, "s estimated");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.currentQuestion.questionText);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.hasVisibleMedia(ctx_r4.currentQuestion));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.hasOptions(ctx_r4.currentQuestion));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.isEssayQuestion(ctx_r4.currentQuestion));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r4.hasCurrentAnswer());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r4.currentQuestionIndex === 0);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx_r4.answeredCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.notAnsweredCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.skippedCount);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r4.questions)("ngForTrackBy", ctx_r4.trackByQuestionId);
} }
const DEFAULT_TEST_NAME = 'Test 1';
const DEFAULT_USERNAME = 'demo-user';
const STORAGE_KEY_START_TEST = 'qlss-start-test';
const DEFAULT_RESULT_SOURCE = 'Current Submitted Result';
const ANSWERED_STATUS = 'answered';
const SKIPPED_STATUS = 'skipped';
const NOT_ANSWERED_STATUS = 'notAnswered';
const PASSING_PERCENTAGE = 60;
const PENDING_RESULT_KEY = 'qlss-pending-test-result';
export class TestComponent {
    constructor(testStorage, authService, router, http, dataService, trainingService) {
        this.testStorage = testStorage;
        this.authService = authService;
        this.router = router;
        this.http = http;
        this.dataService = dataService;
        this.trainingService = trainingService;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.isSubmitted = false;
        this.isAutoSubmitted = false;
        this.isSubmitModalOpen = false;
        this.result = null;
        this.resultSourceLabel = '';
        this.resultSaveWarning = '';
        this.submissionMessage = '';
        this.username = DEFAULT_USERNAME;
        this.testName = DEFAULT_TEST_NAME;
        this.testType = 'assessment';
        this.startTrainingId = '';
        this.savedResultUsername = '';
        this.savedResultTestName = '';
        this.isResultTestDropdownOpen = false;
        this.highlightedResultTestIndex = -1;
        this.selectedResultTestKey = '';
        this.resultAvailableTests = [];
        this.isResultUserDropdownOpen = false;
        this.highlightedResultUserIndex = -1;
        this.selectedResultUsername = '';
        this.resultAvailableUsers = [];
        this.resultDropdownsLoaded = false;
        this.savedResultMessage = '';
        this.savedResults = [];
        this.totalSeconds = 15 * 60;
        this.remainingSeconds = this.totalSeconds;
        this.isLoadingTest = true;
        this.testLoadWarning = '';
        this.isDirectEntry = false;
        this.directEntryLoading = false;
        this.directEntryMessage = '';
        this.directEmail = '';
        this.selectedTrainingId = '';
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.directTrainings = [];
        this.directTests = [];
        this.isAdmin = false;
        this.destroy$ = new Subject();
        this.activeTestDefinition = null;
        this.brokenMedia = {};
        this.timerId = null;
        this.currentQuestionStartedAt = null;
        this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
            this.isAdmin = false;
            if (this.isAdmin && !this.resultDropdownsLoaded) {
                this.loadResultDropdownData();
            }
        });
    }
    ngOnInit() {
        const examFormSelection = sessionStorage.getItem('qlss-exam-form-selection');
        if (examFormSelection) {
            sessionStorage.removeItem('qlss-exam-form-selection');
            try {
                const selection = JSON.parse(examFormSelection);
                this.directEmail = String(selection.username || '').trim();
                this.selectedTrainingId = String(selection.trainingId || '').trim();
            }
            catch (_a) {
                // The direct-entry validation below will request any missing data.
            }
            this.isDirectEntry = true;
            this.isLoadingTest = false;
            this.loadDirectEntryData();
            return;
        }
        const startTestData = this.getStartTestData();
        console.log('Start Test Data:', startTestData); // Debugging line
        if (!startTestData) {
            this.router.navigate(['/fill-exam-form']);
            return;
        }
        this.testName = this.sanitizeDisplayValue(startTestData === null || startTestData === void 0 ? void 0 : startTestData.testName, this.testName);
        this.testType = (startTestData === null || startTestData === void 0 ? void 0 : startTestData.testType) || this.getTestType(this.testName);
        this.startTrainingId = String((startTestData === null || startTestData === void 0 ? void 0 : startTestData.trainingId) || '').trim();
        this.username = this.sanitizeDisplayValue(startTestData === null || startTestData === void 0 ? void 0 : startTestData.username, this.username);
        this.savedResults = this.getSavedResultList();
        if (this.isAdmin && !this.resultDropdownsLoaded) {
            this.loadResultDropdownData();
        }
        if (!this.isAdmin) {
            this.loadTestForAttempt(String((startTestData === null || startTestData === void 0 ? void 0 : startTestData.testId) || '').trim() || this.testName);
        }
    }
    loadDirectEntryData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.directEntryLoading = true;
            this.directEntryMessage = '';
            try {
                const [, tests] = yield Promise.all([
                    this.loadTrainingList(),
                    this.testStorage.listTestDefinitions()
                ]);
                this.directTests = tests;
            }
            catch (_a) {
                this.directEntryMessage = 'Training list could not be loaded. Please try again.';
            }
            finally {
                this.directEntryLoading = false;
            }
        });
    }
    // private async loadTrainingList(): Promise<void> {
    //   const headers = new HttpHeaders({
    //     ETag: 'f88dd058fe004909615a64f01be66a7',
    //     'Content-Type': 'application/json'
    //   });
    //   const encryptedData = await firstValueFrom(
    //     this.http.get('assets/Training.json', { headers, responseType: 'text' })
    //   );
    //   const trainings = this.dataService.decrypt(encryptedData)?.Table || [];
    //   this.directTrainings = trainings
    //     .map((training: any): DirectTrainingOption => ({
    //       trainingId: String(training.TrainingId ?? training.trainingId ?? ''),
    //       trainingName: training.TrainingName ?? training.trainingName ?? '',
    //       displayName: training.DisplayName ?? training.displayName ?? training.TrainingName ?? ''
    //     }))
    //     .filter((training: DirectTrainingOption) => training.trainingId && this.getDirectTrainingLabel(training))
    //     .sort((a: DirectTrainingOption, b: DirectTrainingOption) =>
    //       this.getDirectTrainingLabel(a).localeCompare(this.getDirectTrainingLabel(b))
    //     );
    // }
    // Future API integration: call this method instead of loadTrainingList().
    loadTrainingList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield firstValueFrom(this.trainingService.getPaged(1, 100));
                this.directTrainings = (response.items || [])
                    .map((training) => {
                    var _a;
                    return ({
                        trainingId: String((_a = training.trainingId) !== null && _a !== void 0 ? _a : ''),
                        trainingName: training.trainingName || '',
                        displayName: training.displayName || training.trainingName || ''
                    });
                })
                    .filter((training) => training.trainingId && this.getDirectTrainingLabel(training))
                    .sort((a, b) => this.getDirectTrainingLabel(a).localeCompare(this.getDirectTrainingLabel(b)));
            }
            catch (error) {
                console.error('Failed to load training data.', { status: error.status });
                this.directTrainings = [];
            }
        });
    }
    startDirectTest() {
        return __awaiter(this, void 0, void 0, function* () {
            this.directEntryMessage = '';
            const email = this.directEmail.trim();
            if (!this.selectedTrainingId || !email || !this.isValidEmail(email)) {
                this.directEntryMessage = 'Select training and enter a valid email address.';
                return;
            }
            this.directEntryLoading = true;
            try {
                if (this.testType === 'post') {
                    const isAllowed = yield this.testStorage.validatePostTestAccess(email, this.selectedTrainingId);
                    if (!isAllowed) {
                        this.directEntryMessage = 'This email is not registered for the selected training.';
                        return;
                    }
                }
                const selectedTest = this.directTests.find((test) => String(test.trainingId || '') === this.selectedTrainingId &&
                    this.getDefinitionTestType(test) === this.testType);
                if (!selectedTest) {
                    this.directEntryMessage = 'No test is available for the selected training and test type.';
                    return;
                }
                this.username = email;
                this.isDirectEntry = false;
                this.loadTestForAttempt(selectedTest.testId);
            }
            catch (_a) {
                this.directEntryMessage = 'Test access could not be verified. Please try again.';
            }
            finally {
                this.directEntryLoading = false;
            }
        });
    }
    get filteredDirectTrainings() {
        const search = this.trainingSearch.trim().toLowerCase();
        if (!search) {
            return this.directTrainings;
        }
        return this.directTrainings.filter((training) => this.getDirectTrainingLabel(training).toLowerCase().includes(search) ||
            training.trainingId.toLowerCase().includes(search));
    }
    getDirectTrainingLabel(training) {
        return training.displayName || training.trainingName || training.trainingId;
    }
    getSelectedDirectTrainingLabel() {
        const selected = this.directTrainings.find((training) => training.trainingId === this.selectedTrainingId);
        return selected ? this.getDirectTrainingLabel(selected) : 'Select Training';
    }
    toggleDirectTrainingDropdown() {
        this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
        if (this.isTrainingDropdownOpen) {
            this.trainingSearch = '';
        }
    }
    selectDirectTraining(training) {
        this.selectedTrainingId = training.trainingId;
        this.trainingSearch = this.getDirectTrainingLabel(training);
        this.isTrainingDropdownOpen = false;
    }
    getDefinitionTestType(test) {
        if (test.testFileType) {
            return test.testFileType;
        }
        try {
            const metadata = JSON.parse(String(test.metadataJson || '{}'));
            const type = metadata.testFileType || metadata.testType;
            if (type === 'pre' || type === 'post' || type === 'assessment' || type === 'chalange' || type === 'NOR') {
                return type;
            }
        }
        catch (_a) {
            // Test names are used only for older records without test type metadata.
        }
        return this.getTestType(test.testName || test.displayName || '');
    }
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    getStartTestData() {
        const savedData = sessionStorage.getItem(STORAGE_KEY_START_TEST);
        sessionStorage.removeItem(STORAGE_KEY_START_TEST);
        if (!savedData) {
            return null;
        }
        try {
            return JSON.parse(savedData);
        }
        catch (_a) {
            return null;
        }
    }
    sanitizeDisplayValue(value, fallback) {
        return (value || '').trim() || fallback;
    }
    getTestType(testName) {
        const normalizedName = testName.toLowerCase();
        if (normalizedName.includes('pre'))
            return 'pre';
        if (normalizedName.includes('post'))
            return 'post';
        if (normalizedName.includes('chalange') || normalizedName.includes('challenge'))
            return 'chalange';
        return 'assessment';
    }
    ngOnDestroy() {
        this.saveCurrentQuestionTime();
        this.clearTimer();
        this.destroy$.next();
        this.destroy$.complete();
    }
    get currentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    get currentAnswer() {
        return this.answers[this.currentQuestionIndex];
    }
    get timerText() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
    }
    get answeredCount() {
        return this.answers.filter((answer) => answer.status === ANSWERED_STATUS).length;
    }
    get skippedCount() {
        return this.answers.filter((answer) => answer.status === SKIPPED_STATUS).length;
    }
    get notAnsweredCount() {
        return this.answers.filter((answer) => answer.status === NOT_ANSWERED_STATUS).length;
    }
    loadAssessmentByTestName(testName) {
        this.loadTestForAttempt(testName);
    }
    //SPCPreTest
    loadTestForAttempt(testName) {
        const displayTestName = this.sanitizeDisplayValue(testName, DEFAULT_TEST_NAME);
        this.isLoadingTest = true;
        this.testLoadWarning = '';
        this.saveCurrentQuestionTime();
        this.clearTimer();
        // Previous database/local assessment lookup kept for reference:
        // this.testStorage.resolveAssessmentQuestions(displayTestName)
        this.testStorage.resolveAssessmentFileQuestions(displayTestName, this.testType === 'NOR' ? 'assessment' : this.testType)
            .then((attempt) => {
            this.applyTestAttempt(attempt.testDefinition, attempt.questions, attempt.missingQuestionIds);
        })
            .catch(() => this.handleTestLoadFailure(displayTestName))
            .finally(() => (this.isLoadingTest = false));
    }
    handleTestLoadFailure(displayTestName) {
        this.questions = [];
        this.answers = [];
        this.activeTestDefinition = null;
        this.testName = displayTestName;
        this.testLoadWarning = 'Assessment could not be loaded. Please create or import the encrypted assessment first.';
    }
    loadSavedSubmission(username, testName) {
        this.savedResultMessage = '';
        const normalizedUsername = username.trim();
        const normalizedTestName = testName.trim();
        if (!normalizedUsername) {
            this.savedResultMessage = 'Select a user.';
            return;
        }
        if (!normalizedTestName) {
            this.savedResultMessage = 'Select a test.';
            return;
        }
        this.testStorage.loadSavedSubmission(normalizedUsername, normalizedTestName)
            .then((submission) => {
            if (!submission) {
                this.savedResultMessage = 'No saved result found.';
                return;
            }
            this.displaySubmissionResult(Object.assign(Object.assign({}, submission), { resultSource: 'Saved Result Loaded' }));
        })
            .catch(() => {
            this.savedResultMessage = 'Saved result could not be loaded.';
        });
    }
    saveSubmissionResult(submission) {
        return this.testStorage.saveSubmissionResult(submission);
    }
    displaySubmissionResult(submission) {
        this.questions = submission.questions;
        this.answers = submission.userAnswers;
        this.result = submission.resultSummary;
        this.resultSourceLabel = submission.resultSource;
        this.isAutoSubmitted = submission.isAutoSubmitted;
        this.isSubmitted = true;
        this.savedResults = this.getSavedResultList();
    }
    getSavedResultList() {
        return this.testStorage.getSavedResultList();
    }
    loadResultDropdownData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.resultDropdownsLoaded = true;
            this.savedResults = this.getSavedResultList();
            this.resultAvailableTests = this.buildResultTestOptions([], this.savedResults);
            this.resultAvailableUsers = this.buildResultUserOptions([], this.savedResults);
            const [tests, users, savedResults] = yield Promise.all([
                this.loadResultTests(),
                this.loadResultUsers(),
                this.loadResultSavedResults()
            ]);
            this.savedResults = savedResults.length ? savedResults : this.savedResults;
            this.resultAvailableTests = this.buildResultTestOptions(tests, this.savedResults);
            this.resultAvailableUsers = this.buildResultUserOptions(users, this.savedResults);
        });
    }
    loadResultTests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.testStorage.listTestDefinitions();
            }
            catch (_a) {
                return this.testStorage.listAssessments();
            }
        });
    }
    loadResultUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.testStorage.listResultUsers();
            }
            catch (_a) {
                return [];
            }
        });
    }
    loadResultSavedResults() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.testStorage.listSavedResults();
            }
            catch (_a) {
                return this.getSavedResultList();
            }
        });
    }
    buildResultTestOptions(tests, savedResults) {
        const options = new Map();
        tests.forEach((test) => {
            const assetFileName = test.assetFileName;
            const optionKey = assetFileName
                ? `asset:${assetFileName}`
                : `local:${this.testStorage.normalizeFileName(test.testName)}`;
            const label = test.displayName || test.testName || test.fileName || '';
            if (label) {
                options.set(optionKey, Object.assign(Object.assign({}, test), { optionKey, assetFileName }));
            }
        });
        savedResults.forEach((item) => {
            const label = item.testName || item.fileName || '';
            const optionKey = `saved:${this.testStorage.normalizeFileName(label)}`;
            if (label && !options.has(optionKey)) {
                options.set(optionKey, {
                    testId: optionKey,
                    testName: label,
                    displayName: label,
                    fileName: item.fileName || this.testStorage.normalizeFileName(label),
                    testTitle: label,
                    description: '',
                    subject: '',
                    topic: '',
                    durationMinutes: 0,
                    passingPercentage: PASSING_PERCENTAGE,
                    instructions: '',
                    status: 'Active',
                    mappedQuestionIds: [],
                    questionOrder: [],
                    totalQuestions: 0,
                    totalMarks: 0,
                    version: 1,
                    createdAt: item.submittedAt || new Date().toISOString(),
                    updatedAt: item.submittedAt || new Date().toISOString(),
                    optionKey
                });
            }
        });
        return Array.from(options.values()).sort((a, b) => this.getResultTestLabel(a).localeCompare(this.getResultTestLabel(b)));
    }
    buildResultUserOptions(users, savedResults) {
        const options = new Map();
        users.forEach((username) => this.addResultUserOption(options, username));
        savedResults.forEach((item) => this.addResultUserOption(options, item.username || item.normalizedUsername || ''));
        return Array.from(options.values()).sort((a, b) => a.username.localeCompare(b.username));
    }
    addResultUserOption(options, username) {
        const cleanUsername = (username || '').trim();
        if (!cleanUsername) {
            return;
        }
        const key = this.testStorage.normalizeFileName(cleanUsername).toLowerCase();
        if (!options.has(key)) {
            options.set(key, { username: cleanUsername, normalizedUsername: this.testStorage.normalizeFileName(cleanUsername) });
        }
    }
    getResultTestLabel(test) {
        return test.displayName || test.testName || test.fileName || 'Test';
    }
    getSelectedResultTestLabel() {
        const selectedTest = this.resultAvailableTests.find((test) => test.optionKey === this.selectedResultTestKey);
        return selectedTest ? this.getResultTestLabel(selectedTest) : 'Select Test';
    }
    toggleResultTestDropdown() {
        this.isResultTestDropdownOpen = !this.isResultTestDropdownOpen;
        this.isResultUserDropdownOpen = false;
        if (this.isResultTestDropdownOpen) {
            const currentIndex = this.resultAvailableTests.findIndex((test) => test.optionKey === this.selectedResultTestKey);
            this.highlightedResultTestIndex = currentIndex >= 0 ? currentIndex : 0;
        }
        else {
            this.highlightedResultTestIndex = -1;
        }
    }
    closeResultTestDropdown() {
        this.isResultTestDropdownOpen = false;
        this.highlightedResultTestIndex = -1;
    }
    selectResultTest(test) {
        this.selectedResultTestKey = test.optionKey || '';
        this.savedResultTestName = test.displayName || test.testName || test.fileName || '';
        this.closeResultTestDropdown();
    }
    onResultTestDropdownKeydown(event) {
        this.handleResultDropdownKeydown(event, this.resultAvailableTests.length, this.isResultTestDropdownOpen, this.highlightedResultTestIndex, (index) => {
            this.highlightedResultTestIndex = index;
        }, () => this.toggleResultTestDropdown(), (index) => this.selectResultTest(this.resultAvailableTests[index]), () => this.closeResultTestDropdown());
    }
    getSelectedResultUserLabel() {
        return this.selectedResultUsername || 'Select User';
    }
    toggleResultUserDropdown() {
        this.isResultUserDropdownOpen = !this.isResultUserDropdownOpen;
        this.isResultTestDropdownOpen = false;
        if (this.isResultUserDropdownOpen) {
            const currentIndex = this.resultAvailableUsers.findIndex((user) => user.username === this.selectedResultUsername);
            this.highlightedResultUserIndex = currentIndex >= 0 ? currentIndex : 0;
        }
        else {
            this.highlightedResultUserIndex = -1;
        }
    }
    closeResultUserDropdown() {
        this.isResultUserDropdownOpen = false;
        this.highlightedResultUserIndex = -1;
    }
    selectResultUser(user) {
        this.selectedResultUsername = user.username;
        this.savedResultUsername = user.username;
        this.closeResultUserDropdown();
    }
    onResultUserDropdownKeydown(event) {
        this.handleResultDropdownKeydown(event, this.resultAvailableUsers.length, this.isResultUserDropdownOpen, this.highlightedResultUserIndex, (index) => {
            this.highlightedResultUserIndex = index;
        }, () => this.toggleResultUserDropdown(), (index) => this.selectResultUser(this.resultAvailableUsers[index]), () => this.closeResultUserDropdown());
    }
    handleResultDropdownKeydown(event, optionCount, isOpen, highlightedIndex, setHighlightedIndex, openDropdown, selectIndex, closeDropdown) {
        if (!optionCount && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!isOpen) {
                openDropdown();
                return;
            }
            const maxIndex = optionCount - 1;
            setHighlightedIndex(event.key === 'ArrowDown'
                ? (highlightedIndex < maxIndex ? highlightedIndex + 1 : 0)
                : (highlightedIndex > 0 ? highlightedIndex - 1 : maxIndex));
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            if (isOpen && highlightedIndex >= 0) {
                event.preventDefault();
                selectIndex(highlightedIndex);
            }
            return;
        }
        if (event.key === 'Escape') {
            closeDropdown();
        }
    }
    clearSavedResultSearch() {
        this.savedResultUsername = '';
        this.savedResultTestName = '';
        this.selectedResultUsername = '';
        this.selectedResultTestKey = '';
        this.closeResultUserDropdown();
        this.closeResultTestDropdown();
        this.savedResultMessage = '';
    }
    viewSavedResult(item) {
        this.loadSavedSubmission(item.username, item.testName);
    }
    onDocumentClick(event) {
        const target = event.target;
        if (!target.closest('.direct-training-search')) {
            this.isTrainingDropdownOpen = false;
        }
        if (!target.closest('.result-dropdown')) {
            this.closeResultTestDropdown();
            this.closeResultUserDropdown();
        }
    }
    downloadCurrentResult() {
        if (!this.result) {
            return;
        }
        const submission = this.buildSubmissionPayload(this.result, this.isAutoSubmitted, this.resultSourceLabel || DEFAULT_RESULT_SOURCE);
        this.testStorage.exportSubmissionResult(submission)
            .then((blob) => this.testStorage.downloadBlob(blob, `${submission.testName}-result.json`))
            .catch(() => (this.resultSaveWarning = 'Result export failed.'));
    }
    selectOption(optionId) {
        if (this.isSubmitted || this.isSubmitModalOpen || this.isEssayQuestion(this.currentQuestion)) {
            return;
        }
        if (this.currentQuestion.questionType === 'MCMA') {
            this.toggleMultipleOption(optionId);
            return;
        }
        this.currentAnswer.selectedOptionId = optionId;
        this.currentAnswer.selectedOptionIds = [optionId];
        this.currentAnswer.status = ANSWERED_STATUS;
    }
    onEssayAnswerChange(value) {
        if (this.isSubmitted || this.isSubmitModalOpen) {
            return;
        }
        this.currentAnswer.essayAnswer = value;
        this.currentAnswer.status = value.trim() ? ANSWERED_STATUS : NOT_ANSWERED_STATUS;
    }
    clearCurrentAnswer() {
        if (this.isSubmitted || this.isSubmitModalOpen || !this.hasCurrentAnswer()) {
            return;
        }
        this.currentAnswer.selectedOptionId = null;
        this.currentAnswer.selectedOptionIds = [];
        this.currentAnswer.essayAnswer = '';
        this.currentAnswer.status = NOT_ANSWERED_STATUS;
        this.currentAnswer.evaluationStatus = NOT_ANSWERED_STATUS;
    }
    hasCurrentAnswer() {
        return this.hasAnswer(this.currentQuestion, this.currentAnswer);
    }
    isOptionSelected(optionId) {
        if (this.currentQuestion.questionType === 'MCMA') {
            return this.currentAnswer.selectedOptionIds.includes(optionId);
        }
        return this.currentAnswer.selectedOptionId === optionId;
    }
    getOptionLabel(index) {
        return String.fromCharCode(65 + index);
    }
    isMultipleAnswerQuestion(question) {
        return question.questionType === 'MCMA';
    }
    moveToQuestion(index) {
        if (index < 0 || index >= this.questions.length || index === this.currentQuestionIndex || this.isSubmitted || this.isSubmitModalOpen) {
            return;
        }
        this.saveCurrentQuestionTime();
        this.currentQuestionIndex = index;
        this.startQuestionVisit();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    goToQuestion(index) {
        this.moveToQuestion(index);
    }
    nextQuestion() {
        if (this.currentQuestionIndex === this.questions.length - 1) {
            // Keep the user on the last question and open the submit confirmation.
            this.openSubmitModal();
            return;
        }
        this.moveToQuestion(this.currentQuestionIndex + 1);
    }
    previousQuestion() {
        this.moveToQuestion(this.currentQuestionIndex - 1);
    }
    skipQuestion() {
        if (this.isSubmitted || this.isSubmitModalOpen) {
            return;
        }
        if (!this.hasCurrentAnswer()) {
            this.currentAnswer.status = SKIPPED_STATUS;
        }
        this.moveToQuestion(this.currentQuestionIndex + 1);
    }
    openSubmitModal() {
        if (this.isSubmitted) {
            return;
        }
        this.saveCurrentQuestionTime();
        this.isSubmitModalOpen = true;
    }
    closeSubmitModal() {
        if (this.isSubmitted) {
            return;
        }
        this.isSubmitModalOpen = false;
        this.startQuestionVisit();
    }
    submitFromModal() {
        this.submitTest(false);
    }
    submitTest(isAutoSubmitted = false) {
        if (this.isSubmitted) {
            return;
        }
        this.saveCurrentQuestionTime();
        this.clearTimer();
        this.isSubmitModalOpen = false;
        this.isAutoSubmitted = isAutoSubmitted;
        this.submissionMessage = '';
        const resultSummary = this.calculateResult();
        const submission = this.buildSubmissionPayload(resultSummary, isAutoSubmitted, DEFAULT_RESULT_SOURCE);
        this.isSubmitted = true;
        this.saveSubmissionResult(submission)
            .then(() => {
            this.completeSubmissionNavigation(submission, '');
        })
            .catch((error) => {
            this.isSubmitted = false;
            this.submissionMessage = error instanceof Error
                ? error.message
                : 'Your test result could not be submitted. Please try again.';
        });
    }
    returnToTraining() {
        this.router.navigate(['/training']);
    }
    completeSubmissionNavigation(submission, warning) {
        if (this.testType === 'pre') {
            this.openResultPage(submission, warning);
            return;
        }
        this.router.navigate(['/training']);
    }
    openResultPage(submission, warning) {
        sessionStorage.setItem(PENDING_RESULT_KEY, JSON.stringify({ submission, warning }));
        this.router.navigate(['/test/result']);
    }
    restartTest() {
        this.currentQuestionIndex = 0;
        this.remainingSeconds = this.totalSeconds;
        this.isSubmitted = false;
        this.isAutoSubmitted = false;
        this.isSubmitModalOpen = false;
        this.result = null;
        this.resultSourceLabel = '';
        this.resultSaveWarning = '';
        this.answers = this.createEmptyAnswers();
        this.startQuestionVisit();
        this.startTimer();
    }
    getQuestionStatus(index) {
        // if (index === this.currentQuestionIndex && !this.isSubmitted) {
        //   return 'Current Question';
        // }
        const status = this.answers[index].status;
        if (status === ANSWERED_STATUS) {
            return 'Answered';
        }
        if (status === SKIPPED_STATUS) {
            return 'Skipped';
        }
        return 'Not Answered';
    }
    getReviewOptionClass(question, answer, optionId) {
        const isSelected = this.isReviewOptionSelected(question, answer, optionId);
        const isCorrect = this.getCorrectOptionIds(question).includes(optionId);
        if (isSelected && isCorrect) {
            return 'test-option--correct';
        }
        if (isSelected && !isCorrect) {
            return 'test-option--wrong';
        }
        if (isCorrect) {
            return 'test-option--correct-answer';
        }
        return '';
    }
    getEvaluationClass(answer) {
        return `evaluation--${answer.evaluationStatus}`;
    }
    getEvaluationLabel(answer) {
        const labels = {
            correct: 'Correct',
            wrong: 'Wrong',
            skipped: 'Skipped',
            manualReview: 'Manual Review Required',
            notAnswered: 'Not Answered'
        };
        return labels[answer.evaluationStatus];
    }
    getSelectedAnswerText(question, answer) {
        if (question.questionType === 'ESSAY') {
            return answer.essayAnswer.trim() || 'Not answered';
        }
        const selectedIds = question.questionType === 'MCMA' ? answer.selectedOptionIds : (answer.selectedOptionId ? [answer.selectedOptionId] : []);
        if (!selectedIds.length) {
            return 'Not answered';
        }
        return this.getOptionTexts(question, selectedIds).join(', ');
    }
    getCorrectAnswerText(question) {
        if (question.questionType === 'ESSAY') {
            return question.expectedAnswer || 'Manual review required';
        }
        return this.getOptionTexts(question, this.getCorrectOptionIds(question)).join(', ');
    }
    getQuestionMarks(question) {
        return question.marks && question.marks > 0 ? question.marks : 1;
    }
    getQuestionNegativeMarks(question) {
        return question.negativeMarks || 0;
    }
    getQuestionTypeLabel(type) {
        const labels = {
            MCSA: 'Single Answer',
            MCMA: 'Multiple Answer',
            TRUE_FALSE: 'True / False',
            ESSAY: 'Essay'
        };
        return labels[type];
    }
    isEssayQuestion(question) {
        return question.questionType === 'ESSAY';
    }
    hasOptions(question) {
        return !!question.options && question.options.length > 0;
    }
    markBrokenMedia(url) {
        if (url) {
            this.brokenMedia[url] = true;
        }
    }
    isMediaAvailable(url) {
        return !!url && !this.brokenMedia[url];
    }
    hasVisibleMedia(question) {
        return (this.isMediaAvailable(question.questionImageUrl) ||
            this.isMediaAvailable(question.audioUrl) ||
            this.isMediaAvailable(question.videoUrl));
    }
    trackByQuestionId(_index, question) {
        return question.id;
    }
    trackByOptionId(_index, option) {
        return option.id;
    }
    trackBySummaryLabel(_index, item) {
        return item.label;
    }
    buildSubmissionPayload(resultSummary, isAutoSubmitted, resultSource) {
        var _a, _b, _c;
        // Save the randomized attempt order so the result shows the same question sequence.
        const questionsInAttemptOrder = [...this.questions];
        const solutionReview = questionsInAttemptOrder.map((question, index) => this.buildQuestionResult(question, this.answers[index], index));
        const displayName = ((_a = this.activeTestDefinition) === null || _a === void 0 ? void 0 : _a.displayName) || this.testName || 'Test 1';
        const fileName = this.testStorage.normalizeFileName(displayName);
        const username = this.username.trim() || 'demo-user';
        return {
            submissionId: `submission-${Date.now()}`,
            username,
            normalizedUsername: this.testStorage.normalizeFileName(username),
            testId: (_b = this.activeTestDefinition) === null || _b === void 0 ? void 0 : _b.testId,
            testName: displayName,
            displayName,
            fileName,
            testTitle: ((_c = this.activeTestDefinition) === null || _c === void 0 ? void 0 : _c.testTitle) || displayName,
            submittedAt: new Date().toISOString(),
            isAutoSubmitted,
            resultSource,
            testDetailsSnapshot: this.activeTestDefinition || undefined,
            questionSnapshots: questionsInAttemptOrder,
            totalDurationSeconds: this.totalSeconds,
            totalTimeUsedSeconds: resultSummary.totalTimeUsedSeconds,
            questions: questionsInAttemptOrder,
            userAnswers: this.answers,
            resultSummary,
            questionResults: solutionReview,
            solutionReview,
            manualReviewItems: solutionReview.filter((item) => item.evaluationStatus === 'manualReview'),
            questionTypeBreakdown: resultSummary.questionTypeBreakdown,
            difficultyBreakdown: resultSummary.difficultyBreakdown,
            subjectWiseSummary: resultSummary.subjectWiseSummary,
            topicWiseSummary: resultSummary.topicWiseSummary
        };
    }
    buildQuestionResult(question, answer, index) {
        const status = answer.evaluationStatus;
        const marks = this.getQuestionMarks(question);
        const negativeMarks = this.getQuestionNegativeMarks(question);
        const obtainedMarks = status === 'correct' ? marks : status === 'wrong' ? -negativeMarks : 0;
        return {
            questionId: question.id,
            questionNo: index + 1,
            questionType: question.questionType,
            subject: question.subject,
            topic: question.topic,
            difficulty: question.difficulty,
            questionText: question.questionText,
            selectedOptionId: answer.selectedOptionId,
            selectedOptionIds: answer.selectedOptionIds,
            essayAnswer: answer.essayAnswer,
            correctOptionId: question.correctOptionId,
            correctOptionIds: question.correctOptionIds,
            evaluationStatus: status,
            timeSpentSeconds: answer.timeSpentSeconds,
            marks,
            negativeMarks,
            obtainedMarks,
            explanation: question.explanation,
            mediaUrls: {
                questionImageUrl: question.questionImageUrl,
                audioUrl: question.audioUrl,
                videoUrl: question.videoUrl,
                explanationImageUrl: question.explanationImageUrl
            }
        };
    }
    applyTestAttempt(testDefinition, questions, missingQuestionIds) {
        if (!questions.length) {
            this.testLoadWarning = 'No active mapped questions were found for this assessment.';
            return;
        }
        // Randomize questions for every new test attempt.
        const randomizedQuestions = this.shuffleQuestions(questions);
        this.questions = randomizedQuestions.map((question, index) => (Object.assign(Object.assign({}, question), { questionNo: index + 1, marks: question.marks && question.marks > 0 ? question.marks : 1, negativeMarks: question.negativeMarks || 0, estimatedTimeSeconds: question.estimatedTimeSeconds && question.estimatedTimeSeconds > 0 ? question.estimatedTimeSeconds : 60 })));
        this.activeTestDefinition = Object.assign(Object.assign({}, testDefinition), { trainingId: this.startTrainingId || testDefinition.trainingId, testFileType: this.testType });
        this.testName = this.sanitizeDisplayValue(testDefinition.displayName || testDefinition.testName, DEFAULT_TEST_NAME);
        this.totalSeconds = testDefinition.durationMinutes && testDefinition.durationMinutes > 0 ? testDefinition.durationMinutes * 60 : this.totalSeconds;
        this.remainingSeconds = this.totalSeconds;
        this.currentQuestionIndex = 0;
        this.isSubmitted = false;
        this.isAutoSubmitted = false;
        this.isSubmitModalOpen = false;
        this.result = null;
        this.resultSourceLabel = '';
        this.resultSaveWarning = '';
        this.answers = this.createEmptyAnswers();
        this.brokenMedia = {};
        this.testLoadWarning = missingQuestionIds.length ? `${missingQuestionIds.length} mapped question(s) were not found in the question bank.` : '';
        this.startQuestionVisit();
        if (!this.isAdmin)
            this.startTimer();
    }
    shuffleQuestions(questions) {
        const shuffledQuestions = [...questions];
        for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffledQuestions[index], shuffledQuestions[randomIndex]] =
                [shuffledQuestions[randomIndex], shuffledQuestions[index]];
        }
        return shuffledQuestions;
    }
    toggleMultipleOption(optionId) {
        const selectedIds = this.currentAnswer.selectedOptionIds;
        if (selectedIds.includes(optionId)) {
            this.currentAnswer.selectedOptionIds = selectedIds.filter((id) => id !== optionId);
        }
        else {
            this.currentAnswer.selectedOptionIds = [...selectedIds, optionId];
        }
        this.currentAnswer.selectedOptionId = this.currentAnswer.selectedOptionIds[0] || null;
        this.currentAnswer.status = this.currentAnswer.selectedOptionIds.length ? ANSWERED_STATUS : NOT_ANSWERED_STATUS;
    }
    startQuestionVisit() {
        if (this.isSubmitted || this.isSubmitModalOpen) {
            return;
        }
        const now = Date.now();
        const answer = this.currentAnswer;
        if (!answer.firstVisitedAt) {
            answer.firstVisitedAt = now;
        }
        answer.lastVisitedAt = now;
        answer.visitedCount += 1;
        this.currentQuestionStartedAt = now;
    }
    saveCurrentQuestionTime() {
        if (this.currentQuestionStartedAt === null || !this.answers.length) {
            return;
        }
        const elapsedSeconds = Math.floor((Date.now() - this.currentQuestionStartedAt) / 1000);
        if (elapsedSeconds > 0) {
            this.currentAnswer.timeSpentSeconds += elapsedSeconds;
            this.currentAnswer.lastVisitedAt = Date.now();
        }
        this.currentQuestionStartedAt = null;
    }
    startTimer() {
        this.clearTimer();
        this.timerId = setInterval(() => {
            if (this.remainingSeconds <= 1) {
                this.remainingSeconds = 0;
                this.submitTest(true);
                return;
            }
            this.remainingSeconds -= 1;
        }, 1000);
    }
    clearTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    calculateResult() {
        let correct = 0;
        let wrong = 0;
        let manualReviewCount = 0;
        let positiveMarks = 0;
        let manualReviewMarks = 0;
        let negativeMarksDeducted = 0;
        const perQuestionObtainedMarks = [];
        const totalMarks = this.questions.reduce((sum, question) => sum + this.getQuestionMarks(question), 0);
        this.questions.forEach((question, index) => {
            const answer = this.answers[index];
            const marks = this.getQuestionMarks(question);
            const negativeMarks = this.getQuestionNegativeMarks(question);
            let questionObtainedMarks = 0;
            answer.evaluationStatus = this.evaluateAnswer(question, answer);
            if (answer.evaluationStatus === 'correct') {
                correct += 1;
                positiveMarks += marks;
                questionObtainedMarks = marks;
            }
            else if (answer.evaluationStatus === 'wrong') {
                wrong += 1;
                negativeMarksDeducted += negativeMarks;
                questionObtainedMarks = -negativeMarks;
            }
            else if (answer.evaluationStatus === 'manualReview') {
                manualReviewCount += 1;
                manualReviewMarks += marks;
            }
            perQuestionObtainedMarks[index] = questionObtainedMarks;
        });
        const obtainedMarks = Math.max(0, positiveMarks - negativeMarksDeducted);
        const totalTimeUsedSeconds = this.answers.reduce((sum, answer) => sum + answer.timeSpentSeconds, 0);
        const averageTimePerQuestionSeconds = this.answeredCount ? Math.round(totalTimeUsedSeconds / this.answeredCount) : 0;
        const percentage = totalMarks ? Math.round((obtainedMarks / totalMarks) * 100) : 0;
        return {
            totalQuestions: this.questions.length,
            attempted: this.answeredCount,
            skipped: this.skippedCount,
            notAnswered: this.notAnsweredCount,
            correct,
            wrong,
            manualReviewCount,
            totalMarks,
            obtainedMarks,
            manualReviewMarks,
            negativeMarksDeducted,
            percentage,
            passed: percentage >= PASSING_PERCENTAGE,
            totalTimeUsedSeconds,
            averageTimePerQuestionSeconds,
            questionTypeBreakdown: this.buildBreakdown((question) => this.getQuestionTypeLabel(question.questionType), perQuestionObtainedMarks),
            difficultyBreakdown: this.buildBreakdown((question) => question.difficulty, perQuestionObtainedMarks),
            marksBreakdown: this.buildBreakdown((question) => `${this.getQuestionMarks(question)} Mark${this.getQuestionMarks(question) === 1 ? '' : 's'}`, perQuestionObtainedMarks),
            subjectWiseSummary: this.buildBreakdown((question) => question.subject, perQuestionObtainedMarks),
            topicWiseSummary: this.buildBreakdown((question) => question.topic, perQuestionObtainedMarks)
        };
    }
    evaluateAnswer(question, answer) {
        if (answer.status === 'skipped') {
            return 'skipped';
        }
        if (!this.hasAnswer(question, answer)) {
            return 'notAnswered';
        }
        if (question.questionType === 'ESSAY') {
            if (question.expectedAnswer && this.normalizeText(answer.essayAnswer) === this.normalizeText(question.expectedAnswer)) {
                return 'correct';
            }
            return 'manualReview';
        }
        if (question.questionType === 'MCMA') {
            return this.areOptionSetsEqual(answer.selectedOptionIds, question.correctOptionIds || []) ? 'correct' : 'wrong';
        }
        return answer.selectedOptionId === question.correctOptionId ? 'correct' : 'wrong';
    }
    buildBreakdown(getLabel, perQuestionObtainedMarks) {
        const summary = {};
        this.questions.forEach((question, index) => {
            const label = getLabel(question);
            if (!summary[label]) {
                summary[label] = { label, total: 0, correct: 0, marks: 0, obtainedMarks: 0 };
            }
            summary[label].total += 1;
            summary[label].marks = (summary[label].marks || 0) + this.getQuestionMarks(question);
            summary[label].obtainedMarks = Math.max(0, (summary[label].obtainedMarks || 0) + perQuestionObtainedMarks[index]);
            if (this.answers[index].evaluationStatus === 'correct') {
                summary[label].correct = (summary[label].correct || 0) + 1;
            }
        });
        return Object.values(summary);
    }
    hasAnswer(question, answer) {
        if (question.questionType === 'ESSAY') {
            return !!answer.essayAnswer.trim();
        }
        if (question.questionType === 'MCMA') {
            return answer.selectedOptionIds.length > 0;
        }
        return !!answer.selectedOptionId;
    }
    isReviewOptionSelected(question, answer, optionId) {
        return question.questionType === 'MCMA' ? answer.selectedOptionIds.includes(optionId) : answer.selectedOptionId === optionId;
    }
    getCorrectOptionIds(question) {
        if (question.correctOptionIds && question.correctOptionIds.length) {
            return question.correctOptionIds;
        }
        return question.correctOptionId ? [question.correctOptionId] : [];
    }
    getOptionTexts(question, optionIds) {
        const options = question.options || [];
        return options.filter((option) => optionIds.includes(option.id)).map((option) => option.text);
    }
    areOptionSetsEqual(selectedOptionIds, correctOptionIds) {
        if (selectedOptionIds.length !== correctOptionIds.length) {
            return false;
        }
        return correctOptionIds.every((optionId) => selectedOptionIds.includes(optionId));
    }
    normalizeText(value) {
        return value.trim().replace(/\s+/g, ' ').toLowerCase();
    }
    createEmptyAnswers() {
        return this.questions.map((question) => ({
            questionId: question.id,
            selectedOptionId: null,
            selectedOptionIds: [],
            essayAnswer: '',
            status: NOT_ANSWERED_STATUS,
            evaluationStatus: NOT_ANSWERED_STATUS,
            timeSpentSeconds: 0,
            firstVisitedAt: null,
            lastVisitedAt: null,
            visitedCount: 0
        }));
    }
    padTime(value) {
        return value < 10 ? `0${value}` : `${value}`;
    }
}
TestComponent.ɵfac = function TestComponent_Factory(t) { return new (t || TestComponent)(i0.ɵɵdirectiveInject(i1.TestStorageService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i4.HttpClient), i0.ɵɵdirectiveInject(i5.DataService), i0.ɵɵdirectiveInject(i6.TrainingManagementService)); };
TestComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TestComponent, selectors: [["app-test"]], hostBindings: function TestComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function TestComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
    } }, decls: 60, vars: 12, consts: [[1, "test-page"], [1, "container"], [1, "test-header"], [1, "why-eyebrow-nb"], [1, "ey-line"], [1, "hero-title"], ["class", "test-timer", 3, "test-timer--ending", 4, "ngIf"], ["class", "test-load-state", "role", "alert", "aria-live", "assertive", 4, "ngIf"], ["class", "direct-test-entry", 4, "ngIf"], ["class", "test-load-state", 4, "ngIf"], [4, "ngIf"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "submitTestTitle", 1, "custom-modal"], [1, "custom-modal__overlay", 3, "click"], [1, "custom-modal__box", "custom-modal__box--submit"], ["type", "button", "aria-label", "Close submit confirmation", 1, "custom-modal__close", 3, "click"], [1, "custom-modal__header"], ["id", "submitTestTitle"], [1, "submit-summary"], [1, "custom-modal__actions"], ["type", "button", 1, "btn-close", 3, "click"], ["type", "button", 1, "btn-send", 3, "click"], [1, "test-timer"], [1, "fa-regular", "fa-clock"], ["role", "alert", "aria-live", "assertive", 1, "test-load-state"], [1, "test-kicker"], ["type", "button", 1, "test-btn", "test-btn--primary", 3, "click"], [1, "direct-test-entry"], [1, "direct-test-form"], [1, "direct-training-field"], [1, "direct-training-search"], ["type", "button", 1, "direct-training-toggle", 3, "disabled", "click"], ["aria-hidden", "true"], ["class", "direct-training-menu", 4, "ngIf"], ["type", "email", "placeholder", "Enter your email", 3, "ngModel", "disabled", "ngModelChange"], [3, "ngModel", "disabled", "ngModelChange"], ["value", "pre"], ["value", "post"], ["value", "assessment"], ["class", "direct-test-message", 4, "ngIf"], ["type", "button", 1, "test-btn", "test-btn--primary", 3, "disabled", "click"], [1, "direct-training-menu"], ["type", "text", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelChange"], ["type", "button", "class", "direct-training-option", 3, "click", 4, "ngFor", "ngForOf"], ["class", "direct-training-empty", 4, "ngIf"], ["type", "button", 1, "direct-training-option", 3, "click"], [1, "direct-training-empty"], [1, "direct-test-message"], [1, "test-load-state"], [1, "test-layout"], [1, "test-panel"], [1, "question-top"], [1, "question-heading"], ["type", "button", 1, "test-btn", "test-btn--submit", "question-submit", 3, "click"], [1, "fa-solid", "fa-check"], [1, "question-meta"], [1, "difficulty-badge", 3, "ngClass"], ["class", "question-media", 4, "ngIf"], ["class", "option-list", 4, "ngIf"], ["class", "essay-answer", 4, "ngIf"], [1, "test-actions"], ["type", "button", 1, "test-btn", "test-btn--light", 3, "disabled", "click"], [1, "fa-solid", "fa-eraser"], ["type", "button", 1, "test-btn", "test-btn--warning", 3, "click"], [1, "fa-solid", "fa-forward"], [1, "fa-solid", "fa-arrow-left"], [1, "fa-solid", "fa-arrow-right"], [1, "test-summary"], [1, "summary-counts"], [1, "question-map"], ["type", "button", 3, "is-current", "is-answered", "is-skipped", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "summary-legend"], [1, "legend-dot", "legend-dot--answered"], [1, "legend-dot", "legend-dot--pending"], [1, "legend-dot", "legend-dot--skipped"], [1, "legend-dot", "legend-dot--current"], [1, "question-media"], [3, "src", "alt", "error", 4, "ngIf"], ["controls", "", "preload", "none", "aria-label", "Question audio", 3, "error", 4, "ngIf"], ["controls", "", "preload", "metadata", "playsinline", "", "aria-label", "Question video", 3, "error", 4, "ngIf"], ["class", "media-fallback", 4, "ngIf"], [3, "src", "alt", "error"], ["controls", "", "preload", "none", "aria-label", "Question audio", 3, "error"], ["type", "audio/wav", 3, "src"], ["controls", "", "preload", "metadata", "playsinline", "", "aria-label", "Question video", 3, "error"], ["type", "video/mp4", 3, "src"], [1, "media-fallback"], [1, "fa-solid", "fa-volume-high"], [1, "option-list"], ["type", "button", "class", "test-option", 3, "test-option--selected", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "test-option", 3, "click"], [1, "option-marker"], ["aria-hidden", "true", 1, "option-control"], [1, "option-content"], ["class", "option-image", 3, "src", "alt", "error", 4, "ngIf"], [1, "option-image", 3, "src", "alt", "error"], [1, "essay-answer"], ["for", "essayAnswer"], ["id", "essayAnswer", "rows", "7", "placeholder", "Type your answer here", 3, "ngModel", "ngModelChange"], ["type", "button", 3, "click"]], template: function TestComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "div", 3);
        i0.ɵɵelement(5, "span", 4);
        i0.ɵɵtext(6, " Assessment ");
        i0.ɵɵelement(7, "span", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "h1", 5);
        i0.ɵɵtext(9, "Online Assessment ");
        i0.ɵɵelementStart(10, "em");
        i0.ɵɵtext(11, "Engine");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(12, "p");
        i0.ɵɵtext(13, "Answer mixed question types, review your progress, and submit when ready.");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(14, TestComponent_div_14_Template, 4, 3, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, TestComponent_section_15_Template, 9, 1, "section", 7);
        i0.ɵɵtemplate(16, TestComponent_section_16_Template, 35, 11, "section", 8);
        i0.ɵɵtemplate(17, TestComponent_section_17_Template, 9, 4, "section", 9);
        i0.ɵɵtemplate(18, TestComponent_ng_container_18_Template, 75, 20, "ng-container", 10);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(19, "div", 11)(20, "div", 12);
        i0.ɵɵlistener("click", function TestComponent_Template_div_click_20_listener() { return ctx.closeSubmitModal(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "div", 13)(22, "button", 14);
        i0.ɵɵlistener("click", function TestComponent_Template_button_click_22_listener() { return ctx.closeSubmitModal(); });
        i0.ɵɵtext(23, "\u00D7");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 15)(25, "h2", 16);
        i0.ɵɵtext(26, "Submit Test?");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "p");
        i0.ɵɵtext(28, "Are you sure you want to submit your test? Once submitted, you cannot change your answers.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(29, "div", 17)(30, "div")(31, "span");
        i0.ɵɵtext(32, "Total Questions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(33, "strong");
        i0.ɵɵtext(34);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(35, "div")(36, "span");
        i0.ɵɵtext(37, "Answered");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "strong");
        i0.ɵɵtext(39);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(40, "div")(41, "span");
        i0.ɵɵtext(42, "Skipped");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "strong");
        i0.ɵɵtext(44);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(45, "div")(46, "span");
        i0.ɵɵtext(47, "Not Answered");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(48, "strong");
        i0.ɵɵtext(49);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(50, "div")(51, "span");
        i0.ɵɵtext(52, "Time Remaining");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "strong");
        i0.ɵɵtext(54);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(55, "div", 18)(56, "button", 19);
        i0.ɵɵlistener("click", function TestComponent_Template_button_click_56_listener() { return ctx.closeSubmitModal(); });
        i0.ɵɵtext(57, "Cancel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "button", 20);
        i0.ɵɵlistener("click", function TestComponent_Template_button_click_58_listener() { return ctx.submitFromModal(); });
        i0.ɵɵtext(59, "Submit Test");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("ngIf", !ctx.isAdmin);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.submissionMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isDirectEntry);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isDirectEntry && !ctx.isAdmin && !ctx.isSubmitted && (ctx.isLoadingTest || ctx.testLoadWarning || !ctx.questions.length));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isDirectEntry && !ctx.isAdmin && !ctx.isSubmitted && !ctx.isLoadingTest && ctx.questions.length);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("active", ctx.isSubmitModalOpen);
        i0.ɵɵadvance(15);
        i0.ɵɵtextInterpolate(ctx.questions.length);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.answeredCount);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.skippedCount);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.notAnsweredCount);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.timerText);
    } }, dependencies: [i7.NgClass, i7.NgForOf, i7.NgIf, i8.NgSelectOption, i8.ɵNgSelectMultipleOption, i8.DefaultValueAccessor, i8.SelectControlValueAccessor, i8.NgControlStatus, i8.NgModel], styles: [".test-page[_ngcontent-%COMP%] {\n  background: linear-gradient(160deg, #f8fbff 0%, #ebf2fd 52%, #ffffff 100%);\n  color: var(--text-dark, #000b1d);\n  min-height: 100vh;\n  padding: 110px 0 70px;\n}\n\n.test-header[_ngcontent-%COMP%], .test-layout[_ngcontent-%COMP%], .result-head[_ngcontent-%COMP%], .review-head[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  justify-content: space-between;\n}\n\n.test-header[_ngcontent-%COMP%] {\n  align-items: flex-end;\n  margin-bottom: 28px;\n}\n\n.test-kicker[_ngcontent-%COMP%] {\n  color: var(--primary, #2f7ce8);\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 700;\n  letter-spacing: 0;\n  margin-bottom: 8px;\n  text-transform: uppercase;\n}\n\n.test-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .result-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 38px;\n  font-weight: 800;\n  line-height: 1.15;\n  margin: 0 0 10px;\n}\n\n.test-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .result-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 16px;\n  margin: 0;\n}\n\n.test-timer[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  box-shadow: 0 18px 38px rgba(47, 124, 232, 0.12);\n  color: var(--primary, #2f7ce8);\n  display: flex;\n  flex: 0 0 auto;\n  font-size: 22px;\n  font-weight: 800;\n  gap: 10px;\n  padding: 14px 18px;\n}\n\n.test-timer--ending[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.test-layout[_ngcontent-%COMP%] {\n  align-items: flex-start;\n}\n\n.test-panel[_ngcontent-%COMP%], .test-summary[_ngcontent-%COMP%], .result-panel[_ngcontent-%COMP%], .review-item[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.08);\n}\n\n.test-panel[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  padding: 30px;\n}\n\n.question-top[_ngcontent-%COMP%] {\n  align-items: center;\n  border-bottom: 1px solid #edf2f8;\n  color: #64748b;\n  display: flex;\n  font-size: 14px;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n}\n\n.question-top[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--primary, #2f7ce8);\n}\n\n.test-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 16px;\n  font-weight: 750;\n  line-height: 1.35;\n  margin: 20px 0;\n}\n\n.question-type[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 10px 0 22px;\n}\n\n.option-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.test-option[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 1.5px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  display: flex;\n  gap: 14px;\n  min-height: 58px;\n  padding: 12px 14px;\n  text-align: left;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;\n  width: 100%;\n}\n\nbutton.test-option[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\nbutton.test-option[_ngcontent-%COMP%]:hover, .test-option--selected[_ngcontent-%COMP%] {\n  border-color: var(--primary, #2f7ce8);\n  box-shadow: 0 10px 24px rgba(47, 124, 232, 0.12);\n}\n\n.test-option--selected[_ngcontent-%COMP%] {\n  background: #f2f7ff;\n}\n\n.option-marker[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ebf2fd;\n  border-radius: 50%;\n  color: var(--primary, #2f7ce8);\n  display: inline-flex;\n  flex: 0 0 34px;\n  font-weight: 800;\n  height: 34px;\n  justify-content: center;\n  width: 34px;\n}\n\n.option-control[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 2px solid #b8c7dc;\n  display: inline-flex;\n  flex: 0 0 22px;\n  height: 22px;\n  justify-content: center;\n  transition: background 0.2s ease, border-color 0.2s ease;\n  width: 22px;\n}\n\n.option-control--radio[_ngcontent-%COMP%] {\n  border-radius: 50%;\n}\n\n.option-control--checkbox[_ngcontent-%COMP%] {\n  border-radius: 6px;\n}\n\n.option-control--checked[_ngcontent-%COMP%] {\n  background: var(--primary, #2f7ce8);\n  border-color: var(--primary, #2f7ce8);\n}\n\n.option-control--radio.option-control--checked[_ngcontent-%COMP%]::after {\n  background: #ffffff;\n  border-radius: 50%;\n  content: \"\";\n  height: 8px;\n  width: 8px;\n}\n\n.option-control--checkbox.option-control--checked[_ngcontent-%COMP%]::after {\n  border-bottom: 2px solid #ffffff;\n  border-left: 2px solid #ffffff;\n  content: \"\";\n  height: 6px;\n  margin-top: -2px;\n  transform: rotate(-45deg);\n  width: 10px;\n}\n\n.test-option--correct[_ngcontent-%COMP%]   .option-control--checked[_ngcontent-%COMP%], .test-option--correct-answer[_ngcontent-%COMP%]   .option-control--checked[_ngcontent-%COMP%] {\n  background: #22c55e;\n  border-color: #22c55e;\n}\n\n.test-option--wrong[_ngcontent-%COMP%]   .option-control--checked[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border-color: #ef4444;\n}\n\n.test-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 28px;\n}\n\n.test-btn[_ngcontent-%COMP%] {\n  align-items: center;\n  border: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  font-weight: 700;\n  gap: 9px;\n  justify-content: center;\n  min-height: 44px;\n  padding: 11px 18px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;\n}\n\n.test-btn[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n\n.test-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);\n  transform: translateY(-1px);\n}\n\n.test-btn--primary[_ngcontent-%COMP%], .test-btn--submit[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--primary, #2f7ce8), var(--secondary, #5992e8));\n  color: #ffffff;\n}\n\n.test-btn--submit[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n\n.test-btn--light[_ngcontent-%COMP%] {\n  background: #e8edf5;\n  color: #253044;\n}\n\n.test-btn--warning[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #b45309;\n}\n\n.test-summary[_ngcontent-%COMP%] {\n  flex: 0 0 310px;\n  padding: 24px;\n  position: sticky;\n  top: 95px;\n}\n\n.test-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .review-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 20px;\n  margin: 0 0 18px;\n}\n\n.summary-counts[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n  grid-template-columns: repeat(3, 1fr);\n  margin-bottom: 22px;\n}\n\n.summary-counts[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #edf2f8;\n  border-radius: 8px;\n  padding: 12px 8px;\n  text-align: center;\n}\n\n.summary-counts[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #071126;\n  display: block;\n  font-size: 22px;\n}\n\n.summary-counts[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  display: block;\n  font-size: 12px;\n  margin-top: 3px;\n}\n\n.question-map[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.question-map[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #eef2f7;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  color: #334155;\n  cursor: pointer;\n  font-weight: 800;\n  height: 42px;\n}\n\n.question-map[_ngcontent-%COMP%]   button.is-current[_ngcontent-%COMP%] {\n  background: var(--primary, #2f7ce8);\n  border-color: var(--primary, #2f7ce8);\n  color: #ffffff;\n}\n\n.question-map[_ngcontent-%COMP%]   button.is-answered[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  border-color: #86efac;\n  color: #166534;\n}\n\n.question-map[_ngcontent-%COMP%]   button.is-skipped[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  border-color: #fed7aa;\n  color: #9a3412;\n}\n\n.question-map[_ngcontent-%COMP%]   button.is-current.is-answered[_ngcontent-%COMP%], .question-map[_ngcontent-%COMP%]   button.is-current.is-skipped[_ngcontent-%COMP%] {\n  background: var(--primary, #2f7ce8);\n  border-color: var(--primary, #2f7ce8);\n  color: #ffffff;\n}\n\n.summary-legend[_ngcontent-%COMP%] {\n  color: #64748b;\n  display: grid;\n  gap: 10px;\n  margin-top: 22px;\n}\n\n.summary-legend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 8px;\n}\n\n.legend-dot[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  display: inline-flex;\n  height: 10px;\n  width: 10px;\n}\n\n.legend-dot--answered[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n\n.legend-dot--pending[_ngcontent-%COMP%] {\n  background: #94a3b8;\n}\n\n.legend-dot--skipped[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n\n.legend-dot--current[_ngcontent-%COMP%] {\n  background: var(--primary, #2f7ce8);\n}\n\n.result-panel[_ngcontent-%COMP%] {\n  padding: 30px;\n}\n\n.result-head[_ngcontent-%COMP%] {\n  align-items: center;\n  border-bottom: 1px solid #edf2f8;\n  margin-bottom: 24px;\n  padding-bottom: 22px;\n}\n\n.result-score[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #dcfce7;\n  border: 1px solid #86efac;\n  border-radius: 50%;\n  color: #166534;\n  display: flex;\n  flex: 0 0 112px;\n  font-size: 30px;\n  font-weight: 850;\n  height: 112px;\n  justify-content: center;\n  width: 112px;\n}\n\n.result-score--fail[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  border-color: #fecaca;\n  color: #b91c1c;\n}\n\n.result-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  grid-template-columns: repeat(6, 1fr);\n  margin-bottom: 30px;\n}\n\n.result-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #edf2f8;\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.result-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  display: block;\n  font-size: 13px;\n  margin-bottom: 8px;\n}\n\n.result-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 24px;\n}\n\n.review-head[_ngcontent-%COMP%] {\n  align-items: center;\n  margin-bottom: 16px;\n}\n\n.review-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n}\n\n.review-item[_ngcontent-%COMP%] {\n  box-shadow: none;\n  padding: 22px;\n}\n\n.review-question[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--primary, #2f7ce8);\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 800;\n  margin-bottom: 8px;\n}\n\n.review-question[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 20px;\n  line-height: 1.35;\n  margin: 0 0 16px;\n}\n\n.option-list--review[_ngcontent-%COMP%] {\n  gap: 10px;\n}\n\n.test-option--correct[_ngcontent-%COMP%], .test-option--correct-answer[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  border-color: #22c55e;\n  color: #166534;\n}\n\n.test-option--wrong[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-color: #ef4444;\n  color: #991b1b;\n}\n\n.answer-note[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-left: 4px solid var(--primary, #2f7ce8);\n  border-radius: 8px;\n  color: #475569;\n  margin-top: 16px;\n  padding: 14px 16px;\n}\n\n.answer-note--skipped[_ngcontent-%COMP%] {\n  border-left-color: #f59e0b;\n}\n\n.answer-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n\n.answer-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n@media (max-width: 991px) {\n  .test-page[_ngcontent-%COMP%] {\n    padding: 95px 0 50px;\n  }\n\n  .test-header[_ngcontent-%COMP%], .test-layout[_ngcontent-%COMP%], .result-head[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .test-timer[_ngcontent-%COMP%], .test-summary[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .test-summary[_ngcontent-%COMP%] {\n    flex-basis: auto;\n    position: static;\n  }\n\n  .result-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n\n@media (max-width: 575px) {\n  .test-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .result-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n\n  .test-panel[_ngcontent-%COMP%], .test-summary[_ngcontent-%COMP%], .result-panel[_ngcontent-%COMP%], .review-item[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n\n  .test-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n\n  .test-actions[_ngcontent-%COMP%], .review-head[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .test-btn[_ngcontent-%COMP%], .test-btn--submit[_ngcontent-%COMP%] {\n    margin-left: 0;\n    width: 100%;\n  }\n\n  .summary-counts[_ngcontent-%COMP%], .result-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .result-score[_ngcontent-%COMP%] {\n    flex-basis: 96px;\n    height: 96px;\n    width: 96px;\n  }\n}\n\n.question-media[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  display: grid;\n  gap: 14px;\n  margin: 18px 0 24px;\n  padding: 14px;\n}\n\n.question-media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .explanation-image[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  display: block;\n  height: auto;\n  max-height: 360px;\n  max-width: 100%;\n  object-fit: contain;\n  width: 100%;\n}\n\n.question-media[_ngcontent-%COMP%]   audio[_ngcontent-%COMP%], .question-media[_ngcontent-%COMP%]   video[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n\n.question-media[_ngcontent-%COMP%]   video[_ngcontent-%COMP%] {\n  background: #0f172a;\n  border-radius: 8px;\n  max-height: 420px;\n}\n\n.question-media--review[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.option-content[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  flex: 1 1 auto;\n  gap: 14px;\n  min-width: 0;\n}\n\n.option-image[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  flex: 0 0 96px;\n  height: 72px;\n  object-fit: cover;\n  width: 96px;\n}\n\n.explanation-image[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  margin-top: 12px;\n}\n\n@media (max-width: 575px) {\n  .option-content[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .option-image[_ngcontent-%COMP%] {\n    flex-basis: auto;\n    height: auto;\n    max-height: 180px;\n    width: 100%;\n  }\n}\n\n.media-fallback[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 1px dashed #b8c7dc;\n  border-radius: 8px;\n  color: #64748b;\n  display: flex;\n  gap: 10px;\n  min-height: 88px;\n  padding: 18px;\n}\n\n.media-fallback[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--primary, #2f7ce8);\n  font-size: 22px;\n}\n\n.auto-submit-note[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  border-left: 4px solid #f59e0b;\n  border-radius: 8px;\n  color: #9a3412 !important;\n  font-weight: 700;\n  margin-top: 12px !important;\n  padding: 10px 12px;\n}\n\n.review-time[_ngcontent-%COMP%] {\n  align-items: center;\n  color: #64748b;\n  display: inline-flex;\n  font-size: 14px;\n  gap: 7px;\n  margin: -6px 0 16px;\n}\n\n.custom-modal[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  inset: 0;\n  justify-content: center;\n  opacity: 0;\n  position: fixed;\n  transition: opacity 0.35s ease, visibility 0.35s ease;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n.custom-modal.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n\n.custom-modal__overlay[_ngcontent-%COMP%] {\n  background: rgba(11, 29, 57, 0.65);\n  backdrop-filter: blur(5px);\n  inset: 0;\n  position: absolute;\n}\n\n.custom-modal__box[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 16px;\n  box-shadow: 0 24px 64px rgba(11, 29, 57, 0.18);\n  max-width: 520px;\n  padding: 36px 30px;\n  position: relative;\n  width: 90%;\n  z-index: 2;\n}\n\n.custom-modal__box--submit[_ngcontent-%COMP%] {\n  max-width: 560px;\n}\n\n.custom-modal__close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #667085;\n  cursor: pointer;\n  font-size: 28px;\n  line-height: 1;\n  position: absolute;\n  right: 20px;\n  top: 20px;\n}\n\n.custom-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 24px;\n  font-weight: 700;\n  margin: 0 36px 10px 0;\n}\n\n.custom-modal__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  line-height: 1.6;\n  margin: 0 0 22px;\n}\n\n.submit-summary[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin-bottom: 24px;\n}\n\n.submit-summary[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #edf2f8;\n  border-radius: 8px;\n  padding: 14px;\n}\n\n.submit-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  display: block;\n  font-size: 13px;\n  margin-bottom: 6px;\n}\n\n.submit-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 20px;\n}\n\n.custom-modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n\n.btn-close[_ngcontent-%COMP%], .btn-send[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 700;\n  padding: 12px 24px;\n}\n\n.btn-close[_ngcontent-%COMP%] {\n  background: #e5e7eb;\n  color: #374151;\n}\n\n.btn-send[_ngcontent-%COMP%] {\n  background: #2f7cf0;\n  color: #ffffff;\n}\n\n@media (max-width: 575px) {\n  .submit-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .custom-modal__actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .btn-close[_ngcontent-%COMP%], .btn-send[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.question-heading[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n\n.question-submit[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: 16px;\n}\n\n.test-actions[_ngcontent-%COMP%] {\n  align-items: stretch;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.test-actions[_ngcontent-%COMP%]   .test-btn[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n@media (max-width: 1199px) {\n  .test-layout[_ngcontent-%COMP%] {\n    gap: 18px;\n  }\n\n  .test-summary[_ngcontent-%COMP%] {\n    flex-basis: 280px;\n  }\n\n  .result-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 767px) {\n  .question-top[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 14px;\n  }\n\n  .question-submit[_ngcontent-%COMP%] {\n    margin-left: 0;\n    width: 100%;\n  }\n\n  .test-actions[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .question-map[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(5, minmax(42px, 1fr));\n    overflow-x: auto;\n    padding-bottom: 4px;\n  }\n\n  .summary-counts[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 420px) {\n  .test-actions[_ngcontent-%COMP%], .summary-counts[_ngcontent-%COMP%], .result-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .question-map[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(5, 42px);\n  }\n}\n\n.question-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 0 0 18px;\n}\n\n.question-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  border: 1px solid #e2e8f0;\n  border-radius: 999px;\n  color: #475569;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 7px 11px;\n}\n\n.question-meta--review[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n\n.difficulty-badge.difficulty--easy[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  border-color: #bbf7d0;\n  color: #166534;\n}\n\n.difficulty-badge.difficulty--medium[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  border-color: #bfdbfe;\n  color: #1d4ed8;\n}\n\n.difficulty-badge.difficulty--hard[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-color: #fecaca;\n  color: #991b1b;\n}\n\n.essay-answer[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  margin-top: 18px;\n}\n\n.essay-answer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #071126;\n  font-weight: 800;\n}\n\n.essay-answer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1.5px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  font: inherit;\n  line-height: 1.6;\n  min-height: 170px;\n  outline: none;\n  padding: 14px 16px;\n  resize: vertical;\n  width: 100%;\n}\n\n.essay-answer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary, #2f7ce8);\n  box-shadow: 0 0 0 4px rgba(47, 124, 232, 0.12);\n}\n\n.essay-answer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n}\n\n.manual-note[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-left: 4px solid #64748b;\n  border-radius: 8px;\n  color: #475569 !important;\n  font-weight: 700;\n  margin-top: 10px !important;\n  padding: 10px 12px;\n}\n\n.breakdown-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin: 0 0 30px;\n}\n\n.breakdown-box[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  padding: 18px;\n}\n\n.breakdown-box--wide[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.breakdown-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 17px;\n  margin: 0 0 12px;\n}\n\n.breakdown-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0 0 8px;\n}\n\n.evaluation-badge[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  display: inline-flex;\n  font-size: 13px;\n  font-weight: 800;\n  margin: 0 0 14px;\n  padding: 7px 12px;\n}\n\n.evaluation--correct[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  color: #166534;\n}\n\n.evaluation--wrong[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #991b1b;\n}\n\n.evaluation--skipped[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #9a3412;\n}\n\n.evaluation--manualReview[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #475569;\n}\n\n.evaluation--notAnswered[_ngcontent-%COMP%] {\n  background: #eef2f7;\n  color: #64748b;\n}\n\n@media (max-width: 991px) {\n  .breakdown-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .result-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 575px) {\n  .question-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    border-radius: 8px;\n    width: 100%;\n  }\n\n  .result-grid[_ngcontent-%COMP%], .breakdown-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n.saved-result-panel[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.07);\n  display: flex;\n  gap: 18px;\n  justify-content: space-between;\n  margin-bottom: 22px;\n  padding: 18px;\n  position: relative;\n  overflow: visible;\n  z-index: 30;\n}\n\n.saved-result-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #071126;\n  font-size: 20px;\n  margin: 0;\n}\n\n.saved-result-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 auto;\n  flex-wrap: wrap;\n  gap: 10px;\n  justify-content: flex-end;\n}\n\n.saved-result-form[_ngcontent-%COMP%]   .test-selection-row[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.test-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.saved-result-form[_ngcontent-%COMP%]   .result-dropdown[_ngcontent-%COMP%] {\n  z-index: 1001;\n}\n\n.dropdown-toggle[_ngcontent-%COMP%] {\n  align-items: center;\n  display: inline-flex;\n  justify-content: space-between;\n  min-width: 220px;\n  padding: .75rem 1rem;\n  border: 1px solid var(--gray-light-mid, #dbe6f6);\n  border-radius: var(--radius-sm, 8px);\n  background: var(--bg-light, #f8fbff);\n  color: var(--text-dark, #1f2937);\n  cursor: pointer;\n}\n\n.dropdown-icon[_ngcontent-%COMP%] {\n  margin-left: .5rem;\n}\n\n.dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + .5rem);\n  left: 0;\n  z-index: 1000;\n  display: grid;\n  width: min(100%, 320px);\n  max-height: 280px;\n  border: 1px solid var(--gray-light-mid, #dbe6f6);\n  border-radius: var(--radius-sm, 8px);\n  background: var(--bg-white, #ffffff);\n  box-shadow: 0 18px 45px rgba(0, 0, 0, .08);\n  overflow-y: auto;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  border: none;\n  background: transparent;\n  padding: 0.85rem 1rem;\n  color: var(--text-dark, #1f2937);\n  font: inherit;\n  cursor: pointer;\n}\n\n.dropdown-item[_ngcontent-%COMP%]:hover, .dropdown-item.highlighted[_ngcontent-%COMP%], .dropdown-item[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background: var(--bg-light, #f8fbff);\n}\n\n.dropdown-item--empty[_ngcontent-%COMP%], .dropdown-item--empty[_ngcontent-%COMP%]:hover, .dropdown-item--empty[_ngcontent-%COMP%]:focus {\n  color: #64748b;\n  cursor: not-allowed;\n}\n\n.saved-result-message[_ngcontent-%COMP%] {\n  color: #b45309;\n  font-weight: 700;\n  margin: 0;\n}\n\n.result-visuals[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 14px;\n  justify-content: flex-end;\n}\n\n.result-circle[_ngcontent-%COMP%] {\n  --value: 0;\n  align-items: center;\n  background: conic-gradient(#22c55e calc(var(--value) * 1%), #e5edf8 0);\n  border-radius: 50%;\n  color: #166534;\n  display: flex;\n  flex: 0 0 118px;\n  height: 118px;\n  justify-content: center;\n  position: relative;\n  width: 118px;\n}\n\n.result-circle[_ngcontent-%COMP%]::before {\n  background: #ffffff;\n  border-radius: 50%;\n  content: \"\";\n  inset: 10px;\n  position: absolute;\n}\n\n.result-circle[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .result-circle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.result-circle[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 20px;\n  text-align: center;\n}\n\n.result-circle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 11px;\n  font-weight: 800;\n  position: absolute;\n  top: 72px;\n}\n\n.result-circle--fail[_ngcontent-%COMP%] {\n  background: conic-gradient(#ef4444 calc(var(--value) * 1%), #e5edf8 0);\n  color: #b91c1c;\n}\n\n.result-circle--marks[_ngcontent-%COMP%] {\n  background: conic-gradient(var(--primary, #2f7ce8) calc(var(--value) * 1%), #e5edf8 0);\n  color: var(--primary, #2f7ce8);\n}\n\n@media (max-width: 767px) {\n  .saved-result-panel[_ngcontent-%COMP%], .result-visuals[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .saved-result-form[_ngcontent-%COMP%], .saved-result-form[_ngcontent-%COMP%]   .test-selection-row[_ngcontent-%COMP%], .saved-result-form[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%], .saved-result-form[_ngcontent-%COMP%]   .test-btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .saved-result-form[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .result-circle[_ngcontent-%COMP%] {\n    align-self: center;\n  }\n}\n\n.test-load-state[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid rgba(18, 35, 64, 0.1);\n  border-radius: 8px;\n  box-shadow: 0 10px 30px rgba(18, 35, 64, 0.08);\n  margin-bottom: 24px;\n  padding: 24px;\n}\n\n.direct-test-entry[_ngcontent-%COMP%] { \n  margin: 0 auto;\n  padding: 32px;\n  border: 1px solid #e2e8f0;\n  border-radius: 18px;\n  background: #fff;\n  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);\n  overflow: visible;\n  position: relative;\n  z-index: 5;\n}\n\n.direct-test-entry[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\n\n.direct-test-entry[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n\n.direct-test-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 6fr 3fr 3fr;\n  gap: 18px;\n  margin: 24px 0;\n  overflow: visible;\n}\n\n.direct-test-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  color: #334155;\n  font-weight: 600;\n}\n\n.direct-test-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .direct-test-form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 46px;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 9px;\n  background: #fff;\n  color: #0f172a;\n  font: inherit;\n}\n\n.direct-training-search[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 50;\n}\n\n.direct-training-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 46px;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 9px;\n  background: #fff;\n  color: #0f172a;\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n.direct-training-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 6px);\n  left: 0;\n  right: 0;\n  max-height: 300px;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  background: #fff;\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);\n}\n\n.direct-training-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n}\n\n.direct-training-option[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 11px 12px;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: #334155;\n  font-size: 14px;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n}\n\n.direct-training-option[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n\n.direct-training-empty[_ngcontent-%COMP%] {\n  padding: 12px 10px;\n  color: #64748b;\n  font-weight: 400;\n}\n\n.direct-test-message[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  color: #b91c1c !important;\n}\n\n@media (max-width: 760px) {\n  .direct-test-form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.test-load-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #13233f;\n  font-size: 24px;\n  margin: 8px 0;\n}\n\n.test-load-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #5b667a;\n  margin-bottom: 16px;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestComponent, [{
        type: Component,
        args: [{ selector: 'app-test', template: "<section class=\"test-page\">\n  <div class=\"container\">\n    <div class=\"test-header\">\n      <div>\n        <div class=\"why-eyebrow-nb\">\n          <span class=\"ey-line\"></span>\n          Assessment\n          <span class=\"ey-line\"></span>\n        </div>\n        <h1 class=\"hero-title\">Online Assessment <em>Engine</em></h1>\n        <p>Answer mixed question types, review your progress, and submit when ready.</p>\n      </div>\n\n      <div class=\"test-timer\" *ngIf=\"!isAdmin\" [class.test-timer--ending]=\"remainingSeconds <= 60 && !isSubmitted\">\n        <i class=\"fa-regular fa-clock\"></i>\n        <span>{{ isSubmitted ? 'Submitted' : timerText }}</span>\n      </div>\n    </div>\n\n    <section class=\"test-load-state\" *ngIf=\"submissionMessage\" role=\"alert\" aria-live=\"assertive\">\n      <span class=\"test-kicker\">Submission Notice</span>\n      <h2>Test Already Submitted</h2>\n      <p>{{ submissionMessage }}</p>\n      <button type=\"button\" class=\"test-btn test-btn--primary\" (click)=\"returnToTraining()\">Return to Training</button>\n    </section>\n\n    <section class=\"direct-test-entry\" *ngIf=\"isDirectEntry\">\n      <span class=\"test-kicker\">Start Test</span>\n      <h2>Select Your Test</h2>\n      <p>Choose a training, enter your email, and select the test type.</p>\n\n      <div class=\"direct-test-form\">\n        <label class=\"direct-training-field\">\n          <span>Training</span>\n          <div class=\"direct-training-search\">\n            <button\n              type=\"button\"\n              class=\"direct-training-toggle\"\n              (click)=\"toggleDirectTrainingDropdown()\"\n              [disabled]=\"directEntryLoading\"\n              [attr.aria-expanded]=\"isTrainingDropdownOpen\"\n            >\n              <span>{{ getSelectedDirectTrainingLabel() }}</span>\n              <span aria-hidden=\"true\">&#9662;</span>\n            </button>\n\n            <div class=\"direct-training-menu\" *ngIf=\"isTrainingDropdownOpen\">\n              <input\n                type=\"text\"\n                [(ngModel)]=\"trainingSearch\"\n                placeholder=\"Search training\"\n                autocomplete=\"off\"\n              />\n              <button\n                type=\"button\"\n                class=\"direct-training-option\"\n                *ngFor=\"let training of filteredDirectTrainings\"\n                (click)=\"selectDirectTraining(training)\"\n              >\n                {{ getDirectTrainingLabel(training) }}\n              </button>\n              <div class=\"direct-training-empty\" *ngIf=\"!filteredDirectTrainings.length\">No training found</div>\n            </div>\n          </div>\n        </label>\n\n        <label>\n          <span>Email Address</span>\n          <input\n            type=\"email\"\n            [(ngModel)]=\"directEmail\"\n            placeholder=\"Enter your email\"\n            [disabled]=\"directEntryLoading\"\n          />\n        </label>\n\n        <label>\n          <span>Test Type</span>\n          <select [(ngModel)]=\"testType\" [disabled]=\"directEntryLoading\">\n            <option value=\"pre\">Pre Test</option>\n            <option value=\"post\">Post Test</option>\n            <option value=\"assessment\">Assessment</option>\n          </select>\n        </label>\n      </div>\n\n      <p class=\"direct-test-message\" *ngIf=\"directEntryMessage\">{{ directEntryMessage }}</p>\n      <button type=\"button\" class=\"test-btn test-btn--primary\" (click)=\"startDirectTest()\" [disabled]=\"directEntryLoading\">\n        {{ directEntryLoading ? 'Please wait...' : 'Load Test' }}\n      </button>\n    </section>\n\n\n    <section class=\"test-load-state\" *ngIf=\"!isDirectEntry && !isAdmin && !isSubmitted && (isLoadingTest || testLoadWarning || !questions.length)\">\n      <span class=\"test-kicker\">Assessment Loader</span>\n      <h2>{{ isLoadingTest ? 'Loading Assessment' : 'Assessment Not Ready' }}</h2>\n      <p *ngIf=\"isLoadingTest\">Loading encrypted assessment and question bank...</p>\n      <p *ngIf=\"!isLoadingTest && testLoadWarning\">{{ testLoadWarning }}</p>\n      <button type=\"button\" class=\"test-btn test-btn--primary\" (click)=\"loadTestForAttempt(testName)\" [disabled]=\"isLoadingTest\">Reload Test</button>\n    </section>\n\n    <ng-container *ngIf=\"!isDirectEntry && !isAdmin && !isSubmitted && !isLoadingTest && questions.length;\">\n      <div class=\"test-layout\">\n        <main class=\"test-panel\">\n          <div class=\"question-top\">\n            <div class=\"question-heading\">\n              <span>Question {{ currentQuestion.questionNo }} of {{ questions.length }}</span>\n              <!-- <strong>{{ getQuestionStatus(currentQuestionIndex) }}</strong> -->\n               <strong>{{ testName }}</strong>\n            </div>\n            <button type=\"button\" class=\"test-btn test-btn--submit question-submit\" (click)=\"openSubmitModal()\">\n              <i class=\"fa-solid fa-check\"></i>\n              Submit Test\n            </button>\n          </div>\n\n          <div class=\"question-meta\">\n            <span>{{ getQuestionTypeLabel(currentQuestion.questionType) }}</span>\n            <!-- <span>{{ currentQuestion.subject }}</span>\n            <span>{{ currentQuestion.topic }}</span> -->\n            <span class=\"difficulty-badge\" [ngClass]=\"'difficulty--' + currentQuestion.difficulty.toLowerCase()\">{{ currentQuestion.difficulty }}</span>\n            <span>{{ getQuestionMarks(currentQuestion) }} marks</span>\n            <span>{{ getQuestionNegativeMarks(currentQuestion) }} negative</span>\n            <span>{{ currentQuestion.estimatedTimeSeconds }}s estimated</span>\n          </div>\n\n          <h2>{{ currentQuestion.questionText }}</h2>\n\n          <div class=\"question-media\" *ngIf=\"hasVisibleMedia(currentQuestion)\">\n            <img\n              *ngIf=\"isMediaAvailable(currentQuestion.questionImageUrl)\"\n              [src]=\"currentQuestion.questionImageUrl\"\n              [alt]=\"currentQuestion.questionImageAlt || 'Question image'\"\n              (error)=\"markBrokenMedia(currentQuestion.questionImageUrl)\"\n            />\n\n            <audio *ngIf=\"isMediaAvailable(currentQuestion.audioUrl)\" controls preload=\"none\" aria-label=\"Question audio\" (error)=\"markBrokenMedia(currentQuestion.audioUrl)\">\n              <source [src]=\"currentQuestion.audioUrl\" type=\"audio/wav\" />\n            </audio>\n\n            <video *ngIf=\"isMediaAvailable(currentQuestion.videoUrl)\" controls preload=\"metadata\" playsinline aria-label=\"Question video\" (error)=\"markBrokenMedia(currentQuestion.videoUrl)\">\n              <source [src]=\"currentQuestion.videoUrl\" type=\"video/mp4\" />\n            </video>\n\n            <div class=\"media-fallback\" *ngIf=\"currentQuestion.audioUrl && !isMediaAvailable(currentQuestion.audioUrl)\">\n              <i class=\"fa-solid fa-volume-high\"></i>\n              <span>Demo audio is not playable in this browser.</span>\n            </div>\n          </div>\n\n          <div class=\"option-list\" *ngIf=\"hasOptions(currentQuestion)\">\n            <button\n              type=\"button\"\n              class=\"test-option\"\n              *ngFor=\"let option of currentQuestion.options; let optionIndex = index; trackBy: trackByOptionId\"\n              [class.test-option--selected]=\"isOptionSelected(option.id)\"\n              (click)=\"selectOption(option.id)\"\n              [attr.aria-label]=\"'Select option ' + getOptionLabel(optionIndex)\"\n            >\n              <span class=\"option-marker\">{{ getOptionLabel(optionIndex) }}</span>\n              <span\n                class=\"option-control\"\n                [class.option-control--checkbox]=\"isMultipleAnswerQuestion(currentQuestion)\"\n                [class.option-control--radio]=\"!isMultipleAnswerQuestion(currentQuestion)\"\n                [class.option-control--checked]=\"isOptionSelected(option.id)\"\n                aria-hidden=\"true\"\n              ></span>\n              <span class=\"option-content\">\n                <img\n                  *ngIf=\"isMediaAvailable(option.imageUrl)\"\n                  class=\"option-image\"\n                  [src]=\"option.imageUrl\"\n                  [alt]=\"option.imageAlt || option.text\"\n                  (error)=\"markBrokenMedia(option.imageUrl)\"\n                />\n                <span>{{ option.text }}</span>\n              </span>\n            </button>\n          </div>\n\n          <div class=\"essay-answer\" *ngIf=\"isEssayQuestion(currentQuestion)\">\n            <label for=\"essayAnswer\">Your Answer</label>\n            <textarea\n              id=\"essayAnswer\"\n              rows=\"7\"\n              [ngModel]=\"currentAnswer.essayAnswer\"\n              (ngModelChange)=\"onEssayAnswerChange($event)\"\n              placeholder=\"Type your answer here\"\n            ></textarea>\n            <span>Essay responses may require manual evaluation.</span>\n          </div>\n\n          <div class=\"test-actions\">\n            <button type=\"button\" class=\"test-btn test-btn--light\" (click)=\"clearCurrentAnswer()\" [disabled]=\"!hasCurrentAnswer()\">\n              <i class=\"fa-solid fa-eraser\"></i>\n              Clear\n            </button>\n            <button type=\"button\" class=\"test-btn test-btn--warning\" (click)=\"skipQuestion()\">\n              <i class=\"fa-solid fa-forward\"></i>\n              Skip\n            </button>\n            <button type=\"button\" class=\"test-btn test-btn--light\" (click)=\"previousQuestion()\" [disabled]=\"currentQuestionIndex === 0\">\n              <i class=\"fa-solid fa-arrow-left\"></i>\n              Previous\n            </button>\n            <button type=\"button\" class=\"test-btn test-btn--primary\" (click)=\"nextQuestion()\">\n              Next\n              <i class=\"fa-solid fa-arrow-right\"></i>\n            </button>\n          </div>\n        </main>\n\n        <aside class=\"test-summary\">\n          <h3>Question Summary</h3>\n\n          <div class=\"summary-counts\">\n            <div><strong>{{ answeredCount }}</strong><span>Answered</span></div>\n            <div><strong>{{ notAnsweredCount }}</strong><span>Not Answered</span></div>\n            <div><strong>{{ skippedCount }}</strong><span>Skipped</span></div>\n          </div>\n\n          <div class=\"question-map\">\n            <button\n              type=\"button\"\n              *ngFor=\"let question of questions; let index = index; trackBy: trackByQuestionId\"\n              [class.is-current]=\"index === currentQuestionIndex\"\n              [class.is-answered]=\"answers[index].status === 'answered'\"\n              [class.is-skipped]=\"answers[index].status === 'skipped'\"\n              [attr.title]=\"getQuestionTypeLabel(question.questionType) + ' - ' + question.difficulty\"\n              (click)=\"goToQuestion(index)\"\n              [attr.aria-label]=\"getQuestionStatus(index)\"\n            >\n              {{ question.questionNo }}\n            </button>\n          </div>\n\n          <div class=\"summary-legend\">\n            <span><i class=\"legend-dot legend-dot--answered\"></i>Answered</span>\n            <span><i class=\"legend-dot legend-dot--pending\"></i>Not Answered</span>\n            <span><i class=\"legend-dot legend-dot--skipped\"></i>Skipped</span>\n            <span><i class=\"legend-dot legend-dot--current\"></i>Current</span>\n          </div>\n        </aside>\n      </div>\n    </ng-container>\n\n  </div>\n</section>\n\n<div class=\"custom-modal\" [class.active]=\"isSubmitModalOpen\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"submitTestTitle\">\n  <div class=\"custom-modal__overlay\" (click)=\"closeSubmitModal()\"></div>\n  <div class=\"custom-modal__box custom-modal__box--submit\">\n    <button type=\"button\" class=\"custom-modal__close\" aria-label=\"Close submit confirmation\" (click)=\"closeSubmitModal()\">&times;</button>\n    <div class=\"custom-modal__header\">\n      <h2 id=\"submitTestTitle\">Submit Test?</h2>\n      <p>Are you sure you want to submit your test? Once submitted, you cannot change your answers.</p>\n    </div>\n\n    <div class=\"submit-summary\">\n      <div><span>Total Questions</span><strong>{{ questions.length }}</strong></div>\n      <div><span>Answered</span><strong>{{ answeredCount }}</strong></div>\n      <div><span>Skipped</span><strong>{{ skippedCount }}</strong></div>\n      <div><span>Not Answered</span><strong>{{ notAnsweredCount }}</strong></div>\n      <div><span>Time Remaining</span><strong>{{ timerText }}</strong></div>\n    </div>\n\n    <div class=\"custom-modal__actions\">\n      <button type=\"button\" class=\"btn-close\" (click)=\"closeSubmitModal()\">Cancel</button>\n      <button type=\"button\" class=\"btn-send\" (click)=\"submitFromModal()\">Submit Test</button>\n    </div>\n  </div>\n</div>\n", styles: [".test-page {\n  background: linear-gradient(160deg, #f8fbff 0%, #ebf2fd 52%, #ffffff 100%);\n  color: var(--text-dark, #000b1d);\n  min-height: 100vh;\n  padding: 110px 0 70px;\n}\n\n.test-header,\n.test-layout,\n.result-head,\n.review-head {\n  display: flex;\n  gap: 24px;\n  justify-content: space-between;\n}\n\n.test-header {\n  align-items: flex-end;\n  margin-bottom: 28px;\n}\n\n.test-kicker {\n  color: var(--primary, #2f7ce8);\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 700;\n  letter-spacing: 0;\n  margin-bottom: 8px;\n  text-transform: uppercase;\n}\n\n.test-header h1,\n.result-head h2 {\n  color: #071126;\n  font-size: 38px;\n  font-weight: 800;\n  line-height: 1.15;\n  margin: 0 0 10px;\n}\n\n.test-header p,\n.result-head p {\n  color: #64748b;\n  font-size: 16px;\n  margin: 0;\n}\n\n.test-timer {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  box-shadow: 0 18px 38px rgba(47, 124, 232, 0.12);\n  color: var(--primary, #2f7ce8);\n  display: flex;\n  flex: 0 0 auto;\n  font-size: 22px;\n  font-weight: 800;\n  gap: 10px;\n  padding: 14px 18px;\n}\n\n.test-timer--ending {\n  color: #dc2626;\n}\n\n.test-layout {\n  align-items: flex-start;\n}\n\n.test-panel,\n.test-summary,\n.result-panel,\n.review-item {\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.08);\n}\n\n.test-panel {\n  flex: 1 1 auto;\n  padding: 30px;\n}\n\n.question-top {\n  align-items: center;\n  border-bottom: 1px solid #edf2f8;\n  color: #64748b;\n  display: flex;\n  font-size: 14px;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n}\n\n.question-top strong {\n  color: var(--primary, #2f7ce8);\n}\n\n.test-panel h2 {\n  color: #071126;\n  font-size: 16px;\n  font-weight: 750;\n  line-height: 1.35;\n  margin: 20px 0;\n}\n\n.question-type {\n  color: #64748b;\n  margin: 10px 0 22px;\n}\n\n.option-list {\n  display: grid;\n  gap: 14px;\n}\n\n.test-option {\n  align-items: center;\n  background: #ffffff;\n  border: 1.5px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  display: flex;\n  gap: 14px;\n  min-height: 58px;\n  padding: 12px 14px;\n  text-align: left;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;\n  width: 100%;\n}\n\nbutton.test-option {\n  cursor: pointer;\n}\n\nbutton.test-option:hover,\n.test-option--selected {\n  border-color: var(--primary, #2f7ce8);\n  box-shadow: 0 10px 24px rgba(47, 124, 232, 0.12);\n}\n\n.test-option--selected {\n  background: #f2f7ff;\n}\n\n.option-marker {\n  align-items: center;\n  background: #ebf2fd;\n  border-radius: 50%;\n  color: var(--primary, #2f7ce8);\n  display: inline-flex;\n  flex: 0 0 34px;\n  font-weight: 800;\n  height: 34px;\n  justify-content: center;\n  width: 34px;\n}\n\n.option-control {\n  align-items: center;\n  background: #ffffff;\n  border: 2px solid #b8c7dc;\n  display: inline-flex;\n  flex: 0 0 22px;\n  height: 22px;\n  justify-content: center;\n  transition: background 0.2s ease, border-color 0.2s ease;\n  width: 22px;\n}\n\n.option-control--radio {\n  border-radius: 50%;\n}\n\n.option-control--checkbox {\n  border-radius: 6px;\n}\n\n.option-control--checked {\n  background: var(--primary, #2f7ce8);\n  border-color: var(--primary, #2f7ce8);\n}\n\n.option-control--radio.option-control--checked::after {\n  background: #ffffff;\n  border-radius: 50%;\n  content: \"\";\n  height: 8px;\n  width: 8px;\n}\n\n.option-control--checkbox.option-control--checked::after {\n  border-bottom: 2px solid #ffffff;\n  border-left: 2px solid #ffffff;\n  content: \"\";\n  height: 6px;\n  margin-top: -2px;\n  transform: rotate(-45deg);\n  width: 10px;\n}\n\n.test-option--correct .option-control--checked,\n.test-option--correct-answer .option-control--checked {\n  background: #22c55e;\n  border-color: #22c55e;\n}\n\n.test-option--wrong .option-control--checked {\n  background: #ef4444;\n  border-color: #ef4444;\n}\n\n.test-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 28px;\n}\n\n.test-btn {\n  align-items: center;\n  border: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  font-weight: 700;\n  gap: 9px;\n  justify-content: center;\n  min-height: 44px;\n  padding: 11px 18px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;\n}\n\n.test-btn:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n\n.test-btn:not(:disabled):hover {\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);\n  transform: translateY(-1px);\n}\n\n.test-btn--primary,\n.test-btn--submit {\n  background: linear-gradient(135deg, var(--primary, #2f7ce8), var(--secondary, #5992e8));\n  color: #ffffff;\n}\n\n.test-btn--submit {\n  margin-left: auto;\n}\n\n.test-btn--light {\n  background: #e8edf5;\n  color: #253044;\n}\n\n.test-btn--warning {\n  background: #fff7ed;\n  color: #b45309;\n}\n\n.test-summary {\n  flex: 0 0 310px;\n  padding: 24px;\n  position: sticky;\n  top: 95px;\n}\n\n.test-summary h3,\n.review-head h3 {\n  color: #071126;\n  font-size: 20px;\n  margin: 0 0 18px;\n}\n\n.summary-counts {\n  display: grid;\n  gap: 10px;\n  grid-template-columns: repeat(3, 1fr);\n  margin-bottom: 22px;\n}\n\n.summary-counts div {\n  background: #f8fafc;\n  border: 1px solid #edf2f8;\n  border-radius: 8px;\n  padding: 12px 8px;\n  text-align: center;\n}\n\n.summary-counts strong {\n  color: #071126;\n  display: block;\n  font-size: 22px;\n}\n\n.summary-counts span {\n  color: #64748b;\n  display: block;\n  font-size: 12px;\n  margin-top: 3px;\n}\n\n.question-map {\n  display: grid;\n  gap: 10px;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.question-map button {\n  background: #eef2f7;\n  border: 1px solid #dbe6f6;\n  border-radius: 8px;\n  color: #334155;\n  cursor: pointer;\n  font-weight: 800;\n  height: 42px;\n}\n\n.question-map button.is-current {\n  background: var(--primary, #2f7ce8);\n  border-color: var(--primary, #2f7ce8);\n  color: #ffffff;\n}\n\n.question-map button.is-answered {\n  background: #dcfce7;\n  border-color: #86efac;\n  color: #166534;\n}\n\n.question-map button.is-skipped {\n  background: #fff7ed;\n  border-color: #fed7aa;\n  color: #9a3412;\n}\n\n.question-map button.is-current.is-answered,\n.question-map button.is-current.is-skipped {\n  background: var(--primary, #2f7ce8);\n  border-color: var(--primary, #2f7ce8);\n  color: #ffffff;\n}\n\n.summary-legend {\n  color: #64748b;\n  display: grid;\n  gap: 10px;\n  margin-top: 22px;\n}\n\n.summary-legend span {\n  align-items: center;\n  display: flex;\n  gap: 8px;\n}\n\n.legend-dot {\n  border-radius: 50%;\n  display: inline-flex;\n  height: 10px;\n  width: 10px;\n}\n\n.legend-dot--answered {\n  background: #22c55e;\n}\n\n.legend-dot--pending {\n  background: #94a3b8;\n}\n\n.legend-dot--skipped {\n  background: #f59e0b;\n}\n\n.legend-dot--current {\n  background: var(--primary, #2f7ce8);\n}\n\n.result-panel {\n  padding: 30px;\n}\n\n.result-head {\n  align-items: center;\n  border-bottom: 1px solid #edf2f8;\n  margin-bottom: 24px;\n  padding-bottom: 22px;\n}\n\n.result-score {\n  align-items: center;\n  background: #dcfce7;\n  border: 1px solid #86efac;\n  border-radius: 50%;\n  color: #166534;\n  display: flex;\n  flex: 0 0 112px;\n  font-size: 30px;\n  font-weight: 850;\n  height: 112px;\n  justify-content: center;\n  width: 112px;\n}\n\n.result-score--fail {\n  background: #fee2e2;\n  border-color: #fecaca;\n  color: #b91c1c;\n}\n\n.result-grid {\n  display: grid;\n  gap: 14px;\n  grid-template-columns: repeat(6, 1fr);\n  margin-bottom: 30px;\n}\n\n.result-card {\n  background: #f8fafc;\n  border: 1px solid #edf2f8;\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.result-card span {\n  color: #64748b;\n  display: block;\n  font-size: 13px;\n  margin-bottom: 8px;\n}\n\n.result-card strong {\n  color: #071126;\n  font-size: 24px;\n}\n\n.review-head {\n  align-items: center;\n  margin-bottom: 16px;\n}\n\n.review-list {\n  display: grid;\n  gap: 18px;\n}\n\n.review-item {\n  box-shadow: none;\n  padding: 22px;\n}\n\n.review-question span {\n  color: var(--primary, #2f7ce8);\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 800;\n  margin-bottom: 8px;\n}\n\n.review-question h4 {\n  color: #071126;\n  font-size: 20px;\n  line-height: 1.35;\n  margin: 0 0 16px;\n}\n\n.option-list--review {\n  gap: 10px;\n}\n\n.test-option--correct,\n.test-option--correct-answer {\n  background: #ecfdf3;\n  border-color: #22c55e;\n  color: #166534;\n}\n\n.test-option--wrong {\n  background: #fef2f2;\n  border-color: #ef4444;\n  color: #991b1b;\n}\n\n.answer-note {\n  background: #f8fafc;\n  border-left: 4px solid var(--primary, #2f7ce8);\n  border-radius: 8px;\n  color: #475569;\n  margin-top: 16px;\n  padding: 14px 16px;\n}\n\n.answer-note--skipped {\n  border-left-color: #f59e0b;\n}\n\n.answer-note p {\n  margin: 0 0 8px;\n}\n\n.answer-note p:last-child {\n  margin-bottom: 0;\n}\n\n@media (max-width: 991px) {\n  .test-page {\n    padding: 95px 0 50px;\n  }\n\n  .test-header,\n  .test-layout,\n  .result-head {\n    flex-direction: column;\n  }\n\n  .test-timer,\n  .test-summary {\n    width: 100%;\n  }\n\n  .test-summary {\n    flex-basis: auto;\n    position: static;\n  }\n\n  .result-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n\n@media (max-width: 575px) {\n  .test-header h1,\n  .result-head h2 {\n    font-size: 30px;\n  }\n\n  .test-panel,\n  .test-summary,\n  .result-panel,\n  .review-item {\n    padding: 18px;\n  }\n\n  .test-panel h2 {\n    font-size: 22px;\n  }\n\n  .test-actions,\n  .review-head {\n    flex-direction: column;\n  }\n\n  .test-btn,\n  .test-btn--submit {\n    margin-left: 0;\n    width: 100%;\n  }\n\n  .summary-counts,\n  .result-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .result-score {\n    flex-basis: 96px;\n    height: 96px;\n    width: 96px;\n  }\n}\n\n.question-media {\n  background: #f8fafc;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  display: grid;\n  gap: 14px;\n  margin: 18px 0 24px;\n  padding: 14px;\n}\n\n.question-media img,\n.explanation-image {\n  border-radius: 8px;\n  display: block;\n  height: auto;\n  max-height: 360px;\n  max-width: 100%;\n  object-fit: contain;\n  width: 100%;\n}\n\n.question-media audio,\n.question-media video {\n  display: block;\n  width: 100%;\n}\n\n.question-media video {\n  background: #0f172a;\n  border-radius: 8px;\n  max-height: 420px;\n}\n\n.question-media--review {\n  margin-top: 0;\n}\n\n.option-content {\n  align-items: center;\n  display: flex;\n  flex: 1 1 auto;\n  gap: 14px;\n  min-width: 0;\n}\n\n.option-image {\n  background: #f8fafc;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  flex: 0 0 96px;\n  height: 72px;\n  object-fit: cover;\n  width: 96px;\n}\n\n.explanation-image {\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  margin-top: 12px;\n}\n\n@media (max-width: 575px) {\n  .option-content {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .option-image {\n    flex-basis: auto;\n    height: auto;\n    max-height: 180px;\n    width: 100%;\n  }\n}\n\n.media-fallback {\n  align-items: center;\n  background: #ffffff;\n  border: 1px dashed #b8c7dc;\n  border-radius: 8px;\n  color: #64748b;\n  display: flex;\n  gap: 10px;\n  min-height: 88px;\n  padding: 18px;\n}\n\n.media-fallback i {\n  color: var(--primary, #2f7ce8);\n  font-size: 22px;\n}\n\n.auto-submit-note {\n  background: #fff7ed;\n  border-left: 4px solid #f59e0b;\n  border-radius: 8px;\n  color: #9a3412 !important;\n  font-weight: 700;\n  margin-top: 12px !important;\n  padding: 10px 12px;\n}\n\n.review-time {\n  align-items: center;\n  color: #64748b;\n  display: inline-flex;\n  font-size: 14px;\n  gap: 7px;\n  margin: -6px 0 16px;\n}\n\n.custom-modal {\n  align-items: center;\n  display: flex;\n  inset: 0;\n  justify-content: center;\n  opacity: 0;\n  position: fixed;\n  transition: opacity 0.35s ease, visibility 0.35s ease;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n.custom-modal.active {\n  opacity: 1;\n  visibility: visible;\n}\n\n.custom-modal__overlay {\n  background: rgba(11, 29, 57, 0.65);\n  backdrop-filter: blur(5px);\n  inset: 0;\n  position: absolute;\n}\n\n.custom-modal__box {\n  background: #ffffff;\n  border-radius: 16px;\n  box-shadow: 0 24px 64px rgba(11, 29, 57, 0.18);\n  max-width: 520px;\n  padding: 36px 30px;\n  position: relative;\n  width: 90%;\n  z-index: 2;\n}\n\n.custom-modal__box--submit {\n  max-width: 560px;\n}\n\n.custom-modal__close {\n  background: transparent;\n  border: none;\n  color: #667085;\n  cursor: pointer;\n  font-size: 28px;\n  line-height: 1;\n  position: absolute;\n  right: 20px;\n  top: 20px;\n}\n\n.custom-modal__header h2 {\n  color: #071126;\n  font-size: 24px;\n  font-weight: 700;\n  margin: 0 36px 10px 0;\n}\n\n.custom-modal__header p {\n  color: #64748b;\n  line-height: 1.6;\n  margin: 0 0 22px;\n}\n\n.submit-summary {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin-bottom: 24px;\n}\n\n.submit-summary div {\n  background: #f8fafc;\n  border: 1px solid #edf2f8;\n  border-radius: 8px;\n  padding: 14px;\n}\n\n.submit-summary span {\n  color: #64748b;\n  display: block;\n  font-size: 13px;\n  margin-bottom: 6px;\n}\n\n.submit-summary strong {\n  color: #071126;\n  font-size: 20px;\n}\n\n.custom-modal__actions {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n\n.btn-close,\n.btn-send {\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 700;\n  padding: 12px 24px;\n}\n\n.btn-close {\n  background: #e5e7eb;\n  color: #374151;\n}\n\n.btn-send {\n  background: #2f7cf0;\n  color: #ffffff;\n}\n\n@media (max-width: 575px) {\n  .submit-summary {\n    grid-template-columns: 1fr;\n  }\n\n  .custom-modal__actions {\n    flex-direction: column;\n  }\n\n  .btn-close,\n  .btn-send {\n    width: 100%;\n  }\n}\n\n.question-heading {\n  align-items: flex-start;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n\n.question-submit {\n  flex: 0 0 auto;\n  margin-left: 16px;\n}\n\n.test-actions {\n  align-items: stretch;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.test-actions .test-btn {\n  width: 100%;\n}\n\n@media (max-width: 1199px) {\n  .test-layout {\n    gap: 18px;\n  }\n\n  .test-summary {\n    flex-basis: 280px;\n  }\n\n  .result-grid {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 767px) {\n  .question-top {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 14px;\n  }\n\n  .question-submit {\n    margin-left: 0;\n    width: 100%;\n  }\n\n  .test-actions {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .question-map {\n    grid-template-columns: repeat(5, minmax(42px, 1fr));\n    overflow-x: auto;\n    padding-bottom: 4px;\n  }\n\n  .summary-counts {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 420px) {\n  .test-actions,\n  .summary-counts,\n  .result-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .question-map {\n    grid-template-columns: repeat(5, 42px);\n  }\n}\n\n.question-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 0 0 18px;\n}\n\n.question-meta span {\n  background: #f1f5f9;\n  border: 1px solid #e2e8f0;\n  border-radius: 999px;\n  color: #475569;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 7px 11px;\n}\n\n.question-meta--review {\n  margin-bottom: 12px;\n}\n\n.difficulty-badge.difficulty--easy {\n  background: #ecfdf3;\n  border-color: #bbf7d0;\n  color: #166534;\n}\n\n.difficulty-badge.difficulty--medium {\n  background: #eff6ff;\n  border-color: #bfdbfe;\n  color: #1d4ed8;\n}\n\n.difficulty-badge.difficulty--hard {\n  background: #fef2f2;\n  border-color: #fecaca;\n  color: #991b1b;\n}\n\n.essay-answer {\n  display: grid;\n  gap: 8px;\n  margin-top: 18px;\n}\n\n.essay-answer label {\n  color: #071126;\n  font-weight: 800;\n}\n\n.essay-answer textarea {\n  background: #ffffff;\n  border: 1.5px solid #dbe6f6;\n  border-radius: 8px;\n  color: #1f2937;\n  font: inherit;\n  line-height: 1.6;\n  min-height: 170px;\n  outline: none;\n  padding: 14px 16px;\n  resize: vertical;\n  width: 100%;\n}\n\n.essay-answer textarea:focus {\n  border-color: var(--primary, #2f7ce8);\n  box-shadow: 0 0 0 4px rgba(47, 124, 232, 0.12);\n}\n\n.essay-answer span {\n  color: #64748b;\n  font-size: 13px;\n}\n\n.manual-note {\n  background: #f8fafc;\n  border-left: 4px solid #64748b;\n  border-radius: 8px;\n  color: #475569 !important;\n  font-weight: 700;\n  margin-top: 10px !important;\n  padding: 10px 12px;\n}\n\n.breakdown-grid {\n  display: grid;\n  gap: 14px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin: 0 0 30px;\n}\n\n.breakdown-box {\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  padding: 18px;\n}\n\n.breakdown-box--wide {\n  grid-column: 1 / -1;\n}\n\n.breakdown-box h4 {\n  color: #071126;\n  font-size: 17px;\n  margin: 0 0 12px;\n}\n\n.breakdown-box p {\n  color: #64748b;\n  margin: 0 0 8px;\n}\n\n.evaluation-badge {\n  border-radius: 999px;\n  display: inline-flex;\n  font-size: 13px;\n  font-weight: 800;\n  margin: 0 0 14px;\n  padding: 7px 12px;\n}\n\n.evaluation--correct {\n  background: #ecfdf3;\n  color: #166534;\n}\n\n.evaluation--wrong {\n  background: #fef2f2;\n  color: #991b1b;\n}\n\n.evaluation--skipped {\n  background: #fff7ed;\n  color: #9a3412;\n}\n\n.evaluation--manualReview {\n  background: #f1f5f9;\n  color: #475569;\n}\n\n.evaluation--notAnswered {\n  background: #eef2f7;\n  color: #64748b;\n}\n\n@media (max-width: 991px) {\n  .breakdown-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .result-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 575px) {\n  .question-meta span {\n    border-radius: 8px;\n    width: 100%;\n  }\n\n  .result-grid,\n  .breakdown-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n.saved-result-panel {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid #e5edf8;\n  border-radius: 8px;\n  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.07);\n  display: flex;\n  gap: 18px;\n  justify-content: space-between;\n  margin-bottom: 22px;\n  padding: 18px;\n  position: relative;\n  overflow: visible;\n  z-index: 30;\n}\n\n.saved-result-panel h2 {\n  color: #071126;\n  font-size: 20px;\n  margin: 0;\n}\n\n.saved-result-form {\n  display: flex;\n  flex: 1 1 auto;\n  flex-wrap: wrap;\n  gap: 10px;\n  justify-content: flex-end;\n}\n\n.saved-result-form .test-selection-row {\n  margin-top: 0;\n}\n\n.test-dropdown {\n  position: relative;\n}\n\n.saved-result-form .result-dropdown {\n  z-index: 1001;\n}\n\n.dropdown-toggle {\n  align-items: center;\n  display: inline-flex;\n  justify-content: space-between;\n  min-width: 220px;\n  padding: .75rem 1rem;\n  border: 1px solid var(--gray-light-mid, #dbe6f6);\n  border-radius: var(--radius-sm, 8px);\n  background: var(--bg-light, #f8fbff);\n  color: var(--text-dark, #1f2937);\n  cursor: pointer;\n}\n\n.dropdown-icon {\n  margin-left: .5rem;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: calc(100% + .5rem);\n  left: 0;\n  z-index: 1000;\n  display: grid;\n  width: min(100%, 320px);\n  max-height: 280px;\n  border: 1px solid var(--gray-light-mid, #dbe6f6);\n  border-radius: var(--radius-sm, 8px);\n  background: var(--bg-white, #ffffff);\n  box-shadow: 0 18px 45px rgba(0, 0, 0, .08);\n  overflow-y: auto;\n}\n\n.dropdown-item {\n  width: 100%;\n  text-align: left;\n  border: none;\n  background: transparent;\n  padding: 0.85rem 1rem;\n  color: var(--text-dark, #1f2937);\n  font: inherit;\n  cursor: pointer;\n}\n\n.dropdown-item:hover,\n.dropdown-item.highlighted,\n.dropdown-item:focus {\n  outline: none;\n  background: var(--bg-light, #f8fbff);\n}\n\n.dropdown-item--empty,\n.dropdown-item--empty:hover,\n.dropdown-item--empty:focus {\n  color: #64748b;\n  cursor: not-allowed;\n}\n\n.saved-result-message {\n  color: #b45309;\n  font-weight: 700;\n  margin: 0;\n}\n\n.result-visuals {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 14px;\n  justify-content: flex-end;\n}\n\n.result-circle {\n  --value: 0;\n  align-items: center;\n  background: conic-gradient(#22c55e calc(var(--value) * 1%), #e5edf8 0);\n  border-radius: 50%;\n  color: #166534;\n  display: flex;\n  flex: 0 0 118px;\n  height: 118px;\n  justify-content: center;\n  position: relative;\n  width: 118px;\n}\n\n.result-circle::before {\n  background: #ffffff;\n  border-radius: 50%;\n  content: \"\";\n  inset: 10px;\n  position: absolute;\n}\n\n.result-circle strong,\n.result-circle span {\n  position: relative;\n  z-index: 1;\n}\n\n.result-circle strong {\n  display: block;\n  font-size: 20px;\n  text-align: center;\n}\n\n.result-circle span {\n  color: #64748b;\n  font-size: 11px;\n  font-weight: 800;\n  position: absolute;\n  top: 72px;\n}\n\n.result-circle--fail {\n  background: conic-gradient(#ef4444 calc(var(--value) * 1%), #e5edf8 0);\n  color: #b91c1c;\n}\n\n.result-circle--marks {\n  background: conic-gradient(var(--primary, #2f7ce8) calc(var(--value) * 1%), #e5edf8 0);\n  color: var(--primary, #2f7ce8);\n}\n\n@media (max-width: 767px) {\n  .saved-result-panel,\n  .result-visuals {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .saved-result-form,\n  .saved-result-form .test-selection-row,\n  .saved-result-form .dropdown-toggle,\n  .saved-result-form .test-btn {\n    width: 100%;\n  }\n\n  .saved-result-form .dropdown-menu {\n    width: 100%;\n  }\n\n  .result-circle {\n    align-self: center;\n  }\n}\n\n.test-load-state {\n  background: #ffffff;\n  border: 1px solid rgba(18, 35, 64, 0.1);\n  border-radius: 8px;\n  box-shadow: 0 10px 30px rgba(18, 35, 64, 0.08);\n  margin-bottom: 24px;\n  padding: 24px;\n}\n\n.direct-test-entry { \n  margin: 0 auto;\n  padding: 32px;\n  border: 1px solid #e2e8f0;\n  border-radius: 18px;\n  background: #fff;\n  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);\n  overflow: visible;\n  position: relative;\n  z-index: 5;\n}\n\n.direct-test-entry h2 {\n  margin: 8px 0;\n}\n\n.direct-test-entry > p {\n  color: #64748b;\n}\n\n.direct-test-form {\n  display: grid;\n  grid-template-columns: 6fr 3fr 3fr;\n  gap: 18px;\n  margin: 24px 0;\n  overflow: visible;\n}\n\n.direct-test-form label {\n  display: grid;\n  gap: 8px;\n  color: #334155;\n  font-weight: 600;\n}\n\n.direct-test-form input,\n.direct-test-form select {\n  width: 100%;\n  min-height: 46px;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 9px;\n  background: #fff;\n  color: #0f172a;\n  font: inherit;\n}\n\n.direct-training-search {\n  position: relative;\n  z-index: 50;\n}\n\n.direct-training-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 46px;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 9px;\n  background: #fff;\n  color: #0f172a;\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n.direct-training-menu {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 6px);\n  left: 0;\n  right: 0;\n  max-height: 300px;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  background: #fff;\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);\n}\n\n.direct-training-menu input {\n  margin-bottom: 6px;\n}\n\n.direct-training-option {\n  width: 100%;\n  padding: 11px 12px;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: #334155;\n  font-size: 14px;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n}\n\n.direct-training-option:hover {\n  background: #f1f5f9;\n}\n\n.direct-training-empty {\n  padding: 12px 10px;\n  color: #64748b;\n  font-weight: 400;\n}\n\n.direct-test-message {\n  margin: 0 0 16px;\n  color: #b91c1c !important;\n}\n\n@media (max-width: 760px) {\n  .direct-test-form {\n    grid-template-columns: 1fr;\n  }\n}\n\n.test-load-state h2 {\n  color: #13233f;\n  font-size: 24px;\n  margin: 8px 0;\n}\n\n.test-load-state p {\n  color: #5b667a;\n  margin-bottom: 16px;\n}\n"] }]
    }], function () { return [{ type: i1.TestStorageService }, { type: i2.AuthService }, { type: i3.Router }, { type: i4.HttpClient }, { type: i5.DataService }, { type: i6.TrainingManagementService }]; }, { onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
//# sourceMappingURL=test.component.js.map