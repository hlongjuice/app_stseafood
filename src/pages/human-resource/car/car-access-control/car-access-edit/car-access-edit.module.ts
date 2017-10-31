import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarAccessEditPage } from './car-access-edit';

@NgModule({
  declarations: [
    CarAccessEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CarAccessEditPage),
  ],
  exports: [
    CarAccessEditPage
  ]
})
export class CarAccessEditPageModule {}
