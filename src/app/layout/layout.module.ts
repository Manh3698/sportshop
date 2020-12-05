import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DesignComponent } from './design/design.component';
import { ResizableDraggableComponent } from './resizable-draggable/resizable-draggable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, ContactComponent, ProductsComponent, ProductDetailComponent, ProfileComponent, AboutUsComponent, CartComponent, HomepageComponent, DesignComponent, ResizableDraggableComponent, PaymentComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbCarouselModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class LayoutModule { }
