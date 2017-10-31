import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRequestPage } from './edit-request';

@NgModule({
  declarations: [
    EditRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(EditRequestPage),
  ],
  exports: [
    EditRequestPage
  ]
})
export class EditRequestPageModule {}
