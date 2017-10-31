import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainQcPage } from './main-qc';

@NgModule({
  declarations: [
    MainQcPage,
  ],
  imports: [
    IonicPageModule.forChild(MainQcPage),
  ],
  exports: [
    MainQcPage
  ]
})
export class MainQcPageModule {}
