import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngIceMakerPage } from './eng-ice-maker';

@NgModule({
  declarations: [
    EngIceMakerPage,
  ],
  imports: [
    IonicPageModule.forChild(EngIceMakerPage),
  ],
  exports: [
    EngIceMakerPage
  ]
})
export class EngIceMakerPageModule {}
