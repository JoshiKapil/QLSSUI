import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { EditProfileComponent } from './features/auth/edit-profile/edit-profile.component';
import { CertificationComponent } from './features/admin/certification/certification.component';
import { TrainingAdminComponent } from './features/admin/training-admin/training-admin.component';
import { TrainerComponent } from './features/admin/trainer/trainer.component';
import { ClientAdminComponent } from './features/admin/client-admin/client-admin.component';
import { LinkedinPostComponent } from './features/admin/linkedin-post/linkedin-post.component';
import { LinkedinCommentComponent } from './features/admin/linkedin-comment/linkedin-comment.component';
import { CreateTestComponent } from './features/admin/create-test/create-test.component';
import { CreateQuestionComponent } from './features/admin/create-question/create-question.component';
import { PrintCertificateComponent } from './features/admin/print-certificate/print-certificate.component';
import { CreateTestQuestionsComponent } from './features/admin/create-test-questions/create-test-questions.component';
import { DemoComponent } from './features/demo/demo.component';
import { ApproveCertificateComponent } from './features/admin/approve-certificate/approve-certificate.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/certifications', component: CertificationComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/trainings', component: TrainingAdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/trainer', component: TrainerComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/clients', component: ClientAdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/linkedin-posts', component: LinkedinPostComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/linkedin-comments', component: LinkedinCommentComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/create-test', component: CreateTestComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/create-question', component: CreateQuestionComponent , canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/create-test-questions', component: CreateTestQuestionsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/question-bank', component: CreateQuestionComponent , canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/print-certificate', component: PrintCertificateComponent },
  { path: 'admin/approve-certificate', component: ApproveCertificateComponent, canActivate: [AuthGuard, AdminGuard] },
  //{ path: 'demo', component: DemoComponent },
  { path: '', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./features/about/about.module').then((m) => m.AboutModule) },
  { path: 'training', loadChildren: () => import('./features/training/training.module').then((m) => m.TrainingModule) },
  { path: 'test', loadChildren: () => import('./features/test/test.module').then((m) => m.TestModule) },
  { path: 'expertise', loadChildren: () => import('./features/expertise/expertise.module').then((m) => m.ExpertiseModule) },
  { path: 'blogs', loadChildren: () => import('./features/blogs/blogs.module').then((m) => m.BlogsModule) },
  { path: 'management-system', loadChildren: () => import('./features/management-system/management-system.module').then((m) => m.ManagementSystemModule) },
  { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then((m) => m.ContactModule) },
  { path: 'client', loadChildren: () => import('./features/client/client.module').then((m) => m.ClientModule) },
  { path: 'faq', loadChildren: () => import('./features/faq/faq.module').then((m) => m.FaqModule) },
  { path: 'teams', loadChildren: () => import('./features/teams/teams.module').then((m) => m.TeamsModule) },
  { path: 'verify', loadChildren: () => import('./features/verify/verify.module').then((m) => m.VerifyModule) },
  { path: 'fill-exam-form', loadChildren: () => import('./features/fillcertificationfrom/fillcertificationfrom.module').then((m) => m.FillcertificationfromModule) },
  { path: 'fill-certification-from', redirectTo: 'fill-exam-form', pathMatch: 'full' },
  { path: 'dataanalytics', loadChildren: () => import('./features/dataanalytics/dataanalytics.module').then((m) => m.DataanalyticsModule) },
  { path: 'financial-services', loadChildren: () => import('./features/financial-services/financial-services.module').then((m) => m.FinancialServicesModule) },
  { path: 'information-security', loadChildren: () => import('./features/information-security/information-security.module').then((m) => m.InformationSecurityModule) },
  { path: 'gallery', loadChildren: () => import('./features/gallery/gallery.module').then((m) => m.GalleryModule) },
  { path: 'operationalexcellence', loadChildren: () => import('./features/operationalexcellence/operationalexcellence.module').then((m) => m.OperationalexcellenceModule) },
  { path: 'supply-chain', loadChildren: () => import('./features/supply-chain/supply-chain.module').then((m) => m.SupplyChainModule) },
  { path: 'sustainability', loadChildren: () => import('./features/sustainability/sustainability.module').then((m) => m.SustainabilityModule) },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
