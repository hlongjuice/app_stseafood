import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngTank_210AddPage } from './eng-tank-210-add';

@NgModule({
  declarations: [
    EngTank_210AddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngTank_210AddPage),
  ],
  exports: [
    EngTank_210AddPage
  ]
})
export class EngTank_210AddPageModule {}
