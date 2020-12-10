import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AccountService } from 'src/app/services/account.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isLoggedIn = false;
  dataOrder= {
    id: '',
    paymentMethod : '',
    paymentStatus : '',
    status: '',
    totalPrice: '',
    userId: '',
    userAddress: '',
    userPhone: '',
    userName: '',
    userEmail: '',
    userMessage: '',
    orderDetails: []
  }
  
  user
  count;
  listDataLocalStorage = [];
  listId;
  listData = [];
  quantityInput
  total = 0;
  constructor(private orderService: OrderService, 
              private tokenStorageService: TokenStorageService, 
              private productService: ProductService, 
              private accService: AccountService,
              private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;
    this.userDetail();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.count =  JSON.parse(localStorage.getItem('cart')).length;
    this.listDataLocalStorage = this.listId = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    this.productService.getAll().subscribe((res: any) => {
      res.data.forEach(element => {
        if (this.listDataLocalStorage.find(rs => rs.id == element.id)) {
          this.listData.push(element);      
        }
      });
      console.log(this.listData)
      for (const item of this.listData) {
        for(let i=0;i<this.listDataLocalStorage.length; i++){
          if(this.listDataLocalStorage[i].id ==item.id){
            this.quantityInput = this.listDataLocalStorage[i].quantity ;
            this.total = this.total+ (parseInt(item.newPrice)*this.quantityInput);
            this.dataOrder.totalPrice = String(this.total);
          }
        }
      }
    })
  }
  userDetail(){
    this.accService.getUserByUsername(this.user).subscribe(
      (res:any)=>{
        this.dataOrder.userId = res.data.id;
      },
      error=>{

      }
    )
  }
  pay1(){
    this.dataOrder.paymentMethod = "Thanh toán nhận hàng",
    this.dataOrder.paymentStatus = "chưa"
  }
  pay2(){
    this.dataOrder.paymentMethod = "Thanh toán qua ngân hàng"
    this.dataOrder.paymentStatus = "đang xử lý"
    
  }
  pay3(){
    this.dataOrder.paymentMethod = "thanh toán paypal"
    this.dataOrder.paymentStatus = "đang xử lý"
  }
  order(){
    console.log(this.dataOrder)
    if(this.dataOrder.paymentMethod == "Thanh toán nhận hàng" || this.dataOrder.paymentMethod == "Thanh toán qua ngân hàng"){
      this.dataOrder.status="đang xử lý"
      for (let i = 0; i < this.listDataLocalStorage.length; i++) {       
        this.productService.getByProductId(this.listDataLocalStorage[i].id).subscribe(
          (res:any)=>{
            const dataOrderDetail = {
              productId: res.data.id,
              quantity: this.listDataLocalStorage[i].quantity,
              priceItem: res.data.newPrice,
              totalPrice: this.listDataLocalStorage[i].quantity*res.data.newPrice,
            }
            this.dataOrder.orderDetails.push(dataOrderDetail);
              
          },
          err=>{
            console.log(err)
          }
        )
      }
      this.orderService.addOrder(this.dataOrder).subscribe(
        (res:any)=>{    
          alert("Đã đặt hàng thành công") 
        },
        err=>{
          console.log(err)
        }
      )  
    };
    if(this.dataOrder.paymentMethod == "thanh toán paypal"){
      this.dataOrder.status="Đang chờ xử lý"
      for (let i = 0; i < this.listDataLocalStorage.length; i++) {       
        this.productService.getByProductId(this.listDataLocalStorage[i].id).subscribe(
          (res:any)=>{
            const dataOrderDetail = {
              productId: res.data.id,
              quantity: this.listDataLocalStorage[i].quantity,
              priceItem: res.data.newPrice,
              totalPrice: this.listDataLocalStorage[i].quantity*res.data.newPrice,
            }
            this.dataOrder.orderDetails.push(dataOrderDetail);             
          },
          err=>{
            console.log(err)
          }
        )
      }
      console.log(this.dataOrder.totalPrice)
      this.orderService.payment(this.dataOrder.totalPrice).subscribe(
        (res:any)=>{
          window.open(res.meta.code)

        },
        error=>{

        }
      )
      this.orderService.addOrder(this.dataOrder).subscribe(
        (res:any)=>{     
        },
        err=>{
          console.log(err)
        }
      )
    };
  }
} 
