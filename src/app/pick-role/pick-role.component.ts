import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {environment} from "../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {AuthResponse} from "../model/auth-response";
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-pick-role',
  templateUrl: './pick-role.component.html',
  styleUrls: ['./pick-role.component.css']
})
export class PickRoleComponent implements OnInit {

  helper = new JwtHelperService();

  role: string | undefined;

  jwtToken: string = '';

  authenticatedGoogle = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticatedGoogle = auth;
      }
    )
    if(this.authenticatedGoogle)this.route.queryParams.subscribe(params => {
      localStorage.setItem(environment.tokenName, params['token']);});
  }

  setRole(role: string){
      this.authService.getRole(role).subscribe(
        (data: AuthResponse) =>{         
          localStorage.setItem(environment.tokenName, data.token);
          Emitters.authEmitter.emit(true);
          this.router.navigate(['/profile', this.helper.decodeToken(localStorage.getItem(environment.tokenName) || '').id]);
      });     
      
  }
}