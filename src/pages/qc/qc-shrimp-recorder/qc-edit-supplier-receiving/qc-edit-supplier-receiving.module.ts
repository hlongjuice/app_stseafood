import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcEditSupplierReceivingPage } from './qc-edit-supplier-receiving';

@NgModule({
  declarations: [
    QcEditSupplierReceivingPage,
  ],
  imports: [
    IonicPageModule.forChild(QcEditSupplierReceivingPage),
  ],
  exports: [
    QcEditSupplierReceivingPage
  ]
})
export class QcEditSupplierReceivingPageModule {}
