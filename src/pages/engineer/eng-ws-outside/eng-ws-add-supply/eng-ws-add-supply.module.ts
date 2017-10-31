import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWsAddSupplyPage } from './eng-ws-add-supply';

@NgModule({
  declarations: [
    EngWsAddSupplyPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWsAddSupplyPage),
  ],
  exports: [
    EngWsAddSupplyPage
  ]
})
export class EngWsAddSupplyPageModule {}
