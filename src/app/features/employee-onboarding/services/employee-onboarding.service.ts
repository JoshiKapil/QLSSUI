import { ListPage } from '../../../shared/list-page';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse, unwrapApiResponse } from '../../../core/models/api-response.model';
import {
  AssignmentResult,
  MyOnboarding,
  OnboardingAccessRequest,
  OnboardingDashboard,
  OnboardingDepartment,
  OnboardingEnrollmentSummary,
  OnboardingEnrollmentDetail,
  OnboardingLoginState,
  OnboardingNotification,
  OnboardingPlan,
  OnboardingSetupOverview,
  OnboardingUserLookup,
  OnboardingVideo,
  SavePlanRequest,
  SaveVideoRequest,
} from '../models/employee-onboarding.models';

@Injectable({ providedIn: 'root' })
export class EmployeeOnboardingService {
  private readonly url = `${environment.apiBaseUrl}/onboarding`;

  constructor(private http: HttpClient) {}

  video(id: number): Observable<OnboardingVideo> { return this.get<OnboardingVideo>('admin/videos/' + id); }
  plan(id: number): Observable<OnboardingPlan> { return this.get<OnboardingPlan>('admin/plans/' + id); }
  trainingOptions(page: ListPage): Observable<Array<{trainingId:number; trainingName:string}>> { return page.read(this.http, this.url + '/admin/training-options'); }
  loginState(): Observable<OnboardingLoginState> {
    return this.get<OnboardingLoginState>('login-state');
  }
  my(): Observable<MyOnboarding> {
    return this.get<MyOnboarding>('my');
  }
  saveVideoProgress(
    itemId: number,
    positionSeconds: number,
    durationSeconds: number,
    isEnded: boolean,
  ): Observable<any> {
    return this.put(`my/items/${itemId}/video-progress`, { positionSeconds, durationSeconds, isEnded });
  }
  submitAssignment(
    itemId: number,
    answers: Array<{ questionId: number; selectedOptionId: number }>,
  ): Observable<AssignmentResult> {
    return this.post<AssignmentResult>(`my/items/${itemId}/assignment`, { answers });
  }
  notifications(page?: ListPage): Observable<OnboardingNotification[]> {
    if (page) return page.read<OnboardingNotification>(this.http, `${this.url}/notifications`);

    return this.get<OnboardingNotification[]>('notifications');
  }
  markNotificationRead(id: number): Observable<any> {
    return this.post(`notifications/${id}/read`, {});
  }

  dashboard(): Observable<OnboardingDashboard> {
    return this.get<OnboardingDashboard>('admin/dashboard');
  }
  departments(page?: ListPage): Observable<OnboardingDepartment[]> {
    if (page) return page.read<OnboardingDepartment>(this.http, `${this.url}/admin/departments`);

    return this.get<OnboardingDepartment[]>('admin/departments');
  }
  saveDepartment(id: number | null, payload: any): Observable<any> {
    return id ? this.put(`admin/departments/${id}`, payload) : this.post('admin/departments', payload);
  }
  videos(page?: ListPage): Observable<OnboardingVideo[]> {
    if (page) return page.read<OnboardingVideo>(this.http, `${this.url}/admin/videos`);

    return this.get<OnboardingVideo[]>('admin/videos');
  }
  saveVideo(id: number | null, payload: SaveVideoRequest): Observable<any> {
    return id ? this.put(`admin/videos/${id}`, payload) : this.post('admin/videos', payload);
  }
  plans(page?: ListPage): Observable<OnboardingPlan[]> {
    if (page) return page.read<OnboardingPlan>(this.http, `${this.url}/admin/plans`);

    return this.get<OnboardingPlan[]>('admin/plans');
  }
  assignmentPlans(): Observable<OnboardingPlan[]> {
    return this.get<OnboardingPlan[]>('admin/assignment-plans');
  }
  savePlan(id: number | null, payload: SavePlanRequest): Observable<any> {
    return id ? this.put(`admin/plans/${id}`, payload) : this.post('admin/plans', payload);
  }
  setupOverview(): Observable<OnboardingSetupOverview> {
    return this.get<OnboardingSetupOverview>('admin/setup/overview');
  }
  publishPlan(id: number): Observable<any> {
    return this.post(`admin/plans/${id}/publish`, {});
  }
  movePlanToDraft(id: number): Observable<any> {
    return this.post(`admin/plans/${id}/draft`, {});
  }
  eligibleEmployees(page?: ListPage): Observable<OnboardingUserLookup[]> {
    if (page) return page.read<OnboardingUserLookup>(this.http, `${this.url}/admin/eligible-employees`);

    return this.get<OnboardingUserLookup[]>('admin/eligible-employees');
  }
  enroll(payload: {
    userId: number;
    departmentId?: number | null;
    trainingId?: number | null;
    completionDays: number;
  }): Observable<any> {
    return this.post('admin/enrollments', payload);
  }
  mappingPreview(departmentId?: number | null, trainingId?: number | null): Observable<any[]> {
    const params: any = {};
    if (departmentId) params.departmentId = departmentId;
    if (trainingId) params.trainingId = trainingId;
    return this.http
      .get<ApiResponse<any[]> | any[]>(`${this.url}/admin/mapping-preview`, { params })
      .pipe(map((r) => unwrapApiResponse(r)));
  }
  enrollments(page?: ListPage): Observable<OnboardingEnrollmentSummary[]> {
    if (page) return page.read<OnboardingEnrollmentSummary>(this.http, `${this.url}/admin/enrollments`);

    return this.get<OnboardingEnrollmentSummary[]>('admin/enrollments');
  }
  enrollmentDetail(id: number): Observable<OnboardingEnrollmentDetail> {
    return this.get<OnboardingEnrollmentDetail>(`admin/enrollments/${id}`);
  }
  accessRequests(status?: string, page?: ListPage): Observable<OnboardingAccessRequest[]> {
    if (page) return page.read<OnboardingAccessRequest>(this.http, `${this.url}/admin/access-requests`, status ? { status } : {});

    return this.http
      .get<ApiResponse<OnboardingAccessRequest[]> | OnboardingAccessRequest[]>(`${this.url}/admin/access-requests`, {
        params: status ? { status } : {},
      })
      .pipe(map((r) => unwrapApiResponse(r)));
  }
  decideAccessRequest(
    id: number,
    decision: 'Approved' | 'Rejected',
    extensionDays: number,
    remark: string,
  ): Observable<any> {
    return this.post(`admin/access-requests/${id}/decision`, { decision, extensionDays, remark });
  }
  submitPublicAccessRequest(email: string, password: string, reason: string): Observable<any> {
    return this.post('access-request', { email, password, reason });
  }

  private get<T>(path: string): Observable<T> {
    return this.http.get<ApiResponse<T> | T>(`${this.url}/${path}`).pipe(map((r) => unwrapApiResponse<T>(r)));
  }
  private post<T = any>(path: string, payload: any): Observable<T> {
    return this.http.post<ApiResponse<T> | T>(`${this.url}/${path}`, payload).pipe(map((r) => unwrapApiResponse<T>(r)));
  }
  private put<T = any>(path: string, payload: any): Observable<T> {
    return this.http.put<ApiResponse<T> | T>(`${this.url}/${path}`, payload).pipe(map((r) => unwrapApiResponse<T>(r)));
  }
}
