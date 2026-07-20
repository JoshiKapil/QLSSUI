export interface CertificationForm {
  certificationFormId?: number | string;
  trainerName?: string;
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
  trainerId: number;
  isComplete: boolean;
  isPaid: boolean;
  paymentId: string;
  paymentDate?: string | null;
}
