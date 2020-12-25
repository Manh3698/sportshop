import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public sliders: Array<any> = [];
  constructor(private productService: ProductService, private route : Router) {
    this.sliders.push(
      {
          imagePath: 'assets/images/banner/bannerkm2.webp',
          label: 'First slide label',
          text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
          imagePath: 'assets/images/banner/banner1.jpg',
          label: 'Second slide label',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
          imagePath: 'assets/images/banner/banner_clb_2.jpg',
          label: 'Third slide label',
          text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
  );
  }
  listProduct;
  ListClothes = [];
  ListItem = [];
  ListItemHot = [];
  ngOnInit(): void {
    this.getAll();
    this.getHot()
  }
  getHot(){
    this.productService.getHot().subscribe(
      (res:any)=>{
        this.ListItemHot = res.data;
      },
      error=>{
        console.log(error)
      }
    )
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
        // this.listProduct.forEach(e => {
        //   if(e.isHot == 1){
        //     this.ListItemHot.push(e);
        //   }
        // });
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
