import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngRiverWaterAddPage } from './eng-river-water-add';

@NgModule({
  declarations: [
    EngRiverWaterAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngRiverWaterAddPage),
  ],
  exports: [
    EngRiverWaterAddPage
  ]
})
export class EngRiverWaterAddPageModule {}
