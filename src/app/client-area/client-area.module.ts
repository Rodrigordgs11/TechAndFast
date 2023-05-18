import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientAreaPageRoutingModule } from './client-area-routing.module';

import { ClientAreaPage } from './client-area.page';
import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientAreaPageRoutingModule,
    HeaderModule
  ],
  declarations: [ClientAreaPage]
})
export class ClientAreaPageModule {}
