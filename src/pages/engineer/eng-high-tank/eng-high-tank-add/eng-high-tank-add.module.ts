import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngHighTankAddPage } from './eng-high-tank-add';

@NgModule({
  declarations: [
    EngHighTankAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngHighTankAddPage),
  ],
  exports: [
    EngHighTankAddPage
  ]
})
export class EngHighTankAddPageModule {}
