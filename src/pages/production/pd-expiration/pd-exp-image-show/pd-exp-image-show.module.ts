import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdExpImageShowPage } from './pd-exp-image-show';

@NgModule({
  declarations: [
    PdExpImageShowPage,
  ],
  imports: [
    IonicPageModule.forChild(PdExpImageShowPage),
  ],
  exports: [
    PdExpImageShowPage
  ]
})
export class PdExpImageShowPageModule {}
