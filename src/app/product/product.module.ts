import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RelatedProductsComponent } from './components/related-products/related-products.component';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    ProductComponent,
    RelatedProductsComponent,
    FilterComponent,
    ProductEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    RouterModule,
    CarouselModule,
    NgxPaginationModule
  ],
  exports:[
    AllProductsComponent,
    ProductDetailsComponent
  ]
})
export class ProductModule { }
