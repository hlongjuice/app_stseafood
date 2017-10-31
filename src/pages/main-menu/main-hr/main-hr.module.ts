import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainHrPage } from './main-hr';

@NgModule({
  declarations: [
    MainHrPage,
  ],
  imports: [
    IonicPageModule.forChild(MainHrPage),
  ],
  exports: [
    MainHrPage
  ]
})
export class MainHrPageModule {}
