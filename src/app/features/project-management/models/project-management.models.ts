export interface PmSummary {
  newEnquiries: number;
  quotationsUnderPreparation: number;
  quotationsPendingApproval: number;
  quotationsSent: number;
  followUpsDue: number;
  projectsConfirmed: number;
  projectsUnassigned: number;
  activeProjects: number;
  delayedProjects: number;
  activitiesDueToday: number;
  activitiesUpcoming: number;
  activitiesOverdue: number;
  activitiesCompleted: number;
  projectsNearCompletion: number;
  projectsPendingClosure: number;
  customerAcknowledgementPending: number;
  closedProjects: number;
  activeProjectValue: number;
}

export interface PmDashboard {
  summary: PmSummary;
  projects: PmProject[];
  activities: PmActivity[];
  followUps: PmFollowUp[];
}

export interface PmUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface PmLookup {
  id: number;
  code: string;
  name: string;
}
export interface PmLookups {
  categories: PmLookup[];
  users: PmUser[];
  quotationTemplates: PmLookup[];
  projectTemplates: PmLookup[];
  clients: PmLookup[];
  trainings: PmLookup[];
}

export interface PmEnquiry {
  enquiryId: number;
  enquiryNo: string;
  clientId?: number;
  customerName: string;
  contactPerson: string;
  emailId: string;
  contactNumber: string;
  customerAddress: string;
  enquiryDate: string;
  categoryId: number;
  categoryName: string;
  categoryValueCode: string;
  categoryValueName: string;
  requirementScope: string;
  expectedTimeline: string;
  expectedStartDate?: string;
  expectedCompletionDate?: string;
  remarks: string;
  status: string;
  createdByUserId: number;
  createdByName: string;
  createdOnUtc: string;
  assignees: PmUser[];
}

export interface PmQuotation {
  quotationId: number;
  quotationNo: string;
  enquiryId: number;
  categoryId: number;
  quotationTemplateId?: number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  contactPerson: string;
  categoryCode: string;
  categoryValueName: string;
  serviceType: string;
  scope: string;
  consultingDays?: number;
  numberOfParticipants?: number;
  professionalFees: number;
  travelAccommodation: number;
  taxPercent: number;
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentTerms: string;
  validityDays: number;
  specialConditions: string;
  customerSpecificChanges: string;
  versionNo: number;
  status: string;
  enquiryStatus: string;
  quotationDate: string;
  preparedByUserId: number;
  preparedByName: string;
  submittedOnUtc?: string;
  approvedByUserId?: number;
  approvedByName: string;
  approvedOnUtc?: string;
  decisionRemark: string;
  sentOnUtc?: string;
}

export interface PmProject {
  projectId: number;
  projectNo: string;
  quotationId?: number;
  enquiryId?: number;
  projectTemplateId?: number;
  clientId?: number;
  customerName: string;
  projectTitle: string;
  categoryId?: number;
  categoryName: string;
  projectStartDate?: string;
  targetCompletionDate?: string;
  actualCompletionDate?: string;
  projectValue: number;
  customerContactPerson: string;
  customerEmail: string;
  projectLocation: string;
  poWoReference: string;
  projectLeaderUserId?: number;
  projectLeaderName: string;
  status: string;
  completionPercent: number;
  remarks: string;
  finalClosedOnUtc?: string;
  daysRemaining: number;
  nextActivity: string;
  pendingActivities: number;
  members: PmUser[];
}

export interface PmActivity {
  activityId: number;
  projectId: number;
  projectNo?: string;
  sequenceNo: number;
  activityName: string;
  description: string;
  responsibleUserId?: number;
  responsiblePerson: string;
  plannedStartDate?: string;
  plannedCompletionDate?: string;
  actualCompletionDate?: string;
  status: string;
  remarks: string;
  isApplicable: boolean;
  weightPercent?: number;
}

export interface PmFollowUp {
  followUpId: number;
  quotationId: number;
  quotationNo?: string;
  customerName?: string;
  followUpNo: number;
  dueOnUtc: string;
  status: string;
  notes: string;
  completedOnUtc?: string;
}

export interface PmQuotationApprovalHistory {
  approvalHistoryId: number;
  quotationId: number;
  action: string;
  fromStatus: string;
  toStatus: string;
  remark: string;
  actionByUserId: number;
  actionByName: string;
  actionOnUtc: string;
}

export interface PmEmailLog {
  emailLogId: number;
  entityType: string;
  entityId: number;
  emailType: string;
  recipientEmail: string;
  ccEmail: string;
  subject: string;
  attachmentName: string;
  quotationVersion?: number;
  sentOnUtc?: string;
  deliveryStatus: string;
  errorMessage: string;
  retryCount: number;
  lastRetryOnUtc?: string;
}

export interface PmSetting {
  settingKey: string;
  settingValue: string;
  description: string;
  updatedOnUtc: string;
}
export interface PmCustomerResponse {
  customerResponseId: number;
  entityType: string;
  entityId: number;
  entityReference: string;
  channel: string;
  responseStatus: string;
  receivedFrom: string;
  subject: string;
  responseText: string;
  receivedOnUtc: string;
  recordedByName: string;
}

export interface PmNotification {
  notificationId: number;
  recipientUserId: number;
  recipientName: string;
  recipientEmail: string;
  notificationType: string;
  title: string;
  message: string;
  entityType: string;
  entityId?: number;
  routeUrl: string;
  isRead: boolean;
  createdOnUtc: string;
}

export interface PmModuleLink {
  moduleLinkId: number;
  projectId: number;
  moduleCode: string;
  recordId: string;
  recordReference: string;
  remarks: string;
}

export interface PmAttachment {
  attachmentId: number;
  entityType: string;
  entityId: number;
  originalFileName: string;
  relativePath: string;
  contentType: string;
  fileSizeBytes: number;
  uploadedOnUtc: string;
}

export interface PmAcknowledgement {
  acknowledgementId: number;
  projectId: number;
  status: string;
  generatedOnUtc?: string;
  sentOnUtc?: string;
  receivedOnUtc?: string;
  customerName: string;
  customerDesignation: string;
  signedFileName: string;
  signedRelativePath: string;
  remarks: string;
}

export interface PmQuotationTemplate {
  quotationTemplateId: number;
  templateCode: string;
  templateName: string;
  categoryId?: number;
  trainingId?: number;
  scopeTemplate: string;
  paymentTerms: string;
  specialConditions: string;
  defaultTaxPercent: number;
  defaultValidityDays: number;
  isActive: boolean;
}

export interface PmProjectTemplateActivity {
  templateActivityId?: number;
  sequenceNo: number;
  activityName: string;
  description: string;
  defaultDurationDays?: number;
  isRequired: boolean;
  isActive: boolean;
}

export interface PmProjectTemplate {
  projectTemplateId: number;
  templateCode: string;
  templateName: string;
  categoryId?: number;
  description: string;
  isActive: boolean;
  activities: PmProjectTemplateActivity[];
}
