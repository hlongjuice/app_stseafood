import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcAddExtraReceivingPage } from './qc-add-extra-receiving';

@NgModule({
  declarations: [
    QcAddExtraReceivingPage,
  ],
  imports: [
    IonicPageModule.forChild(QcAddExtraReceivingPage),
  ],
  exports: [
    QcAddExtraReceivingPage
  ]
})
export class QcAddExtraReceivingPageModule {}
