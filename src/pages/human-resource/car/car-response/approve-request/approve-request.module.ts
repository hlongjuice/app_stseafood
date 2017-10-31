import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveRequestPage } from './approve-request';

@NgModule({
  declarations: [
    ApproveRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ApproveRequestPage),
  ],
  exports: [
    ApproveRequestPage
  ]
})
export class ApproveRequestPageModule {}
