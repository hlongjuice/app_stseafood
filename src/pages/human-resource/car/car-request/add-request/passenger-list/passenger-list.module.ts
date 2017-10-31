import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerListPage } from './passenger-list';

@NgModule({
  declarations: [
    PassengerListPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerListPage),
  ],
  exports: [
    PassengerListPage
  ]
})
export class PassengerListPageModule {}
