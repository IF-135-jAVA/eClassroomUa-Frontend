import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  classroomId! : number;

  topicId! : number;

  userId! : number;

  userRole! : string;

  materials$! : Observable<Material[]>;

  helper = new JwtHelperService();

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
    this.classroomId = parseInt(this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.materials$ = this.materialService.getMaterialsByTopic(this.classroomId, this.topicId)
  }

}
