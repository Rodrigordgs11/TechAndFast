import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  productCount: number = 0;
  totalPrice: number = 0;


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getProductCount().subscribe(count => {
      this.productCount = count;
    });

    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

}
