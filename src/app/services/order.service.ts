import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAll(){
    return this.httpClient.get(this.config.urlOrder.concat('/getAll'))
  }
  getOrderDetailById(orderId:any){
    return this.httpClient.get(this.config.urlOrder.concat('/getOrderDetailById/') + orderId)
  }
  getOrderByUser(userId:any){
    return this.httpClient.get(this.config.urlOrder.concat('/getByUserId/') + userId)
  }
  deleteOrder(orderId:any){
    return this.httpClient.delete(this.config.urlOrder.concat('/delete/') + orderId)
  }
  addOrder(data:any){
    return this.httpClient.post(this.config.urlOrder.concat('/add'), data)
  }
  updateOrder(data){
    return this.httpClient.put(this.config.urlOrder.concat('/update'), data)
  }
}
