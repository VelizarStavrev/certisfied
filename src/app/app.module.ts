import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserTokenInterceptor } from './interceptors/user-token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { ButtonLinkComponent } from './components/shared/button-link/button-link.component';
import { RegisterComponent } from './components/register/register.component';
import { MessageComponent } from './components/shared/message/message.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CertificatesComponent } from './components/dashboard/certificates/certificates.component';
import { TemplatesComponent } from './components/dashboard/templates/templates.component';
import { TemplateComponent } from './components/dashboard/template/template.component';
import { FieldListComponent } from './components/dashboard/shared/field-list/field-list.component';
import { FieldAddComponent } from './components/dashboard/shared/field-add/field-add.component';
import { TimestampToDatePipe } from './pipes/timestamp-to-date.pipe';
import { FieldSettingsComponent } from './components/dashboard/shared/field-settings/field-settings.component';
import { TemplateViewComponent } from './components/dashboard/template-view/template-view.component';
import { CertificateComponent } from './components/dashboard/certificate/certificate.component';
import { CertificateViewComponent } from './components/dashboard/certificate-view/certificate-view.component';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ButtonComponent,
    ButtonLinkComponent,
    RegisterComponent,
    MessageComponent,
    LoaderComponent,
    ProfileComponent,
    CertificatesComponent,
    TemplatesComponent,
    TemplateComponent,
    FieldListComponent,
    FieldAddComponent,
    TimestampToDatePipe,
    FieldSettingsComponent,
    TemplateViewComponent,
    CertificateComponent,
    CertificateViewComponent,
    VerifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: UserTokenInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
