import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DivisionAddPage } from './division-add';

@NgModule({
  declarations: [
    DivisionAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DivisionAddPage),
  ],
  exports: [
    DivisionAddPage
  ]
})
export class DivisionAddPageModule {}
