import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-admin-single-cart',
  templateUrl: './admin-single-cart.component.html',
  styleUrls: ['./admin-single-cart.component.css']
})
export class AdminSingleCartComponent implements OnInit {
  @Input() index!:number;
  @Input() userCarts!:any;
  userInfo!:User;
  allProducts!:Product[];

  constructor(private productsService : ProductService, private cartsService : CartsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res:any)=>{
      this.allProducts=res;
    });
    this.cartsService.getUserById(this.userCarts.userId).subscribe((res:any)=>{
      this.userInfo = res;
    })

  }



  getProductInfo(productId:number){
    let currProduct = this.allProducts.find(pro=>{
      return pro.id == productId
    })
    return currProduct as any;
  }
}
