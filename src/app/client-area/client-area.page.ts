import { Component, OnInit } from '@angular/core';
import { HttpConnectionService } from '../services/http-connection.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-area',
  templateUrl: './client-area.page.html',
  styleUrls: ['./client-area.page.scss'],
})
export class ClientAreaPage implements OnInit {

  constructor(private httpConnection: HttpConnectionService, private router: Router) { }

  ngOnInit() {
  }

  logoutCurrentUser(){
    this.httpConnection.post('auth/logout', null)
      .subscribe(() => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      });
  }


}
