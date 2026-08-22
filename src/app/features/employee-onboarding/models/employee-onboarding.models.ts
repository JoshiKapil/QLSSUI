export interface OnboardingLoginState {
  isRequired: boolean;
  isBlocked: boolean;
  enrollmentId?: number;
  status: string;
  completionPercent: number;
  dueOnUtc?: string;
  graceUntilUtc?: string;
  hasPendingAccessRequest: boolean;
}

export interface OnboardingDashboard {
  activeEmployees: number;
  dueSoon: number;
  grace: number;
  blocked: number;
  completed: number;
  pendingAccessRequests: number;
}

export interface OnboardingDepartment {
  departmentId: number;
  departmentCode: string;
  departmentName: string;
  description?: string;
  isActive: boolean;
}

export interface AssignmentOption {
  optionId: number;
  optionText: string;
  isCorrect?: boolean;
  displayOrder: number;
}

export interface AssignmentQuestion {
  questionId: number;
  questionText: string;
  questionType: string;
  marks: number;
  displayOrder: number;
  explanation?: string;
  options: AssignmentOption[];
}

export interface OnboardingVideo {
  videoId: number;
  videoCode: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  assignmentTitle?: string;
  assignmentInstructions?: string;
  maxAttempts?: number;
  showResultAfterSubmit: boolean;
  isActive: boolean;
  questions: AssignmentQuestion[];
}

export interface OnboardingPlanItem {
  planItemId: number;
  planId: number;
  videoId: number;
  videoTitle: string;
  sequenceNo: number;
  minimumWatchPercent: number;
  passingPercent: number;
  mustPassAssignment: boolean;
  isActive: boolean;
}

export interface OnboardingPlan {
  planId: number;
  planCode: string;
  planName: string;
  departmentId?: number;
  departmentName?: string;
  completionDays: number;
  isDefault: boolean;
  isActive: boolean;
  planStatus: 'Draft' | 'Published';
  versionNo: number;
  welcomeMessage?: string;
  completionMessage?: string;
  publishedOnUtc?: string;
  items: OnboardingPlanItem[];
}

export interface OnboardingUserLookup {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface OnboardingEnrollmentSummary {
  enrollmentId: number;
  userId: number;
  employeeName: string;
  employeeEmail: string;
  departmentId?: number;
  departmentName?: string;
  startOnUtc: string;
  dueOnUtc: string;
  graceUntilUtc: string;
  status: string;
  currentSequenceNo: number;
  completionPercent: number;
  completedOnUtc?: string;
  totalItems: number;
  completedItems: number;
}

export interface OnboardingEmployeeItem {
  enrollmentItemId: number;
  sequenceNo: number;
  sourceScope: string;
  videoId: number;
  videoTitle: string;
  videoUrl: string;
  videoDescription?: string;
  minimumWatchPercent: number;
  passingPercent: number;
  mustPassAssignment: boolean;
  assignmentTitle?: string;
  assignmentInstructions?: string;
  maxAttempts?: number;
  showResultAfterSubmit: boolean;
  status: string;
  videoPositionSeconds: number;
  maxVideoPositionSeconds: number;
  watchedSeconds: number;
  videoDurationSeconds?: number;
  videoCompletedOnUtc?: string;
  assignmentAttemptCount: number;
  assignmentScore?: number;
  assignmentTotalMarks?: number;
  assignmentPercentage?: number;
  assignmentPassed?: boolean;
  completedOnUtc?: string;
  assignmentQuestions: AssignmentQuestion[];
}

export interface OnboardingEnrollmentDetail {
  enrollment?: OnboardingEnrollmentSummary;
  items: OnboardingEmployeeItem[];
}

export interface MyOnboarding {
  enrollment?: OnboardingEnrollmentSummary;
  items: OnboardingEmployeeItem[];
  unreadNotifications: number;
}

export interface AssignmentResult {
  attemptNo: number;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  nextItemUnlocked: boolean;
  onboardingCompleted: boolean;
}

export interface OnboardingNotification {
  notificationId: number;
  notificationType: string;
  title: string;
  message: string;
  isRead: boolean;
  createdOnUtc: string;
}

export interface OnboardingAccessRequest {
  accessRequestId: number;
  enrollmentId: number;
  userId: number;
  employeeName: string;
  employeeEmail: string;
  reason: string;
  status: string;
  requestedOnUtc: string;
  completionPercent: number;
  graceUntilUtc: string;
  reviewRemark?: string;
  extensionDays?: number;
}

export interface SaveQuestionRequest {
  questionText: string;
  questionType: 'SingleChoice' | 'TrueFalse';
  marks: number;
  displayOrder: number;
  explanation?: string;
  options: Array<{ optionText: string; isCorrect: boolean; displayOrder: number }>;
}

export interface SaveVideoRequest {
  videoCode: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  assignmentTitle?: string;
  assignmentInstructions?: string;
  maxAttempts?: number | null;
  showResultAfterSubmit: boolean;
  isActive: boolean;
  questions: SaveQuestionRequest[];
}

export interface SavePlanRequest {
  planCode: string;
  planName: string;
  departmentId?: number | null;
  completionDays: number;
  isDefault: boolean;
  isActive: boolean;
  welcomeMessage?: string;
  completionMessage?: string;
  items: Array<{ videoId: number; sequenceNo: number; minimumWatchPercent: number; passingPercent: number; mustPassAssignment: boolean }>;
}


export interface OnboardingSetupOverview {
  activeDepartments: number;
  activeVideos: number;
  activeQuestions: number;
  draftPlans: number;
  publishedPlans: number;
  warnings: string[];
}
