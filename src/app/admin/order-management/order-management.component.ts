import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  listOrder = [];
  listSuccess = [];
  constructor(private orderService: OrderService, private toastr: ToastrService) { }
  searchText;
  searchText2;
  detail;
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.orderService.getAll().subscribe(
      (res:any)=>{
        res.data.forEach(e => {
          if (e.status == "Giao hàng thành công") {
            this.listSuccess.push(e)
          }
          else{
            this.listOrder.push(e)
          }
        });
      },
      error=>{
        console.log(error)
      }
    )
  }
  updateStatusCheck(id){
    this.orderService.getOrderById(id).subscribe(
      (res:any)=>{
        this.detail = res.data;
        this.detail.status = "Giao hàng thành công"
      },
      error=>{

      }
    )
    Swal.fire({
      title: 'Đơn hàng sẽ được đánh dấu là đã giao?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cập nhật!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detail.paymentStatus = "Thanh toán thành công";
          this.orderService.updateOrder(this.detail).subscribe(
            (res:any)=>{
              Swal.fire(
                'Hoàn thành!',
                'Cập nhật đơn hàng thành công.',
                'success'
              )
              this.listOrder = [];
              this.listSuccess = [];
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
          'Đơn hàng chưa giao',
          'error'
        )
      }
    })
  }
  updateStatusPending(id){
    this.orderService.getOrderById(id).subscribe(
      (res:any)=>{
        this.detail = res.data;
        this.detail.status = "Đang giao hàng"
      },
      error=>{

      }
    )
    Swal.fire({
      title: 'Đơn hàng sẽ được đánh dấu là đang giao?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cập nhật!'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.detail.paymentStatus = "Thanh toán thành công";
          this.orderService.updateOrder(this.detail).subscribe(
            (res:any)=>{
              Swal.fire(
                'Hoàn thành!',
                'Cập nhật đơn hàng thành công.',
                'success'
              )
              this.listOrder = [];
              this.listSuccess = [];
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
          'Đơn hàng chưa giao',
          'error'
        )
      }
    })
  }
  delete(id){
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
          this.orderService.deleteOrder(id).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Order has been deleted.',
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
          'Order is safe',
          'error'
        )
      }
    })
  }
  ViewOrderDetail(oderId){

  }
}
