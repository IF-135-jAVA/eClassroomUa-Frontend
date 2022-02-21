import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Topic } from '../model/topic';
import { Material } from '../model/material';

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private apiServerUrl = environment.api + 'classrooms/';

    jwtString: string | undefined;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder)
    {

    }

    public createMaterial(classroomId: string, topicId: number, material: Material): Observable<Material>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.post<Material>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials`, material, options)
    }

    public update(classroomId: string, topicId: number, material: Material): Observable<Material>{
        
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        console.log(material.id)
        return this.http.put<Material>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials`, material, options)
    }

    public getMaterialsByTopic(classroomId: string, topicId: number): Observable<Material[]>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Material[]>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials`, options)
    }

    public getMaterialById(classroomId: string, topicId: number, materialId: number): Observable<Material>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.get<Material>(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}`, options)
    }

    public deleteMaterial(classroomId: string, topicId: number, materialId: number){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };
        return this.http.delete(`${this.apiServerUrl}${classroomId}/topics/${topicId}/materials/${materialId}`, options)
    }
}
