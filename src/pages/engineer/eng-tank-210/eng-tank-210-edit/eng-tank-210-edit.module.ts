import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngTank_210EditPage } from './eng-tank-210-edit';

@NgModule({
  declarations: [
    EngTank_210EditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngTank_210EditPage),
  ],
  exports: [
    EngTank_210EditPage
  ]
})
export class EngTank_210EditPageModule {}
