import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classroom } from '../model/classroom';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Announcement } from '../model/announcement';
import { Topic } from '../model/topic';

@Injectable({
    providedIn: 'root'
})
export class TopicService {
    private apiServerUrl = environment.api + 'classrooms/{classroomId}/topics/';

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public createTopic(topic: Topic, classroomId: number): Observable<Topic>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.post<Topic>(`${this.apiServerUrl}${classroomId}/`, topic, options)
    }

    public getAllTopics(topicId: number): Observable<Topic[]>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Topic[]>(`${this.apiServerUrl}/`, options)
    }

    public getTopicById(classroomId: number, topicId: number): Observable<Topic>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Topic>(`${this.apiServerUrl}/${topicId}`, options)
    }

    public deleteTopic( classroomId: Classroom, topicId: number){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.delete(`${this.apiServerUrl}${classroomId}/topics/${topicId}`, options)
    }
}
