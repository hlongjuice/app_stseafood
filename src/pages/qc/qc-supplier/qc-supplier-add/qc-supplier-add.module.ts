import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcSupplierAddPage } from './qc-supplier-add';

@NgModule({
  declarations: [
    QcSupplierAddPage,
  ],
  imports: [
    IonicPageModule.forChild(QcSupplierAddPage),
  ],
  exports: [
    QcSupplierAddPage
  ]
})
export class QcSupplierAddPageModule {}
