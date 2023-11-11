import { Component, OnInit,Input } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(private productService: ProductService) { }
  @Input() category!: string;
  @Input() className!:string;
  categoryProducts!: Product[];

  ngOnInit(): void {
    // debugger
    this.productService.getAllProducts().subscribe((res:any)=>{
      this.categoryProducts = res.filter((Element:any)=>{
        return Element.category == this.category
      })

    })

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    center:true,
    stagePadding:5,
    margin:20,
    autoplay:true,
    autoplayTimeout:3000,
    smartSpeed:2000,
    autoplayHoverPause:true,
    navSpeed: 200,
    navText: [ 'prev','next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }




}
