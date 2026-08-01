import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./admin-management.service";
export class LinkedInCommentService {
    constructor(adminService) {
        this.adminService = adminService;
        this.endpoint = 'LinkedInComment';
    }
    getAll() {
        return this.adminService.getAll(this.endpoint);
    }
    search(query) {
        return this.adminService.search(this.endpoint, ['commentId', 'postId', 'author'], query);
    }
    save(record) {
        return this.adminService.save(this.endpoint, 'commentId', record);
    }
}
LinkedInCommentService.ɵfac = function LinkedInCommentService_Factory(t) { return new (t || LinkedInCommentService)(i0.ɵɵinject(i1.AdminManagementService)); };
LinkedInCommentService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LinkedInCommentService, factory: LinkedInCommentService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkedInCommentService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.AdminManagementService }]; }, null); })();
//# sourceMappingURL=linkedin-comment.service.js.map