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
import {CriterionsComponent} from "./criterions/criterions.component";
import {CriterionDetailsComponent} from "./criterion-details/criterion-details.component";
import {TopicsComponent} from "./topics/topics.component";

import {LevelsComponent} from "./levels/levels.component";
import {LevelsDetailsComponent} from "./levels-details/levels-details.component";
import {TopicDetailsComponent} from "./topic-details/topic-details.component";
import { MaterialsComponent } from './materials/materials.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailRequestComponent } from './email-request/email-request.component';
import {UserAssignmentsComponent} from "./user-assignments/user-assignments.component";
import {UserAssignmentDetailsComponent} from "./user-assignment-details/user-assignment-details.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'classrooms', component: ClassroomsComponent },
  { path: 'classrooms/:classroomId', component: ViewClassroomComponent},
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'pick-role', component: PickRoleComponent },
  { path: 'classrooms/:classroomId/announcements/:announcementId', component: AnnouncementDetailsComponent},
  { path: 'classrooms/:classroomId/topics/:topicId/materials/:materialId/criterions', component: CriterionsComponent},
  { path: 'classrooms/:classroomId/topics/:topicId/materials/:materialId/criterions/:criterionId', component: CriterionDetailsComponent},
  { path: 'classrooms/:classroomId/topics/:topicId', component: TopicDetailsComponent},
  { path: 'classrooms/:classroomId/topics', component: TopicsComponent},
  { path: 'classrooms/:classroomId/topics/:topicId/materials/:materialId/criterions/:criterionId/level', component: LevelsComponent},
  { path: 'classrooms/:classroomId/topics/:topicId/materials/:materialId/criterions/:criterionId/level/:levelId', component: LevelsDetailsComponent},
  { path: 'classrooms/:classroomId/topics/:topicId/materials', component: MaterialsComponent},
  { path: 'classrooms/:classroomId/topics/:topicId/materials/:materialId', component: MaterialDetailsComponent},
  { path: 'confirm', component: ConfirmEmailComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'request', component: EmailRequestComponent},
  { path: 'materials/:materialId/assignments', component: UserAssignmentsComponent},
  { path: 'materials/:materialId/assignments/:assignmentId', component: UserAssignmentDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
