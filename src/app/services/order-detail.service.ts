import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAll(){
    return this.httpClient.get(this.config.urlOrderDetail.concat('/getAll'))
  }
  getByOrderId(orderId){
    return this.httpClient.get(this.config.urlOrderDetail.concat('/getByOrderId/') + orderId)
  }
}
