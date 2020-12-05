import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    alert("bạn cần phải đăng nhập để thực hiện thao tác này")
    // this.router.navigateByUrl('/login');
  }
}
