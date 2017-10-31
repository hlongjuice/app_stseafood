import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWaterCoolerEditPage } from './eng-water-cooler-edit';

@NgModule({
  declarations: [
    EngWaterCoolerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWaterCoolerEditPage),
  ],
  exports: [
    EngWaterCoolerEditPage
  ]
})
export class EngWaterCoolerEditPageModule {}
