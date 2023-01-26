import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CertificatesComponent } from './components/dashboard/certificates/certificates.component';
import { CertificateComponent } from './components/dashboard/certificate/certificate.component';
import { CertificateViewComponent } from './components/dashboard/certificate-view/certificate-view.component';
import { TemplatesComponent } from './components/dashboard/templates/templates.component';
import { TemplateComponent } from './components/dashboard/template/template.component';
import { TemplateViewComponent } from './components/dashboard/template-view/template-view.component';
import { AuthGuard } from './guards/auth.guard';
import { VerifyComponent } from './components/verify/verify.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'dashboard', 
    redirectTo: '/dashboard/certificates', 
    pathMatch: 'full',
  },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard],
    children: [
      { path: 'certificates', component: CertificatesComponent },
      { 
        path: 'certificate', 
        children: [
          { path: 'edit/:id', component: CertificateComponent },
          { path: 'new', component: CertificateComponent },
        ]
      },
      { path: 'templates', component: TemplatesComponent },
      { 
        path: 'template', 
        children: [
          { path: 'new', component: TemplateComponent },
          { path: ':id', component: TemplateViewComponent },
          { path: 'edit/:id', component: TemplateComponent },
        ]
      },
    ]
  },
  { path: 'certificate/:id', component: CertificateViewComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'contacts', component: ContactsComponent },

  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
