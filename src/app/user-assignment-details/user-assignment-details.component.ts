import { Component, OnInit } from '@angular/core';
import {UserAssignment} from "../model/user-assignment";
import {UserAssignmentService} from "../service/user-assignment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {Answer} from "../model/answer";
import {AnswerService} from "../service/answer.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-assignment-details',
  templateUrl: './user-assignment-details.component.html',
  styleUrls: ['./user-assignment-details.component.css']
})
export class UserAssignmentDetailsComponent implements OnInit {

  userAssignment!: UserAssignment;
  materialId!: number;
  id!: number;
  answers: Answer[] | undefined;

  userRole!: string;
  helper = new JwtHelperService();
  answerForm: FormGroup = this.formBuilder.group({
    text: ''
  });

  constructor(
    private userAssignmentService: UserAssignmentService,
    private answerService: AnswerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.materialId = parseInt(this.activatedRoute.snapshot.paramMap.get('materialId') || '');
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('assignmentId') || '');
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.getUserAssignment();
    this.getAnswers();
  }

  getUserAssignment() {
    this.userAssignmentService.getUserAssignmentById(this.materialId, this.id).subscribe(
      (response: UserAssignment) => {
        this.userAssignment = response;
      }
    )
  }

  getSubmissionDate(userAssignment: UserAssignment): String {
    return userAssignment.submissionDate == null ? "Not submitted yet" : formatDate(userAssignment.submissionDate, "MMM dd, yyyy, HH:mm", "en-US");
  }

  getAnswers() {
    this.answerService.getAnswersByUserAssignment(this.id).subscribe(
      (response: Answer[]) => {
        this.answers = response;
      }
    )
  }

  deleteUserAssignment() {
    this.userAssignmentService.deleteUserAssignment(this.materialId, this.id).subscribe();
    this.router.navigateByUrl('/materials/' + this.materialId + '/assignments')
      .then(() => {
        window.location.reload();
      });
  }

  createAnswer() {
    let answer = new Answer();
    answer.userAssignmentId = this.id;
    answer.text = this.answerForm.get('text')?.value;
    this.answerService.createAnswer(this.id, answer).subscribe(() => window.location.reload());
  }

  deleteAnswer(answerId: number) {
    this.answerService.deleteAnswer(this.userAssignment.id, answerId).subscribe();
    window.location.reload();
  }

  isSubmissionAllowed(): boolean {
    let result = new Date(this.userAssignment.dueDate) > new Date();
    if (!result) {
      this.answerForm.disable();
    }
    return result;
  }
}
