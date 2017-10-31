import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRequestPage } from './add-request';

@NgModule({
  declarations: [
    AddRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRequestPage),
  ],
  exports: [
    AddRequestPage
  ]
})
export class AddRequestPageModule {}
