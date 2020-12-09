import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  
import { HeaderService } from 'src/app/services/header.service';
declare var $ :any;
declare var jquery : any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  public Editor = ClassicEditor;
  productId = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private headerService : HeaderService) { }
  detail = {
    categoryId: '',
    content: '',
    createBy: '',
    create_date: '',
    description: '',
    id: this.productId,
    code: '',
    images: [],
    name: '',
    color: '',
    size:'',
    newPrice: '',
    oldPrice: '',
    quantity: '',
    status: '',
    updateBy: '',
    update_date: ''
  };
  listImage = []
  discount;
  quantityInput;
  listProductByCate;
  listHot = [];
  ngOnInit(): void {
    this.productService.getByProductId(this.productId).subscribe(
      (res:any)=>{
        this.detail = res.data;
        for (let i = 0; i < this.detail.images.length; i++) {
          this.listImage.push(this.detail.images[i])
        }
        console.log(this.detail)
        this.discount = parseInt(this.detail.oldPrice) - parseInt(this.detail.newPrice);
        this.productService.getByCateId(this.detail.categoryId).subscribe(
          (res:any)=>{
            this.listProductByCate = res.data
          },
          err=>{
    
          }
        )
      },
      err=>{
        console.log(err)
      }
    )
    
    this.productService.getAll().subscribe(
      (res:any)=>{
        res.data.forEach(e => {
          if (e.isNew == 1) {
            this.listHot.push(e)
          }
        });
      },
      err=>{

      }
    )
    $(document).ready(function() {
      $('.xzoom, .xzoom-gallery').xzoom({zoomWidth: 400, title: true, tint: '#333', Xoffset: 15});
      $('.xzoom2, .xzoom-gallery2').xzoom({position: '#xzoom2-id', tint: '#ffa200'});
      $('.xzoom3, .xzoom-gallery3').xzoom({position: 'lens', lensShape: 'circle', sourceClass: 'xzoom-hidden'});
      $('.xzoom4, .xzoom-gallery4').xzoom({tint: '#006699', Xoffset: 15});
      $('.xzoom5, .xzoom-gallery5').xzoom({tint: '#006699', Xoffset: 15});

      //Integration with hammer.js
      var isTouchSupported = 'ontouchstart' in window;

      if (isTouchSupported) {
          //If touch device
          $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function(){
              var xzoom = $(this).data('xzoom');
              xzoom.eventunbind();
          });
          
          $('.xzoom, .xzoom2, .xzoom3').each(function() {
              var xzoom = $(this).data('xzoom');
              $(this).hammer().on("tap", function(event) {
                  event.pageX = event.gesture.center.pageX;
                  event.pageY = event.gesture.center.pageY;
                  var s = 1, ls;
  
                  xzoom.eventmove = function(element) {
                      element.hammer().on('drag', function(event) {
                          event.pageX = event.gesture.center.pageX;
                          event.pageY = event.gesture.center.pageY;
                          xzoom.movezoom(event);
                          event.gesture.preventDefault();
                      });
                  }
  
                  xzoom.eventleave = function(element) {
                      element.hammer().on('tap', function(event) {
                          xzoom.closezoom();
                      });
                  }
                  xzoom.openzoom(event);
              });
          });

      $('.xzoom4').each(function() {
          var xzoom = $(this).data('xzoom');
          $(this).hammer().on("tap", function(event) {
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              var s = 1, ls;

              xzoom.eventmove = function(element) {
                  element.hammer().on('drag', function(event) {
                      event.pageX = event.gesture.center.pageX;
                      event.pageY = event.gesture.center.pageY;
                      xzoom.movezoom(event);
                      event.gesture.preventDefault();
                  });
              }

              var counter = 0;
              xzoom.eventclick = function(element) {
                  element.hammer().on('tap', function() {
                      counter++;
                      if (counter == 1) setTimeout(openfancy,300);
                      event.gesture.preventDefault();
                  });
              }

              function openfancy() {
                  if (counter == 2) {
                      xzoom.closezoom();
                      $.fancybox.open(xzoom.gallery().cgallery);
                  } else {
                      xzoom.closezoom();
                  }
                  counter = 0;
              }
          xzoom.openzoom(event);
          });
      });
      
      $('.xzoom5').each(function() {
          var xzoom = $(this).data('xzoom');
          $(this).hammer().on("tap", function(event) {
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              var s = 1, ls;

              xzoom.eventmove = function(element) {
                  element.hammer().on('drag', function(event) {
                      event.pageX = event.gesture.center.pageX;
                      event.pageY = event.gesture.center.pageY;
                      xzoom.movezoom(event);
                      event.gesture.preventDefault();
                  });
              }

              var counter = 0;
              xzoom.eventclick = function(element) {
                  element.hammer().on('tap', function() {
                      counter++;
                      if (counter == 1) setTimeout(openmagnific,300);
                      event.gesture.preventDefault();
                  });
              }

              function openmagnific() {
                  if (counter == 2) {
                      xzoom.closezoom();
                      var gallery = xzoom.gallery().cgallery;
                      var i, images = new Array();
                      for (i in gallery) {
                          images[i] = {src: gallery[i]};
                      }
                      $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
                  } else {
                      xzoom.closezoom();
                  }
                  counter = 0;
              }
              xzoom.openzoom(event);
          });
      });

      } else {
          //If not touch device

          //Integration with fancybox plugin
          $('#xzoom-fancy').bind('click', function(event) {
              var xzoom = $(this).data('xzoom');
              xzoom.closezoom();
              $.fancybox.open(xzoom.gallery().cgallery, {padding: 0, helpers: {overlay: {locked: false}}});
              event.preventDefault();
          });
         
          //Integration with magnific popup plugin
          $('#xzoom-magnific').bind('click', function(event) {
              var xzoom = $(this).data('xzoom');
              xzoom.closezoom();
              var gallery = xzoom.gallery().cgallery;
              var i, images = new Array();
              for (i in gallery) {
                  images[i] = {src: gallery[i]};
              }
              $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
              event.preventDefault();
          });
      }
  });
  }
  listCart = [];
  addtocart(){
    if(localStorage.getItem('cart')){
      this.listCart = JSON.parse(localStorage.getItem('cart'));
    }
    const data = {
      id : this.productId,
      quantity: parseInt(this.quantityInput)
    }
    if(!this.listCart.includes(this.listCart.find(res => res.id === this.productId))){
      this.listCart.push(data);
      this.headerService.count = this.headerService.count + 1;
      document.getElementById('count').innerText = (this.headerService.count).toString();
    }    
    localStorage.setItem('cart',JSON.stringify(this.listCart));
  }

}
