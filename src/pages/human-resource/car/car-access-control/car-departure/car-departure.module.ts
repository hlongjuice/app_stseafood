import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarDeparturePage } from './car-departure';

@NgModule({
  declarations: [
    CarDeparturePage,
  ],
  imports: [
    IonicPageModule.forChild(CarDeparturePage),
  ],
  exports: [
    CarDeparturePage
  ]
})
export class CarDeparturePageModule {}
