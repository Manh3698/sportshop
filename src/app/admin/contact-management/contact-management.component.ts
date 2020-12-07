import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent implements OnInit {
  listContact;
  constructor(private contactservice: ContactService) { }

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
}