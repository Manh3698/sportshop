import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
declare var $ :any;
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var lang = {
      remove: 'Xóa',
      upload:{
        fileType: 'Accepted File Types (Max file size: 10MB)nImage .jpg, .jpeg, .png, .gif',
        minSize: 'Too small file (min filesize exceeded ',
        maxSize: 'Too big file (max filesize exceeded ',
        terms: 'Please read my terms after tick the checkbox to accepted terms.',
        chooseFile: 'Please choose a file upload.',
      },
      designer:{
        quantity: 'Please add quantity or size',
        quantityMin: 'Minimum quantity: ',
        tryagain: 'Please try again',
        chooseColor: 'Please select a color.',
        reset: 'Are you sure you want to reset design?',
        datafound: 'Data not found!',
        category: '- Select a category -',
      },
      product:{
        id: 'ID: ',
        sku: 'SKU: ',
        description: 'Description',
        team: 'Please add name &amp; number.',
      },
      text:{
        edit: 'Click to edit this item',
        remove: 'Click to remove this item',
        color: 'Click to change color',
        layer: 'Click to delete layer',
        sort: 'Click to sorting layer',
        email: 'Please enter your emai.',
        designid: 'Please enter design ID',
        enter_text: 'Hãy gõ ký tự.',
        all_fonts: 'Thêm fonts',
        qrcode: 'QR Code',
        add_qrcode: 'Click to add QRcode',
        ink_colors: 'Edit ink colors',
        show_design: 'Tải thêm hình',
        setup: 'Please go to admin and setup page default. <br> Go to <strong>T-Shirt eCommerce &gt; Settings</strong>',
        fromt: 'From',
        save_new: 'Save New',
        update: 'Update',
      },
      team:{
        name: 'Enter Name',
        number: 'Enter Number',
        choose_size: 'Please choose sizes again.',
      },
      share:{
        title: 'Great my design!',
      }
    }
  }
}
