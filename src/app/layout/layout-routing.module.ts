import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../helpers/login-active.service';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { DesignComponent } from './design/design.component';
import { HomepageComponent } from './homepage/homepage.component';

import { LayoutComponent } from './layout.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
  children: [
    { path: 'contact', component: ContactComponent},
    { path: 'cart', component: CartComponent, canActivate : [AuthGuard]},
    { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard] },
    { path: ':cateId/list-products', component: ProductsComponent},
    { path: 'detail', component: ProductDetailComponent},
    { path: '', component: HomepageComponent},
    { path: 'design', component: DesignComponent, canActivate : [AuthGuard]},
    { path: ':productId/detail', component:ProductDetailComponent},
    { path: 'payment', component: PaymentComponent, canActivate : [AuthGuard]}
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
