import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classroom } from '../model/classroom';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Criterion} from "../model/criterion";
import {Level} from "../model/level";

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

    public deleteCriterion(  classroomId: string, topicId: number, materialId: number, criterionId: number,){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.delete(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}`, options)
    }

    public updateCriterion( classroomId: string, topicId: number, materialId: number, criterionId: number, criterion: Criterion): Observable<Criterion>{
      this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
      let headers = new HttpHeaders().set('Authorization', this.jwtString);
      let options = { headers: headers };
      console.log(criterionId)
      return this.http.put<Criterion>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}`, criterion, options)
    }
}
