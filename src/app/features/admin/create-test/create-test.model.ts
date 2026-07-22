export type CreateTestQuestionType = 'MCSA' | 'MCMA' | 'TRUE_FALSE' | 'ESSAY';
export type CreateTestDifficulty = 'Easy' | 'Medium' | 'Hard';
export type CreateTestStatus = 'Draft' | 'Active' | 'Inactive';

export interface CreateTestDetails {
  testTitle: string;
  description: string;
  trainingId?: string;
  trainingName?: string;
  subject: string;
  topic: string;
  durationMinutes: number | null;
  passingPercentage: number | null;
  instructions: string;
  status: CreateTestStatus;
  totalQuestions?: number | null;
}

export interface CreateTestOption {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface CreateTestQuestion {
  id: number;
  questionId?: string;
  trainingId?: string;
  trainingName?: string;
  isActive?: boolean;
  questionNo: number;
  questionType: CreateTestQuestionType;
  subject: string;
  topic: string;
  difficulty: CreateTestDifficulty;
  questionText: string;
  questionImageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  options?: CreateTestOption[];
  correctOptionId?: string;
  correctOptionIds?: string[];
  expectedAnswer?: string;
  sampleAnswer?: string;
  manualReviewRequired?: boolean;
  explanation: string;
  explanationImageUrl?: string;
  marks: number;
  negativeMarks: number;
  estimatedTimeSeconds: number;
}

export interface CreateTestQuestionForm {
  id: number | null;
  questionType: CreateTestQuestionType;
  subject: string;
  topic: string;
  difficulty: CreateTestDifficulty;
  questionText: string;
  questionImageUrl: string;
  audioUrl: string;
  videoUrl: string;
  options: CreateTestOption[];
  correctOptionId: string;
  correctOptionIds: string[];
  expectedAnswer: string;
  sampleAnswer: string;
  manualReviewRequired: boolean;
  explanation: string;
  explanationImageUrl: string;
  marks: number | null;
  negativeMarks: number | null;
  estimatedTimeSeconds: number | null;
}

export interface CreateTestPayload {
  testId: string;
  testName: string;
  displayName?: string;
  fileName?: string;
  testTitle: string;
  description: string;
  trainingId?: string;
  trainingName?: string;
  testFileType: 'pre' | 'post' | 'assessment' | 'chalange';
  subject: string;
  topic: string;
  durationMinutes: number;
  passingPercentage: number;
  instructions: string;
  status: CreateTestStatus;
  createdAt: string;
  updatedAt: string;
  totalQuestions: number;
  totalMarks: number;
  mappedQuestionIds: string[];
  questionOrder: string[];
  version: number;
}




