export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  traceId?: string;
  data: T;
  errors?: any;
  pagination?: any;
}

export function unwrapApiResponse<T>(response: ApiResponse<T> | T): T {
  const wrapped = response as ApiResponse<T>;

  if (wrapped && typeof wrapped === 'object' && 'success' in wrapped && 'data' in wrapped) {
    if (wrapped.success === false) {
      throw new Error(wrapped.message || 'API request failed.');
    }

    return wrapped.data;
  }

  return response as T;
}

export function unwrapApiData<T>(response: ApiResponse<T> | T): T {
  return unwrapApiResponse<T>(response);
}

export function toNumberId(value: unknown): number {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function toStringId(value: unknown): string {
  return value === null || value === undefined ? '' : String(value);
}