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

export interface PmEnquiryCategoryMetadata {
  categoryId: number;
  categoryCode: string;
  categoryName: string;
  valueSource: 'NONE' | 'LIST' | 'TRAINING' | 'FREE_TEXT';
  valueLabel: string;
  defaultRequirementScope: string;
  allowScopeEdit: boolean;
  displayOrder: number;
  isActive: boolean;
}

export interface PmEnquiryCategoryValue {
  categoryValueId: number;
  categoryId: number;
  sourceType: 'CUSTOM' | 'TRAINING';
  sourceRefId?: number;
  code: string;
  name: string;
  defaultRequirementScope: string;
  quotationTemplateId?: number;
  projectTemplateId?: number;
  displayOrder: number;
  isActive: boolean;
}

export interface PmEnquiryMetadata {
  categories: PmEnquiryCategoryMetadata[];
  values: PmEnquiryCategoryValue[];
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

export interface PmProjectBilling {
  projectId: number;
  projectNo: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  projectTitle: string;
  poWoReference: string;
  projectValue: number;
  taxableProjectValue: number;
  completionPercent: number;
  projectStatus: string;
  paymentPlan: 'FULL' | 'SPLIT_50_50';
  clientGstin: string;
  hsnCode: string;
  taxMode: 'INTRA_STATE' | 'INTER_STATE';
  taxPercent: number;
  serviceDate?: string;
  isLocked: boolean;
}

export interface PmProjectInvoice {
  invoiceId: number;
  projectId: number;
  projectNo: string;
  projectTitle: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  clientGstin: string;
  poWoReference: string;
  documentType: 'PROFORMA' | 'TAX';
  invoiceNo: string;
  financialYear: string;
  invoiceDate: string;
  serviceDate: string;
  hsnCode: string;
  installmentNo: number;
  paymentPlan: 'FULL' | 'SPLIT_50_50';
  paymentLabel: string;
  baseAmount: number;
  taxPercent: number;
  sgstPercent: number;
  cgstPercent: number;
  igstPercent: number;
  sgstAmount: number;
  cgstAmount: number;
  igstAmount: number;
  totalAmount: number;
  status: 'Draft' | 'Sent';
  cashReceivedOnUtc?: string;
  sentOnUtc?: string;
  createdOnUtc: string;
}
