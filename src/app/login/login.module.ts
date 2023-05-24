import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { HeaderModule } from '../components/header/header.module';
import { SideMenuModule } from '../components/side-menu/side-menu.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    SideMenuModule
  ],
  declarations: [
    LoginPage
  ],
  providers:[]
})
export class LoginPageModule {}
