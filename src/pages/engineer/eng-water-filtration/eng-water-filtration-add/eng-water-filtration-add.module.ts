import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterFiltrationAddPage } from './eng-water-filtration-add';

@NgModule({
  declarations: [
    EngWaterFiltrationAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterFiltrationAddPage),
  ],
  exports: [
    EngWaterFiltrationAddPage
  ]
})
export class EngWaterFiltrationAddPageModule {}
