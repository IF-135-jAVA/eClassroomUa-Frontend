import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnswerFile} from "../model/answer-file";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiServerUrl = environment.api + 'assignments/';

  jwtString: string | undefined;

  constructor(
    private http: HttpClient
  ) { }

  public createAnswerFile(userAssignmentId: number, formData: FormData): Observable<AnswerFile>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.post<AnswerFile>(`${this.apiServerUrl}${userAssignmentId}/files`, formData, options);
  }

  public getAnswerFileById(userAssignmentId: number, answerFileId: number): Observable<Blob> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers, responseType: 'blob' as 'json' };
    return this.http.get<Blob>(`${this.apiServerUrl}${userAssignmentId}/files/${answerFileId}`, options);
  }

  public getAnswerFilesByUserAssignment(userAssignmentId: number): Observable<AnswerFile[]> {
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<AnswerFile[]>(`${this.apiServerUrl}${userAssignmentId}/files`, options);
  }
}
