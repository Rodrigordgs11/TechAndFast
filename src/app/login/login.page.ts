import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth.service'
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm! : FormGroup
  constructor(private authService: AuthServiceService, public user:User) {
    //this.displayError = this.displayError.bind(this);
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  
  //displayError() {
    //if (this.authService.msg == 401) {
     // return { displayError: true };
    //}
    //return null;
  //}

  get username(){
    return this.loginForm.get('username')!;
  }

  get password(){
    return this.loginForm.get('password')!;
  }

  submit() {

    const form = this.loginForm.value;

    if(this.loginForm.invalid){
      return;
    }

    if(form.username.value !== null && form.password.value !== null){
        this.authService.signIn(this.username.value,this.password.value);
    }
  }
}