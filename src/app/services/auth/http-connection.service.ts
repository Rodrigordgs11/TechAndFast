import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {
  
  private readonly endPoint = 'https://luxrest.lusohost.pt:8443/api/v1';

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.get<T>(`${this.endPoint}/${url}`, httpOptions);
  }

  post<T>(url: string, data: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.post<T>(`${this.endPoint}/${url}`, data, httpOptions);
  }
}
