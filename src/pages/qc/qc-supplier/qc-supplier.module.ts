import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcSupplierPage } from './qc-supplier';

@NgModule({
  declarations: [
    QcSupplierPage,
  ],
  imports: [
    IonicPageModule.forChild(QcSupplierPage),
  ],
  exports: [
    QcSupplierPage
  ]
})
export class QcSupplierPageModule {}
