import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../model/material';
import { MaterialService } from '../service/material.service';
import {formatDate} from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  maxScore = 0;

  materialId!: number;

  selectedType = '';

  materialType = ["TASK", "QUESTIONS", "TEST", "MATERIAL"];

  links: string[] = [];

  classroomId! : string;

  topicId! : number;

  userId! : number;

  userRole! : string;

  adding = false;

  editing = false;

  materials$! : Observable<Material[]>;

  helper = new JwtHelperService();

  materialForm: FormGroup = this.formBuilder.group({
    title: '',
    text: '',
    task: '',
    type: '',
    maxScore: 0,
    start: new Date(),
    end: new Date(),
    url: ''
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private materialService: MaterialService
  ) {
    this.classroomId = (this.route.snapshot.paramMap.get('classroomId') || '');
    this.topicId = parseInt(this.route.snapshot.paramMap.get('topicId') || '');
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    this.userRole = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').role;
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.materials$ = this.materialService.getMaterialsByTopic(this.classroomId, this.topicId)
  }


  public submit(){
    let material = this.materialForm.value as Material;
    material.id = this.materialId
    material.materialType = this.selectedType;
    material.dueDate = new Date( Date.parse((<HTMLInputElement> document.getElementById('end')).value));
    material.startDate = new Date( Date.parse((<HTMLInputElement> document.getElementById('start')).value));
    if(this.editing){
      this.materialService.update(this.classroomId, this.topicId, material).subscribe(() => {this.getAll()});
    }
    else{
      this.materialService.createMaterial(this.classroomId, this.topicId, material).subscribe(() => {this.getAll()});
    }
    this.close();
  }

  getDate(date: Date){
    return formatDate(date, "MMM dd, yyyy, HH:mm", "en-US");
  }

  edit(material: Material){
    this.materialId = material.id;
    this.materialForm.patchValue({
      title: material.title,
      text: material.text,
      task: material.task,
      type: material.materialType,
      maxScore: material.maxScore,
      start:  material.startDate,
      end: material.dueDate,
      url: material.url
    });
    this.editing = true;
  }

  delete(materialId: number){
    this.materialService.deleteMaterial(this.classroomId, this.topicId, materialId)
    .subscribe(() => this.getAll())
  }

  close() {
    this.adding = false;
    this.editing = false;
  }

  add(){
    this.materialForm.patchValue({
      title: '',
      text: '',
      task: '',
      type: '',
      maxScore: 1,
      start:  new Date(),
      end: new Date(),
      url: ''
    });
    this.adding = true;
  }

  open(materialId: number){
    this.router.navigate([this.router.url + '/materials/', materialId])
  }

}
