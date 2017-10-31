import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarRequestPage } from './car-request';

@NgModule({
  declarations: [
    CarRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(CarRequestPage),
  ],
  exports: [
    CarRequestPage
  ]
})
export class CarRequestPageModule {}
