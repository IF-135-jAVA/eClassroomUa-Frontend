import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    enabled: true
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 

  }

  ngOnInit(): void {
  }

  register(): void{
    console.log(this.form.getRawValue());
    console.log(this.authService.registration(this.form.getRawValue()).subscribe());
    this.router.navigate(['/login']);
  }

}
