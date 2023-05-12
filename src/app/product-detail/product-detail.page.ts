import { Component, OnInit } from '@angular/core';
import { HttpConnectionService } from '../services/http-connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product = {} as Product;
  productId: any;

  constructor(private http: HttpConnectionService, public router: Router, private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('productId');
  }
  
  ngOnInit() {
    this.productAtributes(this.productId);
  }

  productAtributes(productid: number) {
    this.http.get<any>('products/' + productid).subscribe(res => {
      if(res != null) { 
        console.log(res) 
        this.product = res;
      }
    },
      (error: any) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
        }
    })
  }
}