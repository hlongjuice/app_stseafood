import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngRiverWaterPage } from './eng-river-water';

@NgModule({
  declarations: [
    EngRiverWaterPage,
  ],
  imports: [
    IonicPageModule.forChild(EngRiverWaterPage),
  ],
  exports: [
    EngRiverWaterPage
  ]
})
export class EngRiverWaterPageModule {}
