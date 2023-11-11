import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/authentication/services/auth-service.service';
import { CartsService } from 'src/app/carts/services/carts.service';
import { ProductService } from 'src/app/product/services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  isAllowed = false;
  userData!:any;


  constructor(private cartService: CartsService, private productService: ProductService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(res => {
      this.userData = res;
      if (res?.role === "admin") {
        this.isAllowed = true;
        console.log(this.isAllowed);

      }else{
        this.isAllowed = false;
        console.log(this.isAllowed);
      }
    })
    this.cartCount = JSON.parse(localStorage.getItem('myCart')!) ? JSON.parse(localStorage.getItem('myCart')!).length : 0;
    this.cartService.cartCount.subscribe((val: number) => {
      this.cartCount = val;
    })
    console.log("object");
    this.productService.getAllProducts().subscribe((res: any) => {
      this.allProducts = res;
    })
  }

  close(event: any, menu: any) {
    menu.isOpening = false;
  }

  allProducts!: Product[];
  searchRes: Product[] = [];
  searchStart = false;

  search(event: any) {
    let searchWord = event.target.value.toLowerCase();
    console.log(this.allProducts);
    if (searchWord == null) {
      return
    }
    // console.log(searchWord);
    this.searchStart = true;
    this.searchRes = this.allProducts.filter((pro: Product) => {
      return pro.title.toLowerCase().includes(searchWord) || pro.category.toLowerCase().includes(searchWord)
    })
    console.log(this.searchRes);
  }

  onFocusOutEvent(event: any) {
    setTimeout(() => {
      this.searchStart = false;
    }, 200)
  }

  logout(){
    this.authService.logout()
    this.isAllowed = false;
    this.userData=null;
  }

}
