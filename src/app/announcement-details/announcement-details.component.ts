import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Announcement } from '../model/announcement';
import { Comments } from '../model/comment';
import { AnnouncementService } from '../service/announcement.service';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit {

  classroomId! : number;

  announcementId! : number;

  announcement$! : Observable<Announcement>;

  comments$! : Observable<Comments[]>;

  constructor(private announcementService: AnnouncementService,
              private commentService: CommentService,
              private route: ActivatedRoute) {
                this.classroomId = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
                this.announcementId = parseInt(this.route.snapshot.paramMap.get('announcementId') || '');
              }

  ngOnInit(): void {
    this.announcement$ = this.announcementService.getAnnouncementById(this.classroomId, this.announcementId);
    this.comments$ = this.commentService.getCommentsByAnnouncement(this.announcementId);
  } 

}
