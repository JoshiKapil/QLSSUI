import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, unwrapApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AdminManagementService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<ApiResponse<T[]> | T[]>(this.url(endpoint)).pipe(
      map((response) => unwrapApiResponse<T[]>(response)),
      catchError(() => of(this.getLocalRecords<T>(endpoint)))
    );
  }

  getById<T extends object>(endpoint: string, idKey: string, id: number | string): Observable<T> {
    return this.http.get<ApiResponse<T> | T>(this.url(endpoint, id)).pipe(
      map((response) => unwrapApiResponse<T>(response)),
      catchError(() => of(this.findLocalRecord<T>(endpoint, idKey, id) as T))
    );
  }

  save<T extends object>(endpoint: string, idKey: string, record: T): Observable<T> {
    const id = this.getRecordId(record, idKey);
    const request$ = id
      ? this.http.put<ApiResponse<T> | T>(this.url(endpoint, id), record)
      : this.http.post<ApiResponse<T> | T>(this.url(endpoint), record);

    return request$.pipe(
      map((response) => unwrapApiResponse<T>(response)),
      tap((saved) => this.upsertLocalRecord(endpoint, idKey, saved)),
      catchError(() => {
        const saved = { ...record, [idKey]: id || Date.now() } as T;
        this.upsertLocalRecord(endpoint, idKey, saved);
        return of(saved);
      })
    );
  }

  delete(endpoint: string, idKey: string, id: number | string): Observable<void> {
    return this.http.delete<ApiResponse<void> | void>(this.url(endpoint, id)).pipe(
      map((response) => unwrapApiResponse<void>(response)),
      tap(() => this.deleteLocalRecord(endpoint, idKey, id)),
      catchError(() => {
        this.deleteLocalRecord(endpoint, idKey, id);
        return of(void 0);
      })
    );
  }

  search<T>(endpoint: string, searchKeys: string[], query: string): Observable<T[]> {
    return this.getAll<T>(endpoint).pipe(
      map((records) => {
        const search = query.trim().toLowerCase();
        if (!search) {
          return records;
        }

        return records.filter((record) => this.matchesSearch(record, searchKeys, search));
      })
    );
  }

  uploadBulkData<T>(endpoint: string, records: readonly T[]): Observable<number> {
    return this.http
      .post<ApiResponse<number> | number>(this.url(endpoint) + '/upload', records)
      .pipe(map((response) => unwrapApiResponse<number>(response)));
  }

  uploadBulk(endpoint: string, file: any): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ApiResponse<void> | void>(this.url(endpoint) + '/upload', formData).pipe(
      map((response) => unwrapApiResponse<void>(response)),
      catchError(() => of(void 0))
    );
  }

  private findLocalRecord<T>(endpoint: string, idKey: string, id: number | string): T | undefined {
    return this.getLocalRecords<T>(endpoint).find((record) => String(this.getRecordId(record, idKey)) === String(id));
  }

  private getLocalRecords<T>(endpoint: string): T[] {
    const raw = localStorage.getItem(this.storageKey(endpoint));
    return raw ? JSON.parse(raw) : [];
  }

  private upsertLocalRecord<T extends object>(endpoint: string, idKey: string, record: T): void {
    const records = this.getLocalRecords<T>(endpoint);
    const id = this.getRecordId(record, idKey);
    const index = records.findIndex((item) => String(this.getRecordId(item, idKey)) === String(id));

    if (index > -1) {
      records[index] = record;
    } else {
      records.push(record);
    }

    localStorage.setItem(this.storageKey(endpoint), JSON.stringify(records));
  }

  private deleteLocalRecord(endpoint: string, idKey: string, id: number | string): void {
    const records = this.getLocalRecords<object>(endpoint);
    const filtered = records.filter((record) => String(this.getRecordId(record, idKey)) !== String(id));
    localStorage.setItem(this.storageKey(endpoint), JSON.stringify(filtered));
  }

  private matchesSearch(record: unknown, searchKeys: string[], search: string): boolean {
    return searchKeys.some((key) => String(this.getRecordValue(record, key) || '').toLowerCase().includes(search));
  }

  private getRecordId(record: unknown, key: string): string | number | undefined {
    const value = this.getRecordValue(record, key);
    return typeof value === 'string' || typeof value === 'number' ? value : undefined;
  }

  private getRecordValue(record: unknown, key: string): unknown {
    return record && typeof record === 'object' ? (record as Record<string, unknown>)[key] : undefined;
  }

  private url(endpoint: string, id?: number | string): string {
    return id ? this.apiBaseUrl + '/' + endpoint + '/' + id : this.apiBaseUrl + '/' + endpoint;
  }

  private storageKey(endpoint: string): string {
    return 'qlss_admin_' + endpoint;
  }
}
