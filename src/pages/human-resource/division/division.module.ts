import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DivisionPage } from './division';

@NgModule({
  declarations: [
    DivisionPage,
  ],
  imports: [
    IonicPageModule.forChild(DivisionPage),
  ],
  exports: [
    DivisionPage
  ]
})
export class DivisionPageModule {}
