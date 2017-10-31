import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterFiltrationPage } from './eng-water-filtration';

@NgModule({
  declarations: [
    EngWaterFiltrationPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterFiltrationPage),
  ],
  exports: [
    EngWaterFiltrationPage
  ]
})
export class EngWaterFiltrationPageModule {}
