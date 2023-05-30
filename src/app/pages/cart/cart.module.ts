import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { SideMenuModule } from '../../components/side-menu/side-menu.module'
import { HeaderModule } from '../../components/header/header.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    SideMenuModule,
    HeaderModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
