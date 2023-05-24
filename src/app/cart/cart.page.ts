import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  productCount: number = 0;
  totalPrice: number = 0;
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService:CartService, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {

    this.cartItems = this.cartService.getCartItems();

    this.cartService.getProductCount().subscribe(count => {
      this.productCount = count;
    });

    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

  removeProduct(id: number) {
    this.cartService.removeFromCart(id);
  }

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