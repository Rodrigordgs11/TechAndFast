import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PaymentSuccessModalComponent } from '../components/payment-success-modal/payment-success-modal.component';
import { HttpConnectionService } from '../services/auth/http-connection.service'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  productCount: number = 0;
  totalPrice: number = 0;
  cartItems: { product: Product, quantity: number }[] = [];
  selectedOption!: string;
  deleveryPrice = 3.00;
  constructor(private cartService: CartService, private navCtrl: NavController, private modalCtrl: ModalController, private http: HttpConnectionService, private cart: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();

    this.cartService.getProductCount().subscribe(count => {
      this.productCount = count;
    });
    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

  postOrder() {
    const cartItems = this.cartService.getCartItems();

    const orderLine = cartItems.map(item => {
      return {
        quantity: item.quantity,
        product: item.product.id,
        pack: null
      };
    });

    const orderData = {
      amount: this.totalPrice + this.deleveryPrice,
      orderNote: 'Ionic Order',
      orderStatus: 'PROCESSING',
      paymentMethod: 'CASH',
      orderLine: orderLine
    };
    console.log(orderData)

    this.http.post<any>('orders', orderData).subscribe(
      (response: any) => {
        this.presentModal();
        this.cartService.clearCart();
      }
    );
  }

  async presentModal() {
    setTimeout(async () => {
      this.navCtrl.navigateRoot('/menu');
    }, 3000);
  }

}
