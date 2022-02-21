import { Component, OnInit } from '@angular/core';
import {UserAssignment} from "../model/user-assignment";
import {UserAssignmentService} from "../service/user-assignment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {MaterialService} from "../service/material.service";
import {Material} from "../model/material";

@Component({
  selector: 'app-user-assignments',
  templateUrl: './user-assignments.component.html',
  styleUrls: ['./user-assignments.component.css']
})
export class UserAssignmentsComponent implements OnInit {

  userAssignments: UserAssignment[] | undefined;
  materialId!: number;
  assignmentStatuses!: String[];
  userId!: number;
  userRole!: string;
  helper = new JwtHelperService();
  isSubmissionAllowed!: boolean;

  constructor(
    private materialService: MaterialService,
    private userAssignmentService: UserAssignmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.materialId = parseInt(this.activatedRoute.snapshot.paramMap.get('materialId') || '');
    this.userId = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.getUserAssignments();
    this.assignmentStatuses = ['In progress', 'Reviewed', 'Done'];
    this.getSubmissionAllowed();
  }

  getUserAssignments() {
    this.userAssignmentService.getUserAssignmentsByAssignment(this.materialId).subscribe(
      (response: UserAssignment[]) => {
        this.userAssignments = response;
      }
    )
  }

  getMaterialTitle(): String {
    if(this.userAssignments != null && this.userAssignments.length > 0) {
      return this.userAssignments[0].materialTitle;
    }
    else {
      return "";
    }
  }

  getAssignmentStatus(assignmentStatusId: number): String {
    return this.assignmentStatuses[assignmentStatusId - 1];
  }

  getSubmissionDate(userAssignment: UserAssignment): String {
    return userAssignment.submissionDate == null ? "Not submitted yet" : formatDate(userAssignment.submissionDate, "MMM dd, yyyy, HH:mm", "en-US");
  }

  createUserAssignment() {
    let userAssignment = new UserAssignment();
    userAssignment.userId = this.userId;
    this.userAssignmentService.createUserAssignment(this.materialId, userAssignment).subscribe(
      (response: UserAssignment) => this.router.navigateByUrl('/materials/' + this.materialId + '/assignments/' + response.id)
    );
  }

  getSubmissionAllowed() {
    this.materialService.getMaterialById('e', 0, this.materialId).subscribe(
      (response: Material) => {
        this.isSubmissionAllowed = new Date(response.dueDate) > new Date();
      }
    )
  }
}
