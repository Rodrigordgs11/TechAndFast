import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnectionService } from '../services/http-connection.service';
import { CartService } from '../services/cart.service';
import { Category } from '../models/category';
import { Pack } from '../models/pack';

@Component({
  selector: 'app-pack-detail',
  templateUrl: './pack-detail.page.html',
  styleUrls: ['./pack-detail.page.scss'],
})
export class PackDetailPage implements OnInit {
  public Products: Product[];
  product: Product = {} as Product;
  category: Category = {} as Category;
  pack: Pack = {} as Pack;
  packId: any;
  quantity: number = 1;
  productCount: number = 0;
  totalPrice: number = 0;
  packComplete: boolean = false;

  selectedProductId: any;
  categoryName!: string


  produtctsPack: { product: number, price: number, name: string }[] = [];
  pricePack: number = 0;
  isFantaSelected = false;
  isColaSelected = false;
  
  fantaSelect() {
    this.isFantaSelected = true;
    this.isColaSelected = false;
  }
  
  colaSelect() {
    this.isFantaSelected = false;
    this.isColaSelected = true;
  }
  
  
  
  constructor(
    private http: HttpConnectionService,
    public router: Router,
    private route: ActivatedRoute,
    private cartService: CartService) {
    this.packId = this.route.snapshot.paramMap.get('productId');
    this.Products = [];
  }
  
  ngOnInit() {
    this.cartService.getProductCount().subscribe(count => {
      this.productCount = count;
    });
    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
    this.productAtributes();
    this.productOfPack();
  }

  productAtributes() {
    this.http.get<any>('categories/' + this.packId).subscribe(res => {
      if (res != null) {
        this.category = res;
        this.categoryName = this.category.name;
        console.log(this.category);
      }
    },
      (error: any) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
        }
    })
  }

  productOfPack() {
    this.http.get<any>('packs/' + this.packId).subscribe(res => {
      if (res != null) {
        console.log(res);
        this.pack = res;
        console.log(this.pack);
        this.produtctsPack = res.packLine;
        
        for (let i = 0; i < this.produtctsPack.length; i++) {
          console.log(this.produtctsPack[i].product);
        
          this.http.get<any>('products/' + this.produtctsPack[i].product).subscribe(res => {
            if (res != null) {
              this.produtctsPack[i].name = res.name;
              this.pricePack = this.produtctsPack[i].price; 
            }
          });
        }
      }
    })
  }
  
  onClickProduct(productId: any) {
    this.http.get<any>('products/' + productId).subscribe(res => {
      if (res != null) { 
        console.log(productId)
        this.product = res;
        this.product.price = this.pricePack;
        this.product.name = this.product.name + '(Pack)'
        this.packComplete = true;
        console.log(this.produtctsPack);
      }
    })

    this.selectedProductId = productId;
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
    if(this.packComplete)
      this.cartService.addToCart(this.product, this.quantity);
  }
}
