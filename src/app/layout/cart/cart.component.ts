import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listData = [];
  listDataLocalStorage = [];
  listId;
  total = 0;
  count;
  price_item;
  quantitylocal
  quantityInput;
  quantityInput1;
  isDisable = false;
  listQuantity = []
  cart = {
    cartDetails: [],
    cartTotal: 0
  }
  oldLocal = []
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('cart'))
    this.count = JSON.parse(localStorage.getItem('cart')).length;
    this.listDataLocalStorage = this.listId = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    this.productService.getAll().subscribe((res: any) => {
      let index = 0;
      res.data.forEach(element => {
        if (this.listDataLocalStorage.find(rs => rs.id == element.id)) {
          this.listData.push(element);
          this.cart.cartDetails.push({ ...element });
          this.cart.cartDetails[index][`totalPrice`] = element.newPrice * parseInt(this.listDataLocalStorage.find(rs => rs.id == element.id).quantity);
          this.cart.cartDetails[index][`quantityInput`] = parseInt(this.listDataLocalStorage.find(rs => rs.id == element.id).quantity);
          this.cart.cartTotal += element.newPrice * parseInt(this.listDataLocalStorage.find(rs => rs.id == element.id).quantity)
          index++;
        }
      });


    })
  }
  delete(id) {
    this.cart.cartDetails.forEach(res => {
      if (res.id === id) {
        this.cart.cartTotal -= res.totalPrice;
      }
    })
    let index = this.cart.cartDetails.findIndex(res => res.id === id);
    this.cart.cartDetails.splice(index, 1);
    const indexLocal = this.listDataLocalStorage.findIndex(rs => rs.id === id);
    this.listDataLocalStorage.splice(indexLocal, 1);
    localStorage.setItem('cart', JSON.stringify(this.listDataLocalStorage))
    alert('bạn đã xóa 1 sản phẩm khỏi giỏ hàng')
  }
  QuantityChange
  onchangeQuantity(id) {
    this.cart.cartTotal = 0;
    this.cart.cartDetails.forEach(res => {
      if (res.id === id) {
        res.totalPrice = res.newPrice * res.quantityInput;
      }
      this.cart.cartTotal += res.totalPrice;
    })
    console.log(this.listQuantity)
  }

}
