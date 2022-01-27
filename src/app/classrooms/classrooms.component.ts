import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classroom } from '../model/classroom';
import { User } from '../model/user';
import { ClassroomService } from '../service/classroom.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {
  createForm: FormGroup = this.formBuilder.group({
    title: '',
    session: '',
    description: ''
  });

  joinForm: FormGroup = this.formBuilder.group({
    code: ''
  });

  errorMessage = '';
  closeResult = '';
  helper = new JwtHelperService();
  userId! : number;
  userRole! : String;

  classrooms: Classroom[] | undefined;

  constructor(
    private classroomService: ClassroomService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.getClassrooms();
    
    this.createForm = this.formBuilder.group({
      title: '',
      session: '',
      description: '',
      userId: this.userId
    });
  }

  getClassrooms(){
    if(this.userRole === 'STUDENT'){
      this.classroomService.getClassroomsByStudent(this.userId).subscribe(
        (response: Classroom[]) => {
          console.log("Response student is " + response);
          this.classrooms = response;
        }
      )
    }
    else if(this.userRole === 'TEACHER')
    {
      this.classroomService.getClassroomsByTeacher(this.userId).pipe(take(1)).subscribe(
        (response: Classroom[]) => {
          console.log("Response techer is " + response);
          this.classrooms = response;
        }
      )
    } 
  }

  joinModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  createModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title1'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  
  logg(text: string){
    console.log(text);
  }

  join() {
    let user : User = JSON.parse(localStorage.getItem(environment.user) || '');
    if(localStorage.getItem(environment.role) === 'student'){
      this.classroomService.joinClassroomAsStudent(this.joinForm.value.code, user.id).subscribe(
        (response: Classroom) => {
          this.open(response);
        });
    }
    else if(localStorage.getItem(environment.role) === 'teacher')
    {
      this.classroomService.joinClassroomAsTeacher(this.joinForm.value.code, user.id).subscribe(
        (response: Classroom) => {
          this.open(response);
        });
    } 
 }

  create() {
    let createdClassroom: Classroom = new Classroom();
    this.classroomService.addClassroom(this.createForm.getRawValue()).subscribe(
      (response: Classroom) => {
        createdClassroom = response;
      });
    this.open(createdClassroom);
  }

  

  open(classroom: Classroom) {
    this.classroomService.getClassroomById(classroom.classroomId).subscribe(
      (response: Classroom) => {
        localStorage.setItem(environment.classroom, JSON.stringify(classroom));
        this.router.navigate(['/classroom']);
      });
  }
}

