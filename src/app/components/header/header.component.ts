import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  itemCount: number = 0;
  constructor (private router: Router,private apiService: ApiService) {};
  ngOnInit(): void {
    this.updateCartCount();
    this.apiService.getCartItemCountObservable().subscribe(count => {
      this.itemCount = count;
    });
  }

  updateCartCount(): void {
    this.itemCount = this.apiService.getCartItems().length;
  }

  moveToCart(){
    console.log('Move to cart using button')
    this.router.navigate(['/cart']);
  }
  moveToHome(){
    this.router.navigate(['']);
  }
}