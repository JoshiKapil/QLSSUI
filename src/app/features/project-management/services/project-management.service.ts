import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {
  ApiResponse,
  unwrapApiResponse,
} from "../../../core/models/api-response.model";
import {
  PmAcknowledgement,
  PmActivity,
  PmAttachment,
  PmDashboard,
  PmEmailLog,
  PmEnquiry,
  PmFollowUp,
  PmLookups,
  PmModuleLink,
  PmNotification,
  PmProject,
  PmProjectTemplate,
  PmQuotation,
  PmQuotationApprovalHistory,
  PmQuotationTemplate,
  PmUser,
  PmSetting,
  PmCustomerResponse,
} from "../models/project-management.models";

@Injectable({ providedIn: "root" })
export class ProjectManagementService {
  private readonly url = `${environment.apiBaseUrl}/project-management`;

  constructor(private http: HttpClient) {}

  private unwrap<T>() {
    return map((value: ApiResponse<T> | T) => unwrapApiResponse<T>(value));
  }

  dashboard(): Observable<PmDashboard> {
    return this.http
      .get<ApiResponse<PmDashboard> | PmDashboard>(`${this.url}/dashboard`)
      .pipe(this.unwrap<PmDashboard>());
  }

  lookups(): Observable<PmLookups> {
    return this.http
      .get<ApiResponse<PmLookups> | PmLookups>(`${this.url}/lookups`)
      .pipe(this.unwrap<PmLookups>());
  }

  enquiries(): Observable<PmEnquiry[]> {
    return this.http
      .get<ApiResponse<PmEnquiry[]> | PmEnquiry[]>(`${this.url}/enquiries`)
      .pipe(this.unwrap<PmEnquiry[]>());
  }

  enquiry(id: number): Observable<PmEnquiry> {
    return this.http
      .get<ApiResponse<PmEnquiry> | PmEnquiry>(`${this.url}/enquiries/${id}`)
      .pipe(this.unwrap<PmEnquiry>());
  }

  createEnquiry(body: any): Observable<PmEnquiry> {
    return this.http
      .post<ApiResponse<PmEnquiry> | PmEnquiry>(`${this.url}/enquiries`, body)
      .pipe(this.unwrap<PmEnquiry>());
  }

  updateEnquiry(id: number, body: any): Observable<PmEnquiry> {
    return this.http
      .put<ApiResponse<PmEnquiry> | PmEnquiry>(
        `${this.url}/enquiries/${id}`,
        body,
      )
      .pipe(this.unwrap<PmEnquiry>());
  }

  assignEnquiry(
    id: number,
    userIds: number[],
    primaryUserId?: number,
  ): Observable<unknown> {
    return this.http.put(`${this.url}/enquiries/${id}/assignments`, {
      userIds,
      primaryUserId: primaryUserId || null,
    });
  }

  updateEnquiryStatus(
    id: number,
    status: string,
    remark = "",
  ): Observable<PmEnquiry> {
    return this.http
      .put<ApiResponse<PmEnquiry> | PmEnquiry>(
        `${this.url}/enquiries/${id}/status`,
        { status, remark },
      )
      .pipe(this.unwrap<PmEnquiry>());
  }

  quotations(): Observable<PmQuotation[]> {
    return this.http
      .get<ApiResponse<PmQuotation[]> | PmQuotation[]>(`${this.url}/quotations`)
      .pipe(this.unwrap<PmQuotation[]>());
  }

  quotation(id: number): Observable<PmQuotation> {
    return this.http
      .get<ApiResponse<PmQuotation> | PmQuotation>(
        `${this.url}/quotations/${id}`,
      )
      .pipe(this.unwrap<PmQuotation>());
  }

  createQuotation(
    enquiryId: number,
    quotationTemplateId?: number,
  ): Observable<PmQuotation> {
    return this.http
      .post<ApiResponse<PmQuotation> | PmQuotation>(
        `${this.url}/quotations/from-enquiry/${enquiryId}`,
        { quotationTemplateId: quotationTemplateId || null },
      )
      .pipe(this.unwrap<PmQuotation>());
  }

  updateQuotation(id: number, body: any): Observable<PmQuotation> {
    return this.http
      .put<ApiResponse<PmQuotation> | PmQuotation>(
        `${this.url}/quotations/${id}`,
        body,
      )
      .pipe(this.unwrap<PmQuotation>());
  }

  submitQuotation(id: number): Observable<PmQuotation> {
    return this.http
      .post<ApiResponse<PmQuotation> | PmQuotation>(
        `${this.url}/quotations/${id}/submit`,
        {},
      )
      .pipe(this.unwrap<PmQuotation>());
  }

  decideQuotation(
    id: number,
    action: string,
    remark = "",
    sendAfterApproval = true,
    followUpDays = 2,
  ): Observable<PmQuotation> {
    return this.http
      .post<ApiResponse<PmQuotation> | PmQuotation>(
        `${this.url}/quotations/${id}/decision`,
        { action, remark, sendAfterApproval, followUpDays },
      )
      .pipe(this.unwrap<PmQuotation>());
  }

  sendQuotation(
    id: number,
    followUpDays = 2,
    cc = "",
  ): Observable<PmQuotation> {
    return this.http
      .post<ApiResponse<PmQuotation> | PmQuotation>(
        `${this.url}/quotations/${id}/send`,
        { followUpDays, cc },
      )
      .pipe(this.unwrap<PmQuotation>());
  }

  quotationPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.url}/quotations/${id}/pdf`, {
      responseType: "blob",
    });
  }

  uploadGeneratedQuotationPdf(id: number, file: File): Observable<any> {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post<any>(`${this.url}/quotations/${id}/generated-pdf`, form);
  }

  approvalHistory(id: number): Observable<PmQuotationApprovalHistory[]> {
    return this.http
      .get<
        ApiResponse<PmQuotationApprovalHistory[]> | PmQuotationApprovalHistory[]
      >(`${this.url}/quotations/${id}/approval-history`)
      .pipe(this.unwrap<PmQuotationApprovalHistory[]>());
  }

  followUps(id: number): Observable<PmFollowUp[]> {
    return this.http
      .get<ApiResponse<PmFollowUp[]> | PmFollowUp[]>(
        `${this.url}/quotations/${id}/follow-ups`,
      )
      .pipe(this.unwrap<PmFollowUp[]>());
  }

  createFollowUp(
    id: number,
    daysFromNow: number,
    notes = "",
  ): Observable<PmFollowUp> {
    return this.http
      .post<ApiResponse<PmFollowUp> | PmFollowUp>(
        `${this.url}/quotations/${id}/follow-ups`,
        { daysFromNow, notes },
      )
      .pipe(this.unwrap<PmFollowUp>());
  }

  sendFollowUp(
    id: number,
    followUpId?: number,
    notes = "",
    cc = "",
  ): Observable<unknown> {
    return this.http.post(`${this.url}/quotations/${id}/follow-ups/send`, {
      followUpId: followUpId || null,
      notes,
      cc,
    });
  }

  completeFollowUp(followUpId: number, notes = ""): Observable<unknown> {
    return this.http.post(`${this.url}/follow-ups/${followUpId}/complete`, {
      notes,
    });
  }

  emailLogs(entityType: string, entityId: number): Observable<PmEmailLog[]> {
    return this.http
      .get<ApiResponse<PmEmailLog[]> | PmEmailLog[]>(
        `${this.url}/email-logs/${entityType}/${entityId}`,
      )
      .pipe(this.unwrap<PmEmailLog[]>());
  }

  emailDeliveries(): Observable<PmEmailLog[]> {
    return this.http
      .get<ApiResponse<PmEmailLog[]> | PmEmailLog[]>(
        `${this.url}/operations/email-deliveries`,
      )
      .pipe(this.unwrap<PmEmailLog[]>());
  }
  retryEmail(id: number): Observable<unknown> {
    return this.http.post(
      `${this.url}/operations/email-deliveries/${id}/retry`,
      {},
    );
  }
  settings(): Observable<PmSetting[]> {
    return this.http
      .get<ApiResponse<PmSetting[]> | PmSetting[]>(
        `${this.url}/operations/settings`,
      )
      .pipe(this.unwrap<PmSetting[]>());
  }
  saveSettings(body: any): Observable<unknown> {
    return this.http.put(`${this.url}/operations/settings`, body);
  }
  customerResponses(): Observable<PmCustomerResponse[]> {
    return this.http
      .get<ApiResponse<PmCustomerResponse[]> | PmCustomerResponse[]>(
        `${this.url}/operations/customer-responses`,
      )
      .pipe(this.unwrap<PmCustomerResponse[]>());
  }
  addCustomerResponse(body: any): Observable<PmCustomerResponse> {
    return this.http
      .post<ApiResponse<PmCustomerResponse> | PmCustomerResponse>(
        `${this.url}/operations/customer-responses`,
        body,
      )
      .pipe(this.unwrap<PmCustomerResponse>());
  }

  projects(): Observable<PmProject[]> {
    return this.http
      .get<ApiResponse<PmProject[]> | PmProject[]>(`${this.url}/projects`)
      .pipe(this.unwrap<PmProject[]>());
  }

  project(id: number): Observable<PmProject> {
    return this.http
      .get<ApiResponse<PmProject> | PmProject>(`${this.url}/projects/${id}`)
      .pipe(this.unwrap<PmProject>());
  }

  createProject(quotationId: number, body: any): Observable<PmProject> {
    return this.http
      .post<ApiResponse<PmProject> | PmProject>(
        `${this.url}/projects/from-quotation/${quotationId}`,
        body,
      )
      .pipe(this.unwrap<PmProject>());
  }

  updateProject(id: number, body: any): Observable<PmProject> {
    return this.http
      .put<ApiResponse<PmProject> | PmProject>(
        `${this.url}/projects/${id}`,
        body,
      )
      .pipe(this.unwrap<PmProject>());
  }

  assignProject(
    id: number,
    userIds: number[],
    primaryUserId?: number,
  ): Observable<unknown> {
    return this.http.put(`${this.url}/projects/${id}/assignments`, {
      userIds,
      primaryUserId: primaryUserId || null,
    });
  }

  activities(projectId: number): Observable<PmActivity[]> {
    return this.http
      .get<ApiResponse<PmActivity[]> | PmActivity[]>(
        `${this.url}/projects/${projectId}/activities`,
      )
      .pipe(this.unwrap<PmActivity[]>());
  }

  saveActivity(projectId: number, body: any): Observable<PmActivity> {
    return this.http
      .post<ApiResponse<PmActivity> | PmActivity>(
        `${this.url}/projects/${projectId}/activities`,
        body,
      )
      .pipe(this.unwrap<PmActivity>());
  }

  updateActivity(activityId: number, body: any): Observable<PmActivity> {
    return this.http
      .put<ApiResponse<PmActivity> | PmActivity>(
        `${this.url}/activities/${activityId}`,
        body,
      )
      .pipe(this.unwrap<PmActivity>());
  }

  deleteActivity(activityId: number): Observable<unknown> {
    return this.http.delete(`${this.url}/activities/${activityId}`);
  }

  requestClosure(projectId: number, remark = ""): Observable<unknown> {
    return this.http.post(`${this.url}/projects/${projectId}/closure/request`, {
      remark,
    });
  }

  decideClosure(
    projectId: number,
    action: string,
    remark = "",
    sendCompletionEmail = true,
  ): Observable<unknown> {
    return this.http.post(
      `${this.url}/projects/${projectId}/closure/decision`,
      { action, remark, sendCompletionEmail },
    );
  }

  acknowledgement(projectId: number): Observable<PmAcknowledgement | null> {
    return this.http
      .get<ApiResponse<PmAcknowledgement | null> | PmAcknowledgement | null>(
        `${this.url}/projects/${projectId}/acknowledgement`,
      )
      .pipe(this.unwrap<PmAcknowledgement | null>());
  }

  acknowledge(projectId: number, body: any): Observable<unknown> {
    return this.http.put(
      `${this.url}/projects/${projectId}/acknowledgement`,
      body,
    );
  }

  acknowledgementPdf(projectId: number): Observable<Blob> {
    return this.http.get(
      `${this.url}/projects/${projectId}/acknowledgement/pdf`,
      { responseType: "blob" },
    );
  }

  sendAcknowledgement(
    projectId: number,
    cc = "",
    message = "",
  ): Observable<unknown> {
    return this.http.post(
      `${this.url}/projects/${projectId}/acknowledgement/send`,
      { cc, message },
    );
  }

  finalClose(projectId: number): Observable<unknown> {
    return this.http.post(`${this.url}/projects/${projectId}/final-close`, {});
  }

  notifications(): Observable<PmNotification[]> {
    return this.http
      .get<ApiResponse<PmNotification[]> | PmNotification[]>(
        `${this.url}/notifications`,
      )
      .pipe(this.unwrap<PmNotification[]>());
  }

  readNotification(id: number): Observable<unknown> {
    return this.http.post(`${this.url}/notifications/${id}/read`, {});
  }

  users(): Observable<PmUser[]> {
    return this.http
      .get<ApiResponse<PmUser[]> | PmUser[]>(`${this.url}/users`)
      .pipe(this.unwrap<PmUser[]>());
  }

  changeRole(id: number, role: string): Observable<unknown> {
    return this.http.put(`${this.url}/users/${id}/role`, { role });
  }

  quotationTemplates(): Observable<PmQuotationTemplate[]> {
    return this.http
      .get<ApiResponse<PmQuotationTemplate[]> | PmQuotationTemplate[]>(
        `${this.url}/quotation-templates`,
      )
      .pipe(this.unwrap<PmQuotationTemplate[]>());
  }

  saveQuotationTemplate(
    id: number | null,
    body: any,
  ): Observable<PmQuotationTemplate> {
    const request = id
      ? this.http.put<ApiResponse<PmQuotationTemplate> | PmQuotationTemplate>(
          `${this.url}/quotation-templates/${id}`,
          body,
        )
      : this.http.post<ApiResponse<PmQuotationTemplate> | PmQuotationTemplate>(
          `${this.url}/quotation-templates`,
          body,
        );
    return request.pipe(this.unwrap<PmQuotationTemplate>());
  }

  projectTemplates(): Observable<PmProjectTemplate[]> {
    return this.http
      .get<ApiResponse<PmProjectTemplate[]> | PmProjectTemplate[]>(
        `${this.url}/project-templates`,
      )
      .pipe(this.unwrap<PmProjectTemplate[]>());
  }

  saveProjectTemplate(
    id: number | null,
    body: any,
  ): Observable<PmProjectTemplate> {
    const request = id
      ? this.http.put<ApiResponse<PmProjectTemplate> | PmProjectTemplate>(
          `${this.url}/project-templates/${id}`,
          body,
        )
      : this.http.post<ApiResponse<PmProjectTemplate> | PmProjectTemplate>(
          `${this.url}/project-templates`,
          body,
        );
    return request.pipe(this.unwrap<PmProjectTemplate>());
  }

  attachments(
    entityType: string,
    entityId: number,
  ): Observable<PmAttachment[]> {
    return this.http
      .get<ApiResponse<PmAttachment[]> | PmAttachment[]>(
        `${this.url}/attachments/${entityType}/${entityId}`,
      )
      .pipe(this.unwrap<PmAttachment[]>());
  }

  uploadAttachment(
    entityType: string,
    entityId: number,
    file: File,
  ): Observable<PmAttachment> {
    const body = new FormData();
    body.append("file", file, file.name);
    return this.http
      .post<ApiResponse<PmAttachment> | PmAttachment>(
        `${this.url}/attachments/${entityType}/${entityId}`,
        body,
      )
      .pipe(this.unwrap<PmAttachment>());
  }

  attachmentFile(id: number): Observable<Blob> {
    return this.http.get(`${this.url}/attachments/file/${id}`, {
      responseType: "blob",
    });
  }

  moduleLinks(projectId: number): Observable<PmModuleLink[]> {
    return this.http
      .get<ApiResponse<PmModuleLink[]> | PmModuleLink[]>(
        `${this.url}/projects/${projectId}/module-links`,
      )
      .pipe(this.unwrap<PmModuleLink[]>());
  }

  addModuleLink(projectId: number, body: any): Observable<PmModuleLink> {
    return this.http
      .post<ApiResponse<PmModuleLink> | PmModuleLink>(
        `${this.url}/projects/${projectId}/module-links`,
        body,
      )
      .pipe(this.unwrap<PmModuleLink>());
  }
}
