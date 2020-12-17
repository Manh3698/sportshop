import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();
  
  login(data:any): Observable<any> {
    return this.httpClient.post(this.config.urlAccount + '/login', data);
  }
  register(data): Observable<any> {
    return this.httpClient.post(this.config.urlAccount + 'register',data);
  }
  getAll(){
    return this.httpClient.get(this.config.urlAccount.concat('/getAll'))
  }
  getDetail(userId:any){
    return this.httpClient.get(this.config.urlAccount.concat('/getUserById/') +  userId)
  }
  create(data:any){
    return this.httpClient.post(this.config.urlAccount.concat('/register'), data)
  }
  update(data:any){
    return this.httpClient.put(this.config.urlAccount.concat('/udpate'), data)
  }
  getUserInfor(): Observable<any> {
    return this.httpClient.get(this.config.urlAccount + `{id}`, { responseType: 'text' });
  }
  delete(id){
    return this.httpClient.delete(this.config.urlAccount.concat('/delete/') + id)
  }
  getUserByUsername(data){
    const param = new HttpParams()
    .set('username', data)
    return this.httpClient.get(this.config.urlAccount.concat('/getUserByUsername?') + param)
  }
}
