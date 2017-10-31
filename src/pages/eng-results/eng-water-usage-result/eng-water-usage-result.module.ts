import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterUsageResultPage } from './eng-water-usage-result';

@NgModule({
  declarations: [
    EngWaterUsageResultPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterUsageResultPage),
  ],
  exports: [
    EngWaterUsageResultPage
  ]
})
export class EngWaterUsageResultPageModule {}
