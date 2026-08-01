import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./admin-management.service";
export class TrainerService {
    constructor(adminService) {
        this.adminService = adminService;
        this.endpoint = "trainer";
        this.idKey = "trainerId";
    }
    getAll() {
        return this.adminService.getAll(this.endpoint);
    }
    getById(trainerId) {
        return this.adminService.getById(this.endpoint, this.idKey, trainerId);
    }
    search(query) {
        return this.adminService.search(this.endpoint, ["name", "mobile", "email"], query);
    }
    save(record) {
        return this.adminService.save(this.endpoint, this.idKey, record);
    }
    setActive(record, isActive) {
        return this.save(Object.assign(Object.assign({}, record), { isActive }));
    }
    delete(trainerId) {
        return this.adminService.delete(this.endpoint, this.idKey, trainerId);
    }
}
TrainerService.ɵfac = function TrainerService_Factory(t) { return new (t || TrainerService)(i0.ɵɵinject(i1.AdminManagementService)); };
TrainerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TrainerService, factory: TrainerService.ɵfac, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrainerService, [{
        type: Injectable,
        args: [{ providedIn: "root" }]
    }], function () { return [{ type: i1.AdminManagementService }]; }, null); })();
//# sourceMappingURL=trainer.service.js.map