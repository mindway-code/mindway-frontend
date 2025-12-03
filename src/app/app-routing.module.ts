import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CommonLayoutComponent } from './layout/common-layout/common-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalLayoutComponent } from './layout/personal-layout/personal-layout.component';
import { HistoryComponent } from './pages/history/history.component';
import { RelationComponent } from './pages/relation/relation.component';
import { TaskComponent } from './pages/task/task.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { TherapistLayoutComponent } from './layout/therapist-layout/therapist-layout.component';
import { FamilyComponent } from './pages/therapist/family/family.component';
import { GuideComponent } from './pages/therapist/guide/guide.component';
import { ScheduleComponent } from './pages/therapist/schedule/schedule.component';
import { TherapistProfileComponent } from './pages/therapist/therapist-profile/therapist-profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ChildrenComponent } from './pages/profile/children/children.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AuthTherapistGuard } from './auth/guard/therapist.guard';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ClientAppointmentsComponent } from './pages/client-appointments/client-appointments.component';
import { SocialNetworkComponent } from './pages/social-network/social-network.component';
import { AssociationComponent } from './pages/therapist/association/association.component';
import { AttendanceComponent } from './pages/therapist/attendance/attendance.component';

const routes: Routes = [
  // Rota para as páginas com layout comum
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // outras rotas que devem usar o CommonLayoutComponent
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: CommonLayoutComponent,
    children: [
      {
        path: 'appointments',
        component: ClientAppointmentsComponent
      }
    ]
  },
  {
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'social-network',
    component: SocialNetworkComponent
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'personal',  // Caminho claro para o layout pessoal
    component: PersonalLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [ // Página inicial para o layout pessoal
      { path: 'profile', component: ProfileComponent },
      { path: 'children', component: ChildrenComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'relation', component: RelationComponent },
      { path: 'task', component: TaskComponent },
      { path: 'notification', component: NotificationComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
      // Outras rotas que devem usar o PersonalLayoutComponent
    ],
  },

  {
    path: 'therapist',
    component: TherapistLayoutComponent,
    canActivate: [AuthTherapistGuard],
    canActivateChild: [AuthTherapistGuard],
    children: [
      { path: 'profile',   component: TherapistProfileComponent },
      { path: 'association',    component: AssociationComponent },
      { path: 'guide',    component: GuideComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'family',   component: FamilyComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },

  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [AuthTherapistGuard],
    canActivateChild: [AuthTherapistGuard],
    // children: [
    //   { path: 'profile',   component: TherapistProfileComponent },
    //   { path: 'guide',    component: GuideComponent },
    //   { path: 'schedule', component: ScheduleComponent },
    //   { path: 'family',   component: FamilyComponent },
    //   { path: '', redirectTo: 'profile', pathMatch: 'full' }
    // ]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },


  // { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
