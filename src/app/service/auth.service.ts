import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { LoginModel } from '../model/loginmodel';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../model/auth-response';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        observe: "response" })
  };

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiServerUrl = environment.authApi;

    jwtString: string | undefined;

    constructor(private http: HttpClient){}

    public updateUser(user: User): Observable<User>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        user.enabled=false;
        return this.http.put<User>(`${this.apiServerUrl}users/${user.id}`, user, options);
    }

    public registration(user: User): Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}registration`, user);
    }

    public login(loginModel: LoginModel): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.apiServerUrl}login`, loginModel);
    }

    public getRole(role: string): Observable<AuthResponse>{
      this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
      let headers = new HttpHeaders().set('Authorization', this.jwtString);
      let options = { headers: headers };
      return this.http.get<AuthResponse>(`${this.apiServerUrl}login/${role}`, options);
    }

    public deleteUser(user: User){
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        user.enabled=false;
        return this.http.put(`${this.apiServerUrl}users/${user.id}`, user, options);
    }
}
