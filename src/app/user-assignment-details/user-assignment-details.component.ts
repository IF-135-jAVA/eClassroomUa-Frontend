import { Component, OnInit } from '@angular/core';
import {UserAssignment} from "../model/user-assignment";
import {UserAssignmentService} from "../service/user-assignment.service";
import {ActivatedRoute} from "@angular/router";
import {Topic} from "../model/topic";
import {Material} from "../model/material";
import {formatDate} from "@angular/common";
import {AssignmentStatus} from "../model/assignment-status";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {MaterialService} from "../service/material.service";
import {Answer} from "../model/answer";
import {AnswerService} from "../service/answer.service";

@Component({
  selector: 'app-user-assignment-details',
  templateUrl: './user-assignment-details.component.html',
  styleUrls: ['./user-assignment-details.component.css']
})
export class UserAssignmentDetailsComponent implements OnInit {

  userAssignment!: UserAssignment;
  materialId!: number;
  id!: number;
  materialTitle!: String;
  userName!: String;
  answers: Answer[] | undefined;

  constructor(
    private userAssignmentService: UserAssignmentService,
    private userService: UserService,
    private materialService: MaterialService,
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) {
    this.materialId = parseInt(this.route.snapshot.paramMap.get('materialId') || '');
    this.id = parseInt(this.route.snapshot.paramMap.get('assignmentId') || '');
  }

  ngOnInit(): void {
    this.getUserAssignment();
    this.getMaterialTitle();
    this.getAnswers();
  }

  getUserAssignment() {
    this.userAssignmentService.getUserAssignmentById(this.materialId, this.id).subscribe(
      (response: UserAssignment) => {
        this.userAssignment = response;
        this.getUserName();
      }
    )
  }

  getUserName() {
    this.userService.getUserById(this.userAssignment.userId).subscribe(
      (response: User) => {
        this.userName = response.firstName + " " + response.lastName;
      }
    )
  }

  getMaterialTitle() {
    this.materialService.getMaterialById(new Topic(), this.materialId).subscribe(
      (response: Material) => {
        this.materialTitle = response.title;
      }
    )
  }

  getSubmissionDate(userAssignment: UserAssignment): String {
    return userAssignment.submissionDate == null ? "Not submitted yet" : formatDate(userAssignment.submissionDate, "medium", "en-US");
  }

  getAssignmentStatus(value: number): String {
    return AssignmentStatus[value];
  }

  getAnswers() {
    this.answerService.getAnswersByUserAssignment(this.id).subscribe(
      (response: Answer[]) => {
        this.answers = response;
      }
    )
  }

}
