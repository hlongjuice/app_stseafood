import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngDefrostTimePage } from './eng-defrost-time';

@NgModule({
  declarations: [
    EngDefrostTimePage,
  ],
  imports: [
    IonicPageModule.forChild(EngDefrostTimePage),
  ],
  exports: [
    EngDefrostTimePage
  ]
})
export class EngDefrostTimePageModule {}
