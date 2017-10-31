import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoiceRequestPage } from './repair-invoice-request';

@NgModule({
  declarations: [
    RepairInvoiceRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoiceRequestPage),
  ],
  exports: [
    RepairInvoiceRequestPage
  ]
})
export class RepairInvoiceRequestPageModule {}
