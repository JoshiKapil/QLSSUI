import { HttpErrorResponse } from '@angular/common/http';

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const apiError = error.error as any;
    const apiMessage = cleanMessage(apiError?.message || apiError?.Message || apiError?.title || apiError?.Title);
    if (apiMessage) return apiMessage;

    if (error.status === 0) return 'The server could not be reached. Check your connection and try again.';
    if (error.status === 400) return 'Some information is invalid. Review the form and try again.';
    if (error.status === 401) return 'Your session has expired. Sign in again to continue.';
    if (error.status === 403) return 'You do not have permission to perform this action.';
    if (error.status === 404) return 'The requested item could not be found. It may have been changed or removed.';
    if (error.status === 409) return 'This item conflicts with an existing record. Review the details and try again.';
    if (error.status === 413) return 'The selected file is too large. Choose a smaller file and try again.';
    if (error.status >= 500) return 'The server could not complete the request. Please try again shortly.';
    return 'The request could not be completed. Please try again.';
  }

  if (error instanceof Error) {
    const message = cleanMessage(error.message);
    if (message && !isTechnicalHttpMessage(message)) return message;
  }
  return 'The request could not be completed. Please try again.';
}

export function normalizeApiError(error: HttpErrorResponse): HttpErrorResponse {
  const message = getApiErrorMessage(error);
  return new HttpErrorResponse({
    error: { message, traceId: (error.error as any)?.traceId || (error.error as any)?.TraceId || '' },
    headers: error.headers,
    status: error.status,
    statusText: error.statusText,
    url: error.url || undefined
  });
}

function cleanMessage(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isTechnicalHttpMessage(message: string): boolean {
  return /Http failure response|https?:\/\/|status code|XMLHttpRequest/i.test(message);
}
