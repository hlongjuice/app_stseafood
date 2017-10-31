import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterMeterEditPage } from './eng-water-meter-edit';

@NgModule({
  declarations: [
    EngWaterMeterEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterMeterEditPage),
  ],
  exports: [
    EngWaterMeterEditPage
  ]
})
export class EngWaterMeterEditPageModule {}
