import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoiceResponsePage } from './repair-invoice-response';

@NgModule({
  declarations: [
    RepairInvoiceResponsePage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoiceResponsePage),
  ],
  exports: [
    RepairInvoiceResponsePage
  ]
})
export class RepairInvoiceResponsePageModule {}
