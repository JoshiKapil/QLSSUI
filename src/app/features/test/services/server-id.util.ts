import { Observable, throwError } from 'rxjs';

export function isServerNumericId(value: unknown): boolean {
  return typeof value === 'string' && /^[0-9]+$/.test(value.trim());
}

export function normalizeServerId(value: unknown): string {
  const stringValue = String(value ?? '');
  return isServerNumericId(stringValue) ? stringValue.trim() : '';
}

export function invalidServerId<T>(field: string, value: unknown): Observable<T> {
  return throwError(() => new Error('A numeric server ' + field + ' is required before calling the API. Received: ' + String(value ?? '')));
}
