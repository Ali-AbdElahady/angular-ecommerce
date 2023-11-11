import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './app.component';
import { CartsModule } from './carts/carts.module';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './authentication/authentication.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ProductModule,
    CartsModule,
    HomeModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    CarouselModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
