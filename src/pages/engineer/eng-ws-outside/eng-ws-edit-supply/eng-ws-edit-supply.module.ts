import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWsEditSupplyPage } from './eng-ws-edit-supply';

@NgModule({
  declarations: [
    EngWsEditSupplyPage,
  ],
  imports: [
    IonicPageModule.forChild(EngWsEditSupplyPage),
  ],
  exports: [
    EngWsEditSupplyPage
  ]
})
export class EngWsEditSupplyPageModule {}
