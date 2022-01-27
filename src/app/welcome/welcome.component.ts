import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  helper = new JwtHelperService();
  router: any;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        localStorage.setItem(environment.tokenName, params['token']);
      }
    );
    if(localStorage.getItem(environment.tokenName)?.toString.length != 0){
      if (this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString())) {
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/login']);
      } else {
        Emitters.authEmitter.emit(true);
        //localStorage.setItem(environment.role, this.role);
        this.router.navigate(['/home']);
      }
    }
    
  }
}