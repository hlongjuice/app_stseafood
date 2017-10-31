import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarAccessUsagePage } from './car-access-usage';

@NgModule({
  declarations: [
    CarAccessUsagePage,
  ],
  imports: [
    IonicPageModule.forChild(CarAccessUsagePage),
  ],
  exports: [
    CarAccessUsagePage
  ]
})
export class CarAccessUsagePageModule {}
