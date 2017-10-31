import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdProductAddPage } from './pd-product-add';

@NgModule({
  declarations: [
    PdProductAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PdProductAddPage),
  ],
  exports: [
    PdProductAddPage
  ]
})
export class PdProductAddPageModule {}
