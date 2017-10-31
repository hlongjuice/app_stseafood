import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoiceResponseAddPage } from './repair-invoice-response-add';

@NgModule({
  declarations: [
    RepairInvoiceResponseAddPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoiceResponseAddPage),
  ],
  exports: [
    RepairInvoiceResponseAddPage
  ]
})
export class RepairInvoiceResponseAddPageModule {}
