import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpConnectionService } from '../auth/http-connection.service'
@Injectable({
  providedIn: 'root'
})

export class AuthServiceService{

  endPoint: string = 'https://luxrest.lusohost.pt:8443/api/v1/auth'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}

  constructor(private http: HttpClient, public router: Router, public alertController: AlertController, private httpConnection:HttpConnectionService) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login Error',
      subHeader: 'Username or password are invalids',
      message: 'Please introduce correct credentials',
      buttons: ['OK']
    });

    await alert.present();
  }

  register(name: string, username: string, email: string, phone: number, fiscalNumber: number, password: any, address: any, city: string, zipCode: any){
    const userObj = {name, username, email, phone, fiscalNumber, password, address, city, zipCode};
    console.log(userObj);
    console.log(this.endPoint + '/register');
    return this.http.post<any>(this.endPoint + '/register', userObj)
      .subscribe(() => {
        this.router.navigate(['/login']);
      })
  }

  signIn(username: any, password: any) {
    const userObj = { username, password };
    console.log(userObj);
    console.log(this.endPoint + '/authenticate');
    return this.http.post<any>(this.endPoint + '/authenticate', userObj)
      .subscribe((res: any) => {
        console.log(res.access_token);
        localStorage.setItem('access_token', res.access_token);
        console.log(localStorage.getItem('access_token'))
        this.router.navigate(['/menu']);
        // guardar informções do user
      }, (error: any) => {
        if(error.status === 401) {
          this.presentAlert();
        }
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  
  refresh() { 
    if(localStorage.getItem('access_token') !== null) {
      this.httpConnection.post('auth/refresh-token', null)
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.access_token);
          console.log(localStorage.getItem('access_token'));
        });
    }
  }  
}