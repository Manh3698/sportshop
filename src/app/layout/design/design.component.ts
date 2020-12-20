import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var ajax: any;
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements AfterViewInit, OnInit {
  index: number = 0;
  Binding: (b: any) => void;
  id = '';
  constructor() { }
  
  close() {
    $(document).ready(function () {
      $("#dg-popover").css(
        {
          display: 'none'
        }
      );
      $("#dg-myclipart").css(
        {
          display: 'none'
        }
      )
    })
  }
  uploadImg() {
    $(document).ready(function () {
      $("#dg-myclipart").addClass('in');
      $("#dg-myclipart").css({
        display: 'block'
      });
      $('.dg-modal').css({
        overflow: 'hidden'
      })
    })
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(){
    $.getScript('../../../assets/assets/js/des.js');
  }
  dataText = '';
  enterText(event){
    // this.dataText = this.dataText + event.currentTarget.value
    document.getElementById(this.id).innerText = this.dataText;
  }
}
