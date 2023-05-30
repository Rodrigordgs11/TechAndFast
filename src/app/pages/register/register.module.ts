import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterPage } from './register.page';
import { HeaderModule } from '../../components/header/header.module';
import { SideMenuModule } from '../../components/side-menu/side-menu.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    SideMenuModule
  ],
  declarations: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
