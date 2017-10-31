import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarAccessUsageAddPage } from './car-access-usage-add';

@NgModule({
  declarations: [
    CarAccessUsageAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CarAccessUsageAddPage),
  ],
  exports: [
    CarAccessUsageAddPage
  ]
})
export class CarAccessUsageAddPageModule {}
