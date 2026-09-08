import { ListPage } from '../../../shared/list-page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse, unwrapApiResponse } from '../../../core/models/api-response.model';

export interface MasterDepartment {
  departmentId: number;
  departmentCode: string;
  departmentName: string;
  isActive: boolean;
}
export interface MasterTraining {
  trainingId: number;
  trainingName: string;
}
export interface MasterVideo {
  videoId: number;
  videoCode: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  assignmentTitle?: string;
  assignmentInstructions?: string;
  maxAttempts?: number;
  showResultAfterSubmit: boolean;
  isActive: boolean;
  questionCount: number;
}
export interface MasterOption {
  optionId: number;
  questionId: number;
  optionText: string;
  isCorrect: boolean;
  displayOrder: number;
}
export interface MasterQuestion {
  questionId: number;
  videoId: number;
  videoTitle: string;
  questionText: string;
  questionType: 'SingleChoice' | 'TrueFalse';
  marks: number;
  displayOrder: number;
  explanation?: string;
  isActive: boolean;
  options: MasterOption[];
}
export interface MasterMappingItem {
  planItemId: number;
  planId: number;
  videoId: number;
  videoTitle: string;
  sequenceNo: number;
  minimumWatchPercent: number;
  passingPercent: number;
  mustPassAssignment: boolean;
  isActive: boolean;
}
export interface MasterMapping {
  planId: number;
  planCode: string;
  planName: string;
  trainingId?: number;
  trainingName?: string;
  departmentId?: number;
  departmentName?: string;
  completionDays: number;
  isActive: boolean;
  planStatus: 'Draft' | 'Published';
  versionNo: number;
  items: MasterMappingItem[];
}
export interface MasterBundle {
  departments: MasterDepartment[];
  trainings: MasterTraining[];
  videos: MasterVideo[];
  questions: MasterQuestion[];
  mappings: MasterMapping[];
}

@Injectable({ providedIn: 'root' })
export class OnboardingMasterSetupService {
  private readonly url = `${environment.apiBaseUrl}/onboarding/admin/master-setup`;
  constructor(private http: HttpClient) {}
  page<T>(kind: string, page: ListPage): Observable<T[]> { return page.read<T>(this.http, this.url + '/pages/' + kind); }
  load(): Observable<MasterBundle> {
    return this.http.get<ApiResponse<MasterBundle> | MasterBundle>(this.url).pipe(map((r) => unwrapApiResponse(r)));
  }
  saveVideo(id: number | null, payload: any): Observable<any> {
    return this.request(
      id ? this.http.put(`${this.url}/videos/${id}`, payload) : this.http.post(`${this.url}/videos`, payload),
    );
  }
  saveQuestion(id: number | null, payload: any): Observable<any> {
    return this.request(
      id ? this.http.put(`${this.url}/questions/${id}`, payload) : this.http.post(`${this.url}/questions`, payload),
    );
  }
  saveMapping(id: number | null, payload: any): Observable<any> {
    return this.request(
      id ? this.http.put(`${this.url}/mappings/${id}`, payload) : this.http.post(`${this.url}/mappings`, payload),
    );
  }
  publish(id: number): Observable<any> {
    return this.request(this.http.post(`${this.url}/mappings/${id}/publish`, {}));
  }
  draft(id: number): Observable<any> {
    return this.request(this.http.post(`${this.url}/mappings/${id}/draft`, {}));
  }
  private request(obs: Observable<any>): Observable<any> {
    return obs.pipe(map((r) => unwrapApiResponse(r)));
  }
}
