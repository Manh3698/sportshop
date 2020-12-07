import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
declare  var $ : any;
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  [x: string]: any;
  listAcc;
  isEdit =false;
 
  
  constructor(private accountService: AccountService) { }
 
  
  dataAcc = {
    id: '',
    fullname: '',
    birthday: '',
    email:'',
    address: '',
    password: '',
    username: '',
    phoneNumber: '',
    updateBy: '',
    update_date: '',
    createBy: '',
    create_date: '',
    roles : [
      {
        id : '',
        name : this.Rolesname
      }
    ]
  }
  role = [
    {
      id : 1,
      name : 'user'
    },
    {
      id : 2,
      name : 'admin'
    }
  ]
  resetData(){
    this.dataAcc = {
      id: '',
      fullname: '',
      birthday: '',
      email:'',
      address: '',
      password: '',
      username: '',
      phoneNumber: '',
      updateBy: '',
      update_date: '',
      createBy: '',
      create_date: '',
      roles : [
        {
          id : '2',
          name : 'admin'
        }
      ]
    }
  }
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.accountService.getAll().subscribe(
      (res:any)=>{
        this.listAcc = res.data;
        console.log(this.listAcc)
      },
      err=>{

      }
    )
  }
  getUserById(){
    this.accountService.getDetail(1).subscribe(
      res=>{
        console.log(res)
      }
    )
  }

  update() {
    this.dataAcc.roles[0].name = this.dataAcc.roles[0].id=='1' ? 'user' : 'admin' 
    if(this.isEdit){
      this.accountService.update(this.dataAcc).subscribe(res => {
        alert("done");
        this.getAll();
        $('#modalEdit').modal('hide');
      }, err => {

      })
    } else {
      this.accountService.create(this.dataAcc).subscribe(res => {
        this.getAll();
        $('#modalEdit').modal('hide');
      }, err => {

      })
    }

  }

  addNew() {
    this.isEdit = false;
    this.resetData();
  }
}
