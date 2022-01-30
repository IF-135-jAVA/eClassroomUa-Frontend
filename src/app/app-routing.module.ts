import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { LogoutComponent } from './logout/logout.component';
import { PickRoleComponent } from './pick-role/pick-role.component';
import { ProfileComponent } from './profile/profile.component';
import {RegistrationComponent} from "./registration/registration.component";
import { ViewClassroomComponent } from './view-classroom/view-classroom.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'classrooms', component: ClassroomsComponent },
  { path: 'classrooms/:classroomId', component: ViewClassroomComponent},
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'pick-role', component: PickRoleComponent },
  { path: 'classrooms/:classroomId/announcements/:announcementId', component: AnnouncementDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
