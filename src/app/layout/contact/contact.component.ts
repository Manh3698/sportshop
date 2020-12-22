import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  listContact;
  constructor(private contactService: ContactService, private toastr: ToastrService) { }
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
        this.toastr.success('Đã gửi tin nhắn thành công')
      },
      err => {
        this.toastr.error("Tin nhắn chưa được gửi!")
        console.log(err)
      }
    )
  }

}
