import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { LogoutComponent } from './logout/logout.component';
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
  { path: 'classroom', component: ViewClassroomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
