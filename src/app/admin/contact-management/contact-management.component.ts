import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog} from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent implements OnInit {
  public Editor = ClassicEditor;
  listContact;
  replymodel = {
    username : "",
    email : "",
    message : "",
    subject : ""
  }
  constructor(private contactservice: ContactService) { }
  searchText
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.contactservice.getAll().subscribe(
      (res:any)=>{
        this.listContact = res.data;
      },
      err=>{
        console.log(err)
      }
    )
  }
  delete(id){
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
          this.contactservice.delete(id).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            },
            err=>{
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
  reply(email){
    this.replymodel.email = email;
  }
  Send(){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn gửi email này không?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Gửi'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactservice.SendMail(this.replymodel).subscribe(
          (res:any)=>{
            Swal.fire(
              'Đã gửi',
              'Email của bạn đã được gửi',
              'success'
            )
            this.replymodel = {
              username : this.replymodel.username,
              email : "",
              message : "",
              subject : ""
            }
          },
          err=>{
            console.log(err)
          }
        )       
      }
    })
    
  }
}