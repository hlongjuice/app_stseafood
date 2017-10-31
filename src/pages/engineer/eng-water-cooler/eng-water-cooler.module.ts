import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterCoolerPage } from './eng-water-cooler';

@NgModule({
  declarations: [
    EngWaterCoolerPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterCoolerPage),
  ],
  exports: [
    EngWaterCoolerPage
  ]
})
export class EngWaterCoolerPageModule {}
