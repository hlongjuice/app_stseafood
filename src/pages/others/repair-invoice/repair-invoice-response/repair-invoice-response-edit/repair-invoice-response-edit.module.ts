import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoiceResponseEditPage } from './repair-invoice-response-edit';

@NgModule({
  declarations: [
    RepairInvoiceResponseEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoiceResponseEditPage),
  ],
  exports: [
    RepairInvoiceResponseEditPage
  ]
})
export class RepairInvoiceResponseEditPageModule {}
