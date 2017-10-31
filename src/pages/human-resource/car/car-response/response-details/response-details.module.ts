import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResponseDetailsPage } from './response-details';

@NgModule({
  declarations: [
    ResponseDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResponseDetailsPage),
  ],
  exports: [
    ResponseDetailsPage
  ]
})
export class ResponseDetailsPageModule {}
