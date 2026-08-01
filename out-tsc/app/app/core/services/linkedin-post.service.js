import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./admin-management.service";
export class LinkedInPostService {
    constructor(adminService) {
        this.adminService = adminService;
        this.endpoint = 'LinkedInPost';
    }
    getAll() {
        return this.adminService.getAll(this.endpoint);
    }
    search(query) {
        return this.adminService.search(this.endpoint, ['postId', 'author'], query);
    }
    save(record) {
        return this.adminService.save(this.endpoint, 'postId', record);
    }
}
LinkedInPostService.ɵfac = function LinkedInPostService_Factory(t) { return new (t || LinkedInPostService)(i0.ɵɵinject(i1.AdminManagementService)); };
LinkedInPostService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LinkedInPostService, factory: LinkedInPostService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkedInPostService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.AdminManagementService }]; }, null); })();
//# sourceMappingURL=linkedin-post.service.js.map