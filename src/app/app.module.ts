import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ViewClassroomComponent} from './view-classroom/view-classroom.component';
import {ProfileComponent} from './profile/profile.component';
import {HeaderComponent} from './components/header/header.component';
import {ButtonComponent} from './components/button/button.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {NavigationComponent} from './navigation/navigation.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogoutComponent} from './logout/logout.component';
import {ClassroomsComponent} from './classrooms/classrooms.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ToggleButtonComponent} from './components/toggle-button/toggle-button.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {PickRoleComponent} from './pick-role/pick-role.component';
import {AnnouncementComponent} from './announcement/announcement.component';
import {AnnouncementDetailsComponent} from './announcement-details/announcement-details.component';
import {CriterionsComponent} from './criterions/criterions.component';
import {CommonModule} from "@angular/common";

import {CriterionDetailsComponent} from './criterion-details/criterion-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TopicsComponent } from './topics/topics.component';
import { CriterionDetailsComponent } from './criterion-details/criterion-details.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { LevelsComponent } from './levels/levels.component';
import { LevelsDetailsComponent } from './levels-details/levels-details.component';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailRequestComponent } from './email-request/email-request.component';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    ViewClassroomComponent,
    ProfileComponent,
    HeaderComponent,
    ButtonComponent,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    LogoutComponent,
    ClassroomsComponent,
    WelcomeComponent,
    ToggleButtonComponent,
    PickRoleComponent,
    AnnouncementComponent,
    AnnouncementDetailsComponent,
    CriterionsComponent,
    TopicsComponent,
    CriterionDetailsComponent,
    TopicDetailsComponent,
    LevelsComponent,
    LevelsDetailsComponent,
    MaterialsComponent,
    MaterialDetailsComponent,
    ConfirmEmailComponent,
    ChangePasswordComponent,
    EmailRequestComponent,

  ],

  imports: [
    MatInputModule,
    MatSelectModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatCardModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTabsModule,
    MatFormFieldModule,
    MatRippleModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
