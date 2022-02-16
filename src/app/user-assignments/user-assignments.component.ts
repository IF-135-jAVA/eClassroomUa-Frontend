import { Component, OnInit } from '@angular/core';
import {UserAssignment} from "../model/user-assignment";
import {UserAssignmentService} from "../service/user-assignment.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {formatDate} from "@angular/common";
import {MaterialService} from "../service/material.service";
import {Material} from "../model/material";
import {Topic} from "../model/topic";
import {AssignmentStatus} from "../model/assignment-status";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-user-assignments',
  templateUrl: './user-assignments.component.html',
  styleUrls: ['./user-assignments.component.css']
})
export class UserAssignmentsComponent implements OnInit {

  userAssignments: UserAssignment[] | undefined;
  users!: User[];
  materialId!: number;
  materialTitle!: String;

  userId!: number;
  userRole!: string;
  helper = new JwtHelperService();

  constructor(
    private userAssignmentService: UserAssignmentService,
    private userService: UserService,
    private materialService: MaterialService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.materialId = parseInt(this.activatedRoute.snapshot.paramMap.get('materialId') || '');
    this.userId = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.getUsers();
    this.getUserAssignments();
    this.getMaterialTitle();
  }

  getUserAssignments() {
    this.userAssignmentService.getUserAssignmentsByAssignment(this.materialId).subscribe(
      (response: UserAssignment[]) => {
        this.userAssignments = response;
      }
    )
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      }
    )
  }

  getUser(id: number): String {
    let user = this.users.find(user => user.id === id);
    if(user) {
      return user.firstName + " " + user.lastName;
    }
    return "";
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

  createUserAssignment() {
    let userAssignment = new UserAssignment();
    userAssignment.userId = this.userId;
    this.userAssignmentService.createUserAssignment(this.materialId, userAssignment).subscribe(
      (response: UserAssignment) => this.router.navigateByUrl('/materials/' + this.materialId + '/assignments/' + response.id)
    );
  }
}
