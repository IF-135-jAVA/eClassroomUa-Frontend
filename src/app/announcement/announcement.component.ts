import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Announcement} from '../model/announcement';
import {AnnouncementService} from '../service/announcement.service';
import {Answer} from "../model/answer";


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  public adding = false;
  public editing = false;
  // @ts-ignore
  public editingIndex: number;
  toggle = true

  announcements$!: Observable<Announcement[]>;

  classroomId!: string;

  userId!: number;

  userRole!: string;


  helper = new JwtHelperService();

  announcementForm: FormGroup = this.formBuilder.group({
    text: ''
  });

  constructor(private announcementService: AnnouncementService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {

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

  exitForm() {
    this.announcementForm.reset();
  }

  public onSubmit() {
    const announcement = this.announcementForm.value as Announcement;

    if (this.editing) {
      // @ts-ignore
      this.announcements$!.splice(this.editingIndex, 1, announcement);
    } else {
      // @ts-ignore
      this.announcements$!.push(announcement);
    }

    this.editing = false;
    this.adding = false;
    this.exitForm();
  }

  toggleAnnouncements() {
    this.toggle = !this.toggle
  }

  // public updateAnnouncement(announcement: Announcement, announcementId: number) {
  //   this.announcementForm.patchValue({
  //        name: announcement.text,
  //      });
  //   this.editing = true;
  //   this.editingIndex = announcementId;
  // }


  // updateAnnouncement(announcement: Announcement, announcementId: number) {
  //   announcement.courseId = this.classroomId;
  //   announcement.text = this.announcementForm.get(['text'])?.value;
  //   this.announcementService.updateAnnouncement(this.classroomId, announcementId).subscribe(() => this.getAllAnnouncements());
  // }

  updateAnnouncement() {
    let announcement = new Announcement();
    let id = this.announcementForm.get('id')?.value;
    announcement.text = this.announcementForm.get('text')?.value;
    this.announcementService.updateAnnouncement(this.id, id, announcement).subscribe(() => this.getAllAnnouncements());
  }
}













