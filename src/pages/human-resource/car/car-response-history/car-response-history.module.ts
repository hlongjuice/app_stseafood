import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarResponseHistoryPage } from './car-response-history';

@NgModule({
  declarations: [
    CarResponseHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CarResponseHistoryPage),
  ],
  exports: [
    CarResponseHistoryPage
  ]
})
export class CarResponseHistoryPageModule {}
