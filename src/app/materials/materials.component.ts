import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../model/material';
import { MaterialService } from '../service/material.service';


@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  maxScore = 0;

  links: string[] = [];

  classroomId! : string;

  topicId! : number;

  userId! : number;

  userRole! : string;

  materials$! : Observable<Material[]>;

  helper = new JwtHelperService();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  materialForm: FormGroup = this.formBuilder.group({
    title: '',
    text: '',
    task: '',
    type: '',
    maxScore: 0,
    start: new Date(),
    end: new Date()

  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private materialService: MaterialService
  ) {
    this.classroomId = (this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.materials$ = this.materialService.getMaterialsByTopic(this.classroomId, this.topicId)
  }

  save(){
    let material = new Material();
    material.startDate = this.range.get(['start'])?.value;
    material.startDate = this.range.get(['end'])?.value;
    material.maxScore = this.maxScore
    material.task =
    material.text =
    material.type =
    material.url = (document.getElementById('materiallink')?.value || '');
  }

}
