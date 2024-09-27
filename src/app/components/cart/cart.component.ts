import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private apiService: ApiService, private router:Router) {}

  ngOnInit(): void {
    this.cartItems = this.apiService.getCartItems(); // Load cart items
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    this.apiService.removeFromCart(productId);
    this.apiService.cartItemCount.next(this.apiService.cartItemCount.value - 1);
    this.cartItems = this.apiService.getCartItems(); // Update cart items
  }

  // Placeholder function for placing an order
  placeOrder(){
    this.apiService.cartItemCount.next(0);
    this.cartItems = this.apiService.getCartItems(); 
    alert('Order placed successfully!');
    this.router.navigate(['']);
  }
}
