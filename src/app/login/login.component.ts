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
    Emitters.oauthEmitter.emit(false);
  }

  loginWithGoogle(){
    window.location.href = environment.googleOAuth;
    Emitters.oauthEmitter.emit(true);
  }

  login(): void {
    let token = this.authService.login(this.form.getRawValue()).subscribe(
      (data: AuthResponse) => {
        console.log("login " + data.token);
        localStorage.setItem(environment.tokenName, data.token);
        if (this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString())) {
          Emitters.authEmitter.emit(false);
          this.errorMessage = ": Invalid email or password"
        } else {
          Emitters.authEmitter.emit(true);
          this.router.navigate(['/pick-role']);
        }
      });
  }
}
