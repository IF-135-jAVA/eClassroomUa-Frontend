import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Classroom } from './classroom';

@Injectable({
    providedIn: 'root'
})
export class ClassroomService {
    private apiServerUrl = 'localhost:8080/api/classroms/';

    constructor(private http: HttpClient){}

    public getClassrooms(): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}`);
    }

    public getUserById(classroomId: number): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}${classroomId}`);
    }
    
    public updateUser(classroom: Classroom): Observable<any>{        
        return this.http.put<any>(`${this.apiServerUrl}`, classroom);
    }

    public addUser(classroom: Classroom): Observable<any>{        
        return this.http.post<any>(`${this.apiServerUrl}`, classroom);
    }

    public deleteUser(classroomId: number): Observable<any>{        
        return this.http.delete<void>(`${this.apiServerUrl}${classroomId}`);
    }
}