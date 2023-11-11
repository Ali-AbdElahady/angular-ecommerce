import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing-module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { DropDownDirective } from './dropDownDiewctive';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
    DropDownDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
    DropDownDirective
  ]
})
export class SharedModule { }
