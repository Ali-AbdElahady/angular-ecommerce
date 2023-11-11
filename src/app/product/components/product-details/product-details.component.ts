import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthServiceService } from 'src/app/authentication/services/auth-service.service';
import { CartsService } from 'src/app/carts/services/carts.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id!: number;
  currentProduct!: Product;
  relatedProducts!: Product[];
  myCarts: Cart[] = [];
  isLoading = false;
  userinfo!: any;
  isAllowed=false;
  notValidQuant=false;

  constructor(
    private productService: ProductService,
    private cartService: CartsService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.productService.getSingleProduct(this.id).subscribe((currPro) => {
        this.currentProduct = currPro;
        this.productService.getAllProducts().subscribe((res: any) => {
          let myProducts = res.filter((Element: any) => {
            return Element.category == this.currentProduct.category;
          });
          this.relatedProducts = myProducts;
        });

        this.isLoading = false;
      });

      this.authService.userData.subscribe((res:any)=>{
        this.userinfo = res;
        if(res?.role == "admin"){
          this.isAllowed = true;
        }
      })
    });


    console.log(JSON.parse(localStorage.getItem('myCart')!));
  }

  addToCart(quant: HTMLInputElement) {
    let quantity: number = +quant.value;
    if (quantity < 1){
      this.notValidQuant = true
      return
    }

    if ('myCart' in localStorage) {
      this.myCarts = JSON.parse(localStorage.getItem('myCart')!);
      let indexOfExist = this.myCarts.findIndex((item: Cart) => {
        return this.currentProduct.id == item.item.id;
      });
      if (indexOfExist >= 0) {
        this.myCarts[indexOfExist].quantity += quantity;
        localStorage.setItem('myCart', JSON.stringify(this.myCarts));
        console.log(JSON.parse(localStorage.getItem('myCart')!));
      } else {
        this.myCarts.push({ item: this.currentProduct, quantity: quantity });
        localStorage.setItem('myCart', JSON.stringify(this.myCarts));
        this.cartService.changeCartCount(this.myCarts.length);
      }
    } else {
      this.myCarts.push({ item: this.currentProduct, quantity: quantity });
      localStorage.setItem('myCart', JSON.stringify(this.myCarts));
      this.cartService.changeCartCount(this.myCarts.length);
    }
  }

  changeImg(event: Event, mainImg: HTMLImageElement) {
    mainImg.src = (<HTMLImageElement>event.target).src;
  }
}
