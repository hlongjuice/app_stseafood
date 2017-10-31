import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoiceRequestAddPage } from './repair-invoice-request-add';

@NgModule({
  declarations: [
    RepairInvoiceRequestAddPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoiceRequestAddPage),
  ],
  exports: [
    RepairInvoiceRequestAddPage
  ]
})
export class RepairInvoiceRequestAddPageModule {}
