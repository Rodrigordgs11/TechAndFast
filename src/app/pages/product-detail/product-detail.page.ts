import { Component, OnInit } from '@angular/core';
import { HttpConnectionService } from '../../services/auth/http-connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product = {} as Product;
  productId: any;
  quantity: number = 1;
  productCount: number = 0;
  totalPrice: number = 0;

  constructor(
    private http: HttpConnectionService,
    public router: Router,
    private route: ActivatedRoute,
    private cartService: CartService) {
    this.productId = this.route.snapshot.paramMap.get('productId');
  }
  
  ngOnInit() {
    this.cartService.getProductCount().subscribe(count => {
      this.productCount = count;
    });
    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
    this.productAtributes(this.productId);
  }

  productAtributes(productid: number) {
    this.http.get<any>('products/' + productid).subscribe(res => {
      if (res != null) { 
        this.product = res;
      }
    },
      (error: any) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
        }
    })
  }

  incrementQuantity(){
    if(this.quantity > 0){
      this.quantity++;
    }
  }

  descrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  addProductToCart(){
    this.cartService.addToCart(this.product, this.quantity);
  }
}
