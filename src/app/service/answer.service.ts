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

  public getAnswersByUserAssignment(userAssignmentId: number): Observable<Answer[]> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<Answer[]>(`${this.apiServerUrl}${userAssignmentId}/answers`, options);
  }
}
