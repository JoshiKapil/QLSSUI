export interface QuestionOptionDto {
  id: string;
  text: string;
  imageUrl: string;
  audioUrl: string;
  videoUrl: string;
  imageAlt: string;
  displayOrder: number;
  isCorrect: boolean;
}

export interface QuestionDto {
  questionId: string;
  id: string;
  trainingId: string;
  trainingName: string;
  questionNo: number;
  questionType: 'MCSA' | 'MCMA' | 'TRUE_FALSE' | 'ESSAY' | string;
  subject: string;
  topic: string;
  category: string;
  section: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  questionText: string;
  questionImageUrl: string;
  questionImageAlt: string;
  audioUrl: string;
  videoUrl: string;
  options: QuestionOptionDto[];
  correctOptionId: string;
  correctOptionIds: string[];
  expectedAnswer: string;
  sampleAnswer: string;
  manualReviewRequired: boolean;
  explanation: string;
  explanationImageUrl: string;
  explanationImageAlt: string;
  marks: number;
  negativeMarks: number;
  estimatedTimeSeconds: number;
  metadataJson: string;
  isActive: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestDto {
  testId: string;
  testName: string;
  displayName: string;
  fileName: string;
  testTitle: string;
  description: string;
  trainingId: string;
  trainingName: string;
  subject: string;
  topic: string;
  category: string;
  section: string;
  durationMinutes: number;
  passingPercentage: number;
  instructions: string;
  status: string;
  totalQuestions: number;
  totalMarks: number;
  negativeMarks: number;
  imageUrl: string;
  audioUrl: string;
  videoUrl: string;
  metadataJson: string;
  isActive: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
  mappedQuestionIds: string[];
  questionOrder: string[];
  questions: QuestionDto[];
}

export interface TestAttemptDto {
  testDefinition: TestDto;
  questions: QuestionDto[];
  missingQuestionIds: string[];
  inactiveQuestionIds: string[];
}

export interface MapQuestionRequest {
  testId: number;
  questionId: string;
  questionOrder?: number | null;
  marks?: number | null;
  negativeMarks?: number | null;
  section: string;
}

export interface BulkMapQuestionsRequest {
  testId: number;
  questions: MapQuestionRequest[];
}

export interface UnmapQuestionRequest {
  testId: number;
  questionId: string;
}

export interface UserAnswerDto {
  submissionId: string;
  questionId: string;
  selectedOptionId: string;
  selectedOptionIds: string[];
  essayAnswer: string;
  status: string;
  evaluationStatus: string;
  timeSpentSeconds: number;
  firstVisitedAt?: string | null;
  lastVisitedAt?: string | null;
  visitedCount: number;
}

export interface QuestionResultDto {
  submissionId: string;
  questionId: string;
  questionNo: number;
  questionType: string;
  subject: string;
  topic: string;
  difficulty: string;
  questionText: string;
  selectedOptionId: string;
  selectedOptionIds: string[];
  essayAnswer: string;
  correctOptionId: string;
  correctOptionIds: string[];
  evaluationStatus: string;
  timeSpentSeconds: number;
  marks: number;
  negativeMarks: number;
  obtainedMarks: number;
  explanation: string;
  mediaUrlsJson: string;
  isManualReview: boolean;
}

export interface TestSummaryItemDto {
  breakdownType: string;
  label: string;
  total: number;
  correct: number;
  marks: number;
  obtainedMarks: number;
  attempted: number;
  skipped: number;
  notAnswered: number;
  wrong: number;
  manualReviewCount: number;
  manualReviewMarks: number;
  negativeMarksDeducted: number;
  percentage: number;
  passed: boolean;
  totalTimeUsedSeconds: number;
  averageTimePerQuestionSeconds: number;
}

export interface TestSubmissionDto {
  submissionId: string;
  username: string;
  normalizedUsername: string;
  testId?: number | null;
  testName: string;
  displayName: string;
  fileName: string;
  testTitle: string;
  submittedAt: string;
  isAutoSubmitted: boolean;
  resultSource: string;
  totalDurationSeconds: number;
  totalTimeUsedSeconds: number;
  testSnapshotJson: string;
  questionSnapshotsJson: string;
  summary: TestSummaryItemDto;
  userAnswers: UserAnswerDto[];
  questionResults: QuestionResultDto[];
  breakdowns: TestSummaryItemDto[];
}

export interface TestResultDto {
  submissionId: string;
  username: string;
  normalizedUsername: string;
  testId?: number | null;
  testName: string;
  displayName: string;
  fileName: string;
  testTitle: string;
  submittedAt: string;
  isAutoSubmitted: boolean;
  resultSource: string;
  totalDurationSeconds: number;
  totalTimeUsedSeconds: number;
  summary: TestSummaryItemDto;
  questionResults: QuestionResultDto[];
  breakdowns: TestSummaryItemDto[];
  testSnapshotJson: string;
  questionSnapshotsJson: string;
}

export interface SavedResultListItemDto {
  submissionId: string;
  username: string;
  testName: string;
  testTitle: string;
  testId?: number | null;
  submittedAt: string;
  percentage?: number | null;
  obtainedMarks?: number | null;
  totalMarks?: number | null;
  passed?: boolean | null;
  manualReviewCount: number;
  totalQuestions: number;
  isAutoSubmitted: boolean;
  resultSource: string;
}

export interface ManualReviewItemDto {
  questionId: string;
  reviewerNotes: string;
  marksAwarded?: number | null;
  reviewStatus: string;
  reviewedAt?: string | null;
  reviewedBy: string;
}

export interface SaveUserResultRequest {
  userId?: number | null;
  testId?: number | null;
  submissionId: string;
  username: string;
  testName: string;
  result?: any;
  resultJson: string;
  score?: number | null;
  percentage?: number | null;
  passed?: boolean | null;
  isAutoSubmitted: boolean;
  submittedAt?: string | null;
}

export interface UserResultDto {
  usersResultId: number;
  userId?: number | null;
  testId?: number | null;
  submissionId: string;
  username: string;
  testName: string;
  resultJson: string;
  score?: number | null;
  percentage?: number | null;
  passed?: boolean | null;
  isAutoSubmitted: boolean;
  submittedAt: string;
  createdAt: string;
}

export interface QuestionUsageInfoDto {
  questionId: string;
  testsMapped: number;
  activeTestsMapped: number;
  submissionsSeen: number;
  correctCount: number;
  wrongCount: number;
  manualReviewCount: number;
}

export interface ImportResultDto {
  imported: number;
  updated: number;
  skipped: number;
  failed: number;
  errors: string[];
}

export interface QuestionTestImportRequestDto {
  trainingId: string;
  trainingName: string;
  testType: string;
  testName: string;
  questions: QuestionDto[];
}

export interface QuestionTestImportDetailDto {
  rowNumber: number;
  questionText: string;
  status: 'inserted' | 'duplicate' | 'failed' | string;
  message: string;
  questionId: string;
}

export interface QuestionTestImportResultDto {
  total: number;
  inserted: number;
  skipped: number;
  duplicate: number;
  failed: number;
  testId: string;
  testCreated: boolean;
  details: QuestionTestImportDetailDto[];
}

export interface AffectedRowsDto {
  affectedRows: number;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  expiresAtUtc: string;
  user: any;
}
