import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classroom } from '../model/classroom';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Announcement } from '../model/announcement';
import {Criterion} from "../model/criterion";
import {Topic} from "../model/topic";
import {Material} from "../model/material";

@Injectable({
    providedIn: 'root'
})
export class CriterionService {
    private apiServerUrl = environment.api + 'classrooms/';

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public createCriterion(classroom: Classroom, criterion: Criterion, topic: Topic, material: Material): Observable<Criterion>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.post<Criterion>(`${this.apiServerUrl}${classroom.classroomId}/topics${topic.id}/materials/{materialId}/criterion${criterion.id}`, options)

    }

    public getCriterionsByMaterial(classroom: Classroom): Observable<Criterion[]>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Criterion[]>(`${this.apiServerUrl}${classroom.classroomId}/announcements`, options)
    }

    public getCriterionById(classroom: Classroom, criterionId: number): Observable<Announcement>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Announcement>(`${this.apiServerUrl}${classroom.classroomId}/topics${topicId}/materials${materialId}/criterions${criterionId}`, options)
    }

    public deleteAnnouncement(classroom: Classroom, announcementId: number){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.delete(`${this.apiServerUrl}${classroom.classroomId}/announcements/${announcementId}`, options)
    }
}
