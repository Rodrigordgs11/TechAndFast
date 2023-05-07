import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, interval } from 'rxjs';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  endPoint: string = 'http://185.113.143.51:8081/api/v1/auth'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}
  msg: any = '';

  constructor(private http: HttpClient, public router: Router) {}

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
        console.log('Error:', error.status);
        this.msg = error.status;
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
      interval(50000).subscribe(() => {
        this.http.post<any>(this.endPoint + '/refresh-token', null, httpOptions)
          .subscribe((res: any) => {
            console.log(res.access_token);
          }, (error: any) => {
            console.error(error);
          });
      });
    }
  }
}