import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: { product: Product, quantity: number }[] = [];
  productCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  findProductIndexById(productId: number): number {
    const index = this.cartItems.findIndex(item => item.product.id === productId);
    return index;
  }
  
  removeFromCart(productId: number): void {
    this.cartItems.splice(this.findProductIndexById(productId), 1);
    this.updateProductCount();
    this.updateTotalPrice();
  }

  getCartItems(): { product: Product, quantity: number }[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number): void {
    const index = this.cartItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.updateProductCount();
    this.updateTotalPrice();
  }

  updateProductCount(): void {
    this.productCountSubject.next(this.cartItems.length);
  }

  getProductCount(): BehaviorSubject<number> {
    return this.productCountSubject;
  }

  updateTotalPrice(): void {
    const totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
    this.totalPriceSubject.next(totalPrice);
  }

  getTotalPrice(): BehaviorSubject<number> {
    return this.totalPriceSubject;
  }

  clearCart(): void {
    this.cartItems = []; 
    this.updateProductCount();
    this.updateTotalPrice();
  }
}