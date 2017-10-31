import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngRiverWaterEditPage } from './eng-river-water-edit';

@NgModule({
  declarations: [
    EngRiverWaterEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngRiverWaterEditPage),
  ],
  exports: [
    EngRiverWaterEditPage
  ]
})
export class EngRiverWaterEditPageModule {}
