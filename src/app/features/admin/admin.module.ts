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

@NgModule({
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
    CreateTestQuestionsComponent
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
    CreateTestQuestionsComponent
  ]
})
export class AdminModule {}



