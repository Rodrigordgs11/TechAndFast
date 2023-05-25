import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpConnectionService } from '../services/auth/http-connection.service';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth/auth.service';

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

  selectedCategoryId: any;

  constructor(private http: HttpConnectionService, public router: Router, public authService: AuthServiceService) { 
    this.Categories = [];
    this.Products = [];
  }

  ngOnInit() {
    if (localStorage.getItem('access_token') !== null) {
      this.subscription = timer(10000, 50000).pipe( 
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
        if(error.status !== 200) {
          this.router.navigate(['/login']);
        }
    })

    this.http.get<any>('products/category/1').subscribe(res => {
      if(res != null) {
        this.Products = res;
      }
    })
  }

  onCategoryClick(categoryId: any) {
    if (categoryId == 4) {
      this.http.get<any>('packs/category/' + categoryId).subscribe(res => {
        if (res != null) {
          this.Products = res;
          this.selectedCategoryId = categoryId;
    
          this.Products.forEach(product => {
            product.isPack = true;
          });
        }
      },
      (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      });
    }
    
    this.http.get<any>('products/category/'+ categoryId).subscribe(res => {
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

  onProductClick(productId: number, isPack: boolean) {
    if(isPack == true) {
      this.router.navigate(['/pack-detail', productId]);
    } else{
      this.router.navigate(['/product-detail', productId]);
    }
  }
}