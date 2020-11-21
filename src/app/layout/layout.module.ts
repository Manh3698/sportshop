import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DesignComponent } from './design/design.component';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SignInComponent, SignUpComponent, ContactComponent, ProductsComponent, ProductDetailComponent, ProfileComponent, AboutUsComponent, CartComponent, HomepageComponent, DesignComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbCarouselModule,
    NgbAlertModule
  ]
})
export class LayoutModule { }
