import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Eng_5x7AddPage } from './eng-5x7-add';

@NgModule({
  declarations: [
    Eng_5x7AddPage,
  ],
  imports: [
    IonicPageModule.forChild(Eng_5x7AddPage),
  ],
  exports: [
    Eng_5x7AddPage
  ]
})
export class Eng_5x7AddPageModule {}
