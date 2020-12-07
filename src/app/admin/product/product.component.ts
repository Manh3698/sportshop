import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  
import { ProductService } from 'src/app/services/product.service';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  public Editor = ClassicEditor;
  listProduct;
  // cateId: any;
  params:any;
  cateId = parseInt(this.activatedRoute.snapshot.paramMap.get('cateId'));
  cateName = decodeURIComponent(String(this.activatedRoute.snapshot.paramMap.get('cateName')));
    // console.log(this.cateId);
  dataProduct = {
    categoryId: this.cateId,
    content: '',
    createBy: '',
    create_date: '',
    description: '',
    id: '',
    code: '',
    images: '',
    name: '',
    color: '',
    size:'',
    isHot: '',
    isNew: '',
    newPrice: '',
    oldPrice: '',
    quantity: '',
    status: '',
    updateBy: '',
    update_date: ''
  };
  hot = [
    {
      isHot : "true"
    },
    {
      isHot : "false"
    }
  ]
  new = [
    {
      isNew : "true"
    },
    {
      isNew : "false"
    }
  ]
  files = [];
  isEdit = false;
  productId:any;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.getByCateId();
  }
  getByCateId(){
    // this.params = this.activatedRoute.params.subscribe(params => {
    //   this.cateId = params['cateId'];
      this.productService.getByCateId(this.cateId).subscribe(
        (res: any) => {
          this.listProduct = res.data;
        },
        error => {
        }
      )
    // })
  }
  detailProduct(productId: any) {
    this.productService.getByProductId(productId).subscribe(
      (res: any) => {
        this.files = []
        this.dataProduct = res.data;
      },
      error => {
        console.log(error)
      }
    )
  }
  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      (res: any) => {
        alert("thành công");
        this.getByCateId();  
        $('modalDelete').modal('hide');    
      },
      error => {
        console.log(error)
      }
    )
  }
  save() {
    if(this.isEdit){
      this.productService.updateProduct(this.dataProduct, this.files).subscribe(res => {
        alert("done");
        this.getByCateId();
        $('#modalEdit').modal('hide');
      }, err => {

      })
    } else {
      this.productService.addProduct(this.dataProduct, this.files).subscribe(res => {
        this.getByCateId();
        $('#modalEdit').modal('hide');
      }, err => {

      })
    }

  }

  addNew() {
    this.isEdit = false;
    this.resetData();
    this.files = []
  }

  onChangeFile() {
    for (const file of this.fileInput.nativeElement.files) {
      this.files.push(file);
    }
  }

  resetData(){
    this.dataProduct = {
      categoryId: this.cateId,
      content: '',
      createBy: '',
      create_date: '',
      description: '',
      id: '',
      code:'',
      images: '',
      name: '',
      color: '',
      size:'',
      isHot: '',
      isNew: '',
      newPrice: '',
      oldPrice: '',
      quantity: '',
      status: '',
      updateBy: '',
      update_date: ''
    };
  }

}
