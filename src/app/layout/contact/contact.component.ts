import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  listContact;
  constructor(private contactService: ContactService) { }
  dataContact = {
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    content: ''
  }
  ngOnInit(): void {
  }
  Create() {
    this.contactService.create(this.dataContact).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Đã gửi thành công tin nhắn',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => {
        console.log(err)
      }
    )
  }

}
