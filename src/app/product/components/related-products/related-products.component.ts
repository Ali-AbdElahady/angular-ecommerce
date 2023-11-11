import { Component, ElementRef, OnInit, ViewChild,Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit, AfterViewInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log(this.box);
  }

  @Input() relatedProducts!: Product[];
  gap = 16;
  @ViewChild('myBox',{static:false}) box!:ElementRef;
  width!:any;

  ngAfterViewInit(): void {

  }



  next(carousel:HTMLElement,content:HTMLElement,nextBtn:HTMLElement,prevBtn:HTMLElement) {
    this.width = this.box.nativeElement.children[0].offsetWidth;
    carousel.scrollBy(this.width + this.gap, 0);
    if (carousel.scrollWidth !== 0) {
      prevBtn.style.display = "flex";
    }
    if (content.scrollWidth - this.width - this.gap <= carousel.scrollLeft + this.width) {
      nextBtn.style.display = "none";
    }
  }

  prev(carousel:HTMLElement,content:HTMLElement,nextBtn:HTMLElement,prevBtn:HTMLElement) {
    this.width = this.box.nativeElement.children[0].offsetWidth;
    carousel.scrollBy(-(this.width + this.gap), 0);
    if (carousel.scrollLeft - this.width - this.gap <= 0) {
      prevBtn.style.display = "none";
    }
    if (!(content.scrollWidth - this.width - this.gap <= carousel.scrollLeft + this.width)) {
      nextBtn.style.display = "flex";
    }
  }


  goBuy(proId:number){
    this.router.navigate(['./product-details',proId])
    document.body.scrollTop = 0
  }

  url=""
  imageChange(event:any){

  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    center:true,
    stagePadding:5,
    autoplay:false,
    autoplayTimeout:3000,
    smartSpeed:400,
    autoplayHoverPause:true,
    navSpeed: 700,
    margin:20,
    navText: [ 'prev','next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
