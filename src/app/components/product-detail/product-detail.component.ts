import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent implements OnInit {
  product!: Product; // Declare the product object
  relatedProducts: Product[] = []; // Array for related products

  constructor(private route: ActivatedRoute, private apiService: ApiService ,private router: Router) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Get product ID from URL
    if (productId) {
      this.apiService.getProductById(productId).subscribe((data: Product) => {
        this.product = data; // Load the product
        this.loadRelatedProducts(this.product.category); // Fetch related products
      });
    }
  }

  loadRelatedProducts(category: string): void {
    this.apiService.getProductsByCategory(category).subscribe((data: Product[]) => {
      this.relatedProducts = data.filter(p => p.id !== this.product.id); // Exclude current product
    });
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]); // Navigate with product ID
  }

  addToCart(): void {
    this.apiService.addToCart(this.product); // Add the current product to the cart
    this.apiService.cartItemCount.next(this.apiService.cartItemCount.value + 1);
    this.router.navigate(['/cart']); // Navigate to the cart page after adding to cart
  }
}
