import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../services/product.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id!: number;
  categories!: [];
  currentProduct!: Product;
  relatedProducts!: Product[];
  myCarts: Cart[] = [];
  isLoading = false;
  isNewCate = false;
  images: string[] = [];
  imageCount: number = 0;
  editMode: boolean = false;
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      console.log(this.editMode);



      if (this.editMode) {
        this.productService.getSingleProduct(this.id).subscribe((currPro) => {
          console.log(currPro);
          this.currentProduct = currPro;
          this.productService.getAllProducts().subscribe((res: any) => {
            let myProducts = res.filter((Element: any) => {
              return Element.category == this.currentProduct.category;
            });
            this.relatedProducts = myProducts;
          });
          this.images = this.currentProduct.image;
          console.log(this.images);
          this.imageCount = this.images.length;
          this.isLoading = false;
          this.initForm();
        });
      } else {
        // this.images.push(
        //   'https://www.kalypsofarms.com/wp-content/uploads/2019/08/dummy.png'
        // );
        this.isLoading = false;
        this.initForm();
      }
    });

    this.productService.getCategories().subscribe((res) => {
      this.categories = res;
    });

    this.productForm.statusChanges.subscribe((states)=>{console.log(states);})
  }

  changeCat(
    item: string,
    categBut: HTMLButtonElement,
    categInput: HTMLInputElement
  ) {
    categBut.innerHTML = item;
    this.productForm.patchValue({
      category: item
    })
    this.isNewCate = false;
  }

  AddNewCat(
    categBut: HTMLButtonElement,
    newCat: HTMLInputElement
  ) {
    categBut.innerHTML = newCat.value;
    this.productForm.patchValue({
      category: newCat.value
    })
    newCat.value = '';
    this.isNewCate = false;
  }

  changeImg(mainImg: HTMLImageElement, item: any, event: Event) {
    let img: any = document.querySelector('.previews img.active');
    img.classList.remove('active');
    (<HTMLImageElement>event.target).classList.add('active');
    mainImg.src = item.changingThisBreaksApplicationSecurity || item;
  }

  loadFile(event: Event, mainImg: HTMLImageElement){
    let mainImage: any = document.getElementById('output');
    let img: any = document.querySelector('.previews img.active') || 0;
    let index: number = img.alt || 0;
    let file: File = (<HTMLInputElement>event.target).files![0];

    if(this.editMode){
      this.loadFileChange(file,index,mainImage)
    }else{
      if (this.imageCount == 4) {
        this.loadFileChange(file,index,mainImage)
      }else {
        this.imageCount++;
        this.loadFileAdd(file,mainImage)

      }
    }
  }

  loadFileChange(file: File, index: number,mainImg :HTMLImageElement ) {
      this.convertFileToBase64Change(file, index);
      mainImg.src = URL.createObjectURL(file);
  }

  convertFileToBase64Change(file: File, i: number) {
    let reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => {
      this.images[i] = reader.result as string;
    };
  }

  convertFileToBase64Add(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => {
      this.images.push(reader.result as string)
    };
  }

  loadFileAdd(file: File, mainImg :HTMLImageElement ) {
    this.convertFileToBase64Add(file);
    mainImg.src = URL.createObjectURL(file);
  }

  sanitize(url: any) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  proCategory!: FormControl;
  proTitle!: FormControl;
  proPrice!: FormControl;
  proQuantity!: FormControl;
  proDescription!: FormControl;
  notValid=false;
  newProduct!:Product;

  private initForm() {
    if (this.editMode) {
      this.proCategory = new FormControl(
        this.currentProduct.category,
        Validators.required
      );
      this.proTitle = new FormControl(
        this.currentProduct.title,
        Validators.required
      );
      this.proPrice = new FormControl(
        this.currentProduct.price,
        Validators.required
      );
      this.proQuantity = new FormControl(
        this.currentProduct.rating.count,
        Validators.required
      );
      this.proDescription = new FormControl(
        this.currentProduct.description,
        Validators.required
      );

      this.productForm = new FormGroup({
        category: this.proCategory,
        title: this.proTitle,
        price: this.proPrice,
        quantity: this.proQuantity,
        description: this.proDescription,
      });
    } else {
      this.proCategory = new FormControl(null, Validators.required);
      this.proTitle = new FormControl(null, Validators.required);
      this.proPrice = new FormControl(null, Validators.required);
      this.proQuantity = new FormControl(null, Validators.required);
      this.proDescription = new FormControl(null, Validators.required);

      this.productForm = new FormGroup({
        category: this.proCategory,
        title: this.proTitle,
        price: this.proPrice,
        quantity: this.proQuantity,
        description: this.proDescription,
      });
    }
  }

  onSubmit() {
    if(!this.productForm.valid || this.images.length < 1){
      this.notValid=true;
      return
    }
    let category = this.productForm.controls['category'].value;
    let title = this.productForm.controls['title'].value;
    let price = this.productForm.controls['price'].value;
    let quantity = +this.productForm.controls['quantity'].value;
    let description = this.productForm.controls['description'].value;
    if(this.editMode){
      let id = this.currentProduct.id;
      this.newProduct = new Product(id,title,description,category,this.images,price,{rate:3,count:quantity})
      this.productService.editProduct(this.newProduct,id).subscribe(res=>{
        console.log(res);
      })

    }else{
      let id = +this.getUUID;
      this.newProduct = new Product(id,title,description,category,this.images,price,{rate:3,count:quantity})
      this.productService.AddProduct(this.newProduct).subscribe(res=>{
        console.log(res);
      })
    }

    this.productForm.reset();
  }

  getUUID() {
    // eslint gets funny about bitwise
    /* eslint-disable */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
    /* eslint-enable */
  }

}
