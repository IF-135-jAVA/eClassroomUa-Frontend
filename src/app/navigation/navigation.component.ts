import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emitters/emitters';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  authenticated = false;

  helper = new JwtHelperService();

  userId!: string;

  flag = false;

  constructor(public authService: AuthService,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.userId = this.helper.decodeToken(localStorage.getItem(environment.tokenName)?.toString()).id;
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = !this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString());
      }
    )
    if(localStorage.getItem(environment.tokenName) == undefined){
      this.authenticated = false;
      return;
    }
    
    this.authenticated = !this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString());
  }
  
  public logout(){
    this.router.navigate(['/logout']);
  }
}
