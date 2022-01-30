import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classroom } from '../model/classroom';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Criterion} from "../model/criterion";

@Injectable({
    providedIn: 'root'
})
export class CriterionService {
    private apiServerUrl = environment.api + 'classrooms/{classroomId}/topics/{topicId}/materials/{materialId}/criterions/';

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public createCriterion(criterion: Criterion, classroomId: number,  topicId: number, materialId: number): Observable<Criterion>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.post<Criterion>(`${this.apiServerUrl}`, options)

    }

    public getAllCriterions(): Observable<Criterion[]>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Criterion[]>(`${this.apiServerUrl}`, options)
    }

    public getCriterionById(classroomId: number, topicId: number, materialId: number, criterionId: number): Observable<Criterion>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Criterion>(`${this.apiServerUrl}/${criterionId}`, options)

    }

    public deleteAnnouncement( criterionId: number, classroomId: number, topicId: number, materialId: number){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.delete(`${this.apiServerUrl}/${criterionId}`, options)
    }
}
