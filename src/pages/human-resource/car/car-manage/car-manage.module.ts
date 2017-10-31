import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarManagePage } from './car-manage';

@NgModule({
  declarations: [
    CarManagePage,
  ],
  imports: [
    IonicPageModule.forChild(CarManagePage),
  ],
  exports: [
    CarManagePage
  ]
})
export class CarManagePageModule {}
