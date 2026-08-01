import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NotifierService {
    successToastr(message, title = 'Success') {
        this.showToastr(message, title, '#1f7a4d');
    }
    warningToastr(message, title = 'Warning') {
        this.showToastr(message, title, '#323232');
    }
    showToastr(message, title, background) {
        const toast = document.createElement('div');
        toast.innerHTML = `<strong>${title}</strong><div>${message}</div>`;
        Object.assign(toast.style, {
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            zIndex: '99999',
            background,
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            maxWidth: '320px',
            lineHeight: '1.4',
            opacity: '1',
            transition: 'opacity 0.3s ease'
        });
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
}
NotifierService.ɵfac = function NotifierService_Factory(t) { return new (t || NotifierService)(); };
NotifierService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotifierService, factory: NotifierService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotifierService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=notifier.service.js.map