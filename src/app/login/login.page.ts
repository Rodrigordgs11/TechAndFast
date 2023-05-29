import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth/auth.service'
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular/types/ionic-lifecycle-hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  loginForm! : FormGroup
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  
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