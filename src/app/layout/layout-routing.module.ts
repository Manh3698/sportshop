import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { DesignComponent } from './design/design.component';
import { HomepageComponent } from './homepage/homepage.component';

import { LayoutComponent } from './layout.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
  children: [
    { path: 'signin', component: SignInComponent},
    { path: 'signup', component: SignUpComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'cart', component: CartComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'list-products', component: ProductsComponent},
    { path: 'detail', component: ProductDetailComponent},
    { path: '', component: HomepageComponent},
    { path: 'design', component: DesignComponent}
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
