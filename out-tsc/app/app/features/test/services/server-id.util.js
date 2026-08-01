import { throwError } from 'rxjs';
export function isServerNumericId(value) {
    return typeof value === 'string' && /^[0-9]+$/.test(value.trim());
}
export function normalizeServerId(value) {
    const stringValue = String(value !== null && value !== void 0 ? value : '');
    return isServerNumericId(stringValue) ? stringValue.trim() : '';
}
export function invalidServerId(field, value) {
    return throwError(() => new Error('A numeric server ' + field + ' is required before calling the API. Received: ' + String(value !== null && value !== void 0 ? value : '')));
}
//# sourceMappingURL=server-id.util.js.map