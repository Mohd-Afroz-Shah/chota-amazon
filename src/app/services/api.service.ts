import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.productsPath
  public cart: Product[] = [];
  public cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getProducts() {
    try {
      console.log('Api working!');
      return this.http.get(this.apiUrl);
    } catch (error) {
      throw new Error();
    }
  }

  // Get a product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }

  // Add product to cart
  addToCart(product: Product): void {
    this.cart.push(product);
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(product => product.id !== productId);
  }

  // Get cart items
  getCartItems(): Product[] {
    return this.cart;
  }

  getCartItemCountObservable(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  // Update the item count in BehaviorSubject
  private updateCartCount(): void {
    this.cartItemCount.next(this.cart.length); // Emit new count of items in the cart
  }

  // getProducts() {
  //   return [
  //     { name: 'Product 1', price: 100 },
  //     { name: 'Product 2', price: 150 },
  //     { name: 'Product 3', price: 200 },
  //     { name: 'Product 4', price: 250 },
  //     { name: 'Product 5', price: 300 },
  //     { name: 'Product 6', price: 350 },
  //     { name: 'Product 7', price: 400 },
  //     { name: 'Product 8', price: 450 },
  //   ];
  // }
}
