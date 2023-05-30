import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth/auth.service'
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular/types/ionic-lifecycle-hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {

  // o método ionViewWillEnter() é implementado. Ele é um dos ciclos de vida do Ionic que é executado antes da visualização ser exibida. Aqui, estamos utilizando a funcionalidade ScreenOrientation para bloquear a orientação da tela em retrato.

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  // declaramos a variável loginForm como um FormGroup, que representa o formulário de login.
  // No método ngOnInit(), inicializamos o formulário com dois campos: "username" e "password". 
  // Ambos os campos são definidos como requeridos, utilizando a validação Validators.required.

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

  // No método submit(), verificamos se o formulário é inválido. Se for inválido, retornamos sem executar mais nenhuma ação. Caso contrário, extraímos os valores de "username" e "password" do formulário e chamamos o serviço authService.signIn() para realizar o login, passando esses valores como parâmetros.

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