import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CateProductService } from 'src/app/services/cate-product.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-cate-products',
  templateUrl: './cate-products.component.html',
  styleUrls: ['./cate-products.component.css']
})
export class CateProductsComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  listCate:any;
  cateId: any;
  searchText;
  dataCate = {
    id: '',
    name: '',
    type: '',
    updateBy: '',
    update_date: '',
    createBy: '',
    create_date: ''
  }
  types = [
    {
      "name" : "item"
    },
    {
      "name" : "clothes"
    }
  ]
  constructor(private cateService: CateProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.cateService.getAll().subscribe(
      (res:any)=>{
        this.listCate = res.data;
      },
      err=>{
        console.log(err)
      }
    )
  }
  detail(cateId:any){
    this.cateService.getById(cateId).subscribe(
      (res:any)=>{
        this.dataCate =res.data;
      },
      err=>{

      }
    )
  }
    dataCateAdd = {
      id: '',
      name: '',
      type: '',
      updateBy: '',
      update_date: '',
      createBy: '',
      create_date: ''
    }
  addCate(){
    this.cateService.addCateProduct(this.dataCateAdd).subscribe(
      (res:any)=>{
        this.toastr.success("Thêm thành công")
        $('#modalAdd').modal('hide');
        this.getAll();
      },
      err=>{
        this.toastr.error("Thêm thất bại")
      }
    )
  }
  update(){
    this.cateService.update(this.dataCate).subscribe(
      (res:any)=>{
        this.toastr.success("Cập nhật thành công")
        $('#modalEdit').modal('hide');
        this.getAll();
      },
      err=>{
        this.toastr.error("Cập nhật thất bại")
      }
    )
  }
  delete(cateId:string){
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
          this.cateService.delete(cateId).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.getAll()
            },
            err=>{
              console.log(err)
            }
          )
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Cate product is safe',
          'error'
        )
      }
    })
  }

}
