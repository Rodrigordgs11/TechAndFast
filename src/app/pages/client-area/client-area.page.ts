import { Component, OnInit } from '@angular/core';
import { HttpConnectionService } from '../../services/auth/http-connection.service'
import { Router, NavigationEnd  } from '@angular/router';
import { Order } from '../../models/order'
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service'
import { User } from '../../models/user';
import { Category } from '../../models/category';

@Component({
  selector: 'app-client-area',
  templateUrl: './client-area.page.html',
  styleUrls: ['./client-area.page.scss'],
})
export class ClientAreaPage implements OnInit {
  public orders: Order[];
  order: Order = {} as Order;
  orderLines!: any[];
  user: User = {} as User;
  
  constructor(private httpConnection: HttpConnectionService, private router: Router, private cartService: CartService) { 
    this.orders = [];
  }
  
  ngOnInit() {
    // Verifica se o usuário está autenticado ao navegar para uma nova página
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('access_token') === null) {
          this.router.navigate(['/login']);
          return;
        }
      }
    });
  
    // Carrega as informações do usuário logado e suas ordens
    this.ordersByUser();
    this.getInformationsUserLogged();
  }
  
  // Obtém as ordens do usuário
  ordersByUser() {
    this.httpConnection.get('orders/logged').subscribe((response) => {
      this.orders = response as Order[];
  
      // Filtra as ordens por data
      const filterDate = new Date('2023-05-01');
      const filteredOrders = this.orders.filter(order => {
        const createdAtDate = new Date(order.createdAt);
        return createdAtDate > filterDate;
      });
  
      // Formata a data de criação de cada ordem
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
  
  // Obtém as informações detalhadas de uma ordem ao clicar em "Mostrar mais"
  onClickShowMore(orderId: number) {
    this.httpConnection.get('orders/' + orderId).subscribe((response) => {
      this.order = response as Order;
      this.orderLines = this.order.orderLine;
      
      // Obtém informações adicionais de cada linha de pedido, como nome do produto e categoria
      this.orderLines.forEach((orderLine) => {
        this.httpConnection.get('products/' + orderLine.product).subscribe((productResponse) => {
          const product = productResponse as Product;
          orderLine.productName = product.name;
          orderLine.image = product.image;
  
          this.httpConnection.get('categories/' + product.category).subscribe((categoryResponse) => {
            const category = categoryResponse as Category;
            orderLine.category = category.name;
          });
        });
      });
    });
  }
  
  // Obtém as informações do usuário logado
  getInformationsUserLogged() {
    this.httpConnection.get('entities/logged').subscribe((response) =>{
      this.user = response as User;
    });
  }
  
  // Adiciona os produtos do pedido ao carrinho de compras
  saveToCart() {
    this.orderLines.forEach((orderLine) => {
      this.httpConnection.get('products/' + orderLine.product).subscribe((productResponse) => {
        const product = productResponse as Product;
        this.cartService.addToCart(product, orderLine.quantity);
      });
    });
  }   
  
  // Faz o logout do usuário atual
  logoutCurrentUser(){
    this.httpConnection.post('auth/logout', null)
      .subscribe(() => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      });
  }  
}