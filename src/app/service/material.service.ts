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

    public createMaterial(topic: Topic, material: Material): Observable<Material>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.post<Material>(`${this.apiServerUrl}${topic.classroomId}/topics/${topic.id}/materials`, material, options)
    }

    public getMaterialsByTopic(topic: Topic): Observable<Material[]>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.get<Material[]>(`${this.apiServerUrl}${topic.classroomId}/topics/${topic.id}/materials`, options)
    }

    public getMaterialById(topic: Topic, materialId: number): Observable<Material>{
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.get<Material>(`${this.apiServerUrl}${topic.classroomId}/topics/${topic.id}/materials/${materialId}`, options)
    }

    public deleteMaterial(topic: Topic, materialId: number){
        this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
        let headers = new HttpHeaders().set('Authorization', this.jwtString);
        let options = { headers: headers };  
        return this.http.delete(`${this.apiServerUrl}${topic.classroomId}/topics/${topic.id}/materials/${materialId}`, options)
    }
}