import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterMeterPage } from './eng-water-meter';

@NgModule({
  declarations: [
    EngWaterMeterPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterMeterPage),
  ],
  exports: [
    EngWaterMeterPage
  ]
})
export class EngWaterMeterPageModule {}
