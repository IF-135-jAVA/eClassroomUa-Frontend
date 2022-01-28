import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classroom } from '../model/classroom';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Announcement } from '../model/announcement';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {
    private apiServerUrl = environment.api + 'classrooms/';

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public createAnnouncement(classroomId: number, announcement: Announcement): Observable<Announcement>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.post<Announcement>(`${this.apiServerUrl}${classroomId}/announcements`, announcement, options)
    }

    public getAnnouncementsByClassroom(classroomId: number): Observable<Announcement[]>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.get<Announcement[]>(`${this.apiServerUrl}${classroomId}/announcements`, options)
    }

    public getAnnouncementById(classroomId: number, announcementId: number): Observable<Announcement>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.get<Announcement>(`${this.apiServerUrl}${classroomId}/announcements/${announcementId}`, options)
    }

    public deleteAnnouncement(classroomId: number, announcementId: number){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.delete(`${this.apiServerUrl}${classroomId}/announcements/${announcementId}`, options)
    }
}