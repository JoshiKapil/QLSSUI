import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { unwrapApiResponse } from '../models/api-response.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AdminManagementService {
    constructor(http) {
        this.http = http;
        this.apiBaseUrl = environment.apiBaseUrl;
    }
    getAll(endpoint) {
        return this.http.get(this.url(endpoint)).pipe(map((response) => unwrapApiResponse(response)), catchError(() => of(this.getLocalRecords(endpoint))));
    }
    getById(endpoint, idKey, id) {
        return this.http.get(this.url(endpoint, id)).pipe(map((response) => unwrapApiResponse(response)), catchError(() => of(this.findLocalRecord(endpoint, idKey, id))));
    }
    save(endpoint, idKey, record) {
        const id = this.getRecordId(record, idKey);
        const request$ = id
            ? this.http.put(this.url(endpoint, id), record)
            : this.http.post(this.url(endpoint), record);
        return request$.pipe(map((response) => unwrapApiResponse(response)), tap((saved) => this.upsertLocalRecord(endpoint, idKey, saved)), catchError(() => {
            const saved = Object.assign(Object.assign({}, record), { [idKey]: id || Date.now() });
            this.upsertLocalRecord(endpoint, idKey, saved);
            return of(saved);
        }));
    }
    delete(endpoint, idKey, id) {
        return this.http.delete(this.url(endpoint, id)).pipe(map((response) => unwrapApiResponse(response)), tap(() => this.deleteLocalRecord(endpoint, idKey, id)), catchError(() => {
            this.deleteLocalRecord(endpoint, idKey, id);
            return of(void 0);
        }));
    }
    search(endpoint, searchKeys, query) {
        return this.getAll(endpoint).pipe(map((records) => {
            const search = query.trim().toLowerCase();
            if (!search) {
                return records;
            }
            return records.filter((record) => this.matchesSearch(record, searchKeys, search));
        }));
    }
    uploadBulkData(endpoint, records) {
        return this.http
            .post(this.url(endpoint) + '/upload', records)
            .pipe(map((response) => unwrapApiResponse(response)));
    }
    uploadBulk(endpoint, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(this.url(endpoint) + '/upload', formData).pipe(map((response) => unwrapApiResponse(response)), catchError(() => of(void 0)));
    }
    findLocalRecord(endpoint, idKey, id) {
        return this.getLocalRecords(endpoint).find((record) => String(this.getRecordId(record, idKey)) === String(id));
    }
    getLocalRecords(endpoint) {
        const raw = localStorage.getItem(this.storageKey(endpoint));
        return raw ? JSON.parse(raw) : [];
    }
    upsertLocalRecord(endpoint, idKey, record) {
        const records = this.getLocalRecords(endpoint);
        const id = this.getRecordId(record, idKey);
        const index = records.findIndex((item) => String(this.getRecordId(item, idKey)) === String(id));
        if (index > -1) {
            records[index] = record;
        }
        else {
            records.push(record);
        }
        localStorage.setItem(this.storageKey(endpoint), JSON.stringify(records));
    }
    deleteLocalRecord(endpoint, idKey, id) {
        const records = this.getLocalRecords(endpoint);
        const filtered = records.filter((record) => String(this.getRecordId(record, idKey)) !== String(id));
        localStorage.setItem(this.storageKey(endpoint), JSON.stringify(filtered));
    }
    matchesSearch(record, searchKeys, search) {
        return searchKeys.some((key) => String(this.getRecordValue(record, key) || '').toLowerCase().includes(search));
    }
    getRecordId(record, key) {
        const value = this.getRecordValue(record, key);
        return typeof value === 'string' || typeof value === 'number' ? value : undefined;
    }
    getRecordValue(record, key) {
        return record && typeof record === 'object' ? record[key] : undefined;
    }
    url(endpoint, id) {
        return id ? this.apiBaseUrl + '/' + endpoint + '/' + id : this.apiBaseUrl + '/' + endpoint;
    }
    storageKey(endpoint) {
        return 'qlss_admin_' + endpoint;
    }
}
AdminManagementService.ɵfac = function AdminManagementService_Factory(t) { return new (t || AdminManagementService)(i0.ɵɵinject(i1.HttpClient)); };
AdminManagementService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminManagementService, factory: AdminManagementService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminManagementService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=admin-management.service.js.map