import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class CateProductService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAll(){
    return this.httpClient.get(this.config.urlCateProduct.concat('/getAll'))
  }
  getById(cateId){
    return this.httpClient.get(this.config.urlCateProduct.concat('/getById/') + cateId)
  }
  delete(cateId){
    return this.httpClient.delete(this.config.urlCateProduct.concat('/delete/') + cateId)
  }
  update(data: any){
    return this.httpClient.put(this.config.urlCateProduct.concat('/update'), data)
  }
  addCateProduct(data: any){
    return this.httpClient.post(this.config.urlCateProduct.concat('/add'), data)
  }
}
