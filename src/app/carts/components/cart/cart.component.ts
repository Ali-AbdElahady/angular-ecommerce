import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart.model';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() deleteCart = new EventEmitter<number>;
  @Input() myCarts!:Cart[];
  @Input() totalPrice : number = 0;

  @Input() cart!:Cart;
  @Input() index!:number;

  constructor(private cartsService : CartsService) { }

  ngOnInit(): void {

  }

  delete(id:number){
    this.deleteCart.emit(id);
    this.getTotal()
  }

  minimizeQuant(id:number){
    if(this.cart.quantity == 1){
      return
    }
    this.myCarts[this.index].quantity = this.cart.quantity - 1;
    localStorage.setItem('myCart',JSON.stringify(this.myCarts));
    this.getTotal()
  }

  plusQuant(id:number){
    if(this.cart.quantity == 5){
      return
    }
    this.myCarts[this.index].quantity = this.cart.quantity + 1;
    localStorage.setItem('myCart',JSON.stringify(this.myCarts));
    this.getTotal()
  }

  getTotal(){
    this.totalPrice = 0 ;
    for(let x = 0; x<this.myCarts.length; x++){
      this.totalPrice += this.myCarts[x].item.price * this.myCarts[x].quantity;
    }
    this.cartsService.totalPrice.next(this.totalPrice)
  }

}
