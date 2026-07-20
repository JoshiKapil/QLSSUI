export interface Certification {
  userName: string;
  certificationNumber: string;
  issuedDate: string;
  topic: string;
  description: string;
}

export interface CertificationBulk {
  CertificationNumber: string;
  Name: string;
  Topic: string;
  Date: string;
  BatchNo: string;
  ContactNo: string;
  Email: string;
  Location: string;
}

export interface CertificationData {
  certificationDataId: number;
  certificationNumber: string;
  name: string;
  trainingId: number;
  date: string;
  batchNo: string;
  contactNo: string;
  email: string;
  location: string;
}
