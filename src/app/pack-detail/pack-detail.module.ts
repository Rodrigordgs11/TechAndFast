import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackDetailPageRoutingModule } from './pack-detail-routing.module';

import { PackDetailPage } from './pack-detail.page';
import { HeaderModule } from '../components/header/header.module'
import { SideMenuModule } from '../components/side-menu/side-menu.module'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackDetailPageRoutingModule,
    HeaderModule,
    SideMenuModule
  ],
  declarations: [PackDetailPage]
})
export class PackDetailPageModule {}
