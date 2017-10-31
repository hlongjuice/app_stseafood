import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Eng_5x7EditPage } from './eng-5x7-edit';

@NgModule({
  declarations: [
    Eng_5x7EditPage,
  ],
  imports: [
    IonicPageModule.forChild(Eng_5x7EditPage),
  ],
  exports: [
    Eng_5x7EditPage
  ]
})
export class Eng_5x7EditPageModule {}
