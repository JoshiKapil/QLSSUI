import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./admin-management.service";
import * as i2 from "./api-client.service";
export class CertificationFormService {
    constructor(adminService, api) {
        this.adminService = adminService;
        this.api = api;
        this.endpoint = 'Certification-Data';
        this.idKey = 'certificationDataId';
    }
    getAll() {
        return this.adminService.getAll(this.endpoint);
    }
    getById(certificationFormId) {
        return this.adminService.getById(this.endpoint, this.idKey, certificationFormId);
    }
    save(record) {
        return this.adminService.save(this.endpoint, this.idKey, record);
    }
    getByUserTraining(email, trainingId) {
        return this.api.get('certification-data/by-user-training', { email, trainingId });
    }
    approve(certificationDataIds, location = '') {
        return this.api.post('certification-data/approve', {
            certificationDataIds,
            location
        });
    }
    import(records) {
        return this.api.post('certification-data/import', { records });
    }
}
CertificationFormService.ɵfac = function CertificationFormService_Factory(t) { return new (t || CertificationFormService)(i0.ɵɵinject(i1.AdminManagementService), i0.ɵɵinject(i2.ApiClientService)); };
CertificationFormService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CertificationFormService, factory: CertificationFormService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CertificationFormService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.AdminManagementService }, { type: i2.ApiClientService }]; }, null); })();
//# sourceMappingURL=certification-form.service.js.map