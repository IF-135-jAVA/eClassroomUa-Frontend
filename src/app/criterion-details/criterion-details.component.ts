import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Criterion} from "../model/criterion";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CriterionService} from "../service/criterion.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../environments/environment";
import {Comments} from "../model/comment";
import {Observable} from "rxjs";

@Component({
  selector: 'app-criterion-details',
  templateUrl: './criterion-details.component.html',
  styleUrls: ['./criterion-details.component.css']
})
export class CriterionDetailsComponent implements OnInit {

  errorMessage = '';
  closeResult = '';
  helper = new JwtHelperService();
  userId! : number;
  userRole! : string;
  criterionId! : number;
  criterion! : Criterion;
  classroomId! : number;
  topicId! : number;
  materialId!: number;
  criterion$! : Observable<Criterion>;
  criterions$! : Observable<Criterion[]>;


  criterionForm: FormGroup = this.formBuilder.group({
    text: ''
  });

  constructor(
    private route: ActivatedRoute,
    private criterionService: CriterionService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.classroomId = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.criterionId = parseInt(this.route.snapshot.paramMap.get('criterionId') || '');
    this.materialId = parseInt(this.route.snapshot.paramMap.get('materialId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }


  ngOnInit(): void {
    this.criterion$ = this.criterionService.getCriterionById(this.classroomId, this.topicId, this.materialId, this.criterionId);
    this.getAllCriterions();
  }
  getAllCriterions(){
    this.criterions$ = this.criterionService.getAllCriterions(this.classroomId, this.topicId, this.materialId);
  }

  sendCriterion(){
    let criterion = new Criterion();
    criterion.title = this.criterionForm.get(['title'])?.value;
    criterion.description = this.criterionForm.get(['description'])?.value;
    this.materialId = 0  ;
    this.criterionService.createCriterion(criterion, this.classroomId, this.topicId, this.materialId).subscribe(() => this.getAllCriterions());
  }
  goToLevels(){
    //console.log("yyep");
    this.router.navigate(['/classrooms/' + this.classroomId + '/topics/' + this.topicId + '/materials/' + this.materialId + '/criterions/' + this.criterionId ]);

  }

}
