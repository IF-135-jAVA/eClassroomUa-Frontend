import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAssignment} from "../model/user-assignment";

@Injectable({
  providedIn: 'root'
})
export class UserAssignmentService {
  private apiServerUrl = environment.api + 'materials/';

  jwtString: string | undefined;

  constructor(
    private http: HttpClient
  ) { }

  public createUserAssignment(materialId: number, userAssignment: UserAssignment): Observable<UserAssignment>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.post<UserAssignment>(`${this.apiServerUrl}${materialId}/assignments`, userAssignment, options);
  }

  public getUserAssignmentById(materialId: number, userAssignmentId: number): Observable<UserAssignment> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<UserAssignment>(`${this.apiServerUrl}${materialId}/assignments/${userAssignmentId}`, options);
  }

  public deleteUserAssignment(materialId: number, userAssignmentId: number): Observable<void> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.delete<void>(`${this.apiServerUrl}${materialId}/assignments/${userAssignmentId}`, options);
  }

  public getUserAssignmentsByAssignment(materialId: number): Observable<UserAssignment[]> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<UserAssignment[]>(`${this.apiServerUrl}${materialId}/assignments`, options);
  }
}
