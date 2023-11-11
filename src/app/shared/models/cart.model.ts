import { Product } from './product.model';
export class Cart {
  public item: Product;
  public quantity: number;
  constructor(item: Product, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }
}
