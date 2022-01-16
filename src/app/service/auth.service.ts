import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { LoginModel } from '../model/loginmodel';
import { environment } from 'src/environments/environment';

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

    public login(loginModel: LoginModel, role: string){   
        return this.http.post(`${this.apiServerUrl}login?role=${role}`, loginModel, { observe: 'response' });
    }

    public oauth2(){
        //return this.http.get(`https://belero-app.herokuapp.com/oauth2/authorize/google?redirect_uri=https%3A%2F%2Fbelero-app.herokuapp.com%2F`);
    }

    public deleteUser(user: User){ 
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };     
        user.enabled=false;
        return this.http.put(`${this.apiServerUrl}users/${user.id}`, user, options);
    }
}