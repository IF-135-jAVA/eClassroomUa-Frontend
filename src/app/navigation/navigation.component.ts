import { Component, OnInit } from '@angular/core';
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

  constructor(public authService: AuthService) { 
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    )
  }
  
  public logout(){
      Emitters.authEmitter.emit(false);
      environment.tokenName = "";
  }
}
