import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./admin-management.service";
import * as i2 from "./api-client.service";
export class ClientManagementService {
    constructor(adminService, apiClient) {
        this.adminService = adminService;
        this.apiClient = apiClient;
        this.endpoint = "Client";
        this.idKey = "clientId";
    }
    getAll() {
        return this.adminService.getAll(this.endpoint);
    }
    getById(id) {
        return this.adminService.getById(this.endpoint, this.idKey, id);
    }
    search(query) {
        return this.adminService.search(this.endpoint, ["clientName", "clientId"], query);
    }
    uploadImage(file) {
        return this.apiClient.upload(`${this.endpoint}/upload-image`, file);
    }
    save(record) {
        return this.adminService.save(this.endpoint, this.idKey, record);
    }
    delete(id) {
        return this.adminService.delete(this.endpoint, this.idKey, id);
    }
    setActive(record, isActive) {
        return this.save(Object.assign(Object.assign({}, record), { isActive }));
    }
}
ClientManagementService.ɵfac = function ClientManagementService_Factory(t) { return new (t || ClientManagementService)(i0.ɵɵinject(i1.AdminManagementService), i0.ɵɵinject(i2.ApiClientService)); };
ClientManagementService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ClientManagementService, factory: ClientManagementService.ɵfac, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClientManagementService, [{
        type: Injectable,
        args: [{ providedIn: "root" }]
    }], function () { return [{ type: i1.AdminManagementService }, { type: i2.ApiClientService }]; }, null); })();
//# sourceMappingURL=client-management.service.js.map