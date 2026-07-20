import { TestDefinition, TestDifficulty, TestQuestion, TestQuestionType } from '../test.model';

export type ImportDuplicateAction = 'skip' | 'update' | 'clone';
export type ImportRowAction = 'import' | 'update' | 'skip' | 'failed' | 'map-existing' | 'create-and-map';

export interface ImportValidationError {
  rowNumber: number;
  field: string;
  message: string;
}

export interface QuestionImportItem {
  rowNumber: number;
  question: TestQuestion | null;
  action: ImportRowAction;
  duplicateReason?: string;
  existingQuestionId?: string;
  errors: ImportValidationError[];
}

export interface QuestionImportPreview {
  fileName: string;
  duplicateAction: ImportDuplicateAction;
  totalRows: number;
  validRows: number;
  duplicateRows: number;
  invalidRows: number;
  newQuestions: number;
  updateQuestions: number;
  skippedRows: number;
  failedRows: number;
  items: QuestionImportItem[];
}

export interface QuestionImportResult {
  imported: number;
  updated: number;
  skipped: number;
  failed: number;
  questionBankTotal: number;
}

export interface AssessmentImportItem {
  rowNumber: number;
  question: TestQuestion | null;
  questionId: string;
  questionOrder: number;
  action: ImportRowAction;
  existingQuestionId?: string;
  errors: ImportValidationError[];
}

export interface AssessmentImportPreview {
  fileName: string;
  testDefinition: TestDefinition | null;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  existingQuestionsFound: number;
  newQuestionsToCreate: number;
  duplicateMappings: number;
  finalMappedQuestionCount: number;
  finalTotalMarks: number;
  errors: ImportValidationError[];
  items: AssessmentImportItem[];
}

export interface AssessmentImportResult {
  assessmentName: string;
  displayName: string;
  fileName: string;
  storageKey: string;
  newQuestionsAdded: number;
  existingQuestionsMapped: number;
  duplicatesSkipped: number;
  failedRows: number;
  totalMappedQuestions: number;
  totalMarks: number;
  questionBankTotal: number;
}

export interface QuestionImportRow {
  questionId?: string;
  trainingId?: string;
  trainingName?: string;
  subject?: string;
  topic?: string;
  questionType?: TestQuestionType | string;
  difficulty?: TestDifficulty | string;
  questionText?: string;
  questionImageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  marks?: number | string;
  negativeMarks?: number | string;
  estimatedTimeSeconds?: number | string;
  explanation?: string;
  explanationImageUrl?: string;
  expectedAnswer?: string;
  sampleAnswer?: string;
  isActive?: boolean | string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  optionF?: string;
  optionAImageUrl?: string;
  optionBImageUrl?: string;
  optionCImageUrl?: string;
  optionDImageUrl?: string;
  optionEImageUrl?: string;
  optionFImageUrl?: string;
  correctOption?: string;
  correctOptions?: string;
}

export interface AssessmentImportRow extends QuestionImportRow {
  testName?: string;
  testTitle?: string;
  description?: string;
  instructions?: string;
  status?: string;
  durationMinutes?: number | string;
  passingPercentage?: number | string;
  questionOrder?: number | string;
}
