import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Topic} from "../model/topic";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TopicService} from "../service/topic.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../environments/environment";
import {Criterion} from "../model/criterion";

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {

  errorMessage = '';
  closeResult = '';
  helper = new JwtHelperService();
  userId! : number;
  userRole! : string;
  topic! : Topic;
  classroomId! : number;
  topicId! : number;
  topic$!: Observable<Topic>;
  topics$!: Observable<Topic[]>;

  topicForm: FormGroup = this.formBuilder.group({
    title: ''
  });
  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.classroomId = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.topic$ = this.topicService.getTopicById(this.classroomId, this.topicId);
   this.getAllTopics();
  }
  getAllTopics(){
    this.topics$ = this.topicService.getAllTopics(this.classroomId)
  }
  sendTopic(){
    let topic = new Topic();
    topic.title = this.topicForm.get(['title'])?.value;
    //topic.text = this.topicForm.get(['text'])?.value;

    this.topicService.createTopic(topic, this.classroomId).subscribe(() => this.getAllTopics());
  }


}
