import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  token! : string;

  form: FormGroup = this.formBuilder.group({
    password: '',
    passwordRepeat: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{this.token = params['code']})
  }

  sendRequest():void{
    if(this.form.get(['password'])?.value != this.form.get(['passwordRepeat'])?.value){
      alert("Passwords don't match.");
      return;
    }
    this.authService.changePassword(this.form.get(['password'])?.value, this.token).subscribe(() =>{
      alert("Password changed.");
      this.router.navigate(['/login']);
    });
  }

}
