import { HttpClient } from '@angular/common/http';
import { defer, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { ApiResponse, unwrapApiResponse } from '../core/models/api-response.model';

export class ListPage {
  search = '';
  readonly pageSize = 50;
  pageNumber = 1;
  hasMore = false;
  loading = false;
  error = '';
  filters: Record<string, string> = {};
  private cursor = '0';
  private nextCursor = '0';
  private history: string[] = [];
  private cancel = new Subject<void>();
  private version = 0;

  constructor(public readonly label: string) {}

  reset(): void { this.cursor = '0'; this.history = []; this.pageNumber = 1; }
  next(): void { if (!this.hasMore || this.loading) return; this.history.push(this.cursor); this.cursor = this.nextCursor; this.pageNumber++; }
  previous(): void { if (this.loading || !this.history.length) return; this.cursor = this.history.pop()!; this.pageNumber--; }
  destroy(): void { this.cancel.next(); }

  read<T>(http: HttpClient, url: string, extra: Record<string, string> = {}): Observable<T[]> {
    return defer(() => {
      this.cancel.next();
      const version = ++this.version;
      this.loading = true;
      this.error = '';
      const params: Record<string, string> = { ...extra, paged: 'true', pageSize: String(this.pageSize), after: this.cursor, search: this.search };
      Object.entries(this.filters).forEach(([key, value]) => { if (value) params['filter_' + key] = value; });
      return http.get<ApiResponse<T[]> | T[]>(url, { params, observe: 'response' }).pipe(
        takeUntil(this.cancel),
        map(response => {
          if (!response.headers.has('X-Has-More') || !response.headers.has('X-Next-Cursor')) {
            throw new Error('Paging is unavailable. Update the API and refresh this page.');
          }
          this.hasMore = response.headers.get('X-Has-More') === 'true';
          this.nextCursor = response.headers.get('X-Next-Cursor') || '0';
          return unwrapApiResponse<T[]>(response.body!) || [];
        }),
        catchError(error => {
          this.hasMore = false;
          this.error = error?.error?.message || error?.message || 'Unable to load this page.';
          return throwError(() => error);
        }),
        finalize(() => { if (version === this.version) this.loading = false; }),
      );
    });
  }
}
