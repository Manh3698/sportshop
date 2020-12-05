import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CateProductsComponent } from './cate-products/cate-products.component';
import { HomepageComponent } from './homepage/homepage.component';
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
    { path: ':cateName/:cateId/product', component:ProductComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
