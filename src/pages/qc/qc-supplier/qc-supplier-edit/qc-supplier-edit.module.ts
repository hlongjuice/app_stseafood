import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcSupplierEditPage } from './qc-supplier-edit';

@NgModule({
  declarations: [
    QcSupplierEditPage,
  ],
  imports: [
    IonicPageModule.forChild(QcSupplierEditPage),
  ],
  exports: [
    QcSupplierEditPage
  ]
})
export class QcSupplierEditPageModule {}
