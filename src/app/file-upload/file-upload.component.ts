import {Component, Input, OnInit} from '@angular/core';
import {FileUploadService} from "../service/file-upload.service";
import {ActivatedRoute} from "@angular/router";
import {AnswerFile} from "../model/answer-file";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() isSubmissionAllowed!: boolean;
  userAssignmentId!: number;
  answerFiles: AnswerFile[] | undefined;
  userRole!: string;
  helper = new JwtHelperService();

  constructor(
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userAssignmentId = parseInt(this.activatedRoute.snapshot.paramMap.get('assignmentId') || '');
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.getAnswerFiles();
  }

  getAnswerFiles() {
    this.fileUploadService.getAnswerFilesByUserAssignment(this.userAssignmentId).subscribe(
      (response: AnswerFile[]) => {
        this.answerFiles = response;
      }
    )
  }

  getAnswerFileById(answerFile: AnswerFile) {
    this.fileUploadService.getAnswerFileById(this.userAssignmentId, answerFile.id).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl;
      a.download = answerFile.fileName;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      this.fileUploadService.createAnswerFile(this.userAssignmentId, formData).subscribe(() => this.getAnswerFiles());
    }
  }

}
