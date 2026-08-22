export interface GharAssessmentTab {
  code: string;
  shortTitle: string;
  title: string;
  icon: string;
}

export interface GharAssessmentSaveRequest {
  clientReference: string;
  tabCode: string;
  tabTitle: string;
  formDate?: string | null;
  displayName?: string | null;
  referenceText?: string | null;
  payloadJson: string;
}

export interface GharAssessmentSaveResult {
  entryId: number;
  entryNo: string;
  revisionNo: number;
  savedOnUtc: string;
}

export interface GharAssessmentAdminListItem {
  entryId: number;
  entryNo: string;
  tabCode: string;
  tabTitle: string;
  formDate?: string | null;
  displayName?: string | null;
  referenceText?: string | null;
  revisionNo: number;
  createdOnUtc: string;
  updatedOnUtc: string;
  createdByUserId?: number | null;
  createdByUserName?: string | null;
  createdByUserEmail?: string | null;
}

export interface GharAssessmentAdminDetail extends GharAssessmentAdminListItem {
  payloadJson: string;
}

export interface GharAssessmentAdminPage {
  items: GharAssessmentAdminListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}
