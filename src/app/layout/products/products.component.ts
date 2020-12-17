import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }
  listProduct = [];
  cateId;
  params;
  cateName;
  dataProduct : [
  ]
  ngOnInit(): void {
    this.cateName = decodeURIComponent(String(this.activatedRoute.snapshot.paramMap.get('cateName')));
    this.getAll();
    $('#filter1').on('click', function(){
      this.listProduct = this.listProduct.data.filter(element => {
             return (element.newPrice < 300000 && element.newPrice > 100000);
           })
           console.log(this.listProduct)
    })
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
  checkbox = [
    { name: 'Giá dưới 100.000đ', id: 1},
    { name: '100.000d - 300.000đ', id:2},
    { name: '300.000đ - 500.000đ', id:3},
    { name: '500.000đ - 1000.000đ', id:4}
  ]
  radio = [
    { name: 'Tên A-Z', id:1},
    { name: 'Tên Z-A', id:2},
    { name: 'Giá thấp đến cao', id:4},
    { name: 'Giá cao đến thấp', id:5}
  ]
  size =[
    { name: 'Lớn', id:5},
    { name: 'Nhỏ', id:6},
    { name: 'Vừa', id:7},
    { name: 'M', id:8},
    { name: 'L', id:9},
    { name: 'S', id:10},
    { name: 'XL', id:11}
  ]
  sort(id){
    if(id===1){
      this.listProduct = this.listProduct.sort((a,b)=>a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true}))
    }
    if(id===2){
    this.listProduct = this.listProduct.sort((a,b)=>b.name.localeCompare(a.name, 'fr', {ignorePunctuation: true}))
    }
    if(id===4){
       this.listProduct = this.listProduct.sort((a,b)=>a.newPrice - b.newPrice )
    }
    if(id===5){
      this.listProduct = this.listProduct.sort((a,b)=>b.newPrice - a.newPrice )
   }
  }
  filter(id){
    if(id==1){
      
    }
    if(id==2){

    }
    if(id==3){

    }
    if(id==4){

    }
    if(id==5){

    }
    if(id==6){
      
    }
    if(id==7){

    }
    if(id==8){

    }
    if(id==9){

    }
    if(id==10){

    }
    if(id==11){

    }
  }
  

// if ( $('#filter1').on('click', function(){})) {
//   res.data.filter(element => {
//      if(element.newPrice < 100000){
//        this.listProduct.push(element)
//      }
//    })      
//  }
//  else if ( $('#filter2').on('click', function(){})) {
//    this.listProduct = res.data.filter(element => {
//      return (element.newPrice < 300000 && element.newPrice > 100000);
//    })
//    console.log(this.listProduct)
//  }
//  else if ( $('#filter3').on('click', function(){})) {
//    this.listProduct = res.data.filter(element => {
//      return (element.newPrice < 500000 && element.newPrice > 300000);
//    })
//    console.log(this.listProduct)
//  }
//  else if ( $('#filter4').on('click', function(){})) {
//    this.listProduct = res.data.filter(element => {
//      return (element.newPrice < 1000000 && element.newPrice > 500000);
//    })
//    console.log(this.listProduct)
//  }
//  else {
//    return this.listProduct = res.data;
//  }
}
