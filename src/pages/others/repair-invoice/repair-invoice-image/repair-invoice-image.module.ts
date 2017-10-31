import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairInvoiceImagePage } from './repair-invoice-image';

@NgModule({
  declarations: [
    RepairInvoiceImagePage,
  ],
  imports: [
    IonicPageModule.forChild(RepairInvoiceImagePage),
  ],
  exports: [
    RepairInvoiceImagePage
  ]
})
export class RepairInvoiceImagePageModule {}
