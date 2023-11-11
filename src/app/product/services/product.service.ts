import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  filteredProducts = new Subject<any>()
  categories:string[]=[]
  categoriesObs = new Subject<any>()
  ProductsByCategory = new Subject<any>()
  constructor(private http: HttpClient) {}

  getAllProducts() {
    // return this.http.get<Product>('https://angular-ecommerce-json-server.onrender.com/products');
    return this.http.get<Product>('https://angular-ecommerce-json-server.onrender.com/products');
  }

  getSingleProduct(id: number) {
    // return this.http.get<Product>('https://angular-ecommerce-json-server.onrender.com/products/' + id);
    return this.http.get<Product>('https://angular-ecommerce-json-server.onrender.com/products/' + id);
  }

  // getProductsByCategory(category: string) {
  //   return this.http.get<Product>('https://angular-ecommerce-json-server.onrender.com/products/category/' + category);
  // }
  getCategories() {
    // return this.http.get('https://angular-ecommerce-json-server.onrender.com/products/categories');
    this.http.get<Product[]>('https://angular-ecommerce-json-server.onrender.com/products').subscribe(res=>{
      res.forEach(element => {
        if(!this.categories.includes(element.category)){
          this.categories.push(element.category)
        }
      });
      this.categoriesObs.next(this.categories)
    })
    return this.categoriesObs
    // return this.http.get<Product>('https://angular-ecommerce-json-server.onrender.com/categories');
  }

  editProduct(newProduct : Product, id:number){
    return this.http.put('https://angular-ecommerce-json-server.onrender.com/products/'+id,newProduct)
  }
  AddProduct(newProduct:Product){
    return this.http.post('https://angular-ecommerce-json-server.onrender.com/products/',newProduct)
  }
}
