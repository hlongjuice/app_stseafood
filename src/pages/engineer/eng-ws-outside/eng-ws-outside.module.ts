import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngWsOutsidePage } from './eng-ws-outside';

@NgModule({
  declarations: [
    EngWsOutsidePage,
  ],
  imports: [
    IonicPageModule.forChild(EngWsOutsidePage),
  ],
  exports: [
    EngWsOutsidePage
  ]
})
export class EngWsOutsidePageModule {}
