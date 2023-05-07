import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {

  
  private readonly endPoint = 'http://185.113.143.51:8081/api/v1';

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    console.log(httpOptions);
    return this.http.get<T>(`${this.endPoint}/${url}`, httpOptions);
  }
}
