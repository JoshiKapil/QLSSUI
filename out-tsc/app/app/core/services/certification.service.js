import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./admin-management.service";
import * as i2 from "./api-client.service";
export class CertificationService {
    constructor(adminService, apiClient) {
        this.adminService = adminService;
        this.apiClient = apiClient;
        this.endpoint = 'CertificateOperation';
        this.certificationDataEndpoint = 'CertificationData';
    }
    getAll() {
        return this.adminService.getAll(this.endpoint);
    }
    search(query) {
        return this.adminService.search(this.endpoint, ['certificationNumber', 'userName'], query);
    }
    save(record) {
        return this.adminService.save(this.endpoint, 'certificationNumber', record);
    }
    uploadExcelData(records) {
        return this.adminService.uploadBulkData(this.endpoint, records);
    }
    uploadBulk(file) {
        return this.adminService.uploadBulk(this.endpoint, file);
    }
    getByNumber(certificationNumber) {
        return this.apiClient.get(`${this.certificationDataEndpoint}/by-number/${encodeURIComponent(certificationNumber)}`);
    }
}
CertificationService.ɵfac = function CertificationService_Factory(t) { return new (t || CertificationService)(i0.ɵɵinject(i1.AdminManagementService), i0.ɵɵinject(i2.ApiClientService)); };
CertificationService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CertificationService, factory: CertificationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CertificationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.AdminManagementService }, { type: i2.ApiClientService }]; }, null); })();
//# sourceMappingURL=certification.service.js.map