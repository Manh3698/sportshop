import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  count = 0;
  constructor() {
    this.count = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;

  }
}
