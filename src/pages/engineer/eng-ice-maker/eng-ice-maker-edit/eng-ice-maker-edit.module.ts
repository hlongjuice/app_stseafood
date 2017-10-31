import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngIceMakerEditPage } from './eng-ice-maker-edit';

@NgModule({
  declarations: [
    EngIceMakerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngIceMakerEditPage),
  ],
  exports: [
    EngIceMakerEditPage
  ]
})
export class EngIceMakerEditPageModule {}
