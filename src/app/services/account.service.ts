import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();
  getDetail(userId:any){
    return this.httpClient.get(this.config.urlAccount.concat('/getUserById') +  userId)
  }
  create(data:any){
    return this.httpClient.post(this.config.urlAccount.concat('/register'), data)
  }
  update(data:any){
    return this.httpClient.put(this.config.urlAccount.concat('/udpate'), data)
  }
}
