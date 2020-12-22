import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
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
  searchText
  cateId = parseInt(this.activatedRoute.snapshot.paramMap.get('cateId'));
  cateName = decodeURIComponent(String(this.activatedRoute.snapshot.paramMap.get('cateName')));
    // console.log(this.cateId);
  dataProduct = {
    categoryId: this.cateId,
    content: '',
    createBy: '',
    createDate: '',
    description: '',
    id: '',
    code: '',
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
    updateDate: ''
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
  isEdit = true;
  productId:any;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getByCateId();
  }
  getByCateId(){
      this.productService.getByCateId(this.cateId).subscribe(
        (res: any) => {
          this.listProduct = res.data;
          console.log(this.listProduct)
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
  // deleteProduct(productId: string) {
  //   this.productService.deleteProduct(productId).subscribe(
  //     (res: any) => {
  //       alert("thành công");
  //       this.getByCateId();  
  //       $('modalDelete').modal('hide');    
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }
  deleteProduct(id){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.getByCateId()
            },
            err=>{
              console.log(err)
            }
          )
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Type product is safe',
          'error'
        )
      }
    })
  }
  save() {
    if(this.isEdit){
      this.productService.updateProduct(this.dataProduct, this.files).subscribe(res => {
        this.toastr.success('cập nhật thành công')
        this.getByCateId();
        $('#modalEdit').modal('hide');
      }, err => {

      })
    } else {
      this.productService.addProduct(this.dataProduct, this.files).subscribe(res => {
        this.toastr.success('thêm thành công')
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
    this.files = [];
    for (const file of this.fileInput.nativeElement.files) {
      this.files.push(file);
    }
  }

  resetData(){
    this.dataProduct = {
      categoryId: this.cateId,
      content: '',
      createBy: '',
      createDate: '',
      description: '',
      id: '',
      code:'',
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
      updateDate: ''
    };
  }

}
