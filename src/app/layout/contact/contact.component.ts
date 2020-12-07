import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

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
      email : '',
      phone : '',
      content: '',
      updateBy: '',
      update_date: '',
      createBy: '',
      create_date: ''
  }
  ngOnInit(): void {
  }
  Create(){
    this.contactService.create(this.dataContact).subscribe(
      (res:any)=>{
        alert('đã gửi thành công')
      },
      err=>{
        console.log(err)
      }
    )
  }
  
}
