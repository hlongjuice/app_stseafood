import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngDefrostTimeAddPage } from './eng-defrost-time-add';

@NgModule({
  declarations: [
    EngDefrostTimeAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngDefrostTimeAddPage),
  ],
  exports: [
    EngDefrostTimeAddPage
  ]
})
export class EngDefrostTimeAddPageModule {}
