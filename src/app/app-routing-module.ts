import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router"
import { AuthPageComponent } from "./authentication/components/auth-page/auth-page.component";
import { RegisterComponent } from "./authentication/components/register/register.component";
import { AdminCartsComponent } from "./carts/components/admin-carts/admin-carts.component";
import { AllCartsComponent } from "./carts/components/all-carts/all-carts.component";
import { HomeComponent } from "./home/components/home/home.component";
import { AllProductsComponent } from "./product/components/all-products/all-products.component";
import { ProductDetailsComponent } from "./product/components/product-details/product-details.component";
import { ProductEditComponent } from "./product/components/product-edit/product-edit.component";

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"products",component:AllProductsComponent},
  {path:"product-details/:id",component:ProductDetailsComponent},
  {path:"auth/login",component:AuthPageComponent},
  {path:"auth/register",component:RegisterComponent},
  {path:"new",component:ProductEditComponent},
  {path:"product-details/:id/edit",component:ProductEditComponent},
  {path:"carts",component:AllCartsComponent},
  {path:"admin-carts",component:AdminCartsComponent},
  {path:"**",redirectTo:"home",pathMatch:"full"},
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}

