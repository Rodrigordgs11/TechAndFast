import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpConnectionService } from '../services/http-connection.service';
import { Category } from '../models/category';

register();

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public Categories: Category[];
  
  selectedCategoryId: any;

  constructor(private http: HttpConnectionService) { 
    this.Categories = [];
  }

  ngOnInit() {
    this.http.get<any>('categories').subscribe(res => {
      this.Categories = res;
      console.log(this.Categories); 
    })
  }

  onCategoryClick(categoryId: any) {
    this.selectedCategoryId = categoryId;
    this.http.get<any>('products/category/'+ categoryId).subscribe(res => {
      console.log(res); 
    })
  }
}
