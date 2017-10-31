import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarArrivalPage } from './car-arrival';

@NgModule({
  declarations: [
    CarArrivalPage,
  ],
  imports: [
    IonicPageModule.forChild(CarArrivalPage),
  ],
  exports: [
    CarArrivalPage
  ]
})
export class CarArrivalPageModule {}
