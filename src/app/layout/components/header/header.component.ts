import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CateProductService } from 'src/app/services/cate-product.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
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
  searchText;
  constructor(private cateService: CateProductService, private headerService: HeaderService, private tokenStorageService: TokenStorageService, private router: Router, private transferService: DataTransferService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }
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
  search(){
    if(this.searchText !== ''){
      this.transferService.clearMessages();
      this.transferService.sendMessage(this.searchText)
      this.router.navigateByUrl('/search')
    }
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
