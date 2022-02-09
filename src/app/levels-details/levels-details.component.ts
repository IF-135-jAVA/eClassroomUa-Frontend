import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Criterion} from "../model/criterion";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Level} from "../model/level";
import {ActivatedRoute, Router} from "@angular/router";
import {CriterionService} from "../service/criterion.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LevelService} from "../service/level.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-levels-details',
  templateUrl: './levels-details.component.html',
  styleUrls: ['./levels-details.component.css']
})
export class LevelsDetailsComponent implements OnInit {

  errorMessage = '';
  closeResult = '';
  helper = new JwtHelperService();
  userId! : number;
  userRole! : string;
  levelId! : number;
  level! : Level;
  criterionId! : number;
  classroomId! : number;
  topicId! : number;
  materialId!: number;
  level$! : Observable<Level>;
  levels$! : Observable<Level[]>;


  levelForm: FormGroup = this.formBuilder.group({
    text: ''
  });
  constructor(
    private route: ActivatedRoute,
    private levelService: LevelService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.classroomId = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.criterionId = parseInt(this.route.snapshot.paramMap.get('criterionId') || '');
    this.levelId = parseInt(this.route.snapshot.paramMap.get('levelId') || '');
    this.materialId = parseInt(this.route.snapshot.paramMap.get('materialId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }


  ngOnInit(): void {
  this.level$ = this.levelService.getLevelById(this.classroomId, this.topicId, this.materialId, this.criterionId, this.levelId);
  this.getAllLevels();
  }

  getAllLevels(){
    this.levels$ = this.levelService.getAllLevels(this.classroomId, this.topicId, this.materialId, this.criterionId);
  }
  sendLevel(){
    let level = new Level();
    level.title = this.levelForm.get(['title'])?.value;
    level.description = this.levelForm.get(['description'])?.value;
    level.mark = this.levelForm.get(['mark'])?.value;  ;
    this.levelService.createLevel(level, this.classroomId, this.topicId, this.materialId, this.criterionId).subscribe(() => this.getAllLevels());
  }



}
