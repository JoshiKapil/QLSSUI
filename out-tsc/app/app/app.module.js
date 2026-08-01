import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { AdminModule } from './features/admin/admin.module';
import { DemoComponent } from './features/demo/demo.component';
import { AuthTokenInterceptor } from './core/services/auth-token.interceptor';
import * as i0 from "@angular/core";
export class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }], imports: [BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        CoreModule,
        SharedModule,
        AuthModule,
        AdminModule,
        LayoutsModule,
        AppRoutingModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppModule, [{
        type: NgModule,
        args: [{
                declarations: [AppComponent, DemoComponent],
                imports: [
                    BrowserModule,
                    BrowserAnimationsModule,
                    RouterModule,
                    HttpClientModule,
                    FormsModule,
                    CoreModule,
                    SharedModule,
                    AuthModule,
                    AdminModule,
                    LayoutsModule,
                    AppRoutingModule
                ],
                providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }],
                bootstrap: [AppComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [AppComponent, DemoComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        CoreModule,
        SharedModule,
        AuthModule,
        AdminModule,
        LayoutsModule,
        AppRoutingModule] }); })();
//# sourceMappingURL=app.module.js.map