import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Answer} from "../model/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiServerUrl = environment.api + 'assignments/';

  jwtString: string | undefined;

  constructor(
    private http: HttpClient
  ) { }

  public createAnswer(userAssignmentId: number, answer: Answer): Observable<Answer>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.post<Answer>(`${this.apiServerUrl}${userAssignmentId}/answers`, answer, options);
  }

  public deleteAnswer(userAssignmentId: number, answerId: number): Observable<void> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.delete<void>(`${this.apiServerUrl}${userAssignmentId}/answers/${answerId}`, options);
  }

  public getAnswersByUserAssignment(userAssignmentId: number): Observable<Answer[]> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<Answer[]>(`${this.apiServerUrl}${userAssignmentId}/answers`, options);
  }
}
