import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { HttpConnectionService } from './auth/http-connection.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // O serviço possui três propriedades: cartItems é um array que armazena os itens do carrinho com informações do produto e quantidade.
  
  cartItems: { product: Product, quantity: number }[] = [];

  // productCountSubject é um BehaviorSubject que mantém o número de produtos no carrinho.

  productCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // totalPriceSubject é um BehaviorSubject que mantém o preço total dos itens no carrinho.
  
  totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  //No construtor, é injetado o serviço HttpConnectionService para realizar chamadas HTTP.

  constructor(private http: HttpConnectionService) { }

  // A função findProductIndexById(productId: number): number é responsável por encontrar o índice de um produto no carrinho com base no seu ID.

  findProductIndexById(productId: number): number {
    const index = this.cartItems.findIndex(item => item.product.id === productId);
    return index;
  }
  
  //A função removeFromCart(productId: number): void remove um produto do carrinho com base no seu ID. Ela utiliza a função findProductIndexById para encontrar o índice do produto no array cartItems e, em seguida, usa o método splice para removê-lo do array. Em seguida, são chamados os métodos updateProductCount e updateTotalPrice para atualizar o número de produtos no carrinho e o preço total.

  removeFromCart(productId: number): void {
    this.cartItems.splice(this.findProductIndexById(productId), 1);
    this.updateProductCount();
    this.updateTotalPrice();
  }

  // A função getCartItems(): { product: Product, quantity: number }[] retorna todos os itens presentes no carrinho.

  getCartItems(): { product: Product, quantity: number }[] {
    return this.cartItems;
  }

  // A função addToCart(product: Product, quantity: number): void adiciona um produto ao carrinho. Ela verifica se o produto já está presente no carrinho com base no seu ID. Se estiver presente, a quantidade do produto é atualizada. Caso contrário, é feita uma chamada HTTP para obter o nome da categoria do produto usando o serviço HttpConnectionService. Em seguida, o produto é adicionado ao array cartItems com a quantidade especificada. Por fim, os métodos updateProductCount e updateTotalPrice são chamados para atualizar o número de produtos no carrinho e o preço total.

  addToCart(product: Product, quantity: number): void {
    const index = this.cartItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      this.http.get<{ name: string }>('categories/' + product.category).subscribe((res) => {
        product.category = res.name;
      });
      this.cartItems.push({ product, quantity });
    }
    this.updateProductCount();
    this.updateTotalPrice();
  }

  // A função updateProductCount(): void atualiza o valor do BehaviorSubject productCountSubject com o número atual de itens no carrinho.

  updateProductCount(): void {
    this.productCountSubject.next(this.cartItems.length);
  }

  // A função getProductCount(): BehaviorSubject<number> retorna o BehaviorSubject productCountSubject, permitindo que outros componentes se inscrevam e recebam atualizações sobre o número de produtos no carrinho

  getProductCount(): BehaviorSubject<number> {
    return this.productCountSubject;
  }

  // A função updateTotalPrice(): void calcula o preço total dos itens no carrinho, multiplicando o preço de cada item pela quantidade e somando todos os valores. Em seguida, o valor do BehaviorSubject totalPriceSubject é atualizado com o preço total calculado.

  updateTotalPrice(): void {
    const totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
    this.totalPriceSubject.next(totalPrice);
  }

  // A função getTotalPrice(): BehaviorSubject<number> retorna o BehaviorSubject 

  getTotalPrice(): BehaviorSubject<number> {
    return this.totalPriceSubject;
  }

  // A função clearCart(): é responsável por limpar o carrinho

  clearCart(): void {
    this.cartItems = []; 
    this.updateProductCount();
    this.updateTotalPrice();
  }
}