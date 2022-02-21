import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-email-request',
  templateUrl: './email-request.component.html',
  styleUrls: ['./email-request.component.css']
})
export class EmailRequestComponent implements OnInit {

  type!: string;

  form: FormGroup = this.formBuilder.group({
    email: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  sendPasswordRequest():void{
    this.authService.changePasswordRequest(this.form.get(['email'])?.value).subscribe(() =>{
      alert("We sent link to your email to change your password.");
      this.router.navigate(['/']);
    });
  }

  

}
