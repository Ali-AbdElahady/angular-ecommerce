import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/authentication/services/auth-service.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { User } from 'src/app/shared/models/user.model';
import { CartsService } from '../../services/carts.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-carts',
  templateUrl: './all-carts.component.html',
  styleUrls: ['./all-carts.component.css'],
})
export class AllCartsComponent implements OnInit {
  myCarts: Cart[] = [];
  totalPrice!: number;
  isUser: boolean = false;
  userData!: User;

  constructor(
    private cartService: CartsService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {

    this.authService.userData.subscribe((res:any)=>{
      console.log(res);
      this.userData = res;
      if (res?.role == 'user') {
        this.isUser = true;
      }
    })

    this.myCarts = JSON.parse(localStorage.getItem('myCart')!);

    this.totalPrice = 0;
    for (let x = 0; x < this.myCarts.length; x++) {
      this.totalPrice += this.myCarts[x].item.price * this.myCarts[x].quantity;
    }

    this.cartService.totalPrice.subscribe((totalPrice: number) => {
      this.totalPrice = totalPrice;
    });


  }

  deleteCart(id: number) {
    console.log(id);
    let deleteId = this.myCarts.findIndex((item) => {
      return item.item.id == id;
    });
    if (deleteId >= 0) {
      this.myCarts.splice(deleteId, 1);
      localStorage.setItem('myCart', JSON.stringify(this.myCarts));
      this.cartService.changeCartCount(this.myCarts.length);
    }
  }

  hi() {
    console.log(this.isUser);
  }

  buy() {
    console.log(this.myCarts);
    let products: {
      productId: number;
      quantity: number;
    }[] = [];
    this.myCarts.forEach((cart) => {
      products.push({
        productId: cart.item.id,
        quantity: cart.quantity,
      });
    });
    const event: Date = new Date();
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    let currDate = event.toLocaleDateString(undefined, options);

    let myCart = {
      userId: this.userData.id,
      date: currDate,
      products: products,
    };
    // console.log(myCart);
    this.cartService.submitCarts(myCart).subscribe((res) => {
      console.log(res);
    });
    localStorage.setItem('myCart', JSON.stringify([]));
    this.myCarts = [];
    this.cartService.cartCount.next(0)
  }
}
