import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../services/notifier.service";
export class AdminGuard {
    constructor(authService, router, notifier) {
        this.authService = authService;
        this.router = router;
        this.notifier = notifier;
    }
    canActivate() {
        if (!this.authService.isLoggedIn()) {
            return this.router.createUrlTree(['/login']);
        }
        if (!this.authService.isAdmin()) {
            this.notifier.warningToastr('You are not authorized to access admin pages.', 'Unauthorized');
            return this.router.createUrlTree(['/']);
        }
        return true;
    }
}
AdminGuard.ɵfac = function AdminGuard_Factory(t) { return new (t || AdminGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i3.NotifierService)); };
AdminGuard.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminGuard, factory: AdminGuard.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminGuard, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.AuthService }, { type: i2.Router }, { type: i3.NotifierService }]; }, null); })();
//# sourceMappingURL=admin.guard.js.map