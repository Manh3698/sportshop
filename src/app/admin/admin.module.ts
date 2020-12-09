import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsComponent } from './statistics/statistics.component';
import { CateProductsComponent } from './cate-products/cate-products.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChartsModule } from 'ng2-charts';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AccountManagementComponent } from './account-management/account-management.component';
import { OrderByUserComponent } from './order-by-user/order-by-user.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [AdminComponent,HeaderComponent, SidebarComponent, StatisticsComponent, CateProductsComponent, HomepageComponent, OrderManagementComponent, ProductComponent, AccountManagementComponent, OrderByUserComponent, ContactManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbDropdownModule,
    NgbCarouselModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    Ng2SearchPipeModule
  ]
})
export class AdminModule { }
