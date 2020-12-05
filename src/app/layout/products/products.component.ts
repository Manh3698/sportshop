import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
 
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }
  listProduct;
  cateId;
  params;
  dataProduct : [
  ]
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.params = this.activatedRoute.params.subscribe(params => {
    this.cateId = params['cateId'];
    this.productService.getByCateId(this.cateId).subscribe(
      (res:any)=>{ 
        this.listProduct = res.data;
        // if ( this.filter1()) {
        //   this.listProduct = res.data.filter(element => {
        //     return element.newPrice < 100000;
        //   })
        //   console.log(this.listProduct)
        // }
        // else if ( $('#filter-100-000d-300-000d').on('click', function(){})) {
        //   this.listProduct = res.data.filter(element => {
        //     return (element.newPrice < 300000 && element.newPrice > 100000);
        //   })
        //   console.log(this.listProduct)
        // }
        // else if ( $('#filter-300-000d-500-000d').on('click', function(){})) {
        //   this.listProduct = res.data.filter(element => {
        //     return (element.newPrice < 500000 && element.newPrice > 300000);
        //   })
        //   console.log(this.listProduct)
        // }
        // else if ( $('#filter-500-000d-1-000-000d').on('click', function(){})) {
        //   this.listProduct = res.data.filter(element => {
        //     return (element.newPrice < 1000000 && element.newPrice > 500000);
        //   })
        //   console.log(this.listProduct)
        // }
        // else {
        //   return this.listProduct = res.data;
        // }
      },
      err=>{
        console.log(err);
      }
    )
    }
  )
}
}
