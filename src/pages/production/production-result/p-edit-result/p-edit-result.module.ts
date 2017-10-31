import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PEditResultPage } from './p-edit-result';

@NgModule({
  declarations: [
    PEditResultPage,
  ],
  imports: [
    IonicPageModule.forChild(PEditResultPage),
  ],
  exports: [
    PEditResultPage
  ]
})
export class PEditResultPageModule {}
