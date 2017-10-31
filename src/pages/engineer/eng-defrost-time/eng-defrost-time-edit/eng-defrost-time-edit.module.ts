import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngDefrostTimeEditPage } from './eng-defrost-time-edit';

@NgModule({
  declarations: [
    EngDefrostTimeEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngDefrostTimeEditPage),
  ],
  exports: [
    EngDefrostTimeEditPage
  ]
})
export class EngDefrostTimeEditPageModule {}
