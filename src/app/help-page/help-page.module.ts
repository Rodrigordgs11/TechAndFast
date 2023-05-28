import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpPagePageRoutingModule } from './help-page-routing.module';

import { HelpPagePage } from './help-page.page';
import { HeaderModule } from '../components/header/header.module';
import { SideMenuModule } from '../components/side-menu/side-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpPagePageRoutingModule,
    SideMenuModule,
    HeaderModule
  ],
  declarations: [HelpPagePage]
})
export class HelpPagePageModule {}
