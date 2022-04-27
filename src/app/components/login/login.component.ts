import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInData } from 'src/app/models/signInData';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

isFormInvalid = false;
areCredentialsInvalid = false;

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit() {
   
  }

  onSubmit(signInForm: NgForm){
    if(!signInForm.valid){
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm);
  }

  private checkCredentials(signInForm: NgForm){
    const signInData = new SignInData(signInForm.value.tc, signInForm.value.password);
    if(!this.authenticationService.authenticate(signInData)){
      this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    }
  }

 



}

