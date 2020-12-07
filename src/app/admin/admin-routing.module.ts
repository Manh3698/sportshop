import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';

import { AdminComponent } from './admin.component';
import { CateProductsComponent } from './cate-products/cate-products.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OrderByUserComponent } from './order-by-user/order-by-user.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ProductComponent } from './product/product.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [{
  path: '', 
  component: AdminComponent, 
  children: [
    { path: 'statistics', component: StatisticsComponent},
    { path: 'cateProducts', component:CateProductsComponent},
    { path: 'home', component:HomepageComponent},
    { path: 'order', component:OrderManagementComponent},
    { path: ':cateName/:cateId/product', component:ProductComponent},
    { path: 'customer', component: AccountManagementComponent},
    { path: 'orders/:name/:userid', component: OrderByUserComponent},
    { path: 'contact', component: ContactManagementComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
