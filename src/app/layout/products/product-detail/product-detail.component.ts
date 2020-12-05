import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  public Editor = ClassicEditor;
  productId = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private headerService : HeaderService) { }
  detail = {
    categoryId: this.productId,
    content: '',
    createBy: '',
    create_date: '',
    description: '',
    id: this.productId,
    code: '',
    images: '',
    name: '',
    color: '',
    size:'',
    newPrice: '',
    oldPrice: '',
    quantity: '',
    status: '',
    updateBy: '',
    update_date: ''
  };
  discount;
  quantityInput
  ngOnInit(): void {
    this.productService.getByProductId(this.productId).subscribe(
      (res:any)=>{
        this.detail = res.data;
        this.discount = parseInt(this.detail.oldPrice) - parseInt(this.detail.newPrice);
      },
      err=>{
        console.log(err)
      }
    )
  }
  listCart = [];
  addtocart(){
    if(localStorage.getItem('cart')){
      this.listCart = JSON.parse(localStorage.getItem('cart'));
    }
    const data = {
      id : this.productId,
      quantity: parseInt(this.quantityInput)
    }
    // if(!this.listCart.includes(this.listCart.find(res => res.id === this.productId))){
    //   this.listCart.push(data);
    // } 
    if(!this.listCart.includes(this.listCart.find(res => res.id === this.productId))){
      this.listCart.push(data);
      this.headerService.count = this.headerService.count + 1;
      document.getElementById('count').innerText = (this.headerService.count).toString();
    }    
    localStorage.setItem('cart',JSON.stringify(this.listCart));
  }

}
