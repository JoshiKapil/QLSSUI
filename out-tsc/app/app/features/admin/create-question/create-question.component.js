import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { TEST_QUESTIONS } from '../../test/test-data';
import { Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../test/services/test-storage.service";
import * as i2 from "../../../core/services/notifier.service";
import * as i3 from "../../test/services/test-excel-import.service";
import * as i4 from "@angular/common/http";
import * as i5 from "../../../core/services/data.service";
import * as i6 from "../../../core/services/training-management.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/router";
import * as i9 from "@angular/forms";
function CreateQuestionComponent_section_14_ng_container_16_tr_59_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r22 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r22.rowNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r22.action);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((item_r22.question == null ? null : item_r22.question.questionText) || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r22.errors.length ? item_r22.errors[0].message : item_r22.duplicateReason || "-");
} }
function CreateQuestionComponent_section_14_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "p", 72);
    i0.ɵɵtext(2, "Selected file: ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 73)(6, "div")(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Total Rows");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div")(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Valid");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div")(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, "Duplicates");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Invalid");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div")(27, "strong");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "New");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div")(32, "strong");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Updates");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div")(37, "strong");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Skipped");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div")(42, "strong");
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "span");
    i0.ɵɵtext(45, "Failed");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 74)(47, "table", 75)(48, "thead")(49, "tr")(50, "th");
    i0.ɵɵtext(51, "Row");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "th");
    i0.ɵɵtext(53, "Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "th");
    i0.ɵɵtext(55, "Question");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "th");
    i0.ɵɵtext(57, "Issue");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(58, "tbody");
    i0.ɵɵtemplate(59, CreateQuestionComponent_section_14_ng_container_16_tr_59_Template, 9, 4, "tr", 76);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(60, "div", 77)(61, "button", 12);
    i0.ɵɵlistener("click", function CreateQuestionComponent_section_14_ng_container_16_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r23.cancelQuestionImport()); });
    i0.ɵɵtext(62, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "button", 44);
    i0.ɵɵlistener("click", function CreateQuestionComponent_section_14_ng_container_16_Template_button_click_63_listener() { i0.ɵɵrestoreView(_r24); const ctx_r25 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r25.confirmQuestionImport()); });
    i0.ɵɵtext(64, "Confirm Import");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportFileName || ctx_r19.questionImportPreview.fileName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.totalRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.validRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.duplicateRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.invalidRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.newQuestions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.updateQuestions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.skippedRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r19.questionImportPreview.failedRows);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r19.questionImportPreview.items);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r19.questionImportPreview.validRows);
} }
function CreateQuestionComponent_section_14_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78)(1, "strong");
    i0.ɵɵtext(2, "Question import completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate5("Imported: ", ctx_r20.questionImportResult.imported, " | Updated: ", ctx_r20.questionImportResult.updated, " | Skipped: ", ctx_r20.questionImportResult.skipped, " | Failed: ", ctx_r20.questionImportResult.failed, " | Bank Total: ", ctx_r20.questionImportResult.questionBankTotal, "");
} }
function CreateQuestionComponent_section_14_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 65)(1, "div", 11)(2, "div")(3, "span", 3);
    i0.ɵɵtext(4, "Excel Import");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6, "Question Import Preview");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "label", 66);
    i0.ɵɵtext(8, " Duplicate Handling ");
    i0.ɵɵelementStart(9, "select", 67);
    i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_section_14_Template_select_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r26 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r26.questionImportDuplicateAction = $event); });
    i0.ɵɵelementStart(10, "option", 68);
    i0.ɵɵtext(11, "Skip duplicate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "option", 69);
    i0.ɵɵtext(13, "Update existing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 70);
    i0.ɵɵtext(15, "Import as new clone");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(16, CreateQuestionComponent_section_14_ng_container_16_Template, 65, 11, "ng-container", 31);
    i0.ɵɵtemplate(17, CreateQuestionComponent_section_14_div_17_Template, 5, 5, "div", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngModel", ctx_r0.questionImportDuplicateAction);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r0.questionImportPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.questionImportResult);
} }
function CreateQuestionComponent_div_22_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r28 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Tests: ", ctx_r28.getAffectedTestNames(), "");
} }
function CreateQuestionComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, CreateQuestionComponent_div_22_span_2_Template, 2, 1, "span", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" This question is used in ", ctx_r1.usageInfo == null ? null : ctx_r1.usageInfo.usageCount, " test(s). Editing affects future attempts, not submitted results. ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.getAffectedTestNames());
} }
function CreateQuestionComponent_div_31_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 84);
    i0.ɵɵlistener("mousedown", function CreateQuestionComponent_div_31_button_2_Template_button_mousedown_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r33); const training_r31 = restoredCtx.$implicit; const ctx_r32 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r32.selectTrainingFromDropdown(training_r31)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const training_r31 = ctx.$implicit;
    const ctx_r29 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r29.getTrainingLabel(training_r31), " ");
} }
function CreateQuestionComponent_div_31_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85);
    i0.ɵɵtext(1, "No training found");
    i0.ɵɵelementEnd();
} }
function CreateQuestionComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 80)(1, "input", 81);
    i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_div_31_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r35); const ctx_r34 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r34.trainingSearch = $event); })("input", function CreateQuestionComponent_div_31_Template_input_input_1_listener() { i0.ɵɵrestoreView(_r35); const ctx_r36 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r36.onTrainingSearchChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, CreateQuestionComponent_div_31_button_2_Template, 2, 1, "button", 82);
    i0.ɵɵtemplate(3, CreateQuestionComponent_div_31_div_3_Template, 2, 0, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r2.trainingSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredTrainingList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.filteredTrainingList.length);
} }
function CreateQuestionComponent_option_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r37 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r37);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(type_r37);
} }
function CreateQuestionComponent_option_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const difficulty_r38 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", difficulty_r38);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(difficulty_r38);
} }
function CreateQuestionComponent_small_57_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_small_57_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r40); const ctx_r39 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r39.removeMediaFile("questionImageUrl")); });
    i0.ɵɵtext(3, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Selected: ", ctx_r5.getMediaFileName(ctx_r5.form.questionImageUrl), " ");
} }
function CreateQuestionComponent_small_62_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_small_62_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r42); const ctx_r41 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r41.removeMediaFile("audioUrl")); });
    i0.ɵɵtext(3, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Selected: ", ctx_r6.getMediaFileName(ctx_r6.form.audioUrl), " ");
} }
function CreateQuestionComponent_small_67_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_small_67_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r44); const ctx_r43 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r43.removeMediaFile("videoUrl")); });
    i0.ɵɵtext(3, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Selected: ", ctx_r7.getMediaFileName(ctx_r7.form.videoUrl), " ");
} }
function CreateQuestionComponent_small_72_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_small_72_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r46); const ctx_r45 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r45.removeMediaFile("explanationImageUrl")); });
    i0.ɵɵtext(3, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Selected: ", ctx_r8.getMediaFileName(ctx_r8.form.explanationImageUrl), " ");
} }
function CreateQuestionComponent_div_73_div_6_small_6_Template(rf, ctx) { if (rf & 1) {
    const _r53 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_73_div_6_small_6_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r53); const optionIndex_r49 = i0.ɵɵnextContext().index; const ctx_r51 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r51.removeOptionImage(optionIndex_r49)); });
    i0.ɵɵtext(3, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r48 = i0.ɵɵnextContext().$implicit;
    const ctx_r50 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" Selected: ", ctx_r50.getMediaFileName(option_r48.imageUrl), " ");
} }
function CreateQuestionComponent_div_73_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 89)(1, "button", 90);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_73_div_6_Template_button_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r56); const option_r48 = restoredCtx.$implicit; const ctx_r55 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r55.toggleCorrectOption(option_r48.id)); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 91);
    i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_div_73_div_6_Template_input_ngModelChange_3_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r56); const option_r48 = restoredCtx.$implicit; return i0.ɵɵresetView(option_r48.text = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 92);
    i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_div_73_div_6_Template_input_ngModelChange_4_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r56); const option_r48 = restoredCtx.$implicit; return i0.ɵɵresetView(option_r48.imageUrl = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 30);
    i0.ɵɵlistener("change", function CreateQuestionComponent_div_73_div_6_Template_input_change_5_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r56); const optionIndex_r49 = restoredCtx.index; const ctx_r59 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r59.onOptionImageFileSelected(optionIndex_r49, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CreateQuestionComponent_div_73_div_6_small_6_Template, 4, 1, "small", 31);
    i0.ɵɵelementStart(7, "button", 93);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_73_div_6_Template_button_click_7_listener() { const restoredCtx = i0.ɵɵrestoreView(_r56); const optionIndex_r49 = restoredCtx.index; const ctx_r60 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r60.removeOption(optionIndex_r49)); });
    i0.ɵɵtext(8, "Remove");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r48 = ctx.$implicit;
    const optionIndex_r49 = ctx.index;
    const ctx_r47 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("option-check--active", ctx_r47.isCorrectOption(option_r48.id));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r47.getOptionLabel(optionIndex_r49));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", option_r48.text)("name", "optionText" + optionIndex_r49);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", option_r48.imageUrl)("name", "optionImage" + optionIndex_r49);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", option_r48.imageUrl);
} }
function CreateQuestionComponent_div_73_Template(rf, ctx) { if (rf & 1) {
    const _r62 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 87)(1, "div", 11)(2, "h3");
    i0.ɵɵtext(3, "Options");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 12);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_73_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r62); const ctx_r61 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r61.addOption()); });
    i0.ɵɵtext(5, "Add Option");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, CreateQuestionComponent_div_73_div_6_Template, 9, 8, "div", 88);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r9.form.options)("ngForTrackBy", ctx_r9.trackByOption);
} }
function CreateQuestionComponent_div_74_Template(rf, ctx) { if (rf & 1) {
    const _r64 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 87)(1, "h3");
    i0.ɵɵtext(2, "True / False Answer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 94)(4, "button", 90);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_74_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r64); const ctx_r63 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r63.toggleCorrectOption("true")); });
    i0.ɵɵtext(5, "A True");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 90);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_74_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r64); const ctx_r65 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r65.toggleCorrectOption("false")); });
    i0.ɵɵtext(7, "B False");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("option-check--active", ctx_r10.form.correctOptionId === "true");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("option-check--active", ctx_r10.form.correctOptionId === "false");
} }
function CreateQuestionComponent_div_75_Template(rf, ctx) { if (rf & 1) {
    const _r67 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "label", 20);
    i0.ɵɵtext(2, "Expected Answer");
    i0.ɵɵelementStart(3, "textarea", 95);
    i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_div_75_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r66 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r66.form.expectedAnswer = $event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "label", 20);
    i0.ɵɵtext(5, "Sample Answer");
    i0.ɵɵelementStart(6, "textarea", 96);
    i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_div_75_Template_textarea_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r68 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r68.form.sampleAnswer = $event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r11.form.expectedAnswer);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r11.form.sampleAnswer);
} }
function CreateQuestionComponent_div_82_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r70 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(error_r70);
} }
function CreateQuestionComponent_div_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵtemplate(1, CreateQuestionComponent_div_82_p_1_Template, 2, 1, "p", 76);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r12.validationErrors);
} }
function CreateQuestionComponent_strong_113_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r13.mappingMessage);
} }
function CreateQuestionComponent_option_122_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r71 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r71);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(type_r71);
} }
function CreateQuestionComponent_option_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const difficulty_r72 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", difficulty_r72);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(difficulty_r72);
} }
function CreateQuestionComponent_article_136_Template(rf, ctx) { if (rf & 1) {
    const _r76 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 98)(1, "div", 99)(2, "span", 100);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 101)(12, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_article_136_Template_button_click_12_listener() { const restoredCtx = i0.ɵɵrestoreView(_r76); const question_r73 = restoredCtx.$implicit; const ctx_r75 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r75.mapQuestionToTest(question_r73)); });
    i0.ɵɵtext(13, "Map");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_article_136_Template_button_click_14_listener() { const restoredCtx = i0.ɵɵrestoreView(_r76); const question_r73 = restoredCtx.$implicit; const ctx_r77 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r77.editQuestionByItem(question_r73)); });
    i0.ɵɵtext(15, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_article_136_Template_button_click_16_listener() { const restoredCtx = i0.ɵɵrestoreView(_r76); const question_r73 = restoredCtx.$implicit; const ctx_r78 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r78.cloneQuestionByItem(question_r73)); });
    i0.ɵɵtext(17, "Clone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 86);
    i0.ɵɵlistener("click", function CreateQuestionComponent_article_136_Template_button_click_18_listener() { const restoredCtx = i0.ɵɵrestoreView(_r76); const question_r73 = restoredCtx.$implicit; const ctx_r79 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r79.deactivateQuestionByItem(question_r73)); });
    i0.ɵɵtext(19, "Deactivate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 93);
    i0.ɵɵlistener("click", function CreateQuestionComponent_article_136_Template_button_click_20_listener() { const restoredCtx = i0.ɵɵrestoreView(_r76); const question_r73 = restoredCtx.$implicit; const ctx_r80 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r80.deleteQuestionByItem(question_r73)); });
    i0.ɵɵtext(21, "Delete");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const question_r73 = ctx.$implicit;
    const index_r74 = ctx.index;
    const ctx_r16 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((ctx_r16.currentPage - 1) * ctx_r16.pageSize + index_r74 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(question_r73.questionText);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", ctx_r16.getQuestionTrainingLabel(question_r73), " | ", question_r73.subject, " | ", question_r73.topic, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", question_r73.questionType, " | ", question_r73.difficulty, " | ", question_r73.marks || 1, " mark(s) | ", question_r73.isActive === false ? "Inactive" : "Active", "");
} }
function CreateQuestionComponent_div_137_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 102);
    i0.ɵɵtext(1, "No questions found.");
    i0.ɵɵelementEnd();
} }
function CreateQuestionComponent_div_138_Template(rf, ctx) { if (rf & 1) {
    const _r82 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 103)(1, "button", 104);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_138_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r82); const ctx_r81 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r81.prevPage()); });
    i0.ɵɵtext(2, "Prev");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 105);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 104);
    i0.ɵɵlistener("click", function CreateQuestionComponent_div_138_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r82); const ctx_r83 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r83.nextPage()); });
    i0.ɵɵtext(6, "Next");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r18.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("Page ", ctx_r18.currentPage, " of ", ctx_r18.totalPages, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r18.currentPage === ctx_r18.totalPages);
} }
const DEFAULT_QUESTION_MARKS = 1;
const DEFAULT_ESTIMATED_TIME_SECONDS = 60;
const DEFAULT_TEST_NAME = 'Test 1';
export class CreateQuestionComponent {
    constructor(storage, notifier, excelImport, http, dataService, trainingService) {
        this.storage = storage;
        this.notifier = notifier;
        this.excelImport = excelImport;
        this.http = http;
        this.dataService = dataService;
        this.trainingService = trainingService;
        this.questionTypes = ['MCSA', 'MCMA', 'TRUE_FALSE', 'ESSAY'];
        this.difficulties = ['Easy', 'Medium', 'Hard'];
        this.questionBank = [];
        this.trainingList = [];
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.selectedTrainingId = '';
        this.form = this.createEmptyQuestion();
        this.editingIndex = null;
        this.validationErrors = [];
        this.usageInfo = null;
        this.isSaving = false;
        this.pendingQuestionMediaFiles = {};
        this.pendingOptionImageFiles = {};
        this.Destroy$ = new Subject();
        this.searchText = '';
        this.filterTraining = '';
        this.filterSubject = '';
        this.filterTopic = '';
        this.filterType = '';
        this.filterDifficulty = '';
        this.filterMarks = null;
        this.filterActive = 'all';
        this.mappingTestName = 'Test 1';
        this.mappingQuestionNumber = null;
        this.mappingMessage = '';
        this.questionImportDuplicateAction = 'skip';
        this.questionImportFileName = '';
        this.questionImportPreview = null;
        this.questionImportResult = null;
        // Pagination
        this.pageSize = 10;
        this.currentPage = 1;
        this.mediaAssetRoot = 'assets/tests/media';
        this.mediaFolders = {
            images: 'images',
            audios: 'audios',
            videos: 'videos'
        };
    }
    ngOnInit() {
        this.loadQuestionBank();
        this.loadTrainingList();
    }
    ngOnDestroy() {
        this.Destroy$.next();
        this.Destroy$.complete();
    }
    get filteredQuestions() {
        const search = this.searchText.trim().toLowerCase();
        return this.questionBank.filter((question) => {
            const matchesSearch = !search || question.questionText.toLowerCase().includes(search);
            const matchesTraining = !this.filterTraining.trim() || (question.trainingName || '').toLowerCase().includes(this.filterTraining.trim().toLowerCase());
            const matchesSubject = !this.filterSubject.trim() || question.subject.toLowerCase().includes(this.filterSubject.trim().toLowerCase());
            const matchesTopic = !this.filterTopic.trim() || question.topic.toLowerCase().includes(this.filterTopic.trim().toLowerCase());
            const matchesType = !this.filterType || question.questionType === this.filterType;
            const matchesDifficulty = !this.filterDifficulty || question.difficulty === this.filterDifficulty;
            const matchesMarks = !this.filterMarks || (question.marks || 1) === this.filterMarks;
            const matchesActive = this.filterActive === 'all' || (this.filterActive === 'active' ? question.isActive !== false : question.isActive === false);
            return matchesSearch && matchesTraining && matchesSubject && matchesTopic && matchesType && matchesDifficulty && matchesMarks && matchesActive;
        });
    }
    downloadQuestionTemplate() {
        this.storage.downloadBlob(this.excelImport.buildQuestionTemplate(), 'QuestionImportTemplate.xlsx');
    }
    onQuestionExcelSelected(event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        this.questionImportFileName = file.name;
        this.questionImportResult = null;
        this.storage.importQuestionExcelToServer(file);
        this.excelImport.parseQuestionExcel(file, this.questionImportDuplicateAction)
            .then((preview) => (this.questionImportPreview = preview))
            .catch(() => this.notifier.warningToastr('Question Excel file could not be read.'));
        input.value = '';
    }
    confirmQuestionImport() {
        if (!this.questionImportPreview) {
            return;
        }
        this.excelImport.applyQuestionImport(this.questionImportPreview)
            .then((result) => {
            this.questionImportResult = result;
            this.questionImportPreview = null;
            this.loadQuestionBank();
            this.notifier.successToastr('Question Excel import completed.');
        })
            .catch(() => this.notifier.warningToastr('Question Excel import failed.'));
    }
    cancelQuestionImport() {
        this.questionImportPreview = null;
        this.questionImportFileName = '';
    }
    saveQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSaving) {
                return;
            }
            this.validationErrors = this.validateQuestion();
            if (this.validationErrors.length) {
                return;
            }
            this.isSaving = true;
            try {
                yield this.uploadPendingMediaFiles();
                let question = this.buildQuestionFromForm();
                const savedQuestion = yield this.storage.saveQuestionToServer(question);
                const savedServerId = this.getSavedServerQuestionId(savedQuestion);
                if (savedServerId) {
                    question = Object.assign(Object.assign({}, question), { questionId: savedServerId, id: Number(savedServerId) });
                    this.form = Object.assign(Object.assign({}, this.form), { questionId: savedServerId, id: Number(savedServerId) });
                }
                const questionToStore = savedQuestion ? Object.assign(Object.assign(Object.assign({}, question), savedQuestion), { questionId: savedServerId || savedQuestion.questionId || question.questionId, id: savedServerId ? Number(savedServerId) : (savedQuestion.id || question.id) }) : question;
                if (this.editingIndex === null) {
                    this.questionBank = [...this.questionBank, questionToStore];
                }
                else {
                    this.questionBank = this.questionBank.map((item, index) => (index === this.editingIndex ? questionToStore : item));
                }
                this.persistQuestionBank('Question bank saved.', false);
                this.clearForm();
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Question could not be saved.';
                this.validationErrors = [message];
                this.notifier.warningToastr(message);
            }
            finally {
                this.isSaving = false;
            }
        });
    }
    editQuestion(index) {
        const question = this.filteredQuestions[index];
        const bankIndex = this.questionBank.findIndex((item) => this.storage.getQuestionKey(item) === this.storage.getQuestionKey(question));
        this.editingIndex = bankIndex;
        this.clearPendingMediaFiles();
        this.form = this.createEditableQuestion(question);
        this.syncSelectedTrainingFromForm();
        this.validationErrors = [];
        this.loadUsageInfo(question);
    }
    cloneQuestion(index) {
        const source = this.filteredQuestions[index];
        const now = new Date().toISOString();
        const clone = Object.assign(Object.assign({}, source), { id: Date.now(), questionId: `q-${Date.now()}`, questionNo: this.questionBank.length + 1, questionText: `${source.questionText} Copy`, version: 1, createdAt: now, updatedAt: now });
        this.questionBank = [...this.questionBank, clone];
        this.persistQuestionBank('Question cloned.');
    }
    deactivateQuestion(index) {
        const question = this.filteredQuestions[index];
        this.questionBank = this.questionBank.map((item) => this.storage.getQuestionKey(item) === this.storage.getQuestionKey(question) ? Object.assign(Object.assign({}, item), { isActive: false, updatedAt: new Date().toISOString() }) : item);
        this.persistQuestionBank('Question deactivated.');
    }
    mapQuestionToTest(question) {
        if (!question) {
            return;
        }
        if (question.isActive === false) {
            this.notifier.warningToastr('Inactive questions cannot be mapped to a test.');
            return;
        }
        const testName = this.mappingTestName.trim() || DEFAULT_TEST_NAME;
        const questionKey = this.storage.getQuestionKey(question);
        this.mappingMessage = '';
        this.storage.loadAssessment(testName)
            .then((assessment) => {
            var _a;
            const nextAssessment = assessment || this.createDefaultAssessment(testName);
            const existingOrder = ((_a = nextAssessment.questionOrder) === null || _a === void 0 ? void 0 : _a.length) ? nextAssessment.questionOrder : nextAssessment.mappedQuestionIds || [];
            const withoutCurrent = existingOrder.filter((mappedQuestionId) => mappedQuestionId !== questionKey);
            const requestedNumber = this.mappingQuestionNumber && this.mappingQuestionNumber > 0 ? this.mappingQuestionNumber : withoutCurrent.length + 1;
            const insertIndex = Math.min(Math.max(requestedNumber - 1, 0), withoutCurrent.length);
            withoutCurrent.splice(insertIndex, 0, questionKey);
            nextAssessment.mappedQuestionIds = [...withoutCurrent];
            nextAssessment.questionOrder = [...withoutCurrent];
            nextAssessment.totalQuestions = withoutCurrent.length;
            nextAssessment.totalMarks = this.calculateMappedMarks(withoutCurrent);
            nextAssessment.updatedAt = new Date().toISOString();
            return this.storage.saveAssessment(nextAssessment)
                .then(() => this.storage.mapQuestionToTestOnServer(nextAssessment.testId, questionKey, nextAssessment.questionOrder.indexOf(questionKey) + 1))
                .then(() => nextAssessment);
        })
            .then((assessment) => {
            this.mappingMessage = `Question mapped as Q${assessment.questionOrder.indexOf(questionKey) + 1} in ${assessment.displayName || assessment.testName}.`;
            this.notifier.successToastr(this.mappingMessage);
        })
            .catch(() => this.notifier.warningToastr('Question could not be mapped to test.'));
    }
    deleteQuestion(index) {
        const question = this.filteredQuestions[index];
        if (!question) {
            return;
        }
        const questionKey = this.storage.getQuestionKey(question);
        this.storage.getQuestionUsage(questionKey).then((usage) => {
            if (usage.usageCount) {
                this.notifier.warningToastr(`Question is used in ${usage.usageCount} test(s). Please deactivate it instead.`);
                return;
            }
            this.storage.deleteQuestionFromServer(questionKey);
            this.questionBank = this.questionBank.filter((item) => this.storage.getQuestionKey(item) !== questionKey);
            this.persistQuestionBank('Question deleted.');
        });
    }
    clearForm() {
        this.form = this.createEmptyQuestion();
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.selectedTrainingId = '';
        this.editingIndex = null;
        this.validationErrors = [];
        this.usageInfo = null;
        this.clearPendingMediaFiles();
    }
    onQuestionTypeChange() {
        var _a;
        if (this.form.questionType === 'TRUE_FALSE') {
            this.form.options = [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }];
            this.form.correctOptionId = '';
            this.form.correctOptionIds = [];
            return;
        }
        if (this.form.questionType === 'ESSAY') {
            this.form.options = [];
            this.form.correctOptionId = '';
            this.form.correctOptionIds = [];
            return;
        }
        if (!((_a = this.form.options) === null || _a === void 0 ? void 0 : _a.length)) {
            this.form.options = [this.createOption(), this.createOption()];
        }
    }
    addOption() {
        this.form.options = [...(this.form.options || []), this.createOption()];
    }
    removeOption(index) {
        var _a;
        const option = (_a = this.form.options) === null || _a === void 0 ? void 0 : _a[index];
        this.form.options = (this.form.options || []).filter((_item, optionIndex) => optionIndex !== index);
        this.form.correctOptionIds = (this.form.correctOptionIds || []).filter((id) => id !== (option === null || option === void 0 ? void 0 : option.id));
        if (this.form.correctOptionId === (option === null || option === void 0 ? void 0 : option.id)) {
            this.form.correctOptionId = '';
        }
    }
    toggleCorrectOption(optionId) {
        if (this.form.questionType === 'MCMA') {
            const selected = this.form.correctOptionIds || [];
            this.form.correctOptionIds = selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId];
            this.form.correctOptionId = this.form.correctOptionIds[0] || '';
            return;
        }
        this.form.correctOptionId = optionId;
        this.form.correctOptionIds = [optionId];
    }
    isCorrectOption(optionId) {
        var _a;
        return this.form.questionType === 'MCMA' ? !!((_a = this.form.correctOptionIds) === null || _a === void 0 ? void 0 : _a.includes(optionId)) : this.form.correctOptionId === optionId;
    }
    exportQuestionBank() {
        this.storage.exportQuestionBank()
            .then((blob) => this.storage.downloadBlob(blob, 'QuestionBank.json'))
            .catch(() => this.notifier.warningToastr('Question bank export failed.'));
    }
    importQuestionBank(event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        this.storage.importQuestionBank(file)
            .then((questions) => {
            this.questionBank = questions;
            input.value = '';
            this.notifier.successToastr('Question bank imported.');
        })
            .catch(() => this.notifier.warningToastr('Invalid encrypted question bank file.'));
    }
    getAffectedTestNames() {
        var _a, _b;
        return ((_b = (_a = this.usageInfo) === null || _a === void 0 ? void 0 : _a.affectedTests) === null || _b === void 0 ? void 0 : _b.map((test) => test.testName).join(', ')) || '';
    }
    getOptionLabel(index) {
        return String.fromCharCode(65 + index);
    }
    buildMediaAssetPath(folder, fileName) {
        const rawName = fileName.trim().replace(/\\/g, '/').split('/').pop() || fileName;
        const sanitized = rawName
            .trim()
            .replace(/\s+/g, '')
            .replace(/[^a-zA-Z0-9._-]/g, '');
        return `${this.mediaAssetRoot}/${this.mediaFolders[folder]}/${sanitized}`;
    }
    onMediaFileSelected(field, event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
        this.pendingQuestionMediaFiles[field] = file;
        this.form[field] = this.buildMediaAssetPath(folder, file.name);
        input.value = '';
    }
    removeMediaFile(field) {
        delete this.pendingQuestionMediaFiles[field];
        this.form[field] = '';
    }
    onOptionImageFileSelected(optionIndex, event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        this.pendingOptionImageFiles[optionIndex] = file;
        this.setOptionImage(optionIndex, this.buildMediaAssetPath('images', file.name));
        input.value = '';
    }
    removeOptionImage(optionIndex) {
        delete this.pendingOptionImageFiles[optionIndex];
        this.setOptionImage(optionIndex, '');
    }
    setOptionImage(optionIndex, imageUrl) {
        this.form.options = (this.form.options || []).map((option, index) => index === optionIndex ? Object.assign(Object.assign({}, option), { imageUrl }) : option);
    }
    uploadPendingMediaFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const mediaFields = Object.entries(this.pendingQuestionMediaFiles);
            for (const [field, file] of mediaFields) {
                const mediaType = field === 'audioUrl' ? 'audio' : field === 'videoUrl' ? 'video' : 'image';
                const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
                const fallbackPath = this.buildMediaAssetPath(folder, file.name);
                const uploadedPath = yield this.storage.uploadMediaFile(mediaType, file, 'question');
                this.form[field] = uploadedPath || fallbackPath;
            }
            for (const [indexKey, file] of Object.entries(this.pendingOptionImageFiles)) {
                const optionIndex = Number(indexKey);
                const fallbackPath = this.buildMediaAssetPath('images', file.name);
                const uploadedPath = yield this.storage.uploadMediaFile('image', file, 'answer');
                this.setOptionImage(optionIndex, uploadedPath || fallbackPath);
            }
        });
    }
    clearPendingMediaFiles() {
        this.pendingQuestionMediaFiles = {};
        this.pendingOptionImageFiles = {};
    }
    getMediaFileName(url) {
        return url.trim().replace(/\\/g, '/').split('/').pop() || url;
    }
    trackByQuestion(_index, question) {
        var _a, _b;
        // Guard against cases where `storage` may be unavailable during change detection.
        // Fall back to stable identifiers on the question so trackBy never throws.
        const key = (_b = (_a = this.storage) === null || _a === void 0 ? void 0 : _a.getQuestionKey) === null || _b === void 0 ? void 0 : _b.call(_a, question);
        if (key)
            return key;
        return (question === null || question === void 0 ? void 0 : question.questionId) || String(question === null || question === void 0 ? void 0 : question.id) || String(_index);
    }
    trackByOption(_index, option) {
        return option.id;
    }
    get totalPages() {
        return Math.max(1, Math.ceil(this.filteredQuestions.length / this.pageSize));
    }
    get pagedQuestions() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredQuestions.slice(start, start + this.pageSize);
    }
    prevPage() {
        if (this.currentPage > 1)
            this.currentPage--;
    }
    nextPage() {
        if (this.currentPage < this.totalPages)
            this.currentPage++;
    }
    goToPage(page) {
        if (page >= 1 && page <= this.totalPages)
            this.currentPage = page;
    }
    // Helpers that operate by question object so pagination indices are irrelevant
    editQuestionByItem(question) {
        const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
        if (index > -1)
            this.editQuestion(index);
    }
    cloneQuestionByItem(question) {
        const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
        if (index > -1)
            this.cloneQuestion(index);
    }
    deactivateQuestionByItem(question) {
        const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
        if (index > -1)
            this.deactivateQuestion(index);
    }
    deleteQuestionByItem(question) {
        const index = this.filteredQuestions.findIndex((q) => this.storage.getQuestionKey(q) === this.storage.getQuestionKey(question));
        if (index > -1)
            this.deleteQuestion(index);
    }
    getSavedServerQuestionId(savedQuestion) {
        var _a, _b;
        const saved = (_a = savedQuestion === null || savedQuestion === void 0 ? void 0 : savedQuestion.data) !== null && _a !== void 0 ? _a : savedQuestion;
        const questionId = (_b = saved === null || saved === void 0 ? void 0 : saved.questionId) !== null && _b !== void 0 ? _b : saved === null || saved === void 0 ? void 0 : saved.id;
        const serverId = String(questionId !== null && questionId !== void 0 ? questionId : '');
        return /^[0-9]+$/.test(serverId) ? serverId : '';
    }
    createDefaultAssessment(testName) {
        const displayName = testName.trim() || DEFAULT_TEST_NAME;
        const now = new Date().toISOString();
        return {
            testId: `test-${this.storage.normalizeFileName(displayName)}`,
            testName: displayName,
            displayName,
            fileName: this.storage.normalizeFileName(displayName),
            testTitle: displayName,
            description: '',
            subject: '',
            topic: '',
            durationMinutes: 30,
            passingPercentage: 60,
            instructions: '',
            status: 'Active',
            mappedQuestionIds: [],
            questionOrder: [],
            totalQuestions: 0,
            totalMarks: 0,
            createdAt: now,
            updatedAt: now,
            version: 1
        };
    }
    calculateMappedMarks(questionIds) {
        return questionIds.reduce((total, questionId) => {
            const question = this.questionBank.find((item) => this.storage.getQuestionKey(item) === questionId);
            return total + ((question === null || question === void 0 ? void 0 : question.marks) && question.marks > 0 ? question.marks : 1);
        }, 0);
    }
    loadQuestionBank() {
        this.storage.loadQuestionBank(TEST_QUESTIONS)
            .then((questions) => (this.questionBank = questions))
            .catch(() => this.notifier.warningToastr('Question bank could not be loaded.'));
    }
    loadUsageInfo(question) {
        this.storage.getQuestionUsage(this.storage.getQuestionKey(question)).then((usage) => (this.usageInfo = usage));
    }
    persistQuestionBank(message, syncServer = true) {
        const savePromise = syncServer
            ? this.storage.saveQuestionBank(this.questionBank)
            : this.storage.saveQuestionBankLocallyOnly(this.questionBank);
        savePromise
            .then(() => this.notifier.successToastr(message))
            .catch(() => this.notifier.warningToastr('Question bank could not be saved locally.'));
    }
    onTrainingSelected(trainingId) {
        var _a;
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '') === String(trainingId); });
        this.selectedTrainingId = trainingId;
        this.form.trainingId = selected ? String((_a = selected.trainingId) !== null && _a !== void 0 ? _a : '') : '';
        this.form.trainingName = (selected === null || selected === void 0 ? void 0 : selected.trainingName) || '';
        this.trainingSearch = selected ? this.getTrainingLabel(selected) : '';
    }
    loadTrainingList() {
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
        //       this.trainingList = trainings
        //         .map((training: any) => this.mapTrainingFromAsset(training))
        //         .sort((a: Training, b: Training) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
        //       this.syncSelectedTrainingFromForm();
        //     },
        //     error: () => {
        //       this.trainingList = [];
        //       this.syncSelectedTrainingFromForm();
        //     }
        //   });
        // Future API integration: call this block instead of the asset request above.
        this.trainingService.getPaged(1, 100).pipe(takeUntil(this.Destroy$)).subscribe({
            next: (response) => {
                this.trainingList = (response.items || [])
                    .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
                this.syncSelectedTrainingFromForm();
            },
            error: (error) => {
                console.error('Failed to load training data.', { status: error.status });
                this.trainingList = [];
                this.syncSelectedTrainingFromForm();
            }
        });
    }
    mapTrainingFromAsset(training) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        return {
            trainingId: (_e = (_d = (_c = (_b = (_a = training.trainingId) !== null && _a !== void 0 ? _a : training.TrainingId) !== null && _b !== void 0 ? _b : training.TrainingID) !== null && _c !== void 0 ? _c : training.Id) !== null && _d !== void 0 ? _d : training.id) !== null && _e !== void 0 ? _e : '',
            trainingName: (_h = (_g = (_f = training.trainingName) !== null && _f !== void 0 ? _f : training.TrainingName) !== null && _g !== void 0 ? _g : training.Name) !== null && _h !== void 0 ? _h : '',
            trainingDesc: (_l = (_k = (_j = training.trainingDesc) !== null && _j !== void 0 ? _j : training.TrainingDesc) !== null && _k !== void 0 ? _k : training.Description) !== null && _l !== void 0 ? _l : '',
            topicCovered: (_p = (_o = (_m = training.topicCovered) !== null && _m !== void 0 ? _m : training.TopicCovered) !== null && _o !== void 0 ? _o : training.TopicCoveredName) !== null && _p !== void 0 ? _p : '',
            displayName: (_s = (_r = (_q = training.displayName) !== null && _q !== void 0 ? _q : training.DisplayName) !== null && _r !== void 0 ? _r : training.TrainingName) !== null && _s !== void 0 ? _s : '',
            image: (_u = (_t = training.image) !== null && _t !== void 0 ? _t : training.Image) !== null && _u !== void 0 ? _u : '',
            displayOrder: Number((_w = (_v = training.displayOrder) !== null && _v !== void 0 ? _v : training.DisplayOrder) !== null && _w !== void 0 ? _w : 0)
        };
    }
    get filteredTrainingList() {
        const search = this.trainingSearch.trim().toLowerCase();
        if (!search) {
            return this.trainingList;
        }
        return this.trainingList.filter((training) => {
            const label = this.getTrainingLabel(training).toLowerCase();
            const id = String(training.trainingId || '').toLowerCase();
            const topicCovered = (training.topicCovered || '').toLowerCase();
            return label.includes(search) || id.includes(search) || topicCovered.includes(search);
        });
    }
    getTrainingLabel(training) {
        return training.displayName || training.trainingName || String(training.trainingId || 'Training');
    }
    getQuestionTrainingLabel(question) {
        const training = this.trainingList.find((item) => { var _a, _b; return String((_a = item.trainingId) !== null && _a !== void 0 ? _a : '') === String((_b = question.trainingId) !== null && _b !== void 0 ? _b : ''); });
        return training ? this.getTrainingLabel(training) : (question.trainingName || 'No training');
    }
    openTrainingDropdown() {
        this.isTrainingDropdownOpen = true;
    }
    onTrainingSearchChange() {
        this.isTrainingDropdownOpen = true;
    }
    selectTrainingFromDropdown(training) {
        var _a;
        const trainingId = String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '');
        this.onTrainingSelected(trainingId);
        this.trainingSearch = this.getTrainingLabel(training);
        this.isTrainingDropdownOpen = false;
    }
    getSelectedTrainingLabel() {
        if (!this.selectedTrainingId) {
            return 'Select Training';
        }
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '') === String(this.selectedTrainingId); });
        return selected ? this.getTrainingLabel(selected) : 'Select Training';
    }
    toggleTrainingDropdown() {
        this.isTrainingDropdownOpen = !this.isTrainingDropdownOpen;
        if (this.isTrainingDropdownOpen) {
            this.trainingSearch = '';
        }
    }
    syncSelectedTrainingFromForm() {
        const trainingId = String(this.form.trainingId || '');
        this.selectedTrainingId = trainingId;
        if (!trainingId) {
            return;
        }
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '') === trainingId; });
        if (selected) {
            this.form.trainingName = selected.trainingName;
            this.trainingSearch = this.getTrainingLabel(selected);
        }
    }
    getValueOrNA(value) {
        const trimmed = (value || '').trim();
        return trimmed || 'NA';
    }
    validateQuestion() {
        var _a, _b, _c, _d, _e;
        const errors = [];
        const options = this.form.options || [];
        const validOptions = options.filter((option) => option.text.trim());
        if (!((_a = this.form.trainingName) === null || _a === void 0 ? void 0 : _a.trim()) && !((_b = this.form.trainingId) === null || _b === void 0 ? void 0 : _b.trim()))
            errors.push('Training is required.');
        if (!this.form.questionType)
            errors.push('Question type is required.');
        if (!this.form.questionText.trim())
            errors.push('Question text is required.');
        if (this.form.questionType === 'MCSA' && (validOptions.length < 2 || !this.form.correctOptionId))
            errors.push('MCSA requires at least 2 options and exactly 1 correct option.');
        if (this.form.questionType === 'MCMA' && (validOptions.length < 2 || !((_c = this.form.correctOptionIds) === null || _c === void 0 ? void 0 : _c.length)))
            errors.push('MCMA requires at least 2 options and at least 1 correct option.');
        if (this.form.questionType === 'TRUE_FALSE' && !this.form.correctOptionId)
            errors.push('Select the correct True / False answer.');
        if (this.form.questionType === 'ESSAY' && !((_d = this.form.expectedAnswer) === null || _d === void 0 ? void 0 : _d.trim()) && !((_e = this.form.sampleAnswer) === null || _e === void 0 ? void 0 : _e.trim()))
            errors.push('Essay requires expected answer or sample answer.');
        return errors;
    }
    createEmptyQuestion() {
        return {
            id: 0,
            questionId: '',
            questionNo: this.questionBank.length + 1,
            trainingId: '',
            trainingName: '',
            subject: 'NA',
            topic: 'NA',
            questionType: 'MCSA',
            difficulty: 'Easy',
            questionText: '',
            questionImageUrl: '',
            questionImageAlt: '',
            audioUrl: '',
            videoUrl: '',
            options: [this.createOption(), this.createOption()],
            correctOptionId: '',
            correctOptionIds: [],
            expectedAnswer: '',
            sampleAnswer: '',
            explanation: '',
            explanationImageUrl: '',
            explanationImageAlt: '',
            marks: DEFAULT_QUESTION_MARKS,
            negativeMarks: 0,
            estimatedTimeSeconds: DEFAULT_ESTIMATED_TIME_SECONDS,
            isActive: true,
            version: 1
        };
    }
    createEditableQuestion(question) {
        return Object.assign(Object.assign({}, question), { subject: question.subject || 'NA', topic: question.topic || 'NA', options: (question.options || []).map((option) => (Object.assign({}, option))) });
    }
    buildQuestionFromForm() {
        const now = new Date().toISOString();
        return Object.assign(Object.assign({}, this.form), { questionId: this.form.questionId || `q-${Date.now()}`, id: this.form.id || Date.now(), subject: this.getValueOrNA(this.form.subject), topic: this.getValueOrNA(this.form.topic), marks: this.getValidMarks(this.form.marks), estimatedTimeSeconds: this.getValidDuration(this.form.estimatedTimeSeconds), isActive: this.form.isActive !== false, version: (this.form.version || 0) + (this.editingIndex === null ? 1 : 1), createdAt: this.form.createdAt || now, updatedAt: now });
    }
    getValidMarks(value) {
        return value && value > 0 ? value : DEFAULT_QUESTION_MARKS;
    }
    getValidDuration(value) {
        return value && value > 0 ? value : DEFAULT_ESTIMATED_TIME_SECONDS;
    }
    createOption() {
        return { id: `option-${Date.now()}-${Math.round(Math.random() * 10000)}`, text: '', imageUrl: '' };
    }
}
CreateQuestionComponent.ɵfac = function CreateQuestionComponent_Factory(t) { return new (t || CreateQuestionComponent)(i0.ɵɵdirectiveInject(i1.TestStorageService), i0.ɵɵdirectiveInject(i2.NotifierService), i0.ɵɵdirectiveInject(i3.TestExcelImportService), i0.ɵɵdirectiveInject(i4.HttpClient), i0.ɵɵdirectiveInject(i5.DataService), i0.ɵɵdirectiveInject(i6.TrainingManagementService)); };
CreateQuestionComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateQuestionComponent, selectors: [["app-create-question"]], decls: 139, vars: 51, consts: [[1, "admin-section", "create-question-section"], [1, "container", "admin-shell", "create-question-shell"], [1, "admin-header"], [1, "auth-eyebrow"], [1, "admin-actions"], ["routerLink", "/admin/create-test", 1, "btn", "btn-outline"], [1, "btn", "btn-outline", "import-btn"], ["type", "file", "accept", ".xlsx,.xls,.csv", 3, "change"], ["class", "admin-table-wrap import-preview-panel", 4, "ngIf"], [1, "question-admin-layout"], [1, "admin-form", "question-form-card"], [1, "section-title-row"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["class", "usage-warning", 4, "ngIf"], [1, "form-grid", "form-grid--three"], [1, "form-field", "training-search-field"], [1, "training-search-control"], ["type", "button", "aria-haspopup", "listbox", 1, "btn", "btn-outline", "btn-small", "training-dropdown-toggle", 3, "click"], [1, "dropdown-icon"], ["class", "training-search-menu", "role", "listbox", 4, "ngIf"], [1, "form-field"], ["name", "questionType", 3, "ngModel", "ngModelChange"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["name", "difficulty", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "1", "name", "marks", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "0", "name", "negativeMarks", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "1", "name", "estimatedTimeSeconds", 3, "ngModel", "ngModelChange"], ["rows", "4", "name", "questionText", 3, "ngModel", "ngModelChange"], [1, "form-grid", "form-grid--two"], ["type", "text", "name", "questionImageUrl", 3, "ngModel", "ngModelChange"], ["type", "file", "accept", "image/*", 3, "change"], [4, "ngIf"], ["type", "text", "name", "audioUrl", 3, "ngModel", "ngModelChange"], ["type", "file", "accept", "audio/*", 3, "change"], ["type", "text", "name", "videoUrl", 3, "ngModel", "ngModelChange"], ["type", "file", "accept", "video/*", 3, "change"], ["type", "text", "name", "explanationImageUrl", 3, "ngModel", "ngModelChange"], ["class", "option-editor", 4, "ngIf"], ["class", "form-grid form-grid--two", 4, "ngIf"], ["rows", "4", "name", "explanation", 3, "ngModel", "ngModelChange"], [1, "check-row"], ["type", "checkbox", "name", "isActive", 3, "ngModel", "ngModelChange"], ["class", "validation-list", 4, "ngIf"], [1, "admin-actions", "editor-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [1, "admin-tools", "question-bank-tools"], [1, "summary-strip"], [1, "map-test-panel"], ["type", "text", "name", "mappingTestName", "placeholder", "Test 1", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "1", "name", "mappingQuestionNumber", "placeholder", "Auto / append", 3, "ngModel", "ngModelChange"], [1, "bank-filters"], ["type", "text", "placeholder", "Search question", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Training", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Subject", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Topic", 3, "ngModel", "ngModelChange"], [3, "ngModel", "ngModelChange"], [3, "ngValue"], ["type", "number", "placeholder", "Marks", 3, "ngModel", "ngModelChange"], ["value", "all"], ["value", "active"], ["value", "inactive"], [1, "admin-table-wrap", "question-list-panel"], ["class", "question-list-item", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "empty-state", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], [1, "admin-table-wrap", "import-preview-panel"], [1, "form-field", "duplicate-field"], ["name", "questionImportDuplicateAction", 3, "ngModel", "ngModelChange"], ["value", "skip"], ["value", "update"], ["value", "clone"], ["class", "file-note", 4, "ngIf"], [1, "import-file-name"], [1, "import-summary-grid"], [1, "import-table-wrap"], [1, "import-table"], [4, "ngFor", "ngForOf"], [1, "admin-actions", "page-actions"], [1, "file-note"], [1, "usage-warning"], ["role", "listbox", 1, "training-search-menu"], ["type", "text", "name", "trainingSearch", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelChange", "input"], ["class", "training-search-option", "type", "button", "role", "option", 3, "mousedown", 4, "ngFor", "ngForOf"], ["class", "training-search-empty", 4, "ngIf"], ["type", "button", "role", "option", 1, "training-search-option", 3, "mousedown"], [1, "training-search-empty"], ["type", "button", 1, "table-link", 3, "click"], [1, "option-editor"], ["class", "option-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "option-row"], ["type", "button", 1, "option-check", 3, "click"], ["type", "text", "placeholder", "Option text", 3, "ngModel", "name", "ngModelChange"], ["type", "text", "placeholder", "Image URL", 3, "ngModel", "name", "ngModelChange"], ["type", "button", 1, "table-link", "table-link--danger", 3, "click"], [1, "true-false-row"], ["rows", "4", "name", "expectedAnswer", 3, "ngModel", "ngModelChange"], ["rows", "4", "name", "sampleAnswer", 3, "ngModel", "ngModelChange"], [1, "validation-list"], [1, "question-list-item"], [1, "question-left"], [1, "question-number-badge"], [1, "row-actions"], [1, "empty-state"], [1, "pagination"], ["type", "button", 1, "btn", "btn-outline", 3, "disabled", "click"], [1, "pagination-info"]], template: function CreateQuestionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Create / Edit Questions");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div", 4)(9, "a", 5);
        i0.ɵɵtext(10, "Create Test");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "label", 6);
        i0.ɵɵtext(12, "Import From Excel");
        i0.ɵɵelementStart(13, "input", 7);
        i0.ɵɵlistener("change", function CreateQuestionComponent_Template_input_change_13_listener($event) { return ctx.onQuestionExcelSelected($event); });
        i0.ɵɵelementEnd()()()();
        i0.ɵɵtemplate(14, CreateQuestionComponent_section_14_Template, 18, 3, "section", 8);
        i0.ɵɵelementStart(15, "div", 9)(16, "section", 10)(17, "div", 11)(18, "h2");
        i0.ɵɵtext(19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "button", 12);
        i0.ɵɵlistener("click", function CreateQuestionComponent_Template_button_click_20_listener() { return ctx.clearForm(); });
        i0.ɵɵtext(21, "Clear");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(22, CreateQuestionComponent_div_22_Template, 3, 2, "div", 13);
        i0.ɵɵelementStart(23, "div", 14)(24, "label", 15);
        i0.ɵɵtext(25, " Training ");
        i0.ɵɵelementStart(26, "div", 16)(27, "button", 17);
        i0.ɵɵlistener("click", function CreateQuestionComponent_Template_button_click_27_listener() { return ctx.toggleTrainingDropdown(); });
        i0.ɵɵtext(28);
        i0.ɵɵelementStart(29, "span", 18);
        i0.ɵɵtext(30, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(31, CreateQuestionComponent_div_31_Template, 4, 3, "div", 19);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(32, "label", 20);
        i0.ɵɵtext(33, "Question Type");
        i0.ɵɵelementStart(34, "select", 21);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_select_ngModelChange_34_listener($event) { return ctx.form.questionType = $event; })("ngModelChange", function CreateQuestionComponent_Template_select_ngModelChange_34_listener() { return ctx.onQuestionTypeChange(); });
        i0.ɵɵtemplate(35, CreateQuestionComponent_option_35_Template, 2, 2, "option", 22);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(36, "label", 20);
        i0.ɵɵtext(37, "Difficulty");
        i0.ɵɵelementStart(38, "select", 23);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_select_ngModelChange_38_listener($event) { return ctx.form.difficulty = $event; });
        i0.ɵɵtemplate(39, CreateQuestionComponent_option_39_Template, 2, 2, "option", 22);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(40, "label", 20);
        i0.ɵɵtext(41, "Marks");
        i0.ɵɵelementStart(42, "input", 24);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_42_listener($event) { return ctx.form.marks = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(43, "label", 20);
        i0.ɵɵtext(44, "Negative Marks");
        i0.ɵɵelementStart(45, "input", 25);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_45_listener($event) { return ctx.form.negativeMarks = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(46, "label", 20);
        i0.ɵɵtext(47, "Estimated Time");
        i0.ɵɵelementStart(48, "input", 26);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_48_listener($event) { return ctx.form.estimatedTimeSeconds = $event; });
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(49, "label", 20);
        i0.ɵɵtext(50, "Question Text");
        i0.ɵɵelementStart(51, "textarea", 27);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_textarea_ngModelChange_51_listener($event) { return ctx.form.questionText = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(52, "div", 28)(53, "label", 20);
        i0.ɵɵtext(54, " Question Image URL ");
        i0.ɵɵelementStart(55, "input", 29);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_55_listener($event) { return ctx.form.questionImageUrl = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "input", 30);
        i0.ɵɵlistener("change", function CreateQuestionComponent_Template_input_change_56_listener($event) { return ctx.onMediaFileSelected("questionImageUrl", $event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(57, CreateQuestionComponent_small_57_Template, 4, 1, "small", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(58, "label", 20);
        i0.ɵɵtext(59, " Audio URL ");
        i0.ɵɵelementStart(60, "input", 32);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_60_listener($event) { return ctx.form.audioUrl = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(61, "input", 33);
        i0.ɵɵlistener("change", function CreateQuestionComponent_Template_input_change_61_listener($event) { return ctx.onMediaFileSelected("audioUrl", $event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(62, CreateQuestionComponent_small_62_Template, 4, 1, "small", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(63, "label", 20);
        i0.ɵɵtext(64, " Video URL ");
        i0.ɵɵelementStart(65, "input", 34);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_65_listener($event) { return ctx.form.videoUrl = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(66, "input", 35);
        i0.ɵɵlistener("change", function CreateQuestionComponent_Template_input_change_66_listener($event) { return ctx.onMediaFileSelected("videoUrl", $event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(67, CreateQuestionComponent_small_67_Template, 4, 1, "small", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(68, "label", 20);
        i0.ɵɵtext(69, " Explanation Image URL ");
        i0.ɵɵelementStart(70, "input", 36);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_70_listener($event) { return ctx.form.explanationImageUrl = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "input", 30);
        i0.ɵɵlistener("change", function CreateQuestionComponent_Template_input_change_71_listener($event) { return ctx.onMediaFileSelected("explanationImageUrl", $event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(72, CreateQuestionComponent_small_72_Template, 4, 1, "small", 31);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(73, CreateQuestionComponent_div_73_Template, 7, 2, "div", 37);
        i0.ɵɵtemplate(74, CreateQuestionComponent_div_74_Template, 8, 4, "div", 37);
        i0.ɵɵtemplate(75, CreateQuestionComponent_div_75_Template, 7, 2, "div", 38);
        i0.ɵɵelementStart(76, "label", 20);
        i0.ɵɵtext(77, "Explanation");
        i0.ɵɵelementStart(78, "textarea", 39);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_textarea_ngModelChange_78_listener($event) { return ctx.form.explanation = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(79, "label", 40)(80, "input", 41);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_80_listener($event) { return ctx.form.isActive = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtext(81, " Active");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(82, CreateQuestionComponent_div_82_Template, 2, 1, "div", 42);
        i0.ɵɵelementStart(83, "div", 43)(84, "button", 44);
        i0.ɵɵlistener("click", function CreateQuestionComponent_Template_button_click_84_listener() { return ctx.saveQuestion(); });
        i0.ɵɵtext(85);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(86, "button", 12);
        i0.ɵɵlistener("click", function CreateQuestionComponent_Template_button_click_86_listener() { return ctx.clearForm(); });
        i0.ɵɵtext(87, "Cancel");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(88, "aside", 45)(89, "h2");
        i0.ɵɵtext(90, "Question Bank");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(91, "div", 46)(92, "div")(93, "strong");
        i0.ɵɵtext(94);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(95, "span");
        i0.ɵɵtext(96, "Showing");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(97, "div")(98, "strong");
        i0.ɵɵtext(99);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(100, "span");
        i0.ɵɵtext(101, "Total");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(102, "div", 47)(103, "h3");
        i0.ɵɵtext(104, "Map Question to Test");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(105, "label", 20);
        i0.ɵɵtext(106, "Test Name");
        i0.ɵɵelementStart(107, "input", 48);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_107_listener($event) { return ctx.mappingTestName = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(108, "label", 20);
        i0.ɵɵtext(109, "Question Number");
        i0.ɵɵelementStart(110, "input", 49);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_110_listener($event) { return ctx.mappingQuestionNumber = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(111, "p");
        i0.ɵɵtext(112, "Use the Map button on any question below. Existing mapped question is moved to the selected number.");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(113, CreateQuestionComponent_strong_113_Template, 2, 1, "strong", 31);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(114, "div", 50)(115, "input", 51);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_115_listener($event) { return ctx.searchText = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(116, "input", 52);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_116_listener($event) { return ctx.filterTraining = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(117, "input", 53);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_117_listener($event) { return ctx.filterSubject = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(118, "input", 54);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_118_listener($event) { return ctx.filterTopic = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(119, "select", 55);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_select_ngModelChange_119_listener($event) { return ctx.filterType = $event; });
        i0.ɵɵelementStart(120, "option", 56);
        i0.ɵɵtext(121, "All Types");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(122, CreateQuestionComponent_option_122_Template, 2, 2, "option", 22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(123, "select", 55);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_select_ngModelChange_123_listener($event) { return ctx.filterDifficulty = $event; });
        i0.ɵɵelementStart(124, "option", 56);
        i0.ɵɵtext(125, "All Difficulty");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(126, CreateQuestionComponent_option_126_Template, 2, 2, "option", 22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(127, "input", 57);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_input_ngModelChange_127_listener($event) { return ctx.filterMarks = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(128, "select", 55);
        i0.ɵɵlistener("ngModelChange", function CreateQuestionComponent_Template_select_ngModelChange_128_listener($event) { return ctx.filterActive = $event; });
        i0.ɵɵelementStart(129, "option", 58);
        i0.ɵɵtext(130, "All Status");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(131, "option", 59);
        i0.ɵɵtext(132, "Active");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(133, "option", 60);
        i0.ɵɵtext(134, "Inactive");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(135, "section", 61);
        i0.ɵɵtemplate(136, CreateQuestionComponent_article_136_Template, 22, 9, "article", 62);
        i0.ɵɵtemplate(137, CreateQuestionComponent_div_137_Template, 2, 0, "div", 63);
        i0.ɵɵtemplate(138, CreateQuestionComponent_div_138_Template, 7, 4, "div", 64);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("ngIf", ctx.questionImportPreview || ctx.questionImportResult);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.editingIndex === null ? "Add Question" : "Edit Question");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.usageInfo == null ? null : ctx.usageInfo.usageCount);
        i0.ɵɵadvance(5);
        i0.ɵɵattribute("aria-expanded", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.getSelectedTrainingLabel(), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.questionType);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.questionTypes);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.difficulty);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.difficulties);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.marks);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.negativeMarks);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.estimatedTimeSeconds);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.questionText);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngModel", ctx.form.questionImageUrl);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.form.questionImageUrl);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.audioUrl);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.form.audioUrl);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.videoUrl);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.form.videoUrl);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.explanationImageUrl);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.form.explanationImageUrl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.form.questionType === "MCSA" || ctx.form.questionType === "MCMA");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.form.questionType === "TRUE_FALSE");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.form.questionType === "ESSAY");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.form.explanation);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.form.isActive);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.validationErrors.length);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", ctx.isSaving);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.isSaving ? "Saving..." : ctx.editingIndex === null ? "Save Question" : "Update Question Bank");
        i0.ɵɵadvance(9);
        i0.ɵɵtextInterpolate(ctx.filteredQuestions.length);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.questionBank.length);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngModel", ctx.mappingTestName);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.mappingQuestionNumber);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.mappingMessage);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.searchText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterTraining);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterSubject);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterTopic);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterType);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", "");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.questionTypes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterDifficulty);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", "");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.difficulties);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterMarks);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.filterActive);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngForOf", ctx.pagedQuestions)("ngForTrackBy", ctx.trackByQuestion);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.filteredQuestions.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredQuestions.length);
    } }, dependencies: [i7.NgForOf, i7.NgIf, i8.RouterLinkWithHref, i9.NgSelectOption, i9.ɵNgSelectMultipleOption, i9.DefaultValueAccessor, i9.NumberValueAccessor, i9.CheckboxControlValueAccessor, i9.SelectControlValueAccessor, i9.NgControlStatus, i9.MinValidator, i9.NgModel], styles: [".create-question-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.question-admin-layout[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.form-grid--three[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.form-grid--two[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.section-title-row[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n}\n\n.section-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .section-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.import-btn[_ngcontent-%COMP%] {\n  cursor: pointer;\n  margin: 0;\n  position: relative;\n}\n\n.import-btn[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  height: 1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n}\n\n.usage-warning[_ngcontent-%COMP%], .validation-list[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n  border-radius: var(--radius-sm);\n  padding: 1rem;\n}\n\n.usage-warning[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  border: 1px solid #fed7aa;\n  color: #9a3412;\n  display: grid;\n  gap: 0.35rem;\n  font-weight: 700;\n}\n\n.validation-list[_ngcontent-%COMP%] {\n  background: #fff4f2;\n  border: 1px solid #f9d2cc;\n  color: #b42318;\n}\n\n.validation-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.4rem;\n}\n\n.validation-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.option-editor[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--gray-light-mid);\n  display: grid;\n  gap: 1rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n}\n\n.option-row[_ngcontent-%COMP%] {\n  align-items: center;\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: 44px minmax(0, 1fr) minmax(0, 1fr) auto;\n}\n\n.option-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .bank-filters[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .bank-filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  padding: 0.8rem 0.9rem;\n  width: 100%;\n}\n\n.option-check[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid var(--primary);\n  border-radius: var(--radius-sm);\n  color: var(--primary);\n  cursor: pointer;\n  display: inline-flex;\n  font-weight: 800;\n  justify-content: center;\n  min-height: 42px;\n  padding: 0 0.75rem;\n}\n\n.option-check--active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: #ffffff;\n}\n\n.true-false-row[_ngcontent-%COMP%], .row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.summary-strip[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin-bottom: 1rem;\n}\n\n.summary-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.summary-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  display: block;\n  font-size: 1.35rem;\n}\n\n.summary-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--gray-mid);\n}\n\n.bank-filters[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.question-list-panel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  padding: 1.5rem;\n}\n\n.question-list-item[_ngcontent-%COMP%] {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n  padding: 1rem;\n}\n\n.question-list-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.question-left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.question-number-badge[_ngcontent-%COMP%] {\n  align-items: center;\n  background: var(--bg-light);\n  border: 1px solid var(--blue-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--primary) !important;\n  display: inline-flex !important;\n  flex: 0 0 44px;\n  height: 44px;\n  justify-content: center;\n  font-weight: 800;\n}\n\n.table-link--danger[_ngcontent-%COMP%] {\n  color: #b42318;\n}\n\n.editor-actions[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n\n.pagination[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n  margin-top: 1rem;\n}\n\n.pagination[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: var(--radius-sm);\n  height: 40px;\n  min-width: 40px;\n  padding: 0 0.6rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.pagination-info[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--gray-mid);\n}\n\n@media (max-width: 991px) {\n  .question-admin-layout[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%], .form-grid--three[_ngcontent-%COMP%], .form-grid--two[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .section-title-row[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%], .editor-actions[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .option-row[_ngcontent-%COMP%], .summary-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .option-check[_ngcontent-%COMP%], .editor-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.map-test-panel[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: grid;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n  padding: 1rem;\n}\n\n.map-test-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-size: 1rem;\n  margin: 0;\n}\n\n.map-test-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--gray-mid);\n  font-size: 0.92rem;\n  margin: 0;\n}\n\n.map-test-panel[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-size: 0.92rem;\n}\n\n.import-preview-panel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  padding: 1.5rem;\n}\n\n.import-file-name[_ngcontent-%COMP%] {\n  color: var(--gray-mid);\n  margin: 0;\n}\n\n.import-summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .import-summary-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-size: 1.25rem;\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--gray-mid);\n}\n\n.import-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.import-table[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n  min-width: 720px;\n  width: 100%;\n}\n\n.import-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .import-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--gray-light-mid);\n  color: var(--gray-dark-mid);\n  padding: 0.75rem;\n  text-align: left;\n  vertical-align: top;\n}\n\n.import-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-weight: 800;\n}\n\n.duplicate-field[_ngcontent-%COMP%] {\n  min-width: 220px;\n}\n\n@media (max-width: 991px) {\n  .import-summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 640px) {\n  .import-summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.training-search-field[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 30;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  max-height: 220px;\n  overflow-y: auto;\n  border: 1px solid rgba(17, 24, 39, 0.14);\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);\n}\n\n.training-search-option[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 10px 12px;\n  text-align: left;\n  color: #111827;\n  cursor: pointer;\n}\n\n.training-search-option[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n}\n\n.training-search-empty[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  color: #6b7280;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow:\n    0 18px 45px rgba(15, 23, 42, 0.18),\n    0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: \"\";\n  transform: rotate(45deg);\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    color 150ms ease,\n    background 150ms ease,\n    transform 150ms ease;\n}\n\n.training-search-option[_ngcontent-%COMP%]:hover, .training-search-option[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateQuestionComponent, [{
        type: Component,
        args: [{ selector: 'app-create-question', template: "<section class=\"admin-section create-question-section\">\n  <div class=\"container admin-shell create-question-shell\">\n    <div class=\"admin-header\">\n      <div>\n        <span class=\"auth-eyebrow\">Admin</span>\n        <h1>Create / Edit Questions</h1>\n      </div>\n      <div class=\"admin-actions\">\n        <a class=\"btn btn-outline\" routerLink=\"/admin/create-test\">Create Test</a>\n        <!-- <button class=\"btn btn-outline\" type=\"button\" (click)=\"downloadQuestionTemplate()\">Download Question Template</button> -->\n        <label class=\"btn btn-outline import-btn\">Import From Excel<input type=\"file\" accept=\".xlsx,.xls,.csv\" (change)=\"onQuestionExcelSelected($event)\" /></label>\n        <!-- <button class=\"btn btn-outline\" type=\"button\" (click)=\"exportQuestionBank()\">Export Bank</button>\n        <label class=\"btn btn-outline import-btn\">Import Bank<input type=\"file\" accept=\".json\" (change)=\"importQuestionBank($event)\" /></label> -->\n      </div>\n    </div>\n\n\n\n    <section class=\"admin-table-wrap import-preview-panel\" *ngIf=\"questionImportPreview || questionImportResult\">\n      <div class=\"section-title-row\">\n        <div>\n          <span class=\"auth-eyebrow\">Excel Import</span>\n          <h2>Question Import Preview</h2>\n        </div>\n        <label class=\"form-field duplicate-field\">\n          Duplicate Handling\n          <select [(ngModel)]=\"questionImportDuplicateAction\" name=\"questionImportDuplicateAction\">\n            <option value=\"skip\">Skip duplicate</option>\n            <option value=\"update\">Update existing</option>\n            <option value=\"clone\">Import as new clone</option>\n          </select>\n        </label>\n      </div>\n\n      <ng-container *ngIf=\"questionImportPreview\">\n        <p class=\"import-file-name\">Selected file: <strong>{{ questionImportFileName || questionImportPreview.fileName }}</strong></p>\n        <div class=\"import-summary-grid\">\n          <div><strong>{{ questionImportPreview.totalRows }}</strong><span>Total Rows</span></div>\n          <div><strong>{{ questionImportPreview.validRows }}</strong><span>Valid</span></div>\n          <div><strong>{{ questionImportPreview.duplicateRows }}</strong><span>Duplicates</span></div>\n          <div><strong>{{ questionImportPreview.invalidRows }}</strong><span>Invalid</span></div>\n          <div><strong>{{ questionImportPreview.newQuestions }}</strong><span>New</span></div>\n          <div><strong>{{ questionImportPreview.updateQuestions }}</strong><span>Updates</span></div>\n          <div><strong>{{ questionImportPreview.skippedRows }}</strong><span>Skipped</span></div>\n          <div><strong>{{ questionImportPreview.failedRows }}</strong><span>Failed</span></div>\n        </div>\n        <div class=\"import-table-wrap\">\n          <table class=\"import-table\">\n            <thead><tr><th>Row</th><th>Action</th><th>Question</th><th>Issue</th></tr></thead>\n            <tbody>\n              <tr *ngFor=\"let item of questionImportPreview.items\">\n                <td>{{ item.rowNumber }}</td>\n                <td>{{ item.action }}</td>\n                <td>{{ item.question?.questionText || '-' }}</td>\n                <td>{{ item.errors.length ? item.errors[0].message : (item.duplicateReason || '-') }}</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"admin-actions page-actions\">\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"cancelQuestionImport()\">Cancel</button>\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"confirmQuestionImport()\" [disabled]=\"!questionImportPreview.validRows\">Confirm Import</button>\n        </div>\n      </ng-container>\n\n      <div class=\"file-note\" *ngIf=\"questionImportResult\">\n        <strong>Question import completed</strong>\n        <span>Imported: {{ questionImportResult.imported }} | Updated: {{ questionImportResult.updated }} | Skipped: {{ questionImportResult.skipped }} | Failed: {{ questionImportResult.failed }} | Bank Total: {{ questionImportResult.questionBankTotal }}</span>\n      </div>\n    </section>\n\n    <div class=\"question-admin-layout\">\n      <section class=\"admin-form question-form-card\">\n        <div class=\"section-title-row\">\n          <h2>{{ editingIndex === null ? 'Add Question' : 'Edit Question' }}</h2>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"clearForm()\">Clear</button>\n        </div>\n\n        <div class=\"usage-warning\" *ngIf=\"usageInfo?.usageCount\">\n          This question is used in {{ usageInfo?.usageCount }} test(s). Editing affects future attempts, not submitted results.\n          <span *ngIf=\"getAffectedTestNames()\">Tests: {{ getAffectedTestNames() }}</span>\n        </div>\n\n        <div class=\"form-grid form-grid--three\">\n          <label class=\"form-field training-search-field\">\n            Training\n            <div class=\"training-search-control\">\n              <button class=\"btn btn-outline btn-small training-dropdown-toggle\" type=\"button\" (click)=\"toggleTrainingDropdown()\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"isTrainingDropdownOpen\">\n                {{ getSelectedTrainingLabel() }}\n                <span class=\"dropdown-icon\">&#9662;</span>\n              </button>\n              <div class=\"training-search-menu\" *ngIf=\"isTrainingDropdownOpen\" role=\"listbox\">\n                <input type=\"text\" [(ngModel)]=\"trainingSearch\" name=\"trainingSearch\" placeholder=\"Search training\" autocomplete=\"off\" (input)=\"onTrainingSearchChange()\" />\n                <button class=\"training-search-option\" type=\"button\" *ngFor=\"let training of filteredTrainingList\" (mousedown)=\"selectTrainingFromDropdown(training)\" role=\"option\">\n                  {{ getTrainingLabel(training) }}\n                </button>\n                <div class=\"training-search-empty\" *ngIf=\"!filteredTrainingList.length\">No training found</div>\n              </div>\n            </div>\n          </label>\n          <label class=\"form-field\">Question Type<select [(ngModel)]=\"form.questionType\" name=\"questionType\" (ngModelChange)=\"onQuestionTypeChange()\"><option *ngFor=\"let type of questionTypes\" [ngValue]=\"type\">{{ type }}</option></select></label>\n          <label class=\"form-field\">Difficulty<select [(ngModel)]=\"form.difficulty\" name=\"difficulty\"><option *ngFor=\"let difficulty of difficulties\" [ngValue]=\"difficulty\">{{ difficulty }}</option></select></label>\n          <label class=\"form-field\">Marks<input type=\"number\" min=\"1\" [(ngModel)]=\"form.marks\" name=\"marks\" /></label>\n          <label class=\"form-field\">Negative Marks<input type=\"number\" min=\"0\" [(ngModel)]=\"form.negativeMarks\" name=\"negativeMarks\" /></label>\n          <label class=\"form-field\">Estimated Time<input type=\"number\" min=\"1\" [(ngModel)]=\"form.estimatedTimeSeconds\" name=\"estimatedTimeSeconds\" /></label>\n        </div>\n\n        <label class=\"form-field\">Question Text<textarea rows=\"4\" [(ngModel)]=\"form.questionText\" name=\"questionText\"></textarea></label>\n\n        <div class=\"form-grid form-grid--two\">\n          <label class=\"form-field\">\n            Question Image URL\n            <input type=\"text\" [(ngModel)]=\"form.questionImageUrl\" name=\"questionImageUrl\" />\n            <input type=\"file\" accept=\"image/*\" (change)=\"onMediaFileSelected('questionImageUrl', $event)\" />\n            <small *ngIf=\"form.questionImageUrl\">\n              Selected: {{ getMediaFileName(form.questionImageUrl) }}\n              <button class=\"table-link\" type=\"button\" (click)=\"removeMediaFile('questionImageUrl')\">Remove</button>\n            </small>\n          </label>\n          <label class=\"form-field\">\n            Audio URL\n            <input type=\"text\" [(ngModel)]=\"form.audioUrl\" name=\"audioUrl\" />\n            <input type=\"file\" accept=\"audio/*\" (change)=\"onMediaFileSelected('audioUrl', $event)\" />\n            <small *ngIf=\"form.audioUrl\">\n              Selected: {{ getMediaFileName(form.audioUrl) }}\n              <button class=\"table-link\" type=\"button\" (click)=\"removeMediaFile('audioUrl')\">Remove</button>\n            </small>\n          </label>\n          <label class=\"form-field\">\n            Video URL\n            <input type=\"text\" [(ngModel)]=\"form.videoUrl\" name=\"videoUrl\" />\n            <input type=\"file\" accept=\"video/*\" (change)=\"onMediaFileSelected('videoUrl', $event)\" />\n            <small *ngIf=\"form.videoUrl\">\n              Selected: {{ getMediaFileName(form.videoUrl) }}\n              <button class=\"table-link\" type=\"button\" (click)=\"removeMediaFile('videoUrl')\">Remove</button>\n            </small>\n          </label>\n          <label class=\"form-field\">\n            Explanation Image URL\n            <input type=\"text\" [(ngModel)]=\"form.explanationImageUrl\" name=\"explanationImageUrl\" />\n            <input type=\"file\" accept=\"image/*\" (change)=\"onMediaFileSelected('explanationImageUrl', $event)\" />\n            <small *ngIf=\"form.explanationImageUrl\">\n              Selected: {{ getMediaFileName(form.explanationImageUrl) }}\n              <button class=\"table-link\" type=\"button\" (click)=\"removeMediaFile('explanationImageUrl')\">Remove</button>\n            </small>\n          </label>\n        </div>\n\n        <div class=\"option-editor\" *ngIf=\"form.questionType === 'MCSA' || form.questionType === 'MCMA'\">\n          <div class=\"section-title-row\"><h3>Options</h3><button class=\"btn btn-outline\" type=\"button\" (click)=\"addOption()\">Add Option</button></div>\n          <div class=\"option-row\" *ngFor=\"let option of form.options; let optionIndex = index; trackBy: trackByOption\">\n            <button class=\"option-check\" type=\"button\" [class.option-check--active]=\"isCorrectOption(option.id)\" (click)=\"toggleCorrectOption(option.id)\">{{ getOptionLabel(optionIndex) }}</button>\n            <input type=\"text\" [(ngModel)]=\"option.text\" [name]=\"'optionText' + optionIndex\" placeholder=\"Option text\" />\n            <input type=\"text\" [(ngModel)]=\"option.imageUrl\" [name]=\"'optionImage' + optionIndex\" placeholder=\"Image URL\" />\n            <input type=\"file\" accept=\"image/*\" (change)=\"onOptionImageFileSelected(optionIndex, $event)\" />\n            <small *ngIf=\"option.imageUrl\">\n              Selected: {{ getMediaFileName(option.imageUrl) }}\n              <button class=\"table-link\" type=\"button\" (click)=\"removeOptionImage(optionIndex)\">Remove</button>\n            </small>\n            <button class=\"table-link table-link--danger\" type=\"button\" (click)=\"removeOption(optionIndex)\">Remove</button>\n          </div>\n        </div>\n\n        <div class=\"option-editor\" *ngIf=\"form.questionType === 'TRUE_FALSE'\">\n          <h3>True / False Answer</h3>\n          <div class=\"true-false-row\">\n            <button class=\"option-check\" type=\"button\" [class.option-check--active]=\"form.correctOptionId === 'true'\" (click)=\"toggleCorrectOption('true')\">A True</button>\n            <button class=\"option-check\" type=\"button\" [class.option-check--active]=\"form.correctOptionId === 'false'\" (click)=\"toggleCorrectOption('false')\">B False</button>\n          </div>\n        </div>\n\n        <div class=\"form-grid form-grid--two\" *ngIf=\"form.questionType === 'ESSAY'\">\n          <label class=\"form-field\">Expected Answer<textarea rows=\"4\" [(ngModel)]=\"form.expectedAnswer\" name=\"expectedAnswer\"></textarea></label>\n          <label class=\"form-field\">Sample Answer<textarea rows=\"4\" [(ngModel)]=\"form.sampleAnswer\" name=\"sampleAnswer\"></textarea></label>\n        </div>\n\n        <label class=\"form-field\">Explanation<textarea rows=\"4\" [(ngModel)]=\"form.explanation\" name=\"explanation\"></textarea></label>\n        <label class=\"check-row\"><input type=\"checkbox\" [(ngModel)]=\"form.isActive\" name=\"isActive\" /> Active</label>\n\n        <div class=\"validation-list\" *ngIf=\"validationErrors.length\"><p *ngFor=\"let error of validationErrors\">{{ error }}</p></div>\n\n        <div class=\"admin-actions editor-actions\">\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"saveQuestion()\" [disabled]=\"isSaving\">{{ isSaving ? 'Saving...' : (editingIndex === null ? 'Save Question' : 'Update Question Bank') }}</button>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"clearForm()\">Cancel</button>\n        </div>\n      </section>\n\n      <aside class=\"admin-tools question-bank-tools\">\n        <h2>Question Bank</h2>\n        <div class=\"summary-strip\"><div><strong>{{ filteredQuestions.length }}</strong><span>Showing</span></div><div><strong>{{ questionBank.length }}</strong><span>Total</span></div></div>\n        <div class=\"map-test-panel\">\n          <h3>Map Question to Test</h3>\n          <label class=\"form-field\">Test Name<input type=\"text\" [(ngModel)]=\"mappingTestName\" name=\"mappingTestName\" placeholder=\"Test 1\" /></label>\n          <label class=\"form-field\">Question Number<input type=\"number\" min=\"1\" [(ngModel)]=\"mappingQuestionNumber\" name=\"mappingQuestionNumber\" placeholder=\"Auto / append\" /></label>\n          <p>Use the Map button on any question below. Existing mapped question is moved to the selected number.</p>\n          <strong *ngIf=\"mappingMessage\">{{ mappingMessage }}</strong>\n        </div>\n        <div class=\"bank-filters\">\n          <input type=\"text\" [(ngModel)]=\"searchText\" placeholder=\"Search question\" />\n          <input type=\"text\" [(ngModel)]=\"filterTraining\" placeholder=\"Training\" />\n          <input type=\"text\" [(ngModel)]=\"filterSubject\" placeholder=\"Subject\" />\n          <input type=\"text\" [(ngModel)]=\"filterTopic\" placeholder=\"Topic\" />\n          <select [(ngModel)]=\"filterType\"><option [ngValue]=\"''\">All Types</option><option *ngFor=\"let type of questionTypes\" [ngValue]=\"type\">{{ type }}</option></select>\n          <select [(ngModel)]=\"filterDifficulty\"><option [ngValue]=\"''\">All Difficulty</option><option *ngFor=\"let difficulty of difficulties\" [ngValue]=\"difficulty\">{{ difficulty }}</option></select>\n          <input type=\"number\" [(ngModel)]=\"filterMarks\" placeholder=\"Marks\" />\n          <select [(ngModel)]=\"filterActive\"><option value=\"all\">All Status</option><option value=\"active\">Active</option><option value=\"inactive\">Inactive</option></select>\n        </div>\n      </aside>\n    </div>\n\n    <section class=\"admin-table-wrap question-list-panel\">\n      <article class=\"question-list-item\" *ngFor=\"let question of pagedQuestions; let index = index; trackBy: trackByQuestion\">\n        <div class=\"question-left\">\n          <span class=\"question-number-badge\">{{ (currentPage - 1) * pageSize + index + 1 }}</span>\n          <div>\n            <strong>{{ question.questionText }}</strong>\n          <span>{{ getQuestionTrainingLabel(question) }} | {{ question.subject }} | {{ question.topic }}</span>\n          <small>{{ question.questionType }} | {{ question.difficulty }} | {{ question.marks || 1 }} mark(s) | {{ question.isActive === false ? 'Inactive' : 'Active' }}</small>\n          </div>\n        </div>\n        <div class=\"row-actions\">\n          <button class=\"table-link\" type=\"button\" (click)=\"mapQuestionToTest(question)\">Map</button>\n          <button class=\"table-link\" type=\"button\" (click)=\"editQuestionByItem(question)\">Edit</button>\n          <button class=\"table-link\" type=\"button\" (click)=\"cloneQuestionByItem(question)\">Clone</button>\n          <button class=\"table-link\" type=\"button\" (click)=\"deactivateQuestionByItem(question)\">Deactivate</button>\n          <button class=\"table-link table-link--danger\" type=\"button\" (click)=\"deleteQuestionByItem(question)\">Delete</button>\n        </div>\n      </article>\n      <div class=\"empty-state\" *ngIf=\"!filteredQuestions.length\">No questions found.</div>\n\n      <div class=\"pagination\" *ngIf=\"filteredQuestions.length\">\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"prevPage()\" [disabled]=\"currentPage === 1\">Prev</button>\n        <span class=\"pagination-info\">Page {{ currentPage }} of {{ totalPages }}</span>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"nextPage()\" [disabled]=\"currentPage === totalPages\">Next</button>\n      </div>\n    </section>\n  </div>\n</section>\r\n", styles: [".create-question-shell {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.question-admin-layout {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);\n}\n\n.form-grid {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.form-grid--three {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.form-grid--two {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.section-title-row {\n  align-items: center;\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n}\n\n.section-title-row h2,\n.section-title-row h3 {\n  margin: 0;\n}\n\n.import-btn {\n  cursor: pointer;\n  margin: 0;\n  position: relative;\n}\n\n.import-btn input {\n  height: 1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n}\n\n.usage-warning,\n.validation-list,\n.empty-state {\n  border-radius: var(--radius-sm);\n  padding: 1rem;\n}\n\n.usage-warning {\n  background: #fff7ed;\n  border: 1px solid #fed7aa;\n  color: #9a3412;\n  display: grid;\n  gap: 0.35rem;\n  font-weight: 700;\n}\n\n.validation-list {\n  background: #fff4f2;\n  border: 1px solid #f9d2cc;\n  color: #b42318;\n}\n\n.validation-list p {\n  margin: 0 0 0.4rem;\n}\n\n.validation-list p:last-child {\n  margin-bottom: 0;\n}\n\n.option-editor {\n  border-top: 1px solid var(--gray-light-mid);\n  display: grid;\n  gap: 1rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n}\n\n.option-row {\n  align-items: center;\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: 44px minmax(0, 1fr) minmax(0, 1fr) auto;\n}\n\n.option-row input,\n.bank-filters input,\n.bank-filters select {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  padding: 0.8rem 0.9rem;\n  width: 100%;\n}\n\n.option-check {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid var(--primary);\n  border-radius: var(--radius-sm);\n  color: var(--primary);\n  cursor: pointer;\n  display: inline-flex;\n  font-weight: 800;\n  justify-content: center;\n  min-height: 42px;\n  padding: 0 0.75rem;\n}\n\n.option-check--active {\n  background: var(--primary);\n  color: #ffffff;\n}\n\n.true-false-row,\n.row-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.summary-strip {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  margin-bottom: 1rem;\n}\n\n.summary-strip div {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.summary-strip strong {\n  color: var(--text-dark);\n  display: block;\n  font-size: 1.35rem;\n}\n\n.summary-strip span,\n.question-list-item span,\n.question-list-item small {\n  color: var(--gray-mid);\n}\n\n.bank-filters {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.question-list-panel {\n  display: grid;\n  gap: 0.75rem;\n  padding: 1.5rem;\n}\n\n.question-list-item {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n  padding: 1rem;\n}\n\n.question-list-item strong,\n.question-list-item span,\n.question-list-item small {\n  display: block;\n}\n\n.question-left {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.question-number-badge {\n  align-items: center;\n  background: var(--bg-light);\n  border: 1px solid var(--blue-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--primary) !important;\n  display: inline-flex !important;\n  flex: 0 0 44px;\n  height: 44px;\n  justify-content: center;\n  font-weight: 800;\n}\n\n.table-link--danger {\n  color: #b42318;\n}\n\n.editor-actions {\n  justify-content: flex-end;\n}\n\n.pagination {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n  margin-top: 1rem;\n}\n\n.pagination .btn {\n  border-radius: var(--radius-sm);\n  height: 40px;\n  min-width: 40px;\n  padding: 0 0.6rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.pagination-info {\n  font-weight: 700;\n  color: var(--gray-mid);\n}\n\n@media (max-width: 991px) {\n  .question-admin-layout,\n  .form-grid,\n  .form-grid--three,\n  .form-grid--two {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .section-title-row,\n  .question-list-item,\n  .editor-actions {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .option-row,\n  .summary-strip {\n    grid-template-columns: 1fr;\n  }\n\n  .option-check,\n  .editor-actions .btn {\n    width: 100%;\n  }\n}\n\n.map-test-panel {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: grid;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n  padding: 1rem;\n}\n\n.map-test-panel h3 {\n  color: var(--text-dark);\n  font-size: 1rem;\n  margin: 0;\n}\n\n.map-test-panel p {\n  color: var(--gray-mid);\n  font-size: 0.92rem;\n  margin: 0;\n}\n\n.map-test-panel strong {\n  color: var(--primary);\n  font-size: 0.92rem;\n}\n\n.import-preview-panel {\n  display: grid;\n  gap: 1rem;\n  padding: 1.5rem;\n}\n\n.import-file-name {\n  color: var(--gray-mid);\n  margin: 0;\n}\n\n.import-summary-grid {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.import-summary-grid div {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.import-summary-grid strong,\n.import-summary-grid span {\n  display: block;\n}\n\n.import-summary-grid strong {\n  color: var(--text-dark);\n  font-size: 1.25rem;\n}\n\n.import-summary-grid span {\n  color: var(--gray-mid);\n}\n\n.import-table-wrap {\n  overflow-x: auto;\n}\n\n.import-table {\n  border-collapse: collapse;\n  min-width: 720px;\n  width: 100%;\n}\n\n.import-table th,\n.import-table td {\n  border-bottom: 1px solid var(--gray-light-mid);\n  color: var(--gray-dark-mid);\n  padding: 0.75rem;\n  text-align: left;\n  vertical-align: top;\n}\n\n.import-table th {\n  color: var(--text-dark);\n  font-weight: 800;\n}\n\n.duplicate-field {\n  min-width: 220px;\n}\n\n@media (max-width: 991px) {\n  .import-summary-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 640px) {\n  .import-summary-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n.training-search-field {\n  position: relative;\n}\n\n.training-search-control {\n  position: relative;\n}\n\n.training-dropdown-toggle {\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n\n.training-search-menu {\n  position: absolute;\n  z-index: 30;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  max-height: 220px;\n  overflow-y: auto;\n  border: 1px solid rgba(17, 24, 39, 0.14);\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);\n}\n\n.training-search-option {\n  display: block;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 10px 12px;\n  text-align: left;\n  color: #111827;\n  cursor: pointer;\n}\n\n.training-search-option:hover {\n  background: #f3f4f6;\n}\n\n.training-search-empty {\n  padding: 10px 12px;\n  color: #6b7280;\n}\n\n.training-dropdown-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.training-dropdown-toggle .dropdown-icon {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n/* Shared polished training picker */\n.training-search-control {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow:\n    0 18px 45px rgba(15, 23, 42, 0.18),\n    0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: \"\";\n  transform: rotate(45deg);\n}\n\n.training-search-menu input {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n\n.training-search-menu input:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    color 150ms ease,\n    background 150ms ease,\n    transform 150ms ease;\n}\n\n.training-search-option:hover,\n.training-search-option:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu::-webkit-scrollbar-track {\n  background: transparent;\n}\n"] }]
    }], function () { return [{ type: i1.TestStorageService }, { type: i2.NotifierService }, { type: i3.TestExcelImportService }, { type: i4.HttpClient }, { type: i5.DataService }, { type: i6.TrainingManagementService }]; }, null); })();
//# sourceMappingURL=create-question.component.js.map