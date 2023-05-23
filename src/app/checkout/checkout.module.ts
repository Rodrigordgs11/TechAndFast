import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { HeaderModule } from '../components/header/header.module'
import { PaymentSuccessModalModule } from '../components/payment-success-modal/payment-success-modal.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    HeaderModule,
    PaymentSuccessModalModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
