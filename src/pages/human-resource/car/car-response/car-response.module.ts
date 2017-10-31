import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarResponsePage } from './car-response';

@NgModule({
  declarations: [
    CarResponsePage,
  ],
  imports: [
    IonicPageModule.forChild(CarResponsePage),
  ],
  exports: [
    CarResponsePage
  ]
})
export class CarResponsePageModule {}
