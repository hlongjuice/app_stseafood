import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarAccessUsageEditPage } from './car-access-usage-edit';

@NgModule({
  declarations: [
    CarAccessUsageEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CarAccessUsageEditPage),
  ],
  exports: [
    CarAccessUsageEditPage
  ]
})
export class CarAccessUsageEditPageModule {}
