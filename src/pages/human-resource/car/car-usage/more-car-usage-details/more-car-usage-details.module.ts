import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreCarUsageDetailsPage } from './more-car-usage-details';

@NgModule({
  declarations: [
    MoreCarUsageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreCarUsageDetailsPage),
  ],
  exports: [
    MoreCarUsageDetailsPage
  ]
})
export class MoreCarUsageDetailsPageModule {}
