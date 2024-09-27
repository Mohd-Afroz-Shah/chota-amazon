import { Routes } from '@angular/router';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    { path: '', component: AllproductsComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
  ];
