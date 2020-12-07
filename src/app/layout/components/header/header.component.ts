import { Component, Input, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { CateProductService } from 'src/app/services/cate-product.service';
import { HeaderService } from 'src/app/services/header.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listCate;
  listClothes;
  listItem;
  count;
  private roles: string[];
  isLoggedIn = false;
  isAdmin =false;
  user: any;
  username: any;
  constructor(private cateService: CateProductService, private headerService: HeaderService, private tokenStorageService: TokenStorageService) { }
// @Input() userLogin = null
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
}
