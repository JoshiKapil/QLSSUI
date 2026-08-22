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
  SaveVideoRequest
} from '../models/employee-onboarding.models';

@Injectable({ providedIn: 'root' })
export class EmployeeOnboardingService {
  private readonly url = `${environment.apiBaseUrl}/onboarding`;

  constructor(private http: HttpClient) {}

  loginState(): Observable<OnboardingLoginState> { return this.get<OnboardingLoginState>('login-state'); }
  my(): Observable<MyOnboarding> { return this.get<MyOnboarding>('my'); }
  saveVideoProgress(itemId: number, positionSeconds: number, durationSeconds: number, isEnded: boolean): Observable<any> {
    return this.put(`my/items/${itemId}/video-progress`, { positionSeconds, durationSeconds, isEnded });
  }
  submitAssignment(itemId: number, answers: Array<{ questionId: number; selectedOptionId: number }>): Observable<AssignmentResult> {
    return this.post<AssignmentResult>(`my/items/${itemId}/assignment`, { answers });
  }
  notifications(): Observable<OnboardingNotification[]> { return this.get<OnboardingNotification[]>('notifications'); }
  markNotificationRead(id: number): Observable<any> { return this.post(`notifications/${id}/read`, {}); }

  dashboard(): Observable<OnboardingDashboard> { return this.get<OnboardingDashboard>('admin/dashboard'); }
  departments(): Observable<OnboardingDepartment[]> { return this.get<OnboardingDepartment[]>('admin/departments'); }
  saveDepartment(id: number | null, payload: any): Observable<any> { return id ? this.put(`admin/departments/${id}`, payload) : this.post('admin/departments', payload); }
  videos(): Observable<OnboardingVideo[]> { return this.get<OnboardingVideo[]>('admin/videos'); }
  saveVideo(id: number | null, payload: SaveVideoRequest): Observable<any> { return id ? this.put(`admin/videos/${id}`, payload) : this.post('admin/videos', payload); }
  plans(): Observable<OnboardingPlan[]> { return this.get<OnboardingPlan[]>('admin/plans'); }
  assignmentPlans(): Observable<OnboardingPlan[]> { return this.get<OnboardingPlan[]>('admin/assignment-plans'); }
  savePlan(id: number | null, payload: SavePlanRequest): Observable<any> { return id ? this.put(`admin/plans/${id}`, payload) : this.post('admin/plans', payload); }
  setupOverview(): Observable<OnboardingSetupOverview> { return this.get<OnboardingSetupOverview>('admin/setup/overview'); }
  publishPlan(id: number): Observable<any> { return this.post(`admin/plans/${id}/publish`, {}); }
  movePlanToDraft(id: number): Observable<any> { return this.post(`admin/plans/${id}/draft`, {}); }
  eligibleEmployees(): Observable<OnboardingUserLookup[]> { return this.get<OnboardingUserLookup[]>('admin/eligible-employees'); }
  enroll(payload: { userId: number; departmentId?: number | null; completionDays: number }): Observable<any> { return this.post('admin/enrollments', payload); }
  enrollments(): Observable<OnboardingEnrollmentSummary[]> { return this.get<OnboardingEnrollmentSummary[]>('admin/enrollments'); }
  enrollmentDetail(id: number): Observable<OnboardingEnrollmentDetail> { return this.get<OnboardingEnrollmentDetail>(`admin/enrollments/${id}`); }
  accessRequests(status?: string): Observable<OnboardingAccessRequest[]> {
    return this.http.get<ApiResponse<OnboardingAccessRequest[]> | OnboardingAccessRequest[]>(`${this.url}/admin/access-requests`, { params: status ? { status } : {} }).pipe(map(r => unwrapApiResponse(r)));
  }
  decideAccessRequest(id: number, decision: 'Approved' | 'Rejected', extensionDays: number, remark: string): Observable<any> {
    return this.post(`admin/access-requests/${id}/decision`, { decision, extensionDays, remark });
  }
  submitPublicAccessRequest(email: string, password: string, reason: string): Observable<any> {
    return this.post('access-request', { email, password, reason });
  }

  private get<T>(path: string): Observable<T> {
    return this.http.get<ApiResponse<T> | T>(`${this.url}/${path}`).pipe(map(r => unwrapApiResponse<T>(r)));
  }
  private post<T = any>(path: string, payload: any): Observable<T> {
    return this.http.post<ApiResponse<T> | T>(`${this.url}/${path}`, payload).pipe(map(r => unwrapApiResponse<T>(r)));
  }
  private put<T = any>(path: string, payload: any): Observable<T> {
    return this.http.put<ApiResponse<T> | T>(`${this.url}/${path}`, payload).pipe(map(r => unwrapApiResponse<T>(r)));
  }
}
