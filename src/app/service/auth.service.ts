import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiServerUrl = 'localhost:8080/api/auth/';

    constructor(private http: HttpClient){}

    public updateUser(user: User): Observable<User>{        
        return this.http.put<User>(`${this.apiServerUrl}/user/${user.id}`, user);
    }

    public registration(user: User): Observable<User>{        
        return this.http.post<User>(`${this.apiServerUrl}/registration`, user);
    }

    public loginAsTeacher(password: string): Observable<any>{        
        return this.http.post<string>(`${this.apiServerUrl}/login?role=teacher`, password);
    }

    public loginAsStudent(password: string): Observable<any>{        
        return this.http.post<string>(`${this.apiServerUrl}/login?role=student`, password);
    }
}