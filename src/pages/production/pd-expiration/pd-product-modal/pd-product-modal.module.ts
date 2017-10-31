import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdProductModalPage } from './pd-product-modal';

@NgModule({
  declarations: [
    PdProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PdProductModalPage),
  ],
  exports: [
    PdProductModalPage
  ]
})
export class PdProductModalPageModule {}
