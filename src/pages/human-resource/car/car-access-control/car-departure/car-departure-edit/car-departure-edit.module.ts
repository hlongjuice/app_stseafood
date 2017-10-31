import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarDepartureEditPage } from './car-departure-edit';

@NgModule({
  declarations: [
    CarDepartureEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CarDepartureEditPage),
  ],
  exports: [
    CarDepartureEditPage
  ]
})
export class CarDepartureEditPageModule {}
