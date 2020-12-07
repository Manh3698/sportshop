import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listData = [];
  listDataLocalStorage = [];
  listId;
  total = 0;
  count;
  price_item;
  quantityInput = 1;
  isDisable = false;
  
  constructor(private productService: ProductService) { 
    
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('cart'))
    this.listDataLocalStorage = this.listId = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    this.productService.getAll().subscribe((res: any) => {
      res.data.forEach(element => {
        if (this.listDataLocalStorage.find(rs => rs.id == element.id)) {
          this.listData.push(element);      
        }
      });
      this.count = Object.keys(this.listData).length;
      for (const item of this.listData) {
        this.total = this.total+ (parseInt(item.newPrice)*this.quantityInput);
      }
    })
  }
    
  
  // add(id){
  //   this.listData.forEach(element => {
  //     if(element.id == id){
        
  //     }
  //     else{
  //       this.isDisable = true;
  //     }
  //   });
    
  // }
  // sub(id){
  //   this.quantityInput = this.quantityInput-1;
  // }
}
