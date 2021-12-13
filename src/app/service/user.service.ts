import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = 'localhost:8080/api/users/';

    constructor(private http: HttpClient){}

    public getUsers(): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}`);
    }

    public getUserById(userId: number): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}${userId}`);
    }
    
    public updateUser(user: User): Observable<any>{        
        return this.http.put<any>(`${this.apiServerUrl}`, user);
    }

    public addUser(user: User): Observable<any>{        
        return this.http.post<any>(`${this.apiServerUrl}`, user);
    }

    public deleteUser(userId: number): Observable<any>{        
        return this.http.delete<void>(`${this.apiServerUrl}${userId}`);
    }
}