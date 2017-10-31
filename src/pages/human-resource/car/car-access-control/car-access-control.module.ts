import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarAccessControlPage } from './car-access-control';

@NgModule({
  declarations: [
    CarAccessControlPage,
  ],
  imports: [
    IonicPageModule.forChild(CarAccessControlPage),
  ],
  exports: [
    CarAccessControlPage
  ]
})
export class CarAccessControlPageModule {}
