import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// export interface Product{
// name:string,
// price:number
// }
@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.scss'
})
export class AllproductsComponent implements OnInit{

  products:Product[] =[];
  
  constructor(private apiService: ApiService, private router: Router) {}
  
  ngOnInit(): void {
    this.getallProducts();
  }
  protected _onDestory = new Subject<void>();


  getallProducts(){
    this.apiService
    .getProducts()
    .pipe(takeUntil(this._onDestory))
    .subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (error: HttpErrorResponse) => {
      }
    })
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]); // Navigate with product ID
  }

  images: string[] = [
    'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'
  ];

  currentIndex: number = 0;

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  ngOnDestroy():void{
    this._onDestory.next();
    this._onDestory.complete();
  }
}