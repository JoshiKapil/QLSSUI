export type FieldType = 'text' | 'number' | 'date' | 'textarea' | 'file';

export interface ManagementField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  maxLength?: number;
}

export interface ManagementEntityConfig {
  key: string;
  title: string;
  endpoint: string;
  idKey: string;
  searchKeys: string[];
  fields: ManagementField[];
  allowBulkUpload?: boolean;
}

export interface CertificationRecord {
  userName: string;
  certificationNumber: string;
  issuedDate: string;
  topic: string;
  description: string;
}

export interface TrainingRecord {
  trainingName: string;
  trainingDesc: string;
  displayName: string;
  image: string;
  displayOrder: number;
}

export interface ClientRecord {
  clientName: string;
  clientNameDesc: string;
  image: string;
  displayOrder: number;
}

export interface LinkedInPostRecord {
  postId: string;
  content: string;
  createdDate: string;
  author: string;
}

export interface LinkedInCommentRecord {
  commentId: string;
  postId: string;
  commentText: string;
  createdDate: string;
  author: string;
}

