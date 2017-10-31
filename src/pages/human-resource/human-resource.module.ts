import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HumanResourcePage } from './human-resource';

@NgModule({
  declarations: [
    HumanResourcePage,
  ],
  imports: [
    IonicPageModule.forChild(HumanResourcePage),
  ],
  exports: [
    HumanResourcePage
  ]
})
export class HumanResourcePageModule {}
