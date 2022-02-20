import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LevelService} from "../service/level.service";
import {environment} from "../../environments/environment";
import {Level} from "../model/level";
import {User} from "../model/user";


@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  createForm: FormGroup = this.formBuilder.group({
    id: '',
    title: '',
    description: '',
    criterionId: '',
    mark: '',
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
  level! : Level;
  classroomId! : string;
  topicId! : number;
  materialId!: number;
  levelId! : number;
  levels$!: Observable<Level[]>;
  constructor(
    private route: ActivatedRoute,
    private levelService: LevelService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.classroomId = (this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.materialId = parseInt(this.route.snapshot.paramMap.get('materialId') || '');
    this.criterionId = parseInt(this.route.snapshot.paramMap.get('criterionId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.levels$ = this.levelService.getAllLevels(this.classroomId, this.topicId, this.materialId, this.criterionId);

    this.createForm = this.formBuilder.group({
      levelId: '',
      title: '',
      description: '',
      mark: ''

    });
  }

  create() {
    this.levelService.createLevel(this.level, this.classroomId, this.topicId,  this.materialId, this.criterionId).subscribe(
      (response: Level) =>{
        this.open(response.id);
      }
    )
  }

  getAllLevels(){
    this.levels$ = this.levelService.getAllLevels( this.classroomId, this.topicId,  this.materialId, this.criterionId);
  }

  getById(classroomId: string, topicId: number, materialId: number, criterionId: number, levelId: number){
    return  this.levelService.getLevelById(this.classroomId, this.topicId, this.materialId, this.criterionId, levelId );
  }
  createModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title1'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  open(levelId: number) {
    console.log(levelId)
    this.router.navigate(['/classrooms/' + this.classroomId + '/topics/' + this.topicId + '/materials/' + this.materialId + '/criterions/' + this.criterionId + '/level/', levelId]);
  }

  levelForm: FormGroup = this.formBuilder.group({

    title: '',
    description: '',
    mark: 0,

  });
  updateLevelForm: FormGroup = this.formBuilder.group({


    title: '',
    description: '',
    mark: 0,


  });


  sendLevel(){
  let level = new Level();
    level.criterionId = this.criterionId;
    level.title = this.levelForm.get(['title'])?.value;
    level.description = this.levelForm.get(['description'])?.value;
    level.mark = this.levelForm.get(['mark'])?.value;
    console.log(level.criterionId+level.title+level.description);
  this.levelService.createLevel(level, this.classroomId, this.topicId, this.materialId, this.criterionId).subscribe(() => this.getAllLevels());
  }

  deleteLevel(levelId: number) {
    this.levelService.deleteLevel( this.classroomId, this.topicId, this.materialId, this.criterionId, levelId).subscribe(() => {
      this.getAllLevels();
    });

  }
  updateLevel(){
      //let  newLevel : Level = this.updateLevelForm.getRawValue() as Level;
    let level = new Level();
    let levelId = this.route.snapshot.params['id'];
    let title = this.updateLevelForm.get(['title'])?.value;
    let description = this.updateLevelForm.get(['description'])?.value;
    let mark = this.updateLevelForm.get(['mark'])?.value;
    console.log(title, description, mark,this.levelId ,this.criterionId );

    // level.title = this.updateLevelForm.get(['title'])?.value;
    // level.description = this.updateLevelForm.get(['description'])?.value;
    // level.mark = this.updateLevelForm.get(['mark'])?.value;
    // console.log(level.title, level.description, level.criterionId );

    this.levelService.updateLevel(this.classroomId, this.topicId, this.materialId, this.criterionId, this.levelId, title, description,mark, level).subscribe(() => {
      this.getById(this.classroomId, this.topicId, this.materialId, this.criterionId, this.levelId);
    });


  }
  joinModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {});
  }
}
