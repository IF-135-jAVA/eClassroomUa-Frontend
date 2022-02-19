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
    private apiServerUrl = environment.api +'classrooms/';

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public createCriterion(criterion: Criterion, classroomId: string,  topicId: number, materialId: number): Observable<Criterion>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        console.log(criterion.materialId+criterion.title+criterion.description)
          return this.http.post<Criterion>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/`,criterion, options)

    }


    public getAllCriterions(classroomId: string, topicId: number, materialId: number): Observable<Criterion[]>{

        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Criterion[]>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/`, options)
    }

    public getCriterionById(classroomId: string, topicId: number, materialId: number, criterionId: number): Observable<Criterion>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Criterion>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}`, options)

    }

    public deleteCriterion( criterionId: number, classroomId: string, topicId: number, materialId: number){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.delete(`${this.apiServerUrl}/${criterionId}`, options)
    }
}
