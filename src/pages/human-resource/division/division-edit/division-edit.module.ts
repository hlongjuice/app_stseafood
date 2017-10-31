import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DivisionEditPage } from './division-edit';

@NgModule({
  declarations: [
    DivisionEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DivisionEditPage),
  ],
  exports: [
    DivisionEditPage
  ]
})
export class DivisionEditPageModule {}
