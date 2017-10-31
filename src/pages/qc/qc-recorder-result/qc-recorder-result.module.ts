import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcRecorderResultPage } from './qc-recorder-result';

@NgModule({
  declarations: [
    QcRecorderResultPage,
  ],
  imports: [
    IonicPageModule.forChild(QcRecorderResultPage),
  ],
  exports: [
    QcRecorderResultPage
  ]
})
export class QcRecorderResultPageModule {}
