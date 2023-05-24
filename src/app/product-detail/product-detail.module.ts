import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';

import { ProductDetailPage } from './product-detail.page';
import { HeaderModule } from '../components/header/header.module'
import { SideMenuModule } from '../components/side-menu/side-menu.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    HeaderModule,
    SideMenuModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
