import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewClassroomComponent } from './view-classroom/view-classroom.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LogoutComponent } from './logout/logout.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { PickRoleComponent } from './pick-role/pick-role.component';

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
    PickRoleComponent
  ],
  imports: [
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
    MatRippleModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
  exports: [
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
