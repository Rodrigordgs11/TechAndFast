import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginForm! : FormGroup
  
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      fiscalNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      confirmPassword: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    })
  }

  get name(){
    return this.loginForm.get('name')!;
  }

  get username(){
    return this.loginForm.get('username')!;
  }

  get email(){
    return this.loginForm.get('email')!;
  }

  get phone(){
    return this.loginForm.get('phone')!;
  }

  get address(){
    return this.loginForm.get('address')!;
  }

  get password(){
    return this.loginForm.get('password')!;
  }

  get fiscalNumber(){
    return this.loginForm.get('fiscalNumber')!;
  }

  get confirmPassword(){
    return this.loginForm.get('confirmPassword')!;
  }

  get city(){
    return this.loginForm.get('city')!;
  }

  get zipCode(){
    return this.loginForm.get('zipCode')!;
  }

  submit() {
    if (this.loginForm.invalid) { 
      return;
    }
  
    const form = this.loginForm.value;
    const Name = form.name;
    const username = this.username.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const password = this.password.value;
    const fiscalNumber = this.fiscalNumber.value;
    const confirmPassword = this.confirmPassword.value;
    const address = this.address.value;
    const city = this.city.value;
    const zipCode = this.zipCode.value;

    if(password !== confirmPassword){
      return;  
    }

    this.authService.register(Name, username, email, phone, fiscalNumber, password, address, city, zipCode)
  }  
}
