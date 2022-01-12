import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classroom } from '../model/classroom';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ClassroomService {
    private apiServerUrl = environment.api + 'classrooms/';

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public getClassroomsByTeacher(userId: number): Observable<Classroom[]>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        console.log(`${this.apiServerUrl}byTeacher/${userId}`);
        return this.http.get<Classroom[]>(`${this.apiServerUrl}byTeacher/${userId}`, options);
    }

    public getClassroomsByStudent(userId: number): Observable<Classroom[]>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        console.log(`${this.apiServerUrl}byStudent/${userId}`);
        return this.http.get<Classroom[]>(`${this.apiServerUrl}byStudent/${userId}`, options);
    }
    
    public getClassroomById(classroomId: number): Observable<Classroom>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Classroom>(`${this.apiServerUrl}${classroomId}`, options);
    }
    
    public updateClassroom(classroom: Classroom): Observable<Classroom>{ 
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };       
        return this.http.put<Classroom>(`${this.apiServerUrl}`, classroom, options);
    }

    public addClassroom(classroom: Classroom): Observable<Classroom>{ 
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.post<Classroom>(`${this.apiServerUrl}`, classroom, options);
    }

    public joinClassroomAsStudent(code: String, userId: number): Observable<Classroom>{ 
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        let joinString = '?code=' + code + '&userId=' + userId;
        return this.http.get<Classroom>(`${this.apiServerUrl}asStudent${joinString}`, options);
    }

    public joinClassroomAsTeacher(code: String, userId: number): Observable<Classroom>{ 
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        let joinString = '?code=' + code + '&userId=' + userId;
        return this.http.get<Classroom>(`${this.apiServerUrl}asTeacher/${joinString}`, options);
    }

    public deleteClassroom(classroomId: number): Observable<void>{   
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };     
        return this.http.delete<void>(`${this.apiServerUrl}${classroomId}`, options);
    }
}