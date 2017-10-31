import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterFiltrationEditPage } from './eng-water-filtration-edit';

@NgModule({
  declarations: [
    EngWaterFiltrationEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterFiltrationEditPage),
  ],
  exports: [
    EngWaterFiltrationEditPage
  ]
})
export class EngWaterFiltrationEditPageModule {}
