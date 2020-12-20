import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(private router : Router) { }
  private searchText = new BehaviorSubject<any>('');

    sendMessage(message: string) {
        this.searchText.next(message);
    }

    clearMessages() {
        this.searchText.next('');
    }

    getMessage(): Observable<any> {
        return this.searchText.asObservable();
    }
}