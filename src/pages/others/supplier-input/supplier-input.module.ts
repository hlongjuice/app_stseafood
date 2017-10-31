import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierInputPage } from './supplier-input';

@NgModule({
  declarations: [
    SupplierInputPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierInputPage),
  ],
  exports: [
    SupplierInputPage
  ]
})
export class SupplierInputPageModule {}
