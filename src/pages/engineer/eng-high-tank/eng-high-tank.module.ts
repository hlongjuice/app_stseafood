import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngHighTankPage } from './eng-high-tank';

@NgModule({
  declarations: [
    EngHighTankPage,
  ],
  imports: [
    IonicPageModule.forChild(EngHighTankPage),
  ],
  exports: [
    EngHighTankPage
  ]
})
export class EngHighTankPageModule {}
