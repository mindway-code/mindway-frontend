import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import  { Formsmodule }
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonLayoutComponent } from './layout/common-layout/common-layout.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';  // Para os botões do PrimeNG
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalLayoutComponent } from './layout/personal-layout/personal-layout.component';
import { HistoryComponent } from './pages/history/history.component';
import { RelationComponent } from './pages/relation/relation.component';
import { TaskComponent } from './pages/task/task.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { TherapistLayoutComponent } from './layout/therapist-layout/therapist-layout.component';
import { GuideComponent } from './pages/therapist/guide/guide.component';
import { FamilyComponent } from './pages/therapist/family/family.component';
import { ScheduleComponent } from './pages/therapist/schedule/schedule.component';
import { AppointmentComponent } from './pages/therapist/schedule/appointment/appointment.component';
import localePt from '@angular/common/locales/pt';
import { InformationComponent } from './pages/therapist/therapist-profile/information/information.component';
import { PreferenceComponent } from './pages/therapist/therapist-profile/preference/preference.component';
import { HelpComponent } from './pages/therapist/therapist-profile/help/help.component';
import { TherapistProfileComponent } from './pages/therapist/therapist-profile/therapist-profile.component';
import { NotificationTherapistComponent } from './pages/therapist/therapist-profile/notification-therapist/notification-therapist.component';
import { ChildrenComponent } from './pages/profile/children/children.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ProgressComponent } from './pages/profile/children/progress/progress.component';
import { ProgressModalComponent } from './pages/profile/children/progress-modal/progress-modal.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { TeacherLayoutComponent } from './layout/teacher-layout/teacher-layout.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommonLayoutComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PersonalComponent,
    NavbarComponent,
    ProfileComponent,
    PersonalLayoutComponent,
    HistoryComponent,
    RelationComponent,
    TaskComponent,
    NotificationComponent,
    TherapistLayoutComponent,
    GuideComponent,
    FamilyComponent,
    ScheduleComponent,
    AppointmentComponent,
    InformationComponent,
    PreferenceComponent,
    HelpComponent,
    TherapistProfileComponent,
    NotificationTherapistComponent,
    ChildrenComponent,
    EditProfileComponent,
    ProgressComponent,
    TeacherComponent,
    TeacherLayoutComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEditorModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }   // <-- locale global
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
