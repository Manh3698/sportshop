import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Configure } from '../configure';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  isLoggedIn() {
    const user = this.tokenService.getToken();
    if (user) {
        return true;
    }
    return false;
  }


}