import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngineerPage } from './engineer';

@NgModule({
  declarations: [
    EngineerPage,
  ],
  imports: [
    IonicPageModule.forChild(EngineerPage),
  ],
  exports: [
    EngineerPage
  ]
})
export class EngineerPageModule {}
