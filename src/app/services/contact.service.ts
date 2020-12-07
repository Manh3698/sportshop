import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAll(){
    return this.httpClient.get(this.config.urlContact.concat('/getAll'))
  }
  create(data : any){
    return this.httpClient.post(this.config.urlContact.concat('/add'), data)
  }
  getById(id){
    return this.httpClient.get(this.config.urlContact.concat('/getById/') + id)
  }
  delete(id){
    return this.httpClient.delete(this.config.urlContact.concat('/delete/') + id)
  }
}
