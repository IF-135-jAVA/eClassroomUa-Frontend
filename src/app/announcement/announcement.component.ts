import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Announcement} from '../model/announcement';
import {AnnouncementService} from '../service/announcement.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announcement!: Announcement;
  id!: number;
  announcements: Announcement[] | undefined;
  toggle = true;

  announcements$!: Observable<Announcement[]>;

  classroomId!: string;

  userId!: number;

  userRole!: string;

  helper = new JwtHelperService();

  announcementForm: FormGroup = this.formBuilder.group({
    text: ''
  });

  announcementUpdateForm: FormGroup = this.formBuilder.group({
    id: 0,
    text: ''
  });

  constructor(private announcementService: AnnouncementService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal) {

    this.id = parseInt(this.route.snapshot.paramMap.get('announcementId') || '');

    this.classroomId = (this.route.snapshot.paramMap.get('classroomId') || '');
    this.userId = this.helper.decodeToken(localStorage.getItem(environment.tokenName) || '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName) || '').role;
  }


  ngOnInit(): void {
    this.getAllAnnouncements();
  }

  getAllAnnouncements() {
    this.announcements$ = this.announcementService.getAnnouncementsByClassroom(this.classroomId);
  }

  sendAnnouncement() {
    let announcement = new Announcement();
    announcement.courseId = this.classroomId;
    announcement.text = this.announcementForm.get(['text'])?.value;
    this.announcementService.createAnnouncement(this.classroomId, announcement).subscribe(() => this.getAllAnnouncements());
  }

  deleteAnnouncement(announcementId: number) {
    this.announcementService.deleteAnnouncement(this.classroomId, announcementId).subscribe(() => {
      this.getAllAnnouncements();
    });
  }

  open(announcementId: number) {
    this.router.navigate(['/classrooms/' + this.classroomId + '/announcements', announcementId]);
  }

  open1(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  exitForm() {
    this.announcementForm.reset();
  }

  toggleAnnouncements() {
    this.toggle = !this.toggle
  }

  updateAnnouncement() {
    let announcement = new Announcement();
    let id = this.announcementUpdateForm.get('id')?.value;
    announcement.text = this.announcementUpdateForm.get('text')?.value;
    // @ts-ignore
    this.announcementService.updateAnnouncement(this.id, id, announcement).subscribe(() => this.getAllAnnouncements());
  }
}













