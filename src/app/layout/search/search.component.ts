import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isNull = false;
  listSearch = [];
  searchText;
  searchTextComponent;
  constructor(private transferService : DataTransferService, private productService : ProductService) { }

  ngOnInit(): void {
    this.transferService.getMessage().subscribe((res:any)=>{
      this.searchText = res;
    });
    if(this.searchText !== '' && this.searchText !== undefined){
      this.productService.getAll().subscribe(
        (res:any)=>{
          res.data.forEach(e => {
            this.listSearch = res.data.filter((rs)=> {
              return rs.name.toLowerCase().includes(this.searchText.toLowerCase())
            })
          });
          if (this.listSearch.length === 0) {
            this.isNull=true;
          }
        },
        error=>{
          console.error(error)
        }
      )
    }  
    else {
      this.isNull = true;
    } 
  }
  search(){
    this.productService.getAll().subscribe(
      (res:any)=>{
        res.data.forEach(e => {
          this.listSearch = res.data.filter((rs)=> {
            return rs.name.toLowerCase().indexOf(this.searchTextComponent.toLowerCase()) > -1
          })
        });
        if (this.listSearch.length === 0) {
          this.isNull=true;
        }
        else{
          this.isNull=false;
        }
      },
      error=>{
        console.error(error)
      }
    )
  }
  checkbox = [
    { name: 'Giá dưới 100.000đ', id: 1},
    { name: '100.000d - 300.000đ', id:2},
    { name: '300.000đ - 500.000đ', id:3},
    { name: '500.000đ - 1000.000đ', id:4}
  ]
  radio = [
    { name: 'Tên A-Z', id:1},
    { name: 'Tên Z-A', id:2},
    { name: 'Giá thấp đến cao', id:4},
    { name: 'Giá cao đến thấp', id:5}
  ]
  size =[
    { name: 'Lớn', id:5},
    { name: 'Nhỏ', id:6},
    { name: 'Vừa', id:7},
    { name: 'M', id:8},
    { name: 'L', id:9},
    { name: 'S', id:10},
    { name: 'XL', id:11}
  ]
  filter(id){

  }
  
}
