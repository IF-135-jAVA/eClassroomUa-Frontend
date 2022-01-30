import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emitters/emitters';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;

  user$!: Observable<User>;

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
              private authService: AuthService,
              private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUserById(parseInt(this.route.snapshot.paramMap.get("userId") || ''));
  }

  joinModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {});
  }

  update(){
    let newUser: User = this.updateForm.getRawValue();
    localStorage.setItem(environment.user, JSON.stringify(newUser));
    this.authService.updateUser(newUser);
  }

}