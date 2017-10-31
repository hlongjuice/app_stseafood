import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainEngineerPage } from './main-engineer';

@NgModule({
  declarations: [
    MainEngineerPage,
  ],
  imports: [
    IonicPageModule.forChild(MainEngineerPage),
  ],
  exports: [
    MainEngineerPage
  ]
})
export class MainEngineerPageModule {}
