import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-admin-carts',
  templateUrl: './admin-carts.component.html',
  styleUrls: ['./admin-carts.component.css']
})
export class AdminCartsComponent implements OnInit {
  allCarts!:any[] ;
  sortedCarts!:any[] ;
  order=false;

  constructor(private cartsService : CartsService) { }

  ngOnInit(): void {
    this.cartsService.getAllCarts().subscribe((res:any)=>{
      this.allCarts = res;
      this.sortedCarts = res;
      console.log(this.allCarts);
    })
  }

  sortById(){
    if(this.order){
      let newArr:any[] = this.sortedCarts.sort((a,b)=> a.id - b.id );
      this.sortedCarts = newArr;
    }else{
      let newArr:any[] = this.sortedCarts.sort((a,b)=> b.id - a.id );
      this.sortedCarts = newArr;
    }
    this.order=!this.order;
  }

  sortByDate(){
    if(this.order){
      let newArr:any[] = this.sortedCarts.sort((a,b)=> this.dateSortDec(a,b) );
      this.sortedCarts = newArr;
    }else{
      let newArr:any[] = this.sortedCarts.sort((a,b)=> this.dateSortAcc(a,b) );
      this.sortedCarts = newArr;
    }
    this.order=!this.order;
  }

  dateSortAcc(a:any,b:any){
    const dateA =new Date(a.date);
    const dateB =new Date(b.date);
    if (dateA>dateB){ return 1}
    else if (dateA<dateB){return -1}
    return 0;
  }

  dateSortDec(a:any,b:any){
    const dateA =new Date(a.date);
    const dateB =new Date(b.date);
    if (dateA<dateB){ return 1}
    else if (dateA>dateB){return -1}
    return 0;
  }

}
