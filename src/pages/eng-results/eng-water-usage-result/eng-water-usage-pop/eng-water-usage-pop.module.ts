import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterUsagePopPage } from './eng-water-usage-pop';

@NgModule({
  declarations: [
    EngWaterUsagePopPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterUsagePopPage),
  ],
  exports: [
    EngWaterUsagePopPage
  ]
})
export class EngWaterUsagePopPageModule {}
