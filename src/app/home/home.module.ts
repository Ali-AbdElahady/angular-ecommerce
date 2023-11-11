import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { AppRoutingModule } from '../app-routing-module';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CarouselModule
  ]
})
export class HomeModule { }
