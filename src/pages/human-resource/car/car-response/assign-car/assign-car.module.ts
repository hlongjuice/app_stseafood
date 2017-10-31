import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignCarPage } from './assign-car';

@NgModule({
  declarations: [
    AssignCarPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignCarPage),
  ],
  exports: [
    AssignCarPage
  ]
})
export class AssignCarPageModule {}
