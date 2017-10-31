import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngHighTankEditPage } from './eng-high-tank-edit';

@NgModule({
  declarations: [
    EngHighTankEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngHighTankEditPage),
  ],
  exports: [
    EngHighTankEditPage
  ]
})
export class EngHighTankEditPageModule {}
