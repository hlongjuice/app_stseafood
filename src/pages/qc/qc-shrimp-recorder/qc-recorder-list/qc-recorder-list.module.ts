import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcRecorderListPage } from './qc-recorder-list';

@NgModule({
  declarations: [
    QcRecorderListPage,
  ],
  imports: [
    IonicPageModule.forChild(QcRecorderListPage),
  ],
  exports: [
    QcRecorderListPage
  ]
})
export class QcRecorderListPageModule {}
