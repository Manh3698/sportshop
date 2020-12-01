import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listData = [];
  listDataLocalStorage = [];
  listId;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listDataLocalStorage = this.listId = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    this.productService.getAll().subscribe((res: any) => {
      res.data.forEach(element => {
        if (this.listDataLocalStorage.find(rs => rs.id == element.id)) {
          this.listData.push(element);
          
        }
      });
      console.log(this.listData);    
    })

  }

}
