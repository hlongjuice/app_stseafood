import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcRecorderDetailsPage } from './qc-recorder-details';

@NgModule({
  declarations: [
    QcRecorderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(QcRecorderDetailsPage),
  ],
  exports: [
    QcRecorderDetailsPage
  ]
})
export class QcRecorderDetailsPageModule {}
