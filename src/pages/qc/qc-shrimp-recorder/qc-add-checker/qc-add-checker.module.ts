import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QcAddCheckerPage } from './qc-add-checker';

@NgModule({
  declarations: [
    QcAddCheckerPage,
  ],
  imports: [
    IonicPageModule.forChild(QcAddCheckerPage),
  ],
})
export class QcAddCheckerPageModule {}
