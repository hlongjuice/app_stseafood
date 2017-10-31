import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdExpSpecificAddPage } from './pd-exp-specific-add';

@NgModule({
  declarations: [
    PdExpSpecificAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PdExpSpecificAddPage),
  ],
  exports: [
    PdExpSpecificAddPage
  ]
})
export class PdExpSpecificAddPageModule {}
