import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  cartCount = new Subject<number>();
  totalPrice = new Subject<number>();

  constructor(private http: HttpClient) {}

  changeCartCount(val: number) {
    this.cartCount.next(val);
  }

  getAllCarts() {
    return this.http.get('https://angular-ecommerce-json-server.onrender.com/carts');
  }

  getUserById(id: number) {
    let token = 'admin-token';
    return this.http.get<User>('https://angular-ecommerce-json-server.onrender.com/users/' + id, {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    });
  }

  submitCarts(cart: any) {
    return this.http.post('https://angular-ecommerce-json-server.onrender.com/carts', cart);
  }
}
