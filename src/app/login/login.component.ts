import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';
import {Emitters} from '../emitters/emitters';
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
  role: string = "student";
  helper = new JwtHelperService();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

  setRoleTeacher() {
    this.role = "teacher";
  }

  setRoleStudent() {
    this.role = "student";
  }

  login(): void {
    this.authService.login(this.form.getRawValue(), this.role).subscribe(
      (data) => {
        localStorage.setItem(environment.user,JSON.stringify(data.body));
        localStorage.setItem(environment.tokenName, data.headers.get("Authorization") || '');
      });
    if (this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString())) {
      Emitters.authEmitter.emit(false);
      this.errorMessage = ": Invalid email or password"
    } else {
      Emitters.authEmitter.emit(true);
      localStorage.setItem(environment.role, this.role);
      this.router.navigate(['/home']);
    }
  }
}
