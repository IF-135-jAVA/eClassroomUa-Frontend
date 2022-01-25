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
import { take } from 'rxjs';


@Component({
  selector: 'app-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.css']
})
export class ViewClassroomComponent implements OnInit {

  students: User[] | undefined;
  teachers: User[] | undefined;
  owner: User | undefined;
  classroom: Classroom | undefined;
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
              private formBuilder: FormBuilder)
  {

  }

  ngOnInit(): void {
    this.classroomService.getClassroomUsers(JSON.parse(localStorage.getItem(environment.classroom) || ''), 'teachers').subscribe(
      (response: User[]) => this.teachers = response);
    this.classroomService.getClassroomUsers(JSON.parse(localStorage.getItem(environment.classroom) || ''), 'students').subscribe(
      (response: User[]) => this.students = response);
    this.classroomService.getClassroomOwner(JSON.parse(localStorage.getItem(environment.classroom) || '')).subscribe(
      (response: User) => this.owner = response);
    this.classroom = JSON.parse(localStorage.getItem(environment.classroom) || '');
    this.announcementService.getAnnouncementsByClassroom(JSON.parse(localStorage.getItem(environment.classroom) || '')).pipe(take(1)).subscribe(
      (response: Announcement[]) => {
        this.announcements = response;
        response.forEach(ann =>
          this.commentService.getCommentsByAnnouncement(ann.id).pipe(take(1)).subscribe(
            (response2: Comments[]) => ann.comments = response2))
      });
  }

  logg(text: string){
    console.log(text);
  }

  readLocalStorageValue(key: string) {
    return localStorage.getItem(key);
  }

  getOwner(){
    return this.owner;
  }

  sendAnnouncement(){
    this.classroom = JSON.parse(localStorage.getItem(environment.classroom) || '');
    let announcement = new Announcement();
    announcement.courseId = this.classroom?.classroomId || 0;
    announcement.text = this.announcementForm.get(['text'])?.value;
    console.log(announcement);
    console.log(this.classroom);
    this.announcementService.createAnnouncement(this.classroom || new Classroom, announcement);
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

  deleteAnnouncement(announcement: Announcement){
    this.announcementService.deleteAnnouncement(this.classroom || new Classroom, announcement.id);
  }

}
