import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CateProductService } from 'src/app/services/cate-product.service';
import { HeaderService } from 'src/app/services/header.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  listCate;
  listClothes;
  listItem;
  count;
  isAdmin = false;
  isLoginFailed = false;
  errorMessage = '';
  // roles: string[] = [];
  loginForm = {
    userName : '',
    password : ''
  }
  isLoggedIn = false;
  user: any;
  username: any;
  constructor(private cateService: CateProductService, private headerService: HeaderService, private tokenStorageService: TokenStorageService, private accountService: AccountService, private router: Router, private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
       this.user = this.tokenStorageService.getUser().username;
       this.count = this.headerService.count;
       console.log(this.tokenStorageService.getUser().roles[0].authority)
       this.isAdmin = (this.tokenStorageService.getUser().roles[0].authority == "admin");
    }
    this.getAll();
  }
  getAll(){
    this.cateService.getAll().subscribe(
      (res:any)=>{
        this.listCate = res.data;
        this.listClothes = this.listCate.filter(res => res.type == 'clothes');
        this.listItem = this.listCate.filter(res => res.type == 'item');
      },
      err=>{
        console.log(err)
      }
    )
  }
  logout(){
    window.sessionStorage.clear();
    location.reload();
  }
  login(){
    this.accountService.login(this.loginForm).subscribe(
      res => {
        this.toastrService.success("Login successfully.")
        this.tokenStorageService.saveToken(res.accessToken);
        this.tokenStorageService.saveUser(res);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigateByUrl('');
      },
      error => {
        if(error.status == 500) {
          this.toastrService.error('username or password invaild', 'ERROR', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false,
            positionClass: "toast-top-right"
          });
        }
        console.log(error)
        this.isLoginFailed = true;
        // location.reload();
      }
    )
  }

}
