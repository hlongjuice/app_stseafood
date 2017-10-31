import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdProductPage } from './pd-product';

@NgModule({
  declarations: [
    PdProductPage,
  ],
  imports: [
    IonicPageModule.forChild(PdProductPage),
  ],
  exports: [
    PdProductPage
  ]
})
export class PdProductPageModule {}
