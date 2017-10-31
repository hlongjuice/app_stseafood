import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoiceRequestEditPage } from './repair-invoice-request-edit';

@NgModule({
  declarations: [
    RepairInvoiceRequestEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoiceRequestEditPage),
  ],
  exports: [
    RepairInvoiceRequestEditPage
  ]
})
export class RepairInvoiceRequestEditPageModule {}
