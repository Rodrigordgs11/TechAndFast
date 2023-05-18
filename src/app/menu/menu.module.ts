import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';
import { HeaderComponent } from '../components/header/header.component'

import { MenuPage } from './menu.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage,    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuPageModule {}
