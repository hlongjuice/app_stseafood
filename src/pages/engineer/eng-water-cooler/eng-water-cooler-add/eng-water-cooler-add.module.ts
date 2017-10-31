import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterCoolerAddPage } from './eng-water-cooler-add';

@NgModule({
  declarations: [
    EngWaterCoolerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterCoolerAddPage),
  ],
  exports: [
    EngWaterCoolerAddPage
  ]
})
export class EngWaterCoolerAddPageModule {}
