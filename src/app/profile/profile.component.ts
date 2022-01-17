import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  helper = new JwtHelperService();
  
  updateForm: FormGroup = this.formBuilder.group({
    firstName: '',
    lastName: '',
    id: 0,
    email: '',
    enabled: true
  })

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private authService: AuthService) { 
    this.user = JSON.parse(localStorage.getItem(environment.user)||'');
    this.updateForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      id: this.user.id,
      email: this.user.email,
      enabled: true
    })
  }

  ngOnInit(): void {

  }

  updateData(){
    this.user = JSON.parse(localStorage.getItem(environment.user)||'');
    this.updateForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      id: this.user.id,
      email: this.user.email,
      enabled: true
    })
  }

  joinModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {});
  }

  update(){
    let newUser: User = this.updateForm.getRawValue();
    localStorage.setItem(environment.user, JSON.stringify(newUser));
    this.authService.updateUser(newUser);
    this.updateData();
  }

}
