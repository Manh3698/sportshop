import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var ajax: any;
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  index: number = 0;
  Binding: (b: any) => void;
  constructor() { }

  onClick() {
    var i = this.index;
    var element_pos = 0;
    var a = $("#enter-text").val();
    // var index = 0;
    $(document).ready(function () {
      $("#dg-popover").css(
        {
          display: 'block'
        }
      );
      var dynamic_div = $(document.createElement('span')).css({
        border: '1px dashed',
        position: 'absolute',
        left: element_pos,
        top: $('.content-inner').height() + 20,
        width: '100',
        height: '50',
        padding: '3',
        margin: '0'
      }).attr('id', "item" + i);

      element_pos = element_pos + $('.content-inner-design').width() + 20;
      $(dynamic_div).appendTo('.content-inner-design').draggable().resizable();

      $('span').addClass('drag-item');
      
      var i1 =this.index;
    window.onload = function Binding(b) {
      const _this = this
      this.elementBindings = []
      this.value = b.object[b.property]
      this.valueGetter = function () {
        return _this.value;
      }
      this.valueSetter = function (val) {
        _this.value = val
        for (var i = 0; i < _this.elementBindings.length; i++) {
          var binding = _this.elementBindings[i]
          binding.element[binding.attribute] = val
        }
      }
      this.addBinding = function (element, attribute, event) {
        var binding = {
          element: element,
          attribute: attribute
        }
        if (event) {
          element.addEventListener(event, function (event) {
            _this.valueSetter(element[attribute]);
          })

        }
        this.elementBindings.push(binding)
        element[attribute] = _this.value
        return _this
      }

      Object.defineProperty(b.object, b.property, {
        get: this.valueGetter,
        set: this.valueSetter
      });

      b.object[b.property] = this.value;
      var obj = { a: $("#enter-text").val() }
    var myInputElement1 = document.getElementById("enter-text")
    var myDOMElement = document.getElementById("item" + i1)
    console.log(i1);

    new Binding({
      object: obj,
      property: "a"
    })
      .addBinding(myInputElement1, "value", "keyup")
      .addBinding(myDOMElement, "innerHTML")

    obj.a = 'hello';
    }
    });
    
    
    this.index++;
  }
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
}
