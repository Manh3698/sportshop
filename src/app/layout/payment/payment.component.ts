import { Component, OnInit } from '@angular/core';
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
    productId: '',
    status: '',
    totalPrice: '',
    userId: '',
    userAdress: '',
    userPhone: '',
    userEmail: '',
    userMessage: '',
    createBy: '',
    create_date: '',
    updateBy: '',
    update_date: ''
  }
  
  constructor(private orderService: OrderService, private tokenStorageService: TokenStorageService, private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
  create(){
    this.orderService.addOrder(this.dataOrder).subscribe(
      (res:any)=>{
        alert('Đặt hàng thành công')
      },
      err=>{

      }
    )
  }
} 
