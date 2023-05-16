import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpConnectionService } from '../services/http-connection.service';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

register();

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public Categories: Category[];
  public Products: Product[];
  subscription !: Subscription;
  productCount: number = 0;
  totalPrice: number = 0;

  selectedCategoryId: any;

  constructor(private http: HttpConnectionService, public router: Router, public authService: AuthServiceService, private cartService: CartService) { 
    this.Categories = [];
    this.Products = [];
  }

  ngOnInit() {
    if(localStorage.getItem('access_token') !== null) {
      this.subscription = timer(0, 10000).pipe(
        switchMap(async () => this.authService.refresh())
      ).subscribe();
    }
    
    this.http.get<any>('categories').subscribe(res => {
      if(res != null) {
        this.Categories = res;
        this.selectedCategoryId = 1;
      }
    },
      (error: any) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
        }
    })

    this.http.get<any>('products/category/1').subscribe(res => {
      if(res != null) {
        this.Products = res;
      }
    })

    this.cartService.getProductCount().subscribe(count => {
      this.productCount = count;
    });

    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

  onCategoryClick(categoryId: any) {
    this.http.get<any>('products/category/'+ categoryId).subscribe(res => {
      console.log(res)
      if(res != null) {
        this.Products = res;
        this.selectedCategoryId = categoryId;
      }
    },
      (error: any) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
        }
    })
  }

  onProductClick(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  } 
}