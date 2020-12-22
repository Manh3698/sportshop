import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  listOrder : any
  isNull = false;
  detail;
  id;
  detailById;
  isTrue = false;
  constructor(private tokenStorageService: TokenStorageService, private orderService: OrderService, private accService: AccountService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;
    this.userDetail();
  }
  userDetail(){
    this.accService.getUserByUsername(this.user).subscribe(
      (res:any)=>{
        this.id = res.data.id;
        this.detail = res.data
        this.getorder(this.id);
      },
      error=>{

      }
    )
  }
  getorder(id){
    this.orderService.getOrderByUser(id).subscribe(
      (res:any)=>{
        this.listOrder = res.data;
        console.log(this.listOrder)
        this.listOrder.forEach(e => {
          e.createDate = this.datePipe.transform(e.createDate, 'dd/MM/yyyy')
        });
        if(this.listOrder == ''){
          this.isNull = true;
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  delete(id){
    this.orderService.getOrderById(id).subscribe(
      (res:any)=>{
        this.detailById = res.data;
      },
      error=>{

      }
    )
    Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy đơn này không?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed && this.detailById.status == "Đang chờ xử lý") {
          this.orderService.deleteOrder(id).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Đã hủy đơn hàng.',
                'success'
              )
              this.userDetail();
            },
            err=>{
              console.log(err)
            }
          )
      }
      else if ( this.detailById.status == "Đang giao hàng" || this.detailById.status == "Giao hàng thành công" ) {
        Swal.fire(
          'Cancelled',
          'Đơn hàng đã được giao, bạn không thể hủy!',
          'error'
        )
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Đơn hàng giữ nguyên',
          'error'
        )
      }
    })
  }
}
