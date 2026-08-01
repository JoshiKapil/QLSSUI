import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CertificationComponent } from './certification/certification.component';
import { TrainingAdminComponent } from './training-admin/training-admin.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ClientAdminComponent } from './client-admin/client-admin.component';
import { LinkedinPostComponent } from './linkedin-post/linkedin-post.component';
import { LinkedinCommentComponent } from './linkedin-comment/linkedin-comment.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { PrintCertificateComponent } from './print-certificate/print-certificate.component';
import { CreateTestQuestionsComponent } from './create-test-questions/create-test-questions.component';
import { ApproveCertificateComponent } from './approve-certificate/approve-certificate.component';
import * as i0 from "@angular/core";
export class AdminModule {
}
AdminModule.ɵfac = function AdminModule_Factory(t) { return new (t || AdminModule)(); };
AdminModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AdminModule });
AdminModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    CertificationComponent,
                    TrainingAdminComponent,
                    TrainerComponent,
                    ClientAdminComponent,
                    LinkedinPostComponent,
                    LinkedinCommentComponent,
                    CreateTestComponent,
                    CreateQuestionComponent,
                    PrintCertificateComponent,
                    CreateTestQuestionsComponent,
                    ApproveCertificateComponent
                ],
                imports: [SharedModule],
                exports: [
                    CertificationComponent,
                    TrainingAdminComponent,
                    TrainerComponent,
                    ClientAdminComponent,
                    LinkedinPostComponent,
                    LinkedinCommentComponent,
                    CreateTestComponent,
                    CreateQuestionComponent,
                    PrintCertificateComponent,
                    CreateTestQuestionsComponent,
                    ApproveCertificateComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AdminModule, { declarations: [CertificationComponent,
        TrainingAdminComponent,
        TrainerComponent,
        ClientAdminComponent,
        LinkedinPostComponent,
        LinkedinCommentComponent,
        CreateTestComponent,
        CreateQuestionComponent,
        PrintCertificateComponent,
        CreateTestQuestionsComponent,
        ApproveCertificateComponent], imports: [SharedModule], exports: [CertificationComponent,
        TrainingAdminComponent,
        TrainerComponent,
        ClientAdminComponent,
        LinkedinPostComponent,
        LinkedinCommentComponent,
        CreateTestComponent,
        CreateQuestionComponent,
        PrintCertificateComponent,
        CreateTestQuestionsComponent,
        ApproveCertificateComponent] }); })();
//# sourceMappingURL=admin.module.js.map