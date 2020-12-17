import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  [x: string]: any;
  listAcc;
  isEdit = true;


  constructor(private accountService: AccountService) { }
  searchText;

  dataAcc = {
    id: '',
    fullname: '',
    birthday: '',
    email: '',
    address: '',
    password: '',
    username: '',
    phoneNumber: '',
    roles: [
      {
        id: '',
        name: ''
      }
    ]
  }
  role = [
    {
      id: 2,
      name: 'user'
    },
    {
      id: 1,
      name: 'admin'
    }
  ]
  resetData() {
    this.dataAcc = {
      id: '',
      fullname: '',
      birthday: '',
      email: '',
      address: '',
      password: '',
      username: '',
      phoneNumber: '',
      roles: [
        {
          id: '1',
          name: 'admin'
        }
      ]
    }
  }
  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.accountService.getAll().subscribe(
      (res: any) => {
        this.listAcc = res.data;
        console.log(this.listAcc)
      },
      err => {

      }
    )
  }
  getUserById(userId) {
    this.accountService.getDetail(userId).subscribe(
      res => {
        console.log(res)
      },
      error => {

      }
    )
  }

  update() {
    this.dataAcc.roles[0].name = this.dataAcc.roles[0].id == '1' ? 'user' : 'admin'
    if (this.isEdit) {
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
  delete(id) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.delete(id).subscribe(
          (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getAll()
          },
          err => {
            console.log(err)
          }
        )
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Type product is safe',
          'error'
        )
      }
    })
  }
}
