import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { TestDefinition, TestDifficulty, TestOption, TestQuestion, TestQuestionType } from '../test.model';
import { TestStorageService } from './test-storage.service';
import {
  AssessmentImportItem,
  AssessmentImportPreview,
  AssessmentImportResult,
  AssessmentImportRow,
  ImportDuplicateAction,
  ImportValidationError,
  QuestionImportItem,
  QuestionImportPreview,
  QuestionImportResult,
  QuestionImportRow
} from './test-excel-import.model';

@Injectable({ providedIn: 'root' })
export class TestExcelImportService {
  private readonly optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  private readonly defaultPassingPercentage = 60;
  private readonly defaultDurationMinutes = 30;
  private readonly defaultQuestionMarks = 1;
  private readonly defaultEstimatedTimeSeconds = 60;

  constructor(private storage: TestStorageService) {}

  async parseQuestionExcel(file: File, duplicateAction: ImportDuplicateAction = 'skip'): Promise<QuestionImportPreview> {
    const rows = await this.readRows<QuestionImportRow>(file);
    const questionBank = await this.storage.loadQuestionBank([]);
    const items: QuestionImportItem[] = [];

    rows.forEach((row, index) => {
      if (this.isEmptyRow(row)) {
        return;
      }

      const rowNumber = index + 2;
      const question = this.buildQuestionFromRow(row, rowNumber);
      const errors = this.validateQuestion(question, rowNumber);
      const duplicate = question ? this.findDuplicate(question, questionBank) : null;
      let action: QuestionImportItem['action'] = 'import';
      let existingQuestionId = duplicate ? this.storage.getQuestionKey(duplicate) : undefined;
      let duplicateReason = '';

      if (errors.length) {
        action = 'failed';
      } else if (duplicate) {
        duplicateReason = question?.questionId && this.storage.getQuestionKey(duplicate) === question.questionId
          ? 'Matching questionId already exists.'
          : 'Matching question text, subject, topic, and type already exists.';
        action = duplicateAction === 'update' ? 'update' : duplicateAction === 'clone' ? 'import' : 'skip';
        if (duplicateAction === 'clone' && question) {
          question.questionId = this.generateQuestionId();
          existingQuestionId = undefined;
        }
      }

      items.push({ rowNumber, question, action, duplicateReason, existingQuestionId, errors });
    });

    return this.buildQuestionPreview(file.name, duplicateAction, items);
  }

  async applyQuestionImport(preview: QuestionImportPreview): Promise<QuestionImportResult> {
    const questionBank = await this.storage.loadQuestionBank([]);
    let imported = 0;
    let updated = 0;
    let skipped = 0;
    let failed = 0;

    preview.items.forEach((item) => {
      if (!item.question || item.action === 'failed') {
        failed += 1;
        return;
      }

      if (item.action === 'skip') {
        skipped += 1;
        return;
      }

      if (item.action === 'update' && item.existingQuestionId) {
        const existingIndex = questionBank.findIndex((question) => this.storage.getQuestionKey(question) === item.existingQuestionId);
        if (existingIndex > -1) {
          questionBank[existingIndex] = {
            ...questionBank[existingIndex],
            ...item.question,
            id: questionBank[existingIndex].id,
            questionId: item.existingQuestionId,
            updatedAt: new Date().toISOString()
          };
          updated += 1;
          return;
        }
      }

      questionBank.push({ ...item.question, questionNo: questionBank.length + 1 });
      imported += 1;
    });

    await this.storage.saveQuestionBank(questionBank);
    return { imported, updated, skipped, failed, questionBankTotal: questionBank.length };
  }

  async parseAssessmentExcel(file: File): Promise<AssessmentImportPreview> {
    const workbook = await this.readWorkbook(file);
    const detailRows = this.getSheetRows<AssessmentImportRow>(workbook, 'TestDetails');
    const questionRows = this.getSheetRows<AssessmentImportRow>(workbook, 'Questions');
    const fallbackRows = !detailRows.length && !questionRows.length ? this.getFirstSheetRows<AssessmentImportRow>(workbook) : [];
    const metadata = (detailRows[0] || fallbackRows[0] || {}) as AssessmentImportRow;
    const rows = questionRows.length ? questionRows : fallbackRows;
    const questionBank = await this.storage.loadQuestionBank([]);
    const errors: ImportValidationError[] = [];
    const testName = this.clean(metadata.testName || metadata.testTitle);
    const now = new Date().toISOString();

    if (!testName) {
      errors.push({ rowNumber: 2, field: 'testName', message: 'testName is required.' });
    }

    const durationMinutes = this.positiveNumber(metadata.durationMinutes, 0);
    if (!durationMinutes) {
      errors.push({ rowNumber: 2, field: 'durationMinutes', message: 'durationMinutes is required and must be greater than 0.' });
    }

    const passingPercentage = this.positiveNumber(metadata.passingPercentage, this.defaultPassingPercentage);
    if (passingPercentage <= 0 || passingPercentage > 100) {
      errors.push({ rowNumber: 2, field: 'passingPercentage', message: 'passingPercentage must be between 1 and 100.' });
    }

    const items: AssessmentImportItem[] = [];
    const mappedIds: string[] = [];
    const usedIds = new Set<string>();
    let duplicateMappings = 0;

    rows.forEach((row, index) => {
      if (this.isEmptyRow(row)) {
        return;
      }

      const rowNumber = index + 2;
      const question = this.buildQuestionFromRow(row, rowNumber);
      const existingById = this.clean(row.questionId) ? questionBank.find((item) => this.storage.getQuestionKey(item) === this.clean(row.questionId)) || null : null;
      const existing = existingById || (question ? this.findDuplicate(question, questionBank) : null);
      const rowErrors = existingById ? [] : this.validateQuestion(question, rowNumber);
      const questionId = existing ? this.storage.getQuestionKey(existing) : question?.questionId || '';
      const order = this.positiveNumber(row.questionOrder, mappedIds.length + 1);
      let action: AssessmentImportItem['action'] = 'create-and-map';

      if (rowErrors.length) {
        action = 'failed';
      } else if (usedIds.has(questionId)) {
        action = 'skip';
        duplicateMappings += 1;
      } else if (existing) {
        action = 'map-existing';
      }

      if (action !== 'failed' && action !== 'skip') {
        usedIds.add(questionId);
        mappedIds.push(questionId);
      }

      items.push({
        rowNumber,
        question,
        questionId,
        questionOrder: order,
        action,
        existingQuestionId: existing ? this.storage.getQuestionKey(existing) : undefined,
        errors: rowErrors
      });
    });

    items.sort((a, b) => a.questionOrder - b.questionOrder);
    const validItems = items.filter((item) => item.action !== 'failed' && item.action !== 'skip');
    const finalTotalMarks = validItems.reduce((total, item) => total + (item.question?.marks || 1), 0);

    if (!validItems.length) {
      errors.push({ rowNumber: 2, field: 'questions', message: 'At least one valid mapped question is required.' });
    }

    const testDefinition: TestDefinition | null = testName ? {
      testId: `test-${this.storage.normalizeFileName(testName)}`,
      testName,
      displayName: testName,
      fileName: this.storage.normalizeFileName(testName),
      testTitle: this.clean(metadata.testTitle) || testName,
      description: this.clean(metadata.description),
      trainingId: this.clean(metadata.trainingId),
      trainingName: this.clean(metadata.trainingName),
      subject: this.clean(metadata.subject),
      topic: this.clean(metadata.topic),
      durationMinutes: durationMinutes || this.defaultDurationMinutes,
      passingPercentage,
      instructions: this.clean(metadata.instructions),
      status: this.clean(metadata.status) || 'Active',
      mappedQuestionIds: validItems.map((item) => item.questionId),
      questionOrder: validItems.map((item) => item.questionId),
      totalQuestions: validItems.length,
      totalMarks: finalTotalMarks,
      createdAt: now,
      updatedAt: now,
      version: 1
    } : null;

    return {
      fileName: file.name,
      testDefinition,
      totalRows: items.length,
      validRows: validItems.length,
      invalidRows: items.filter((item) => item.action === 'failed').length,
      existingQuestionsFound: items.filter((item) => item.action === 'map-existing').length,
      newQuestionsToCreate: items.filter((item) => item.action === 'create-and-map').length,
      duplicateMappings,
      finalMappedQuestionCount: validItems.length,
      finalTotalMarks,
      errors,
      items
    };
  }

  async applyAssessmentImport(preview: AssessmentImportPreview): Promise<AssessmentImportResult> {
    if (!preview.testDefinition) {
      throw new Error('Assessment metadata is invalid.');
    }

    const questionBank = await this.storage.loadQuestionBank([]);
    let newQuestionsAdded = 0;
    let existingQuestionsMapped = 0;
    let duplicatesSkipped = 0;
    let failedRows = 0;
    const mappedQuestionIds: string[] = [];

    preview.items
      .filter((item) => item.action !== 'failed')
      .sort((a, b) => a.questionOrder - b.questionOrder)
      .forEach((item) => {
        if (!item.question || item.action === 'failed') {
          failedRows += 1;
          return;
        }

        if (item.action === 'skip') {
          duplicatesSkipped += 1;
          return;
        }

        if (item.action === 'create-and-map') {
          questionBank.push({ ...item.question, questionNo: questionBank.length + 1 });
          newQuestionsAdded += 1;
        } else {
          existingQuestionsMapped += 1;
        }

        mappedQuestionIds.push(item.questionId);
      });

    const totalMarks = mappedQuestionIds.reduce((total, questionId) => {
      const question = questionBank.find((item) => this.storage.getQuestionKey(item) === questionId);
      return total + (question?.marks || 1);
    }, 0);

    const assessment = {
      ...preview.testDefinition,
      mappedQuestionIds,
      questionOrder: mappedQuestionIds,
      totalQuestions: mappedQuestionIds.length,
      totalMarks,
      updatedAt: new Date().toISOString()
    };

    await this.storage.saveQuestionBank(questionBank);
    await this.storage.saveAssessment(assessment);

    return {
      assessmentName: assessment.testName,
      displayName: assessment.displayName || assessment.testName,
      fileName: this.storage.buildAssessmentFileName(assessment.displayName || assessment.testName),
      storageKey: this.storage.getAssessmentKey(assessment.displayName || assessment.testName),
      newQuestionsAdded,
      existingQuestionsMapped,
      duplicatesSkipped,
      failedRows: preview.items.filter((item) => item.action === 'failed').length + failedRows,
      totalMappedQuestions: mappedQuestionIds.length,
      totalMarks,
      questionBankTotal: questionBank.length
    };
  }

  buildQuestionTemplate(): Blob {
    const rows = [
      this.questionTemplateRow({ questionType: 'MCSA', questionText: 'Which item is a quality tool?', optionA: 'Fishbone diagram', optionB: 'Invoice', optionC: 'Payroll', correctOption: 'A' }),
      this.questionTemplateRow({ questionType: 'MCMA', questionText: 'Select front-end technologies.', optionA: 'HTML', optionB: 'CSS', optionC: 'JavaScript', optionD: 'SQL Agent', correctOptions: 'A,B,C', marks: 3 }),
      this.questionTemplateRow({ questionType: 'ESSAY', questionText: 'Define continuous improvement.', expectedAnswer: 'Ongoing improvement of products or processes.', sampleAnswer: 'Small repeated improvements over time.' })
    ];
    return this.workbookBlob([{ name: 'Questions', rows }]);
  }

  buildAssessmentTemplate(): Blob {
    const testRows = [{
      testName: 'Test 1', testTitle: 'Demo Assessment', description: 'Practice test created from Excel', trainingId: '1', trainingName: 'Angular Training', subject: 'Angular', topic: 'Components', durationMinutes: 30, passingPercentage: 40, instructions: 'Read all questions carefully', status: 'Active'
    }];
    const questionRows = [
      this.assessmentTemplateRow({ questionId: 'q-1', questionOrder: 1, questionType: 'MCSA', questionText: 'Existing mapped question by id.', optionA: 'A', optionB: 'B', correctOption: 'A' }),
      this.assessmentTemplateRow({ questionOrder: 2, questionType: 'MCSA', questionText: 'New single-answer question.', optionA: 'Correct', optionB: 'Wrong', correctOption: 'A' }),
      this.assessmentTemplateRow({ questionOrder: 3, questionType: 'MCMA', questionText: 'New multiple-answer question.', optionA: 'One', optionB: 'Two', optionC: 'Three', correctOptions: 'A,C' }),
      this.assessmentTemplateRow({ questionOrder: 4, questionType: 'ESSAY', questionText: 'Explain component lifecycle.', expectedAnswer: 'Lifecycle hooks describe component changes.', sampleAnswer: 'ngOnInit runs after initialization.' })
    ];
    return this.workbookBlob([{ name: 'TestDetails', rows: testRows }, { name: 'Questions', rows: questionRows }]);
  }

  normalizeQuestionType(value: string): TestQuestionType {
    const cleanValue = this.clean(value).replace(/[\s/_-]+/g, '').toUpperCase();
    if (cleanValue === 'MCMA') return 'MCMA';
    if (cleanValue === 'TRUEFALSE') return 'TRUE_FALSE';
    if (cleanValue === 'ESSAY' || cleanValue === 'DEFINITION') return 'ESSAY';
    return 'MCSA';
  }

  normalizeDifficulty(value: string): TestDifficulty {
    const cleanValue = this.clean(value).toLowerCase();
    if (cleanValue === 'hard') return 'Hard';
    if (cleanValue === 'medium') return 'Medium';
    return 'Easy';
  }

  private async readWorkbook(file: File): Promise<XLSX.WorkBook> {
    const buffer = await file.arrayBuffer();
    return XLSX.read(buffer, { type: 'array' });
  }

  private async readRows<T>(file: File): Promise<T[]> {
    const workbook = await this.readWorkbook(file);
    return this.getFirstSheetRows<T>(workbook);
  }

  private getFirstSheetRows<T>(workbook: XLSX.WorkBook): T[] {
    const firstSheet = workbook.SheetNames[0];
    return firstSheet ? this.getSheetRows<T>(workbook, firstSheet) : [];
  }

  private getSheetRows<T>(workbook: XLSX.WorkBook, sheetName: string): T[] {
    const actualName = workbook.SheetNames.find((name) => name.toLowerCase() === sheetName.toLowerCase()) || sheetName;
    const sheet = workbook.Sheets[actualName];
    return sheet ? XLSX.utils.sheet_to_json<T>(sheet, { defval: '' }) : [];
  }

  private buildQuestionFromRow(row: QuestionImportRow, rowNumber: number): TestQuestion | null {
    const questionType = this.normalizeQuestionType(String(row.questionType || ''));
    const options = this.buildOptionsFromRow(row, questionType);
    const correctOptionIds = this.resolveCorrectAnswers(row, questionType, options);
    const questionId = this.clean(row.questionId) || this.generateQuestionId(rowNumber);

    return {
      id: Date.now() + rowNumber,
      questionId,
      questionNo: rowNumber - 1,
      trainingId: this.clean(row.trainingId),
      trainingName: this.clean(row.trainingName),
      subject: this.clean(row.subject),
      topic: this.clean(row.topic),
      questionType,
      difficulty: this.normalizeDifficulty(String(row.difficulty || 'Easy')),
      questionText: this.clean(row.questionText),
      questionImageUrl: this.clean(row.questionImageUrl),
      audioUrl: this.clean(row.audioUrl),
      videoUrl: this.clean(row.videoUrl),
      options: questionType === 'ESSAY' ? undefined : options,
      correctOptionId: correctOptionIds[0] || '',
      correctOptionIds,
      expectedAnswer: this.clean(row.expectedAnswer),
      sampleAnswer: this.clean(row.sampleAnswer),
      explanation: this.clean(row.explanation),
      explanationImageUrl: this.clean(row.explanationImageUrl),
      marks: this.positiveNumber(row.marks, this.defaultQuestionMarks),
      negativeMarks: this.numberValue(row.negativeMarks, 0),
      estimatedTimeSeconds: this.positiveNumber(row.estimatedTimeSeconds, this.defaultEstimatedTimeSeconds),
      isActive: this.booleanValue(row.isActive, true),
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  private buildOptionsFromRow(row: QuestionImportRow, questionType: TestQuestionType): TestOption[] {
    if (questionType === 'TRUE_FALSE') {
      return [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }];
    }

    if (questionType === 'ESSAY') {
      return [];
    }

    return this.optionLetters
      .map((letter) => {
        const text = this.clean((row as any)[`option${letter}`]);
        const imageUrl = this.clean((row as any)[`option${letter}ImageUrl`]);
        return text || imageUrl ? ({ id: letter.toLowerCase(), text, imageUrl } as TestOption) : null;
      })
      .filter((option): option is TestOption => !!option);
  }

  private resolveCorrectAnswers(row: QuestionImportRow, questionType: TestQuestionType, options: TestOption[]): string[] {
    if (questionType === 'ESSAY') {
      return [];
    }

    if (questionType === 'MCMA') {
      return this.clean(row.correctOptions)
        .split(',')
        .map((value) => this.optionIdFromValue(value))
        .filter((value) => options.some((option) => option.id === value));
    }

    const value = this.optionIdFromValue(this.clean(row.correctOption));
    return value ? [value] : [];
  }

  private validateQuestion(question: TestQuestion | null, rowNumber: number): ImportValidationError[] {
    const errors: ImportValidationError[] = [];
    if (!question) {
      errors.push({ rowNumber, field: 'row', message: 'Question row could not be read.' });
      return errors;
    }

    if (!question.trainingName && !question.trainingId) errors.push({ rowNumber, field: 'trainingName', message: 'trainingName or trainingId is required.' });
    if (!question.subject) errors.push({ rowNumber, field: 'subject', message: 'subject is required.' });
    if (!question.topic) errors.push({ rowNumber, field: 'topic', message: 'topic is required.' });
    if (!question.questionText) errors.push({ rowNumber, field: 'questionText', message: 'questionText is required.' });

    const options = question.options || [];
    if (question.questionType === 'MCSA' && (options.length < 2 || !question.correctOptionId)) errors.push({ rowNumber, field: 'correctOption', message: 'MCSA requires at least 2 options and correctOption.' });
    if (question.questionType === 'MCMA' && (options.length < 2 || !question.correctOptionIds?.length)) errors.push({ rowNumber, field: 'correctOptions', message: 'MCMA requires at least 2 options and correctOptions.' });
    if (question.questionType === 'TRUE_FALSE' && question.correctOptionId !== 'true' && question.correctOptionId !== 'false') errors.push({ rowNumber, field: 'correctOption', message: 'TRUE_FALSE requires correctOption True or False.' });
    if (question.questionType === 'ESSAY' && !question.expectedAnswer && !question.sampleAnswer) errors.push({ rowNumber, field: 'expectedAnswer', message: 'ESSAY requires expectedAnswer or sampleAnswer.' });

    return errors;
  }

  private buildQuestionPreview(fileName: string, duplicateAction: ImportDuplicateAction, items: QuestionImportItem[]): QuestionImportPreview {
    return {
      fileName,
      duplicateAction,
      totalRows: items.length,
      validRows: items.filter((item) => item.action !== 'failed').length,
      duplicateRows: items.filter((item) => !!item.duplicateReason).length,
      invalidRows: items.filter((item) => item.action === 'failed').length,
      newQuestions: items.filter((item) => item.action === 'import').length,
      updateQuestions: items.filter((item) => item.action === 'update').length,
      skippedRows: items.filter((item) => item.action === 'skip').length,
      failedRows: items.filter((item) => item.action === 'failed').length,
      items
    };
  }

  private findDuplicate(question: TestQuestion, questionBank: TestQuestion[]): TestQuestion | null {
    const byId = question.questionId ? questionBank.find((item) => this.storage.getQuestionKey(item) === question.questionId) : null;
    if (byId) {
      return byId;
    }

    return questionBank.find((item) =>
      this.clean(item.questionText).toLowerCase() === this.clean(question.questionText).toLowerCase() &&
      this.clean(item.subject).toLowerCase() === this.clean(question.subject).toLowerCase() &&
      this.clean(item.topic).toLowerCase() === this.clean(question.topic).toLowerCase() &&
      item.questionType === question.questionType
    ) || null;
  }

  private questionTemplateRow(overrides: Partial<QuestionImportRow>): QuestionImportRow {
    return { trainingId: '1', trainingName: 'Demo Training', subject: 'Quality', topic: 'Basics', questionType: 'MCSA', difficulty: 'Easy', questionText: '', questionImageUrl: '', audioUrl: '', videoUrl: '', optionA: '', optionB: '', optionC: '', optionD: '', optionE: '', optionF: '', optionAImageUrl: '', optionBImageUrl: '', optionCImageUrl: '', optionDImageUrl: '', optionEImageUrl: '', optionFImageUrl: '', correctOption: '', correctOptions: '', expectedAnswer: '', sampleAnswer: '', explanation: 'Explanation text', explanationImageUrl: '', marks: this.defaultQuestionMarks, negativeMarks: 0, estimatedTimeSeconds: this.defaultEstimatedTimeSeconds, isActive: true, ...overrides };
  }

  private assessmentTemplateRow(overrides: Partial<AssessmentImportRow>): AssessmentImportRow {
    return { ...this.questionTemplateRow(overrides), questionOrder: overrides.questionOrder || 1 };
  }

  private workbookBlob(sheets: Array<{ name: string; rows: any[] }>): Blob {
    const workbook = XLSX.utils.book_new();
    sheets.forEach((sheet) => XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(sheet.rows), sheet.name));
    const output = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([output], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  private isEmptyRow(row: any): boolean {
    return !Object.values(row || {}).some((value) => this.clean(value));
  }

  private optionIdFromValue(value: string): string {
    const cleanValue = this.clean(value).toLowerCase();
    if (cleanValue === 'true') return 'true';
    if (cleanValue === 'false') return 'false';
    return cleanValue.charAt(0);
  }

  private clean(value: any): string {
    return value === null || value === undefined ? '' : String(value).trim();
  }

  private positiveNumber(value: any, fallback: number): number {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : fallback;
  }

  private numberValue(value: any, fallback: number): number {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : fallback;
  }

  private booleanValue(value: any, fallback: boolean): boolean {
    const cleanValue = this.clean(value).toLowerCase();
    if (!cleanValue) return fallback;
    return ['true', 'yes', 'y', '1', 'active'].includes(cleanValue);
  }

  private generateQuestionId(rowNumber?: number): string {
    return `q-${Date.now()}${rowNumber ? `-${rowNumber}` : ''}`;
  }
}

