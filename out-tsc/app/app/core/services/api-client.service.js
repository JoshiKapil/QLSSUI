import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { unwrapApiResponse } from '../models/api-response.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ApiClientService {
    constructor(http) {
        this.http = http;
        this.baseUrl = environment.apiBaseUrl.replace(/\/+$/, '');
    }
    get(endpoint, params) {
        return this.http.get(this.url(endpoint), {
            params: this.toHttpParams(params)
        }).pipe(map((response) => this.unwrap(response)), catchError((error) => this.handleError(error)));
    }
    getBlob(endpoint) {
        return this.http.get(this.url(endpoint), {
            observe: 'response',
            responseType: 'blob'
        }).pipe(catchError((error) => this.handleError(error)));
    }
    post(endpoint, body, params) {
        return this.http.post(this.url(endpoint), body, {
            params: this.toHttpParams(params)
        }).pipe(map((response) => this.unwrap(response)), catchError((error) => this.handleError(error)));
    }
    postWithProgress(endpoint, body) {
        return this.http.post(this.url(endpoint), body, {
            observe: 'events',
            reportProgress: true
        }).pipe(map((event) => {
            if (event instanceof HttpResponse) {
                return event.clone({ body: this.unwrap(event.body) });
            }
            return event;
        }), catchError((error) => this.handleError(error)));
    }
    put(endpoint, body, params) {
        return this.http.put(this.url(endpoint), body, {
            params: this.toHttpParams(params)
        }).pipe(map((response) => this.unwrap(response)), catchError((error) => this.handleError(error)));
    }
    delete(endpoint, body, params) {
        return this.http.delete(this.url(endpoint), {
            body,
            params: this.toHttpParams(params)
        }).pipe(map((response) => this.unwrap(response)), catchError((error) => this.handleError(error)));
    }
    upload(endpoint, file, fields = {}) {
        const formData = new FormData();
        formData.append('file', file);
        Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
        return this.post(endpoint, formData);
    }
    url(endpoint) {
        return `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`;
    }
    unwrap(response) {
        try {
            return unwrapApiResponse(response);
        }
        catch (error) {
            return this.throwApiError(error);
        }
    }
    toHttpParams(params) {
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
    handleError(error) {
        if (error === null || error === void 0 ? void 0 : error.error) {
            console.error('[ApiClientService] API request failed.', error.error);
        }
        return throwError(() => error);
    }
    throwApiError(error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error || 'API request failed.'));
    }
}
ApiClientService.ɵfac = function ApiClientService_Factory(t) { return new (t || ApiClientService)(i0.ɵɵinject(i1.HttpClient)); };
ApiClientService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiClientService, factory: ApiClientService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiClientService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=api-client.service.js.map