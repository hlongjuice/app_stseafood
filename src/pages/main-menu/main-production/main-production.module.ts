import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainProductionPage } from './main-production';

@NgModule({
  declarations: [
    MainProductionPage,
  ],
  imports: [
    IonicPageModule.forChild(MainProductionPage),
  ],
  exports: [
    MainProductionPage
  ]
})
export class MainProductionPageModule {}
