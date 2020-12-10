import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  listOrder;
  id
  isNull =false;
  constructor(private tokenStorageService: TokenStorageService, private orderService: OrderService, private accService: AccountService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;
    this.userDetail();
  }
  userDetail(){
    this.accService.getUserByUsername(this.user).subscribe(
      (res:any)=>{
        this.id = res.data.id;
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
        // this.isNull = (this.listOrder='')?true : false;
      },
      error=>{
        console.log(error)
      }
    )
  }

}
