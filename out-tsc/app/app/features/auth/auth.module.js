import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import * as i0 from "@angular/core";
export class AuthModule {
}
AuthModule.ɵfac = function AuthModule_Factory(t) { return new (t || AuthModule)(); };
AuthModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AuthModule });
AuthModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    LoginComponent,
                    RegisterComponent,
                    ForgotPasswordComponent,
                    ResetPasswordComponent,
                    ChangePasswordComponent,
                    EditProfileComponent
                ],
                imports: [SharedModule],
                exports: [
                    LoginComponent,
                    RegisterComponent,
                    ForgotPasswordComponent,
                    ResetPasswordComponent,
                    ChangePasswordComponent,
                    EditProfileComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AuthModule, { declarations: [LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ChangePasswordComponent,
        EditProfileComponent], imports: [SharedModule], exports: [LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ChangePasswordComponent,
        EditProfileComponent] }); })();
//# sourceMappingURL=auth.module.js.map