import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  private config = new Configure();
  getAll(){
    return this.httpClient.get(this.config.urlProduct.concat('/getAll'));
  }

  getByProductId(productId){
    return this.httpClient.get(this.config.urlProduct.concat('/getById/') + productId)
  }
  getByCateId(cateId){
    return this.httpClient.get(this.config.urlProduct.concat('/getByCateId/') + cateId)
  }
  deleteProduct(productId : string){
    return this.httpClient.delete(this.config.urlProduct.concat('/delete/') +productId);
  }
  addProduct(data, files){
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    for (const file of files) {
      formData.append('files', file);
    }
    return this.httpClient.post(this.config.urlProduct.concat('/add'), formData);
  }

  updateProduct(data, files){
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    for (const file of files) {
      formData.append('files', file);
    }
    return this.httpClient.put(this.config.urlProduct.concat('/update'), formData)
  }
}
