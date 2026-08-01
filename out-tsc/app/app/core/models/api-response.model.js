export function unwrapApiResponse(response) {
    const wrapped = response;
    if (wrapped && typeof wrapped === 'object' && 'success' in wrapped && 'data' in wrapped) {
        if (wrapped.success === false) {
            throw new Error(wrapped.message || 'API request failed.');
        }
        return wrapped.data;
    }
    return response;
}
export function unwrapApiData(response) {
    return unwrapApiResponse(response);
}
export function toNumberId(value) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : 0;
}
export function toStringId(value) {
    return value === null || value === undefined ? '' : String(value);
}
//# sourceMappingURL=api-response.model.js.map