export interface TrainingPresentationRecipient {
  recipientId?: number | string;
  name: string;
  email: string;
  selected?: boolean;
  status?: string;
  errorMessage?: string;
}

export interface TrainingPresentationEmailHistory {
  historyId: number | string;
  companyName: string;
  trainingName: string;
  trainingDate: string;
  fileName: string;
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  sentBy: string;
  sentDate: string;
  status: string;
  failedRecipients?: TrainingPresentationRecipient[];
}

export interface TrainingPresentationSendResult {
  historyId: number | string;
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  status: string;
}
