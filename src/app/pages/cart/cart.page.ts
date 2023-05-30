import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  // As variáveis productCount e totalPrice são usadas para armazenar o número total de produtos e o preço total, respectivamente.

  productCount: number = 0;
  totalPrice: number = 0;

  // A variável cartItems é usada para armazenar os itens presentes no carrinho.

  cartItems: { product: Product, quantity: number }[] = [];

  // O construtor recebe as injeções de dependência do serviço CartService e do ActionSheetController.

  constructor(private cartService:CartService, private actionSheetCtrl: ActionSheetController) { }

  // A propriedade cartItems é inicializada com os itens presentes no carrinho obtidos do serviço CartService.
  // É feita a inscrição no BehaviorSubject productCountSubject do serviço CartService para obter as atualizações do número de produtos no carrinho e atribuir o valor à variável productCount.
  // É feita a inscrição no BehaviorSubject totalPriceSubject do serviço CartService para obter as atualizações do preço total e atribuir o valor à variável totalPrice.

  ngOnInit() {

    this.cartItems = this.cartService.getCartItems();

    this.cartService.getProductCount().subscribe(count => {
      this.productCount = count;
    });

    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

  // A função removeProduct(id: number) chama o método removeFromCart do serviço CartService para remover um produto do carrinho com base no ID.

  removeProduct(id: number) {
    this.cartService.removeFromCart(id);
  }

  // As funções incrementQuantity(id: number) e decrementQuantity(id: number) são usadas para aumentar e diminuir a quantidade de um produto no carrinho, respectivamente. Elas atualizam a quantidade do item no array cartItems e chamam o método updateTotalPrice do serviço CartService para atualizar o preço total.

  incrementQuantity(id: number){
    const index = this.cartItems.findIndex(item => item.product.id === id);
    if(this.cartItems[index].quantity > 0){
      this.cartItems[index].quantity++;
      this.cartService.updateTotalPrice();
    }
  }

  descrementQuantity(id: number){
    const index = this.cartItems.findIndex(item => item.product.id === id);
    if(this.cartItems[index].quantity > 1){
      this.cartItems[index].quantity--;
      this.cartService.updateTotalPrice();
    }
  }

  // O método confirmDelete vai apagar um produto do carrinho caso o utilizador faça as ação correta

  async confirmDelete(productId: number){
    const actionSheetCtrl = await this.actionSheetCtrl.create({
      header: 'Do you want to delete?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.cartService.removeFromCart(productId)
          }  
        }, {
          text: 'Cancel',
          role: 'close',
          icon: 'close-outline' 
        } 
      ],
      cssClass: '',
      animated: true,
      backdropDismiss: true,
      keyboardClose: true,
      mode: 'ios'
    })
    actionSheetCtrl.present();
  }
}