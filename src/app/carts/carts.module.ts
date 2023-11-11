import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { AllCartsComponent } from './components/all-carts/all-carts.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing-module';
import { AdminCartsComponent } from './components/admin-carts/admin-carts.component';
import { AdminSingleCartComponent } from './components/admin-single-cart/admin-single-cart.component';



@NgModule({
  declarations: [
    CartComponent,
    AllCartsComponent,
    AdminCartsComponent,
    AdminSingleCartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class CartsModule { }
