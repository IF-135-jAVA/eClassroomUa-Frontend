import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Announcement } from '../model/announcement';
import { AnnouncementService } from '../service/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announcements$! : Observable<Announcement[]>;

  classroomId! : number;

  constructor(private announcementService: AnnouncementService,
              private route: ActivatedRoute,
              private router: Router) {
                this.classroomId = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
              }

  ngOnInit(): void {
    this.announcements$ = this.announcementService.getAnnouncementsByClassroom(this.classroomId);
  }

  sendAnnouncement(){
    let announcement = new Announcement();
    announcement.courseId = this.classroomId;
    this.announcementService.createAnnouncement(this.classroomId, announcement);
  }

  deleteAnnouncement(announcementId: number){
    this.announcementService.deleteAnnouncement(this.classroomId, announcementId);
  }

  open(announcementId: number){
    this.router.navigate(['/classrooms/' + this.classroomId + '/announcements', announcementId]); 
  }

}
