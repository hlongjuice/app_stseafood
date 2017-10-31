import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdExpImageEditPage } from './pd-exp-image-edit';

@NgModule({
  declarations: [
    PdExpImageEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PdExpImageEditPage),
  ],
  exports: [
    PdExpImageEditPage
  ]
})
export class PdExpImageEditPageModule {}
