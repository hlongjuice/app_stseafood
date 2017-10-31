import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcAddReceivingPage } from './qc-add-receiving';

@NgModule({
  declarations: [
    QcAddReceivingPage,
  ],
  imports: [
    IonicPageModule.forChild(QcAddReceivingPage),
  ],
  exports: [
    QcAddReceivingPage
  ]
})
export class QcAddReceivingPageModule {}
