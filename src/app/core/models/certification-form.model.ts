export interface CertificationForm {
  certificationDataId?: number;
  certificationFormId?: number | string;
  trainerName?: string;
  trainingName?: string;
  certificationDate: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  certificationNumber?: string;
  name: string;
  trainingId: number;
  date: string;
  batchNo: string;
  contactNo: string;
  email: string;
  location: string;
  days: number;
  totalPoints?: number;
  trainerId: number;
  isComplete: boolean;
  isPaid: boolean;
  paymentId: string;
  paymentDate?: string | null;
}

export interface CertificateApprovalResult {
  approvedCount: number;
  records: CertificationForm[];
}

export interface CertificationImportResult {
  importedCount: number;
  records: CertificationForm[];
}
