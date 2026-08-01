import { __awaiter } from "tslib";
import { Component, HostListener } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/notifier.service";
import * as i2 from "../../test/services/test-storage.service";
import * as i3 from "../../test/services/test-excel-import.service";
import * as i4 from "@angular/common/http";
import * as i5 from "../../../core/services/data.service";
import * as i6 from "../../../core/services/training-management.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/router";
import * as i9 from "@angular/forms";
function CreateTestComponent_section_16_ng_container_7_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r23.assessmentImportPreview.testDefinition.displayName || ctx_r23.assessmentImportPreview.testDefinition.testName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r23.assessmentImportPreview.testDefinition.description || "No description added.");
} }
function CreateTestComponent_section_16_ng_container_7_div_47_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r27 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("Row ", error_r27.rowNumber, ": ", error_r27.message, "");
} }
function CreateTestComponent_section_16_ng_container_7_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵtemplate(1, CreateTestComponent_section_16_ng_container_7_div_47_p_1_Template, 2, 2, "p", 67);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r24.assessmentImportPreview.errors);
} }
function CreateTestComponent_section_16_ng_container_7_tr_63_Template(rf, ctx) { if (rf & 1) {
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
    const item_r28 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r28.rowNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r28.questionOrder);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r28.action);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((item_r28.question == null ? null : item_r28.question.questionText) || item_r28.questionId || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r28.errors.length ? item_r28.errors[0].message : "-");
} }
function CreateTestComponent_section_16_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "p", 62);
    i0.ɵɵtext(2, "Selected file: ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, CreateTestComponent_section_16_ng_container_7_div_5_Template, 5, 2, "div", 63);
    i0.ɵɵelementStart(6, "div", 64)(7, "div")(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Total Rows");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div")(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "Valid Rows");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Existing Found");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div")(23, "strong");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26, "New Questions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div")(28, "strong");
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31, "Duplicates");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div")(33, "strong");
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "span");
    i0.ɵɵtext(36, "Invalid");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div")(38, "strong");
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "span");
    i0.ɵɵtext(41, "Mapped");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "div")(43, "strong");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span");
    i0.ɵɵtext(46, "Total Marks");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(47, CreateTestComponent_section_16_ng_container_7_div_47_Template, 2, 1, "div", 34);
    i0.ɵɵelementStart(48, "div", 65)(49, "table", 66)(50, "thead")(51, "tr")(52, "th");
    i0.ɵɵtext(53, "Row");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "th");
    i0.ɵɵtext(55, "Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "th");
    i0.ɵɵtext(57, "Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "th");
    i0.ɵɵtext(59, "Question");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "th");
    i0.ɵɵtext(61, "Issue");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(62, "tbody");
    i0.ɵɵtemplate(63, CreateTestComponent_section_16_ng_container_7_tr_63_Template, 11, 5, "tr", 67);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(64, "div", 57)(65, "button", 58);
    i0.ɵɵlistener("click", function CreateTestComponent_section_16_ng_container_7_Template_button_click_65_listener() { i0.ɵɵrestoreView(_r30); const ctx_r29 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r29.cancelAssessmentImport()); });
    i0.ɵɵtext(66, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "button", 68);
    i0.ɵɵlistener("click", function CreateTestComponent_section_16_ng_container_7_Template_button_click_67_listener() { i0.ɵɵrestoreView(_r30); const ctx_r31 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r31.confirmAssessmentImport()); });
    i0.ɵɵtext(68, "Confirm Import");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportFileName || ctx_r21.assessmentImportPreview.fileName);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r21.assessmentImportPreview.testDefinition);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.totalRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.validRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.existingQuestionsFound);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.newQuestionsToCreate);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.duplicateMappings);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.invalidRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.finalMappedQuestionCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r21.assessmentImportPreview.finalTotalMarks);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r21.assessmentImportPreview.errors.length);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r21.assessmentImportPreview.items);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r21.assessmentImportPreview.finalMappedQuestionCount || ctx_r21.assessmentImportPreview.errors.length > 0);
} }
function CreateTestComponent_section_16_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71)(1, "strong");
    i0.ɵɵtext(2, "Assessment import completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Display Name: ", ctx_r22.assessmentImportResult.displayName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Normalized File Name: ", ctx_r22.assessmentImportResult.fileName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Storage Key: ", ctx_r22.assessmentImportResult.storageKey, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("New Questions: ", ctx_r22.assessmentImportResult.newQuestionsAdded, " | Existing Mapped: ", ctx_r22.assessmentImportResult.existingQuestionsMapped, " | Duplicates Skipped: ", ctx_r22.assessmentImportResult.duplicatesSkipped, " | Failed: ", ctx_r22.assessmentImportResult.failedRows, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("Total Mapped: ", ctx_r22.assessmentImportResult.totalMappedQuestions, " | Total Marks: ", ctx_r22.assessmentImportResult.totalMarks, " | Question Bank Total: ", ctx_r22.assessmentImportResult.questionBankTotal, "");
} }
function CreateTestComponent_section_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 61)(1, "div", 12)(2, "div")(3, "span", 3);
    i0.ɵɵtext(4, "Excel Import");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6, "Test Import Preview");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(7, CreateTestComponent_section_16_ng_container_7_Template, 69, 13, "ng-container", 26);
    i0.ɵɵtemplate(8, CreateTestComponent_section_16_div_8_Template, 13, 10, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r0.assessmentImportPreview);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.assessmentImportResult);
} }
function CreateTestComponent_div_27_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 73);
    i0.ɵɵlistener("click", function CreateTestComponent_div_27_button_3_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r36); const t_r33 = restoredCtx.$implicit; const ctx_r35 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r35.selectTestKey(t_r33.optionKey || "")); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const t_r33 = ctx.$implicit;
    const idx_r34 = ctx.index;
    const ctx_r32 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("highlighted", ctx_r32.highlightedTestIndex === idx_r34 + 1);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", t_r33.displayName || t_r33.testName, "", t_r33.assetFileName ? " (asset)" : "", " ");
} }
function CreateTestComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 72)(1, "button", 73);
    i0.ɵɵlistener("click", function CreateTestComponent_div_27_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r37.clearTestSelection()); });
    i0.ɵɵtext(2, " New Test ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CreateTestComponent_div_27_button_3_Template, 2, 4, "button", 74);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("highlighted", ctx_r1.highlightedTestIndex === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.availableTests);
} }
function CreateTestComponent_div_36_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 79);
    i0.ɵɵlistener("mousedown", function CreateTestComponent_div_36_button_2_Template_button_mousedown_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r43); const training_r41 = restoredCtx.$implicit; const ctx_r42 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r42.selectTrainingFromDropdown(training_r41)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const training_r41 = ctx.$implicit;
    const ctx_r39 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r39.getTrainingLabel(training_r41), " ");
} }
function CreateTestComponent_div_36_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵtext(1, "No training found");
    i0.ɵɵelementEnd();
} }
function CreateTestComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75)(1, "input", 76);
    i0.ɵɵlistener("ngModelChange", function CreateTestComponent_div_36_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r45); const ctx_r44 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r44.trainingSearch = $event); })("input", function CreateTestComponent_div_36_Template_input_input_1_listener() { i0.ɵɵrestoreView(_r45); const ctx_r46 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r46.onTrainingSearchChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, CreateTestComponent_div_36_button_2_Template, 2, 1, "button", 77);
    i0.ɵɵtemplate(3, CreateTestComponent_div_36_div_3_Template, 2, 0, "div", 78);
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
function CreateTestComponent_option_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 49);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "titlecase");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r47 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r47);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r47));
} }
function CreateTestComponent_small_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Test title is required.");
    i0.ɵɵelementEnd();
} }
function CreateTestComponent_small_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Duration must be greater than 0.");
    i0.ɵɵelementEnd();
} }
function CreateTestComponent_small_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Total questions must be >= mapped questions.");
    i0.ɵɵelementEnd();
} }
function CreateTestComponent_option_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r48 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", status_r48);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(status_r48);
} }
function CreateTestComponent_div_69_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r50 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(error_r50);
} }
function CreateTestComponent_div_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵtemplate(1, CreateTestComponent_div_69_p_1_Template, 2, 1, "p", 67);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r8.detailErrors);
} }
function CreateTestComponent_div_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71)(1, "strong");
    i0.ɵɵtext(2, "Last file:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r9.lastSavedFileName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Target folder: ", ctx_r9.getTestFileFolder(), "");
} }
function CreateTestComponent_div_92_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 84)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 85)(9, "button", 86);
    i0.ɵɵlistener("click", function CreateTestComponent_div_92_article_1_Template_button_click_9_listener() { const restoredCtx = i0.ɵɵrestoreView(_r56); const index_r54 = restoredCtx.index; const ctx_r55 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r55.moveMappedQuestion(index_r54, -1)); });
    i0.ɵɵtext(10, "Up");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 86);
    i0.ɵɵlistener("click", function CreateTestComponent_div_92_article_1_Template_button_click_11_listener() { const restoredCtx = i0.ɵɵrestoreView(_r56); const index_r54 = restoredCtx.index; const ctx_r57 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r57.moveMappedQuestion(index_r54, 1)); });
    i0.ɵɵtext(12, "Down");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 87);
    i0.ɵɵlistener("click", function CreateTestComponent_div_92_article_1_Template_button_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r56); const index_r54 = restoredCtx.index; const ctx_r58 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r58.editMappedQuestion(index_r54)); });
    i0.ɵɵtext(14, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 88);
    i0.ɵɵlistener("click", function CreateTestComponent_div_92_article_1_Template_button_click_15_listener() { const restoredCtx = i0.ɵɵrestoreView(_r56); const index_r54 = restoredCtx.index; const ctx_r59 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r59.deleteMappedQuestion(index_r54)); });
    i0.ɵɵtext(16, "Unmap");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const question_r53 = ctx.$implicit;
    const index_r54 = ctx.index;
    const ctx_r51 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("Q", question_r53.questionNo, ". ", ctx_r51.getQuestionTypeLabel(question_r53.questionType), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", question_r53.subject || "No subject", " / ", question_r53.topic || "No topic", "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", question_r53.difficulty, " | ", question_r53.marks, " mark(s) | ", question_r53.estimatedTimeSeconds, "s");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", index_r54 === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", (ctx_r51.mappedQuestionsCurrentPage - 1) * ctx_r51.mappedQuestionsPageSize + index_r54 === ctx_r51.questions.length - 1);
} }
function CreateTestComponent_div_92_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 89)(1, "button", 90);
    i0.ɵɵlistener("click", function CreateTestComponent_div_92_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r61); const ctx_r60 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r60.mappedQuestionsPrevPage()); });
    i0.ɵɵtext(2, "Prev");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 91);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 90);
    i0.ɵɵlistener("click", function CreateTestComponent_div_92_div_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r61); const ctx_r62 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r62.mappedQuestionsNextPage()); });
    i0.ɵɵtext(6, "Next");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r52 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r52.mappedQuestionsCurrentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("Page ", ctx_r52.mappedQuestionsCurrentPage, " of ", ctx_r52.mappedQuestionsTotalPages, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r52.mappedQuestionsCurrentPage === ctx_r52.mappedQuestionsTotalPages);
} }
function CreateTestComponent_div_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵtemplate(1, CreateTestComponent_div_92_article_1_Template, 17, 9, "article", 82);
    i0.ɵɵtemplate(2, CreateTestComponent_div_92_div_2_Template, 7, 4, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r10.pagedMappedQuestions)("ngForTrackBy", ctx_r10.trackByQuestionId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.mappedQuestionsTotalPages > 1);
} }
function CreateTestComponent_ng_template_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92);
    i0.ɵɵtext(1, "No questions mapped to this test yet.");
    i0.ɵɵelementEnd();
} }
function CreateTestComponent_div_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 93)(1, "span")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " mapped");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "/");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span")(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 94);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r13.mappedCount);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r13.testDetails.totalQuestions);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("(", ctx_r13.remainingSlots, " left)");
} }
function CreateTestComponent_option_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r63 = ctx.$implicit;
    const ctx_r14 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngValue", type_r63);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r14.getQuestionTypeLabel(type_r63));
} }
function CreateTestComponent_option_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const difficulty_r64 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", difficulty_r64);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(difficulty_r64);
} }
function CreateTestComponent_div_119_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " slot(s) remaining.");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r65 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("You can map up to ", ctx_r65.testDetails.totalQuestions, " questions. ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r65.remainingSlots);
} }
function CreateTestComponent_div_119_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 97);
    i0.ɵɵtext(1, "Mapping limit reached \u00E2\u20AC\u201D unmap a question to add another.");
    i0.ɵɵelementEnd();
} }
function CreateTestComponent_div_119_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95);
    i0.ɵɵtemplate(1, CreateTestComponent_div_119_span_1_Template, 5, 2, "span", 26);
    i0.ɵɵtemplate(2, CreateTestComponent_div_119_span_2_Template, 2, 0, "span", 96);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r16.isMappingFull);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r16.isMappingFull);
} }
function CreateTestComponent_div_120_article_1_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "Mapped");
    i0.ɵɵelementContainerEnd();
} }
function CreateTestComponent_div_120_article_1_ng_template_15_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 106);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r74 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r74.remainingSlots);
} }
function CreateTestComponent_div_120_article_1_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Map to Test");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, CreateTestComponent_div_120_article_1_ng_template_15_span_2_Template, 2, 1, "span", 105);
} if (rf & 2) {
    const ctx_r73 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r73.remainingSlots !== null);
} }
function CreateTestComponent_div_120_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r76 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 84)(1, "div", 99)(2, "span", 100);
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
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 85)(12, "input", 101);
    i0.ɵɵlistener("input", function CreateTestComponent_div_120_article_1_Template_input_input_12_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r76); const question_r69 = restoredCtx.$implicit; const ctx_r75 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r75.setMapQuestionPosition(question_r69.id, ctx_r75.parseMapPosition($event.target.value))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 102);
    i0.ɵɵlistener("click", function CreateTestComponent_div_120_article_1_Template_button_click_13_listener() { const restoredCtx = i0.ɵɵrestoreView(_r76); const question_r69 = restoredCtx.$implicit; const ctx_r77 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r77.mapQuestionToTestByQuestion(question_r69)); });
    i0.ɵɵtemplate(14, CreateTestComponent_div_120_article_1_ng_container_14_Template, 2, 0, "ng-container", 103);
    i0.ɵɵtemplate(15, CreateTestComponent_div_120_article_1_ng_template_15_Template, 3, 1, "ng-template", null, 104, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const question_r69 = ctx.$implicit;
    const i_r70 = ctx.index;
    const _r72 = i0.ɵɵreference(16);
    const ctx_r67 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((ctx_r67.questionBankCurrentPage - 1) * ctx_r67.questionBankPageSize + i_r70 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r67.getQuestionTypeLabel(question_r69.questionType), " - ", question_r69.questionText, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", question_r69.subject || "No subject", " / ", question_r69.topic || "No topic", "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", question_r69.difficulty, " | ", question_r69.marks, " mark(s) | ", question_r69.estimatedTimeSeconds, "s");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("max", ctx_r67.testDetails.totalQuestions || ctx_r67.questionBank.length)("value", ctx_r67.mapQuestionPositions[question_r69.id] || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r67.isQuestionMapped(question_r69.id) || ctx_r67.isMappingFull);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r67.isQuestionMapped(question_r69.id))("ngIfElse", _r72);
} }
function CreateTestComponent_div_120_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r79 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 89)(1, "button", 90);
    i0.ɵɵlistener("click", function CreateTestComponent_div_120_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r79); const ctx_r78 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r78.questionBankPrevPage()); });
    i0.ɵɵtext(2, "Prev");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 90);
    i0.ɵɵlistener("click", function CreateTestComponent_div_120_div_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r79); const ctx_r80 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r80.questionBankNextPage()); });
    i0.ɵɵtext(6, "Next");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r68 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r68.questionBankCurrentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("Page ", ctx_r68.questionBankCurrentPage, " of ", ctx_r68.questionBankTotalPages, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r68.questionBankCurrentPage === ctx_r68.questionBankTotalPages);
} }
function CreateTestComponent_div_120_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 98);
    i0.ɵɵtemplate(1, CreateTestComponent_div_120_article_1_Template, 17, 13, "article", 82);
    i0.ɵɵtemplate(2, CreateTestComponent_div_120_div_2_Template, 7, 4, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r17.pagedQuestionBank)("ngForTrackBy", ctx_r17.trackByQuestionId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r17.filteredQuestionBank.length);
} }
function CreateTestComponent_ng_template_121_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92);
    i0.ɵɵtext(1, "Create questions here first, then map them to the test.");
    i0.ɵɵelementEnd();
} }
function CreateTestComponent_section_128_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69)(1, "strong");
    i0.ɵɵtext(2, "Instructions:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r81 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r81.testDetails.instructions);
} }
function CreateTestComponent_section_128_article_17_div_6_img_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 122);
} if (rf & 2) {
    const question_r83 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("src", question_r83.questionImageUrl, i0.ɵɵsanitizeUrl);
} }
function CreateTestComponent_section_128_article_17_div_6_audio_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "audio", 123);
    i0.ɵɵelement(1, "source", 124);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r83 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", question_r83.audioUrl, i0.ɵɵsanitizeUrl);
} }
function CreateTestComponent_section_128_article_17_div_6_video_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "video", 125);
    i0.ɵɵelement(1, "source", 124);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r83 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", question_r83.videoUrl, i0.ɵɵsanitizeUrl);
} }
function CreateTestComponent_section_128_article_17_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 118);
    i0.ɵɵtemplate(1, CreateTestComponent_section_128_article_17_div_6_img_1_Template, 1, 1, "img", 119);
    i0.ɵɵtemplate(2, CreateTestComponent_section_128_article_17_div_6_audio_2_Template, 2, 1, "audio", 120);
    i0.ɵɵtemplate(3, CreateTestComponent_section_128_article_17_div_6_video_3_Template, 2, 1, "video", 121);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r83 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r83.questionImageUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r83.audioUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r83.videoUrl);
} }
function CreateTestComponent_section_128_article_17_div_7_div_1_img_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 130);
} if (rf & 2) {
    const option_r96 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", option_r96.imageUrl, i0.ɵɵsanitizeUrl);
} }
function CreateTestComponent_section_128_article_17_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 128)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CreateTestComponent_section_128_article_17_div_7_div_1_img_3_Template, 1, 1, "img", 129);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r96 = ctx.$implicit;
    const optionIndex_r97 = ctx.index;
    const question_r83 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r95 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("preview-option--correct", question_r83.correctOptionIds == null ? null : question_r83.correctOptionIds.includes(option_r96.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r95.getOptionLabel(optionIndex_r97));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", option_r96.imageUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r96.text);
} }
function CreateTestComponent_section_128_article_17_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 126);
    i0.ɵɵtemplate(1, CreateTestComponent_section_128_article_17_div_7_div_1_Template, 6, 5, "div", 127);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r83 = i0.ɵɵnextContext().$implicit;
    const ctx_r85 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", question_r83.options)("ngForTrackBy", ctx_r85.trackByOptionId);
} }
function CreateTestComponent_section_128_article_17_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 131)(1, "p")(2, "strong");
    i0.ɵɵtext(3, "Expected Answer:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p")(6, "strong");
    i0.ɵɵtext(7, "Sample Answer:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const question_r83 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", question_r83.expectedAnswer || "Not added", "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", question_r83.sampleAnswer || "Not added", "");
} }
function CreateTestComponent_section_128_article_17_img_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 132);
} if (rf & 2) {
    const question_r83 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", question_r83.explanationImageUrl, i0.ɵɵsanitizeUrl);
} }
function CreateTestComponent_section_128_article_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 111)(1, "div", 112)(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, CreateTestComponent_section_128_article_17_div_6_Template, 4, 3, "div", 113);
    i0.ɵɵtemplate(7, CreateTestComponent_section_128_article_17_div_7_Template, 2, 2, "div", 114);
    i0.ɵɵtemplate(8, CreateTestComponent_section_128_article_17_div_8_Template, 9, 2, "div", 115);
    i0.ɵɵelementStart(9, "div", 116)(10, "p")(11, "strong");
    i0.ɵɵtext(12, "Explanation:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, CreateTestComponent_section_128_article_17_img_14_Template, 1, 1, "img", 117);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const question_r83 = ctx.$implicit;
    const ctx_r82 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("Q", question_r83.questionNo, ". ", question_r83.questionText, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", ctx_r82.getQuestionTypeLabel(question_r83.questionType), " | ", question_r83.difficulty, " | ", question_r83.marks, " mark(s) | ", question_r83.estimatedTimeSeconds, "s");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r83.questionImageUrl || question_r83.audioUrl || question_r83.videoUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r83.options == null ? null : question_r83.options.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r83.questionType === "ESSAY");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", question_r83.explanation || "No explanation added.", "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", question_r83.explanationImageUrl);
} }
function CreateTestComponent_section_128_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 107)(1, "div", 108)(2, "div")(3, "span", 3);
    i0.ɵɵtext(4, "Preview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 109)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(16, CreateTestComponent_section_128_div_16_Template, 5, 1, "div", 63);
    i0.ɵɵtemplate(17, CreateTestComponent_section_128_article_17_Template, 15, 11, "article", 110);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r20.testDetails.testTitle || "Untitled Test");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r20.testDetails.description || "No description added.");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r20.questions.length, " Questions");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r20.totalMarks, " Marks");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r20.testDetails.durationMinutes || 0, " Minutes");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r20.testDetails.instructions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r20.questions)("ngForTrackBy", ctx_r20.trackByQuestionId);
} }
const DEFAULT_TEST_STATUS = 'Draft';
const DEFAULT_DURATION_MINUTES = 30;
const DEFAULT_PASSING_PERCENTAGE = 60;
const DEFAULT_QUESTION_MARKS = 1;
const DEFAULT_ESTIMATED_TIME_SECONDS = 60;
export class CreateTestComponent {
    constructor(notifier, testStorage, excelImport, http, dataService, trainingService) {
        this.notifier = notifier;
        this.testStorage = testStorage;
        this.excelImport = excelImport;
        this.http = http;
        this.dataService = dataService;
        this.trainingService = trainingService;
        this.questionTypes = ['MCSA', 'MCMA', 'TRUE_FALSE', 'ESSAY'];
        this.difficulties = ['Easy', 'Medium', 'Hard'];
        this.statuses = ['Draft', 'Active', 'Inactive'];
        this.testFileTypes = ['pre', 'post', 'assessment', 'chalange'];
        this.testFileType = 'assessment';
        this.testDetails = this.createEmptyTestDetails();
        this.trainingList = [];
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.selectedTrainingId = '';
        this.questions = [];
        this.questionBank = [];
        this.questionForm = this.createEmptyQuestionForm();
        this.editingIndex = null;
        this.showPreview = false;
        this.detailSubmitted = false;
        this.questionSubmitted = false;
        this.detailErrors = [];
        this.questionErrors = [];
        this.lastPayload = null;
        this.lastSavedFileName = '';
        this.questionBankSearch = '';
        this.questionBankTypeFilter = '';
        this.questionBankDifficultyFilter = '';
        this.questionBankSubjectFilter = '';
        this.questionBankTopicFilter = '';
        this.questionBankMarksFilter = null;
        // Pagination for question bank
        this.questionBankPageSize = 10;
        this.questionBankCurrentPage = 1;
        this.mappedQuestionsPageSize = 10;
        this.mappedQuestionsCurrentPage = 1;
        this.mapQuestionPositions = {};
        this.availableTests = [];
        this.selectedTestKey = '';
        this.isTestDropdownOpen = false;
        this.highlightedTestIndex = -1;
        this.loadedTestDefinition = null;
        this.assessmentImportFileName = '';
        this.assessmentImportPreview = null;
        this.assessmentImportResult = null;
        this.pendingQuestionMediaFiles = {};
        this.pendingOptionImageFiles = {};
        this.Destroy$ = new Subject();
        this.mediaAssetRoot = 'assets/tests/media';
        this.mediaFolders = { images: 'images', audios: 'audios', videos: 'videos' };
    }
    get mappedCount() {
        return this.questions.length;
    }
    get remainingSlots() {
        var _a, _b;
        const total = (_b = (_a = this.testDetails) === null || _a === void 0 ? void 0 : _a.totalQuestions) !== null && _b !== void 0 ? _b : null;
        if (total === null || total === undefined)
            return null;
        return Math.max(0, total - this.mappedCount);
    }
    get isMappingFull() {
        var _a, _b;
        return ((_a = this.testDetails) === null || _a === void 0 ? void 0 : _a.totalQuestions) !== null && ((_b = this.testDetails) === null || _b === void 0 ? void 0 : _b.totalQuestions) !== undefined && this.questions.length >= (this.testDetails.totalQuestions || 0);
    }
    ngOnInit() {
        this.loadStoredQuestionBank();
        this.loadAvailableTests();
        this.loadTrainingList();
    }
    ngOnDestroy() {
        this.Destroy$.next();
        this.Destroy$.complete();
    }
    get totalMarks() {
        return this.calculateTotalMarks();
    }
    get isEditingQuestion() {
        return this.editingIndex !== null;
    }
    get shouldShowOptions() {
        return this.questionForm.questionType === 'MCSA' || this.questionForm.questionType === 'MCMA';
    }
    get activeTestQuestionCount() {
        return this.questions.length;
    }
    get filteredQuestionBank() {
        const search = this.questionBankSearch.trim().toLowerCase();
        return this.questionBank.filter((question) => {
            const matchesSearch = !search || question.questionText.toLowerCase().includes(search) || question.subject.toLowerCase().includes(search) || question.topic.toLowerCase().includes(search);
            const matchesType = !this.questionBankTypeFilter || question.questionType === this.questionBankTypeFilter;
            const matchesDifficulty = !this.questionBankDifficultyFilter || question.difficulty === this.questionBankDifficultyFilter;
            const matchesSubject = !this.questionBankSubjectFilter.trim() || question.subject.toLowerCase().includes(this.questionBankSubjectFilter.trim().toLowerCase());
            const matchesTopic = !this.questionBankTopicFilter.trim() || question.topic.toLowerCase().includes(this.questionBankTopicFilter.trim().toLowerCase());
            const matchesMarks = !this.questionBankMarksFilter || question.marks === this.questionBankMarksFilter;
            return matchesSearch && matchesType && matchesDifficulty && matchesSubject && matchesTopic && matchesMarks;
        });
    }
    onTrainingSelected(trainingId) {
        var _a;
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '') === String(trainingId); });
        this.selectedTrainingId = trainingId;
        this.testDetails.trainingId = selected ? String((_a = selected.trainingId) !== null && _a !== void 0 ? _a : '') : '';
        this.testDetails.trainingName = (selected === null || selected === void 0 ? void 0 : selected.trainingName) || '';
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
        //       this.syncSelectedTrainingFromDetails(); 
        //     },
        //     error: () => {
        //       this.trainingList = [];
        //       this.syncSelectedTrainingFromDetails();
        //     }
        //   });
        // Future API integration: call this block instead of the asset request above.
        this.trainingService.getPaged(1, 100).pipe(takeUntil(this.Destroy$)).subscribe({
            next: (response) => {
                this.trainingList = (response.items || [])
                    .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
                this.syncSelectedTrainingFromDetails();
            },
            error: (error) => {
                console.error('Failed to load training data.', { status: error.status });
                this.trainingList = [];
                this.syncSelectedTrainingFromDetails();
            }
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
        return String(training.displayName || '').trim()
            || String(training.trainingName || '').trim()
            || String(training.trainingId || 'Training');
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
    syncSelectedTrainingFromDetails() {
        const trainingId = String(this.testDetails.trainingId || '');
        this.selectedTrainingId = trainingId;
        if (!trainingId) {
            return;
        }
        const selected = this.trainingList.find((training) => { var _a; return String((_a = training.trainingId) !== null && _a !== void 0 ? _a : '') === trainingId; });
        if (selected) {
            this.testDetails.trainingName = selected.trainingName;
            this.trainingSearch = this.getTrainingLabel(selected);
        }
    }
    getValueOrNA(value) {
        const trimmed = (value || '').trim();
        return trimmed || 'NA';
    }
    downloadTestTemplate() {
        this.testStorage.downloadBlob(this.excelImport.buildAssessmentTemplate(), 'AssessmentImportTemplate.xlsx');
    }
    onAssessmentExcelSelected(event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        this.prepareAssessmentImport(file.name);
        this.testStorage.importAssessmentExcelToServer(file);
        this.excelImport.parseAssessmentExcel(file)
            .then((preview) => (this.assessmentImportPreview = preview))
            .catch(() => this.notifier.warningToastr('Assessment Excel file could not be read.'));
        input.value = '';
    }
    confirmAssessmentImport() {
        if (!this.assessmentImportPreview) {
            return;
        }
        this.excelImport.applyAssessmentImport(this.assessmentImportPreview)
            .then((result) => {
            this.assessmentImportResult = result;
            const preview = this.assessmentImportPreview;
            this.assessmentImportPreview = null;
            this.loadStoredQuestionBank();
            this.loadAvailableTests();
            if (preview === null || preview === void 0 ? void 0 : preview.testDefinition) {
                this.applyImportedAssessmentPreview(preview);
            }
            this.notifier.successToastr('Assessment Excel import completed.');
        })
            .catch(() => this.notifier.warningToastr('Assessment Excel import failed.'));
    }
    cancelAssessmentImport() {
        this.resetAssessmentImportState();
    }
    prepareAssessmentImport(fileName) {
        this.assessmentImportFileName = fileName;
        this.assessmentImportResult = null;
        this.assessmentImportPreview = null;
    }
    resetAssessmentImportState() {
        this.assessmentImportPreview = null;
        this.assessmentImportFileName = '';
        this.assessmentImportResult = null;
    }
    applyImportedAssessmentPreview(preview) {
        const definition = preview.testDefinition;
        if (!definition) {
            return;
        }
        this.testDetails = {
            testTitle: definition.testTitle,
            description: definition.description,
            trainingId: definition.trainingId,
            trainingName: definition.trainingName,
            subject: definition.subject,
            topic: definition.topic,
            durationMinutes: definition.durationMinutes,
            passingPercentage: definition.passingPercentage,
            instructions: definition.instructions,
            status: definition.status,
            totalQuestions: definition.totalQuestions
        };
        this.syncSelectedTrainingFromDetails();
        this.questions = preview.items
            .filter((item) => item.action !== 'failed' && item.action !== 'skip' && item.question)
            .sort((a, b) => a.questionOrder - b.questionOrder)
            .map((item, index) => (Object.assign(Object.assign({}, item.question), { questionNo: index + 1 })));
        this.loadedTestDefinition = definition;
        this.refreshQuestionNumbers();
    }
    getSelectedTestLabel() {
        if (!this.selectedTestKey) {
            return 'Open Test';
        }
        const selectedTest = this.availableTests.find((t) => t.optionKey === this.selectedTestKey);
        if (!selectedTest) {
            return 'Select Test';
        }
        return selectedTest.displayName || selectedTest.testName || 'Select Test';
    }
    get questionBankTotalPages() {
        return Math.max(1, Math.ceil(this.filteredQuestionBank.length / this.questionBankPageSize));
    }
    get pagedQuestionBank() {
        const start = (this.questionBankCurrentPage - 1) * this.questionBankPageSize;
        return this.filteredQuestionBank.slice(start, start + this.questionBankPageSize);
    }
    questionBankPrevPage() {
        if (this.questionBankCurrentPage > 1)
            this.questionBankCurrentPage--;
    }
    questionBankNextPage() {
        if (this.questionBankCurrentPage < this.questionBankTotalPages)
            this.questionBankCurrentPage++;
    }
    questionBankGoTo(page) {
        if (page >= 1 && page <= this.questionBankTotalPages)
            this.questionBankCurrentPage = page;
    }
    get mappedQuestionsTotalPages() {
        return Math.max(1, Math.ceil(this.questions.length / this.mappedQuestionsPageSize));
    }
    get pagedMappedQuestions() {
        const total = this.mappedQuestionsTotalPages;
        const currentPage = Math.max(1, Math.min(this.mappedQuestionsCurrentPage, total));
        const start = (currentPage - 1) * this.mappedQuestionsPageSize;
        return this.questions.slice(start, start + this.mappedQuestionsPageSize);
    }
    mappedQuestionsPrevPage() {
        if (this.mappedQuestionsCurrentPage > 1)
            this.mappedQuestionsCurrentPage--;
    }
    mappedQuestionsNextPage() {
        if (this.mappedQuestionsCurrentPage < this.mappedQuestionsTotalPages)
            this.mappedQuestionsCurrentPage++;
    }
    mappedQuestionsGoTo(page) {
        if (page >= 1 && page <= this.mappedQuestionsTotalPages)
            this.mappedQuestionsCurrentPage = page;
    }
    getMappedQuestionIndex(pageIndex) {
        return (this.mappedQuestionsCurrentPage - 1) * this.mappedQuestionsPageSize + pageIndex;
    }
    loadAvailableTests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tests = yield this.testStorage.listTestDefinitions();
                this.availableTests = tests
                    .map((test) => {
                    const assetFileName = test.assetFileName;
                    const optionKey = assetFileName
                        ? `asset:${assetFileName}`
                        : `local:${this.testStorage.normalizeFileName(test.testName)}`;
                    return Object.assign(Object.assign({}, test), { assetFileName,
                        optionKey });
                })
                    .sort((a, b) => (a.displayName || a.testName).localeCompare(b.displayName || b.testName));
            }
            catch (_a) {
                this.availableTests = [];
            }
        });
    }
    onSelectTest(selectedKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!selectedKey) {
                this.clearTestSelection();
                this.isTestDropdownOpen = false;
                return;
            }
            const [type, value] = selectedKey.split(':');
            const assetFileName = type === 'asset' ? value : undefined;
            const testName = type === 'local' ? value : '';
            try {
                const attempt = yield this.testStorage.resolveAssessmentQuestions(testName, assetFileName);
                if (!attempt) {
                    this.notifier.warningToastr('Could not load selected test.');
                    return;
                }
                const def = Object.assign({}, attempt.testDefinition);
                if (assetFileName) {
                    def.assetFileName = assetFileName;
                }
                this.selectedTestKey = selectedKey;
                this.isTestDropdownOpen = false;
                this.applySelectedTestDefinition(def, attempt.questions.map((question) => (Object.assign(Object.assign({}, question), { questionNo: question.questionNo }))));
                const availableQuestions = yield this.testStorage.loadAvailableQuestionsFromServer(def.testId);
                if (availableQuestions.length) {
                    this.questionBank = this.mergeQuestionBanks(this.questionBank, availableQuestions);
                }
            }
            catch (_a) {
                this.notifier.warningToastr('Could not load selected test.');
            }
        });
    }
    clearTestSelection() {
        this.selectedTestKey = '';
        this.isTestDropdownOpen = false;
        this.highlightedTestIndex = -1;
        this.testDetails = this.createEmptyTestDetails();
        this.trainingSearch = '';
        this.isTrainingDropdownOpen = false;
        this.selectedTrainingId = '';
        this.questions = [];
        this.refreshQuestionNumbers();
        this.loadedTestDefinition = null;
    }
    applySelectedTestDefinition(definition, mappedQuestions) {
        this.loadedTestDefinition = definition;
        this.testDetails = this.buildTestDetailsFromDefinition(definition);
        this.testFileType = this.normalizeTestFileType(definition.testFileType || definition.testType);
        this.syncSelectedTrainingFromDetails();
        this.questions = mappedQuestions.map((question) => (Object.assign(Object.assign({}, question), { questionNo: question.questionNo })));
        this.refreshQuestionNumbers();
    }
    buildTestDetailsFromDefinition(definition) {
        var _a;
        return {
            testTitle: definition.testTitle || definition.testName || '',
            description: definition.description || '',
            trainingId: definition.trainingId,
            trainingName: definition.trainingName,
            subject: definition.subject,
            topic: definition.topic,
            durationMinutes: definition.durationMinutes || 0,
            passingPercentage: definition.passingPercentage || 0,
            instructions: definition.instructions || '',
            status: definition.status,
            totalQuestions: definition.totalQuestions || ((_a = definition.mappedQuestionIds) === null || _a === void 0 ? void 0 : _a.length) || 0
        };
    }
    get dropdownOptions() {
        return ['', ...this.availableTests.map((test) => test.optionKey || '')];
    }
    toggleTestDropdown() {
        this.isTestDropdownOpen = !this.isTestDropdownOpen;
        if (this.isTestDropdownOpen) {
            const currentIndex = this.dropdownOptions.indexOf(this.selectedTestKey || '');
            this.highlightedTestIndex = currentIndex >= 0 ? currentIndex : 0;
        }
        else {
            this.highlightedTestIndex = -1;
        }
    }
    selectTestKey(selectedKey) {
        this.highlightedTestIndex = -1;
        this.onSelectTest(selectedKey);
    }
    onDropdownKeydown(event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!this.isTestDropdownOpen) {
                this.toggleTestDropdown();
                return;
            }
            const maxIndex = this.dropdownOptions.length - 1;
            if (event.key === 'ArrowDown') {
                this.highlightedTestIndex = this.highlightedTestIndex < maxIndex ? this.highlightedTestIndex + 1 : 0;
            }
            else {
                this.highlightedTestIndex = this.highlightedTestIndex > 0 ? this.highlightedTestIndex - 1 : maxIndex;
            }
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            if (this.isTestDropdownOpen && this.highlightedTestIndex >= 0) {
                event.preventDefault();
                const selectedKey = this.dropdownOptions[this.highlightedTestIndex];
                this.selectTestKey(selectedKey);
            }
            return;
        }
        if (event.key === 'Escape') {
            this.isTestDropdownOpen = false;
            this.highlightedTestIndex = -1;
            return;
        }
    }
    onDocumentClick(event) {
        const target = event.target;
        if (!target.closest('.test-dropdown')) {
            this.isTestDropdownOpen = false;
            this.highlightedTestIndex = -1;
        }
    }
    addQuestion() {
        this.clearQuestionForm();
    }
    editQuestion(index) {
        const question = this.questionBank[index];
        if (!question) {
            return;
        }
        this.patchQuestionForm(question, index);
    }
    editMappedQuestion(index) {
        const actualIndex = this.getMappedQuestionIndex(index);
        const mappedQuestion = this.questions[actualIndex];
        const bankIndex = this.questionBank.findIndex((question) => question.id === mappedQuestion.id);
        if (bankIndex > -1) {
            this.editQuestion(bankIndex);
        }
    }
    moveMappedQuestion(index, direction) {
        const actualIndex = this.getMappedQuestionIndex(index);
        this.moveQuestion(actualIndex, direction);
    }
    deleteMappedQuestion(index) {
        const actualIndex = this.getMappedQuestionIndex(index);
        this.deleteQuestion(actualIndex);
    }
    saveQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            this.questionSubmitted = true;
            this.questionErrors = this.validateQuestion();
            if (this.questionErrors.length) {
                return;
            }
            yield this.uploadPendingQuestionMediaFiles();
            const question = this.buildQuestionFromForm();
            if (this.editingIndex === null) {
                this.questionBank = [...this.questionBank, question];
            }
            else {
                this.questionBank = this.questionBank.map((item, index) => (index === this.editingIndex ? question : item));
                this.questions = this.questions.map((item) => (item.id === question.id ? Object.assign(Object.assign({}, question), { questionNo: item.questionNo }) : item));
            }
            this.refreshQuestionNumbers();
            this.clearQuestionForm();
            this.saveCurrentQuestionBank();
            this.notifier.successToastr('Question saved to question bank.');
        });
    }
    deleteQuestion(index) {
        var _a;
        const question = this.questions[index];
        const testId = (_a = this.loadedTestDefinition) === null || _a === void 0 ? void 0 : _a.testId;
        if (question && testId) {
            this.testStorage.unmapQuestionFromTestOnServer(testId, this.getQuestionMapId(question));
        }
        this.questions = this.questions.filter((_question, questionIndex) => questionIndex !== index);
        this.refreshQuestionNumbers();
    }
    deleteQuestionFromBank(index) {
        const question = this.questionBank[index];
        if (!question) {
            return;
        }
        this.testStorage.deleteQuestionFromServer(this.getQuestionMapId(question));
        this.questionBank = this.questionBank.filter((_item, questionIndex) => questionIndex !== index);
        this.questions = this.questions.filter((item) => item.id !== question.id);
        this.refreshQuestionNumbers();
        if (this.editingIndex === index) {
            this.clearQuestionForm();
        }
    }
    mapQuestionToTest(index) {
        const question = this.questionBank[index];
        this.mapQuestionToTestByQuestion(question);
    }
    mapQuestionToTestByQuestion(question) {
        var _a;
        if (!question || this.isQuestionMapped(question.id)) {
            return;
        }
        const max = (_a = this.testDetails.totalQuestions) !== null && _a !== void 0 ? _a : null;
        if (max !== null && max !== undefined && this.questions.length >= max) {
            this.notifier.warningToastr(`Cannot map more than ${max} question(s) to this test.`);
            return;
        }
        const desiredPosition = this.mapQuestionPositions[question.id];
        const insertIndex = desiredPosition && desiredPosition > 0 && desiredPosition <= this.questions.length + 1
            ? desiredPosition - 1
            : this.questions.length;
        const updatedQuestions = [...this.questions];
        updatedQuestions.splice(insertIndex, 0, Object.assign(Object.assign({}, question), { questionNo: insertIndex + 1 }));
        this.questions = updatedQuestions.map((q, index) => (Object.assign(Object.assign({}, q), { questionNo: index + 1 })));
        this.mapQuestionPositions[question.id] = null;
        this.refreshQuestionNumbers();
        this.notifier.successToastr('Question mapped to test.');
    }
    setMapQuestionPosition(questionId, value) {
        this.mapQuestionPositions[questionId] = value;
    }
    parseMapPosition(value) {
        const num = Number(value);
        return Number.isInteger(num) && num > 0 ? num : null;
    }
    editQuestionByQuestion(question) {
        const index = this.questionBank.findIndex((item) => item.id === question.id);
        if (index > -1) {
            this.editQuestion(index);
        }
    }
    deleteQuestionFromBankByQuestion(question) {
        const index = this.questionBank.findIndex((item) => item.id === question.id);
        if (index > -1) {
            this.deleteQuestionFromBank(index);
        }
    }
    isQuestionMapped(questionId) {
        return this.questions.some((question) => question.id === questionId);
    }
    getQuestionMapId(question) {
        return question.questionId || `${question.id}`;
    }
    moveQuestion(index, direction) {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= this.questions.length) {
            return;
        }
        const reordered = [...this.questions];
        const current = reordered[index];
        reordered[index] = reordered[nextIndex];
        reordered[nextIndex] = current;
        this.questions = reordered;
        this.refreshQuestionNumbers();
    }
    clearQuestionForm() {
        this.editingIndex = null;
        this.questionSubmitted = false;
        this.questionErrors = [];
        this.questionForm = this.createEmptyQuestionForm();
        this.clearPendingQuestionMediaFiles();
    }
    onQuestionTypeChange() {
        this.questionErrors = [];
        if (this.questionForm.questionType === 'TRUE_FALSE') {
            this.questionForm.options = this.createTrueFalseOptions();
            this.questionForm.correctOptionIds = [];
            this.questionForm.correctOptionId = this.questionForm.correctOptionId === 'true' || this.questionForm.correctOptionId === 'false'
                ? this.questionForm.correctOptionId
                : '';
            return;
        }
        if (this.questionForm.questionType === 'ESSAY') {
            this.questionForm.options = [];
            this.questionForm.correctOptionId = '';
            this.questionForm.correctOptionIds = [];
            this.questionForm.manualReviewRequired = true;
            return;
        }
        if (!this.questionForm.options.length) {
            this.questionForm.options = [this.createOption(), this.createOption()];
        }
        this.questionForm.correctOptionId = '';
        this.questionForm.correctOptionIds = [];
    }
    addOption() {
        if (!this.shouldShowOptions) {
            return;
        }
        this.questionForm.options = [...this.questionForm.options, this.createOption()];
    }
    removeOption(index) {
        const option = this.questionForm.options[index];
        this.questionForm.options = this.questionForm.options.filter((_item, optionIndex) => optionIndex !== index);
        this.questionForm.correctOptionIds = this.questionForm.correctOptionIds.filter((optionId) => optionId !== option.id);
        if (this.questionForm.correctOptionId === option.id) {
            this.questionForm.correctOptionId = '';
        }
    }
    toggleCorrectOption(optionId) {
        if (this.questionForm.questionType === 'MCSA' || this.questionForm.questionType === 'TRUE_FALSE') {
            this.questionForm.correctOptionId = optionId;
            this.questionForm.correctOptionIds = [optionId];
            return;
        }
        if (this.questionForm.correctOptionIds.includes(optionId)) {
            this.questionForm.correctOptionIds = this.questionForm.correctOptionIds.filter((id) => id !== optionId);
        }
        else {
            this.questionForm.correctOptionIds = [...this.questionForm.correctOptionIds, optionId];
        }
        this.questionForm.correctOptionId = this.questionForm.correctOptionIds[0] || '';
    }
    isCorrectOption(optionId) {
        if (this.questionForm.questionType === 'MCMA') {
            return this.questionForm.correctOptionIds.includes(optionId);
        }
        return this.questionForm.correctOptionId === optionId;
    }
    buildMediaAssetPath(folder, fileName) {
        const rawName = fileName.trim().replace(/\\/g, '/').split('/').pop() || fileName;
        const sanitized = rawName
            .trim()
            .replace(/\s+/g, '')
            .replace(/[^a-zA-Z0-9._-]/g, '');
        return `${this.mediaAssetRoot}/${this.mediaFolders[folder]}/${sanitized}`;
    }
    onQuestionMediaFileSelected(field, event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
        this.pendingQuestionMediaFiles[field] = file;
        this.questionForm[field] = this.buildMediaAssetPath(folder, file.name);
        input.value = '';
    }
    removeQuestionMediaFile(field) {
        delete this.pendingQuestionMediaFiles[field];
        this.questionForm[field] = '';
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
        this.questionForm.options = this.questionForm.options.map((option, index) => index === optionIndex ? Object.assign(Object.assign({}, option), { imageUrl }) : option);
    }
    uploadPendingQuestionMediaFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const mediaFields = Object.entries(this.pendingQuestionMediaFiles);
            for (const [field, file] of mediaFields) {
                const mediaType = field === 'audioUrl' ? 'audio' : field === 'videoUrl' ? 'video' : 'image';
                const folder = field === 'audioUrl' ? 'audios' : field === 'videoUrl' ? 'videos' : 'images';
                const fallbackPath = this.buildMediaAssetPath(folder, file.name);
                const uploadedPath = yield this.testStorage.uploadMediaFile(mediaType, file, 'question');
                this.questionForm[field] = uploadedPath || fallbackPath;
            }
            for (const [indexKey, file] of Object.entries(this.pendingOptionImageFiles)) {
                const optionIndex = Number(indexKey);
                const fallbackPath = this.buildMediaAssetPath('images', file.name);
                const uploadedPath = yield this.testStorage.uploadMediaFile('image', file, 'answer');
                this.setOptionImage(optionIndex, uploadedPath || fallbackPath);
            }
        });
    }
    clearPendingQuestionMediaFiles() {
        this.pendingQuestionMediaFiles = {};
        this.pendingOptionImageFiles = {};
    }
    calculateTotalMarks() {
        return this.questions.reduce((total, question) => total + this.getValidMarks(question.marks), 0);
    }
    previewTest() {
        this.showPreview = !this.showPreview;
    }
    saveDraft() {
        this.detailSubmitted = true;
        this.detailErrors = this.validateTestDetails();
        if (this.detailErrors.length) {
            return;
        }
        const payload = this.buildPayload();
        const displayName = payload.displayName || payload.testName;
        this.lastPayload = payload;
        this.lastSavedFileName = this.testStorage.buildAssessmentFileName(displayName);
        this.testStorage.saveAssessmentAndGet(Object.assign(Object.assign({}, payload), { testFileType: this.testFileType, questions: this.questions }))
            .then((savedTest) => {
            this.lastSavedFileName = `${savedTest.testId}.json`;
            return this.testStorage.saveAssessmentFileToServer(Object.assign(Object.assign({}, savedTest), { testFileType: this.testFileType, questions: this.questions }), this.testFileType);
        })
            .then(() => {
            // Test-file browser download is intentionally disabled. Keep this code for future use.
            // this.testStorage.exportAssessment(displayName)
            //   .then((blob) => this.testStorage.downloadBlob(blob, this.lastSavedFileName));
            this.notifier.successToastr(`Encrypted ${this.testFileType} test file saved on the API server: ${this.lastSavedFileName}`);
            this.clearCreateTestForm();
            this.loadAvailableTests();
        })
            .catch((error) => {
            console.error('[CreateTest] Assessment save failed.', error);
            this.notifier.warningToastr('Assessment or encrypted API file could not be saved.');
        });
    }
    clearCreateTestForm() {
        this.clearTestSelection();
        this.clearQuestionForm();
        this.testFileType = 'assessment';
        this.showPreview = false;
        this.detailSubmitted = false;
        this.detailErrors = [];
        this.lastPayload = null;
        this.lastSavedFileName = '';
        this.questionBankSearch = '';
        this.questionBankTypeFilter = '';
        this.questionBankDifficultyFilter = '';
        this.questionBankSubjectFilter = '';
        this.questionBankTopicFilter = '';
        this.questionBankMarksFilter = null;
        this.questionBankCurrentPage = 1;
        this.mappedQuestionsCurrentPage = 1;
        this.mapQuestionPositions = {};
        this.resetAssessmentImportState();
    }
    getTestFileFolder() {
        return `assets/test/${this.testFileType}`;
    }
    normalizeTestFileType(value) {
        const normalized = String(value || '').trim().toLowerCase();
        return normalized === 'pre' || normalized === 'post' || normalized === 'chalange' ? normalized : 'assessment';
    }
    buildPayload() {
        var _a, _b, _c;
        const testTitle = this.getTrimmedValue(this.testDetails.testTitle);
        const fileName = this.testStorage.normalizeFileName(testTitle);
        const now = new Date().toISOString();
        const baseId = ((_a = this.loadedTestDefinition) === null || _a === void 0 ? void 0 : _a.testId) || `test-${Date.now()}`;
        const createdAt = ((_b = this.loadedTestDefinition) === null || _b === void 0 ? void 0 : _b.createdAt) || now;
        const version = (((_c = this.loadedTestDefinition) === null || _c === void 0 ? void 0 : _c.version) || 0) + 1;
        const mappedQuestionIds = this.questions.map((question) => this.getQuestionMapId(question));
        return {
            testId: baseId,
            testName: testTitle,
            displayName: testTitle,
            fileName,
            testTitle,
            description: this.getTrimmedValue(this.testDetails.description),
            trainingId: this.testDetails.trainingId,
            trainingName: this.testDetails.trainingName,
            testFileType: this.testFileType,
            subject: this.getValueOrNA(this.testDetails.subject),
            topic: this.getValueOrNA(this.testDetails.topic),
            durationMinutes: this.getPositiveNumber(this.testDetails.durationMinutes, DEFAULT_DURATION_MINUTES),
            passingPercentage: this.getPositiveNumber(this.testDetails.passingPercentage, DEFAULT_PASSING_PERCENTAGE),
            instructions: this.getTrimmedValue(this.testDetails.instructions),
            status: this.testDetails.status,
            createdAt,
            updatedAt: now,
            totalQuestions: this.testDetails.totalQuestions || this.questions.length,
            totalMarks: this.totalMarks,
            mappedQuestionIds,
            questionOrder: mappedQuestionIds,
            version
        };
    }
    getQuestionTypeLabel(type) {
        const labels = {
            MCSA: 'MCSA',
            MCMA: 'MCMA',
            TRUE_FALSE: 'True / False',
            ESSAY: 'Essay'
        };
        return labels[type];
    }
    getOptionLabel(index) {
        return String.fromCharCode(65 + index);
    }
    trackByQuestionId(_index, question) {
        return question.id;
    }
    trackByOptionId(_index, option) {
        return option.id;
    }
    exportQuestionBank() {
        this.testStorage.exportQuestionBank()
            .then((blob) => this.testStorage.downloadBlob(blob, 'QuestionBank.json'))
            .catch(() => this.notifier.warningToastr('Question bank export failed.'));
    }
    importQuestionBank(event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        this.testStorage.importQuestionBank(file)
            .then((questions) => {
            this.questionBank = questions;
            this.questions = [];
            this.refreshQuestionNumbers();
            this.notifier.successToastr('Encrypted question bank imported.');
            input.value = '';
        })
            .catch(() => this.notifier.warningToastr('Question bank import failed.'));
    }
    updateQuestionBank() {
        this.saveCurrentQuestionBank();
        this.notifier.successToastr('Question bank updated locally.');
    }
    loadStoredQuestionBank() {
        this.testStorage.loadQuestionBank([])
            .then((questions) => {
            this.questionBank = questions;
        })
            .catch(() => this.notifier.warningToastr('Stored question bank could not be loaded.'));
    }
    saveCurrentQuestionBank() {
        this.testStorage.saveQuestionBank(this.questionBank)
            .catch(() => this.notifier.warningToastr('Question bank could not be saved locally.'));
    }
    patchQuestionForm(question, index) {
        this.editingIndex = index;
        this.questionSubmitted = false;
        this.questionErrors = [];
        this.clearPendingQuestionMediaFiles();
        this.questionForm = {
            id: question.id,
            questionType: question.questionType,
            subject: question.subject,
            topic: question.topic,
            difficulty: question.difficulty,
            questionText: question.questionText,
            questionImageUrl: question.questionImageUrl || '',
            audioUrl: question.audioUrl || '',
            videoUrl: question.videoUrl || '',
            options: (question.options || []).map((option) => (Object.assign({}, option))),
            correctOptionId: question.correctOptionId || '',
            correctOptionIds: [...(question.correctOptionIds || [])],
            expectedAnswer: question.expectedAnswer || '',
            sampleAnswer: question.sampleAnswer || '',
            manualReviewRequired: !!question.manualReviewRequired,
            explanation: question.explanation || '',
            explanationImageUrl: question.explanationImageUrl || '',
            marks: question.marks,
            negativeMarks: question.negativeMarks,
            estimatedTimeSeconds: question.estimatedTimeSeconds
        };
    }
    validateTestDetails() {
        var _a, _b;
        const errors = [];
        if (!this.testDetails.testTitle.trim()) {
            errors.push('Test title is required.');
        }
        if (!this.testDetails.durationMinutes || this.testDetails.durationMinutes <= 0) {
            errors.push('Duration must be greater than 0.');
        }
        if (!this.questions.length) {
            errors.push('Map at least 1 question to the test.');
        }
        if (this.testFileType !== 'assessment') {
            if (!this.testDetails.trainingId) {
                errors.push('Training is required for Pre, Post, and Chalange tests.');
            }
            else {
                const training = this.trainingList.find((item) => { var _a; return String((_a = item.trainingId) !== null && _a !== void 0 ? _a : '') === String(this.testDetails.trainingId); });
                const linkedTestId = training ? this.getLinkedTestId(training, this.testFileType) : '';
                const editingTestId = String((_b = (_a = this.loadedTestDefinition) === null || _a === void 0 ? void 0 : _a.testId) !== null && _b !== void 0 ? _b : '').trim();
                if (linkedTestId && linkedTestId !== editingTestId) {
                    errors.push(`This training already has a ${this.testFileType} test (Test ID: ${linkedTestId}).`);
                }
            }
        }
        if (this.testDetails.totalQuestions && this.testDetails.totalQuestions < this.questions.length) {
            errors.push('Total questions cannot be less than currently mapped questions.');
        }
        return errors;
    }
    getLinkedTestId(training, type) {
        const value = type === 'pre'
            ? training.preTestId
            : type === 'post'
                ? training.postTestId
                : training.chalangeTestId;
        return String(value !== null && value !== void 0 ? value : '').trim();
    }
    validateQuestion() {
        const errors = [];
        const questionType = this.questionForm.questionType;
        if (!this.questionForm.questionText.trim()) {
            errors.push('Question text is required.');
        }
        if (!questionType) {
            errors.push('Question type is required.');
        }
        if (questionType === 'MCSA') {
            this.validateOptionQuestion(errors, false);
        }
        if (questionType === 'MCMA') {
            this.validateOptionQuestion(errors, true);
        }
        if (questionType === 'TRUE_FALSE' && !this.questionForm.correctOptionId) {
            errors.push('Select the correct True / False answer.');
        }
        if (questionType === 'ESSAY' && !this.questionForm.expectedAnswer.trim() && !this.questionForm.sampleAnswer.trim()) {
            errors.push('Essay question must have an expected answer or sample answer.');
        }
        return errors;
    }
    validateOptionQuestion(errors, allowMultipleCorrect) {
        const validOptions = this.questionForm.options.filter((option) => option.text.trim());
        if (validOptions.length < 2) {
            errors.push(`${this.questionForm.questionType} must have at least 2 options.`);
        }
        if (allowMultipleCorrect) {
            const validCorrectIds = this.questionForm.correctOptionIds.filter((optionId) => validOptions.some((option) => option.id === optionId));
            if (!validCorrectIds.length) {
                errors.push('Select at least 1 correct answer.');
            }
            return;
        }
        if (!this.questionForm.correctOptionId || !validOptions.some((option) => option.id === this.questionForm.correctOptionId)) {
            errors.push('Select 1 correct answer.');
        }
    }
    buildQuestionFromForm() {
        const questionType = this.questionForm.questionType;
        const options = this.buildOptionsForQuestion();
        const correctOptionIds = questionType === 'MCMA'
            ? this.questionForm.correctOptionIds.filter((optionId) => options.some((option) => option.id === optionId))
            : (this.questionForm.correctOptionId ? [this.questionForm.correctOptionId] : []);
        return {
            id: this.questionForm.id || Date.now(),
            questionNo: this.editingIndex === null ? this.questionBank.length + 1 : this.questionBank[this.editingIndex].questionNo,
            questionType,
            subject: this.getValueOrNA(this.questionForm.subject || this.testDetails.subject),
            topic: this.getValueOrNA(this.questionForm.topic || this.testDetails.topic),
            difficulty: this.questionForm.difficulty,
            questionText: this.questionForm.questionText.trim(),
            questionImageUrl: this.cleanOptionalValue(this.questionForm.questionImageUrl),
            audioUrl: this.cleanOptionalValue(this.questionForm.audioUrl),
            videoUrl: this.cleanOptionalValue(this.questionForm.videoUrl),
            options: questionType === 'ESSAY' ? undefined : options,
            correctOptionId: questionType === 'MCMA' ? correctOptionIds[0] : this.cleanOptionalValue(this.questionForm.correctOptionId),
            correctOptionIds,
            expectedAnswer: this.cleanOptionalValue(this.questionForm.expectedAnswer),
            sampleAnswer: this.cleanOptionalValue(this.questionForm.sampleAnswer),
            manualReviewRequired: questionType === 'ESSAY' ? this.questionForm.manualReviewRequired : false,
            explanation: this.questionForm.explanation.trim(),
            explanationImageUrl: this.cleanOptionalValue(this.questionForm.explanationImageUrl),
            marks: this.getValidMarks(this.questionForm.marks),
            negativeMarks: this.questionForm.negativeMarks || 0,
            estimatedTimeSeconds: this.getPositiveNumber(this.questionForm.estimatedTimeSeconds, 60)
        };
    }
    buildOptionsForQuestion() {
        if (this.questionForm.questionType === 'TRUE_FALSE') {
            return this.createTrueFalseOptions();
        }
        return this.questionForm.options
            .filter((option) => option.text.trim())
            .map((option) => ({
            id: option.id,
            text: option.text.trim(),
            imageUrl: this.cleanOptionalValue(option.imageUrl)
        }));
    }
    mergeQuestionBanks(existingQuestions, incomingQuestions) {
        const questions = new Map();
        existingQuestions.forEach((question) => questions.set(this.getQuestionMapId(question), question));
        incomingQuestions.forEach((question) => questions.set(this.getQuestionMapId(question), question));
        return Array.from(questions.values());
    }
    refreshQuestionNumbers() {
        this.questions = this.questions.map((question, index) => (Object.assign(Object.assign({}, question), { questionNo: index + 1 })));
        this.mappedQuestionsCurrentPage = Math.min(this.mappedQuestionsCurrentPage, this.mappedQuestionsTotalPages);
        if (this.mappedQuestionsCurrentPage < 1) {
            this.mappedQuestionsCurrentPage = 1;
        }
    }
    createEmptyTestDetails() {
        return {
            testTitle: '',
            description: '',
            subject: 'NA',
            topic: 'NA',
            durationMinutes: DEFAULT_DURATION_MINUTES,
            passingPercentage: DEFAULT_PASSING_PERCENTAGE,
            instructions: '',
            status: DEFAULT_TEST_STATUS,
            totalQuestions: null
        };
    }
    createEmptyQuestionForm() {
        return {
            id: null,
            questionType: 'MCSA',
            subject: '',
            topic: '',
            difficulty: 'Easy',
            questionText: '',
            questionImageUrl: '',
            audioUrl: '',
            videoUrl: '',
            options: [this.createOption(), this.createOption()],
            correctOptionId: '',
            correctOptionIds: [],
            expectedAnswer: '',
            sampleAnswer: '',
            manualReviewRequired: false,
            explanation: '',
            explanationImageUrl: '',
            marks: DEFAULT_QUESTION_MARKS,
            negativeMarks: 0,
            estimatedTimeSeconds: DEFAULT_ESTIMATED_TIME_SECONDS
        };
    }
    createOption() {
        return {
            id: `option-${Date.now()}-${Math.round(Math.random() * 10000)}`,
            text: '',
            imageUrl: ''
        };
    }
    createTrueFalseOptions() {
        return [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' }
        ];
    }
    getValidMarks(value) {
        return value && value > 0 ? value : DEFAULT_QUESTION_MARKS;
    }
    getPositiveNumber(value, fallback) {
        return value && value > 0 ? value : fallback;
    }
    getTrimmedValue(value) {
        return (value || '').trim();
    }
    cleanOptionalValue(value) {
        const cleanValue = this.getTrimmedValue(value);
        return cleanValue || undefined;
    }
}
CreateTestComponent.ɵfac = function CreateTestComponent_Factory(t) { return new (t || CreateTestComponent)(i0.ɵɵdirectiveInject(i1.NotifierService), i0.ɵɵdirectiveInject(i2.TestStorageService), i0.ɵɵdirectiveInject(i3.TestExcelImportService), i0.ɵɵdirectiveInject(i4.HttpClient), i0.ɵɵdirectiveInject(i5.DataService), i0.ɵɵdirectiveInject(i6.TrainingManagementService)); };
CreateTestComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateTestComponent, selectors: [["app-create-test"]], hostBindings: function CreateTestComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function CreateTestComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
    } }, decls: 129, vars: 46, consts: [[1, "admin-section", "create-test-section"], [1, "container", "admin-shell", "create-test-shell"], [1, "admin-header"], [1, "auth-eyebrow"], [1, "admin-actions"], ["routerLink", "/admin/create-question", 1, "btn", "btn-outline"], ["routerLink", "/test", 1, "btn", "btn-outline"], [1, "btn", "btn-outline", "import-bank-btn"], ["type", "file", "accept", ".xlsx,.xls,.csv", 3, "change"], ["class", "admin-table-wrap import-preview-panel", 4, "ngIf"], [1, "create-test-layout"], [1, "admin-form", "create-card"], [1, "section-title-row"], [1, "test-selection-row", "test-dropdown"], ["type", "button", "aria-haspopup", "listbox", 1, "btn", "btn-outline", "btn-small", "dropdown-toggle", 3, "click", "keydown"], [1, "dropdown-icon"], ["class", "dropdown-menu", "role", "listbox", 4, "ngIf"], [1, "form-grid"], [1, "form-field", "training-search-field"], [1, "training-search-control"], ["type", "button", "aria-haspopup", "listbox", 1, "btn", "btn-outline", "btn-small", "training-dropdown-toggle", 3, "click"], ["class", "training-search-menu", "role", "listbox", 4, "ngIf"], [1, "form-field"], ["name", "testFileType", 3, "ngModel", "ngModelChange"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["type", "text", "name", "testTitle", "placeholder", "Enter test title", 3, "ngModel", "ngModelChange"], [4, "ngIf"], ["type", "number", "min", "1", "name", "durationMinutes", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "1", "name", "totalQuestions", 3, "ngModel", "ngModelChange"], ["type", "number", "readonly", "", 3, "value"], ["type", "number", "min", "1", "max", "100", "name", "passingPercentage", 3, "ngModel", "ngModelChange"], ["name", "status", 3, "ngModel", "ngModelChange"], ["rows", "4", "name", "description", "placeholder", "Describe the test", 3, "ngModel", "ngModelChange"], ["rows", "4", "name", "instructions", "placeholder", "Add instructions for test takers", 3, "ngModel", "ngModelChange"], ["class", "validation-list", 4, "ngIf"], ["class", "file-note", 4, "ngIf"], [1, "admin-tools", "create-card", "create-summary"], [1, "summary-strip"], ["routerLink", "/admin/create-question", 1, "btn", "btn-primary"], ["class", "question-list", 4, "ngIf", "ngIfElse"], ["noMappedQuestions", ""], [1, "admin-table-wrap", "question-bank-panel"], [1, "section-title-row", "question-bank-head"], [1, "bank-meta"], [1, "bank-count"], ["class", "mapping-summary", 4, "ngIf"], [1, "bank-filters"], ["type", "text", "name", "questionBankSearch", "placeholder", "Search question, subject, topic", 3, "ngModel", "ngModelChange"], ["name", "questionBankTypeFilter", 3, "ngModel", "ngModelChange"], [3, "ngValue"], ["name", "questionBankDifficultyFilter", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "questionBankSubjectFilter", "placeholder", "Subject", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "questionBankTopicFilter", "placeholder", "Topic", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "questionBankMarksFilter", "placeholder", "Marks", 3, "ngModel", "ngModelChange"], ["class", "mapping-info", 4, "ngIf"], ["class", "question-list question-list--bank", 4, "ngIf", "ngIfElse"], ["emptyQuestionBank", ""], [1, "admin-actions", "page-actions"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["class", "admin-table-wrap preview-panel", 4, "ngIf"], [1, "admin-table-wrap", "import-preview-panel"], [1, "import-file-name"], ["class", "preview-instructions", 4, "ngIf"], [1, "import-summary-grid"], [1, "import-table-wrap"], [1, "import-table"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [1, "preview-instructions"], [1, "validation-list"], [1, "file-note"], ["role", "listbox", 1, "dropdown-menu"], ["type", "button", 1, "dropdown-item", 3, "click"], ["class", "dropdown-item", "type", "button", 3, "highlighted", "click", 4, "ngFor", "ngForOf"], ["role", "listbox", 1, "training-search-menu"], ["type", "text", "name", "trainingSearch", "placeholder", "Search training", "autocomplete", "off", 3, "ngModel", "ngModelChange", "input"], ["class", "training-search-option", "type", "button", "role", "option", 3, "mousedown", 4, "ngFor", "ngForOf"], ["class", "training-search-empty", 4, "ngIf"], ["type", "button", "role", "option", 1, "training-search-option", 3, "mousedown"], [1, "training-search-empty"], [1, "question-list"], ["class", "question-list-item", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "pagination", 4, "ngIf"], [1, "question-list-item"], [1, "row-actions"], ["type", "button", 1, "table-link", 3, "disabled", "click"], ["type", "button", 1, "table-link", 3, "click"], ["type", "button", 1, "table-link", "table-link--danger", 3, "click"], [1, "pagination"], ["type", "button", 1, "btn", "btn-outline", 3, "disabled", "click"], [1, "pagination-info"], [1, "empty-state"], [1, "mapping-summary"], [1, "mapping-remaining"], [1, "mapping-info"], ["class", "mapping-warning", 4, "ngIf"], [1, "mapping-warning"], [1, "question-list", "question-list--bank"], [1, "question-left"], [1, "question-number-badge"], ["type", "number", "min", "1", "placeholder", "Map #", 1, "map-position", 3, "max", "value", "input"], ["type", "button", 1, "table-link", "map-btn", 3, "disabled", "click"], [4, "ngIf", "ngIfElse"], ["mapLabel", ""], ["class", "map-badge", 4, "ngIf"], [1, "map-badge"], [1, "admin-table-wrap", "preview-panel"], [1, "preview-head"], [1, "preview-stats"], ["class", "preview-question", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "preview-question"], [1, "preview-question__head"], ["class", "media-preview", 4, "ngIf"], ["class", "preview-options", 4, "ngIf"], ["class", "preview-answer", 4, "ngIf"], [1, "preview-explanation"], ["alt", "Explanation media", 3, "src", 4, "ngIf"], [1, "media-preview"], ["alt", "Question media", 3, "src", 4, "ngIf"], ["controls", "", "preload", "none", 4, "ngIf"], ["controls", "", "preload", "metadata", 4, "ngIf"], ["alt", "Question media", 3, "src"], ["controls", "", "preload", "none"], [3, "src"], ["controls", "", "preload", "metadata"], [1, "preview-options"], ["class", "preview-option", 3, "preview-option--correct", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "preview-option"], ["alt", "Option media", 3, "src", 4, "ngIf"], ["alt", "Option media", 3, "src"], [1, "preview-answer"], ["alt", "Explanation media", 3, "src"]], template: function CreateTestComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
        i0.ɵɵtext(5, "Admin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵtext(7, "Create Test");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div", 4)(9, "a", 5);
        i0.ɵɵtext(10, "Question Bank");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "a", 6);
        i0.ɵɵtext(12, "View Test Page");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "label", 7);
        i0.ɵɵtext(14, "Import Test From Excel");
        i0.ɵɵelementStart(15, "input", 8);
        i0.ɵɵlistener("change", function CreateTestComponent_Template_input_change_15_listener($event) { return ctx.onAssessmentExcelSelected($event); });
        i0.ɵɵelementEnd()()()();
        i0.ɵɵtemplate(16, CreateTestComponent_section_16_Template, 9, 2, "section", 9);
        i0.ɵɵelementStart(17, "div", 10)(18, "section", 11)(19, "div", 12)(20, "h2");
        i0.ɵɵtext(21, "Test Basic Details");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "div", 13)(23, "button", 14);
        i0.ɵɵlistener("click", function CreateTestComponent_Template_button_click_23_listener() { return ctx.toggleTestDropdown(); })("keydown", function CreateTestComponent_Template_button_keydown_23_listener($event) { return ctx.onDropdownKeydown($event); });
        i0.ɵɵtext(24);
        i0.ɵɵelementStart(25, "span", 15);
        i0.ɵɵtext(26, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(27, CreateTestComponent_div_27_Template, 4, 3, "div", 16);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(28, "div", 17)(29, "label", 18);
        i0.ɵɵtext(30, " Training ");
        i0.ɵɵelementStart(31, "div", 19)(32, "button", 20);
        i0.ɵɵlistener("click", function CreateTestComponent_Template_button_click_32_listener() { return ctx.toggleTrainingDropdown(); });
        i0.ɵɵtext(33);
        i0.ɵɵelementStart(34, "span", 15);
        i0.ɵɵtext(35, "\u25BE");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(36, CreateTestComponent_div_36_Template, 4, 3, "div", 21);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(37, "label", 22);
        i0.ɵɵtext(38, " Test File Type ");
        i0.ɵɵelementStart(39, "select", 23);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_select_ngModelChange_39_listener($event) { return ctx.testFileType = $event; });
        i0.ɵɵtemplate(40, CreateTestComponent_option_40_Template, 3, 4, "option", 24);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(41, "label", 22);
        i0.ɵɵtext(42, " Test Title ");
        i0.ɵɵelementStart(43, "input", 25);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_43_listener($event) { return ctx.testDetails.testTitle = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(44, CreateTestComponent_small_44_Template, 2, 0, "small", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "label", 22);
        i0.ɵɵtext(46, " Duration in Minutes ");
        i0.ɵɵelementStart(47, "input", 27);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_47_listener($event) { return ctx.testDetails.durationMinutes = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(48, CreateTestComponent_small_48_Template, 2, 0, "small", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(49, "label", 22);
        i0.ɵɵtext(50, " Total Questions ");
        i0.ɵɵelementStart(51, "input", 28);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_51_listener($event) { return ctx.testDetails.totalQuestions = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(52, CreateTestComponent_small_52_Template, 2, 0, "small", 26);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(53, "label", 22);
        i0.ɵɵtext(54, " Total Marks ");
        i0.ɵɵelement(55, "input", 29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(56, "label", 22);
        i0.ɵɵtext(57, " Passing Percentage ");
        i0.ɵɵelementStart(58, "input", 30);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_58_listener($event) { return ctx.testDetails.passingPercentage = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(59, "label", 22);
        i0.ɵɵtext(60, " Status ");
        i0.ɵɵelementStart(61, "select", 31);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_select_ngModelChange_61_listener($event) { return ctx.testDetails.status = $event; });
        i0.ɵɵtemplate(62, CreateTestComponent_option_62_Template, 2, 2, "option", 24);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(63, "label", 22);
        i0.ɵɵtext(64, " Test Description ");
        i0.ɵɵelementStart(65, "textarea", 32);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_textarea_ngModelChange_65_listener($event) { return ctx.testDetails.description = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(66, "label", 22);
        i0.ɵɵtext(67, " Instructions ");
        i0.ɵɵelementStart(68, "textarea", 33);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_textarea_ngModelChange_68_listener($event) { return ctx.testDetails.instructions = $event; });
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(69, CreateTestComponent_div_69_Template, 2, 1, "div", 34);
        i0.ɵɵtemplate(70, CreateTestComponent_div_70_Template, 6, 2, "div", 35);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(71, "aside", 36)(72, "h2");
        i0.ɵɵtext(73, "Mapped Questions");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(74, "div", 37)(75, "div")(76, "strong");
        i0.ɵɵtext(77);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(78, "span");
        i0.ɵɵtext(79, "Mapped");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(80, "div")(81, "strong");
        i0.ɵɵtext(82);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(83, "span");
        i0.ɵɵtext(84, "Bank");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(85, "div")(86, "strong");
        i0.ɵɵtext(87);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(88, "span");
        i0.ɵɵtext(89, "Marks");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(90, "a", 38);
        i0.ɵɵtext(91, "Manage Question Bank");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(92, CreateTestComponent_div_92_Template, 3, 3, "div", 39);
        i0.ɵɵtemplate(93, CreateTestComponent_ng_template_93_Template, 2, 0, "ng-template", null, 40, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(95, "section", 41)(96, "div", 42)(97, "div")(98, "span", 3);
        i0.ɵɵtext(99, "Question Facility");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(100, "h2");
        i0.ɵɵtext(101, "Question Bank");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(102, "div", 43)(103, "span", 44);
        i0.ɵɵtext(104);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(105, CreateTestComponent_div_105_Template, 13, 3, "div", 45);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(106, "div", 46)(107, "input", 47);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_107_listener($event) { return ctx.questionBankSearch = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(108, "select", 48);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_select_ngModelChange_108_listener($event) { return ctx.questionBankTypeFilter = $event; });
        i0.ɵɵelementStart(109, "option", 49);
        i0.ɵɵtext(110, "All Types");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(111, CreateTestComponent_option_111_Template, 2, 2, "option", 24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(112, "select", 50);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_select_ngModelChange_112_listener($event) { return ctx.questionBankDifficultyFilter = $event; });
        i0.ɵɵelementStart(113, "option", 49);
        i0.ɵɵtext(114, "All Difficulty");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(115, CreateTestComponent_option_115_Template, 2, 2, "option", 24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(116, "input", 51);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_116_listener($event) { return ctx.questionBankSubjectFilter = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(117, "input", 52);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_117_listener($event) { return ctx.questionBankTopicFilter = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(118, "input", 53);
        i0.ɵɵlistener("ngModelChange", function CreateTestComponent_Template_input_ngModelChange_118_listener($event) { return ctx.questionBankMarksFilter = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(119, CreateTestComponent_div_119_Template, 3, 2, "div", 54);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(120, CreateTestComponent_div_120_Template, 3, 3, "div", 55);
        i0.ɵɵtemplate(121, CreateTestComponent_ng_template_121_Template, 2, 0, "ng-template", null, 56, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(123, "div", 57)(124, "button", 58);
        i0.ɵɵlistener("click", function CreateTestComponent_Template_button_click_124_listener() { return ctx.previewTest(); });
        i0.ɵɵtext(125);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(126, "button", 59);
        i0.ɵɵlistener("click", function CreateTestComponent_Template_button_click_126_listener() { return ctx.saveDraft(); });
        i0.ɵɵtext(127, "Save Encrypted Draft");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(128, CreateTestComponent_section_128_Template, 18, 8, "section", 60);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        const _r11 = i0.ɵɵreference(94);
        const _r18 = i0.ɵɵreference(122);
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("ngIf", ctx.assessmentImportPreview || ctx.assessmentImportResult);
        i0.ɵɵadvance(7);
        i0.ɵɵattribute("aria-expanded", ctx.isTestDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.getSelectedTestLabel(), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isTestDropdownOpen);
        i0.ɵɵadvance(5);
        i0.ɵɵattribute("aria-expanded", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.getSelectedTrainingLabel(), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isTrainingDropdownOpen);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testFileType);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.testFileTypes);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testDetails.testTitle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.detailSubmitted && !ctx.testDetails.testTitle.trim());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testDetails.durationMinutes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.detailSubmitted && (!ctx.testDetails.durationMinutes || ctx.testDetails.durationMinutes <= 0));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testDetails.totalQuestions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.detailSubmitted && ctx.testDetails.totalQuestions !== null && ctx.testDetails.totalQuestions !== undefined && ctx.testDetails.totalQuestions < (ctx.questions.length || 0));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.totalMarks);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testDetails.passingPercentage);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testDetails.status);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.statuses);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testDetails.description);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.testDetails.instructions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.detailErrors.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.lastSavedFileName);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(ctx.questions.length);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.questionBank.length);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.totalMarks);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.questions.length)("ngIfElse", _r11);
        i0.ɵɵadvance(12);
        i0.ɵɵtextInterpolate2("", ctx.filteredQuestionBank.length, " / ", ctx.questionBank.length, " question(s)");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.testDetails == null ? null : ctx.testDetails.totalQuestions) !== null && (ctx.testDetails == null ? null : ctx.testDetails.totalQuestions) !== undefined);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.questionBankSearch);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.questionBankTypeFilter);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", "");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.questionTypes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.questionBankDifficultyFilter);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", "");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.difficulties);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.questionBankSubjectFilter);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.questionBankTopicFilter);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.questionBankMarksFilter);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.testDetails == null ? null : ctx.testDetails.totalQuestions) !== null && (ctx.testDetails == null ? null : ctx.testDetails.totalQuestions) !== undefined);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.filteredQuestionBank.length)("ngIfElse", _r18);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.showPreview ? "Hide Preview" : "Preview Test");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.showPreview);
    } }, dependencies: [i7.NgForOf, i7.NgIf, i8.RouterLinkWithHref, i9.NgSelectOption, i9.ɵNgSelectMultipleOption, i9.DefaultValueAccessor, i9.NumberValueAccessor, i9.SelectControlValueAccessor, i9.NgControlStatus, i9.MinValidator, i9.MaxValidator, i9.NgModel, i7.TitleCasePipe], styles: [".create-test-section[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, var(--bg-light), #ffffff 62%);\n}\n\n.create-test-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.create-test-layout[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);\n}\n\n.create-card[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.form-grid--three[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.form-grid--two[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.form-field[_ngcontent-%COMP%]   input[readonly][_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  color: var(--gray-dark-mid);\n}\n\n.create-summary[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.summary-strip[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.summary-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.summary-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  display: block;\n  font-size: 1.35rem;\n}\n\n.summary-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .preview-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .preview-question__head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--gray-mid);\n}\n\n.question-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.question-list-item[_ngcontent-%COMP%] {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: grid;\n  gap: 0.75rem;\n  padding: 0.9rem;\n}\n\n.question-list-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .question-list-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.table-link[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.table-link--danger[_ngcontent-%COMP%] {\n  color: #b42318;\n}\n\n.empty-state[_ngcontent-%COMP%], .validation-list[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--gray-mid);\n  padding: 1rem;\n}\n\n.validation-list[_ngcontent-%COMP%] {\n  background: #fff4f2;\n  border-color: #f9d2cc;\n  color: #b42318;\n}\n\n.validation-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.4rem;\n}\n\n.test-selection-row[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.75rem;\n}\n\n.select-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--text-dark);\n  font-weight: 700;\n}\n\n.select-label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  min-width: 240px;\n  padding: 0.8rem 1rem;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.95rem;\n}\n\n.validation-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.question-editor[_ngcontent-%COMP%], .preview-panel[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.section-title-row[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n}\n\n.test-selection-row[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n\n.select-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.65rem;\n  color: var(--text-dark);\n  font-weight: 600;\n}\n\n.select-label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  min-width: 220px;\n  padding: 0.85rem 1rem;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  padding: 0.7rem 1rem;\n  font-size: 0.95rem;\n}\n\n.test-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.dropdown-toggle[_ngcontent-%COMP%] {\n  align-items: center;\n  display: inline-flex;\n  justify-content: space-between;\n  min-width: 220px;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  background: var(--bg-light);\n  color: var(--text-dark);\n  cursor: pointer;\n}\n\n.dropdown-icon[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\n\n.dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 0.5rem);\n  left: 0;\n  z-index: 10;\n  display: grid;\n  width: min(100%, 320px);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  background: #fff;\n  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  border: none;\n  background: transparent;\n  padding: 0.85rem 1rem;\n  color: var(--text-dark);\n  font: inherit;\n  cursor: pointer;\n}\n\n.dropdown-item[_ngcontent-%COMP%]:hover, .dropdown-item.highlighted[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n}\n\n.dropdown-item[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background: var(--bg-light);\n}\n\n.section-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .section-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.option-editor[_ngcontent-%COMP%], .essay-fields[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--gray-light-mid);\n  display: grid;\n  gap: 1rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n}\n\n.option-row[_ngcontent-%COMP%] {\n  align-items: center;\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: 44px minmax(0, 1fr) minmax(0, 1fr) auto;\n}\n\n.option-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  padding: 0.8rem 0.9rem;\n  width: 100%;\n}\n\n.option-check[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid var(--primary);\n  border-radius: var(--radius-sm);\n  color: var(--primary);\n  cursor: pointer;\n  display: inline-flex;\n  font-weight: 800;\n  justify-content: center;\n  min-height: 42px;\n  padding: 0 0.75rem;\n}\n\n.option-check--active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: #ffffff;\n}\n\n.true-false-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.editor-actions[_ngcontent-%COMP%], .page-actions[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n\n.page-actions[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--gray-light-mid);\n  padding-top: 1rem;\n}\n\n.preview-panel[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.preview-head[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.preview-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  margin: 0 0 0.5rem;\n}\n\n.preview-stats[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  justify-content: flex-end;\n}\n\n.preview-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .preview-question__head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: 999px;\n  display: inline-flex;\n  font-weight: 700;\n  padding: 0.45rem 0.75rem;\n}\n\n.preview-instructions[_ngcontent-%COMP%], .preview-question[_ngcontent-%COMP%] {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  margin-top: 1rem;\n  padding: 1rem;\n}\n\n.preview-instructions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .preview-explanation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .preview-answer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--gray-dark-mid);\n  margin: 0.5rem 0 0;\n}\n\n.preview-question__head[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  margin-bottom: 0.9rem;\n}\n\n.preview-question__head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-size: 1rem;\n  margin: 0;\n}\n\n.media-preview[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: grid;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n}\n\n.media-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .media-preview[_ngcontent-%COMP%]   video[_ngcontent-%COMP%], .preview-explanation[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: var(--radius-sm);\n  display: block;\n  height: auto;\n  max-height: 320px;\n  max-width: 100%;\n  object-fit: contain;\n  width: 100%;\n}\n\n.media-preview[_ngcontent-%COMP%]   audio[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.media-preview[_ngcontent-%COMP%]   video[_ngcontent-%COMP%] {\n  background: #101828;\n}\n\n.preview-options[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.preview-option[_ngcontent-%COMP%] {\n  align-items: center;\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: flex;\n  gap: 0.75rem;\n  padding: 0.75rem;\n}\n\n.preview-option--correct[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  border-color: #86efac;\n  color: #166534;\n}\n\n.preview-option[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  align-items: center;\n  background: var(--bg-light);\n  border-radius: 50%;\n  color: var(--primary);\n  display: inline-flex;\n  flex: 0 0 34px;\n  height: 34px;\n  justify-content: center;\n  width: 34px;\n}\n\n.preview-option[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  flex: 0 0 86px;\n  height: 60px;\n  object-fit: cover;\n  width: 86px;\n}\n\n.preview-explanation[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border-radius: var(--radius-sm);\n  margin-top: 1rem;\n  padding: 0.9rem;\n}\n\n.question-left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.question-number-badge[_ngcontent-%COMP%] {\n  align-items: center;\n  background: var(--bg-light);\n  border: 1px solid var(--blue-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--primary) !important;\n  display: inline-flex !important;\n  flex: 0 0 40px;\n  height: 40px;\n  justify-content: center;\n  font-weight: 800;\n}\n\n.pagination[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n  margin-top: 1rem;\n}\n\n.pagination[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: var(--radius-sm);\n  height: 40px;\n  min-width: 40px;\n  padding: 0 0.6rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.pagination-info[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--gray-mid);\n}\n\n.bank-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.25rem;\n}\n\n.mapping-summary[_ngcontent-%COMP%] {\n  align-items: center;\n  display: inline-flex;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  color: var(--gray-mid);\n}\n\n.mapping-remaining[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-weight: 800;\n}\n\n.mapping-info[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  color: var(--gray-mid);\n  font-size: 0.95rem;\n}\n\n.mapping-warning[_ngcontent-%COMP%] {\n  color: #b42318;\n  font-weight: 700;\n}\n\n.map-btn[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.map-position[_ngcontent-%COMP%] {\n  width: 80px;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n  background: var(--bg-light);\n  color: var(--text-dark);\n}\n\n.map-badge[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: #fff;\n  border-radius: 6px;\n  padding: 3px 6px;\n  font-weight: 800;\n  font-size: 0.8rem;\n  line-height: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@media (max-width: 991px) {\n  .create-test-layout[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%], .form-grid--three[_ngcontent-%COMP%], .form-grid--two[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-head[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .preview-stats[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n\n@media (max-width: 640px) {\n  .section-title-row[_ngcontent-%COMP%], .page-actions[_ngcontent-%COMP%], .editor-actions[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .section-title-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .page-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .editor-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .create-summary[_ngcontent-%COMP%]    > .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .summary-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .option-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .option-check[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .preview-option[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .preview-option[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    flex-basis: auto;\n    height: auto;\n    max-height: 180px;\n    width: 100%;\n  }\n}\n\n.file-note[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  border: 1px solid #86efac;\n  border-radius: var(--radius-sm);\n  color: #166534;\n  display: grid;\n  gap: 0.25rem;\n  padding: 0.85rem;\n}\n\n.file-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #166534;\n  font-size: 0.9rem;\n}\n\n.question-bank-panel[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.question-bank-head[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.question-bank-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  margin: 0;\n}\n\n.bank-count[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: 999px;\n  color: var(--gray-dark-mid);\n  font-weight: 700;\n  padding: 0.5rem 0.8rem;\n}\n\n.question-list--bank[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n@media (max-width: 991px) {\n  .question-list--bank[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.bank-actions[_ngcontent-%COMP%] {\n  margin: 0 0 1rem;\n}\n\n.import-bank-btn[_ngcontent-%COMP%] {\n  cursor: pointer;\n  margin: 0;\n  position: relative;\n}\n\n.import-bank-btn[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  height: 1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n}\n\n.bank-filters[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  margin-bottom: 1rem;\n}\n\n.bank-filters[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .bank-filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  padding: 0.75rem 0.85rem;\n  width: 100%;\n}\n\n@media (max-width: 991px) {\n  .bank-filters[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 640px) {\n  .bank-filters[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.import-preview-panel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  padding: 1.5rem;\n}\n\n.import-file-name[_ngcontent-%COMP%] {\n  color: var(--gray-mid);\n  margin: 0;\n}\n\n.import-summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .import-summary-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-size: 1.25rem;\n}\n\n.import-summary-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--gray-mid);\n}\n\n.import-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.import-table[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n  min-width: 720px;\n  width: 100%;\n}\n\n.import-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .import-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--gray-light-mid);\n  color: var(--gray-dark-mid);\n  padding: 0.75rem;\n  text-align: left;\n  vertical-align: top;\n}\n\n.import-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-weight: 800;\n}\n\n.duplicate-field[_ngcontent-%COMP%] {\n  min-width: 220px;\n}\n\n@media (max-width: 991px) {\n  .import-summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 640px) {\n  .import-summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.training-search-field[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 30;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  max-height: 220px;\n  overflow-y: auto;\n  border: 1px solid rgba(17, 24, 39, 0.14);\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);\n}\n\n.training-search-option[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 10px 12px;\n  text-align: left;\n  color: #111827;\n  cursor: pointer;\n}\n\n.training-search-option[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n}\n\n.training-search-empty[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  color: #6b7280;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.training-dropdown-toggle[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n\n.training-search-control[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow:\n    0 18px 45px rgba(15, 23, 42, 0.18),\n    0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: \"\";\n  transform: rotate(45deg);\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n\n.training-search-menu[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    color 150ms ease,\n    background 150ms ease,\n    transform 150ms ease;\n}\n\n.training-search-option[_ngcontent-%COMP%]:hover, .training-search-option[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateTestComponent, [{
        type: Component,
        args: [{ selector: 'app-create-test', template: "<section class=\"admin-section create-test-section\">\n  <div class=\"container admin-shell create-test-shell\">\n    <div class=\"admin-header\">\n      <div>\n        <span class=\"auth-eyebrow\">Admin</span>\n        <h1>Create Test</h1>\n      </div>\n      <div class=\"admin-actions\">\n        <!-- <a class=\"btn btn-outline\" routerLink=\"/admin/trainings\">Trainings</a> -->\n        <a class=\"btn btn-outline\" routerLink=\"/admin/create-question\">Question Bank</a>\n        <a class=\"btn btn-outline\" routerLink=\"/test\">View Test Page</a>\n        <!-- <button class=\"btn btn-outline\" type=\"button\" (click)=\"downloadTestTemplate()\">Download Test Template</button> -->\n        <label class=\"btn btn-outline import-bank-btn\">Import Test From Excel<input type=\"file\" accept=\".xlsx,.xls,.csv\" (change)=\"onAssessmentExcelSelected($event)\" /></label>\n      </div>\n    </div>\n\n\n\n    <section class=\"admin-table-wrap import-preview-panel\" *ngIf=\"assessmentImportPreview || assessmentImportResult\">\n      <div class=\"section-title-row\">\n        <div>\n          <span class=\"auth-eyebrow\">Excel Import</span>\n          <h2>Test Import Preview</h2>\n        </div>\n      </div>\n\n      <ng-container *ngIf=\"assessmentImportPreview\">\n        <p class=\"import-file-name\">Selected file: <strong>{{ assessmentImportFileName || assessmentImportPreview.fileName }}</strong></p>\n        <div class=\"preview-instructions\" *ngIf=\"assessmentImportPreview.testDefinition\">\n          <strong>{{ assessmentImportPreview.testDefinition.displayName || assessmentImportPreview.testDefinition.testName }}</strong>\n          <p>{{ assessmentImportPreview.testDefinition.description || 'No description added.' }}</p>\n        </div>\n        <div class=\"import-summary-grid\">\n          <div><strong>{{ assessmentImportPreview.totalRows }}</strong><span>Total Rows</span></div>\n          <div><strong>{{ assessmentImportPreview.validRows }}</strong><span>Valid Rows</span></div>\n          <div><strong>{{ assessmentImportPreview.existingQuestionsFound }}</strong><span>Existing Found</span></div>\n          <div><strong>{{ assessmentImportPreview.newQuestionsToCreate }}</strong><span>New Questions</span></div>\n          <div><strong>{{ assessmentImportPreview.duplicateMappings }}</strong><span>Duplicates</span></div>\n          <div><strong>{{ assessmentImportPreview.invalidRows }}</strong><span>Invalid</span></div>\n          <div><strong>{{ assessmentImportPreview.finalMappedQuestionCount }}</strong><span>Mapped</span></div>\n          <div><strong>{{ assessmentImportPreview.finalTotalMarks }}</strong><span>Total Marks</span></div>\n        </div>\n        <div class=\"validation-list\" *ngIf=\"assessmentImportPreview.errors.length\">\n          <p *ngFor=\"let error of assessmentImportPreview.errors\">Row {{ error.rowNumber }}: {{ error.message }}</p>\n        </div>\n        <div class=\"import-table-wrap\">\n          <table class=\"import-table\">\n            <thead><tr><th>Row</th><th>Order</th><th>Action</th><th>Question</th><th>Issue</th></tr></thead>\n            <tbody>\n              <tr *ngFor=\"let item of assessmentImportPreview.items\">\n                <td>{{ item.rowNumber }}</td>\n                <td>{{ item.questionOrder }}</td>\n                <td>{{ item.action }}</td>\n                <td>{{ item.question?.questionText || item.questionId || '-' }}</td>\n                <td>{{ item.errors.length ? item.errors[0].message : '-' }}</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"admin-actions page-actions\">\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"cancelAssessmentImport()\">Cancel</button>\n          <button class=\"btn btn-primary\" type=\"button\" (click)=\"confirmAssessmentImport()\" [disabled]=\"!assessmentImportPreview.finalMappedQuestionCount || assessmentImportPreview.errors.length > 0\">Confirm Import</button>\n        </div>\n      </ng-container>\n\n      <div class=\"file-note\" *ngIf=\"assessmentImportResult\">\n        <strong>Assessment import completed</strong>\n        <span>Display Name: {{ assessmentImportResult.displayName }}</span>\n        <span>Normalized File Name: {{ assessmentImportResult.fileName }}</span>\n        <span>Storage Key: {{ assessmentImportResult.storageKey }}</span>\n        <span>New Questions: {{ assessmentImportResult.newQuestionsAdded }} | Existing Mapped: {{ assessmentImportResult.existingQuestionsMapped }} | Duplicates Skipped: {{ assessmentImportResult.duplicatesSkipped }} | Failed: {{ assessmentImportResult.failedRows }}</span>\n        <span>Total Mapped: {{ assessmentImportResult.totalMappedQuestions }} | Total Marks: {{ assessmentImportResult.totalMarks }} | Question Bank Total: {{ assessmentImportResult.questionBankTotal }}</span>\n      </div>\n    </section>\n\n    <div class=\"create-test-layout\">\n      <section class=\"admin-form create-card\">\n        <div class=\"section-title-row\">\n          <h2>Test Basic Details</h2>\n          <div class=\"test-selection-row test-dropdown\">\n            <button class=\"btn btn-outline btn-small dropdown-toggle\" type=\"button\" (click)=\"toggleTestDropdown()\" (keydown)=\"onDropdownKeydown($event)\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"isTestDropdownOpen\">\n              {{ getSelectedTestLabel() }}\n              <span class=\"dropdown-icon\">&#9662;</span>\n            </button>\n            <div class=\"dropdown-menu\" *ngIf=\"isTestDropdownOpen\" role=\"listbox\">\n              <button class=\"dropdown-item\" type=\"button\" (click)=\"clearTestSelection()\" [class.highlighted]=\"highlightedTestIndex === 0\">\n                New Test\n              </button>\n              <button class=\"dropdown-item\" type=\"button\" *ngFor=\"let t of availableTests; let idx = index\" (click)=\"selectTestKey(t.optionKey || '')\" [class.highlighted]=\"highlightedTestIndex === idx + 1\">\n                {{ t.displayName || t.testName }}{{ t.assetFileName ? ' (asset)' : '' }}\n              </button>\n            </div>\n          </div>\n        </div>\n        \n        <div class=\"form-grid\">\n           <label class=\"form-field training-search-field\">\n            Training\n            <div class=\"training-search-control\">\n              <button class=\"btn btn-outline btn-small training-dropdown-toggle\" type=\"button\" (click)=\"toggleTrainingDropdown()\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"isTrainingDropdownOpen\">\n                {{ getSelectedTrainingLabel() }}\n                <span class=\"dropdown-icon\">&#9662;</span>\n              </button>\n              <div class=\"training-search-menu\" *ngIf=\"isTrainingDropdownOpen\" role=\"listbox\">\n                <input type=\"text\" [(ngModel)]=\"trainingSearch\" name=\"trainingSearch\" placeholder=\"Search training\" autocomplete=\"off\" (input)=\"onTrainingSearchChange()\" />\n                <button class=\"training-search-option\" type=\"button\" *ngFor=\"let training of filteredTrainingList\" (mousedown)=\"selectTrainingFromDropdown(training)\" role=\"option\">\n                  {{ getTrainingLabel(training) }}\n                </button>\n                <div class=\"training-search-empty\" *ngIf=\"!filteredTrainingList.length\">No training found</div>\n              </div>\n            </div>\n          </label>\n          <label class=\"form-field\">\n            Test File Type\n            <select [(ngModel)]=\"testFileType\" name=\"testFileType\">\n              <option *ngFor=\"let type of testFileTypes\" [ngValue]=\"type\">{{ type | titlecase }}</option>\n            </select>\n          </label>\n         \n\n          <label class=\"form-field\">\n            Test Title\n            <input type=\"text\" [(ngModel)]=\"testDetails.testTitle\" name=\"testTitle\" placeholder=\"Enter test title\" />\n            <small *ngIf=\"detailSubmitted && !testDetails.testTitle.trim()\">Test title is required.</small>\n          </label>\n          <label class=\"form-field\">\n            Duration in Minutes\n            <input type=\"number\" min=\"1\" [(ngModel)]=\"testDetails.durationMinutes\" name=\"durationMinutes\" />\n            <small *ngIf=\"detailSubmitted && (!testDetails.durationMinutes || testDetails.durationMinutes <= 0)\">Duration must be greater than 0.</small>\n          </label>\n\n          <label class=\"form-field\">\n            Total Questions\n            <input type=\"number\" min=\"1\" [(ngModel)]=\"testDetails.totalQuestions\" name=\"totalQuestions\" />\n            <small *ngIf=\"detailSubmitted && testDetails.totalQuestions !== null && testDetails.totalQuestions !== undefined && testDetails.totalQuestions < (questions.length || 0)\">Total questions must be >= mapped questions.</small>\n          </label>\n\n          <label class=\"form-field\">\n            Total Marks\n            <input type=\"number\" [value]=\"totalMarks\" readonly />\n          </label>\n\n          <label class=\"form-field\">\n            Passing Percentage\n            <input type=\"number\" min=\"1\" max=\"100\" [(ngModel)]=\"testDetails.passingPercentage\" name=\"passingPercentage\" />\n          </label>\n\n          <label class=\"form-field\">\n            Status\n            <select [(ngModel)]=\"testDetails.status\" name=\"status\">\n              <option *ngFor=\"let status of statuses\" [ngValue]=\"status\">{{ status }}</option>\n            </select>\n          </label>\n\n         \n        </div>\n\n        <label class=\"form-field\">\n          Test Description\n          <textarea rows=\"4\" [(ngModel)]=\"testDetails.description\" name=\"description\" placeholder=\"Describe the test\"></textarea>\n        </label>\n\n        <label class=\"form-field\">\n          Instructions\n          <textarea rows=\"4\" [(ngModel)]=\"testDetails.instructions\" name=\"instructions\" placeholder=\"Add instructions for test takers\"></textarea>\n        </label>\n\n        <div class=\"validation-list\" *ngIf=\"detailErrors.length\">\n          <p *ngFor=\"let error of detailErrors\">{{ error }}</p>\n        </div>\n\n        <div class=\"file-note\" *ngIf=\"lastSavedFileName\">\n          <strong>Last file:</strong> {{ lastSavedFileName }}\n          <span>Target folder: {{ getTestFileFolder() }}</span>\n        </div>\n      </section>\n\n      <aside class=\"admin-tools create-card create-summary\">\n        <h2>Mapped Questions</h2>\n        <div class=\"summary-strip\">\n          <div><strong>{{ questions.length }}</strong><span>Mapped</span></div>\n          <div><strong>{{ questionBank.length }}</strong><span>Bank</span></div>\n          <div><strong>{{ totalMarks }}</strong><span>Marks</span></div>\n        </div>\n\n        <a class=\"btn btn-primary\" routerLink=\"/admin/create-question\">Manage Question Bank</a>\n\n        <div class=\"question-list\" *ngIf=\"questions.length; else noMappedQuestions\">\n          <article class=\"question-list-item\" *ngFor=\"let question of pagedMappedQuestions; let index = index; trackBy: trackByQuestionId\">\n            <div>\n              <strong>Q{{ question.questionNo }}. {{ getQuestionTypeLabel(question.questionType) }}</strong>\n              <span>{{ question.subject || 'No subject' }} / {{ question.topic || 'No topic' }}</span>\n              <small>{{ question.difficulty }} | {{ question.marks }} mark(s) | {{ question.estimatedTimeSeconds }}s</small>\n            </div>\n            <div class=\"row-actions\">\n              <button class=\"table-link\" type=\"button\" (click)=\"moveMappedQuestion(index, -1)\" [disabled]=\"index === 0\">Up</button>\n              <button class=\"table-link\" type=\"button\" (click)=\"moveMappedQuestion(index, 1)\" [disabled]=\"(mappedQuestionsCurrentPage - 1) * mappedQuestionsPageSize + index === questions.length - 1\">Down</button>\n              <button class=\"table-link\" type=\"button\" (click)=\"editMappedQuestion(index)\">Edit</button>\n              <button class=\"table-link table-link--danger\" type=\"button\" (click)=\"deleteMappedQuestion(index)\">Unmap</button>\n            </div>\n          </article>\n\n          <div class=\"pagination\" *ngIf=\"mappedQuestionsTotalPages > 1\">\n            <button class=\"btn btn-outline\" type=\"button\" (click)=\"mappedQuestionsPrevPage()\" [disabled]=\"mappedQuestionsCurrentPage === 1\">Prev</button>\n            <span class=\"pagination-info\">Page {{ mappedQuestionsCurrentPage }} of {{ mappedQuestionsTotalPages }}</span>\n            <button class=\"btn btn-outline\" type=\"button\" (click)=\"mappedQuestionsNextPage()\" [disabled]=\"mappedQuestionsCurrentPage === mappedQuestionsTotalPages\">Next</button>\n          </div>\n        </div>\n\n        <ng-template #noMappedQuestions>\n          <div class=\"empty-state\">No questions mapped to this test yet.</div>\n        </ng-template>\n      </aside>\n    </div>\n\n\n    <section class=\"admin-table-wrap question-bank-panel\">\n      <div class=\"section-title-row question-bank-head\">\n        <div>\n          <span class=\"auth-eyebrow\">Question Facility</span>\n          <h2>Question Bank</h2>\n        </div>\n        <div class=\"bank-meta\">\n          <span class=\"bank-count\">{{ filteredQuestionBank.length }} / {{ questionBank.length }} question(s)</span>\n          <div *ngIf=\"testDetails?.totalQuestions !== null && testDetails?.totalQuestions !== undefined\" class=\"mapping-summary\">\n            <span><strong>{{ mappedCount }}</strong> mapped</span>\n            <span>/</span>\n            <span><strong>{{ testDetails.totalQuestions }}</strong> total</span>\n            <span class=\"mapping-remaining\">({{ remainingSlots }} left)</span>\n          </div>\n        </div>\n      </div>\n\n\n      <div class=\"bank-filters\">\n        <input type=\"text\" [(ngModel)]=\"questionBankSearch\" name=\"questionBankSearch\" placeholder=\"Search question, subject, topic\" />\n        <select [(ngModel)]=\"questionBankTypeFilter\" name=\"questionBankTypeFilter\">\n          <option [ngValue]=\"''\">All Types</option>\n          <option *ngFor=\"let type of questionTypes\" [ngValue]=\"type\">{{ getQuestionTypeLabel(type) }}</option>\n        </select>\n        <select [(ngModel)]=\"questionBankDifficultyFilter\" name=\"questionBankDifficultyFilter\">\n          <option [ngValue]=\"''\">All Difficulty</option>\n          <option *ngFor=\"let difficulty of difficulties\" [ngValue]=\"difficulty\">{{ difficulty }}</option>\n        </select>\n        <input type=\"text\" [(ngModel)]=\"questionBankSubjectFilter\" name=\"questionBankSubjectFilter\" placeholder=\"Subject\" />\n        <input type=\"text\" [(ngModel)]=\"questionBankTopicFilter\" name=\"questionBankTopicFilter\" placeholder=\"Topic\" />\n        <input type=\"number\" [(ngModel)]=\"questionBankMarksFilter\" name=\"questionBankMarksFilter\" placeholder=\"Marks\" />\n        <div *ngIf=\"testDetails?.totalQuestions !== null && testDetails?.totalQuestions !== undefined\" class=\"mapping-info\">\n          <span *ngIf=\"!isMappingFull\">You can map up to {{ testDetails.totalQuestions }} questions. <strong>{{ remainingSlots }}</strong> slot(s) remaining.</span>\n          <span *ngIf=\"isMappingFull\" class=\"mapping-warning\">Mapping limit reached \u00E2\u20AC\u201D unmap a question to add another.</span>\n        </div>\n      </div>\n\n      <div class=\"question-list question-list--bank\" *ngIf=\"filteredQuestionBank.length; else emptyQuestionBank\">\n        <article class=\"question-list-item\" *ngFor=\"let question of pagedQuestionBank; let i = index; trackBy: trackByQuestionId\">\n          <div class=\"question-left\">\n            <span class=\"question-number-badge\">{{ (questionBankCurrentPage - 1) * questionBankPageSize + i + 1 }}</span>\n            <div>\n              <strong>{{ getQuestionTypeLabel(question.questionType) }} - {{ question.questionText }}</strong>\n              <span>{{ question.subject || 'No subject' }} / {{ question.topic || 'No topic' }}</span>\n              <small>{{ question.difficulty }} | {{ question.marks }} mark(s) | {{ question.estimatedTimeSeconds }}s</small>\n            </div>\n            <div class=\"row-actions\">\n              <input\n                class=\"map-position\"\n                type=\"number\"\n                min=\"1\"\n                [max]=\"(testDetails.totalQuestions || questionBank.length)\"\n                [value]=\"mapQuestionPositions[question.id] || ''\"\n                (input)=\"setMapQuestionPosition(question.id, parseMapPosition($any($event.target).value))\"\n                placeholder=\"Map #\"\n              />\n              <button class=\"table-link map-btn\" type=\"button\" (click)=\"mapQuestionToTestByQuestion(question)\" [disabled]=\"isQuestionMapped(question.id) || isMappingFull\">\n                <ng-container *ngIf=\"isQuestionMapped(question.id); else mapLabel\">Mapped</ng-container>\n                <ng-template #mapLabel>\n                  <span>Map to Test</span>\n                  <span *ngIf=\"remainingSlots !== null\" class=\"map-badge\">{{ remainingSlots }}</span>\n                </ng-template>\n              </button>\n            </div>\n          </div>\n        </article>\n        <div class=\"pagination\" *ngIf=\"filteredQuestionBank.length\">\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"questionBankPrevPage()\" [disabled]=\"questionBankCurrentPage === 1\">Prev</button>\n          <span>Page {{ questionBankCurrentPage }} of {{ questionBankTotalPages }}</span>\n          <button class=\"btn btn-outline\" type=\"button\" (click)=\"questionBankNextPage()\" [disabled]=\"questionBankCurrentPage === questionBankTotalPages\">Next</button>\n        </div>\n      </div>\n\n      <ng-template #emptyQuestionBank>\n        <div class=\"empty-state\">Create questions here first, then map them to the test.</div>\n      </ng-template>\n    </section>\n\n    <div class=\"admin-actions page-actions\">\n      <button class=\"btn btn-outline\" type=\"button\" (click)=\"previewTest()\">{{ showPreview ? 'Hide Preview' : 'Preview Test' }}</button>\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"saveDraft()\">Save Encrypted Draft</button>\n    </div>\n\n    <section class=\"admin-table-wrap preview-panel\" *ngIf=\"showPreview\">\n      <div class=\"preview-head\">\n        <div>\n          <span class=\"auth-eyebrow\">Preview</span>\n          <h2>{{ testDetails.testTitle || 'Untitled Test' }}</h2>\n          <p>{{ testDetails.description || 'No description added.' }}</p>\n        </div>\n        <div class=\"preview-stats\">\n          <span>{{ questions.length }} Questions</span>\n          <span>{{ totalMarks }} Marks</span>\n          <span>{{ testDetails.durationMinutes || 0 }} Minutes</span>\n        </div>\n      </div>\n\n      <div class=\"preview-instructions\" *ngIf=\"testDetails.instructions\">\n        <strong>Instructions:</strong>\n        <p>{{ testDetails.instructions }}</p>\n      </div>\n\n      <article class=\"preview-question\" *ngFor=\"let question of questions; trackBy: trackByQuestionId\">\n        <div class=\"preview-question__head\">\n          <h3>Q{{ question.questionNo }}. {{ question.questionText }}</h3>\n          <span>{{ getQuestionTypeLabel(question.questionType) }} | {{ question.difficulty }} | {{ question.marks }} mark(s) | {{ question.estimatedTimeSeconds }}s</span>\n        </div>\n\n        <div class=\"media-preview\" *ngIf=\"question.questionImageUrl || question.audioUrl || question.videoUrl\">\n          <img *ngIf=\"question.questionImageUrl\" [src]=\"question.questionImageUrl\" alt=\"Question media\" />\n          <audio *ngIf=\"question.audioUrl\" controls preload=\"none\"><source [src]=\"question.audioUrl\" /></audio>\n          <video *ngIf=\"question.videoUrl\" controls preload=\"metadata\"><source [src]=\"question.videoUrl\" /></video>\n        </div>\n\n        <div class=\"preview-options\" *ngIf=\"question.options?.length\">\n          <div class=\"preview-option\" *ngFor=\"let option of question.options; let optionIndex = index; trackBy: trackByOptionId\" [class.preview-option--correct]=\"question.correctOptionIds?.includes(option.id)\">\n            <strong>{{ getOptionLabel(optionIndex) }}</strong>\n            <img *ngIf=\"option.imageUrl\" [src]=\"option.imageUrl\" alt=\"Option media\" />\n            <span>{{ option.text }}</span>\n          </div>\n        </div>\n\n        <div class=\"preview-answer\" *ngIf=\"question.questionType === 'ESSAY'\">\n          <p><strong>Expected Answer:</strong> {{ question.expectedAnswer || 'Not added' }}</p>\n          <p><strong>Sample Answer:</strong> {{ question.sampleAnswer || 'Not added' }}</p>\n        </div>\n\n        <div class=\"preview-explanation\">\n          <p><strong>Explanation:</strong> {{ question.explanation || 'No explanation added.' }}</p>\n          <img *ngIf=\"question.explanationImageUrl\" [src]=\"question.explanationImageUrl\" alt=\"Explanation media\" />\n        </div>\n      </article>\n    </section>\n  </div>\n</section>\n\n\n\n\n\n\n", styles: [".create-test-section {\n  background: linear-gradient(180deg, var(--bg-light), #ffffff 62%);\n}\n\n.create-test-shell {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.create-test-layout {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);\n}\n\n.create-card {\n  min-width: 0;\n}\n\n.form-grid {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.form-grid--three {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.form-grid--two {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.form-field input[readonly] {\n  background: var(--bg-light);\n  color: var(--gray-dark-mid);\n}\n\n.create-summary {\n  display: grid;\n  gap: 1rem;\n}\n\n.summary-strip {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.summary-strip div {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.summary-strip strong {\n  color: var(--text-dark);\n  display: block;\n  font-size: 1.35rem;\n}\n\n.summary-strip span,\n.question-list-item span,\n.question-list-item small,\n.preview-head p,\n.preview-question__head span {\n  color: var(--gray-mid);\n}\n\n.question-list {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.question-list-item {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: grid;\n  gap: 0.75rem;\n  padding: 0.9rem;\n}\n\n.question-list-item strong,\n.question-list-item span,\n.question-list-item small {\n  display: block;\n}\n\n.row-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.table-link:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.table-link--danger {\n  color: #b42318;\n}\n\n.empty-state,\n.validation-list {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--gray-mid);\n  padding: 1rem;\n}\n\n.validation-list {\n  background: #fff4f2;\n  border-color: #f9d2cc;\n  color: #b42318;\n}\n\n.validation-list p {\n  margin: 0 0 0.4rem;\n}\n\n.test-selection-row {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.75rem;\n}\n\n.select-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--text-dark);\n  font-weight: 700;\n}\n\n.select-label select {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  min-width: 240px;\n  padding: 0.8rem 1rem;\n}\n\n.btn-small {\n  padding: 0.75rem 1rem;\n  font-size: 0.95rem;\n}\n\n.validation-list p:last-child {\n  margin-bottom: 0;\n}\n\n.question-editor,\n.preview-panel {\n  margin-top: 0;\n}\n\n.section-title-row {\n  align-items: center;\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n}\n\n.test-selection-row {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n\n.select-label {\n  display: inline-flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.65rem;\n  color: var(--text-dark);\n  font-weight: 600;\n}\n\n.select-label select {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  min-width: 220px;\n  padding: 0.85rem 1rem;\n}\n\n.btn-small {\n  padding: 0.7rem 1rem;\n  font-size: 0.95rem;\n}\n\n.test-dropdown {\n  position: relative;\n}\n\n.dropdown-toggle {\n  align-items: center;\n  display: inline-flex;\n  justify-content: space-between;\n  min-width: 220px;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  background: var(--bg-light);\n  color: var(--text-dark);\n  cursor: pointer;\n}\n\n.dropdown-icon {\n  margin-left: 0.5rem;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: calc(100% + 0.5rem);\n  left: 0;\n  z-index: 10;\n  display: grid;\n  width: min(100%, 320px);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  background: #fff;\n  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n\n.dropdown-item {\n  width: 100%;\n  text-align: left;\n  border: none;\n  background: transparent;\n  padding: 0.85rem 1rem;\n  color: var(--text-dark);\n  font: inherit;\n  cursor: pointer;\n}\n\n.dropdown-item:hover,\n.dropdown-item.highlighted {\n  background: var(--bg-light);\n}\n\n.dropdown-item:focus {\n  outline: none;\n  background: var(--bg-light);\n}\n\n.section-title-row h2,\n.section-title-row h3 {\n  margin: 0;\n}\n\n.option-editor,\n.essay-fields {\n  border-top: 1px solid var(--gray-light-mid);\n  display: grid;\n  gap: 1rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n}\n\n.option-row {\n  align-items: center;\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: 44px minmax(0, 1fr) minmax(0, 1fr) auto;\n}\n\n.option-row input {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  padding: 0.8rem 0.9rem;\n  width: 100%;\n}\n\n.option-check {\n  align-items: center;\n  background: #ffffff;\n  border: 1px solid var(--primary);\n  border-radius: var(--radius-sm);\n  color: var(--primary);\n  cursor: pointer;\n  display: inline-flex;\n  font-weight: 800;\n  justify-content: center;\n  min-height: 42px;\n  padding: 0 0.75rem;\n}\n\n.option-check--active {\n  background: var(--primary);\n  color: #ffffff;\n}\n\n.true-false-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.editor-actions,\n.page-actions {\n  justify-content: flex-end;\n}\n\n.page-actions {\n  border-top: 1px solid var(--gray-light-mid);\n  padding-top: 1rem;\n}\n\n.preview-panel {\n  padding: 1.5rem;\n}\n\n.preview-head {\n  align-items: flex-start;\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.preview-head h2 {\n  color: var(--text-dark);\n  margin: 0 0 0.5rem;\n}\n\n.preview-stats {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  justify-content: flex-end;\n}\n\n.preview-stats span,\n.preview-question__head span {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: 999px;\n  display: inline-flex;\n  font-weight: 700;\n  padding: 0.45rem 0.75rem;\n}\n\n.preview-instructions,\n.preview-question {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  margin-top: 1rem;\n  padding: 1rem;\n}\n\n.preview-instructions p,\n.preview-explanation p,\n.preview-answer p {\n  color: var(--gray-dark-mid);\n  margin: 0.5rem 0 0;\n}\n\n.preview-question__head {\n  display: grid;\n  gap: 0.5rem;\n  margin-bottom: 0.9rem;\n}\n\n.preview-question__head h3 {\n  color: var(--text-dark);\n  font-size: 1rem;\n  margin: 0;\n}\n\n.media-preview {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: grid;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n}\n\n.media-preview img,\n.media-preview video,\n.preview-explanation img {\n  border-radius: var(--radius-sm);\n  display: block;\n  height: auto;\n  max-height: 320px;\n  max-width: 100%;\n  object-fit: contain;\n  width: 100%;\n}\n\n.media-preview audio {\n  width: 100%;\n}\n\n.media-preview video {\n  background: #101828;\n}\n\n.preview-options {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.preview-option {\n  align-items: center;\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  display: flex;\n  gap: 0.75rem;\n  padding: 0.75rem;\n}\n\n.preview-option--correct {\n  background: #ecfdf3;\n  border-color: #86efac;\n  color: #166534;\n}\n\n.preview-option strong {\n  align-items: center;\n  background: var(--bg-light);\n  border-radius: 50%;\n  color: var(--primary);\n  display: inline-flex;\n  flex: 0 0 34px;\n  height: 34px;\n  justify-content: center;\n  width: 34px;\n}\n\n.preview-option img {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  flex: 0 0 86px;\n  height: 60px;\n  object-fit: cover;\n  width: 86px;\n}\n\n.preview-explanation {\n  background: var(--bg-light);\n  border-radius: var(--radius-sm);\n  margin-top: 1rem;\n  padding: 0.9rem;\n}\n\n.question-left {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.question-number-badge {\n  align-items: center;\n  background: var(--bg-light);\n  border: 1px solid var(--blue-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--primary) !important;\n  display: inline-flex !important;\n  flex: 0 0 40px;\n  height: 40px;\n  justify-content: center;\n  font-weight: 800;\n}\n\n.pagination {\n  align-items: center;\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n  margin-top: 1rem;\n}\n\n.pagination .btn {\n  border-radius: var(--radius-sm);\n  height: 40px;\n  min-width: 40px;\n  padding: 0 0.6rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.pagination-info {\n  font-weight: 700;\n  color: var(--gray-mid);\n}\n\n.bank-meta {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.25rem;\n}\n\n.mapping-summary {\n  align-items: center;\n  display: inline-flex;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  color: var(--gray-mid);\n}\n\n.mapping-remaining {\n  color: var(--text-dark);\n  font-weight: 800;\n}\n\n.mapping-info {\n  margin-top: 0.5rem;\n  color: var(--gray-mid);\n  font-size: 0.95rem;\n}\n\n.mapping-warning {\n  color: #b42318;\n  font-weight: 700;\n}\n\n.map-btn {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.map-position {\n  width: 80px;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n  background: var(--bg-light);\n  color: var(--text-dark);\n}\n\n.map-badge {\n  background: var(--primary);\n  color: #fff;\n  border-radius: 6px;\n  padding: 3px 6px;\n  font-weight: 800;\n  font-size: 0.8rem;\n  line-height: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@media (max-width: 991px) {\n  .create-test-layout,\n  .form-grid,\n  .form-grid--three,\n  .form-grid--two {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-head {\n    flex-direction: column;\n  }\n\n  .preview-stats {\n    justify-content: flex-start;\n  }\n}\n\n@media (max-width: 640px) {\n  .section-title-row,\n  .page-actions,\n  .editor-actions {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .section-title-row .btn,\n  .page-actions .btn,\n  .editor-actions .btn,\n  .create-summary > .btn {\n    width: 100%;\n  }\n\n  .summary-strip {\n    grid-template-columns: 1fr;\n  }\n\n  .option-row {\n    grid-template-columns: 1fr;\n  }\n\n  .option-check {\n    width: 100%;\n  }\n\n  .preview-option {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .preview-option img {\n    flex-basis: auto;\n    height: auto;\n    max-height: 180px;\n    width: 100%;\n  }\n}\n\n.file-note {\n  background: #ecfdf3;\n  border: 1px solid #86efac;\n  border-radius: var(--radius-sm);\n  color: #166534;\n  display: grid;\n  gap: 0.25rem;\n  padding: 0.85rem;\n}\n\n.file-note span {\n  color: #166534;\n  font-size: 0.9rem;\n}\n\n.question-bank-panel {\n  padding: 1.5rem;\n}\n\n.question-bank-head {\n  margin-bottom: 1rem;\n}\n\n.question-bank-head h2 {\n  color: var(--text-dark);\n  margin: 0;\n}\n\n.bank-count {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: 999px;\n  color: var(--gray-dark-mid);\n  font-weight: 700;\n  padding: 0.5rem 0.8rem;\n}\n\n.question-list--bank {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n@media (max-width: 991px) {\n  .question-list--bank {\n    grid-template-columns: 1fr;\n  }\n}\n\n.bank-actions {\n  margin: 0 0 1rem;\n}\n\n.import-bank-btn {\n  cursor: pointer;\n  margin: 0;\n  position: relative;\n}\n\n.import-bank-btn input {\n  height: 1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n}\n\n.bank-filters {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  margin-bottom: 1rem;\n}\n\n.bank-filters input,\n.bank-filters select {\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  color: var(--text-dark);\n  font: inherit;\n  padding: 0.75rem 0.85rem;\n  width: 100%;\n}\n\n@media (max-width: 991px) {\n  .bank-filters {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 640px) {\n  .bank-filters {\n    grid-template-columns: 1fr;\n  }\n}\n\n.import-preview-panel {\n  display: grid;\n  gap: 1rem;\n  padding: 1.5rem;\n}\n\n.import-file-name {\n  color: var(--gray-mid);\n  margin: 0;\n}\n\n.import-summary-grid {\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.import-summary-grid div {\n  background: var(--bg-light);\n  border: 1px solid var(--gray-light-mid);\n  border-radius: var(--radius-sm);\n  padding: 0.85rem;\n  text-align: center;\n}\n\n.import-summary-grid strong,\n.import-summary-grid span {\n  display: block;\n}\n\n.import-summary-grid strong {\n  color: var(--text-dark);\n  font-size: 1.25rem;\n}\n\n.import-summary-grid span {\n  color: var(--gray-mid);\n}\n\n.import-table-wrap {\n  overflow-x: auto;\n}\n\n.import-table {\n  border-collapse: collapse;\n  min-width: 720px;\n  width: 100%;\n}\n\n.import-table th,\n.import-table td {\n  border-bottom: 1px solid var(--gray-light-mid);\n  color: var(--gray-dark-mid);\n  padding: 0.75rem;\n  text-align: left;\n  vertical-align: top;\n}\n\n.import-table th {\n  color: var(--text-dark);\n  font-weight: 800;\n}\n\n.duplicate-field {\n  min-width: 220px;\n}\n\n@media (max-width: 991px) {\n  .import-summary-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 640px) {\n  .import-summary-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n.training-search-field {\n  position: relative;\n}\n\n.training-search-control {\n  position: relative;\n}\n\n.training-dropdown-toggle {\n  justify-content: space-between;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  border-radius: 10px;\n  box-decoration-break: clone;\n  color: var(--text-dark);\n}\n\n.training-search-menu {\n  position: absolute;\n  z-index: 30;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  max-height: 220px;\n  overflow-y: auto;\n  border: 1px solid rgba(17, 24, 39, 0.14);\n  border-radius: 8px;\n  background: #fff;\n  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);\n}\n\n.training-search-option {\n  display: block;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 10px 12px;\n  text-align: left;\n  color: #111827;\n  cursor: pointer;\n}\n\n.training-search-option:hover {\n  background: #f3f4f6;\n}\n\n.training-search-empty {\n  padding: 10px 12px;\n  color: #6b7280;\n}\n\n.training-dropdown-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.training-dropdown-toggle .dropdown-icon {\n  flex: 0 0 auto;\n  margin-left: auto;\n}\n\n/* Shared polished training picker */\n.training-search-control {\n  position: relative;\n  isolation: isolate;\n}\n\n.training-search-menu {\n  position: absolute;\n  z-index: 100;\n  top: calc(100% + 10px);\n  right: 0;\n  left: 0;\n  max-height: 320px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 8px;\n  border: 1px solid rgba(37, 99, 235, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.98);\n  box-shadow:\n    0 18px 45px rgba(15, 23, 42, 0.18),\n    0 4px 12px rgba(37, 99, 235, 0.08);\n  backdrop-filter: blur(12px);\n  scrollbar-color: #94a3b8 transparent;\n  scrollbar-width: thin;\n}\n\n.training-search-menu::before {\n  position: absolute;\n  top: -6px;\n  right: 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 1px solid rgba(37, 99, 235, 0.18);\n  border-left: 1px solid rgba(37, 99, 235, 0.18);\n  background: #fff;\n  content: \"\";\n  transform: rotate(45deg);\n}\n\n.training-search-menu input {\n  position: sticky;\n  z-index: 1;\n  top: 0;\n  width: 100%;\n  min-height: 42px;\n  margin: 0 0 7px;\n  padding: 9px 38px 9px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  outline: none;\n  background: #f8fafc;\n  color: #0f172a;\n  font: inherit;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n\n.training-search-menu input:focus {\n  border-color: #2563eb;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n.training-search-option {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 42px;\n  margin: 2px 0;\n  padding: 10px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: #1e293b;\n  font: inherit;\n  font-weight: 500;\n  line-height: 1.35;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    color 150ms ease,\n    background 150ms ease,\n    transform 150ms ease;\n}\n\n.training-search-option:hover,\n.training-search-option:focus-visible {\n  outline: none;\n  background: linear-gradient(\n    90deg,\n    rgba(37, 99, 235, 0.12),\n    rgba(14, 165, 233, 0.07)\n  );\n  color: #1d4ed8;\n  transform: translateX(2px);\n}\n\n.training-search-empty {\n  margin: 4px 0 0;\n  padding: 20px 12px;\n  border-radius: 9px;\n  background: #f8fafc;\n  color: #64748b;\n  font-size: 0.9rem;\n  font-weight: 500;\n  text-align: center;\n}\n\n.training-search-menu::-webkit-scrollbar {\n  width: 8px;\n}\n\n.training-search-menu::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 999px;\n  background: #94a3b8;\n  background-clip: padding-box;\n}\n\n.training-search-menu::-webkit-scrollbar-track {\n  background: transparent;\n}\n"] }]
    }], function () { return [{ type: i1.NotifierService }, { type: i2.TestStorageService }, { type: i3.TestExcelImportService }, { type: i4.HttpClient }, { type: i5.DataService }, { type: i6.TrainingManagementService }]; }, { onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
//# sourceMappingURL=create-test.component.js.map