import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoicePage } from './repair-invoice';

@NgModule({
  declarations: [
    RepairInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoicePage),
  ],
  exports: [
    RepairInvoicePage
  ]
})
export class RepairInvoicePageModule {}
