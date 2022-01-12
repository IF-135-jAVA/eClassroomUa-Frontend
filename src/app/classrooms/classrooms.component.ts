import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  form: FormGroup = this.formBuilder.group({
    title: '',
    session: '',
    description: ''
  });

  errorMessage = '';
  closeResult = '';

  classrooms: Classroom[] | undefined;

  constructor(
    private classroomService: ClassroomService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.getClassrooms();
    let user : User = JSON.parse(localStorage.getItem(environment.user) || '');
    this.form = this.formBuilder.group({
      title: '',
      session: '',
      description: '',
      userId: user.id
    });
  }

  getClassrooms(){
    let user : User = JSON.parse(localStorage.getItem(environment.user) || '');
    if(localStorage.getItem(environment.role) === 'student'){
      this.classroomService.getClassroomsByStudent(user.id).subscribe(
        (response: Classroom[]) => {
          this.classrooms = response;
        }
      )
    }
    else if(localStorage.getItem(environment.role) === 'teacher')
    {
      this.classroomService.getClassroomsByTeacher(user.id).subscribe(
        (response: Classroom[]) => {
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

  join(code: String, userId: number) {
    if(localStorage.getItem(environment.role) === 'student'){
      this.classroomService.joinClassroomAsStudent(code, userId).subscribe(
        (response: Classroom) => {
          this.open(response);
        });
    }
    else if(localStorage.getItem(environment.role) === 'teacher')
    {
      this.classroomService.joinClassroomAsTeacher(code, userId).subscribe(
        (response: Classroom) => {
          this.open(response);
        });
    } 
 }

  create() {
    let createdClassroom: Classroom = new Classroom();
    this.classroomService.addClassroom(this.form.getRawValue()).subscribe(
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

