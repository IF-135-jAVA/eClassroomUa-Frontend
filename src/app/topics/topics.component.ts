import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Topic} from "../model/topic";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TopicService} from "../service/topic.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  createForm: FormGroup = this.formBuilder.group({
    id: '',
    title: '',
    text: '',
    classroomId:'',
  });
  joinForm: FormGroup = this.formBuilder.group({
    code: ''
  });

  errorMessage = '';
  closeResult = '';
  helper = new JwtHelperService();
  userId! : number;
  userRole! : string;
  topic! : Topic;
  classroomId! : string;
  topicId! : number;
  topics$!: Observable<Topic[]>;


  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.classroomId = (this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }


  ngOnInit(): void {
    this.topics$ = this.topicService.getAllTopics(this.classroomId);

    this.createForm = this.formBuilder.group({
      topicId: '',
      title: '',

    });
  }

  create() {
    this.topicService.createTopic(this.topic, this.classroomId).subscribe(
      () =>{
        this.getAllTopics();
      }
    )
  }
  getAllTopics(){
    this.topics$ = this.topicService.getAllTopics(this.classroomId)
  }

  createModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title1'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  open(topicId: number) {
    console.log(topicId)
    this.router.navigate(['classrooms/'+ this.classroomId + '/topics/', topicId ]);
  }
  topicForm: FormGroup = this.formBuilder.group({

    title: '',
    classroomId: '',
  });
   sendTopic(){
    let topic = new Topic();
    topic.classroomId = this.classroomId;
    topic.title = this.topicForm.get(['title'])?.value;
    topic.classroomId = this.classroomId;
    console.log(this.classroomId)
    this.topicService.createTopic(topic, this.classroomId ).subscribe(() => this.getAllTopics());
  }
}


