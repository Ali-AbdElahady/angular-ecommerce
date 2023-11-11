import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() productItem!:Product;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  getDetails(){
    this.router.navigate(['/product-details',this.productItem.id])
  }

}
