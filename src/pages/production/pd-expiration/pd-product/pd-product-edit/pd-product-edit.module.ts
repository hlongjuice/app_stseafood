import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdProductEditPage } from './pd-product-edit';

@NgModule({
  declarations: [
    PdProductEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PdProductEditPage),
  ],
  exports: [
    PdProductEditPage
  ]
})
export class PdProductEditPageModule {}
