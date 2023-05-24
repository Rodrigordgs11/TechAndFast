import { Component, OnInit } from '@angular/core';
import { HttpConnectionService } from '../services/auth/http-connection.service'
import { Router } from '@angular/router';
import { Order } from '../models/order'
import { Product } from '../models/product';
import { CartService } from '../services/cart.service'

@Component({
  selector: 'app-client-area',
  templateUrl: './client-area.page.html',
  styleUrls: ['./client-area.page.scss'],
})
export class ClientAreaPage implements OnInit {
  public orders: Order[];
  order: Order = {} as Order;
  orderLines!: any[];

  constructor(private httpConnection: HttpConnectionService, private router: Router, private cartService: CartService) { 
    this.orders = [];
  }

  ngOnInit() {
    this.ordersByUser();
  }

  ordersByUser() {
    this.httpConnection.get('orders/logged').subscribe((response) => {
      this.orders = response as Order[];
  
      const filteredOrders = this.orders.filter(order => {
        const filterDate = new Date('2023-05-01');
        const createdAtDate = new Date(order.createdAt);
        return createdAtDate > filterDate;
      });
  
      filteredOrders.forEach(order => {
        const formattedDate = new Date(order.createdAt).toLocaleString('pt-BR');
        order.createdAt = formattedDate;
      });
    },
    (error: any) => {
      if(error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  onClickShowMore(orderId: number) {
    this.httpConnection.get('orders/' + orderId).subscribe((response) => {
      this.order = response as Order;
      this.orderLines = this.order.orderLine;
      
      this.orderLines.forEach((orderLine) => {
        this.httpConnection.get('products/' + orderLine.product).subscribe((productResponse) => {
          const product = productResponse as Product;
          orderLine.productName = product.name;
        });
      });
    });
    
  }
  saveToCart() {
    this.orderLines.forEach(({ product, quantity }) => {
      this.orderLines.forEach((orderLine) => {
        this.httpConnection.get('products/' + orderLine.product).subscribe((productResponse) => {
          const product = productResponse as Product;
          this.cartService.addToCart(product, quantity);
        });
      });
    });
  }  
  
  logoutCurrentUser(){
    this.httpConnection.post('auth/logout', null)
      .subscribe(() => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      });
  }
}
