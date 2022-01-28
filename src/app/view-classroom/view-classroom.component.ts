import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Announcement } from '../model/announcement';
import { Classroom } from '../model/classroom';
import { User } from '../model/user';
import { Comments } from '../model/comment';
import { ClassroomService } from '../service/classroom.service';
import { CommentService } from '../service/comment.service';
import { AnnouncementService } from '../service/announcement.service';
import { Observable, take } from 'rxjs';
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
  classroom: Classroom | undefined;
  classroom$!: Observable<Classroom>;
  announcements: Announcement[] | undefined;
  announcementForm: FormGroup = this.formBuilder.group({
    text: ''
  });
  commentForm: FormGroup = this.formBuilder.group({
    text: ''
  });

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
    this.classroom = JSON.parse(localStorage.getItem(environment.classroom) || '');
    this.announcementService.getAnnouncementsByClassroom(id).pipe(take(1)).subscribe(
      (response: Announcement[]) => {
        this.announcements = response;
        response.forEach(ann =>
          this.commentService.getCommentsByAnnouncement(ann.id).pipe(take(1)).subscribe(
            (response2: Comments[]) => ann.comments = response2))
      });
  }

  readLocalStorageValue(key: string) {
    return localStorage.getItem(key);
  }

  sendComment(announcement: Announcement){
    this.classroom = JSON.parse(localStorage.getItem(environment.classroom) || '');
    let comment = new Comments();
    comment.text = this.commentForm.get(['text'])?.value;
    comment.announcementId = announcement.id;
    let author: User = JSON.parse(localStorage.getItem(environment.user) || '')
    comment.authorId = author.id;
    this.commentService.createComment(comment, comment.authorId);
  }

  deleteComment(comment: Comments){
    this.commentService.deleteComment(comment.id);
  }

  

}
