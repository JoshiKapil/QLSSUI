export type CertificateCompletionType = 'assessment' | 'attendance';

export interface CertificateData {
  userName: string;
  coveredTopics: string[];
  completionType: CertificateCompletionType;
  marks?: number | null;
  passingMarks?: number | null;
  trainingName: string;
  certificateNumber: string;
  trainingHours: number;
  location: string;
  trainerName: string;
  dateOfIssue: string | Date;
}

