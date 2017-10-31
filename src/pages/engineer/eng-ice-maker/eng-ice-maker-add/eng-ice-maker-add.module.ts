import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngIceMakerAddPage } from './eng-ice-maker-add';

@NgModule({
  declarations: [
    EngIceMakerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngIceMakerAddPage),
  ],
  exports: [
    EngIceMakerAddPage
  ]
})
export class EngIceMakerAddPageModule {}
