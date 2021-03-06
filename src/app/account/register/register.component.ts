import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { CateProductService } from 'src/app/services/cate-product.service';
import { HeaderService } from 'src/app/services/header.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  listCate;
  listClothes;
  listItem;
  count;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm = {
    userName : '',
    password : ''
  }
  isLoggedIn = false;
  user: any;
  username: any;
  data = {
    id : '',
    fullname:'',
    address:'',
    username:'',
    password:'',
    birthday:'',
    phoneNumber:'',
    email:'',
    roles : [
      {
        id : 1,
        name : 'user'
      }
    ]
  }
  constructor(private cateService: CateProductService, private headerService: HeaderService, private tokenStorageService: TokenStorageService, private accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
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
  register(){
    this.accountService.create(this.data).subscribe(
      (res:any)=>{
        this.toastr.success("Đăng ký tài khoản thành công")
      },
      error=>{
        this.toastr.error("Đăng ký tài khoản thất bại")
        console.log(error)
      }
    )
  }
}
