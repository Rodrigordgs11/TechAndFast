import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, interval } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService{

  endPoint: string = 'http://185.113.143.51:8081/api/v1/auth'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}

  constructor(private http: HttpClient, public router: Router, public alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login Error',
      subHeader: 'Username or password are invalids',
      message: 'Please introduce correct credentials',
      buttons: ['OK']
    });

    await alert.present();
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
        //this.getUserProfile(res._id).subscribe((res) => {
        //this.currentUser = res;
        //});
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
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        })
      };
      
      this.http.post<any>(this.endPoint + '/refresh-token', null, httpOptions)
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.access_token)
          console.log(localStorage.getItem('access_token'));
        }, (error: any) => {
          console.error(error);
        });
    }
  }
  
}