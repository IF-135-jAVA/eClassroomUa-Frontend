import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Criterion } from '../model/criterion';
import {CriterionService} from "../service/criterion.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import { Observable } from 'rxjs';




@Component({
  selector: 'app-criterion',
  templateUrl: './criterions.component.html',
  styleUrls: ['./criterions.component.css']
})

export class CriterionsComponent implements OnInit {

  createForm: FormGroup = this.formBuilder.group({
    id: '',
    title: '',
    description: '',
    materialId: '',
  });

  joinForm: FormGroup = this.formBuilder.group({
    code: ''
  });

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
  criterions$!: Observable<Criterion[]>;


  constructor(
    private route: ActivatedRoute,
    private criterionService: CriterionService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.classroomId = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.materialId = parseInt(this.route.snapshot.paramMap.get('materialId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.criterions$ = this.criterionService.getAllCriterions( this.classroomId, this.topicId, this.materialId);

    this.createForm = this.formBuilder.group({
      criterionId: '',
      title: '',
      description: '',

    });
  }

  create() {
  this.criterionService.createCriterion(this.criterion, this.classroomId, this.topicId,  this.materialId).subscribe(
    (response: Criterion) =>{
      this.open(response.id);
    }
  )
  }

  getAllCriterions(){
    this.criterions$ = this.criterionService.getAllCriterions( this.classroomId, this.topicId,  this.materialId)
  }

  getById(classroomId: number, topicId: number, materialId: number, criterionId: number){
    return  this.criterionService.getCriterionById(this.classroomId, this.topicId, this.materialId, criterionId );
  }


  createModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title1'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  open(criterionId: number) {
  console.log(criterionId)
    this.router.navigate(['/classrooms/' + this.classroomId + '/topics/' + this.topicId + '/materials/' + this.materialId + '/criterions/', criterionId]);
  }
  criterionForm: FormGroup = this.formBuilder.group({

    title: '',
    description: ''
  });
  sendCriterion(){
    let criterion = new Criterion();
    criterion.materialId = this.materialId;
    criterion.title = this.criterionForm.get(['title'])?.value;
    criterion.description = this.criterionForm.get(['description'])?.value;

    this.criterionService.createCriterion(criterion, this.classroomId, this.topicId, this.materialId).subscribe(() => this.getAllCriterions());
  }
}
