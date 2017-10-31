import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarUsagePage } from './car-usage';

@NgModule({
  declarations: [
    CarUsagePage,
  ],
  imports: [
    IonicPageModule.forChild(CarUsagePage),
  ],
  exports: [
    CarUsagePage
  ]
})
export class CarUsagePageModule {}
