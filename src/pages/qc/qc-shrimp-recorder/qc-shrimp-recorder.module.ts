import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcShrimpRecorderPage } from './qc-shrimp-recorder';

@NgModule({
  declarations: [
    QcShrimpRecorderPage,
  ],
  imports: [
    IonicPageModule.forChild(QcShrimpRecorderPage),
  ],
  exports: [
    QcShrimpRecorderPage
  ]
})
export class QcShrimpRecorderPageModule {}
