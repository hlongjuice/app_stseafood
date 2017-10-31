import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterMeterAddPage } from './eng-water-meter-add';

@NgModule({
  declarations: [
    EngWaterMeterAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterMeterAddPage),
  ],
  exports: [
    EngWaterMeterAddPage
  ]
})
export class EngWaterMeterAddPageModule {}
