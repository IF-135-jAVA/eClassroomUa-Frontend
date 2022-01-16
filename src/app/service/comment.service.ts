import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Announcement } from '../model/announcement';
import { Material } from '../model/material';
import { UserAssignment } from '../model/user-assignment';
import { Comments } from '../model/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiServerUrl = environment.api;

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public createComment(comment: Comments, userId: number): Observable<Comments>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.post<Comments>(`${this.apiServerUrl}users/${userId}/comments`, comment, options);
    }

    public getCommentsByAnnouncement(announcementId: number): Observable<Comments[]>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        console.log(this.http.get<Comments[]>(`${this.apiServerUrl}announcements/${announcementId}/announcementComments`, options));
        return this.http.get<Comments[]>(`${this.apiServerUrl}announcements/${announcementId}/announcementComments`, options);
    }

    public getCommentsByMaterial(material: Material): Observable<Comments[]>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.get<Comments[]>(`${this.apiServerUrl}materials/${material.id}/materialComments`, options)
    }

    public getCommentsByUserAssignment(assignment: UserAssignment): Observable<Comments[]>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.get<Comments[]>(`${this.apiServerUrl}user-assignments/${assignment.id}/userAssignmentComments`, options)
    }

    public getCommentById(commentId: number): Observable<Comments>{
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.get<Comments>(`${this.apiServerUrl}comments/${commentId}`, options)
    }

    public deleteComment(commentId: number){
        this.jwtString = '' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        console.log(`${this.apiServerUrl}comments/${commentId}`);
        return this.http.delete<Comments>(`${this.apiServerUrl}comments/${commentId}`, options)
    }
}