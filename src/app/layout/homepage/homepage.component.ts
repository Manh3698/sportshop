import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public sliders: Array<any> = [];
  constructor(private productService: ProductService) {
  }
  listProduct;
  ListClothes = [];
  ListItem = [];
  ListItemHot = [];
  ngOnInit(): void {
    this.getAll();
    
  }
  getAll(){
    this.productService.getAll().subscribe(
      (res:any)=>{
        this.listProduct=res.data;
        this.listProduct.forEach(e => {
          if(e.categoryId == 1 || e.categoryId == 2 || e.categoryId == 3){
            this.ListClothes.push(e);
          }
        });
        this.listProduct.forEach(e => {
          if(e.isHot == 1){
            this.ListItemHot.push(e);
          }
        });
        this.listProduct.forEach(e => {
          if(e.categoryId == 4 || e.categoryId == 5 || e.categoryId == 6 || e.categoryId == 7 || e.categoryId == 8){
            this.ListItem.push(e);
          }
        });
      },
      err=>{

      }
    )
  }
  
}
