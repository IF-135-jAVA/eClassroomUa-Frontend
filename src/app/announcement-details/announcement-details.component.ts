import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Announcement} from '../model/announcement';
import {Comments} from '../model/comment';
import {AnnouncementService} from '../service/announcement.service';
import {CommentService} from '../service/comment.service';
import {UserService} from '../service/user.service';
import {formatDate} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit {
  id!: number;

  classroomId!: string;

  announcementId!: number;

  announcement$!: Observable<Announcement>;

  comments$!: Observable<Comments[]>;

  userId!: number;

  userRole!: string;

  helper = new JwtHelperService();

  commentForm: FormGroup = this.formBuilder.group({
    text: ''
  });

  commentUpdateForm: FormGroup = this.formBuilder.group({
    id: 0,
    text: ''
  });
  constructor(private announcementService: AnnouncementService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private commentService: CommentService,
              private route: ActivatedRoute) {
    this.id = parseInt(this.route.snapshot.paramMap.get('commentId') || '');

    this.classroomId = (this.route.snapshot.paramMap.get('classroomId') || '');
    this.announcementId = parseInt(this.route.snapshot.paramMap.get('announcementId') || '');
    this.userId = this.helper.decodeToken(localStorage.getItem(environment.tokenName) || '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName) || '').role;
  }

  ngOnInit(): void {
    this.announcement$ = this.announcementService.getAnnouncementById(this.classroomId, this.announcementId);
    this.getAllComments();
  }

  getAllComments() {
    this.comments$ = this.commentService.getCommentsByAnnouncement(this.announcementId);
  }

  sendComment() {
    let comment = new Comments();
    comment.text = this.commentForm.get(['text'])?.value;
    comment.announcementId = this.announcementId;
    comment.authorId = this.userId;
    this.commentService.createComment(comment, comment.authorId).subscribe(() => this.getAllComments());
  }

   deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.getAllComments();
    });
  }

  getUserById(id: number) {
    return this.userService.getUserById(id);
  }

  exitForm() {
    this.commentForm.reset();
  }

  getDate(comment: Comments): String {
     return formatDate(comment.date, " dd.MM.yyyy HH:mm", "en-US");
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  updateComment() {
    let comment = new Comments();
    let id = this.commentUpdateForm.get('id')?.value;
    comment.text = this.commentUpdateForm.get('text')?.value;
    this.commentService.updateComment(this.id, id, comment).subscribe(() => this.getAllComments());
  }
}










