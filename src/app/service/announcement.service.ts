import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {FormBuilder} from '@angular/forms';
import {Announcement} from '../model/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private apiServerUrl = environment.api + 'classrooms/';

  jwtString: string | undefined;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) {

  }

  public createAnnouncement(classroomId: string, announcement: Announcement): Observable<Announcement> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = {headers: headers};
    return this.http.post<Announcement>(`${this.apiServerUrl}${classroomId}/announcements`, announcement, options)
  }

  public getAnnouncementsByClassroom(classroomId: string): Observable<Announcement[]> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = {headers: headers};
    return this.http.get<Announcement[]>(`${this.apiServerUrl}${classroomId}/announcements`, options)
  }

  public getAnnouncementById(classroomId: string, announcementId: number): Observable<Announcement> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = {headers: headers};
    return this.http.get<Announcement>(`${this.apiServerUrl}${classroomId}/announcements/${announcementId}`, options)
  }

  public deleteAnnouncement(classroomId: string, announcementId: number) {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = {headers: headers};
    return this.http.delete(`${this.apiServerUrl}${classroomId}/announcements/${announcementId}`, options)
  }

  public updateAnnouncement(classroomId: string, announcementId: number, announcement: Announcement): Observable<Announcement> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = {headers: headers};
    return this.http.put<Announcement>(`${this.apiServerUrl}${classroomId}/announcements/${announcementId}`,announcement, options)
  }

}













