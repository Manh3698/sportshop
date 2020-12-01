import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
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
      },
      err=>{
        console.log(err);
      }
    )
    }
  )
}
}
