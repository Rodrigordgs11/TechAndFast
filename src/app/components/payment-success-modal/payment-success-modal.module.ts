import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSuccessModalComponent } from '../payment-success-modal/payment-success-modal.component'
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaymentSuccessModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    PaymentSuccessModalComponent
  ]
})
export class PaymentSuccessModalModule { }
