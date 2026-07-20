export type TestQuestionType = 'MCSA' | 'MCMA' | 'TRUE_FALSE' | 'ESSAY';
export type TestDifficulty = 'Easy' | 'Medium' | 'Hard';
export type TestStatus = 'Draft' | 'Active' | 'Inactive';

export interface TestOption {
  id: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface TestQuestion {
  id: number;
  questionId?: string;
  questionNo: number;
  trainingId?: string;
  trainingName?: string;
  questionType: TestQuestionType;
  subject: string;
  topic: string;
  difficulty: TestDifficulty;
  questionText: string;
  questionImageUrl?: string;
  questionImageAlt?: string;
  audioUrl?: string;
  videoUrl?: string;
  options?: TestOption[];
  correctOptionId?: string;
  correctOptionIds?: string[];
  expectedAnswer?: string;
  sampleAnswer?: string;
  explanation: string;
  explanationImageUrl?: string;
  explanationImageAlt?: string;
  marks?: number;
  negativeMarks?: number;
  estimatedTimeSeconds: number;
  isActive?: boolean;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestDefinition {
  testId: string;
  testName: string;
  displayName?: string;
  fileName?: string;
  testTitle: string;
  description: string;
  trainingId?: string;
  trainingName?: string;
  testFileType?: 'pre' | 'post' | 'assessment' | 'NOR';
  subject: string;
  topic: string;
  durationMinutes: number;
  passingPercentage: number;
  instructions: string;
  status: TestStatus | string;
  mappedQuestionIds: string[];
  questionOrder: string[];
  totalQuestions: number;
  totalMarks: number;
  createdAt: string;
  updatedAt: string;
  version: number;
  questions?: TestQuestion[];
}

export interface TestAttempt {
  testDefinition: TestDefinition;
  questions: TestQuestion[];
  missingQuestionIds: string[];
  inactiveQuestionIds: string[];
}

export interface TestDraft extends TestDefinition {}

export type TestQuestionStatus = 'answered' | 'skipped' | 'notAnswered';
export type EvaluationStatus = 'correct' | 'wrong' | 'skipped' | 'manualReview' | 'notAnswered';

export interface UserAnswer {
  questionId: number;
  selectedOptionId: string | null;
  selectedOptionIds: string[];
  essayAnswer: string;
  status: TestQuestionStatus;
  evaluationStatus: EvaluationStatus;
  timeSpentSeconds: number;
  firstVisitedAt: number | null;
  lastVisitedAt: number | null;
  visitedCount: number;
}

export interface TestSummaryItem {
  label: string;
  total: number;
  correct?: number;
  marks?: number;
  obtainedMarks?: number;
}

export interface TestResult {
  totalQuestions: number;
  attempted: number;
  skipped: number;
  notAnswered: number;
  correct: number;
  wrong: number;
  manualReviewCount: number;
  totalMarks: number;
  obtainedMarks: number;
  manualReviewMarks: number;
  negativeMarksDeducted: number;
  percentage: number;
  passed: boolean;
  totalTimeUsedSeconds: number;
  averageTimePerQuestionSeconds: number;
  questionTypeBreakdown: TestSummaryItem[];
  difficultyBreakdown: TestSummaryItem[];
  marksBreakdown: TestSummaryItem[];
  subjectWiseSummary: TestSummaryItem[];
  topicWiseSummary: TestSummaryItem[];
}

export interface TestAssessmentPayload {
  testTitle: string;
  description: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  passingPercentage: number;
  instructions: string;
  status: string;
  totalQuestions: number;
  totalMarks: number;
  questions: TestQuestion[];
}

export interface EncryptedAssessmentFile {
  fileType: string;
  version: number;
  testTitle: string;
  targetFolder: string;
  createdAt: string;
  encryptedPayload: string;
}

export interface QuestionBankFilter {
  searchText: string;
  trainingId: string;
  subject: string;
  topic: string;
  questionType: TestQuestionType | '';
  difficulty: TestDifficulty | '';
  marks: number | null;
  isActive: boolean | null;
}

export interface TestFilter {
  searchText: string;
  trainingId: string;
  subject: string;
  topic: string;
  status: TestStatus | '';
}

export interface QuestionUsageInfo {
  questionId: string;
  usageCount: number;
  affectedTests: TestDefinition[];
}

export interface QuestionResult {
  questionId: number;
  questionNo: number;
  questionType: TestQuestionType;
  subject: string;
  topic: string;
  difficulty: TestDifficulty;
  questionText: string;
  selectedOptionId: string | null;
  selectedOptionIds: string[];
  essayAnswer: string;
  correctOptionId?: string;
  correctOptionIds?: string[];
  evaluationStatus: EvaluationStatus;
  timeSpentSeconds: number;
  marks: number;
  negativeMarks: number;
  obtainedMarks: number;
  explanation: string;
  mediaUrls: {
    questionImageUrl?: string;
    audioUrl?: string;
    videoUrl?: string;
    explanationImageUrl?: string;
  };
}

export interface TestSubmission {
  submissionId: string;
  username: string;
  normalizedUsername?: string;
  testId?: string;
  testName: string;
  displayName?: string;
  fileName?: string;
  testTitle: string;
  submittedAt: string;
  isAutoSubmitted: boolean;
  resultSource: string;
  testDetailsSnapshot?: TestDefinition;
  questionSnapshots?: TestQuestion[];
  totalDurationSeconds: number;
  totalTimeUsedSeconds: number;
  questions: TestQuestion[];
  userAnswers: UserAnswer[];
  questionResults?: QuestionResult[];
  resultSummary: TestResult;
  solutionReview: QuestionResult[];
  manualReviewItems: QuestionResult[];
  questionTypeBreakdown: TestSummaryItem[];
  difficultyBreakdown: TestSummaryItem[];
  subjectWiseSummary: TestSummaryItem[];
  topicWiseSummary: TestSummaryItem[];
}

export interface SavedResultListItem {
  key: string;
  username: string;
  testName: string;
  normalizedUsername?: string;
  fileName?: string;
  submittedAt: string;
  percentage: number;
  score: number;
  passed: boolean;
  isAutoSubmitted: boolean;
}
