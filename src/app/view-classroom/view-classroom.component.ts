import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Classroom } from '../model/classroom';
import { User } from '../model/user';
import { ClassroomService } from '../service/classroom.service';
import { CommentService } from '../service/comment.service';
import { AnnouncementService } from '../service/announcement.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.css']
})
export class ViewClassroomComponent implements OnInit {

  students$!: Observable<User[]>;

  teachers$!: Observable<User[]>;

  owner$!: Observable<User>;
  
  classroom$!: Observable<Classroom>;

  constructor(private classroomService: ClassroomService,
              private commentService: CommentService,
              private announcementService: AnnouncementService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute)
  {

  }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
    this.classroom$ = this.classroomService.getClassroomById(id);
    this. teachers$ = this.classroomService.getClassroomUsers(id, 'teachers');
    this.students$ = this.classroomService.getClassroomUsers(id, 'students');
    this.owner$ = this.classroomService.getClassroomOwner(id);
  }

  readLocalStorageValue(key: string) {
    return localStorage.getItem(key);
  }

}
