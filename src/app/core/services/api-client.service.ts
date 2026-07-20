import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, unwrapApiResponse } from '../models/api-response.model';

export type QueryParams = HttpParams | Record<string, string | number | boolean | null | undefined>;

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/+$/, '');

  constructor(private readonly http: HttpClient) {}

  get<T>(endpoint: string, params?: QueryParams): Observable<T> {
    return this.http.get<ApiResponse<T> | T>(this.url(endpoint), {
      headers: this.getAuthHeaders(),
      params: this.toHttpParams(params)
    }).pipe(
      map((response) => this.unwrap<T>(response)),
      catchError((error) => this.handleError(error))
    );
  }

  getBlob(endpoint: string): Observable<HttpResponse<Blob>> {
    return this.http.get(this.url(endpoint), {
      headers: this.getAuthHeaders(),
      observe: 'response',
      responseType: 'blob'
    }).pipe(catchError((error) => this.handleError(error)));
  }

  post<T>(endpoint: string, body: unknown, params?: QueryParams): Observable<T> {
    return this.http.post<ApiResponse<T> | T>(this.url(endpoint), body, {
      headers: this.getAuthHeaders(),
      params: this.toHttpParams(params)
    }).pipe(
      map((response) => this.unwrap<T>(response)),
      catchError((error) => this.handleError(error))
    );
  }

  postWithProgress<T>(endpoint: string, body: unknown): Observable<HttpEvent<T>> {
    return this.http.post<ApiResponse<T> | T>(this.url(endpoint), body, {
      headers: this.getAuthHeaders(),
      observe: 'events',
      reportProgress: true
    }).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: this.unwrap<T>(event.body as ApiResponse<T> | T) });
        }
        return event as HttpEvent<T>;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  put<T>(endpoint: string, body: unknown, params?: QueryParams): Observable<T> {
    return this.http.put<ApiResponse<T> | T>(this.url(endpoint), body, {
      headers: this.getAuthHeaders(),
      params: this.toHttpParams(params)
    }).pipe(
      map((response) => this.unwrap<T>(response)),
      catchError((error) => this.handleError(error))
    );
  }

  delete<T>(endpoint: string, body?: unknown, params?: QueryParams): Observable<T> {
    return this.http.delete<ApiResponse<T> | T>(this.url(endpoint), {
      body,
      headers: this.getAuthHeaders(),
      params: this.toHttpParams(params)
    }).pipe(
      map((response) => this.unwrap<T>(response)),
      catchError((error) => this.handleError(error))
    );
  }

  upload<T>(endpoint: string, file: File, fields: Record<string, string | Blob> = {}): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
    return this.post<T>(endpoint, formData);
  }

  private url(endpoint: string): string {
    return `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`;
  }

  private unwrap<T>(response: ApiResponse<T> | T): T {
    try {
      return unwrapApiResponse<T>(response);
    } catch (error) {
      return this.throwApiError(error);
    }
  }

  private getAuthHeaders(): HttpHeaders | undefined {
    const token =
      localStorage.getItem('qlss_auth_token') ||
      sessionStorage.getItem('qlss_auth_token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    if (!token || token.startsWith('local-')) {
      return undefined;
    }

    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private toHttpParams(params?: QueryParams): HttpParams | undefined {
    if (!params) {
      return undefined;
    }

    if (params instanceof HttpParams) {
      return params;
    }

    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error?.error) {
      console.error('[ApiClientService] API request failed.', error.error);
    }
    return throwError(() => error);
  }

  private throwApiError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error || 'API request failed.'));
  }
}
