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
  clientName?: string;
  cityId?: number | null;
  cityName?: string;
  locationName?: string;
  trainerName: string;
  dateOfIssue: string | Date;
  logoUrl?: string;
}
export interface CertificatePrintRecord {
  certificationDataId: number;
  certificationNumber: string;
  userName: string;
  name: string;
  trainingId: number;
  trainingName: string;
  issuedDate: string;
  date: string;
  location: string;
  clientName?: string;
  cityId?: number | null;
  cityName?: string;
  locationName?: string;
  days: number;
  totalPoints: number;
  trainerName: string;
  completionType?: CertificateCompletionType;
}
export interface CertificateNameCorrectionRequest {
  currentName: string;
  newName: string;
}

export interface CertificateNameCorrectionResponse {
  updatedCount: number;
}
