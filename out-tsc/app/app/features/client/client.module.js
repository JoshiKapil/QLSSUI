import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import * as i0 from "@angular/core";
export class ClientModule {
}
ClientModule.ɵfac = function ClientModule_Factory(t) { return new (t || ClientModule)(); };
ClientModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ClientModule });
ClientModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, ClientRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClientModule, [{
        type: NgModule,
        args: [{
                declarations: [ClientComponent],
                imports: [SharedModule, ClientRoutingModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ClientModule, { declarations: [ClientComponent], imports: [SharedModule, ClientRoutingModule] }); })();
//# sourceMappingURL=client.module.js.map