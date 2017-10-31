import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdExpImageAddPage } from './pd-exp-image-add';

@NgModule({
  declarations: [
    PdExpImageAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PdExpImageAddPage),
  ],
  exports: [
    PdExpImageAddPage
  ]
})
export class PdExpImageAddPageModule {}
