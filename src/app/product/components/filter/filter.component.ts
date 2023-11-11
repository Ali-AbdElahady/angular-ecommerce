import { AfterViewInit, Component, OnInit, ViewChild,  } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, AfterViewInit  {
  Categories: any = [];
  allProducts!: Product[];
  filteredProducts!: Product[];
  @ViewChild('filterForm', { static: false }) filterForm!: NgForm;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe((res) => {
      this.Categories = res;
    });
    this.productService.getAllProducts().subscribe((res: any) => {
      this.allProducts = res;
      this.filteredProducts = res;
      this.resetFilters()
    });
    
  }

  ngAfterViewInit(): void {
    
  }
  

  onSubmit(filterForm: NgForm) {
    let min: number = +filterForm.value.minPrice;
    let max: number = +filterForm.value.maxPrice;
    let categoryFilter:any[]=[];
    let categoryElements = document.querySelectorAll('.categoryFilter input:checked');
    categoryElements.forEach((cat:any)=>{categoryFilter.push(cat.value)})
    if (max == 0) {
      max = 10000;
    }
    this.filteredProducts = this.allProducts.filter(product=>{
      if(categoryFilter.length < 1){
        categoryFilter = this.Categories
      }
      return categoryFilter.includes(product.category) && product.price >= min && product.price <= max
    })
    this.productService.filteredProducts.next(this.filteredProducts)
  }

  reset(){
    this.filteredProducts = this.allProducts;
    this.productService.filteredProducts.next(this.filteredProducts)
    this.resetFilters()
  }

  private resetFilters(){
    this.filterForm.setValue({
      'minPrice' : 10,
      'maxPrice' : 10000
    })
    let categoryElements = document.querySelectorAll('.categoryFilter input')
    categoryElements.forEach((input:any)=>{
      input.checked = true;
    })
  }
}
