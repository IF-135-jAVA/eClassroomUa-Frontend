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
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  assignmentStatuses!: String[];
  assignmentStatusesSelectable!: String[];

  userRole!: string;
  helper = new JwtHelperService();
  answerForm: FormGroup = this.formBuilder.group({
    text: ''
  });
  answerUpdateForm: FormGroup = this.formBuilder.group({
    id: 0,
    text: ''
  });
  feedbackForm: FormGroup = this.formBuilder.group({
    feedback: ''
  });

  constructor(
    private userAssignmentService: UserAssignmentService,
    private answerService: AnswerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.materialId = parseInt(this.activatedRoute.snapshot.paramMap.get('materialId') || '');
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('assignmentId') || '');
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.getUserAssignment();
    this.getAnswers();
    this.assignmentStatuses = ['In progress', 'Reviewed', 'Done'];
    this.assignmentStatusesSelectable = ['In progress', 'Done'];
  }

  getUserAssignment() {
    this.userAssignmentService.getUserAssignmentById(this.materialId, this.id).subscribe(
      (response: UserAssignment) => {
        this.userAssignment = response;
      }
    )
  }

  getGrades(): number[] {
    return Array.from(Array(this.userAssignment.maxScore + 1).keys());
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
    this.answerService.createAnswer(this.id, answer).subscribe(() => {
      this.getAnswers();
      this.getUserAssignment();
      this.answerForm.reset();
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  updateFeedback() {
    let userAssignment = new UserAssignment();
    userAssignment.feedback = this.feedbackForm.get('feedback')?.value;
    userAssignment.grade = this.userAssignment.grade;
    this.userAssignmentService.updateUserAssignmentAsTeacher(this.materialId, this.id, userAssignment).subscribe(() => this.getUserAssignment());
  }

  updateGrade(event: any) {
    let userAssignment = new UserAssignment();
    userAssignment.grade = event.value;
    userAssignment.feedback = this.userAssignment.feedback;
    this.userAssignmentService.updateUserAssignmentAsTeacher(this.materialId, this.id, userAssignment).subscribe(() => this.getUserAssignment());
  }

  getAssignmentStatus(): String {
    return this.assignmentStatuses[this.userAssignment.assignmentStatusId - 1];
  }

  updateAssignmentStatus(event: any) {
    let userAssignment = new UserAssignment();
    userAssignment.assignmentStatusId = this.assignmentStatuses.indexOf(event.value) + 1;
    this.userAssignmentService.updateUserAssignmentAsStudent(this.materialId, this.id, userAssignment).subscribe(() => this.getUserAssignment());
  }

  updateAnswer() {
    let answer = new Answer();
    let id = this.answerUpdateForm.get('id')?.value;
    answer.text = this.answerUpdateForm.get('text')?.value;
    this.answerService.updateAnswer(this.id, id, answer).subscribe(() => {
      this.getAnswers();
      this.getUserAssignment();
    });
  }

  deleteAnswer(answerId: number) {
    this.answerService.deleteAnswer(this.userAssignment.id, answerId).subscribe(() => {
      this.getAnswers();
      this.getUserAssignment();
    });
  }

  isSubmissionAllowed(): boolean {
    let result = new Date(this.userAssignment.dueDate) > new Date();
    if (!result) {
      this.answerForm.disable();
    }
    return result;
  }
}
