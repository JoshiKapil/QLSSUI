import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./admin-management.service";
import * as i2 from "./api-client.service";
export class TrainingManagementService {
    constructor(adminService, apiClient) {
        this.adminService = adminService;
        this.apiClient = apiClient;
        this.endpoint = 'Training';
        this.operationEndpoint = 'TrainingOperation';
    }
    getAll() {
        return this.adminService.getAll(this.endpoint);
    }
    search(query) {
        return this.adminService.search(this.endpoint, ['trainingName', 'trainingId'], query);
    }
    save(record) {
        return this.adminService.save(this.endpoint, 'trainingId', record);
    }
    getPaged(pageNumber = 1, pageSize = 100) {
        return this.apiClient.get(this.operationEndpoint, { pageNumber, pageSize });
    }
    getDocument(trainingId) {
        return this.apiClient.getBlob(`${this.operationEndpoint}/documents/${encodeURIComponent(String(trainingId))}`);
    }
    getCertificationData() {
        return this.apiClient.get(`/CertificationData`);
    }
}
TrainingManagementService.ɵfac = function TrainingManagementService_Factory(t) { return new (t || TrainingManagementService)(i0.ɵɵinject(i1.AdminManagementService), i0.ɵɵinject(i2.ApiClientService)); };
TrainingManagementService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TrainingManagementService, factory: TrainingManagementService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrainingManagementService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.AdminManagementService }, { type: i2.ApiClientService }]; }, null); })();
//# sourceMappingURL=training-management.service.js.map