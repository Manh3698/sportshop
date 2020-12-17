import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HeaderService } from 'src/app/services/header.service';
declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  public Editor = ClassicEditor;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private headerService: HeaderService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }
  listImage = []
  discount;
  quantityInput;
  listProductByCate;
  listHot = [];
  productId;
  detail;
  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));
    console.log(this.productId)
    this.detail = {
      categoryId: '',
      content: '',
      description: '',
      id: this.productId,
      code: '',
      images: [],
      name: '',
      color: '',
      size: '',
      newPrice: '',
      oldPrice: '',
      quantity: '',
      status: ''
    };
    this.productService.getByProductId(this.productId).subscribe(
      (res: any) => {
        this.detail = res.data;
        for (let i = 0; i < this.detail.images.length; i++) {
          this.listImage.push(this.detail.images[i])
        }
        console.log(this.detail)
        this.discount = parseInt(this.detail.oldPrice) - parseInt(this.detail.newPrice);
        this.productService.getByCateId(this.detail.categoryId).subscribe(
          (res: any) => {
            this.listProductByCate = res.data
          },
          err => {

          }
        )
      },
      err => {
        console.log(err)
      }
    )
    this.productService.getAll().subscribe(
      (res: any) => {
        res.data.forEach(e => {
          if (e.isNew == 1) {
            this.listHot.push(e)
          }
        });
      },
      err => {

      }
    )
  }
  listCart = [];
  addtocart() {
    if (localStorage.getItem('cart')) {
      this.listCart = JSON.parse(localStorage.getItem('cart'));
    }
    const data = {
      id: this.productId,
      quantity: parseInt(this.quantityInput)
    }
    if (!this.listCart.includes(this.listCart.find(res => res.id === this.productId))) {
      this.listCart.push(data);
      this.headerService.count = this.headerService.count + 1;
      document.getElementById('count').innerText = (this.headerService.count).toString();
    }
    localStorage.setItem('cart', JSON.stringify(this.listCart));
  }
  // load(id){
  //   this.productId = id;
  //   this.listHot = []
  //   this.router.navigate(['/' + id + '/detail']);
  //   this.ngOnInit()

  // }
}
