import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classroom } from '../model/classroom';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Level} from "../model/level";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private apiServerUrl = environment.api +'classrooms/';

  jwtString: string | undefined;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder)
  {

  }

  public createLevel(level: Level, classroomId: string,  topicId: number, materialId: number, criterionId: number): Observable<Level>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    console.log(level.criterionId+level.title+level.description)
    return this.http.post<Level>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}/level`, level, options)

  }


  public getAllLevels(classroomId: string, topicId: number, materialId: number, criterionId: number): Observable<Level[]>{

    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<Level[]>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}/level`, options)
  }

  public getLevelById(classroomId: string, topicId: number, materialId: number, criterionId: number, levelId: number): Observable<Level>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<Level>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}/level/${levelId}`, options)

  }

  public deleteLevel( classroomId: string, topicId: number, materialId: number, criterionId: number, levelId: number){
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.delete(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}/level/${levelId}`, options)
  }
  public updateLevel( classroomId: string, topicId: number, materialId: number, criterionId: number, levelId: number, levelTitle: string, levelDesc: string, levelMark: number, level: Level){
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.put(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}/level${levelId}`, level, options)
  }

  // public updateLevel( classroomId: string, topicId: number, materialId: number, criterionId: number, level: Level){
  //   this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
  //   let headers = new HttpHeaders().set('Authorization', this.jwtString);
  //   let options = { headers: headers };
  //   return this.http.put(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}/criterions/${criterionId}/level/`, level, options)
  // }
}
