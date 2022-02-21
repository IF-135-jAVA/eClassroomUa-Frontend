import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';
import {Emitters} from '../emitters/emitters';
import { AuthResponse } from '../model/auth-response';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  apiServerUrl = environment.siteUrl;

  form: FormGroup = this.formBuilder.group({
    login: '',
    password: ''
  });

  errorMessage = "";
  helper = new JwtHelperService();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
  }

  loginWithGoogle(){
    window.location.href = "https://belero-app.herokuapp.com/oauth2/authorize/google?redirect_uri=https%3A%2F%2Fllocalhost/pick-role%2F"
  }

  login(): void {
    this.authService.login(this.form.getRawValue()).subscribe(
      (data: AuthResponse) => {
        localStorage.setItem(environment.tokenName, data.token);
        console.log("login " + data.token);
        if (this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString())) {
          this.errorMessage = ": Invalid email or password"
        } else {
          this.router.navigate(['/pick-role']);
        }
      });
  }
}